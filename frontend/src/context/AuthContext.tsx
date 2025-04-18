import {
  SetStateAction,
  Dispatch,
  useState,
  createContext,
  ReactNode,
  useEffect,
  useContext,
} from "react";

type AuthUserType = {
  id: string;
  fullName: string;
  email: string;
  profilePic: string;
  gender: string;
};

const AuthContext = createContext<{
  authUser: AuthUserType | null;
  setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
  isLoading: boolean;
}>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
});

type AuthProviderProps = {
  children: ReactNode;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await fetch("/api/auth/me")
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message)
        }
        setAuthUser(data);
      }catch(error) {
        console.error(error);
      }finally{
        setIsLoading(false);
      }
    }
    fetchAuthUser();
  }, [])
  return (
    <AuthContext.Provider
      value={{
        authUser,
        isLoading,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
