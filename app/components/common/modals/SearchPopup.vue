<template>
  <!--
    這個 section 是「搜尋彈窗」本體
    - showSearch = true  時，class 會加上 search-opened，讓彈窗顯示
    - showSearch = false 時，彈窗收起來
  -->
  <section :class="`header__search white-bg transition-3 ${showSearch ? 'search-opened' : ''}`">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <div class="header__search-inner text-center">
            <!--
             不用 <form action="#">？
              因為 action="#" 會真的送出、刷新頁面（不符合 SPA / Nuxt 的體驗）
              所以我們用 @submit.prevent 攔截 submit：
              - prevent = 阻止預設行為（避免刷新）
              - onSubmit() 由我們自己處理導頁（例如導到 /shop?search=xxx）
            -->
            <form @submit.prevent="onSubmit">
              <!--
                關閉按鈕（X）
                - 點擊後呼叫 closeSearch()，把 showSearch 設為 false
                - 彈窗就會收起來
              -->
              <div class="header__search-btn" @click="closeSearch">
                <a href="#" class="header__search-btn-close" aria-label="關閉搜尋">
                  <i class="fal fa-times"></i>
                </a>
              </div>

              <!-- ✅ 彈窗標題（已改中文） -->
              <div class="header__search-header">
                <h3>搜尋</h3>
              </div>


              <div class="header__search-input p-relative">
                <!--
                  v-model.trim 的作用：
                  - v-model：把輸入框內容同步到 searchText
                  - .trim：自動去掉前後空白（避免搜尋到一堆空白造成怪結果）

                  @keyup.esc：
                  - 使用者按 ESC 可以快速關閉搜尋彈窗（提升體驗）
                -->
                <input
                  v-model.trim="searchText"
                  type="text"
                  placeholder="搜尋商品名稱"
                  aria-label="輸入商品名稱"
                  @keyup.esc="closeSearch"
                >

                <!--
                  送出按鈕：
                  - type="submit" 代表按下會觸發 <form> 的 submit
                  - submit 會被 @submit.prevent="onSubmit" 攔下來
                  - 最後由 onSubmit() 導頁到 /shop?search=xxx
                -->
                <button type="submit" aria-label="開始搜尋">
                  <i class="far fa-search"></i>
                </button>
              </div>
            </form>
          </div>
          <!-- /header__search-inner -->
        </div>
      </div>
    </div>
  </section>

  <!--
    body overlay（背景遮罩）
    - showSearch 開啟時加上 opened class 讓遮罩顯示
    - 點遮罩也會關閉搜尋彈窗（closeSearch）
  -->
  <div
    @click="closeSearch"
    :class="`body-overlay transition-3 ${showSearch ? 'opened' : ''}`"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  /*
    這個 component 的用途：
    1) 控制 Search 彈窗顯示/關閉（showSearch）
    2) 接收使用者輸入（searchText）
    3) 送出時導頁到 /shop?search=xxx
  */

  // emits:['searchPopup'], // 如果未來你想改成用 emit 控制開關，也可以打開用

  data() {
    return {
      // 控制彈窗是否顯示
      showSearch: false,

      // 使用者輸入的搜尋文字（會用 v-model 同步）
      searchText: '' as string
    };
  },

  methods: {
    /*
      Header 那邊點「搜尋」時，會用 ref 呼叫 openSearchPopup()
      你原本的 console.log('first') 我保留，方便你確認事件是否有被觸發

      ✅ 以後確定都正常，就可以把 console.log 拿掉
    */
    openSearchPopup() {
      console.log('first');
      this.showSearch = true;
    },

    // 關閉搜尋彈窗：統一寫成一個方法，template 會比較乾淨
    closeSearch() {
      this.showSearch = false;
    },

    /*
      送出搜尋（按 Enter 或點 submit 按鈕）
      目標：導到 /shop?search=xxx

      ✅ 為什麼用 query？
      - /shop?search=hoodie
        這樣 shop 頁就能讀取 route.query.search，做商品過濾
      - 使用者按 F5 重新整理時，網址還在 → 也能維持搜尋結果
        （這就是 query 的好處：狀態可被「網址」保存）
    */
    onSubmit() {
      const q = (this.searchText || '').trim();

      // 先關閉彈窗（體感比較順，不會遮住頁面）
      this.closeSearch();

      // 沒輸入就直接去 shop（等於「清空搜尋」）
      if (!q) {
        this.$router.push('/shop');
        return;
      }

      // 有輸入 → 帶 query 參數給 shop 頁去做過濾
      this.$router.push({ path: '/shop', query: { search: q } });
    }
  }
});
</script>

<style scoped>
/* 1. 核心解決方案：強制 16px 防止 iOS 自動放大 */
.header__search-input input {
  font-size: 16px !important;
}

/* 2. 修正 Placeholder 字體大小（選配，維持美觀） */
.header__search-input input::placeholder {
  font-size: 16px;
}

/* 3. 電腦版還原為你原本想要的較小字體 */
@media (min-width: 768px) {
  .header__search-input input {
    font-size: 14px !important; /* 假設你原本是 14px */
  }
  .header__search-input input::placeholder {
    font-size: 14px;
  }
}
</style>