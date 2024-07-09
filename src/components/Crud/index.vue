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
        <template v-for="column in columns">
          <el-form-item
            v-if="column?.operation?.search"
            :prop="column.name"
            :label="column.label"
          >
            <el-select
              v-if="column?.options"
              v-model="searchData[column.name]"
              style="width: 100px;"
              placeholder="请选择"
            >
              <el-option
                v-for="option in column.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>

            <el-input
              v-else
              v-model="searchData[column.name]"
              :type="inputTypeMap[column.type] "
              placeholder="请输入"
            />
          </el-form-item>
        </template>
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
          <template v-for="column in columns">
            <el-table-column
              v-if="column?.operation?.show"
              :prop="column.name"
              :label="column.label"
              align="center"
            />
          </template>

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
        <template v-for="column in columns">
          <el-form-item
            v-if="currentUpdateId ? column?.operation?.edit : column?.operation?.add"
            :prop="column.name"
            :label="column.label"
          >
            <el-select
              v-if="column?.options"
              v-model="dialogFormData[column.name]"
              placeholder="请选择"
            >
              <el-option
                v-for="option in column.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>

            <el-input
              v-else
              v-model="dialogFormData[column.name]"
              :type="inputTypeMap[column.type] "
              placeholder="请输入"
            />
          </el-form-item>
        </template>

        <!-- <el-form-item prop="gender" label="性别">
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
         </el-form-item>-->
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
import { computed, nextTick, reactive, ref, watch } from "vue";
import { ElMessage, ElMessageBox, type FormInstance } from "element-plus";
import { CirclePlus, Delete, Download, Refresh, RefreshRight, Search } from "@element-plus/icons-vue";
import { usePagination } from "@/hooks/usePagination";
import request from "@/utils/request";


defineOptions({
  // 命名当前组件
  name: "Crud"
});

const props = defineProps<{ config: any }>();
const config = props.config;
const columns = config.columns;
const baseUrl = config.baseUrl;
const operation = config.operation;

const req = {
  list: async (data: any) => {
    return request({
      url: operation.list.url,
      method: operation.list.method,
      params: data,
      data
    });
  },
  add: async (data: any) => {
    return request({
      url: operation.add.url,
      method: operation.add.method,
      data
    });
  },
  delete: async (data: any) => {
    return request({
      url: operation.delete.url,
      method: operation.delete.method,
      data
    });
  },
  update: async (data: any) => {
    return request({
      url: operation.update.url,
      method: operation.update.method,
      data
    });
  }
};

const inputTypeMap = {
  "number": "number",
  "string": "text",
  "text": "text"
};

const loading = ref<boolean>(false);
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination();

const dialogVisible = ref<boolean>(false);

//#region 增
const dialogFormRef = ref<FormInstance | null>(null);
const dialogFormData = ref({});


const dialogFormRules: any = computed(() => {
  const rules = {};

  for (const column of columns) {
    if (column?.operation?.edit || column?.operation?.add) {
      rules[column.name] = [{
        required: true,
        trigger: "blur",
        message: `${column.label}不能为空`
      }];
    }
  }

  return rules;
});

const handleCreateOrUpdate = async () => {
  const valid = await dialogFormRef.value?.validate();
  if (!valid) {
    return;
  }

  loading.value = true;
  try {
    const api = currentUpdateId.value === undefined ? req.add : req.update;
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
const handleDelete = async (row: any) => {
  let res = await ElMessageBox.confirm(
    `是否删除：${row.name}，确认删除？`,
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
      await req.delete(row.id);
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

    for (const column of columns) {
      if (column?.operation?.edit) {
        dialogFormData.value[column.name] = row[column.name];
      }
    }
  });
};
//#endregion

//#region 查
const userList = ref<UserAPI.UserVO[]>([]);
const searchFormRef = ref<FormInstance | null>(null);
const getSearchData = () => {
  const searchObj = {};

  for (const column of columns) {
    if (column?.operation?.search) {
      searchObj[column.name] = "";
    }
  }

  return searchObj;
};


const searchData = reactive({});
Object.assign(searchData, getSearchData());

const listUserByPage = async () => {
  loading.value = true;

  const userQueryReq = {
    pageNum: paginationData.value.currentPage,
    pageSize: paginationData.value.pageSize,
    ...searchData
  };

  try {
    const { data } = await req.list(userQueryReq);
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
