<template>
  <div class="product__wrapper mb-60">
    <div class="product__thumb">
      <nuxt-link :href="`/product-details/${item.id}`" class="w-img">
        <img :src="item.img" alt="product-img">
        <img class="product__thumb-2" :src="item.thumb_img" alt="product-img">
      </nuxt-link>

      <div class="product__action transition-3">
        <!-- 保留：加入願望清單（Wishlist） -->
        <a
          @click.prevent="wishlistState.add_wishlist_product(item)"
          href="#"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="加入願望清單"
        >
          <i class="fal fa-heart"></i>
        </a>

        <!--
           暫時停用：Compare
          - 原因：你目前不想展示 Compare 功能
          - 做法：把按鈕註解掉（保留原始碼，未來要用再打開）
          - 同時在 <script> 註解 compareState / useCompareStore，避免 unused 警告
        -->
        <!--
        <a @click.prevent="compareState.add_compare_product(item)" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="加入比較">
          <i class="far fa-compress-alt"></i>
        </a>
        -->

        <!--
           暫時停用：放大鏡 Quick View（modal）
          - 原本會打開商品快速預覽的彈窗（ProductModal）
          - 你說「連放大鏡也不要」，所以先註解掉按鈕
          - 同時把下方 <product-modal> 註解掉，不然會多載入一堆 modal DOM
        -->
        <!-- Button trigger modal -->
        <!--
        <a
          @click.prevent="store.initialOrderQuantity"
          href="#"
          data-bs-toggle="modal"
          :data-bs-target="`#productModalId-${item.id}`"
          title="快速預覽"
        >
          <i class="fal fa-search"></i>
        </a>
        -->
      </div>

      <div v-if="item.sale_of_per || item.new" class="product__sale">
        <span v-if="item.new || item.sale_of_per" class="new">new</span>
        <span v-if="item.sale_of_per" class="percent">-{{item.sale_of_per}}%</span>
      </div>
    </div>

    <div class="product__content p-relative">
      <div class="product__content-inner">
        <nuxt-link :href="`/product-details/${item.id}`">
          <span v-html="item.title"></span>
        </nuxt-link>

        <div class="product__price transition-3">
          <span>${{ typeof item.price === 'number' ? item.price.toFixed(2) : item.price }}</span>
          <span v-if="item.old_price" class="old-price">${{ item.old_price }}</span>
        </div>
      </div>

      <div class="add-cart p-absolute transition-3">
        <a @click.prevent="store.add_cart_product(item)" href="#">+ Add to Cart</a>
      </div>
    </div>
  </div>

  <!--
     暫時停用：商品 Quick View modal
    - 你不想要放大鏡功能，所以先註解掉
    - 未來要開回來：把這段註解拿掉 + 上面放大鏡按鈕拿掉註解
  -->
  <!--
  <product-modal :item="item"/>
  -->
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { type ProductType } from '~/types/productType';
import { useCartStore } from '~/store/useCart';
import { useWishlistStore } from '~/store/useWishlist';

/**
 *  暫時停用 Compare：所以先把 useCompareStore 註解掉
 * 這樣才不會出現 TS/ESLint unused 警告
 */
// import { useCompareStore } from '~/store/useCompare';

/**
 *  暫時停用 Quick View：不使用 ProductModal，所以 import 也註解掉
 */
// import ProductModal from '../common/modals/ProductModal.vue';

export default defineComponent({
  // components: { ProductModal }, //  暫時停用 Quick View
  props: {
    item: {
      type: Object as PropType<ProductType>,
      default: {},
      required: true
    }
  },
  setup() {
    /**
     * store：購物車相關（Add to Cart、數量初始化…）
     * wishlistState：願望清單（你要保留）
     */
    const store = useCartStore();
    const wishlistState = useWishlistStore();

    /**
     *  暫時停用 Compare：compareState 也一起註解掉
     * const compareState = useCompareStore();
     */
    // const compareState = useCompareStore();

    return { store, wishlistState /*, compareState */ };
  }
});
</script>
