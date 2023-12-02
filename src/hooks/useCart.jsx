import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
    const { user } = useContext(AuthContext)
    const { isLoading, refetch, data: cart = [], error } = useQuery({
        queryKey: ['carts', user?.email], queryFn: async () => {
            const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`);
            res.json()
        }
    })
    return [cart, isLoading, refetch]
};

export default useCart;