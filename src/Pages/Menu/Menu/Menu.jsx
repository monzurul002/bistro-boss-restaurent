import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import img from "../../../assets/menu/banner3.jpg"
import desertBg from "../../../assets/menu/dessert-bg.jpeg"
import pizzaBg from "../../../assets/menu/pizza-bg.jpg"
import saladBg from "../../../assets/menu/salad-bg.jpg"
import soupBg from "../../../assets/menu/soup-bg.jpg"
import PopularMenu from "../../Home/PopularMenu/PopularMenu";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
    const [menu] = useMenu()

    const dessert = menu.filter(item => item.category === "dessert");
    const salad = menu.filter(item => item.category === "salad");
    const soup = menu.filter(item => item.category === "soup");
    const pizza = menu.filter(item => item.category === "pizza");
    const offered = menu.filter(item => item.category === "offered");

    return (
        <div>
            <Helmet>
                <title>Menu-bistro restaurent</title>
            </Helmet>
            <Cover img={img} title="OUR MENU"></Cover>
            <SectionTitle subHeading={"Don't Miss"} heading="TODAY'S OFFER"></SectionTitle>
            <MenuCategory items={offered} ></MenuCategory>
            <MenuCategory items={dessert} img={desertBg} title={"dessert"}></MenuCategory>
            <MenuCategory items={pizza} img={pizzaBg} title={"pizza"}></MenuCategory>
            <MenuCategory items={salad} img={saladBg} title={"salad"}></MenuCategory>
            <MenuCategory items={soup} img={soupBg} title={"soup"}></MenuCategory>
        </div>
    );
};

export default Menu;