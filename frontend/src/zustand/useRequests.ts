import { create } from 'zustand';

interface RequestsState {
    requests: RequestType[] | null;
    setRequests: (requests: RequestType[] | null) => void;
}

const useRequests = create<RequestsState>((set) => ({
    requests: null,
    setRequests: (requests) => set({requests: requests}),
}));

export default useRequests;