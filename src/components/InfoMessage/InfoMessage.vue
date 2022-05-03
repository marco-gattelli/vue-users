<template>
  <div
    class="rounded p-4 border flex items-center justify-center"
    :class="{
      'bg-orange-300': variant === 'warning',
      'bg-red-300': variant === 'error',
    }"
    :data-testid="dataTestId"
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
type Props = {
  message: string;
  dataTestId: string;
  variant: "warning" | "error";
};
const { message, variant, dataTestId } = defineProps<Props>();
</script>
