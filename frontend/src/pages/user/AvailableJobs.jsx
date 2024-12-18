import useGetJobs from "../../hooks/user/useGetJobs";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import useAddJob from "../../hooks/user/useAddJob";
import { useState } from "react";
import toast from "react-hot-toast";

function AvailableJobs() {
    const { jobs, loading } = useGetJobs();
    const { addJob } = useAddJob();
    const navigate = useNavigate();
    const [selectedJobId, setSelectedJobId] = useState(null);

    const handleAddJob = async (jobId) => {
        try {
            setSelectedJobId(jobId);
            await addJob(jobId);
            toast.success("Job added successfully!");
            navigate("/user");
        } catch (error) {
            toast.error("Failed to add job");
        } finally {
            setSelectedJobId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-2xl text-gray-700">Loading Jobs...</p>
                </div>
            </div>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">No Jobs Available</h2>
                    <p className="text-gray-600">Check back later for new opportunities!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center text-blue-800 mb-12">
                    Available Job Offers
                </h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <div 
                            key={job.id} 
                            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
                        >
                            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                                {job.name}
                            </h2>
                            <p className="text-gray-600 mb-2">
                                {job.description}
                            </p>
                            <div className="mb-4">
                                <span className="text-sm font-medium text-gray-500">
                                    Provider: {job.provider}
                                </span>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <span 
                                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                                        job.taken 
                                            ? "bg-red-100 text-red-800" 
                                            : "bg-green-100 text-green-800"
                                    }`}
                                >
                                    {job.taken ? "Taken" : "Available"}
                                </span>
                                {!job.taken && (
                                    <button 
                                        onClick={() => handleAddJob(job.id)}
                                        disabled={selectedJobId === job.id}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50"
                                    >
                                        {selectedJobId === job.id ? "Adding..." : "Add Job"}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AvailableJobs;