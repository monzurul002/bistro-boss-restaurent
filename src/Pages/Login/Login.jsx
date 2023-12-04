import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useRef } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha, LoadCanvasTemplateNoReload } from 'react-simple-captcha';
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const captchaRef = useRef();
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState("");
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation()
    console.log(location);
    useEffect(() => {
        loadCaptchaEnginge(6);

    }, [])

    const handleLogin = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        loginUser(email, password)
            .then(result => {
                const user = result.user;
                navigate(location.state?.from?.pathname || "/", { replace: true })
            })
            .catch(error => {
                setError(error.message)
            })
    }

    const captchaValidate = (e) => {
        e.preventDefault()
        const captcha = captchaRef.current.value;
        if (validateCaptcha(captcha) == true) {
            setError('')
            setDisabled(false)
        }

        else {
            setDisabled(true)
            return setError("Captch does not matched.")
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <Helmet>
                <title>Login | bistro boss</title>
            </Helmet>
            <div className="hero-content flex w-full flex-col md:flex-row  ">
                <div className="text-center w-full  md:w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" ref={emailRef} placeholder="email" id="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" ref={passwordRef} placeholder="password" id="password" className="input input-bordered" required />

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />


                            </label>
                            <input type="text" ref={captchaRef} placeholder="write captha" className="input input-bordered" required />
                            <button onClick={(e) => captchaValidate(e)} className="btn btn-xs">
                                Validate
                            </button>
                            <p className="text-red-500">{error}</p>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>


                        <div className="form-control mt-6">
                            <input disabled={disabled} type="submit" value="Login" className="btn btn-primary" />
                        </div>
                    </form>
                    <p className="text-center mt-[-20px] mb-2"><small>New here? <Link className="link text-cyan-800" to="/signup">SignUp</Link></small></p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;