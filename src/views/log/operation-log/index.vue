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
          <el-table-column prop="businessType" label="业务类型" align="center" />
          <el-table-column prop="reqMethod" label="请求方式" align="center" />
          <el-table-column prop="reqModule" label="请求模块" align="center" />
          <el-table-column prop="reqUrl" label="请求URL" align="center" width='200' />
          <el-table-column prop="calledMethod" label="调用方法" align="center" width="120" />
          <el-table-column prop="operatorName" label="操作人员" align="center" />
          <el-table-column prop="operatorIp" label="操作人员ip" align="center" width='200' />
          <el-table-column prop="reqParam" label="请求参数" align="center" width='100' />
          <el-table-column prop="reqResult" label="返回参数" align="center" width='300' />
          <el-table-column prop="operationTime" width="160" label="操作时间" align="center" />
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
import { reqListOperationLog } from "@/api/log";
import { ElMessage, ElMessageBox, type FormInstance } from "element-plus";
import { Download, Refresh, RefreshRight, Search } from "@element-plus/icons-vue";
import { usePagination } from "@/hooks/usePagination";

defineOptions({
  // 命名当前组件
  name: "operation_log"
});

const loading = ref<boolean>(false);
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination();

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
    // name: searchData.name || undefined,
    // username: searchData.username || undefined
  };

  try {
    const { data } = await reqListOperationLog(userQueryReq);
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
