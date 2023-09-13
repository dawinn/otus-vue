<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      fPriceMin: '',
      fPriceMax: '',
      fTitle: ''
    })
  }
});

const emit = defineEmits(['update:modelValue']);

const filters = computed({
  get() {
    return props.modelValue;
  },
  set() {
    emit('update:modelValue', Object.assign({}, ...props.modelValue));
  }
});

const filterKind = ref('fTitleChanged');

const handleClickFilterKind = () => {
  emit('update:modelValue', {});
}
</script>

<template>
<div class="search-form">
  <h4>Не хотите листать всё подряд? </h4>

  <div class="wrapper">
    <span>Поиск Вам поможет:</span>
    <div v-if="filterKind == 'fPriceChanged'">
      <input type="number"  v-model.lazy.number="filters.fPriceMin" placeholder="минимальная" min="0"/>
      <input type="number"  v-model.lazy.number="filters.fPriceMax" placeholder="максимальна" min="0"/>
    </div>
    <div v-if="filterKind == 'fTitleChanged'">
      <input id="fTitle" type="text" v-model.lazy.trim="filters.fTitle" placeholder="или по его кусочку"/>
    </div>

    <div class="filterGroup">
      <label for="fByPrice">по цене:
        <input type="radio" id="fByPrice" value="fPriceChanged" v-model="filterKind" @change="handleClickFilterKind" />
      </label>
      <label for="fByTitle">по названию:
        <input type="radio" id="fByTitle" value="fTitleChanged" v-model="filterKind" @change="handleClickFilterKind" />
      </label>
    </div>


  </div>
</div>
</template>

<style scoped>

.search-form {
  border: 1px solid #adacac;
  border-radius: 4px;
  padding: 8px;
  margin: 4px;
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}

input [type="text"]{
  width: 100px;
  margin-right: 16px;
}

.filterGroup {

}

input [type="radio"]{
  width: 24px;
  height: 24px;
  margin-right: 16px;
}
</style>
