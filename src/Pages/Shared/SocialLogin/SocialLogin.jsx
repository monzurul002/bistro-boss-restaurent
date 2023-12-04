import { useContext } from "react";
import { FaGoogle } from "react-icons/fa6";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                const savedUser = { name: user?.displayName, email: user?.email }
                fetch("http://localhost:5000/users", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(savedUser)
                }).then(res => res.json())
                    .then(() => {

                        navigate(location.state?.from?.pathname || "/", { replace: true })

                    })

            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div>
            <div className="divider"></div>
            <div className="w-full text-center">
                <button onClick={handleGoogleSignIn} className="btn text-center mb-5 btn-circle btn-outline">
                    <FaGoogle></FaGoogle>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;