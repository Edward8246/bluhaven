<template>
  <form action="#">
    <div class="password__input">
      <p>舊密碼</p>
      <input type="password" placeholder="請輸入舊密碼" />
    </div>

    <div class="password__input">
      <p>新密碼</p>
      <input type="password" placeholder="請輸入新密碼" />
    </div>

    <div class="password__input">
      <p>確認新密碼</p>
      <input type="password" placeholder="請再次輸入新密碼" />
    </div>

    <div class="password__input">
      <button type="submit" class="os-btn os-btn-black">更新密碼</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
