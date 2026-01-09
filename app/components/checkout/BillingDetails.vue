<template>
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

    <div class="col-md-12">
      <div class="checkout-form-list create-acc">
        <input @click="handleCreateAccount" id="cbox" type="checkbox" />
        <label for="cbox">建立帳號？</label>
      </div>

      <div
        v-if="createAccount"
        id="cbox_info"
        class="checkout-form-list create-account"
      >
        <p>
          您可以在下方輸入資料以建立帳號。若您已經是會員，請到本頁上方登入。
        </p>

        <label>帳號密碼 <span class="required">*</span></label>
        <input type="password" placeholder="請輸入密碼" />
      </div>
    </div>
  </div>
</template>

<script>
import CountrySelect from "./CountrySelect.vue";

export default {
  components: { CountrySelect },
  data() {
    return {
      createAccount: false,
    };
  },
  methods: {
    handleCreateAccount() {
      this.createAccount = !this.createAccount;
    },
  },
};
</script>
