<script setup lang="ts">
import CommonInput from "@/components/CommonInput/CommonInput.vue";
import UsersList from "@/components/UsersList/UsersList.vue";
import { computed, Ref, ref } from "vue";
import { watchDebounced, useCounter } from "@vueuse/core";
import { useUsers } from "@/composables/useUsers/useUsers";

const { isLoading, hasError, users, getFilteredUsers } = useUsers();

const searchModel: Ref<string> = ref("");

const { count: page } = useCounter(1);

// TODO: Describe why we use this function
watchDebounced(
  searchModel,
  (newValue) => {
    getFilteredUsers(newValue);
  },
  { debounce: 300 }
);

const paginatedUsers = computed(() => {
  return users.value.slice(0, page.value * 10);
});
</script>

<template>
  <div class="h-full w-full p-8 flex flex-col">
    <div class="flex items-center justify-center">
      <common-input v-model="searchModel" />
    </div>
    <div class="flex-grow flex items-center justify-center">
      <div v-if="hasError">ERROR</div>
      <div v-else-if="isLoading">LOADING...</div>
      <users-list v-else :users="paginatedUsers" :search-query="searchModel" />
    </div>
  </div>
</template>
