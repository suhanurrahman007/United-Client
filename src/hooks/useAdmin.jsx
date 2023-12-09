import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePrivetAxios from "./usePrivetAxios";


const useAdmin = () => {
  const { user, isLoading } = useAuth();
  // console.log(user?.email);
  const privetAxios = usePrivetAxios();

  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !isLoading,
    queryFn: async () => {
      const res = await privetAxios.get(`/users/admin/${user?.email}`);
      // console.log(res.data);
      return res.data.admin;
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
