import { defineStore } from 'pinia';
import { type ProductType } from '~/types/productType';

export const useCompareStore = defineStore('compare', {
  state: () => ({
    compare: [] as ProductType[],
  }),
  actions: {
    add_compare_product(payload: ProductType) {
      const isAdded = this.compare.findIndex((p) => p.id === payload.id);
      if (isAdded !== -1) {
        this.compare = this.compare.filter((p) => p.id !== payload.id);
        useNuxtApp().$toast.error(`已將「${payload.title}」從比較清單移除`);
      } else {
        this.compare.unshift(payload);
        useNuxtApp().$toast.success(`已將「${payload.title}」加入比較清單`);
      }
      localStorage.setItem('compare_products', JSON.stringify(this.compare));
    },

    removeCompare(payload: ProductType) {
      this.compare = this.compare.filter((p) => p.id !== payload.id);
      useNuxtApp().$toast.error(`已將「${payload.title}」從比較清單移除`);
      localStorage.setItem('compare_products', JSON.stringify(this.compare));
    },
  },
  getters: {
    get_compare_products: (state) => {
      if (process.client) {
        const data = localStorage.getItem('compare_products');
        if (data) {
          return (state.compare = JSON.parse(data));
        } else {
          localStorage.setItem('compare_products', JSON.stringify([]));
          return (state.compare = []);
        }
      } else {
        return state.compare;
      }
    },
  },
});
