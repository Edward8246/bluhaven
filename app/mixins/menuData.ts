import {type menuType} from "~/types/menuType";

export default {
  data() {
    return {
      menuData: [
        // {
        //   link: '/shop',
        //   title: 'Shop',
        //   hasDropdown: true,
        //   megamenu: true,
        //   dropdownItems: [
        //     {
        //       link: '/shop',
        //       title: 'Shop Pages',
        //       dropdownMenu: [
        //         { link: '/shop', title: 'Standard Shop Page' },
        //         { link: '/shop-right', title: 'Shop Right Sidebar' },
        //         { link: '/shop-4-col', title: 'Shop 4 Column' },
        //         { link: '/shop-3-col', title: 'Shop 3 Column' },
        //         { link: '/shop', title: 'Shop Page' },
        //         { link: '/shop', title: 'Shop Page' },
        //         { link: '/shop', title: 'Shop Infinity' },
        //       ]
        //     },
        //     {
        //       link: '/shop',
        //       title: 'Products Pages',
        //       dropdownMenu: [
        //         { link: '/product-details', title: 'Product Details' },
        //         { link: '/product-details', title: 'Product Page V2' },
        //         { link: '/product-details', title: 'Product Page V3' },
        //         { link: '/product-details', title: 'Product Page V4' },
        //         { link: '/product-details', title: 'Simple Product' },
        //         { link: '/product-details', title: 'Variable Product' },
        //         { link: '/product-details', title: 'External Product' },
        //       ]
        //     },
        //     {
        //       link: '/shop',
        //       title: 'Other Shop Pages',
        //       dropdownMenu: [
        //         { link: '/wishlist', title: 'Wishlist' },
        //         { link: '/compare', title: 'Compare' },
        //         { link: '/cart', title: 'Shopping Cart' },
        //         { link: '/checkout', title: 'Checkout' },
        //         { link: '/register', title: 'Register' },
        //         { link: '/login', title: 'Login' },
        //       ]
        //     },
        //   ]
        // },

        // {
        //   link: '/shop',
        //   title: 'Pages',
        //   hasDropdown: true,
        //   megamenu: false,
        //   dropdownItems: [
        //     { link: '/wishlist', title: 'Wishlist' },
        //     { link: '/cart', title: 'Shopping Cart' },
        //     { link: '/checkout', title: 'Checkout' },
        //     { link: '/account', title: 'Account' },
        //     { link: '/register', title: 'Register' },
        //     { link: '/login', title: 'Login' },
        //     { link: '/404', title: 'Error 404' },
        //   ]
        // },
        {
          link: '/shop',
          title: '商城',
        },
        {
          link: '/wishlist',
          title: '願望清單',
        },
        {
          link: '/contact',
          title: '聯繫我們',
        },
      ] as menuType[]
    }
  }
}