import {useState, useEffect} from "react";
import toast from "react-hot-toast";

const useGetJobs = () => {
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);

    
    async function getJobs(){
        setLoading(true);
        try {
            const res = await fetch("/api/provider/");
            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error);
            }
            setJobs(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        getJobs()
    }, [])

    return {jobs, loading}
};

export default useGetJobs;