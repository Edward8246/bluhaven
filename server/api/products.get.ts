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






//筆記
// import { defineEventHandler } from "h3";
// /**
//  * import { defineEventHandler } from "h3";
//  * ------------------------------------------------------------
//  * - h3 是 Nitro（Nuxt 伺服器）底層用的 HTTP 工具庫
//  * - defineEventHandler(...) 用來「定義一支 API 處理函式」
//  * - 這個檔案放在 server/api 底下時，Nuxt 會自動把它變成 API 路由
//  *
//  * 例如這檔叫：server/api/products.get.ts
//  * 代表它會對應到：
//  *   GET /api/products
//  */

// import productsJson from "./data/products.json";
// /**
//  * import productsJson from "./data/products.json";
//  * ------------------------------------------------------------
//  * 這裡是「直接 import JSON 檔」
//  *
//  * 重點好處（之前 Vercel 會 500 就是卡在這裡）：
//  * - 直接 import：在 build 的時候就會被打包進 server bundle
//  * - 代表上線後不需要去讀實體檔案路徑（不怕路徑找不到）
//  *
//  * 對比另一種寫法（readFile / fs）：
//  * - fs 讀檔：在 Serverless 環境常常因為路徑/權限/打包方式不同而讀不到
//  * - 直接 import：比較穩定
//  */

// /**
//  * type ProductsJson = { ... }
//  * ------------------------------------------------------------
//  * 這是在 TypeScript 裡「定義資料的形狀（型別）」的語法
//  *
//  * 你可以把 type 想成：我先寫一個規格書，告訴自己「這個資料大概長怎樣」
//  *
//  * ProductsJson 這個名字是你自己取的
//  * 代表：「我預期 JSON 會有 products 這個欄位」
//  */
// type ProductsJson = {
//   products?: unknown;
//   /**
//    * products?: unknown
//    * ----------------------------------------------------------
//    * 這句其實有三個重點： products  /  ?  /  unknown
//    *
//    * ① products:
//    * - products 是屬性名稱
//    * - 意思是這個物件可能長這樣： { products: ... }
//    *
//    * ② ?（問號）是什麼？
//    * - 在 TypeScript 裡，「?」代表：這個欄位是「可有可無」
//    * - 也就是說以下兩種都算合法：
//    *   { products: [...] }
//    *   { }  （沒有 products 也可以）
//    *
//    * ③ :（冒號）是什麼？
//    * - 冒號後面接「型別」
//    * - products?: unknown 的意思是：
//    *   「如果 products 存在，它的型別先當 unknown」
//    *
//    * ④ unknown 是什麼？
//    * - unknown 的意思是「我目前不知道它是什麼型別」
//    * - 它比 any 更安全，因為 unknown 不能直接拿來用
//    *   你必須先做檢查（例如 Array.isArray）才能放心使用
//    *
//    * 簡單記法：
//    * - any：我不管你是什麼，先當什麼都能用（風險高）
//    * - unknown：我不知道你是什麼，所以我會先檢查再用（比較穩）
//    */
// };

// export default defineEventHandler(() => {
//   /**
//    * export default ...
//    * ------------------------------------------------------------
//    * - export default 是 ES Module 的語法
//    * - 意思是：這個檔案「主要輸出一個東西」
//    *
//    * 在 Nuxt server/api 裡：
//    * - 你 export default 的 handler 會被 Nuxt 拿去當作這支 API 的處理函式
//    */

//   /**
//    * defineEventHandler(() => { ... })
//    * ------------------------------------------------------------
//    * - defineEventHandler 接收一個函式
//    * - 這個函式就是：當 /api/products 被呼叫時要做什麼
//    *
//    * 你現在的 handler 很單純：
//    * - 把 JSON 的 products 拿出來回傳
//    * - 如果格式不對就回傳空陣列
//    */

//   const data = productsJson as ProductsJson;
//   /**
//    * const data = productsJson as ProductsJson;
//    * ------------------------------------------------------------
//    * 這句的核心是：as（型別斷言 / 型別轉換）
//    *
//    * productsJson 是 import 進來的 JSON
//    * 但 TypeScript 不一定知道它的完整結構
//    *
//    * 所以用：
//    *   as ProductsJson
//    * 告訴 TypeScript：
//    *   「我希望把它當成 ProductsJson 這個形狀來看」
//    *
//    * 注意：as 不會改變資料本身，只是「讓 TS 在編譯階段比較好推斷型別」
//    */

//   // 確保回傳的一定是「陣列」
//   if (Array.isArray(data.products)) {
//     /**
//      * Array.isArray(...)
//      * ----------------------------------------------------------
//      * - 這是一個 JS 內建的判斷：某個值是不是陣列
//      * - 回傳 true / false
//      *
//      * 你這裡做的事情是：
//      * - 如果 data.products 真的是陣列 → 直接回傳它
//      *
//      * 這就是你前面用 unknown 的搭配：
//      * - unknown 不確定型別 → 先檢查 → 檢查通過才使用
//      */
//     return data.products;
//     /**
//      * return data.products;
//      * ----------------------------------------------------------
//      * - return 的值會變成 API 回應給前端的內容
//      * - 也就是前端呼叫 /api/products 會拿到一個陣列
//      */
//   }

//   // 如果 products 不存在或不是陣列，就回傳空陣列（避免前端爆）
//   return [];
//   /**
//    * return [];
//    * ------------------------------------------------------------
//    * 保底做法：
//    * - products 不存在（undefined）
//    * - 或 products 不是 array（例如物件、字串、null）
//    * 都回傳空陣列
//    *
//    * 好處：
//    * - 前端最起碼可以正常跑，只是顯示「沒有商品」
//    * - 不會因為型別錯誤就整個頁面炸掉
//    */
// });





// 測試
// import { defineEventHandler } from "h3";

// export default defineEventHandler(() => {
//   return [
//     { id: 1, title: "test", price: 100, img: "/img/shop/product/a1.jpg" },
//   ];
// });
