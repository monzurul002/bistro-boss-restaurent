import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Query } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const MyCart = () => {
    const [cart, , refetch] = useCart();

    const price = cart.reduce((pr, curr) => {
        return parseFloat(pr + curr.price)
    }, 0);

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/carts/${item._id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    }).catch(error => {
                        console.error("Error during delete:", error);
                    })
            }
        });



    }

    return (
        <div>
            <Helmet>
                <title>My Cart | bistro restaurent</title>
            </Helmet>
            <div className="flex justify-around">
                <h1 className="text-3xl">
                    Total Items: {cart.length}
                </h1>
                <h1 className="text-3xl">
                    Total Price: ${price}
                </h1>
                <Link to="/dashboard/payment"><button className="btn btn-warning">Pay</button></Link>
            </div>
            <div className="overflow-x-auto px-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Item Image</th>
                            <th> Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            cart.map((item, index) => <tr
                                key={item._id}
                            >
                                <th>
                                    {index + 1}
                                </th>
                                <td>

                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item?.image} alt="food" />
                                        </div>
                                    </div>

                                </td>
                                <td>
                                    {item?.name}

                                </td>
                                <td>{item?.price}</td>
                                <th>
                                    <button onClick={() => handleDelete(item)} className="btn btn-ghost bg-red-500 text-2xl btn-sm"><AiFillDelete className="text-white" />
                                    </button>
                                </th>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCart;