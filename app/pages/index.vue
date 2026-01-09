<template>
  <layout>
    <home-hero-slider />
    <category-area />
    <trending-products />
    <sale-off-product/>
    <client-brand-slider/>
    <subscribe-area/>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeHeroSlider from "~/components/hero-banner/HomeHeroSlider.vue";
import Layout from "~/layout/Layout.vue";
import CategoryArea from "~/components/category/CategoryArea.vue";
import TrendingProducts from "~/components/products/TrendingProducts.vue";
import SaleOffProduct from "~/components/products/SaleOffProduct.vue";
import ClientBrandSlider from "~/components/client-brands/ClientBrandSlider.vue";
import SubscribeArea from "~/components/subscribe/SubscribeArea.vue";

export default defineComponent({
  components: {
    Layout,
    HomeHeroSlider,
    CategoryArea,
    TrendingProducts,
    SaleOffProduct,
    ClientBrandSlider,
    SubscribeArea,
  },
  setup() {
    useHead({
      title: "Home Main - Outstock Clean, Minimal eCommerce Vue Nuxt 3 Template",
    });
  },
});
</script>
