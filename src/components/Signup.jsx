import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle, FaRegUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Signup = () => {
  const { signUpWithGmail, createUser, updateUserProfile } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [apierror, setApirror] = useState();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(email, password)
    createUser(email, password)
      .then((result) => {
        // Signed up
        const user = result.user;

        updateUserProfile(data.email, data.photoURL).then(() => {
          const userInfor = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfor).then((response) => {
            alert("Signin successful!");
            navigate(from, { replace: true });
          });
        });
      })
      .catch((error) => {
        if (
          "Firebase: Password should be at least 6 characters (auth/weak-password)." ==
          error.message
        ) {
          setApirror("Password should be at least 6 characters");
        } else if (
          "Firebase: Error (auth/email-already-in-use)." == error.message
        ) {
          setApirror("This User Already Exits");
        } else {
          setApirror(error.message);
        }
      });
  };

  // login with google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic.post("/users", userInfor).then((response) => {
          // console.log(response);
          alert("Signin successful!");
          navigate("/");
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    // <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
    //   <div className="mb-5">
    //     <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
    //       <h3 className="font-bold text-lg">Please Create An Account!</h3>
    //       {/* name */}
    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Name</span>
    //         </label>
    //         <input
    //           type="name"
    //           placeholder="Your name"
    //           className="input input-bordered"
    //           {...register("name")}
    //         />
    //       </div>

    //       {/* email */}
    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Email</span>
    //         </label>
    //         <input
    //           type="email"
    //           placeholder="email"
    //           className="input input-bordered"
    //           {...register("email")}
    //         />
    //       </div>

    //       {/* password */}
    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Password</span>
    //         </label>
    //         <input
    //           type="password"
    //           placeholder="password"
    //           className="input input-bordered"
    //           {...register("password")}
    //         />
    //         <label className="label">
    //           <a href="#" className="label-text-alt link link-hover mt-2">
    //             Forgot password?
    //           </a>
    //         </label>
    //       </div>

    //       {/* error message */}
    //       <p>{errors.message}</p>

    //       {/* submit btn */}
    //       <div className="form-control mt-6">
    //         <input
    //           type="submit"
    //           className="btn bg-green text-white"
    //           value="Sign up"
    //         />
    //       </div>

    //       <div className="text-center my-2">
    //         Have an account?
    //         <Link to="/login">
    //           <button className="ml-2 underline">Login here</button>
    //         </Link>
    //       </div>
    //     </form>
    //     <div className="text-center space-x-3">
    //       <button
    //         onClick={handleRegister}
    //         className="btn btn-circle hover:bg-green hover:text-white"
    //       >
    //         <FaGoogle />
    //       </button>
    //       <button className="btn btn-circle hover:bg-green hover:text-white">
    //         <FaFacebookF />
    //       </button>
    //       <button className="btn btn-circle hover:bg-green hover:text-white">
    //         <FaGithub />
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20 relative">
        <div className="mb-5">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg">Please Create An Account!</h3>
            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                placeholder="Your name"
                className="input input-bordered"
                {...register("name", { required: true })}
              />
            </div>
            {errors.name && (
              <span className="text-red">This field is required*</span>
            )}
            <Link to="/">
              <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </div>
            </Link>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
            </div>
            {errors.email && (
              <span className="text-red">This field is required*</span>
            )}

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
            </div>
            {errors.password && (
              <span className="text-red">This field is required*</span>
            )}

            {/* error message */}
            <p className="text-red text-sm">{apierror}</p>

            {/* submit btn */}
            <div className="form-control mt-6">
              <input
                type="submit"
                className="btn bg-green text-white"
                value="Sign up"
              />
            </div>

            <div className="text-center my-2">
              Have an account?
              <Link to="/login">
                <button className="ml-2 text-red">Login here</button>
              </Link>
            </div>
          </form>
          <div className="text-center space-x-3">
            <button
              className="btn btn-circle hover:bg-green hover:text-white"
              onClick={handleRegister}
            >
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
