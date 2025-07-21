import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";

const useAuthHook = create((set) => ({
    authUser: null,
    isCheckingAuth: false,
    isSigningUp: false,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await api.get("/auth/check");
            set({ authUser: response.data.user, isCheckingAuth: false });
        } catch (error) {
            console.error("Error checking auth:", error);
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true });
        // Validate the input fields
        if (!data.username || !data.email || !data.password) {
                console.log("All required fields must be provided");
                return;
            }

            try {
                // Call the backend endpoint and pass the data
                const response = await api.post("/auth/signup", {
                    data
                })
                if (response.data){
                    toast.success("Signup successful");
                    return {
                        success: true,
                    }
                }
            }catch (error) {
                console.error(error);
            } finally{
                 ({isSigningUp: false });
        }
    },

}));
export default useAuthHook;