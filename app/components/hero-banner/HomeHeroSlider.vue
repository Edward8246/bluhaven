<template>
  <section :class="`slider__area ${style_2 ? 'slider__area-2' : ''} p-relative tp_hero`">
    <Carousel :items-to-show="1" :wrap-around="true" class="slider-active">
      <Slide
        v-for="item in slider_data"
        :key="item.id"
        :class="`single-slider slider__height ${style_2 ? 'single-slider-2 slider__height-5' : ''} d-flex align-items-center`"
        :style="{ backgroundImage: `url(${item.bgImg})` }"
      >
        <div class="container">
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-8 col-sm-10 col-12">
              <!-- ✅ 加一個 class：只改這塊文字顏色，不影響其他地方 -->
              <div class="slider__content slider-text-white">
                <h2 v-html="item.title"></h2>
                <p v-html="item.subtile"></p>

                <nuxt-link href="/shop" class="os-btn os-btn-2 hero-slider-btn">
                  查看商品
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Carousel, Slide, Pagination } from "vue3-carousel";
import { type HeroSliderType } from "~/types/HeroSliderDataType";

import slider_img_1 from "~/assets/img/slider/slider1.png";
import slider_img_2 from "~/assets/img/slider/slider2.png";
import slider_img_3 from "~/assets/img/slider/slider3.png";

export default defineComponent({
  components: { Carousel, Slide, Pagination },
  props: {
    style_2: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const slider_data = ref<HeroSliderType[]>([
      {
        id: 1,
        bgImg: slider_img_1,
        title: "客廳系列",
        subtile:
          "舒適沙發與質感茶几，打造家人相聚的溫馨核心",
      },
      {
        id: 2,
        bgImg: slider_img_2,
        title: "書房系列",
        subtile:
          "人體工學書桌椅，讓您的靈感在靜謐空間中自由流淌",
      },
      {
        id: 3,
        bgImg: slider_img_3,
        title: "餐廳系列",
        subtile:
          "精選餐桌椅組合，讓每一頓日常餐敘都成為美好饗宴",
      },
    ]);

    return { slider_data };
  },
});
</script>

<style scoped>
/* =========================================================
  Slider 文字：白色 + 黑色外框（更清楚）
  你 template 目前已經有 class="tp_hero"（外層 section）
  我們用 tp_hero 當作用範圍，避免影響其他頁
========================================================= */
.tp_hero .slider__content h2,
.tp_hero .slider__content p {
  color: #fff; /* ✅ 白色文字 */

  /* ✅ 多層陰影做「黑色外框」+ 立體陰影（相容性最好） */
  text-shadow:
    -1px -1px 0 #000,
     1px -1px 0 #000,
    -1px  1px 0 #000,
     1px  1px 0 #000,
     0px  2px 8px rgba(0, 0, 0, 0.55);
}

/* ✅ 標題外框更明顯 */
.tp_hero .slider__content h2 {
  /* 字體變大（桌機） */
  font-size: 54px;
  line-height: 1.1;
  font-weight: 800;

  text-shadow:
    -2px -2px 0 #000,
     2px -2px 0 #000,
    -2px  2px 0 #000,
     2px  2px 0 #000,
     0px  6px 14px rgba(0, 0, 0, 0.6);
}

/* ✅ 內文字體變大 */
.tp_hero .slider__content p {
  font-size: 18px;
  line-height: 1.7;
  margin-top: 12px;
  max-width: 520px;
}

/* =========================================================
  按鈕：白底黑字 + Hover 變色
  你的按鈕 class：os-btn os-btn-2 hero-slider-btn
========================================================= */
/* 讓按鈕本體在最上層 */
.tp_hero a.os-btn.os-btn-2.hero-slider-btn{
  position: relative;
  z-index: 1;
  overflow: hidden;
  font-size: 18px;
}

/* ✅ 這裡才是「真正的背景」：專案是用 ::after 畫底色 */
.tp_hero a.os-btn.os-btn-2.hero-slider-btn::after{
  background: #fff !important;      /* 預設白底 */
}

/* ✅ Hover 要改這裡 */
.tp_hero a.os-btn.os-btn-2.hero-slider-btn:hover::after{
  background: #4383a5 !important;   /* 你的蒂芬妮藍 */
}

/* Hover 文字與邊框（看你要白字或黑字） */
.tp_hero a.os-btn.os-btn-2.hero-slider-btn{
  color: #fff  !important;
  background: #030303 !important;   /* 你的蒂芬妮藍 */
  border-color: #fff !important;
}
.tp_hero a.os-btn.os-btn-2.hero-slider-btn:hover{
  color: #fff !important;
  border-color: #4383a5  !important;
}


/* =========================================================
  RWD：平板 / 手機字體縮小，避免爆版
========================================================= */
@media (max-width: 991px) {
  .tp_hero .slider__content h2 {
    font-size: 40px;
  }
  .tp_hero .slider__content p {
    font-size: 16px;
  }
}

@media (max-width: 575px) {
  .tp_hero .slider__content h2 {
    font-size: 32px;
  }
  .tp_hero .slider__content p {
    font-size: 15px;
  }
  .tp_hero .hero-slider-btn {
    padding: 10px 18px;
  }
}

/* =========================================================
  可選加強（想要更像「真正描邊」可以打開）
  - Chrome/Safari 通常支援
  - 不開也沒差，因為上面 text-shadow 已經很夠
========================================================= */
/*
.tp_hero .slider__content h2 {
  -webkit-text-stroke: 1px #000;
}
.tp_hero .slider__content p {
  -webkit-text-stroke: 0.6px #000;
}
*/
</style>

