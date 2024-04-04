//统一管理项目用户相关的接口
import request from "@/utils/request";

// 登录日志
export async function reqListLoginLog(data: any) {
  return request.post<any, BaseResponse<any>>("/login-log/list/page", data);
}

// 操作日志
export async function reqListOperationLog(data: any) {
  return request.post<any, BaseResponse<any>>("/operation-log/list/page", data);
}
