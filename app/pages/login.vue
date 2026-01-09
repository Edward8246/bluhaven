<template>
  <layout :transparent="true">
    <breadcrumb-area title="登入" subtitle="登入"/>
    <login-area/>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Layout from "~/layout/Layout.vue";
import BreadcrumbArea from "~/components/common/breadcrumb/BreadcrumbArea.vue";
import LoginArea from "~/components/login-register/LoginArea.vue";

export default defineComponent({
  components: {
    Layout,
    BreadcrumbArea,
    LoginArea,
  },
  setup() {
    useHead({
      title: "登入",
    });
  },
});
</script>
