import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import { Link } from 'react-router-dom'
const MenuCategory = ({ items, img, title }) => {
    return (
        <div className="">
            {
                title && <Cover img={img} title={title}></Cover>
            }
            <div className="grid grid-cols-2 gap-4 mt-16 py-6">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <div className="text-center">
                <Link to={`/order/${title}`} > <button className="btn bg-purple-800 my-5 border-0 text-white  mt-3 border-b-4">Order Now</button></Link>
            </div>
        </div>
    );
};

export default MenuCategory;