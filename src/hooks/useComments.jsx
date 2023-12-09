import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "./usePublicAxios";

const useComments = () => {
  const publicAxios = usePublicAxios();

  const {
    data: comments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await publicAxios.get("/comment");
      return res.data;
    },
  });

  return [comments, isLoading, refetch];
};

export default useComments;
