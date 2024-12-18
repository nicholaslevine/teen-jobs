import { useState } from "react";
import { useProviderContext } from "../../context/providerContext";
import toast from "react-hot-toast";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setProvider } = useProviderContext();

    const signup = async (inputs) => {
        try {
            if (!inputs.username || !inputs.password || !inputs.name || !inputs.description) {
                throw new Error("Invalid input data");
            }

            setLoading(true);
            const res = await fetch("/api/provider/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });

            let data = {};
            try {
                data = await res.json();
            } catch {
                throw new Error("Server response was not valid JSON");
            }

            if (!res.ok) throw new Error(data.error || "Signup failed");

            setProvider(data);
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;
