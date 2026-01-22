import { defineStore } from "pinia";
// 不再直接載入本地假資料，改成走 API
// import productData from "~/data/productData";
import { type ProductType } from "~/types/productType";

// 建立一個 Pinia store，id 叫 "products"
export const useProductsStore = defineStore("products", {
  // state 用函式回傳物件：確保每次初始化都是乾淨狀態
  state: () => ({
    // 原始完整商品資料（不要直接拿來做篩選覆蓋）
    products: [] as ProductType[],

    // 畫面實際要顯示的清單（搜尋/篩選/排序都改這個）
    filterProducts: [] as ProductType[],

    // 價格區間（用字串方便接 input，空字串代表不限）
    priceRange: ["", ""] as any,

    // UI 用：記目前是哪個 filter 在作用（例如分類/價格/搜尋）
    activeCls: "" as string,

    // 記錄搜尋字串（方便回填或顯示）
    searchQuery: "" as string,

    // 快取旗標：抓過一次就不再重抓（避免切頁一直打 API）
    loaded: false as boolean,

    // 目前是否正在載入中（給畫面顯示 Loading）
    loading: false as boolean,

    // 抓資料失敗的錯誤訊息（給畫面顯示）
    error: "" as string,
  }),

  actions: {
    // 抓商品資料（只抓一次，之後用 loaded 當快取）
    async fetchProducts() {
      // 如果抓過了就不重抓
      if (this.loaded) return;

      // 進入載入狀態
      this.loading = true;
      this.error = "";

      try {
        // 用 Nuxt 內建 $fetch 打同站 API
        const data = await $fetch<ProductType[]>("/api/products");

        // 防呆：確保是陣列
        const list = Array.isArray(data) ? data : [];

        // 存原始資料
        this.products = list;

        // 預設畫面顯示：全部商品
        this.filterProducts = list;

        // 設成已載入（快取）
        this.loaded = true;
      } catch (err: any) {
        // 失敗：記錯誤並清空資料
        this.error = err?.message || "Failed to fetch products";
        this.products = [];
        this.filterProducts = [];
      } finally {
        // 結束載入狀態
        this.loading = false;
      }
    },

    // 依商品名稱做包含式搜尋（只改 filterProducts）
    handleSearch(query: string) {
      const q = (query || "").trim();
      this.searchQuery = q;

      // 沒輸入就回到全部商品
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

    // 依大分類篩選
    handleParentCategory(value: string) {
      this.filterProducts = this.products.filter(
        (p) => p.parentCategory.toLowerCase() === value.toLowerCase()
      );
      this.activeCls = value;
    },

    // 依分類篩選
    handleCategory(value: string) {
      this.filterProducts = this.products.filter(
        (p) => p.category.toLowerCase() === value.toLowerCase()
      );
      this.activeCls = value;
    },

    // 更新價格區間（通常給 UI 元件用）
    onChangeRange(value: any) {
      this.priceRange = value;
    },

    // 依價格區間篩選（最高價可空＝不限）
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

    // 依尺寸篩選
    handleSize(size: string) {
      this.filterProducts = this.products.filter((p) => p.sizes?.includes(size));
      this.activeCls = size;
    },

    // 依顏色篩選
    handleColor(color: string) {
      this.filterProducts = this.products.filter((p) => p.colors?.includes(color));
      this.activeCls = color;
    },

    // 依品牌篩選
    handleBrand(brand: string) {
      this.filterProducts = this.products.filter(
        (p) => p.brand.toLowerCase() === brand.toLowerCase()
      );
      this.activeCls = brand;
    },

    // 依下拉選單做排序
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

    // 重置所有篩選（回到全部商品）
    handleResetFilter() {
      this.filterProducts = this.products;
      this.activeCls = "";
      this.searchQuery = "";
      this.priceRange = ["", ""];
    },
  },

  getters: {
    // 取同分類的相關商品（排除自己，最多 4 個）
    getRelatedProducts(state) {
      return (category: string, id: number) =>
        state.products
          .filter((p) => p.category.toLowerCase() === category.toLowerCase() && p.id !== id)
          .slice(0, 4);
    },
  },
});






// import { defineStore } from "pinia";
// /**
//  * defineStore：Pinia 用來建立「全站共用狀態」的函式
//  * - store 可以想成：一個集中管理資料 + 方法的容器
//  */

// // 不再直接載入本地假資料，改成走 API
// // import productData from "~/data/productData";

// import { type ProductType } from "~/types/productType";
// /**
//  * import { type X }：只引入型別（TypeScript 用）
//  * - 這行在 build 後不會變成真的 JS import（它只給 TS 做檢查/提示）
//  * - ProductType 用來描述「一個商品物件應該有哪些欄位」
//  */

// /**
//  * defineStore("products", {...})
//  * - "products" 是 store 的 id（Pinia 用來識別這個 store）
//  * - export const useProductsStore：輸出一個函式，別的檔案可以用它拿到 store
//  *   const store = useProductsStore()
//  */
// export const useProductsStore = defineStore("products", {
//   /**
//    * state: () => ({ ... })
//    * - 為什麼 state 是「函式」？
//    *   因為每次初始化 store，要拿到一份新的 state 物件（避免多處共用同一份物件）
//    * - () => ({}) 是箭頭函式：
//    *   () 代表沒有參數
//    *   => 後面回傳一個物件
//    */
//   state: () => ({
//     /**
//      * products: [] as ProductType[]
//      *
//      * 語法拆解：
//      * - products: ... 這個 ":" 是物件欄位指定值（不是型別）
//      * - [] 是空陣列（JS 值）
//      * - as ProductType[] 是「型別斷言」
//      *   意思是：告訴 TS「把這個陣列當成 ProductType 的陣列」
//      *
//      * 為什麼要 as？
//      * - TS 對 [] 的預設推斷常常太寬或太窄
//      * - 我想要明確告訴它：未來會塞 ProductType 進去
//      */
//     products: [] as ProductType[],

//     /**
//      * filterProducts：畫面顯示用的清單
//      * - 原始資料 products 不動它（比較安全）
//      * - 篩選/搜尋/排序都對 filterProducts 做
//      */
//     filterProducts: [] as ProductType[],

//     /**
//      * priceRange: ["", ""] as any
//      *
//      * 語法拆解：
//      * - ["", ""]：陣列裡兩個字串，代表 [min, max]
//      * - as any：any 代表「放棄型別檢查」
//      *
//      * 為什麼這裡用 any？
//      * - 有些 UI 元件回傳可能是 number[] 或 string[]
//      * - 先放寬型別避免被 TS 卡住（但缺點是比較容易藏 bug）
//      */
//     priceRange: ["", ""] as any,

//     /**
//      * activeCls: "" as string
//      * - "" 是空字串（JS 值）
//      * - as string：告訴 TS 這欄位就是字串
//      */
//     activeCls: "" as string,

//     /**
//      * searchQuery：記錄搜尋字串
//      */
//     searchQuery: "" as string,

//     /**
//      * loaded：是否已經抓過資料（簡單快取）
//      * - false：還沒抓
//      * - true：抓過了（後面 fetchProducts 會直接 return）
//      */
//     loaded: false as boolean,

//     /**
//      * loading：抓資料中
//      */
//     loading: false as boolean,

//     /**
//      * error：抓資料失敗訊息
//      */
//     error: "" as string,
//   }),

//   actions: {
//     /**
//      * async fetchProducts()
//      *
//      * 語法拆解：
//      * - async：代表這個函式會回傳 Promise
//      * - await：可以「等」Promise 完成再繼續往下
//      *
//      * 這支 function 的責任：
//      * 1) 打 /api/products
//      * 2) 把資料塞進 products & filterProducts
//      * 3) loaded 設 true，避免重抓
//      */
//     async fetchProducts() {
//       /**
//        * if (this.loaded) return;
//        *
//        * 語法拆解：
//        * - this：在 Pinia 的 actions 裡，this 指向 store 本身
//        * - return：直接結束函式
//        *
//        * 效果：抓過就不抓，避免切頁一直打 API
//        */
//       if (this.loaded) return;

//       /**
//        * 先把狀態切到 loading，並清空 error
//        * - 這樣畫面可以顯示「載入中」
//        */
//       this.loading = true;
//       this.error = "";

//       try {
//         /**
//          * const data = await $fetch<ProductType[]>("/api/products");
//          *
//          * 語法拆解：
//          * - const：宣告常數變數（不能重新指定）
//          * - await：等 $fetch 完成
//          * - $fetch：Nuxt 內建的 fetch 包裝，打同站 API 很方便
//          * - <ProductType[]>：TS 泛型（我「期望」回來是商品陣列）
//          *
//          * 注意：泛型是「期望」，不是保證，所以後面還要 Array.isArray 防呆
//          */
//         const data = await $fetch<ProductType[]>("/api/products");

//         /**
//          * const list = Array.isArray(data) ? data : [];
//          *
//          * 語法拆解：
//          * - Array.isArray(x)：判斷 x 是不是陣列（JS 原生）
//          * - ? : 這是三元運算子
//          *   (條件) ? 條件為真回傳左邊 : 條件為假回傳右邊
//          *
//          * 效果：確保 list 一定是陣列，不然就給空陣列
//          */
//         const list = Array.isArray(data) ? data : [];

//         // 把原始資料存起來
//         this.products = list;

//         // 預設畫面顯示 = 全部商品
//         this.filterProducts = list;

//         // 設成已抓過（快取）
//         this.loaded = true;
//       } catch (err: any) {
//         /**
//          * catch (err: any)
//          *
//          * 語法拆解：
//          * - err 是錯誤物件
//          * - : any 表示我不限制 err 型別（因為不同環境錯誤型別可能不同）
//          */

//         /**
//          * this.error = err?.message || "Failed to fetch products";
//          *
//          * 語法拆解：
//          * - err?.message：可選鏈（optional chaining）
//          *   如果 err 是 null/undefined，就不會爆炸，結果會是 undefined
//          * - ||：或運算子（左邊是假值就用右邊）
//          */
//         this.error = err?.message || "Failed to fetch products";

//         // 出錯就清空，避免畫面顯示舊資料
//         this.products = [];
//         this.filterProducts = [];
//       } finally {
//         /**
//          * finally：不管 try 成功或失敗都會跑
//          * - 用來做收尾（關掉 loading）
//          */
//         this.loading = false;
//       }
//     },

//     /**
//      * handleSearch(query: string)
//      *
//      * 語法拆解：
//      * - query: string：這裡的 ":" 是 TS 型別註記
//      *   表示 query 參數應該是字串
//      */
//     handleSearch(query: string) {
//       /**
//        * const q = (query || "").trim();
//        *
//        * 語法拆解：
//        * - (query || "")：如果 query 是空/undefined/null，就用空字串
//        * - .trim()：去掉頭尾空白
//        */
//       const q = (query || "").trim();
//       this.searchQuery = q;

//       // 如果沒有搜尋字串，就回到全部商品
//       if (!q) {
//         this.filterProducts = this.products;
//         this.activeCls = "";
//         return;
//       }

//       // 轉小寫，做不分大小寫搜尋
//       const qLower = q.toLowerCase();

//       /**
//        * this.filterProducts = this.products.filter(...)
//        *
//        * 語法拆解：
//        * - .filter(fn)：回傳符合條件的新陣列（不會改動原陣列）
//        * - (p) => {...}：箭頭函式，p 是每個商品
//        */
//       this.filterProducts = this.products.filter((p) => {
//         const title = (p.title || "").toString().toLowerCase();
//         return title.includes(qLower);
//       });

//       this.activeCls = q;
//     },

//     handleParentCategory(value: string) {
//       this.filterProducts = this.products.filter(
//         (p) => p.parentCategory.toLowerCase() === value.toLowerCase()
//       );
//       this.activeCls = value;
//     },

//     handleCategory(value: string) {
//       this.filterProducts = this.products.filter(
//         (p) => p.category.toLowerCase() === value.toLowerCase()
//       );
//       this.activeCls = value;
//     },

//     onChangeRange(value: any) {
//       this.priceRange = value;
//     },

//     filterPrice() {
//       /**
//        * (this.priceRange?.[0] ?? "")
//        *
//        * 這裡有兩個語法點：
//        * 1) ?.  可選鏈：priceRange 不存在就不會爆
//        * 2) ??  空值合併：只有 null/undefined 才用右邊（跟 || 不同）
//        */
//       const minRaw = (this.priceRange?.[0] ?? "").toString().trim();
//       const maxRaw = (this.priceRange?.[1] ?? "").toString().trim();

//       const minNum = minRaw === "" ? 0 : Number(minRaw);
//       const maxNum = maxRaw === "" ? Infinity : Number(maxRaw);

//       const min = Number.isFinite(minNum) ? minNum : 0;
//       const max = Number.isFinite(maxNum) ? maxNum : Infinity;

//       let lo = min;
//       let hi = max;
//       if (lo > hi) [lo, hi] = [hi, lo];

//       this.filterProducts = this.products.filter((p) => {
//         const price = Number(p.price);
//         if (!Number.isFinite(price)) return false;
//         return price >= lo && price <= hi;
//       });

//       this.activeCls = `price:${lo}-${hi === Infinity ? "" : hi}`;
//     },

//     handleSize(size: string) {
//       this.filterProducts = this.products.filter((p) => p.sizes?.includes(size));
//       this.activeCls = size;
//     },

//     handleColor(color: string) {
//       this.filterProducts = this.products.filter((p) => p.colors?.includes(color));
//       this.activeCls = color;
//     },

//     handleBrand(brand: string) {
//       this.filterProducts = this.products.filter(
//         (p) => p.brand.toLowerCase() === brand.toLowerCase()
//       );
//       this.activeCls = brand;
//     },

//     handleSelectFiltering(value: string) {
//       switch (value) {
//         case "Default Sorting":
//           return (this.filterProducts = this.products);

//         /**
//          * this.products.slice().sort(...)
//          *
//          * - slice()：複製一份新陣列（避免 sort 直接改到原陣列）
//          * - sort()：排序（會「改動陣列本身」）
//          */
//         case "Price High To Low":
//           return (this.filterProducts = this.products
//             .slice()
//             .sort((a, b) => b.price - a.price));

//         case "Price Low To High":
//           return (this.filterProducts = this.products
//             .slice()
//             .sort((a, b) => a.price - b.price));

//         default:
//           return (this.filterProducts = this.products);
//       }
//     },

//     handleResetFilter() {
//       this.filterProducts = this.products;
//       this.activeCls = "";
//       this.searchQuery = "";
//       this.priceRange = ["", ""];
//     },
//   },

//   getters: {
//     /**
//      * getters 裡回傳 function（可帶參數）
//      * - getRelatedProducts(state) 先拿到 state
//      * - return (category, id) => ... 再用參數去算結果
//      */
//     getRelatedProducts(state) {
//       return (category: string, id: number) =>
//         state.products
//           .filter((p) => p.category.toLowerCase() === category.toLowerCase() && p.id !== id)
//           .slice(0, 4);
//     },
//   },
// });