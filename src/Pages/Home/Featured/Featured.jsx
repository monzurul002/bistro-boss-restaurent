import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImage from '../../../assets/home/featured.jpg'
import "./Featured.css"
const Featured = () => {
    return (
        <div className="featured-item text-white bg-fixed bg-opacity-50 bg-black ">
            <SectionTitle heading={"Check It Out"} subHeading={"Featured Item"} />

            <div className="md:flex justify-center items-center py-12  px-24 ">
                <div className="w-1/2">
                    <img className="h-72 w-full ps-12" src={featuredImage} alt="" />
                </div>
                <div className="w-1/2 text-purple-600 px-10">
                    <p>Nov 27, 2023</p>
                    <h4 className="text-xl">Where I Can Get Some?</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, quos. Nesciunt odio suscipit voluptatum vel dolor excepturi, eius necessitatibus, temporibus commodi doloribus, accusantium libero alias coi numquam fugit, repellat placeat odio optio autem!</p>
                    <button className="btn btn-outline border-0 text-white  mt-3 border-b-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;