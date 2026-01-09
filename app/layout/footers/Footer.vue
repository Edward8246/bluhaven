<template>
  <section :class="`footer__area footer-bg ${box_style ? 'box-m-15' : ''}`">
      <div class="footer__top pt-100 pb-60">
          <div class="container">
              <div class="row">
                  <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                      <div class="footer__widget mb-30">
                          <div class="footer__widget-title mb-25">
                              <nuxt-link href="/">
                                <img src="~/assets/img/logo/logolight.png" alt="logo" class="footer-logo" />
                              </nuxt-link>
                          </div>
                          <div class="footer__widget-content">
                              <p>以藍色為名的居家商品店，是你成家的港灣</p>
                              <div class="footer__contact">
                                  <ul>
                                      <li>
                                          <div class="icon">
                                              <i class="fal fa-map-marker-alt"></i>
                                          </div>
                                          <div class="text">
                                              <span>地址:台北市中正區中正路999號9樓</span>
                                          </div>
                                      </li>
                                      <li>
                                          <div class="icon">
                                              <i class="fal fa-envelope-open-text"></i>
                                          </div>
                                          <div class="text">
                                              <span>Email: BluHavan@gmail.com</span>
                                          </div>
                                      </li>
                                      <li>
                                          <div class="icon">
                                              <i class="fal fa-phone-alt"></i>
                                          </div>
                                          <div class="text">
                                              <span>電話:(02)25454578</span>
                                          </div>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="col-xl-3 col-lg-3 col-md-3 col-12">
                      <div class="footer__widget mb-30">
                          <div class="footer__widget-title">
                              <h5>相關資訊</h5>
                          </div>
                          <div class="footer__widget-content">
                              <div class="footer__links">
                                  <ul>
                                      <li><a href="#">關於我們</a></li>                               
                                      <li><a href="#">配送資訊</a></li>
                                      <li><a href="#">服務條款</a></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="col-xl-3 col-lg-3 col-md-3 col-12">
                      <div class="footer__widget mb-30">
                          <div class="footer__widget-title mb-25">
                              <h5>客戶服務</h5>
                          </div>
                          <div class="footer__widget-content">
                              <div class="footer__links">
                                  <ul>                        
                                      <li><a href="#">聯繫我們</a></li>
                                      <li><a href="#">退貨條款</a></li>
                                      <li><a href="#">臉書Facebook</a></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="footer__bottom">
          <div class="container">
              <div class="row">
                  <div class="col-xl-6 col-lg-7">
                      <div class="footer__copyright">
                          <p>Copyright {{new Date().getFullYear()}} © <nuxt-link href="/">BluHavan</nuxt-link></p>
                      </div>
                  </div>
                  <div class="col-xl-6 col-lg-5">
                      <div class="footer__social f-right">
                          <ul>
                              <social/>
                              <li><a href="#"><i class="fas fa-share-alt"></i></a></li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Social from '~/components/social/Social.vue';

export default defineComponent({
  components: { Social },
  props:{
    box_style:{
        type:Boolean,
        default:false,
    }
  }
})
</script>

<style lang="scss" scoped>
/*
  Footer Logo 尺寸控制（桌機/平板/手機）
  - height 控高度，width:auto 會等比例縮放
  - max-width:100% 避免超出容器
  - object-fit:contain 確保圖不被裁切
*/
.footer-logo {
  height: 44px;      /* 桌機預設高度：你可以改 40~56 之間 */
  width: auto;
  max-width: 100%;
  object-fit: contain;
  display: block;
}

/* 平板 */
@media (max-width: 991px) {
  .footer-logo {
    height: 40px;
  }
}

/* 手機 */
@media (max-width: 575px) {
  .footer-logo {
    height: 34px;
  }
}
</style>

