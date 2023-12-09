import { useQuery } from "@tanstack/react-query";
import usePrivetAxios from "../../../../hooks/usePrivetAxios";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import usePayment from "../../../../hooks/usePayment";
import { useEffect, useState } from "react";
import Footer from "../../../../Share/Footer/Footer";

const ManageUsers = () => {
  const privetAxios = usePrivetAxios();
  const [membership, setMembership] = useState(null);
  const [payment] = usePayment();
  useEffect(() => {
    payment?.map((item) => setMembership(item));
  }, [payment, setMembership]);
  console.log(membership?.email);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await privetAxios.get("/users");
      return res.data;
    },
  });

  const handleAdmin = (id) => {
    console.log(id);
    privetAxios.patch(`/users/admin/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Wow...",
          text: "Admin successfully....!!",
        });

        refetch();
      }
    });
  };

  return (
    <div>
      <div className="py-8 px-5 ">
        <SectionTitle
          header={"Manage User"}
          miniHeader={"All User manage here"}
        ></SectionTitle>
        <div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>User name</th>
                  <th>User email</th>
                  <th>Make admin</th>
                  <th>Subscription Status</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item?.name}</td>
                    <td>{item?.email}</td>
                    <td>
                      {item?.role === "admin" ? (
                        "Admin"
                      ) : (
                        <button
                          onClick={() => handleAdmin(item?._id)}
                          className="btn bg-orange-800 text-white btn-sm"
                        >
                          <FaUsers></FaUsers>
                        </button>
                      )}
                    </td>
                    <td>
                      {item?.email == membership?.email
                        ? membership?.badge
                        : "Normal User"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ManageUsers;
