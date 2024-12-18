import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

const CreateJob = () => {
  const [inputs, setInputs] = useState({
    name: "",
    description: ""
  });

  const { createJob, loading } = useCreateJob();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createJob(inputs);
    navigate("/provider");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600 text-center">Creating your job...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <h1 className="text-2xl font-bold tracking-tight">Create New Job</h1>
            <p className="text-blue-100 mt-2">Fill in the details below to create a new job posting</p>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 block">
                  Job Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={inputs.name}
                  onChange={handleInputChange}
                  placeholder="Enter job name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-gray-700 block">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={inputs.description}
                  onChange={handleInputChange}
                  placeholder="Enter a detailed job description"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md min-h-[150px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 p-6 rounded-b-lg border-t">
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors duration-200 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Job...
                  </>
                ) : (
                  'Create Job'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateJob;