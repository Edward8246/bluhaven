<template>
  <!--
    登入表單
    - 使用 vee-validate + yup 做驗證
    - 這裡先做「前端 UI / 驗證」，submit 目前只是 alert
  -->
  <Form :validation-schema="schema" @submit="onSubmit">
    <label>電子郵件 <span>*</span></label>
    <Field name="email" type="email" placeholder="請輸入電子郵件" />
    <ErrorMessage name="email" class="text-danger" />

    <label>密碼 <span>*</span></label>
    <Field name="password" type="password" placeholder="請輸入密碼" />
    <ErrorMessage name="password" class="text-danger" />

    <div class="login-action mb-20 fix">
      <span class="log-rem f-left">
        <Field id="remember" type="checkbox" name="remember" />
        <label for="remember">記住我</label>
      </span>

      <!-- 這個連結只是模板展示用（目前沒真正的忘記密碼流程） -->
      <span class="forgot-login f-right">
        <nuxt-link href="/login">忘記密碼？</nuxt-link>
      </span>
    </div>

    <button type="submit" class="os-btn w-100">登入</button>

    <div class="or-divide"><span>或</span></div>

    <nuxt-link href="/register" class="os-btn os-btn-black w-100">
      註冊新帳號
    </nuxt-link>
  </Form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default defineComponent({
  components: { Field, Form, ErrorMessage },
  setup() {
    const schema = yup.object({
      email: yup.string().required().email().label("Email"),
      password: yup.string().required().min(6).label("Password"),
    });

    function onSubmit(values: object, { resetForm }: { resetForm: () => void }) {
      alert(JSON.stringify(values, null, 2));
      resetForm();
    }

    return { schema, onSubmit };
  },
});
</script>
