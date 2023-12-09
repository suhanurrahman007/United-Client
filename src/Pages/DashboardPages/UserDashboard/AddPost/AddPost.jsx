import { useForm } from "react-hook-form";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../../hooks/useAuth";
import usePublicAxios from "../../../../hooks/usePublicAxios";
import Swal from "sweetalert2";
import usePayment from "../../../../hooks/usePayment";


const AddPost = () => {
  
  const { user } = useAuth();
  const [payment] = usePayment();
  const findMember = payment.find((item) => item.email === user?.email);

  console.log(findMember?.postLimit);

  const publicAxios = usePublicAxios()
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const postInfo = {
      image: user?.photoURL,
      name: user?.displayName,
      email: user?.email,
      title: data?.title,
      description: data?.description,
      upVote: data?.upVote,
      downVote: data?.downVote,
      tag: data.tag
    };

    const res = await publicAxios.post("/posts", postInfo)
    console.log(res.data);
    if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Wow...",
          text: "Added Post Successfully....!!",
        });
    }
  };
  return (
    <div className="py-8 bg-[#010313] overflow-x-auto">
      <SectionTitle
        header={"Add Post"}
        miniHeader={"User any post added here"}
      ></SectionTitle>

      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">
                Post Title <span className="text-red-700">*</span>
              </span>
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter your Post Title"
              className="input bg-black text-white input-bordered placeholder:text-xs"
            />
          </div>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-white">Tags*</span>
            </label>
            <select
              defaultValue="default"
              {...register("tag", { required: true })}
              className="select bg-black text-white select-bordered w-full"
            >
              <option disabled value="default">
                Select a Tag
              </option>
              <option value="Discussion">Discussion</option>
              <option value="Community">Community</option>
              <option value="Feedback">Feedback</option>
              <option value="Technology">Technology</option>
              <option value="General">General</option>
            </select>
          </div>

          <div className="flex gap-5">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text text-white">
                  UpVote <span className="text-red-700">*</span>
                </span>
              </label>
              <input
                type="text"
                defaultValue={0}
                {...register("upVote", { required: true })}
                placeholder="Enter your Post Description"
                className="input bg-black text-white input-bordered placeholder:text-xs"
              />
            </div>
            <div className="form-control w-1/2 ">
              <label className="label">
                <span className="label-text text-white">
                  DownVote <span className="text-red-700">*</span>
                </span>
              </label>
              <input
                type="text"
                defaultValue={0}
                {...register("downVote", { required: true })}
                placeholder="Enter your Down Vote"
                className="input bg-black text-white input-bordered placeholder:text-xs"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">
                Post Description <span className="text-red-700">*</span>
              </span>
            </label>
            <input
              type="text"
              {...register("description", { required: true })}
              placeholder="Enter your Post Description"
              className="input bg-black text-white input-bordered placeholder:text-xs"
            />
          </div>

          <div className="form-control mt-6">
            <input
              type="submit"
              value={"Add Post"}
              className="btn border-none text-white bg-[#2c1e6d] hover:bg-[#140d32]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
