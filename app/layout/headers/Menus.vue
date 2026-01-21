<template>
  <ul>
    <li
      v-for="(item, index) in menuData"
      :key="index"
      :class="`${
        item.hasDropdown && !item.megamenu
          ? 'active has-dropdown'
          : item.megamenu && 'mega-menu has-dropdown'
      }`"
    >
      <nuxt-link :href="`${item.link}`">{{ item.title }}</nuxt-link>

      <ul
        v-if="item?.hasDropdown && !item.megamenu"
        class="submenu transition-3"
      >
        <li v-for="(menu, index) in item.dropdownItems" :key="index">
          <nuxt-link :href="`${menu.link}`">{{ menu.title }}</nuxt-link>
        </li>
      </ul>

      <ul
        v-if="item.hasDropdown && item.megamenu"
        class="submenu transition-3"
        :style="{ backgroundImage: `url(${bg})` }"
      >
        <li
          v-for="(m_mnu, index) in item.dropdownItems"
          :key="index"
          class="has-dropdown"
        >
          <nuxt-link :href="`${m_mnu.link}`">{{ m_mnu.title }}</nuxt-link>
          <ul>
            <li v-for="(m, index) in m_mnu.dropdownMenu" :key="index">
              <nuxt-link :href="`${m.link}`">{{ m.title }}</nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import menuData from "~/mixins/menuData";

export default defineComponent({
  mixins: [menuData],
  data() {
    return {
      /**
       * ✅ 改重點：public 的圖片不要 import，直接用字串路徑
       * 對應檔案位置：public/img/bg/mega-menu-bg.jpg
       * 使用時寫：/img/bg/mega-menu-bg.jpg
       */
      bg: "/img/bg/mega-menu-bg.jpg",
    };
  },
  setup() {},
});
</script>