<template>
  <layout :transparent="true">
    <!-- （改動 1）改成中文 -->
    <breadcrumb-area title="結帳" subtitle="結帳" />

    <client-only>
      <!-- 空購物車：保留上下留白 pt-100 pb-100（原本就有，保留不動） -->
      <div v-if="state.cart_products.length === 0" class="text-center pt-100 pb-100">
        <!-- （改動 2）中文 -->
        <h3>購物車沒有商品，無法結帳</h3>
        <nuxt-link class="os-btn os-btn-black mt-15" to="/shop">
          立即購物
        </nuxt-link>
      </div>
      <section v-else class="checkout-page pt-100 pb-100">

        <!-- 原本就有：結帳主內容 -->
        <checkout-area />
      </section>
    </client-only>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Layout from "~/layout/Layout.vue";
import BreadcrumbArea from "~/components/common/breadcrumb/BreadcrumbArea.vue";
// （改動 4 對應）已註解 CouponArea import：保留不動
// import CouponArea from "~/components/checkout/CouponArea.vue";
import CheckoutArea from "~/components/checkout/CheckoutArea.vue";
import { useCartStore } from "~/store/useCart";

export default defineComponent({
  components: {
    Layout,
    BreadcrumbArea,
    // CouponArea,
    CheckoutArea,
  },
  setup() {
    const state = useCartStore();

    useHead({
      title: "結帳",
    });

    return { state };
  },
});
</script>

<style scoped>
/*
  checkout-page （未來針對結帳頁做微調），
*/
/* .checkout-page {
  
} */
</style>
