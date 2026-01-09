<template>
  <layout :transparent="true">
    <breadcrumb-area title="商城" subtitle="商城"/>
    <shop-area/>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Layout from "~/layout/Layout.vue";
import BreadcrumbArea from "~/components/common/breadcrumb/BreadcrumbArea.vue";
import ShopArea from "~/components/shop/ShopArea.vue";

export default defineComponent({
  components: {
    Layout,
    BreadcrumbArea,
    ShopArea,
  },
  setup() {
    useHead({
      title: "商城",
    });
  },
});
</script>
