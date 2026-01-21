import { defineEventHandler } from "h3";

//  讓 Nitro 在 build 時把 JSON 一起打包進 server bundle（Vercel 很穩）
import productsJson from "./data/products.json";

//  先定義我們預期的 JSON 長相：{ products: [] }
type ProductsJson = {
  products?: unknown; // 先用 unknown，等下再檢查是不是陣列
};

export default defineEventHandler(() => {
  const data = productsJson as ProductsJson;

  //  確保回傳的一定是「陣列」
  if (Array.isArray(data.products)) {
    return data.products;
  }

  //  如果 products 不存在或不是陣列，就回傳空陣列（避免前端爆）
  return [];
});

// 測試
// import { defineEventHandler } from "h3";

// export default defineEventHandler(() => {
//   return [
//     { id: 1, title: "test", price: 100, img: "/img/shop/product/a1.jpg" },
//   ];
// });