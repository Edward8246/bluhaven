<template>
  <client-only>
    <!--
      購物車頁面主要內容
      - 若 state.cart_products 為空 → 顯示「購物車是空的」與「前往逛逛」
      - 若有商品 → 顯示表格、優惠碼（目前只是 UI）、清空購物車、總計
    -->
    <section class="cart-area pt-100 pb-100">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <!-- ✅ 空購物車狀態 -->
            <div v-if="state.cart_products.length === 0" class="text-center">
              <h3>購物車目前沒有商品</h3>

              <!--
                to="/shop"：導去商店頁
                （NuxtLink 建議用 to 或 href 其一即可，你原本用 to 沒問題）
              -->
              <nuxt-link class="os-btn os-btn-black mt-20" to="/shop">
                前往逛逛
              </nuxt-link>
            </div>

            <!-- ✅ 有商品才顯示購物車表格 -->
            <form v-if="state.cart_products.length > 0" action="#">
              <div class="table-content table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th class="product-thumbnail">圖片</th>
                      <th class="cart-product-name">商品</th>
                      <th class="product-price">單價</th>
                      <th class="product-quantity">數量</th>
                      <th class="product-subtotal">小計</th>
                      <th class="product-remove">移除</th>
                    </tr>
                  </thead>

                  <tbody>
                    <!--
                      CartItem 是單一商品列的元件
                      會負責：
                      - 顯示商品名稱/圖
                      - +/- 調整數量
                      - 移除商品
                    -->
                    <cart-item
                      v-for="(cartItem, i) in state.cart_products"
                      :key="i"
                      :item="cartItem"
                    />
                  </tbody>
                </table>
              </div>

              <div class="row">
                <div class="col-12">
                  <div class="coupon-all">
                    <!--
                      優惠碼區塊（目前只是 UI）
                      - 如果你沒有要做結帳/優惠碼，面試作品集可保留外觀但不做功能
                      - 或直接整段註解也可以
                    -->
                    <div class="coupon">
                      <input
                        required
                        id="coupon_code"
                        class="input-text"
                        name="coupon_code"
                        value=""
                        placeholder="輸入優惠碼"
                        type="text"
                      >
                      <button class="os-btn os-btn-black" name="apply_coupon" type="button">
                        套用優惠碼
                      </button>
                    </div>

                    <!-- 清空購物車 -->
                    <div class="coupon2">
                      <button
                        @click="state.clear_cart"
                        class="os-btn os-btn-black"
                        name="update_cart"
                        type="button"
                      >
                        清空購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ✅ 總計區 -->
              <div class="row">
                <div class="col-md-5 ms-auto">
                  <div class="cart-page-total">
                    <h2>購物車總計</h2>
                    <ul class="mb-20">
                      <!--
                        小計/總計目前都用同一個 total
                        - 你若未來要做運費/稅金，可以在 store 裡再加欄位
                      -->
                      <!-- <li>小計 <span>${{ state.totalPriceQuantity.total }}</span></li> -->
                      <li>總計 <span>${{ state.totalPriceQuantity.total }}</span></li>
                    </ul>

                    <!-- 前往結帳 -->
                    <nuxt-link class="os-btn" href="/checkout">前往結帳</nuxt-link>
                  </div>
                </div>
              </div>
            </form>
            <!-- /form -->
          </div>
        </div>
      </div>
    </section>
  </client-only>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCartStore } from '~/store/useCart';
import CartItem from './CartItem.vue';

export default defineComponent({
  components: { CartItem },
  setup() {
    // 購物車 Pinia store：提供 cart_products、totalPriceQuantity、clear_cart 等
    const state = useCartStore();
    return { state };
  }
});
</script>
