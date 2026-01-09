<template>
  <section class="profile__menu pb-70 grey-bg">
    <div class="container">
      <div class="row">
        <div class="col-xxl-4 col-md-4">
          <div class="profile__menu-left bg-white mb-50">
            <h3 class="profile__menu-title"><i class="fa fa-list-alt"></i> 菜單</h3>

            <div class="profile__menu-tab">
              <div
                class="nav nav-tabs flex-column justify-content-start text-start"
                id="nav-tab"
                role="tablist"
              >
                <button
                  class="nav-link active"
                  id="nav-account-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-account"
                  type="button"
                  role="tab"
                  aria-controls="nav-account"
                  aria-selected="true"
                >
                  <i class="fa fa-user"></i> 我的帳戶
                </button>

                <button
                  class="nav-link"
                  id="nav-order-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-order"
                  type="button"
                  role="tab"
                  aria-controls="nav-order"
                  aria-selected="false"
                >
                  <i class="fa fa-file"></i> 歷史訂單
                </button>

                <button
                  class="nav-link"
                  id="nav-password-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-password"
                  type="button"
                  role="tab"
                  aria-controls="nav-password"
                  aria-selected="false"
                >
                  <i class="fa fa-lock"></i> 更改密碼
                </button>

                <!-- 目前只是按鈕外觀，未接實際登出邏輯 -->
                <button class="nav-link">
                  <i class="fa fa-sign-out"></i> 登出
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xxl-8 col-md-8">
          <div class="profile__menu-right">
            <div class="tab-content" id="nav-tabContent">
              <!-- 我的帳戶 -->
              <div
                class="tab-pane fade show active"
                id="nav-account"
                role="tabpanel"
                aria-labelledby="nav-account-tab"
              >
                <div class="profile__info">
                  <div class="profile__info-top d-flex justify-content-between align-items-center">
                    <h3 class="profile__info-title">個人資料</h3>

                    <button
                      class="profile__info-btn"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#profile_edit_modal"
                    >
                      <i class="fa-regular fa-pen-to-square"></i> 編輯個人資料
                    </button>
                  </div>

                  <div class="profile__info-wrapper white-bg">
                    <div class="profile__info-item">
                      <p>姓名</p>
                      <h4>陳家豪</h4>
                    </div>

                    <div class="profile__info-item">
                      <p>Email</p>
                      <h4>
                        <a
                          href="mailt:outstock@hotmail.com"
                          class="__cf_email__"
                          data-cfemail="94fdfaf2fbd4f1f0e1fff1e6baf7fbf9"
                        >
                          blueman@gmail.com
                        </a>
                      </h4>
                    </div>

                    <div class="profile__info-item">
                      <p>電話</p>
                      <h4>0954545754</h4>
                    </div>

                    <div class="profile__info-item">
                      <p>地址</p>
                      <h4>台北市中山區中正路999號</h4>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 歷史訂單 -->
              <div
                class="tab-pane fade"
                id="nav-order"
                role="tabpanel"
                aria-labelledby="nav-order-tab"
              >
                <div class="order__info">
                  <div class="order__info-top d-flex justify-content-between align-items-center">
                    <h3 class="order__info-title">我的訂單</h3>

                    <!-- 目前只是按鈕外觀，未接實際清除邏輯 -->
                    <button type="button" class="order__info-btn">
                      <i class="fa-regular fa-trash-can"></i> 清除
                    </button>
                  </div>

                  <div class="order__list white-bg table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">訂單編號</th>
                          <th scope="col">商品名稱</th>
                          <th scope="col">價格</th>
                          <th scope="col">明細</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td class="order__id">A10000001</td>
                          <td>
                            <nuxt-link href="/product-details" class="order__title">
                             實木書桌                    
                            </nuxt-link>
                          </td>
                          <td>5000</td>
                          <td>
                            <nuxt-link href="/product-details" class="order__view-btn">
                              查看
                            </nuxt-link>
                          </td>
                        </tr>

                        <tr>
                          <td class="order__id">A10000002</td>
                          <td>
                            <nuxt-link href="/product-details" class="order__title">
                              高級人體工學椅
                            </nuxt-link>
                          </td>
                          <td>6000</td>
                          <td>
                            <nuxt-link href="/product-details" class="order__view-btn">
                              查看
                            </nuxt-link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- 更改密碼 -->
              <div
                class="tab-pane fade"
                id="nav-password"
                role="tabpanel"
                aria-labelledby="nav-password-tab"
              >
                <div class="password__change">
                  <div class="password__change-top">
                    <h3 class="password__change-title">變更密碼</h3>
                  </div>

                  <div class="password__form white-bg">
                    <!-- form start -->
                    <change-password-form />
                    <!-- form end -->
                  </div>
                </div>
              </div>

              <!-- /tab panes -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- edit modal start -->
  <profile-edit-modal />
  <!-- edit modal end -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProfileEditModal from '../common/modals/ProfileEditModal.vue'
import ChangePasswordForm from '../forms/ChangePasswordForm.vue'

export default defineComponent({
  components: { ChangePasswordForm, ProfileEditModal }
})
</script>
