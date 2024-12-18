import { useState } from "react";
import toast from "react-hot-toast";
import { useProviderContext } from "../../context/providerContext";
import { create } from "istanbul-reports";



function useCreateJob(){
    const [loading, setLoading] = useState(false);
    const {provider, setProvider} = useProviderContext();

    const createJob = async (jobData) => {
        setLoading(true);
        try {
            const res = await fetch("/api/provider/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jobData),
            });

            const data = await res.json();


            if (!res.ok){
                throw new Error(data.error || "Failed to create job")
            }

            toast.success("Job created successfully");

            return data;
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {createJob, loading};
}

export default useCreateJob;