<template>
  <input
    type="text"
    class="rounded border px-2 py-1 w-80"
    :value="modelValue"
    @input="handleInputChange"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  disabled?: boolean;
}
const { modelValue } = defineProps<Props>();
const emits = defineEmits<{
  (e: "update:modelValue", modelValue: string): void;
}>();

function handleInputChange($event: Event) {
  emits("update:modelValue", ($event.target as HTMLInputElement).value);
}
</script>
