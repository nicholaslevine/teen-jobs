import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";


function useGetJobs(){
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);

    async function getJobs(){
        setLoading(true);
        try {
            const res = await fetch("/api/user");
            const data = await res.json();

            if (!res.ok){
                throw new Error(data.error);
            }

            setJobs(jobs);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getJobs();
    }, []);

    return {jobs, loading}
}
export default useGetJobs;