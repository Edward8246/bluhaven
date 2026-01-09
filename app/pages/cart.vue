<template>
  <layout :transparent="true">
    <breadcrumb-area title="購物車" subtitle="購物車"/>
    <cart-area/>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Layout from "~/layout/Layout.vue";
import BreadcrumbArea from "~/components/common/breadcrumb/BreadcrumbArea.vue";
import CartArea from "~/components/cart-wishlists/CartArea.vue";

export default defineComponent({
  components: {
    Layout,
    BreadcrumbArea,
    CartArea,
  },
  setup() {
    useHead({
      title: "購物車",
    });
  },
});
</script>
