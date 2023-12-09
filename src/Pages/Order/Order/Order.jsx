import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import orderBg from "../../../assets/shop/banner2.jpg"
import Cover from "../../Shared/Cover/Cover";
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../../hooks/useMenu.jsx";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
    const { category } = useParams()
    const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu, isLoading] = useMenu();
    console.log(menu, "form order");
    if (isLoading) {
        return <h2>Loading</h2>
    }

    const dessert = menu.filter(item => item.category === "dessert");
    const salad = menu.filter(item => item.category === "salad");
    const soup = menu.filter(item => item.category === "soup");
    const pizza = menu.filter(item => item.category === "pizza");
    const drinks = menu.filter(item => item.category === "drinks");

    return (
        <div className="w-full">
            <Helmet>
                <title>{`Order - ${category}`}</title>
            </Helmet>
            <Cover img={orderBg} title="Order Food"></Cover>
            <div className="w-full">
                <div className="  p-5">
                    <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                        <div className="w-full md:w-1/2 mx-auto"> <TabList className="border-none text-center">
                            <Tab >Salad</Tab>
                            <Tab >Pizza</Tab>
                            <Tab >Soup</Tab>
                            <Tab >Desserts</Tab>
                            <Tab >Drinks</Tab>

                        </TabList></div>

                        <TabPanel>
                            <OrderTab items={salad}></OrderTab>
                        </TabPanel>
                        <TabPanel>
                            <OrderTab items={pizza}></OrderTab>
                        </TabPanel>
                        <TabPanel>
                            <OrderTab items={soup}></OrderTab>
                        </TabPanel>
                        <TabPanel>
                            <OrderTab items={dessert}></OrderTab>
                        </TabPanel>
                        <TabPanel>
                            <OrderTab items={drinks}></OrderTab>
                        </TabPanel>

                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Order;