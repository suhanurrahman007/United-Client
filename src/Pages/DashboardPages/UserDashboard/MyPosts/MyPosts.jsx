import { useQuery } from "@tanstack/react-query";
import usePrivetAxios from "../../../../hooks/usePrivetAxios";
import useAuth from "../../../../hooks/useAuth";
import Container from "../../../../components/Container";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { GiVote } from "react-icons/gi";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { FaCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../../../../Share/Footer/Footer";


const MyPosts = () => {
  const { user } = useAuth();
  const PrivetAxios = usePrivetAxios();

  const {
    data: posts = [], refetch
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await PrivetAxios.get(`/posts?email=${user.email}`);
      return res.data;
    },
  });

//   console.log(posts);

const handleDelete = (id) => {
  console.log(id);
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        PrivetAxios.delete(`/posts/${id}`)
          .then((res) => {
            console.log(res.data);

            if (res.data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "The selected item has been successfully Deleted.",
                "success"
              );
              refetch()
            }
          });
      } catch (error) {
        console.error("Error deleting assignment:", error);
        Swal.fire(
          "Error",
          "An error occurred while deleting the assignment.",
          "error"
        );
      }
    }
  });
};

  return (
    <div>
      <Container>
        <SectionTitle
          header={"My Post"}
          miniHeader={"Only user can sec Your Post"}
        ></SectionTitle>

        <div className="">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="text-white">
                  <th>Post Title</th>
                  <th>Number of votes</th>
                  <th>Comment</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((item) => (
                  <tr key={item?._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{item?.title}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-accent badge-outline badge-sm">
                        <GiVote></GiVote> <span className="ml-2">Vote :</span>{" "}
                        <span className="font-bold ml-2 ">
                          {parseFloat(item?.upVote) -
                            parseFloat(item?.downVote)}
                        </span>
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`/dashboard/comment/${item?._id}`}
                        className="btn btn-outline btn-primary btn-xs"
                      >
                        <span className="mr-1">
                          <FaCommentDots></FaCommentDots>
                        </span>{" "}
                        Comment
                      </Link>
                    </td>
                    <th>
                      <button
                        onClick={() => handleDelete(item?._id)}
                        className="btn btn-secondary btn-outline btn-sm"
                      >
                        <AiFillDelete></AiFillDelete>
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default MyPosts;
