<template>
  <div class="app-container">
    <el-card
      v-loading="loading"
      shadow="never"
      class="search-wrapper"
    >
      <el-form
        ref="searchFormRef"
        :inline="true"
        :model="searchData"
        @submit.prevent="handleSearch"
      >
        <el-form-item prop="name" label="姓名">
          <el-input v-model="searchData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item prop="username" label="用户名">
          <el-input v-model="searchData.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" native-type="submit">
            查询
          </el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card
      v-loading="loading"
      shadow="never"
    >
      <div class="toolbar-wrapper">
        <div>
          <el-button
            type="primary"
            :icon="CirclePlus"
            @click="dialogVisible = true"
          >
            新增用户
          </el-button>
          <el-button type="danger" :icon="Delete">批量删除</el-button>
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="刷新当前页">
            <el-button
              type="primary"
              :icon="RefreshRight"
              circle
              @click="listUserByPage"
            />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="userList">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="id" label="id" align="center" />
          <el-table-column prop="name" label="姓名" width="160" align="center" />
          <el-table-column prop="username" label="用户名" align="center" />
          <el-table-column prop="avatar" label="头像" align="center" />
          <el-table-column prop="gender" label="性别" align="center" />
          <el-table-column prop="role" label="角色" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.role === 'admin'" effect="plain">
                {{ scope.row.role }}
              </el-tag>
              <el-tag v-else type="warning" effect="plain">
                {{ scope.row.role }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" width="160" label="创建时间" align="center" />
          <el-table-column prop="updateTime" width="160" label="修改时间" align="center" />
          <el-table-column
            fixed="right"
            label="操作"
            width="200"
            align="center"
          >
            <template #default="scope">
              <el-button
                type="primary"
                text
                bg
                size="small"
                @click="handleUpdate(scope.row)"
              >
                修改
              </el-button>
              <el-button
                type="danger"
                text
                bg
                size="small"
                @click="handleDelete(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="Number(paginationData.total)"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!-- 新增/修改 -->
    <el-dialog
      v-model="dialogVisible"
      :title="currentUpdateId === undefined ? '新增用户' : '修改用户'"
      @closed="resetForm"
      width="40%"
    >
      <el-form
        ref="dialogFormRef"
        :model="dialogFormData"
        :rules="dialogFormRules"
        label-width="100px"
        label-position="left"
      >
        <el-form-item prop="name" label="姓名">
          <el-input v-model="dialogFormData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="username" label="用户名">
          <el-input v-model="dialogFormData.username" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="avatar" label="头像">
          <el-input v-model="dialogFormData.avatar" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="gender" label="性别">
          <el-select
            v-model="dialogFormData.gender"
            placeholder="Select"
          >
            <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="role" label="角色">
          <el-select
            v-model="dialogFormData.role"
            placeholder="Select"
          >
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="handleCreateOrUpdate"
          :loading="loading"
        >
          确认
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, reactive, ref, watch } from "vue";
import { reqAddUser, reqDeleteUser, reqListUserByPage, reqUpdateUser } from "@/api/user";
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from "element-plus";
import { CirclePlus, Delete, Download, Refresh, RefreshRight, Search } from "@element-plus/icons-vue";
import { usePagination } from "@/hooks/usePagination";

defineOptions({
  // 命名当前组件
  name: "User"
});

const loading = ref<boolean>(false);
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination();

const dialogVisible = ref<boolean>(false);

//#region 增
const dialogFormRef = ref<FormInstance | null>(null);
const dialogFormData = ref({
  name: "",
  username: "",
  avatar: "",
  gender: 0,
  role: 1
});

type Options = {
  label: string,
  value: number
}

const roleOptions: Options[] = [
  {
    label: "admin",
    value: 0
  },
  {
    label: "user",
    value: 1
  }
];
const genderOptions = [
  {
    label: "男",
    value: 0
  },
  {
    label: "女",
    value: 1
  }
];

const dialogFormRules: FormRules = reactive({
  name: [{ required: true, trigger: "blur", message: "请输入姓名" }],
  username: [
    { required: true, trigger: "blur", message: "请输入用户名" }
  ],
  avatar: [{ required: true, trigger: "blur", message: "请输入头像" }],
  gender: [{ required: true, trigger: "blur", message: "请选择性别" }],
  role: [{ required: true, trigger: "blur", message: "请选择角色" }]
});

const handleCreateOrUpdate = async () => {
  const valid = await dialogFormRef.value?.validate();
  if (!valid) {
    return;
  }

  loading.value = true;
  try {
    const api = currentUpdateId.value === undefined ? reqAddUser : reqUpdateUser;
    await api({
      id: currentUpdateId.value,
      ...dialogFormData.value
    });

    ElMessage.success("操作成功");
    dialogVisible.value = false;

    await listUserByPage();
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  currentUpdateId.value = undefined;
  dialogFormRef.value?.resetFields();
};
// #endregion

//#region 删
const handleDelete = async (row: UserAPI.UserVO) => {
  let res = await ElMessageBox.confirm(
    `是否删除用户：${row.name}，确认删除？`,
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  );

  if (res) {
    loading.value = true;
    try {
      await reqDeleteUser(row.id);
      ElMessage.success("删除成功");
      await listUserByPage();
    } catch (e) {
      await listUserByPage();
    } finally {
      loading.value = false;
    }
  }
};
//#endregion

//#region 改
const currentUpdateId = ref<undefined | string>(undefined);
const handleUpdate = (row: UserAPI.UserVO) => {
  dialogVisible.value = true;
  // 必须延迟赋值，防止 resetFields 方法将数据重置错误
  nextTick(() => {
    currentUpdateId.value = row.id;
    dialogFormData.value.name = row.name;
    dialogFormData.value.username = row.username;
    dialogFormData.value.avatar = row.avatar;
    dialogFormData.value.gender = getValFromOption(genderOptions, row.gender);
    dialogFormData.value.role = getValFromOption(roleOptions, row.role);
  });
};

const getValFromOption = (options: Options[], _label: string): number => {
  console.log(options, _label);
  const filtered = options.filter((item: Options) => item.label === _label);
  console.log(filtered);
  return filtered[0].value;
};
//#endregion

//#region 查
const userList = ref<UserAPI.UserVO[]>([]);
const searchFormRef = ref<FormInstance | null>(null);
const searchData = reactive({
  name: "",
  username: ""
});

const listUserByPage = async () => {
  loading.value = true;

  const userQueryReq: UserAPI.UserQueryReq = {
    pageNum: paginationData.value.currentPage,
    pageSize: paginationData.value.pageSize,
    name: searchData.name || undefined,
    username: searchData.username || undefined
  };

  try {
    const { data } = await reqListUserByPage(userQueryReq);
    paginationData.value.total = data.total;
    userList.value = data.records;
  } catch (err) {
    userList.value = [];
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  paginationData.value.currentPage === 1
    ? listUserByPage()
    : (paginationData.value.currentPage = 1);
};
const resetSearch = () => {
  searchFormRef.value?.resetFields();
  handleSearch();
};
//#endregion

/** 监听分页参数的变化 */
watch(
  [() => paginationData.value.currentPage, () => paginationData.value.pageSize],
  listUserByPage,
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;

  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
