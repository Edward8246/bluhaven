<template>
  <section class="contact__area pb-100 pt-95">
    <div class="container">
        <div class="row">
            <div class="col-xl-6 col-lg-6">
                <div class="contact__info">
                    <h3>聯絡資訊</h3>
                    <ul class="mb-55">
                        <li v-for="(item,i) in contactInfo" :key="i" class="d-flex mb-35">
                            <div class="contact__info-icon mr-20">
                                <i :class="item.icon"></i>
                            </div>
                            <div class="contact__info-content">
                                <h6>{{item.title}}:</h6>
                                <span>{{item.subtitle}}</span>
                            </div>
                        </li>
                    </ul>
                    <p>藍色為名的居家商品專賣店</p>

                    <div class="contact__social">
                        <ul>
                            <social/>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-lg-6">
                <div class="contact__form">
                    <h3>聯繫我們</h3>
                    <!-- form start -->
                    <contact-form/>
                    <!-- form end -->
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContactForm from '../forms/ContactForm.vue';
import Social from '../social/Social.vue';

// info type
type InfoData = {
  icon:string,
  title:string,
  subtitle:string,
}

export default defineComponent({
  components: { Social, ContactForm },
  setup () {
    const contactInfo = [
        {
          icon: 'fal fa-map-marker-alt',
          title: '總部地址',
          subtitle: '台北市中正區中正路999號9樓'
        },
        {
          icon: 'fal fa-envelope-open-text',
          title: 'Email',
          subtitle: 'BluHavan@gmail.com'
        },
        {
          icon: 'fal fa-phone-alt',
          title: '電話',
          subtitle: '(02)25454578'
        },
     ] as InfoData[]
    return {contactInfo}
  }
})
</script>
