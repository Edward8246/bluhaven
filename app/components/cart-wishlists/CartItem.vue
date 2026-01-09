<template>
  <!--
    CartItem：購物車表格中的「單一商品列」
    功能包含：
    1) 顯示商品圖片/名稱
    2) 調整數量（- / +）
    3) 計算小計（單價 * 數量）
    4) 移除商品
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

    <!-- 數量控制 -->
    <td class="product-quantity">
      <div class="cart-plus-minus">
        <!--
          v-model 綁定數量
          注意：這裡直接改 item.orderQuantity（是 store 裡的物件）
          但正式專案可能會用 action/patch 控制
        -->
        <input type="text" v-model="item.orderQuantity" />

        <!-- 減少數量 -->
        <div @click="state.quantityDecrement(item)" class="dec qtybutton">-</div>

        <!-- 增加數量 -->
        <div @click="state.add_cart_product(item)" class="inc qtybutton">+</div>
      </div>
    </td>

    <!-- 小計（單價 * 數量） -->
    <td class="product-subtotal">
      <span class="amount">
        ${{
          typeof item.orderQuantity !== "undefined" &&
          item.price * item.orderQuantity
        }}
      </span>
    </td>

    <!-- 移除商品 -->
    <td class="product-remove" @click.prevent="state.remover_cart_products(item)">
      <!--
        補上 @click.prevent 避免 href="#" 造成頁面跳到頂部
      -->
      <a href="#" @click.prevent aria-label="移除商品">
        <i class="fa fa-times"></i>
      </a>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { type ProductType } from "~/types/productType";
import { useCartStore } from "~/store/useCart";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<ProductType>,
      default: {},
      required: true
    }
  },
  setup() {
    // 使用購物車 store 來呼叫：add_cart_product / quantityDecrement / remover_cart_products
    const state = useCartStore();
    return { state };
  }
});
</script>
