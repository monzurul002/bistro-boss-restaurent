import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
    const [menu] = useMenu()
    const popularMenu = menu.filter(item => item.category === "popular")
    return (
        <section>
            <SectionTitle
                heading={"Our Popular Menu"}
                subHeading={"Popular Items"}
            ></SectionTitle>
            <div className="grid grid-cols-2 gap-4 py-6">
                {
                    popularMenu.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>

        </section>
    );
};

export default PopularMenu;