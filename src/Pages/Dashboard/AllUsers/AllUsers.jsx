import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { AiFillDelete } from "react-icons/ai";
import { FaUserShield } from "react-icons/fa6";

const AllUsers = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users');
            return res.json();
        },
    });

    const handleDelete = (user) => {

    }

    return (
        <div>
            <Helmet>
                <title>All Users| Bistro Boss restaurent.</title>
            </Helmet>
            <h3 className="text-3xl font-semibold">Total  Users {users?.length}</h3>

            <div className="overflow-x-auto px-5">
                <table className="table table-zebra">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user, index) => {

                                return <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td className="text-xl">{user?.role === "admin" ? "Admin" : <button className="btn btn-ghost bg-orange-500 text-white text-xl"><FaUserShield /></button>
                                    }</td>
                                    <td>
                                        <button onClick={() => handleDelete(user)} className="btn btn-ghost bg-red-600 text-2xl "><AiFillDelete className="text-white" />
                                        </button>
                                    </td>
                                </tr>

                            })
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllUsers;