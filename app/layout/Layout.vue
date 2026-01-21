<template>
  <div>
    <Header :transparent="transparent" :white_bg="white_bg" />
    <slot></slot>
    <Footer />
    <back-to-top />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onServerPrefetch } from "vue";
import Header from "./headers/Header.vue";
import Footer from "./footers/Footer.vue";
import BackToTop from "~/components/back-to-top/BackToTop.vue";

// ✅ 商品 store
import { useProductsStore } from "~/store/useProducts";

export default defineComponent({
  components: { Header, Footer, BackToTop },
  props: {
    transparent: { type: Boolean, default: false },
    white_bg: { type: Boolean, default: false },
  },
  setup() {
    const productsStore = useProductsStore();

    /**
     * ✅ 這個 function 就是「Layout 觸發載入」的統一入口
     * - 你把資料抓取集中在這裡，SSR / Client 兩邊都共用
     * - store.fetchProducts() 內部有 loaded 快取，所以不會重複打 API
     */
    const ensureProductsLoaded = async () => {
      await productsStore.fetchProducts();
    };

    /**
     * ✅ SSR 期間會跑（第一次直連、重刷時很重要）
     * - 讓伺服器在 render 前就把 products 抓好
     * - 減少「畫面一開始空」或「某些元件先拿空資料就炸」的機率
     */
    onServerPrefetch(async () => {
      await ensureProductsLoaded();
    });

    /**
     * ✅ Client 端也跑（保險）
     * - SPA 切頁 / 只在瀏覽器跑的情境，仍確保有資料
     */
    onMounted(async () => {
      await ensureProductsLoaded();
    });

    return {};
  },
});
</script>