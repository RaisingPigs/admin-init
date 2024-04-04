<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData" @submit.prevent="handleSearch">
        <el-form-item prop="username" label="操作人用户名">
          <el-input v-model="searchData.operationName" placeholder="请输入用户名" />
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
          操作日志
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle @click="listOperationLogByPage" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="operationList">
          <el-table-column prop="businessType" label="业务类型" align="center" />
          <el-table-column prop="reqMethod" label="请求方式" align="center" />
          <el-table-column prop="reqModule" label="请求模块" align="center" />
          <el-table-column prop="reqUrl" label="请求URL" align="center" />
          <el-table-column prop="calledMethod" label="调用方法" align="center" />
          <el-table-column prop="operatorName" label="操作人员" align="center" />
          <el-table-column prop="operatorIp" label="ip地址" align="center" />
          <el-table-column prop="reqParam" label="请求参数" align="center" />
          <el-table-column prop="reqResult" label="返回参数" align="center" />
          <el-table-column prop="operationTime" width="160" label="操作时间" align="center" />
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
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { reqListOperationLog } from "@/api/log";
import { type FormInstance } from "element-plus";
import { Download, Refresh, RefreshRight, Search } from "@element-plus/icons-vue";
import { usePagination } from "@/hooks/usePagination";

defineOptions({
  // 命名当前组件
  name: "OperationLog"
});

const loading = ref<boolean>(false);
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination();

//#region 查
const operationList = ref<any[]>([]);
const searchFormRef = ref<FormInstance | null>(null);
const searchData = reactive({
  operationName: ""
});

const listOperationLogByPage = async () => {
  loading.value = true;

  const operationLogQueryReq = {
    pageNum: paginationData.value.currentPage,
    pageSize: paginationData.value.pageSize,
    operationName: searchData.operationName || undefined
  };

  try {
    const { data } = await reqListOperationLog(operationLogQueryReq);
    paginationData.value.total = data.total;
    operationList.value = data.records;
  } catch (err) {
    operationList.value = [];
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  paginationData.value.currentPage === 1
    ? listOperationLogByPage()
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
  listOperationLogByPage,
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
