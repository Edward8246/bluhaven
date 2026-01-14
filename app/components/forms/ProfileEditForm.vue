<template>
  <Form :validation-schema="schema" @submit="onSubmit">
      <div class="profile__edit-input">
        <p>姓名</p>
        <Field name="name" type="text" placeholder="請輸入您的姓名" />
        <ErrorMessage name="name" class="text-danger" />
      </div>
      <div class="profile__edit-input">
        <p>電子郵件</p>
        <Field name="email" type="email" placeholder="請輸入您的 Email" />
        <ErrorMessage name="email" class="text-danger" />
      </div>
      <div class="profile__edit-input">
        <p>電話</p>
        <Field name="phone" type="text" placeholder="請輸入您的聯絡電話" />
        <ErrorMessage name="phone" class="text-danger" />
      </div>
      <div class="profile__edit-input">
        <p>地址</p>
        <Field name="address" type="text" placeholder="請輸入您的居住地址" />
        <ErrorMessage name="address" class="text-danger" />
      </div>
      <div class="profile__edit-input">
        <button type="submit" class="os-btn os-btn-black w-100">更新資料</button>
      </div>
  </Form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

// 設定 Yup 的中文錯誤訊息
import { setLocale } from "yup";
setLocale({
  mixed: {
    required: "${label}是必填欄位",
  },
  string: {
    email: "請輸入有效的電子郵件格式",
    min: "${label}長度至少需要 ${min} 個字",
  },
});

export default defineComponent({
  components: { Field, Form, ErrorMessage },
  setup() {
    const schema = yup.object({
      name: yup.string().required().label("姓名"),
      email: yup.string().required().email().label("電子郵件"),
      // 台灣手機號碼通常是 10 碼，這裡幫你把 min 從 11 改成 10
      phone: yup.string().required().min(10).label("電話"),
      address: yup.string().required().min(3).label("地址"),
    });

    function onSubmit(values: object, { resetForm }: { resetForm: () => void }) {
      alert("資料已成功送出：\n" + JSON.stringify(values, null, 2));
      resetForm();
    }
    return { schema, onSubmit };
  },
});
</script>