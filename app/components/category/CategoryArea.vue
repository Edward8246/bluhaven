<template>
  <div
    :class="`banner__area ${style_2?'pt-95':''} ${style_3?'pt-20':''} ${style_4?'pt-30':''}`"
  >
    <div :class="`container ${style_3 ? 'custom-container' : ''}`">
      <div
        :class="`${style_2?'':!style_3 && !style_4 && 'banner__inner p-relative mt--95'} ${style_4 ? 'banner__inner-2 p-relative' : ''}`"
      >
        <div class="row">
          <div
            v-for="item in categoryData.slice(0, 3)"
            :key="item.id"
            class="col-xl-4 col-lg-4 col-md-6"
          >
            <div class="banner__item mb-30 p-relative">
              <div class="banner__thumb fix">
                <nuxt-link href="/shop" class="w-img">
                  <img :src="item.img" alt="banner" />
                </nuxt-link>
              </div>
              <div class="banner__content p-absolute transition-3">
                <h5>
                  <nuxt-link href="/shop" >
                    <span v-html="item.parentTitle"></span>
                  </nuxt-link>
                </h5>
                <nuxt-link href="/shop" class="link-btn">查看商品</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import categoryData from "~/mixins/categoryData";

export default defineComponent({
  mixins: [categoryData],
  props: {
    style_2: {
      type: Boolean,
      default: false,
    },
    style_3: {
      type: Boolean,
      default: false,
    },
    style_4: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
/* ✅ 純 CSS 多重陰影：做出黑色外框（stroke 替代） */
.banner__content h5 a,
.banner__content h5 span,
.banner__content .link-btn {
  color: #fff !important;

  /* 8 方向陰影 = 外框感（黑邊） */
  text-shadow:
    -1px -1px 0 rgba(0, 0, 0, 0.85),
     0   -1px 0 rgba(0, 0, 0, 0.85),
     1px -1px 0 rgba(0, 0, 0, 0.85),
    -1px  0   0 rgba(0, 0, 0, 0.85),
     1px  0   0 rgba(0, 0, 0, 0.85),
    -1px  1px 0 rgba(0, 0, 0, 0.85),
     0    1px 0 rgba(0, 0, 0, 0.85),
     1px  1px 0 rgba(0, 0, 0, 0.85),

    /* 再補一層柔和陰影：讓字更立體、在亮背景也清楚 */
    0 6px 14px rgba(0, 0, 0, 0.45);
}

/* ✅ 字體放大（你要大字） */
.banner__content h5 span {
  font-size: 28px;
  font-weight: 800;
  line-height: 1.15;
}

.banner__content .link-btn {
  font-size: 16px;
  font-weight: 700;
}

/* ✅ Hover：帝芬妮藍（外框仍在，仍清楚） */
.banner__content h5 a:hover,
.banner__content .link-btn:hover {
  color: #0ABAB5 !important;
}
</style>

