import useSwr from "swr";
export const useRequest = <T>(path: string) => {
  if (!path) {
    throw new Error("Path is required");
  }
  const { data, error, mutate } = useSwr<T>(path);
  return { data, error, isLoading: !error && !data, mutate };
};
