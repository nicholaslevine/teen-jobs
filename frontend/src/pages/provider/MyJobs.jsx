import useGetJobs from "../../hooks/provider/useGetJobs";
import Header from "../../components/Header";

function MyJobs() {
   const { jobs, loading } = useGetJobs();

   if (loading) {
       return (
           <div className="min-h-screen bg-gray-50">
               <Header />
               <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                   <div className="text-center">
                       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
                       <p className="text-xl text-gray-700">Loading your jobs...</p>
                   </div>
               </div>
           </div>
       );
   }

   return (
       <div className="min-h-screen bg-gray-50">
           <Header />
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
               <h1 className="text-3xl font-bold text-gray-900 mb-8">My Posted Jobs</h1>
               
               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                   {jobs.map((job) => (
                       <div key={job.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                           <div className="p-6">
                               <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                   {job.name}
                               </h2>
                               <p className="text-gray-600 mb-4">
                                   {job.description}
                               </p>
                               <div className="space-y-2">
                                   <div className="flex items-center justify-between">
                                       <span className="text-sm font-medium text-gray-500">
                                           Status
                                       </span>
                                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                           job.taken 
                                               ? "bg-green-100 text-green-800" 
                                               : "bg-yellow-100 text-yellow-800"
                                       }`}>
                                           {job.taken ? "Assigned" : "Available"}
                                       </span>
                                   </div>
                                   
                                   {job.taken && job.teen && (
                                       <div className="flex items-center justify-between">
                                           <span className="text-sm font-medium text-gray-500">
                                               Assigned To
                                           </span>
                                           <span className="text-sm font-medium text-blue-600">
                                               {job.teen}
                                           </span>
                                       </div>
                                   )}
                               </div>
                           </div>
                       </div>
                   ))}
               </div>

               {jobs.length === 0 && (
                   <div className="text-center py-12">
                       <h3 className="text-xl font-medium text-gray-900 mb-2">
                           No Jobs Posted Yet
                       </h3>
                       <p className="text-gray-600">
                           Start by creating your first job posting.
                       </p>
                   </div>
               )}
           </div>
       </div>
   );
}

export default MyJobs;