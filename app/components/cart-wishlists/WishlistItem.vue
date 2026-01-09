<template>
  <!--
    WishlistItem：願望清單表格中的「單一商品列」
    功能包含：
    1) 顯示商品圖片/名稱/價格
    2) 一鍵加入購物車
    3) 從願望清單移除
  -->
  <tr>
    <!-- 商品圖片 -->
    <td class="product-thumbnail">
      <nuxt-link :href="`/product-details/${item.id}`">
        <img :src="item.img" alt="product" />
      </nuxt-link>
    </td>

    <!-- 商品名稱 -->
    <td class="product-name">
      <nuxt-link :href="`/product-details/${item.id}`">
        <span v-html="item.title"></span>
      </nuxt-link>
    </td>

    <!-- 單價 -->
    <td class="product-price">
      <span class="amount">${{ item.price }}</span>
    </td>

    <!-- 加入購物車按鈕 -->
    <td class="product-quantity" @click.prevent="cartState.add_cart_product(item)">
      <!--
        這裡 type="button" 比 type="submit" 更合理（避免表單被 submit）
        因為你這是「行為按鈕」，不是送出表單
      -->
      <button class="os-btn os-btn-black" type="button">
        加入購物車
      </button>
    </td>

    <!-- 金額（願望清單通常沒有數量，所以直接顯示價格） -->
    <td class="product-subtotal">
      <span class="amount">${{ item.price }}</span>
    </td>

    <!-- 從願望清單移除 -->
    <td class="product-remove" @click.prevent="wishlistState.removeWishlist(item)">
      <!--
        補上 @click.prevent 避免 href="#" 造成頁面跳到頂部
      -->
      <a href="#" @click.prevent aria-label="從願望清單移除商品">
        <i class="fa fa-times"></i>
      </a>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { type ProductType } from "~/types/productType";
import { useCartStore } from "~/store/useCart";
import { useWishlistStore } from "~/store/useWishlist";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<ProductType>,
      default: {},
      required: true
    }
  },
  setup() {
    // 購物車 store：用來加入購物車
    const cartState = useCartStore();

    // 願望清單 store：用來移除願望清單商品
    const wishlistState = useWishlistStore();

    return { cartState, wishlistState };
  }
});
</script>
