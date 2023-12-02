
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    const { createNewUser, profileUpdate, logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    const onSubmit = (data) => {

        createNewUser(data.email, data.password)
            .then(result => {
                const user = result.user;

                if (user) {
                    profileUpdate(data.name, data.photoUrl)
                        .then(result => {
                            reset()
                            Swal.fire({
                                title: "succesfully created user.",
                                icon: "success"
                            });
                            navigate("/")
                        })
                        .then(error => {

                        })

                    // logOut()
                    //     .then(() => {
                    //         navigate("/login")
                    //     })



                }

            })
            .then(error => {
                const message = error.message;

            })
    }

    // https://i.ibb.co/FBZc1yW/4.jpg


    return (
        <div className="hero min-h-screen bg-base-200">
            <Helmet>
                <title>Signup | bistro boss restaurent.</title>
            </Helmet>
            <div className="hero-content flex-col md:flex-row ">
                <div className="text-center w-ful md:w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>


                <div className="card shrink-0 w-full md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} placeholder="Write your password" className="input input-bordered" />
                            {errors.name?.type === "required" && (
                                <p className="text-red-500" role="alert">name is required</p>
                            )}

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo Url</span>
                            </label>
                            <input type="text" {...register("photoUrl", { required: true })} placeholder="Write your photoUrl" className="input input-bordered" />
                            {errors.photoUrl?.type === "required" && (
                                <p className="text-red-500" role="alert">Photourl is required</p>
                            )}

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                            {errors.email && <p className="text-red-600" role="alert">Email is required</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 16,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z])/
                            })}
                                placeholder="password" className="input input-bordered" />
                            {errors.password?.type === "required" && <p className="text-red-600" role="alert">Password is required</p>}
                            {errors.password?.type === "minLength" && (
                                <p className="text-red-500" role="alert">password must be at least 6 charecter.</p>
                            )}
                            {errors.password?.type === "maxLength" && (
                                <p className="text-red-500" role="alert">password length not more than 16</p>
                            )}
                            {errors.password?.type === "pattern" && (
                                <p className="text-red-500" role="alert">Password must be at least one upercase,one numeric number,one lowercase  </p>
                            )}
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn btn-primary" value="Sign Up" />
                        </div>
                    </form>
                    <p className="text-center mt-[-20px] mb-2"><small>Already have an account? <Link className="link text-cyan-800" to="/login">Login</Link></small></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;