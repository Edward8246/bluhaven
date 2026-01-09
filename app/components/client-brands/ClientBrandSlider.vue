<template>
  <section :class="`client__area ${style_2 ? '' : 'pt-15 pb-140'}`">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <Carousel
            :items-to-show="5"
            :wrap-around="true"
            :snapAlign="'center'"
            :breakpoints="{
              1200: { itemsToShow: 5 },
              992: { itemsToShow: 3 },
              700: { itemsToShow: 2 },
              0: { itemsToShow: 1 },
            }"
            :class="`client__slider ${style_2 ? 'pt-80 pb-80 border-top-1' : ''} text-center`"
          >
            <Slide v-for="(brand, i) in brands" :key="i" class="client__thumb">
              <a class="client__logo" style="cursor: pointer;">
                <img :src="brand" alt="client logo" />
              </a>
            </Slide>
          </Carousel>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Carousel, Slide } from "vue3-carousel";
import { defineComponent, reactive, toRefs } from "vue";

import b_img_1 from "~/assets/img/client/client-1.png";
import b_img_2 from "~/assets/img/client/client-2.png";
import b_img_3 from "~/assets/img/client/client-3.png";
import b_img_4 from "~/assets/img/client/client-4.png";
import b_img_5 from "~/assets/img/client/client-5.png";

export default defineComponent({
  components: { Carousel, Slide },
  props: {
    style_2: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const state = reactive({
      brands: [b_img_1, b_img_2, b_img_3, b_img_4, b_img_5, b_img_2],
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped>
/* Slide 本身只負責置中 */
.client__thumb {
  display: flex;
  align-items: center;
  justify-content: center;
}

/*
  關鍵設計：
  1️⃣ 容器「一開始就給 2 倍空間」
  2️⃣ 圖片平常縮成 0.5
  3️⃣ hover 還原成 1 = 視覺 2 倍
*/
.client__logo {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 200px;     /* ⭐ 已經是 2 倍空間 */
  max-width: 360px;
  width: 100%;
}

/* Logo 本體 */
.client__logo img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;

  transform: scale(1);          /* ⭐ 平常縮小顯示 */
  transition: transform 0.25s ease;
}

/* ⭐⭐ hover = 還原成正常尺寸（視覺 2 倍） */
.client__logo:hover img {
  transform: scale(1.3);
}

/* 手機稍微小一點 */
@media (max-width: 768px) {
  .client__logo {
    height: 150px;
    max-width: 280px;
  }
}
</style>

