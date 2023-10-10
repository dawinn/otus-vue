<script setup>
import {computed, ref} from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      priceMin: '',
      priceMax: '',
      title: ''
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
  <v-container  class="bg-surface-variant mb-6">
    <v-row
        align="center"
>

      <v-col cols="3">
        <span>Не хотите листать всё подряд? <br/>Поиск Вам поможет:</span>
      </v-col>
      <v-col v-if="filterKind == 'fPriceChanged'" class="el-inline">
        <v-text-field clearable
                      type="number"
                      variant="outlined"
                      v-model.lazy.number="filters.priceMin"
                      placeholder="минимальная"
                      min="0"></v-text-field>
        <v-spacer></v-spacer>
        <v-text-field clearable
                      type="number"
                      variant="outlined"
                      v-model.lazy.number="filters.priceMax"
                      placeholder="максимальна"
                      min="0"></v-text-field>
      </v-col>
      <v-col v-if="filterKind == 'fTitleChanged'">
        <v-text-field clearable
                      variant="outlined"
                      v-model.lazy.trim="filters.title"
                      placeholder="или по его кусочку"></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-radio-group inline
                       v-model="filterKind"
                       @change="handleClickFilterKind">
          <v-radio label="по цене" value="fPriceChanged" true-icon> </v-radio>
          <v-radio label="по названию"  value="fTitleChanged"> </v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.el-inline {
  display: flex;
}
</style>


