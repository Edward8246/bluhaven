<template>
  <layout :transparent="true">
    <breadcrumb-area title="商品詳情" subtitle="商品詳情" />

    <!--  item 存在才渲染，避免 item.details undefined -->
    <shop-details-area v-if="item" :item="item" />

    <!-- 可選：載入中 / 找不到 -->
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

  // ✅ A：頁面進來先確保資料存在（重刷/直連也會跑到）
  async setup() {
    const state = useProductsStore();
    const route = useRoute();

    /**
     * 「頁面觸發 fetch」：
     * - 進入商品詳情頁時
     * - 重刷商品詳情頁時
     * - store 有 loaded 快取，所以只會打一次 API
     */
    await state.fetchProducts();

    // 取出路由 id（/product-details/123）
    const id = computed(() => Number(route.params.id));

    // ✅ 用 computed：等 products 到了，item 自然就能找到
    const item = computed(() =>
      state.products.find((p) => Number(p.id) === id.value)
    );

    return { state, item };
  },
});
</script>