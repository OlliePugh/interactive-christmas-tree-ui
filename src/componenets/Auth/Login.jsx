/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { auth } from "../../config/fb_config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import Board from "../Canvas/Board";

const Login = () => {
  const [userData, setUserData] = useState(false);
  const provider = new GoogleAuthProvider();

  const signInWrapper = () => {
    signInWithPopup(auth, provider).then((result) => {
      setUserData(result.user);
    });
  }

  const signOutWrapper = () => {
    signOut(auth, provider).then((_) => {
      setUserData(false);
    });
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData(user);
      }
    });
  }, [userData]);

  if (userData) {
    return (
      <div className="Container">
        <Board userData={userData} boardId={1} signOut={signOutWrapper} />
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
}

export default Login;
