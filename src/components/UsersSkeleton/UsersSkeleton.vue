<template>
  <ul class="w-full" data-testid="users-skeleton">
    <li
      v-for="user in 4"
      :key="user"
      class="p-4 rounded border hover:bg-gray-50 transition-colors duration-500 my-4 w-full animate-pulse"
    >
      <div class="flex justify-between">
        <div class="flex flex-col gap-2">
          <span class="h-5 w-32 bg-gray-400 rounded"></span>
          <span class="h-5 w-44 bg-gray-400 rounded"></span>
          <span class="h-5 w-32 bg-gray-400 rounded"></span>
          <span class="h-5 w-44 bg-gray-400 rounded"></span>
        </div>
        <div class="flex flex-col gap-2 items-end">
          <span class="h-5 w-32 bg-gray-400 rounded"></span>
          <span class="h-5 w-44 bg-gray-400 rounded"></span>
        </div>
      </div>
    </li>
  </ul>
</template>
