import { useState } from "react";
import toast from "react-hot-toast";
import useUserContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";

function useSignup(){
    const [loading, setLoading] = useState(false);
    const {setUser} = useUserContext();
    const navigate = useNavigate();
    async function signup(userData){

        if (!userData.fullName || !userData.username || !userData.password || !userData.description){
            throw new Error("Please fill out all fields");
        }

        setLoading(true);
        try {
            const res = await fetch("/api/user/create", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await res.json();


            if (!res.ok){
                throw new Error(data.error);
            }

            setUser(data);
            navigate("/user")
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return {signup, loading};
};

export default useSignup;