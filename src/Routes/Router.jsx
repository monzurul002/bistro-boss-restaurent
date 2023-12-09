import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../Pages/Dashboard/MyCart/MyCart";
import AllUsers from "../Pages/Dashboard/AllUsers/allUsers";
import AddItem from "../Pages/Dashboard/AddItem/AddItem";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import Payment from "../Pages/Dashboard/Payment/Payment";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,

        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/menu",
                element: <Menu></Menu>
            },
            {
                path: "/order/:category",
                element: <Order></Order>
                // element: <PrivateRoute><Order></Order></PrivateRoute>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            }
        ]
    }
    ,
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: "mycart",
                element: <MyCart></MyCart>
            },
            {
                path: "userhome",
                element: <UserHome></UserHome>
            },
            {
                path: "allusers",
                element: <AllUsers></AllUsers>
            },
            //admin routes
            {
                path: "admin",
                element: <AdminHome></AdminHome>
            },
            {
                path: "adminhome",
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            }
            ,
            {
                path: "addItem",
                element: <AdminRoute><AddItem></AddItem></AdminRoute>
            },
            {
                path: "manageitems",
                element: <AdminRoute><ManageItems /></AdminRoute>
            },
            {
                path: "payment",
                element: <Payment />
            },
        ]
    }

])

