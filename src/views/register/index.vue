<template>
  <div class="register-container">
    <ThemeSwitch class="theme-switch" />
    <div class="register-card">
      <div class="title">
        <Logo title="Admin" :font-size="55" :is-black="true" />
      </div>
      <div class="content">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          @submit.prevent="handleRegister"
        >
          <el-form-item prop="username">
            <el-input
              v-model.trim="formData.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
              clearable
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="formData.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
              clearable
            />
          </el-form-item>
          <el-form-item prop="checkPassword">
            <el-input
              v-model.trim="formData.checkPassword"
              placeholder="确认密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
              clearable
            />
          </el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            size="large"
            native-type="submit"
          >
            注 册
          </el-button
          >
        </el-form>
      </div>
      <div class="register">
        <el-link @click="toLogin" type="primary">已有账号? 去登录</el-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { Lock, User } from "@element-plus/icons-vue";
import ThemeSwitch from "@/components/ThemeSwitch/index.vue";
import Logo from "@/components/Logo/index.vue";

defineOptions({ name: "Register" });

const router = useRouter();

const formRef = ref<FormInstance | null>(null);
const loading = ref(false);
const formData = ref<LoginAPI.UserRegisterReq>({
  username: "",
  password: "",
  checkPassword: ""
});

const formRules: FormRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 4, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 4, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
  checkPassword: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 4, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ]
};

const handleRegister = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) {
    return;
  }
  loading.value = true;
  try {
    await useUserStore().register(formData.value);

    ElMessage.success("注册成功, 即将跳到登录页...");
    setTimeout(() => {
      router.replace({ name: "Login" });
    }, 2500);
  } catch (err) {
    formData.value.password = "";
    formData.value.checkPassword = "";
  } finally {
    loading.value = false;
  }
};

const toLogin = () => {
  router.push({ name: "Login" });
};
</script>

<style lang="scss" scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;

  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }

  .register-card {
    width: 480px;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: #fff;
    overflow: hidden;
    padding: 0 50px 40px 50px;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;

      img {
        height: 100%;
      }
    }

    .content {
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;

        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }

      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }

    .register {
      margin-top: 15px;
      text-align: right;
    }
  }
}
</style>
