import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { FaCartShopping } from "react-icons/fa6";
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    console.log(user);
    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Log out succesfully",

                    icon: "success"
                });
            })
            .catch(error => {
                console.log(error?.message);
            })
    }
    const navItem = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Our Menu</Link></li>
        <li><Link to="/order/salad">Order</Link></li>
        <li className=" ">
            <Link to="/" >
                <FaCartShopping className="text-2xl mr-[-9px]" />
                <div className="p-1 rounded-lg badge-secondary mt-[-25px] ">+99</div>
            </Link>
        </li>
        {
            !user ? <li><Link to="/login">Login</Link></li> : <button onClick={handleLogOut}>Logout</button>
        }
    </>


    return (
        <div>
            <div className="navbar fixed z-30 bg-opacity-25 bg-black max-w-screen-xl text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navItem}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Bistro Boss</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItem}
                    </ul>
                </div>
                <div className="navbar-end">

                    {
                        !user ? <Link to='/login' className="btn">Login</Link> : <p>{user?.displayName}</p>
                    }
                </div>
            </div>

        </div>
    );
};

export default Navbar;