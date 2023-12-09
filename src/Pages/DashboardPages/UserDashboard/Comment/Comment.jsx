import React, { useEffect, useState } from "react";
import useComments from "../../../../hooks/useComments";
import { useParams } from "react-router-dom";
import usePosts from "../../../../hooks/usePosts";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { MdReportProblem } from "react-icons/md";
import useAuth from "../../../../hooks/useAuth";
import usePrivetAxios from "../../../../hooks/usePrivetAxios";

const Comment = () => {
  const [post, setPost] = useState(null);
  const [isButtonActive, setButtonActive] = useState(true);
  const [readMore, setReadMore] = useState();
  const [report, setReport] = useState("");
  const { id } = useParams();
  const { user } = useAuth();
  const privetAxios = usePrivetAxios();
  console.log(id);
  const [comment] = useComments();
  const [posts] = usePosts();
  useEffect(() => {
    posts?.map((item) => {
      console.log(item);
      setPost(item);
    });
  }, [posts]);
  console.log(post);

  const filterComment = comment?.filter((item) => item?.title === post?.title);
  console.log(filterComment);

  const handleReadMoreClick = (comment) => {
    setReadMore(comment);
  };

  const handleReportClick = async () => {
    console.log(report);
    const res = await privetAxios.post("/report", {
      report,
      email: user?.email,
    });
    console.log(res.data);
    // Disable the button after it's clicked
    setButtonActive(false);
  };
  return (
    <div className="bg-[#0F042F] text-white py-10 px-2">
      <SectionTitle
        header={"My Comments"}
        miniHeader={"Only user can sec Your Comments"}
      ></SectionTitle>

      <div className="">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-white">
                <th>email</th>
                <th>comment text</th>
                <th>feedback</th>
                <th>Report button</th>
              </tr>
            </thead>
            <tbody>
              {filterComment.map((item) => (
                <tr key={item?._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{item?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">
                      <p>
                        {item?.comment.length > 20 ? (
                          <div>
                            {`${item?.comment.substring(0, 20)}... `}
                            <button
                              className=""
                              onClick={() => handleReadMoreClick(item?.comment)}
                            >
                              <button
                                className="text-blue-700 font-bold"
                                onClick={() =>
                                  document
                                    .getElementById("my_modal_2")
                                    .showModal()
                                }
                              >
                                read more
                              </button>
                            </button>
                          </div>
                        ) : (
                          <div>{item?.comment}</div>
                        )}
                      </p>

                      {/* Open the modal using document.getElementById('ID').showModal() method */}
                      <dialog id="my_modal_2" className="modal">
                        <div className="modal-box bg-black text-white">
                          <h3 className="font-bold text-sm text-justify">
                            {readMore}
                          </h3>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>
                    </div>
                  </td>
                  <td>
                    <form action="">
                      <div className="form-control w-full my-6">
                        <select
                          defaultValue="default"
                          name="feedback"
                          required
                          onChange={(e) => setReport(e.target.value)}
                          className="select bg-[#0F042F] text-white select-bordered w-full"
                        >
                          <option disabled value="default">
                            Select a feedback
                          </option>
                          <option value="Great Interaction">
                            Great Interaction
                          </option>
                          <option value="Real-time Update Glitch">
                            Real-time Update is Good
                          </option>
                          <option value="Feedback">Technical Issue</option>
                        </select>
                      </div>
                    </form>
                  </td>
                  <th>
                    <button
                      className="btn btn-secondary text-white btn-outline btn-sm"
                      onClick={handleReportClick}
                      disabled={!isButtonActive}
                    >
                      <MdReportProblem></MdReportProblem>
                      {isButtonActive ? "Report" : "Reported"}
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Comment;
