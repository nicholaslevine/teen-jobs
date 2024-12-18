import { useState } from "react";
import useSignup from "../../hooks/user/useSignup";
import Header from "../../components/Header";

function Signup() {
   const [inputs, setInputs] = useState({
       fullName: "",
       username: "", 
       password: "",
       description: ""
   });
   const { signup, loading } = useSignup();

   function handleSubmit(e) {
       e.preventDefault();
       signup(inputs);
   }

   if (loading) {
       return (
           <div className="min-h-screen bg-gray-50">
               <Header />
               <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                   <div className="text-center">
                       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
                       <p className="text-xl text-gray-700">Creating your account...</p>
                   </div>
               </div>
           </div>
       );
   }

   return (
       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
           <Header />
           <div className="max-w-2xl mx-auto pt-10 pb-16 px-4">
               <div className="bg-white rounded-xl shadow-2xl p-8">
                   <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                       Create Your Account
                   </h2>
                   
                   <form onSubmit={handleSubmit} className="space-y-6">
                       <div>
                           <label 
                               htmlFor="username" 
                               className="block text-sm font-medium text-gray-700 mb-2"
                           >
                               Username
                           </label>
                           <input 
                               type="text"
                               name="username"
                               id="username"
                               required
                               className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                               onChange={(e) => setInputs({...inputs, username: e.target.value})}
                           />
                       </div>

                       <div>
                           <label 
                               htmlFor="password" 
                               className="block text-sm font-medium text-gray-700 mb-2"
                           >
                               Password
                           </label>
                           <input 
                               type="password"
                               name="password"
                               id="password"
                               required
                               className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                               onChange={(e) => setInputs({...inputs, password: e.target.value})}
                           />
                       </div>

                       <div>
                           <label 
                               htmlFor="fullName" 
                               className="block text-sm font-medium text-gray-700 mb-2"
                           >
                               Full Name
                           </label>
                           <input 
                               type="text"
                               name="fullName"
                               id="fullName"
                               required
                               className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                               onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
                           />
                       </div>

                       <div>
                           <label 
                               htmlFor="description" 
                               className="block text-sm font-medium text-gray-700 mb-2"
                           >
                               Description
                           </label>
                           <textarea 
                               name="description"
                               id="description"
                               rows="4"
                               className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                               onChange={(e) => setInputs({...inputs, description: e.target.value})}
                           ></textarea>
                       </div>

                       <div>
                           <button 
                               type="submit"
                               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                           >
                               Create Account
                           </button>
                       </div>
                   </form>

                   <p className="mt-6 text-center text-sm text-gray-600">
                       Already have an account?{' '}
                       <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                           Sign in
                       </a>
                   </p>
               </div>
           </div>
       </div>
   );
}

export default Signup;