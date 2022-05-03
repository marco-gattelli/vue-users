<script setup lang="ts">
import CommonInput from '@/components/CommonInput/CommonInput.vue'
import {Ref, ref, watch} from "vue";

const model: Ref<string> = ref('')

watch(model, (newValue) => {
  console.log(newValue);
})
</script>

<template>
  <div class="h-full w-full p-8">
    <div class="flex items-center justify-center">
      <common-input v-model="model"/>
    </div>
  </div>
</template>
