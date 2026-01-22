<template>
  <layout :transparent="true">
    <breadcrumb-area title="商品詳情" subtitle="商品詳情" />

    <!-- ✅ 關鍵：item 還沒出來之前不要渲染 ShopDetailsArea -->
    <shop-details-area v-if="item" :item="item" />

    <!-- 可選：載入中/找不到商品時的顯示 -->
    <div v-else style="padding: 40px; text-align: center;">
      <p v-if="state.loading">載入中...</p>
      <p v-else>找不到商品（或資料尚未載入完成）</p>
    </div>
  </layout>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import Layout from "~/layout/Layout.vue";
import BreadcrumbArea from "~/components/common/breadcrumb/BreadcrumbArea.vue";
import ShopDetailsArea from "~/components/shop-details/ShopDetailsArea.vue";
import { useProductsStore } from "~/store/useProducts";

export default defineComponent({
  components: { Layout, BreadcrumbArea, ShopDetailsArea },
  // ✅ Nuxt 允許 setup 使用 async：用來「先抓資料再渲染」
  async setup() {
    const state = useProductsStore();
    const route = useRoute();

    // ✅ 關鍵：確保 products 已經在 store 裡（SSR/重刷時也會跑到）
    // 你的 fetchProducts() 有 loaded 快取，所以不會一直重抓
    await state.fetchProducts();

    // 路由參數 id（/product-details/123）
    const id = computed(() => Number(route.params.id));

    // ✅ 用 computed：只要 products 到了，就能找到 item
    const item = computed(() => state.products.find((p) => Number(p.id) === id.value));

    return { state, item };
  },
});
</script>