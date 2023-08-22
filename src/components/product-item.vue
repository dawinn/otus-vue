<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
});
</script>


<template>
  <li class="mdc-card">
    <div class="mdc-card__content">
      <h3>{{  product.title }}</h3>
      <p>{{ product.description }}</p>
    </div>
    <div>Цена: {{ product.price }}</div>
  </li>
</template>
