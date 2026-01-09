<template>
  <section class="shop__area pb-65">
    <div class="shop__top grey-bg-6 pt-100 pb-90">
      <div class="container">
        <div class="row">
          <div class="col-xl-6 col-lg-6">
            <div class="product__modal-box d-flex">
              <div class="product__modal-nav mr-20">
                <nav>
                  <div class="nav nav-tabs" id="product-details" role="tablist">
                    <button
                      v-for="(img, i) in item.related_images"
                      :key="i"
                      :class="`nav-item nav-link ${img === active_img ? 'active' : ''}`"
                      @click="handleActiveImg(img)"
                      style="margin-bottom: 5px;"
                    >
                      <div class="product__nav-img w-img">
                        <img
                          :src="img"
                          alt="image"
                          style="width: 95px; height: 120px; object-fit: cover;"
                        />
                      </div>
                    </button>
                  </div>
                </nav>
              </div>

              <div class="tab-content mb-20" id="product-detailsContent">
                <div class="product__modal-img product__thumb w-img">
                  <img :src="active_img" alt="product_img">
                  <div class="product__sale">
                    <span class="new">new</span>
                    <span class="percent">-16%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-6 col-lg-6">
            <product-details-content :item="item" :style_2="true" />
          </div>
        </div>
      </div>
    </div>

    <div class="shop__bottom">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <div class="product__details-tab">
              <div class="product__details-tab-nav text-center mb-45">
                <nav>
                  <div
                    class="nav nav-tabs justify-content-start justify-content-sm-center"
                    id="pro-details"
                    role="tablist"
                  >
                    <a
                      class="nav-item nav-link active"
                      id="des-tab"
                      data-bs-toggle="tab"
                      href="#des"
                      role="tab"
                      aria-controls="des"
                      aria-selected="true"
                    >
                      商品特色
                    </a>

                    <a
                      class="nav-item nav-link"
                      id="add-tab"
                      data-bs-toggle="tab"
                      href="#add"
                      role="tab"
                      aria-controls="add"
                      aria-selected="false"
                    >
                      商品規格
                    </a>

                    <!--
                      ⛔ 已移除 Reviews
                      原因：目前 Reviews
                      若未來要加回：
                      1) 把這個 Reviews tab 按鈕加回來（href="#review"）
                      2) 把下面 review 的 tab-pane 加回來（<product-details-review .../>）
                      3) Script 再 import + components 註冊 ProductDetailsReview
                    -->
                    <!--
                    <a class="nav-item nav-link" id="review-tab" data-bs-toggle="tab" href="#review" role="tab" aria-controls="review" aria-selected="false">
                      Reviews (4)
                    </a>
                    -->
                  </div>
                </nav>
              </div>

              <div class="tab-content" id="pro-detailsContent">
                <div class="tab-pane fade show active" id="des" role="tabpanel">
                  <div class="product__details-des">
                    <p>{{ item.details.details_text }}</p>

                    <div class="product__details-des-list mb-20">
                      <ul>
                        <li v-for="(list, i) in item.details.details_list" :key="i">
                          <span>{{ list }}</span>
                        </li>
                      </ul>
                    </div>

                    <p>{{ item.details.details_text_2 }}</p>
                  </div>
                </div>

                <div class="tab-pane fade" id="add" role="tabpanel">
                  <div class="product__details-add">
                    <ul>
                      <li><span>Weight</span></li>
                      <li><span>.25 KG</span></li>
                      <li><span>Dimention</span></li>
                      <li><span>62 × 56 × 12 cm</span></li>
                      <li><span>Size</span></li>
                      <li><span>XL, XXL, LG, SM, MD</span></li>
                    </ul>
                  </div>
                </div>

                <!--  Reviews tab-pane 已移除（原本 id="review" 的那段整段刪掉） -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- related products start -->
  <related-products :item="item" />
  <!-- related products end -->
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { type ProductType } from '~/types/productType';
import ProductDetailsContent from './ProductDetailsContent.vue';
// ⛔ Reviews 已移除：不再 import ProductDetailsReview
import RelatedProducts from './RelatedProducts.vue';

export default defineComponent({
  components: {
    ProductDetailsContent,
    // ⛔ Reviews 已移除：不再註冊 ProductDetailsReview
    RelatedProducts
  },
  props: {
    item: {
      type: Object as PropType<ProductType>,
      default: {},
      required: true
    }
  },
  data() {
    return {
      active_img: this.item.img
    };
  },
  methods: {
    handleActiveImg(img: string) {
      this.active_img = img;
    }
  }
});
</script>
