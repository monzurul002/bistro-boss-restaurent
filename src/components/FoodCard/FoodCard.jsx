import React from 'react';

const FoodCard = ({ item }) => {
    const handleAddToCart = (item) => {
        console.log(item);
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