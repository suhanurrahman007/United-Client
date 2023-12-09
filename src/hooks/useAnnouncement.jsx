import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "./usePublicAxios";

const useAnnouncement = () => {
    const publicAxios = usePublicAxios();

    const { data: announcement = [], isLoading, refetch } = useQuery({
      queryKey: ["announcement"],
      queryFn: async () => {
        const res = await publicAxios.get("/announcement");
        return res.data;
      },
    });

    return [announcement, isLoading, refetch];
};

export default useAnnouncement;