import { reactive, Ref, ref } from "vue";
import { User } from "@/types/user";
import { apolloClient } from "@/api/client";
import { query } from "@/api/users/users";

export function useUsers() {
  const isLoading: Ref<boolean> = ref(false);
  const hasError: Ref<boolean> = ref(false);
  const users: Ref<User[]> = ref([]);

  async function getFilteredUsers(filterWord: string) {
    hasError.value = false;
    isLoading.value = true;
    try {
      users.value = [];
      const { data } = await apolloClient.query({
        query,
        variables: { q: filterWord },
      });
      users.value = [...data.users.data];
    } catch (e) {
      hasError.value = true;
    }
    isLoading.value = false;
  }

  return { isLoading, hasError, users, getFilteredUsers };
}
