<template>
  <!--
    Mini Cart（購物車小視窗）
    - 主要用途：在 Header 的購物車圖示旁邊，快速預覽購物車內容
    - 資料來源：Pinia store（useCartStore）
  -->
  <div class="mini-cart">
    <!--
      1) 購物車為空時顯示提示
      - store.cart_products 是購物車商品陣列
      - 長度 === 0 代表目前沒有任何商品
    -->
    <div v-if="store.cart_products.length === 0">
      <h5>購物車目前是空的</h5>
    </div>

    <!--
      2) 購物車有商品時顯示列表＋小計＋按鈕
    -->
    <div v-if="store.cart_products.length > 0" class="mini-cart-inner">
      <!--
        商品列表
        這裡用動態 class 控制高度（模板原本的設計）：
        - 1 個商品：slider-height_1
        - 2 個商品：slider-height_2
        - 3 個以上：slider-height
      -->
      <ul
        :class="`mini-cart-list ${
          store.cart_products.length === 1
            ? 'slider-height_1'
            : store.cart_products.length === 2
            ? 'slider-height_2'
            : 'slider-height'
        }`"
      >
        <!--
          v-for：把購物車商品一個個列出來
          item：單一商品資料（包含 id/title/img/price/orderQuantity...）
        -->
        <li v-for="(item, i) in store.cart_products" :key="i">
          <!-- 商品圖片：點擊導到商品詳情頁 -->
          <div class="cart-img f-left">
            <nuxt-link :href="`/product-details/${item.id}`">
              <img :src="item.img" alt="product" />
            </nuxt-link>
          </div>

          <!-- 商品標題與價格數量 -->
          <div class="cart-content f-left text-left">
            <h5>
              <nuxt-link :href="`/product-details/${item.id}`">
                <span v-html="item.title"></span>
              </nuxt-link>
            </h5>

            <!--
              顯示「數量 × 價格」
              - item.orderQuantity：購買數量
              - item.price：單價
            -->
            <div class="cart-price">
              <span class="ammount">
                {{ item.orderQuantity }}
                <i class="fal fa-times"></i>
              </span>
              <span class="price">$ {{ item.price }}</span>
            </div>
          </div>

          <!--
            刪除（移除）按鈕
            - 點擊後呼叫 store.remover_cart_products(item)
            - 原本模板用 href="#"，點了可能讓頁面跳到頂部
              所以補上 @click.prevent，避免預設行為
          -->
          <div class="del-icon f-right mt-30" @click="store.remover_cart_products(item)">
            <a href="#" @click.prevent aria-label="從購物車移除商品">
              <i class="fal fa-times"></i>
            </a>
          </div>
        </li>
      </ul>

      <!--
        小計（Subtotal）
        - store.totalPriceQuantity.total：購物車總金額
        - toFixed(2)：顯示兩位小數（例如 199.00）
      -->
      <div class="total-price d-flex justify-content-between mb-30">
        <span>小計：</span>
        <span>${{ store.totalPriceQuantity.total.toFixed(2) }}</span>
      </div>

      <!--
        行動按鈕：
        1) 查看購物車：到 /cart
        2) 結帳：到 /checkout
      -->
      <div class="checkout-link">
        <nuxt-link href="/cart" class="os-btn">查看購物車</nuxt-link>
        <nuxt-link class="os-btn os-btn-black" href="/checkout">結帳</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCartStore } from '~/store/useCart';

export default defineComponent({
  setup() {
    // Pinia 購物車 store：提供 cart_products、totalPriceQuantity、remover_cart_products 等方法/資料
    const store = useCartStore();
    return { store };
  }
});
</script>
