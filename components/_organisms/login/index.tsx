/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { auth } from "@/config/fb_config";
import {
  GoogleAuthProvider,
  User,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import Board from "../Board";

const Login = () => {
  const [userData, setUserData] = useState<User | boolean>(false);
  const provider = new GoogleAuthProvider();

  const signInWrapper = async () => {
    const { user } = await signInWithRedirect(auth, provider);
    setUserData(user);
  };

  const signOutWrapper = () => {
    signOut(auth).then((_) => {
      setUserData(false);
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData(user);
      }
    });
  }, [userData]);

  // todo get rid of this ts ignore
  if (userData) {
    return (
      <div className="Container">
        {/* @ts-ignore */}
        <Board userData={userData} boardId={1} />
      </div>
    );
  }
  return (
    <div className="Container">
      <div className="Auth-Button" onClick={signInWrapper}>
        [ Login ]
      </div>
    </div>
  );
};

export default Login;
