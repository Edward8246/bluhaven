<template>
  <div class="your-order mb-30">
    <h3>您的訂單</h3>

    <div class="your-order-table table-responsive">
      <table>
        <thead>
          <tr>
            <th class="product-name">商品</th>
            <th class="product-total">小計</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, i) in state.cart_products"
            :key="i"
            class="cart_item"
          >
            <td class="product-name">
              {{ item.title }}
              <strong class="product-quantity"> × {{ item.orderQuantity }}</strong>
            </td>
            <td class="product-total">
              <span class="amount">${{ item.price }}</span>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr class="cart-subtotal">
            <th>購物車小計</th>
            <td>
              <span class="amount">${{ state.totalPriceQuantity.total.toFixed(2) }}</span>
            </td>
          </tr>

          <tr class="shipping">
            <th>運費</th>
            <td>
              <ul>
                <li>
                  <input
                    v-model="ship_cost"
                    :value="7.0"
                    id="flat-rate"
                    name="ship-cost"
                    type="radio"
                  />
                  <label for="flat-rate">
                    固定運費：<span class="amount">$7.00</span>
                  </label>
                </li>

                <li>
                  <input
                    v-model="ship_cost"
                    id="free"
                    value="free"
                    name="ship-cost"
                    type="radio"
                  />
                  <label for="free">免運：</label>
                </li>
              </ul>
            </td>
          </tr>

          <tr class="order-total">
            <th>訂單總額</th>
            <td>
              <strong>
                <span class="amount">
                  ${{
                    typeof ship_cost === "number" && ship_cost > 0
                      ? (state.totalPriceQuantity.total + ship_cost).toFixed(2)
                      : state.totalPriceQuantity.total.toFixed(2)
                  }}
                </span>
              </strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="payment-method">
      <div class="accordion" id="accordionExample">
        <!-- 付款方式 1 -->
        <div class="card">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button
                class="btn-link"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                銀行轉帳
              </button>
            </h5>
          </div>

          <div
            id="collapseOne"
            class="collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div class="card-body">
              請將款項直接匯入我們的銀行帳戶。請使用「訂單編號」作為匯款備註。
              我們確認入帳後才會安排出貨。
            </div>
          </div>
        </div>

        <!-- 付款方式 2 -->
        <div class="card">
          <div class="card-header" id="headingTwo">
            <h5 class="mb-0">
              <button
                class="btn-link collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                信用卡付款
              </button>
            </h5>
          </div>

          <div
            id="collapseTwo"
            class="collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div class="card-body">
            送出訂單按鈕，將會導向安全的第三方信用卡付款平台進行付款
            </div>
          </div>
        </div>
      </div>

      <div class="order-button-payment mt-20">
        <button type="submit" class="os-btn os-btn-black">送出訂單</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCartStore } from "~/store/useCart";

export default defineComponent({
  data() {
    return {
      ship_cost: 0,
    };
  },
  setup() {
    const state = useCartStore();
    return { state };
  },
});
</script>
