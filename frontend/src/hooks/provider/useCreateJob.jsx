import { useState } from "react";
import toast from "react-hot-toast";



function useCreateJob(){
    const [loading, setLoading] = useState(false);

    const createJob = async (jobData) => {
        setLoading(true);
        try {

            if (!jobData.name || !jobData.description){
                throw new Error("Please fill out all fields")
            }
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