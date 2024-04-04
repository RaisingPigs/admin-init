<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData" @submit.prevent="handleSearch">
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

    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle @click="listUserByPage" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="userList">
          <el-table-column prop="username" label="用户名" align="center" />
          <el-table-column prop="loginType" label="登录方式" align="center" width="120" />
          <el-table-column prop="loginIp" label="登录IP地址" align="center" width="150" />
          <el-table-column prop="browser" label="浏览器类型" align="center" width='100' />
          <el-table-column prop="os" label="操作系统" align="center" width='200' />
          <el-table-column prop="status" label="登录状态" align="center" />
          <el-table-column prop="msg" label="提示消息" align="center" />
          <el-table-column prop="loginTime" width="160" label="登录时间" align="center" />
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination background :layout="paginationData.layout" :page-sizes="paginationData.pageSizes"
          :total="paginationData.total" :page-size="paginationData.pageSize" :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { reqListLoginLog } from "@/api/log";
import { ElMessage, ElMessageBox, type FormInstance } from "element-plus";
import { Download, Refresh, RefreshRight, Search } from "@element-plus/icons-vue";
import { usePagination } from "@/hooks/usePagination";

defineOptions({
  // 命名当前组件
  name: "login_log"
});

const loading = ref<boolean>(false);
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination();

//#region 查
const userList = ref<[]>([]);
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
    // name: searchData.name || undefined,
    // username: searchData.username || undefined
  };

  try {
    const { data } = await reqListLoginLog(userQueryReq);
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
