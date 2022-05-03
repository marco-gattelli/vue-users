<script setup lang="ts">
import CommonInput from "@/components/CommonInput/CommonInput.vue";
import UsersList from "@/components/UsersList/UsersList.vue";
import InfoMessage from "@/components/InfoMessage/InfoMessage.vue";
import UsersSkeleton from "@/components/UsersSkeleton/UsersSkeleton.vue";
import { computed, Ref, ref } from "vue";
import { watchDebounced, useCounter } from "@vueuse/core";
import { useUsers } from "@/composables/useUsers/useUsers";

const { isLoading, hasError, users, getFilteredUsers } = useUsers();

const searchModel: Ref<string> = ref("");

const { count: page, inc, reset } = useCounter(1);

// TODO: Describe why we use this function
watchDebounced(
  searchModel,
  (newValue) => {
    getFilteredUsers(newValue);
    reset();
  },
  { debounce: 300 }
);

const paginatedUsers = computed(() => users.value.slice(0, page.value * 10));
</script>

<template>
  <div class="h-full w-full p-8 flex flex-col">
    <div class="flex items-center justify-center">
      <common-input
        v-model="searchModel"
        placeholder="Please insert something..."
        dataTestId="filter-input"
      />
    </div>
    <div class="flex-grow">
      <info-message
        v-if="hasError"
        class="mt-4"
        message="Ups some error occurred. Please try again"
        variant="error"
        dataTestId="error"
      />
      <users-skeleton v-else-if="isLoading" />
      <info-message
        v-else-if="paginatedUsers.length === 0"
        class="mt-4"
        message="Ups no users found for your query, please change it."
        variant="warning"
        dataTestId="no-users"
      />
      <users-list v-else :users="paginatedUsers" @load-more="inc" />
    </div>
  </div>
</template>
