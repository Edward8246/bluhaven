import { defineStore } from 'pinia';
import { type ProductType } from '~/types/productType';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart_products: [] as ProductType[],
    orderQuantity: 1 as number,
    quantityCount: 0 as number,
    total: 0 as number,
  }),
  actions: {
    // add_cart_product
    add_cart_product(payload: ProductType) {
      const isExist = this.cart_products.some((i) => i.id === payload.id);
      if (!isExist) {
        const newItem = {
          ...payload,
          orderQuantity: 1,
        };
        this.cart_products.push(newItem);
        useNuxtApp().$toast.success(`已將「${payload.title}」加入購物車`);
      } else {
        this.cart_products.map((item) => {
          if (item.id === payload.id) {
            if (typeof item.orderQuantity !== 'undefined') {
              if (item.quantity >= item.orderQuantity + this.orderQuantity) {
                item.orderQuantity =
                  this.orderQuantity !== 1
                    ? this.orderQuantity + item.orderQuantity
                    : item.orderQuantity + 1;

                useNuxtApp().$toast.success(
                  `已加入 ${this.orderQuantity} 件「${item.title}」到購物車`
                );
              } else {
                useNuxtApp().$toast.error(`此商品庫存不足，無法再增加數量`);
                this.orderQuantity = 1;
              }
            }
          }
          return { ...item };
        });
      }
      localStorage.setItem('cart_products', JSON.stringify(this.cart_products));
    },

    // quantityDecrement
    quantityDecrement(payload: ProductType) {
      this.cart_products.map((item) => {
        if (item.id === payload.id) {
          if (typeof item.orderQuantity !== 'undefined') {
            if (item.orderQuantity > 1) {
              item.orderQuantity = item.orderQuantity - 1;
            }
          }
        }
        return { ...item };
      });
      localStorage.setItem('cart_products', JSON.stringify(this.cart_products));
    },

    // remover_cart_products
    remover_cart_products(payload: ProductType) {
      this.cart_products = this.cart_products.filter((p) => p.id !== payload.id);
      useNuxtApp().$toast.error(`已將「${payload.title}」從購物車移除`);
      localStorage.setItem('cart_products', JSON.stringify(this.cart_products));
    },

    clear_cart() {
      const confirmMsg = window.confirm('確定要清空購物車內的所有商品嗎？');
      if (confirmMsg) {
        this.cart_products = [];
      }
      localStorage.setItem('cart_products', JSON.stringify(this.cart_products));
    },

    initialOrderQuantity() {
      this.orderQuantity = 1;
    },
  },

  getters: {
    totalPriceQuantity: (state) => {
      return state.cart_products.reduce(
        (cartTotal, cartItem) => {
          const { price, orderQuantity } = cartItem;
          if (typeof orderQuantity !== 'undefined') {
            const itemTotal = price * orderQuantity;
            cartTotal.quantity += orderQuantity;
            cartTotal.total += itemTotal;
          }
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
    },

    get_cart_products: (state) => {
      if (process.client) {
        const data = localStorage.getItem('cart_products');
        if (data) {
          return (state.cart_products = JSON.parse(data));
        } else {
          localStorage.setItem('cart_products', JSON.stringify([]));
          return (state.cart_products = []);
        }
      } else {
        return state.cart_products;
      }
    },
  },
});
