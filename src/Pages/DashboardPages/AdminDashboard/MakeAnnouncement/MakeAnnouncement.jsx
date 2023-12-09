import { useForm } from "react-hook-form";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../../hooks/useAuth";
import usePrivetAxios from "../../../../hooks/usePrivetAxios";
import Swal from "sweetalert2";

const MakeAnnouncement = () => {
    const { user } = useAuth();

    const privetAxios = usePrivetAxios();
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
      const postInfo = {
        image: user?.photoURL,
        name: user?.displayName,
        title: data?.title,
        description: data?.description,
      };

      const res = await privetAxios.post("/announcement", postInfo);
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
      <div className="py-8 bg-[#010313]">
        <SectionTitle
          header={"Add Announcement"}
          miniHeader={"User any Announcement added here"}
        ></SectionTitle>

        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">
                Title <span className="text-red-700">*</span>
                </span>
              </label>
              <input
                type="text"
                {...register("title", { required: true })}
                placeholder="Enter your Announcement Title"
                className="input bg-black text-white input-bordered placeholder:text-xs"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">
                Description <span className="text-red-700">*</span>
                </span>
              </label>
              <input
                type="text"
                {...register("description", { required: true })}
                placeholder="Enter your Announcement Description"
                className="input bg-black text-white input-bordered placeholder:text-xs"
              />
            </div>

            <div className="form-control mt-6">
              <input
                type="submit"
                value={"Add Announcement"}
                className="btn border-none text-white bg-[#2c1e6d] hover:bg-[#140d32]"
              />
            </div>
          </form>
        </div>
      </div>
    );
};

export default MakeAnnouncement;