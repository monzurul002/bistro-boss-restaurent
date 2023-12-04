import { FaBook, FaCartShopping, FaUser, FaUsers, FaUtensils, FaWallet } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaRegCalendarAlt } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import useCart from "../hooks/useCart";

const Dashboard = () => {
    const [cart] = useCart()
    const isAdmin = true;
    return (
        <div>
            <div className="drawer lg:drawer-open ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content  mt-10">

                    {/* Page content here */}
                    <Outlet></Outlet>


                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side  bg-[#D1A054] ">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full ">
                        {
                            isAdmin ? <>
                                <li><NavLink to="/dashboard/home">
                                    <FaHome /> Admin Home </NavLink></li>
                                <li><NavLink to="/"><FaUtensils></FaUtensils>  Add Items</NavLink></li>
                                <li><NavLink to=""><FaWallet />Manage Items </NavLink></li>
                                <li><NavLink to=""><FaBook />Manage Books </NavLink></li>
                                <li><NavLink to="/dashboard/allusers"><FaUsers />All Users </NavLink></li>


                            </> : <>
                                <li><NavLink to="/dashboard/home"><FaHome /> User Home </NavLink></li>
                                <li><NavLink to="/dashboard/reservation"><FaRegCalendarAlt /> Reservation </NavLink></li>
                                <li><NavLink to="/dashboard/history"><FaWallet />Payment History </NavLink></li>
                                <li >
                                    <NavLink to="/dashboard/mycart "><FaCartShopping></FaCartShopping> My cart  <span className="p-1 rounded-lg badge-secondary  ">+{cart?.length}</span></NavLink>

                                </li>
                            </>
                        }

                        <div className="divider"></div>
                        <li>
                            <NavLink to="/"><FaHome></FaHome>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/menu'><IoMenuSharp /> Menu
                            </NavLink>
                        </li>
                        <li>
                            <NavLink></NavLink>
                        </li>
                        <li>
                            <NavLink></NavLink>
                        </li>
                    </ul>

                </div>
            </div>

        </div>
    );
};

export default Dashboard;