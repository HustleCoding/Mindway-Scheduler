import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

interface User {
  uid: string;
  email: string | null;
}

interface AuthContextInterface {
  user: User | null;
  loading: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextInterface>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email } = user;
        setUser({ uid, email });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useRequireAuth = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.loading && !auth.user) {
      router.push("/signin");
    }
  }, [auth.loading, auth.user]);

  return auth;
};

export const useRedirectAuthenticated = (redirectTo: string = "/") => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.loading && auth.user) {
      router.push(redirectTo);
    }
  }, [auth.loading, auth.user]);

  return auth;
};
