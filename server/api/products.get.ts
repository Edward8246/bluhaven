import { defineEventHandler } from "h3";

// ✅ 讓 Vite/Nitro 在 build 時把 JSON 打包進去（Vercel 穩）
import productsJson from "./data/products.json";

export default defineEventHandler(() => {
  // 你的 JSON 結構是 { "products": [...] }
  // ✅ 回傳純陣列
  return (productsJson as any).products ?? [];
});


// 測試
// import { defineEventHandler } from "h3";

// export default defineEventHandler(() => {
//   return [
//     { id: 1, title: "test", price: 100, img: "/img/shop/product/a1.jpg" },
//   ];
// });