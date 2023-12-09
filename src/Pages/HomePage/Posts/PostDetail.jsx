import { useParams } from "react-router-dom";
import usePosts from "../../../hooks/usePosts";
import { useEffect, useState } from "react";
import { FaCommentDots, FaFacebook, FaLinkedin, FaRegClock, FaShare, FaTwitter } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import Container from "../../../components/Container";
import usePublicAxios from "../../../hooks/usePublicAxios";
import Swal from "sweetalert2";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import useAuth from "../../../hooks/useAuth";
import useComments from "../../../hooks/useComments";


const PostDetail = () => {
  const publicAxios = usePublicAxios()
    const [post , setPost] = useState({})
    const [posts] = usePosts()
    const {id} = useParams()
    const {user} = useAuth()
    useEffect(()=>{
        const findPost = posts?.find((item) => item?._id == id);
        setPost(findPost);
    },[posts])


    const [upVote, setUpVote] = useState(0);
    const [downVote, setDownVote] = useState(0);
  const handleUpVote = async() => {
    console.log(id);
    setUpVote(upVote + 1);
    const updateVote = {upVote}
    console.log(updateVote);

    publicAxios.put(`/posts/${id}`, updateVote)
    .then(res =>{
      console.log(res.data);
    })
  };

  const handleDownVote = () => {
    setDownVote(downVote + 1);
    const updateVote = { downVote };
    console.log(updateVote);

    publicAxios.patch(`/posts/${id}`, updateVote).then((res) => {
      console.log(res.data);
    });
  }

  const [refetch] = useComments();

  const handleComment = async (e) =>{
    e.preventDefault()
    const form = e.target 
    const comment = form.comment.value 
    const res = await publicAxios.post("/comment",{comment, title : post?.title, email: user.email})
    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Wow...",
        text: "Comment Successfully....!!",
      });
      refetch()
    }
  }
    // console.log(post);
    return (
      <Container>
        <div className="mt-10">
          <div className="grid lg:grid-cols-3 gap-4 lg:gap-20">
            <div className="col-span-2">
              <div className="card h-80  bg-base-100 shadow-xl image-full">
                <figure>
                  <img className="w-full" src={post?.image} alt="Shoes" />
                </figure>
                <div className="card-body flex justify-center items-center">
                  <h2 className="card-title text-3xl">{post?.name}</h2>
                </div>
              </div>
              <div>
                <h2 className="font-semibold text-2xl mt-5">{post?.title}</h2>
                <p className="text-gray-700 mt-10 text-justify">
                  {post?.description}
                </p>
                <div className="flex justify-around items-center py-5">
                  <p>{post?.time}</p>
                  <div className="badge badge-accent badge-outline">
                    {post?.tag}
                  </div>
                </div>

                <div className="flex justify-around border-t-[1px] border-b-[1px] py-3 items-center">
                  <button
                    onClick={handleUpVote}
                    className="btn btn-xs w-20 bg-[#262626] text-white"
                  >
                    <BiSolidLike></BiSolidLike>{" "}
                    <span className="text-orange-600 font-bold">{upVote}</span>
                  </button>
                  <button
                    onClick={handleDownVote}
                    className="btn btn-xs w-20 bg-[#262626] text-white"
                  >
                    <BiSolidDislike></BiSolidDislike>{" "}
                    <span className="text-orange-600 font-bold">
                      {downVote}
                    </span>
                  </button>
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <div>
                    <button
                      className="btn btn-xs w-20 bg-[#262626] text-white"
                      onClick={() =>
                        document.getElementById("my_modal_2").showModal()
                      }
                    >
                      <FaCommentDots></FaCommentDots>
                    </button>
                    <dialog id="my_modal_2" className="modal">
                      <div className="modal-box bg-[#0C0D21]">
                        <form onSubmit={handleComment}>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text text-white">
                                Comment <span className="text-red-700">*</span>
                              </span>
                            </label>
                            <input
                              type="text"
                              name="comment"
                              placeholder="Enter your Comment"
                              required
                              className="input bg-black text-white input-bordered placeholder:text-xs"
                            />
                          </div>
                          <div className="form-control mt-6">
                            <input
                              type="submit"
                              value={"Comment"}
                              className="btn border-none text-white bg-[#2c1e6d] hover:bg-[#140d32]"
                            />
                          </div>
                        </form>
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                  </div>
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <div>
                    <button
                      className="btn btn-xs w-20 bg-[#262626] text-white"
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                    >
                      <FaShare></FaShare>
                    </button>
                    <dialog id="my_modal_3" className="modal">
                      <div className="modal-box bg-black w-60">
                        <div className="flex gap-8 justify-center">
                          <FacebookShareButton
                            url={`/posts/${post?._id}`}
                            quote="Check out this post!"
                          >
                            <span className="text-2xl">
                              <FaFacebook></FaFacebook>
                            </span>
                          </FacebookShareButton>
                          <TwitterShareButton
                            url={`/posts/${post?._id}`}
                            title="Check out this post!"
                          >
                            <span className="text-2xl">
                              <FaTwitter></FaTwitter>
                            </span>
                          </TwitterShareButton>
                          <LinkedinShareButton
                            url={`/posts/${post?._id}`}
                            summary="Check out this post!"
                          >
                            <span className="text-2xl">
                              <FaLinkedin></FaLinkedin>
                            </span>
                          </LinkedinShareButton>
                        </div>
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                  </div>
                </div>

                <p className="text-gray-700 mt-10 text-justify">
                  A gathering or activity where individuals come together
                  primarily for personal, often leisurely, reasons rather than
                  professional or obligatory ones. These events are organized
                  with the intent to facilitate interaction, enjoyment,
                  entertainment, or celebration among attendees. Social events
                  can vary in scale from small gatherings like family dinners
                  and coffee meets to large ones like weddings, festivals, and
                  public parades. These events can be formal or informal and
                  might be organized for a variety of purposes, such as
                  celebrating milestones (birthdays, anniversaries), observing
                  cultural or religious occasions, facilitating community
                  interaction, or simply for entertainment. They are
                  characterized by a shared experience among participants and
                  often include activities, food, music, and other forms of
                  entertainment.
                </p>
              </div>
            </div>
            <div className="col-span-1 space-y-5">
              <div className="space-y-14">
                <div className="flex gap-5">
                  <div className="text-6xl text-orange-900">
                    <FaRegClock></FaRegClock>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">Open Hours</h2>
                    <p className="text-sm font-semibold text-gray-700">
                      Monday – Friday 8.00 am – 5.00 pm <br />
                      Weekend Closed
                    </p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="text-6xl text-orange-900">
                    <div>
                      {" "}
                      <FiPhoneCall></FiPhoneCall>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">Phone & E-mail</h2>
                    <p className="text-sm font-semibold text-gray-700">
                      Phone: 1-800-64-38
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      Fax: 1-800-64-39
                    </p>
                    <a className="text-sm font-semibold text-gray-500" href="#">
                      office@fable.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
};

export default PostDetail;