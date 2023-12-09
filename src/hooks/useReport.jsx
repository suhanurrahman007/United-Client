import { useQuery } from '@tanstack/react-query';
import usePrivetAxios from './usePrivetAxios';

const useReport = () => {
  const privetAxios = usePrivetAxios();

  const {
    data: report = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["report"],
    queryFn: async () => {
      const res = await privetAxios.get("/report");
      return res.data;
    },
  });

  return [report, refetch, isLoading];
};

export default useReport;