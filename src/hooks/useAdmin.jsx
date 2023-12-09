import { useEffect } from "react";
import useAuth from "./useAuth";
import { useState } from "react";

const useAdmin = () => {
    const { user } = useAuth()
    const [adminLoading, setAdminLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:5000/users/admin/${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setAdminLoading(false)
                setIsAdmin(data);
            })
    }, [])

    return { isAdmin, adminLoading }
};

export default useAdmin;