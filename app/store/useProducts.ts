import { defineStore } from "pinia";
//  不再直接載入模擬資料
// import productData from "~/data/productData";
import { type ProductType } from "~/types/productType";

export const useProductsStore = defineStore("products", {
  state: () => ({
    /** 全部商品 */
    // 一開始空陣列
    // - SSR / 重刷 / 直接進入頁面時，一開始也會是空
    // - 之後由 fetchProducts() 把 API 回來的資料塞進來
    products: [] as ProductType[],

    /** 畫面上真正拿來顯示的商品清單（會被篩選/排序/搜尋影響） */
    // 一樣先空陣列，抓回來後會同步為 products
    filterProducts: [] as ProductType[],

    /**
     *  價格區間（給 PriceFilter 用）
     * - 最小改動：沿用原本欄位名 priceRange
     * - 改成可空字串：["", ""]，讓最高價可以不填＝不限
     */
    priceRange: ["", ""] as any,

    /** 用來做「目前哪個 filter active」的 class（原本用途） */
    activeCls: "" as string,

    /** 目前搜尋字串（用於記錄狀態，可選擇是否顯示在 UI） */
    searchQuery: "" as string,

    /**
     *  loaded：資料是否已經抓過（快取）
     * - true：代表 products/filterProducts 已經有資料，不需要再抓 API
     * - false：代表還沒抓過，頁面要先 fetchProducts()
     */
    loaded: false as boolean,

    /**
     * loading：目前是否正在抓資料
     * - 用於頁面顯示「載入中...」
     */
    loading: false as boolean,

    /**
     * error：抓資料失敗時的訊息
     * - 用於頁面顯示錯誤提示（可選）
     */
    error: "" as string,
  }),

  actions: {
    /**
     * 最核心：抓商品資料（只抓一次，之後快取）
     *
     *  這裡就是「fetch 」：
     * - 寫在 store action：fetchProducts()
     *
     * 誰會呼叫它？
     * - 商品列表頁：進入列表頁時會呼叫一次
     * - 商品詳情頁：[id].vue 進入/重刷時也會呼叫一次
     *
     *  API 來源：
     * - GET /api/products（對應 server/api/products.get.ts）
     */
    async fetchProducts() {
      // ✅ 已經抓過就直接 return（避免切頁一直打 API）
      if (this.loaded) return;

      this.loading = true;
      this.error = "";

      try {
        /**
         * ✅ Nuxt 內建 $fetch
         * - 可以直接打同站 API，例如 "/api/products"
         * - SSR / Client 都可用
         * - 自動處理 baseURL（不需要寫 http://localhost:3000）
         */
        const data = await $fetch<ProductType[]>("/api/products");

        // ✅ 防呆：確保 data 是陣列，不是就給空陣列
        const list = Array.isArray(data) ? data : [];

        // ✅ 塞入原始資料
        this.products = list;

        // ✅ 預設顯示清單 = 全商品
        this.filterProducts = list;

        // ✅ 設為已載入（快取）
        this.loaded = true;
      } catch (err: any) {
        // ✅ 抓失敗：記錄錯誤，並清空資料
        this.error = err?.message || "Failed to fetch products";
        this.products = [];
        this.filterProducts = [];
      } finally {
        this.loading = false;
      }
    },

    /**
     * 商品名稱搜尋（包含式搜尋）
     * 注意：這些篩選/搜尋都只用 this.products（原始資料）來做
     * - 不會破壞原始資料
     * - 只更新 filterProducts（畫面顯示用）
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

    //  留著也不影響（舊 Slider 可能用得到），讓它更通用避免型別卡住
    onChangeRange(value: any) {
      this.priceRange = value;
    },

    /**
     *  新版：價格區間篩選（最高價可空＝不限）
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

      //  清掉價格
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






