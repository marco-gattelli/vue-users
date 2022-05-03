<template>
  <li
    class="p-4 rounded border hover:bg-gray-50 transition-colors duration-500 my-4 w-full"
    data-testid="user-card"
  >
    <div class="flex justify-between">
      <div class="flex flex-col gap-2">
        <span>Name: {{ user.name }}</span>
        <span>Email: {{ user.email }}</span>
        <span>Phone: {{ user.phone }}</span>
      </div>
      <div class="flex flex-col items-end gap-2">
        <span>Company: {{ user.company.name }}</span>
        <span class="italic">{{ user.company.catchPhrase }}</span>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { User } from "@/types/user";

type Props = {
  user: User;
};
const { user } = defineProps<Props>();
</script>
