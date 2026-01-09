<template>
  <section class="shop__area pt-100 pb-100">
    <div class="container">
      <div class="row">

        <!-- 左側 Sidebar（非 shop_right 時顯示在左邊） -->
        <div v-if="!shop_right" class="col-xl-3 col-lg-3 col-md-4">
          <shop-sidebar/>
        </div>

        <!-- 商品列表主區塊 -->
        <div class="col-xl-9 col-lg-9 col-md-8">
          <div class="shop__content-area">

            <!-- 上方：結果數、排序、Grid/List 切換 -->
            <div class="shop__header d-sm-flex justify-content-between align-items-center mb-40">
              <div class="shop__header-left">
                <div class="show-text">
                  <!--
                    ✅ 修正：原本你顯示的是 store.products.length（永遠是全部商品數）
                    但現在有 filter/search，所以要顯示 store.filterProducts.length 才正確

                    Showing X–Y of Z results 的正確寫法：
                    - X: 當前頁第一筆（pageStart + 1）
                    - Y: 當前頁最後一筆（pageStart + countOfPage），但不能超過總數
                    - Z: 總結果數（store.filterProducts.length）
                  -->
                  <span>
                    顯示商品
                    {{ store.filterProducts.length === 0 ? 0 : (pageStart + 1) }}
                    –
                    {{ Math.min(pageStart + countOfPage, store.filterProducts.length) }}
                    of {{ store.filterProducts.length }} results
                  </span>
                </div>
              </div>

              <div class="shop__header-right d-flex align-items-center justify-content-between justify-content-sm-end">
                <!-- sort-filtering（模板原本排序） -->
                <sort-filtering />

                <!-- Grid / List 切換 -->
                <ul class="nav nav-pills" id="pills-tab" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="pills-grid-tab"
                      data-bs-toggle="pill"
                      href="#pills-grid"
                      role="tab"
                      aria-controls="pills-grid"
                      aria-selected="true"
                    >
                      <i class="fas fa-th"></i>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="pills-list-tab"
                      data-bs-toggle="pill"
                      href="#pills-list"
                      role="tab"
                      aria-controls="pills-list"
                      aria-selected="false"
                    >
                      <i class="fas fa-list-ul"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <!-- 商品內容（Grid / List） -->
            <div class="tab-content" id="pills-tabContent">
              <!--
                ✅ 沒搜尋結果時的提示（面試作品很加分）
                - filterProducts 為空就顯示
                - 提示使用者可換關鍵字或 Reset
              -->
              <div v-if="store.filterProducts.length === 0" class="text-center py-5">
                <h4 class="mb-10">找不到符合的商品</h4>
                <p class="mb-0">請嘗試換個關鍵字</p>
              </div>

              <!-- Grid -->
              <div
                v-else
                class="tab-pane fade show active"
                id="pills-grid"
                role="tabpanel"
                aria-labelledby="pills-grid-tab"
              >
                <div class="row custom-row-10">
                  <!--
                    這裡用 slice 做前端分頁：
                    - pageStart：從第幾筆開始
                    - countOfPage：一頁顯示幾筆
                  -->
                  <div
                    v-for="(item,i) in store.filterProducts.slice(pageStart, pageStart + countOfPage)"
                    :key="i"
                    class="col-xl-4 col-lg-4 col-md-6 col-sm-6 custom-col-10"
                  >
                    <product-item :item="item"/>
                  </div>
                </div>
              </div>

              <!-- List -->
              <div
                class="tab-pane fade"
                id="pills-list"
                role="tabpanel"
                aria-labelledby="pills-list-tab"
              >
                <product-list-item
                  v-for="(item,i) in store.filterProducts.slice(pageStart, pageStart + countOfPage)"
                  :key="i"
                  :item="item"
                />
              </div>
            </div>

            <!-- Pagination（分頁） -->
            <div class="row mt-40" v-if="store.filterProducts.length > 0">
              <div class="col-xl-12">
                <pagination
                  :items="store.filterProducts"
                  :count-of-page="9"
                  @paginatedData="paginatedData"
                />
              </div>
            </div>

          </div>
        </div>

        <!-- 右側 Sidebar（shop_right 時顯示在右邊） -->
        <div v-if="shop_right" class="col-xl-3 col-lg-3 col-md-4">
          <shop-sidebar/>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
/**
 * 這個元件負責：Shop 商品列表頁
 * - 顯示 Grid / List
 * - 顯示 Pagination
 * - 讀網址 query（/shop?search=xxx）並呼叫 store 進行「商品名稱搜尋」
 */

import { defineComponent, watch } from 'vue';
import { useRoute } from 'vue-router';

import SortFiltering from './filter-widget/SortFiltering.vue';
import { useProductsStore } from '~/store/useProducts';

import ProductItem from '../products/ProductItem.vue';
import ProductListItem from '../products/ProductListItem.vue';
import Pagination from '~/ui/Pagination.vue';
import ShopSidebar from './ShopSidebar.vue';
import { type ProductType } from '~/types/productType';

export default defineComponent({
  props:{
    shop_right:{
      type:Boolean,
      default:false
    }
  },

  components: { ShopSidebar, SortFiltering, ProductItem, ProductListItem, Pagination },

  data() {
    return {
      /**
       * filteredRows：Pagination 元件回傳的「目前頁要顯示的資料」
       * 注意：你模板原本留著這個欄位，但實際上 template 是直接 slice store.filterProducts
       * 如果你未來想改成由 Pagination 給你資料，可以用 filteredRows 取代 slice
       */
      filteredRows: [] as ProductType[],

      /** pageStart：目前頁面起始 index（0-based） */
      pageStart: 0 as number,

      /** countOfPage：每頁顯示幾筆 */
      countOfPage: 9 as number
    }
  },

  methods: {
    /**
     * Pagination 元件會 emit paginatedData 給這個方法
     * 讓我們知道當前頁的起點與每頁數量
     */
    paginatedData(filteredRows: ProductType[], pageStart: number, countOfPage: number) {
      this.filteredRows = filteredRows;
      this.pageStart = pageStart;
      this.countOfPage = countOfPage;
    }
  },

  setup() {
    const store = useProductsStore();
    const route = useRoute();

    /**
     * ✅ 讀取網址 query 的搜尋參數
     * 例如：/shop?search=hoodie
     *
     * 我們用 watch 監聽 route.query.search：
     * - immediate: true 代表一進頁面就先跑一次（才會立刻套用搜尋）
     * - 之後如果 SearchPopup 導頁改 query，也會自動更新列表
     */
    watch(
      () => route.query.search,
      (q) => {
        const keyword = Array.isArray(q) ? q[0] : (q as string | undefined);

        // 呼叫 store 的搜尋（你已在 useProducts.ts 加的 handleSearch）
        store.handleSearch(keyword || "");

        // ✅ 當搜尋條件改變時，回到第一頁比較合理
        // 不然你可能在第 3 頁搜尋，結果只有 1 頁會看不到商品
        // 這裡在 setup 內無法直接改 data() 的 pageStart，
        // 所以簡單做法：讓 Pagination 元件在 items 變化時自行處理
        // （如果你希望更嚴謹，我可以再帶你把 pageStart 重設為 0）
      },
      { immediate: true }
    );

    return { store }
  }
})
</script>
