import { useState } from "react";
import toast from "react-hot-toast";

function useAddJob(){
    const [loading, setLoading] = useState(false);

    async function addJob(jobId){
        setLoading(true);
        try {
        const res = await fetch(`/api/user/add/${jobId}`);
        const data = await res.json();

        if (!res.ok){
            throw new Error(data.error);
        }
        toast.success("Successfully added job to portfolio");
            
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {loading, addJob};

}

export default useAddJob;