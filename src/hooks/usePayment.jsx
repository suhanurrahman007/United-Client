import { useQuery } from "@tanstack/react-query";
import usePrivetAxios from "./usePrivetAxios";
// import useAuth from "./useAuth";

const usePayment = () => {
  const privetAxios = usePrivetAxios();
  // const {user} = useAuth()

  const {
    data: payment = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const res = await privetAxios.get(`/payment`);
      return res.data;
    },
  });

  return [payment, refetch, isLoading];
};

export default usePayment;
