import { ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import { useTagsViewStore } from "./tags-view";
import { useSettingsStore } from "./settings";
import { getToken, removeToken, setToken } from "@/utils/cache/cookies";
import { resetRouter } from "@/router";
import { reqLogin, reqLoginUser, reqLogout, reqRegister } from "@/api/login";

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "");
  const roles = ref<string[]>([]);
  const loginUser = ref<UserAPI.UserVO>();

  const tagsViewStore = useTagsViewStore();
  const settingsStore = useSettingsStore();

  /** 设置角色数组 */
  const setRoles = (value: string[]) => {
    roles.value = value;
  };

  /** 登录 */
  const login = async (loginForm: LoginAPI.UserLoginReq) => {
    const res: BaseResponse<any> = await reqLogin(loginForm);
    setToken(res.data.token);
    token.value = res.data.token;
  };

  const register = async (registerForm: LoginAPI.UserRegisterReq) => {
    await reqRegister(registerForm);
  };

  /** 获取用户详情 */
  const getLoginUser = async () => {
    const res = await reqLoginUser();
    loginUser.value = res.data;

    // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
    roles.value = [res.data.role];
  };

  /** 登出 */
  const logout = async () => {
    await reqLogout();
    logoutReset();
  };

  const logoutReset = () => {
    resetToken();
    resetRouter();
    _resetTagsView();
  };

  /** 重置 Token */
  const resetToken = () => {
    removeToken();
    token.value = "";
    roles.value = [];
  };

  /** 重置 Visited Views 和 Cached Views */
  const _resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews();
      tagsViewStore.delAllCachedViews();
    }
  };

  return {
    token,
    loginUser,
    roles,
    setRoles,
    login,
    register,
    getLoginUser,
    logout,
    logoutReset,
    resetToken
  };
});

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store);
}
