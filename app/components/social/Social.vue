<template>
  <li v-for="(item, i) in social_links" :key="i">
    <a
      :href="item.link"
      :target="item.target"
    >
      <i :class="item.icon"></i>
    </a>
  </li>
</template>

<script>
export default {
  data() {
    return {
      social_links: [
        {
          link: "https://www.facebook.com",
          target: "_blank",
          icon: "fab fa-facebook-f",
          name: "Facebook",
        },
        {
          link: "https://www.instagram.com",
          target: "_blank",
          icon: "fab fa-instagram",
          name: "Instagram",
        },
        {
          link: "https://www.tiktok.com",
          target: "_blank",
          icon: "fab fa-tiktok",
          name: "TikTok",
        },
        {
          link: "https://www.youtube.com",
          target: "_blank",
          icon: "fab fa-youtube",
          name: "YouTube",
        },
      ],
    };
  },
};
</script>