import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";

const Modal = () => {
  const [apierror, seteApierror] = useState("");
  const { signUpWithGmail, login } = useContext(AuthContext);

  //react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        if (result) {
          document.getElementById("my_modal_5").close();
        }
        // console.log(result);
        // navigate("/", { replace: true });

        // Signed in
        // const user = result.user;
        // const userInfor = {
        //   name: data.name,
        //   email: data.email,
        // };
        // axios
        //   .post("http://localhost:6001/users", userInfor)
        //   .then((response) => {
        //     // console.log(response);
        //     alert("Signin successful!");
        //     navigate(from, { replace: true });
        //   });
        // console.log(user);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        seteApierror("Please provide valid email & password!");
      });
    reset();
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
        axios
          .post("http://localhost:6001/users", userInfor)
          .then((response) => {
            // console.log(response);
            alert("Signin successful!");
            navigate("/");
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex-col justify-center mt-0">
          <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold text-lg">Please Login!</h3>

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
              {errors.password && (
                <span className="text-red">This field is required*</span>
              )}
              <label className="label">
                <Link to={"/"} className=" hover:text-red">
                  Forgot password?
                </Link>
              </label>
            </div>

            {/* show errors */}
            <p className="text-red text-sm">{apierror}</p>

            {/* submit btn */}
            <div className="form-control mt-4">
              <input
                type="submit"
                className="btn bg-green text-white"
                value="Login"
              />
            </div>

            {/* close btn */}
            <div
              htmlFor="my_modal_5"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_5").close()}
            >
              ✕
            </div>

            <p className="text-center my-2">
              Donot have an account?
              <Link to="/signup" className="underline text-red ml-1">
                Signup Now
              </Link>
            </p>
          </form>
          <div className="text-center space-x-3 mb-5">
            <button
              onClick={handleRegister}
              className="btn btn-circle hover:bg-green hover:text-white"
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
    </dialog>
  );
};

export default Modal;
