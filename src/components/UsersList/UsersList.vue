<template>
  <ul class="w-full">
    <user-card v-for="user in users" :key="user.id" :user="user" />
    <li ref="target" />
  </ul>
</template>

<script setup lang="ts">
import UserCard from "@/components/UserCard/UserCard.vue";
import { User } from "@/types/user";
import { useIntersectionObserver } from "@vueuse/core";
import { defineEmits, ref } from "vue";

type Props = {
  users: User[];
};
const { users } = defineProps<Props>();
const emits = defineEmits<{ (e: "loadMore"): void }>();

const target = ref(null);

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting) onIntersecting();
});

function onIntersecting() {
  emits("loadMore");
}
</script>
