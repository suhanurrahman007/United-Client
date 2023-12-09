import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "./usePublicAxios";

const usePosts = () => {
  const publicAxios = usePublicAxios();

  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await publicAxios.get(
        `/posts`
      );
      return res.data;
    },
  });

  return [posts, isLoading, refetch];
};

export default usePosts;
