<template>
  <layout :transparent="true">
    <breadcrumb-area title="Shop" subtitle="Shop" />
    <!-- error area start -->
    <section class="error__area pt-60 pb-100">
      <div class="container">
        <div class="col-xl-8 offset-xl-2 col-lg-8 offset-lg-2">
          <div class="error__content text-center">
            <div class="error__number">
              <h1>404</h1>
            </div>
            <span>not found</span>
            <h2>沒有畫面出現錯誤</h2>
            <p>
              The page are looking for has been moved or doesn’t exist anymore,
              if you like you can return to our homepage. If the problem
              persists, please send us an email to
              <span class="highlight comment">BluHavan@gmail.com</span>
            </p>

            <div class="error__search">
              <nuxt-link to="/" class="os-btn os-btn-3 os-btn-black">
                Back To Home
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- error area end -->
  </layout>
</template>

<script lang="ts" setup>
</script>
