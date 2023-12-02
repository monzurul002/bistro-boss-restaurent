const MenuItem = ({ item }) => {
    return (
        <div className="flex space-x-4 px-10">
            <img style={{ borderRadius: "0px 220px 200px 200px" }} className="w-[120px]" src={item?.image} alt="" />
            <div>
                <h3>{item?.name}-----------</h3>
                <p>{item.recipe}</p>
            </div>

            <p className="text-xl text-yellow-600 mt-3"> ${item?.price}</p>
        </div>
    );
};

export default MenuItem;