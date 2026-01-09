<template>
  <section :class="`subscribe__area ${style_2 ? 'grey-bg box-m-15' : ''} pb-100 ${style_3?'p-relative':''}`">
      <div :class="`${style_3?'custom-container':'container'}`">
          <div :class="`subscribe__inner ${style_2 ? 'subscribe__inner-2 pt-120' : 'pt-95'}`">
              <div class="row">
                  <div class="col-xl-8 offset-xl-2 col-lg-8 offset-lg-2">
                      <div class="subscribe__content text-center">
                            <h2>得到優惠資訊</h2> 
                            <p>訂閱 BluHaven 電子報，即時掌握新品上市、特別優惠及各項折扣消息。</p>
                          <div class="subscribe__form">
                              <form @submit.prevent="handleFormSubmit">
                                  <input required type="email" v-model="inputVal" placeholder="訂閱電子報以獲取最新消息..." />
                                  <button class="os-btn os-btn-2 os-btn-3">訂閱</button>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props:{
    style_2:{
      type:Boolean,
      default:false,
    },
    style_3:{
      type:Boolean,
      default:false,
    }
  },
  data() {
    return {
      inputVal:''
    }
  },
  methods:{
    handleFormSubmit(){
      console.log(this.inputVal)
    }
  }
})
</script>
