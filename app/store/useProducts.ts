import { defineStore } from "pinia";
import productData from "~/data/productData";
import { type ProductType } from "~/types/productType";

export const useProductsStore = defineStore("products", {
  state: () => ({
    /** 全部商品（demo 資料） */
    products: productData as ProductType[],

    /** 畫面上真正拿來顯示的商品清單（會被篩選/排序/搜尋影響） */
    filterProducts: productData as ProductType[],

    /**
     * ✅ 價格區間（給 PriceFilter 用）
     * - 最小改動：沿用原本欄位名 priceRange
     * - 改成可空字串：["", ""]，讓最高價可以不填＝不限
     */
    priceRange: ["", ""] as any,

    /** 用來做「目前哪個 filter active」的 class（原本用途） */
    activeCls: "" as string,

    /** 目前搜尋字串（用於記錄狀態，可選擇是否顯示在 UI） */
    searchQuery: "" as string,
  }),

  actions: {
    /**
     * 商品名稱搜尋（包含式搜尋）
     */
    handleSearch(query: string) {
      const q = (query || "").trim();
      this.searchQuery = q;

      if (!q) {
        this.filterProducts = this.products;
        this.activeCls = "";
        return;
      }

      const qLower = q.toLowerCase();

      this.filterProducts = this.products.filter((p) => {
        const title = (p.title || "").toString().toLowerCase();
        return title.includes(qLower);
      });

      this.activeCls = q;
    },

    handleParentCategory(value: string) {
      this.filterProducts = this.products.filter(
        (p) => p.parentCategory.toLowerCase() === value.toLowerCase()
      );
      this.activeCls = value;
    },

    handleCategory(value: string) {
      this.filterProducts = this.products.filter(
        (p) => p.category.toLowerCase() === value.toLowerCase()
      );
      this.activeCls = value;
    },

    // ✅ 留著也不影響（舊 Slider 可能用得到），讓它更通用避免型別卡住
    onChangeRange(value: any) {
      this.priceRange = value;
    },

    /**
     * ✅ 新版：價格區間篩選（最高價可空＝不限）
     * - priceRange[0]：最低價（空白視為 0）
     * - priceRange[1]：最高價（空白視為 Infinity 不限）
     * - 若 min > max 自動交換
     */
    filterPrice() {
      const minRaw = (this.priceRange?.[0] ?? "").toString().trim();
      const maxRaw = (this.priceRange?.[1] ?? "").toString().trim();

      const minNum = minRaw === "" ? 0 : Number(minRaw);
      const maxNum = maxRaw === "" ? Infinity : Number(maxRaw);

      const min = Number.isFinite(minNum) ? minNum : 0;
      const max = Number.isFinite(maxNum) ? maxNum : Infinity;

      let lo = min;
      let hi = max;
      if (lo > hi) [lo, hi] = [hi, lo];

      this.filterProducts = this.products.filter((p) => {
        const price = Number(p.price);
        if (!Number.isFinite(price)) return false;
        return price >= lo && price <= hi;
      });

      this.activeCls = `price:${lo}-${hi === Infinity ? "" : hi}`;
    },

    handleSize(size: string) {
      this.filterProducts = this.products.filter((p) => p.sizes?.includes(size));
      this.activeCls = size;
    },

    handleColor(color: string) {
      this.filterProducts = this.products.filter((p) => p.colors?.includes(color));
      this.activeCls = color;
    },

    handleBrand(brand: string) {
      this.filterProducts = this.products.filter(
        (p) => p.brand.toLowerCase() === brand.toLowerCase()
      );
      this.activeCls = brand;
    },

    handleSelectFiltering(value: string) {
      switch (value) {
        case "Default Sorting":
          return (this.filterProducts = this.products);
        // case "Sort By Trending":
        //   return (this.filterProducts = this.products.filter((p) => p.trending));
        // case "Short By BestSeller":
        //   return (this.filterProducts = this.products.filter((p) => p.bestSeller));
        case "Price High To Low":
          return (this.filterProducts = this.products.slice().sort((a, b) => b.price - a.price));
        case "Price Low To High":
          return (this.filterProducts = this.products.slice().sort((a, b) => a.price - b.price));
        default:
          return (this.filterProducts = this.products);
      }
    },

    /**
     * Reset Filter
     * - 同時清掉 searchQuery 與 priceRange
     */
    handleResetFilter() {
      this.filterProducts = this.products;
      this.activeCls = "";

      // 清掉搜尋字串
      this.searchQuery = "";

      // ✅ 清掉價格（不再回到 [0,500] 造成「最高價被限制」）
      this.priceRange = ["", ""];
    },
  },

  getters: {
    getRelatedProducts(state) {
      return (category: string, id: number) =>
        state.products
          .filter((p) => p.category.toLowerCase() === category.toLowerCase() && p.id !== id)
          .slice(0, 4);
    },
  },
});
