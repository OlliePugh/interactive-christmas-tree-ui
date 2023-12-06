"use client";

import { auth, firestore } from "@/config/fb_config";
import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { doc, getDoc } from "firebase/firestore";

interface UserContextPayload {
  user: User | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin?: boolean;
}

export const UserContext = createContext<UserContextPayload>({
  user: null,
  signIn: async () => console.error("UserContext not initialised"),
  signOut: async () => console.error("UserContext not initialised"),
});
const provider = new GoogleAuthProvider();

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

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
    auth.onAuthStateChanged(async (newUser) => {
      if (newUser) {
        setUser(newUser);
        const docRef = doc(firestore, "admins", newUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().isAdmin != null) {
          setIsAdmin(docSnap.data().isAdmin);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    });
  }, [user]);

  return (
    <UserContext.Provider value={{ user: user, signIn, signOut, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
