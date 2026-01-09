<template>
  <div class="different-address">
    <div class="ship-different-title">
      <h3>
        <label for="ship-box">寄送到不同地址？</label>
        <input @click="handleShipBox" id="ship-box" type="checkbox" />
      </h3>
    </div>

    <div v-if="shipBox" id="ship-box-info">
      <div class="row">
        <!-- <div class="col-md-12">
          <country-select />
        </div> -->

        <div class="col-md-6">
          <div class="checkout-form-list">
            <label>名字 <span class="required">*</span></label>
            <input type="text" placeholder="請輸入名字" />
          </div>
        </div>

        <div class="col-md-6">
          <div class="checkout-form-list">
            <label>姓氏 <span class="required">*</span></label>
            <input type="text" placeholder="請輸入姓氏" />
          </div>
        </div>

        <div class="col-md-12">
          <div class="checkout-form-list">
            <label>公司名稱（選填）</label>
            <input type="text" placeholder="例如：BluHaven有限公司" />
          </div>
        </div>

        <div class="col-md-12">
          <div class="checkout-form-list">
            <label>地址 <span class="required">*</span></label>
            <input type="text" placeholder="街道地址（路/街/段/巷/弄/號）" />
          </div>
        </div>

        <div class="col-md-12">
          <div class="checkout-form-list">
            <input type="text" placeholder="樓層、房號等（選填）" />
          </div>
        </div>

        <div class="col-md-12">
          <div class="checkout-form-list">
            <label>鄉鎮市區 <span class="required">*</span></label>
            <input type="text" placeholder="請輸入鄉鎮市區" />
          </div>
        </div>

        <div class="col-md-6">
          <div class="checkout-form-list">
            <label>縣市 <span class="required">*</span></label>
            <input type="text" placeholder="請輸入縣市" />
          </div>
        </div>

        <div class="col-md-6">
          <div class="checkout-form-list">
            <label>郵遞區號 <span class="required">*</span></label>
            <input type="text" placeholder="請輸入郵遞區號" />
          </div>
        </div>

        <div class="col-md-6">
          <div class="checkout-form-list">
            <label>電子信箱 <span class="required">*</span></label>
            <input type="email" placeholder="請輸入 Email" />
          </div>
        </div>

        <div class="col-md-6">
          <div class="checkout-form-list">
            <label>電話 <span class="required">*</span></label>
            <input type="text" placeholder="請輸入手機或市話" />
          </div>
        </div>
      </div>
    </div>

    <!-- <ClientOnly> -->
    <div class="order-notes">
      <div class="checkout-form-list">
        <label>訂單備註</label>

        <textarea
          id="checkout-mess"
          cols="30"
          rows="10"
          placeholder="請輸入訂單備註，例如：希望晚上配送、管理室代收等。"
        />
      </div>
    </div>
    <!-- </ClientOnly> -->
  </div>
</template>

<script>
import CountrySelect from "./CountrySelect.vue";

export default {
  components: { CountrySelect },
  data() {
    return {
      shipBox: false,
    };
  },
  methods: {
    handleShipBox() {
      this.shipBox = !this.shipBox;
    },
  },
};
</script>
