import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const AdminHome = () => {
    const { user } = useAuth();
    const { data, isLoading } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/admin-stats")
            return res.data
        }
    })

    if (isLoading) {
        return <h1 className="text-3xl text-red-600">Loading.....</h1>
    }
    return (
        <div className="w-full m-4">
            <h2 className="text-2xl">Welcome to {user?.displayName},</h2>
            <div className="stats shadow">

                <div className="stat flex justify-center items-center">


                    <div className="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-14 h-16 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <div>
                        <div className="stat-value text-primary">${data?.revenue}</div>
                        <div className="stat-title">Revenue</div>
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div className="stat-title">Customer</div>
                    <div className="stat-value text-secondary">{data?.users}</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <div className="avatar online">
                            <div className="w-16 rounded-full">
                                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                    </div>
                    <div className="stat-value">Products</div>
                    <div className="stat-title">{data?.products}</div>
                    <div className="stat-desc text-secondary">31 tasks remaining</div>
                </div>

            </div>

        </div>
    );
};

export default AdminHome;