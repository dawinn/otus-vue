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
        <img v-bind:src="product.image" width="120"/>
      </div>
      <p>{{ product.description }}</p>
    </div>
    <div>картинка: {{ product.image }}</div>
    <div>Цена: {{ product.price }}</div>
  </li>
</template>

<style scoped>
.mdc-list-item {
  list-style: none;
  margin: 0;
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
  transform: translate(calc(50% - 120px), 10px);
}

</style>
