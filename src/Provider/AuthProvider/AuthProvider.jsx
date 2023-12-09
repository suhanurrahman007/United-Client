import { useEffect, useState } from "react";
import { createContext } from "react";

import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../../Config/firebase.config";
import usePublicAxios from "../../hooks/usePublicAxios";

const Google = new GoogleAuthProvider();
const github = new GithubAuthProvider();

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const publicAxios = usePublicAxios();
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const googleUser = () => {
    setIsLoading(true);
    return signInWithPopup(auth, Google);
  };

  const githubUser = () => {
    setIsLoading(true);
    return signInWithPopup(auth, github);
  };

  const createUser = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        publicAxios.post("jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setIsLoading(false);
          }
        });
      }else{
        localStorage.removeItem("access-token")
        setIsLoading(false)
      }
    });
    return () => {
      return unSubscribe();
    };
  }, []);

  const login = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setIsLoading(true);
    return signOut(auth);
  };

  const AuthInfo = {
    user,
    isLoading,
    createUser,
    login,
    logout,
    googleUser,
    githubUser,
  };
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
