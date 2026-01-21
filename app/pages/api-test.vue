<template>
  <div style="padding: 20px">
    <h2>API Test - Products</h2>

    <!-- 1) loading -->
    <div v-if="loading">載入中...</div>

    <!-- 2) error -->
    <div v-else-if="errorMsg">{{ errorMsg }}</div>

    <!-- 3) data -->
    <ul v-else>
      <li v-for="p in products" :key="p.id" style="margin-bottom: 16px">
        <div><b>{{ p.title }}</b> - ${{ p.price }}</div>
        <img :src="p.img" alt="" style="width: 140px; border: 1px solid #ccc" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// ✅ 最小需要的欄位（你 JSON 有更多也沒關係）
type Product = {
  id: number;
  title: string;
  price: number;
  img: string; // 例如 "/img/shop/product/a1.jpg"
};

const products = ref<Product[]>([]);
const loading = ref(false);
const errorMsg = ref("");

onMounted(async () => {
  loading.value = true;

  try {
    // Nuxt 內建 $fetch：自動處理 baseURL、SSR/CSR 都能用
    const data = await $fetch<Product[]>("/api/products");
    products.value = data;
  } catch (e) {
    console.error(e);
    errorMsg.value = "載入商品失敗，請稍後再試";
  } finally {
    loading.value = false;
  }
});
</script>