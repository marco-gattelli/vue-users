<script setup lang="ts">
import CommonInput from "@/components/CommonInput/CommonInput.vue";
import { Ref, ref } from "vue";
import { watchDebounced } from "@vueuse/core";

const searchModel: Ref<string> = ref("");

// TODO: Describe why we use this function
watchDebounced(
  searchModel,
  (newValue) => {
    console.log(newValue);
  },
  { debounce: 500 }
);
</script>

<template>
  <div class="h-full w-full p-8">
    <div class="flex items-center justify-center">
      <common-input v-model="searchModel" />
    </div>
  </div>
</template>
