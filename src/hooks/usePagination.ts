import { ref } from "vue";

interface DefaultPaginationData {
  total: number;
  currentPage: number;
  pageSizes: number[];
  pageSize: number;
  layout: string;
}

interface PaginationData {
  total?: number;
  currentPage?: number;
  pageSizes?: number[];
  pageSize?: number;
  layout?: string;
}

/** 默认的分页参数 */
const defaultPaginationData: DefaultPaginationData = {
  total: 0,
  currentPage: 1,
  pageSizes: [5, 10, 20, 50],
  pageSize: 10,
  layout: "total, sizes, prev, pager, next, jumper"
};

export function usePagination(initialPaginationData: PaginationData = {}) {
  /** 合并分页参数 */
  const paginationData = ref({
    ...defaultPaginationData,
    ...initialPaginationData
  });
  /** 改变当前页码 */
  const handleCurrentChange = (value: number) => {
    paginationData.value.currentPage = value;
  };
  /** 改变页面大小 */
  const handleSizeChange = (value: number) => {
    paginationData.value.pageSize = value;
  };

  return { paginationData, handleCurrentChange, handleSizeChange };
}
