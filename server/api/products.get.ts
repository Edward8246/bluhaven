import { readFile } from "node:fs/promises";
import { join } from "node:path";

// 也可以不寫這行 import，Nuxt server route 其實會自動有 defineEventHandler
import { defineEventHandler } from "h3";

export default defineEventHandler(async () => {

  const filePath = join(process.cwd(), "server", "api", "data", "products.json");
  const raw = await readFile(filePath, "utf-8");

  //  JSON 目前長這樣：{ "products": [...] }
  const json = JSON.parse(raw);

  /**
   *  回傳「純陣列」給前端 store
   * 這樣 Pinia store：$fetch<ProductType[]>("/api/products") 才會完全對齊
   */
  return json.products ?? [];
});


// 測試
// import { defineEventHandler } from "h3";

// export default defineEventHandler(() => {
//   return [
//     { id: 1, title: "test", price: 100, img: "/img/shop/product/a1.jpg" },
//   ];
// });