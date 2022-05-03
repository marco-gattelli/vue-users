<template>
  <ul class="w-full">
    <user-card v-for="user in users" :key="user.id" :user="user" />
  </ul>
</template>

<script setup lang="ts">
import UserCard from "@/components/UserCard/UserCard.vue";
import { User } from "@/types/user";

type Props = {
  users: User[];
  searchQuery: string;
};
const { users, searchQuery } = defineProps<Props>();
</script>

<style scoped></style>
