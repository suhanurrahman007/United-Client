import { Link, useNavigate } from "react-router-dom";
import signUpImg from "../../assets/Login/signUp.png";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import usePublicAxios from "../../hooks/usePublicAxios";

const SignUp = () => {
  const publicAxios = usePublicAxios()
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = useAuth();

   const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        // console.log(result.user);
        const userInfo = {
          name: data?.name,
          email: data?.email,
          image: data?.image,
        };

        publicAxios.post("/users", userInfo)
        .then(res =>{
          if (res?.data?.insertedId) {
            Swal.fire({
              icon: "success",
              title: "Wow...",
              text: "Sign up Successfully....!!",
            });
            navigate("/");
          }
        })
        
      })
      .catch((error) => {
        // console.log(error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });

      });
  };

  return (
    <div>
      <Helmet>
        <title>United - SingUp</title>
      </Helmet>
      <div className="md:flex py-14 lg:space-x-5 lg:flex-row-reverse bg-[#010313]">
        <div className="flex w-1/2 justify-center items-center">
          <img className="md:h-[500px]" src={signUpImg} alt="" />
        </div>

        <div className="card flex-shrink-0 w-1/2 max-w-sm shadow-2xl bg-[#0e0d21] ">
          <Link
            to={"/"}
            className="text-3xl mt-4 font-extrabold text-center text-[#c29a4b] text-opacity-50"
          >
            Sign Up Please
          </Link>

          <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">
                  User Name <span className="text-red-700">*</span>
                </span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                name="name"
                placeholder="Enter your full Name"
                className="input bg-black text-white input-bordered placeholder:text-xs"
              />
              {errors.name && (
                <span className="text-red-700 mt-3 text-xs">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">
                  Email <span className="text-red-700">*</span>
                </span>
              </label>
              <input
                type="email"
                name="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                className="input bg-black text-white input-bordered placeholder:text-xs"
              />
              {errors.email && (
                <span className="text-red-700 mt-3 text-xs">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">
                  Password <span className="text-red-700">*</span>
                </span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                {...register("password", {
                  required: true,
                  maxLength: 20,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="Enter your new password"
                className="input input-bordered bg-black text-white placeholder:text-xs"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-700 mt-3 text-xs">
                  Password is required
                </p>
              )}

              {errors.password?.type === "maxLength" && (
                <p className="text-red-700 mt-3 text-xs">
                  Password has been must 20 character under
                </p>
              )}

              {errors.password?.type === "minLength" && (
                <p className="text-red-700 mt-3 text-xs">
                  Password has been must 6 character
                </p>
              )}

              {errors.password?.type === "pattern" && (
                <p className="text-red-700 mt-3 text-xs">
                  password to have a mix of uppercase letters, special
                  characters, digits, and lowercase letters.
                </p>
              )}
              <div className="inline-flex items-center">
                <label
                  className="relative flex cursor-pointer items-center rounded-full p-3"
                  htmlFor="checkbox"
                  data-ripple-dark="true"
                >
                  <input
                    onClick={() => setShowPassword(!showPassword)}
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                    id="checkbox"
                  />
                  <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      // stroke-width="1"
                    >
                      <path
                        //   fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        //   clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                <label
                  className="mt-px cursor-pointer select-none font-light text-gray-700"
                  htmlFor="checkbox"
                >
                  <span className="text-white">
                    {showPassword ? "Hide Password" : "Show Password"}
                  </span>
                </label>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">
                  Photo URl <span className="text-red-700">*</span>
                </span>
              </label>
              <input
                type="url"
                name="image"
                {...register("image", { required: true })}
                placeholder="Enter your Photo Url"
                className="input bg-black text-white input-bordered placeholder:text-xs"
              />
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                value={"Sign Up"}
                className="btn border-none text-white bg-[#2c1e6d] hover:bg-[#140d32]"
              />
            </div>
          </form>
          <p className="mb-7 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
            <span className="text-white">Already have an account?</span>
            <Link
              to={"/login"}
              href="#" //signup
              className="ml-1 block font-sans text-sm font-bold leading-normal text-[#c5a35e] antialiased"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
