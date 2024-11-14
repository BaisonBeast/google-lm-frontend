import {SignIn, useUser} from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import useUserStore from "../store/userStore.ts";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();
    const { user: clerkUser } = useUser();
    const { setUser } = useUserStore();

    useEffect(() => {
        if (isSignedIn) {
            navigate("/home");
        } else {
            const clerkId = clerkUser?.id;
            const email = clerkUser?.primaryEmailAddress?.emailAddress;

            if (clerkId && email) {
                getUser();
            }
        }
    }, [isSignedIn, navigate]);

    const getUser = async (): Promise<void> => {
        try {
            const resp = await axios.get(`${API_URL}/api/users/getUser/${clerkUser?.id}`);
            const userData = {
                userId: resp.data.clerkId,
                email: resp.data.email,
                openAikey: resp.data.openAikey,
            };
            // localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData)
        } catch (error) {
            console.error("Error sending user data to backend:", error);
        }
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <SignIn afterSignInUrl={import.meta.env.CLERK_SIGN_IN_FORCE_REDIRECT_URL}/>
        </div>
    );
}
