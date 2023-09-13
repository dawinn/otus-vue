<script setup>
defineProps({
    product: {
      type: Object,
      required: true
    }
  });

</script>


<template>
  <li class="mdc-list-item mdc-card">
    <div class="mdc-card__content">
      <h3>{{  product.title }}</h3>
      <div class="mdc-card__image">
        <img :src="product.image" width="120"/>
      </div>
      <p>{{ product.description }}</p>
    </div>
    <div>Цена: <bold>{{ product.price }}</bold></div>
    <slot></slot>
  </li>
</template>

<style scoped>
.mdc-list-item {
  list-style: none;
  margin: 0;
  overflow: hidden;
}

.mdc-card {
  border: 1px solid #777777;
  border-radius: 4px;
  padding: 8px;
  margin: 4px;
}

.mdc-card:hover {
  background-color: #f8f8f8;
}

.mdc-card__image {
  transform: translate(calc(50% - 60px), 10px);
}
bold {
  font-weight: bolder;
}

</style>
