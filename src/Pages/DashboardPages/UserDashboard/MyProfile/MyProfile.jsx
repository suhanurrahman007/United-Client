import React, { useEffect, useState } from "react";
import usePayment from "../../../../hooks/usePayment";
import { useQuery } from "@tanstack/react-query";
import usePrivetAxios from "../../../../hooks/usePrivetAxios";
import AdminInfo from "../../AdminDashboard/AdminProfile/AdminInfo";
import Container from "../../../../components/Container";
import useAuth from "../../../../hooks/useAuth";
import usePublicAxios from "../../../../hooks/usePublicAxios";
import Post from "../../../HomePage/Posts/Post";
import { LuBadgeDollarSign } from "react-icons/lu";


const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);

  const [payment] = usePayment();
  const privetAxios = usePrivetAxios();
  const publicAxios = usePublicAxios()
  const { user } = useAuth();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await privetAxios.get("/users");
      return res.data;
    },
  });

  const findMember = payment.find((item) => item.email === user?.email);


  useEffect(() => {
    publicAxios
      .get(`/posts?page=${currentPage}&size=${itemsPerPage}`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      });
  }, [currentPage, itemsPerPage]);
  // console.log(findMember);

  return (
    <Container>
      <h2 className="text-2xl font-bold">
        Hi,{" "}
        <span className="text-orange-700">
          Welcome Back!{" "}
          <span className="badge badge-outline badge-success">
            <span className="mr-2 text-blue-700"><LuBadgeDollarSign></LuBadgeDollarSign></span>
            {findMember?.badge ? findMember?.badge : "Bronze Badge"}
          </span>
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-14">
        <div>
          {posts.map((post) => (
            <Post key={post._id} post={post}></Post>
          ))}
        </div>
        <div>
          <div className="space-y-7">
            {users?.map((user) => (
              <AdminInfo key={user?._id} user={user}></AdminInfo>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MyProfile;
