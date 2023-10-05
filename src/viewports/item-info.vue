<script setup>
import { ref } from 'vue';
import useProducts from '@/store/products';
import ProductItem from '@/components/product-item.vue';
const { getProduct } = useProducts();

const props = defineProps({
  id: Number
});
const product = ref(getProduct(props.id));
</script>

<template>
<div class="fullInfo">
  <ProductItem :product="product"
               :detail="true">
  </ProductItem>
</div>

</template>

<style scoped>
bold {
  font-weight: bolder;
}

.fullInfo {
  max-width: 600px;
  margin: 0 auto;
}

</style>
