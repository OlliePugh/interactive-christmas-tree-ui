"use client";

import { auth } from "@/config/fb_config";
import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

interface UserContextPayload {
  user: User | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const UserContext = createContext<UserContextPayload>({
  user: null,
  signIn: async () => console.error("UserContext not initialised"),
  signOut: async () => console.error("UserContext not initialised"),
});
const provider = new GoogleAuthProvider();

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = useCallback(async () => {
    const result = await signInWithPopup(auth, provider).catch((e) => {
      console.error(e);
      return;
    });
    setUser(result!.user);
  }, []);

  const signOut = useCallback(async () => {
    await signOut().catch(console.error);
    setUser(null);
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((newUser) => {
      if (newUser) {
        setUser(newUser);
      }
    });
  }, [user]);

  return (
    <UserContext.Provider value={{ user: user, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
