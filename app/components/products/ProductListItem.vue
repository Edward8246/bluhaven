<template>
  <div class="product__wrapper mb-40">
    <div class="row">
      <div class="col-xl-4 col-lg-4">
        <div class="product__thumb">
          <nuxt-link :href="`/product-details/${item.id}`" class="w-img">
            <img :src="item.img" alt="product-img">
            <img class="product__thumb-2" :src="item.thumb_img" alt="product-img">
          </nuxt-link>

          <div v-if="item.sale_of_per || item.new" class="product__sale">
            <span v-if="item.new || item.sale_of_per" class="new">new</span>
            <span v-if="item.sale_of_per" class="percent">-{{ item.sale_of_per }}%</span>
          </div>
        </div>
      </div>

      <div class="col-xl-8 col-lg-8">
        <div class="product__content p-relative">
          <div class="product__content-inner list product-list--compact">
            <!--  只保留：商品名稱 -->
            <h4 class="product-title">
              <nuxt-link :href="`/product-details/${item.id}`">
                <span v-html="item.title"></span>
              </nuxt-link>
            </h4>

            <!-- 只保留：價格 -->
            <div class="product__price-2 product-price">
              <span class="current">
                ${{ typeof item.price === 'number' ? item.price.toFixed(2) : item.price }}
              </span>
              <span v-if="item.old_price" class="old-price">
                ${{ item.old_price }}
              </span>
            </div>

            <!--
               不要的內容（先註解保留，未來想加回來再打開）
              - 簡短描述：item.sm_desc
              - 賣點列表：item.details.details_list
            -->
            <!--
            <p>{{ item.sm_desc }}</p>

            <div class="product__list mb-30">
              <ul>
                <li v-for="(list,i) in item.details.details_list?.slice(0,3)" :key="i">
                  <span>{{ list }}</span>
                </li>
              </ul>
            </div>
            -->
          </div>

          <!--  操作區：保留 Add to Cart + Wishlist -->
          <div class="add-cart-list d-sm-flex align-items-center compact-actions">
            <a
              @click.prevent="store.add_cart_product(item)"
              href="#"
              class="add-cart-btn mr-10"
            >
              + Add to Cart
            </a>

            <div class="product__action-2 transition-3 mr-20">
              <!--  保留：加入願望清單 -->
              <a
                @click.prevent="wishlistState.add_wishlist_product(item)"
                href="#"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="加入願望清單"
              >
                <i class="fal fa-heart"></i>
              </a>

              <!--  Compare 暫時停用 -->
              <!--
              <a @click.prevent="compareState.add_compare_product(item)" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="加入比較">
                <i class="far fa-compress-alt"></i>
              </a>
              -->

              <!--  放大鏡 Quick View 暫時停用 -->
              <!--
              <a
                @click.prevent="store.initialOrderQuantity"
                href="#"
                data-bs-toggle="modal"
                :data-bs-target="`#productModalListId-${item.id}`"
                title="快速預覽"
              >
                <i class="fal fa-search"></i>
              </a>
              -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--  Quick View modal 暫時停用 -->
  <!--
  <product-modal :item="item" :list="true"/>
  -->
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { type ProductType } from '~/types/productType';
import { useCartStore } from '~/store/useCart';
import { useWishlistStore } from '~/store/useWishlist';

/**
 *  暫時停用 Compare：所以 useCompareStore 註解掉（避免 unused 警告）
 */
// import { useCompareStore } from '~/store/useCompare';

/**
 *  暫時停用 Quick View：不使用 ProductModal，所以 import 註解掉
 */
// import ProductModal from '../common/modals/ProductModal.vue';

export default defineComponent({
  // components: { ProductModal }, // ⛔ 暫時停用 Quick View
  props: {
    item: {
      type: Object as PropType<ProductType>,
      default: {},
      required: true
    }
  },
  setup() {
    const store = useCartStore();
    const wishlistState = useWishlistStore();

    /**
     *  暫時停用 Compare：compareState 註解掉避免 unused
     * const compareState = useCompareStore();
     */
    // const compareState = useCompareStore();

    return { store, wishlistState /*, compareState */ };
  }
});
</script>

<style scoped>
/* =========================
   List 商品卡：精簡版排版
   目標：只顯示「名稱 + 價格」時，不要留一堆空白
   ========================= */

/* 讓標題不要太大、不要跟價格距離太遠 */
.product-list--compact .product-title {
  margin-bottom: 6px;
  line-height: 1.25;
  /* h4 可能被模板設很大，這裡縮回更像清爽電商 */
  font-size: 18px;
}

/* 價格區塊縮小間距 */
.product-list--compact .product-price {
  margin-bottom: 10px;
}

/* 現價字體稍微突出，但不要太誇張 */
.product-list--compact .product-price .current {
  font-size: 16px;
  font-weight: 600;
}

/* 舊價格縮小一點，避免搶焦點 */
.product-list--compact .product-price .old-price {
  font-size: 14px;
  margin-left: 8px;
}

/* 動作區距離上方縮小，讓卡片更緊湊 */
.compact-actions {
  margin-top: 6px;
}

/* 手機版：標題與價格再縮一點，避免擠版 */
@media (max-width: 767px) {
  .product-list--compact .product-title {
    font-size: 16px;
  }
  .product-list--compact .product-price .current {
    font-size: 15px;
  }
}
</style>
