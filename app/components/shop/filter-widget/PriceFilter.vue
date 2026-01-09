<template>
  <client-only>
    <div class="sidebar__widget mb-55">
      <div class="sidebar__widget-title mb-30">
        <h3>價格篩選</h3>
      </div>

      <div class="sidebar__widget-content">
        <form class="price-range" @submit.prevent="state.filterPrice">
          <input
            v-model="minPrice"
            class="price-input"
            type="number"
            min="0"
            inputmode="numeric"
            placeholder="最低價"
          />

          <input
            v-model="maxPrice"
            class="price-input"
            type="number"
            min="0"
            inputmode="numeric"
            placeholder="最高價（可不填）"
          />

          <button class="price-btn" type="submit">確定</button>
        </form>
      </div>
    </div>
  </client-only>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useProductsStore } from "~/store/useProducts";

export default defineComponent({
  setup() {
    const state = useProductsStore();

    // 沿用 store 的 priceRange[0], priceRange[1]
    const minPrice = computed({
      get: () => (Array.isArray(state.priceRange) ? state.priceRange[0] : "") as string,
      set: (v: string) => {
        if (!Array.isArray(state.priceRange)) state.priceRange = ["", ""];
        state.priceRange[0] = v as any;
      },
    });

    const maxPrice = computed({
      get: () => (Array.isArray(state.priceRange) ? state.priceRange[1] : "") as string,
      set: (v: string) => {
        if (!Array.isArray(state.priceRange)) state.priceRange = ["", ""];
        state.priceRange[1] = v as any;
      },
    });

    return { state, minPrice, maxPrice };
  },
});
</script>

<style scoped>
/* ✅ 改成上下排列，避免 sidebar 破版 */
.price-range {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* input 佔滿寬度 */
.price-input {
  width: 100%;
  height: 40px;
  padding: 0 14px;
  border: 1px solid #e6e6e6;
  border-radius: 999px; /* input 你沒要求改，我先保留 */
  outline: none;
  background: #fff;
}

/* ✅ 按鈕：黑色、方形、不圓角（跟常見 Filter/Submit 風格一致） */
.price-btn {
  width: 100%;
  height: 40px;
  background: #000;
  color: #fff;
  border: 0;
  border-radius: 0;
  cursor: pointer;
}
/* ✅ 滑鼠移上去變色 */
.price-btn:hover {
  background: #3187b8;   /* 想更亮就改 #333 / 想更淺就 #555 */
}
</style>
