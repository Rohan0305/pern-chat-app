import { useState } from "react";
import toast from "react-hot-toast";
import useRequests from "../zustand/useRequests";

const useIgnoreRequest = () => {
    const [ignoreLoading, setIgnoreLoading] = useState(false);
    const {requests} = useRequests();

    const ignoreRequest = async (requestId: string) => {
        setIgnoreLoading(true);
        try{
            const res = await fetch(`/api/friends/ignoreRequest/${requestId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            
            console.log(requests);
        }catch(error: any){
            toast.error(error.message)
        } finally {
            setIgnoreLoading(false);
        }
    }

    return {ignoreLoading, ignoreRequest};
}

export default useIgnoreRequest;