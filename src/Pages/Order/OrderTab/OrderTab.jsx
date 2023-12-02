

import { useState } from "react";
import FoodCard from "../../../components/FoodCard/FoodCard";

const OrderTab = ({ items }) => {
    const totalOrderNumber = items.length;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPage = Math.ceil(totalOrderNumber / itemsPerPage);
    const pageNumbers = [...new Array(totalPage).keys()];

    const skip = currentPage * itemsPerPage;
    const startSkip = skip - itemsPerPage;
    const currentItems = items.slice(startSkip, skip);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3">
                {currentItems.map(item => <FoodCard item={item} key={item._id} />)}

            </div>
            <div className="join w-50 mx-auto">
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => setCurrentPage(number + 1)}
                        className={`join-item bg-slate-500 btn ${currentPage === number + 1 ? 'active' : ''}`}>
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OrderTab;
