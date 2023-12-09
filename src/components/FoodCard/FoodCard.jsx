import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';


const FoodCard = ({ item }) => {
    const { user } = useAuth()
    const navigate = useNavigate();
    const location = useLocation()
    const [, , refetch] = useCart()
    const handleAddToCart = (item) => {
        console.log(item);
        if (user && user?.email) {
            const cartItem = {
                menuId: item._id,
                name: item?.name,
                image: item?.image,
                price: item?.price,
                email: user?.email
            }
            fetch("http://localhost:5000/carts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {

                        Swal.fire({
                            title: "Good job!",
                            text: "Item has been added successfully.",
                            icon: "success"
                        });
                        refetch()

                    }
                }).catch(error => {
                    console.log(error.message);
                })
        }
        else {
            return Swal.fire({
                title: "First login to order.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login Now!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } })
                }
            });
        }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={item?.image} alt="Shoes" className="rounded-xl" />
                <p className='absolute top-12 p-1 bg-slate-700 text-white font-semibold rounded-lg right-12'>${item?.price}</p>
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{item?.name}</h2>
                <p>{item?.recipe}</p>
                <div className="card-actions">
                    <button onClick={() => handleAddToCart(item)} className="btn btn-outline bg-slate-500 border-0 text-white border-orange-500  mt-3 border-b-4">Add To Card</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;