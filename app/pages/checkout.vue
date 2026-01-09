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

      <!-- ✅（改動 3）原本「有商品」時沒有留白：因為你註解掉 coupon-area 後，上方間距消失
           解决：用外層 section 統一補回 pt-100 pb-100，讓 checkout-area 不會貼頂 -->
      <section v-else class="checkout-page pt-100 pb-100">
        <!-- ✅（改動 4）coupon-area 先保留註解（不刪檔案、不影響現在）
             重點是：留白改由外層 section 負責 -->
        <!-- <coupon-area /> -->

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

    // ✅（改動 5）頁籤標題中文化（不影響功能）
    useHead({
      title: "結帳",
    });

    return { state };
  },
});
</script>

<style scoped>
/*
  ✅（改動 3 補充說明）
  checkout-page 主要是語意化（方便你未來針對結帳頁做微調），
  目前留白主要靠 pt-100 pb-100（Bootstrap 的 utility class）來達成。
*/
.checkout-page {
  /* 先留空，避免你之後要調整時找不到入口 */
}
</style>
