<template>
  <div class="sort-wrapper mr-30 pr-25 p-relative">
      <select v-model="selectVal" @change="state.handleSelectFiltering(selectVal)">
          <option value="Default Sorting">綜合排序</option>
          <!-- <option value="Sort By Trending">Sort By Trending</option>
          <option value="Short By BestSeller">Short By BestSeller</option> -->
          <option value="Price High To Low">價格高到低</option>
          <option value="Price Low To High">價格低到高</option>
      </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useProductsStore } from '~/store/useProducts';

export default defineComponent({
  data() {
    return {
      selectVal:'Default Sorting'
    }
  },
  methods:{
    handleSelectValue() {
      console.log(this.selectVal)
    }
  },
  setup () {
    const state = useProductsStore();
    return {state}
  }
})
</script>
