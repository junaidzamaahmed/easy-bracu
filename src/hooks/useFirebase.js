import { useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import swal from "sweetalert";

export const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        console.log(error.message);
      });
    setIsLoading(false);
  };
  const signInWithGoogle = () => {
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        if (result.user.email.endsWith("@g.bracu.ac.bd")) {
          setUser(result.user);
          swal("Congratulations!", "Sign in successful!", "success");
        } else {
          logOut();
          swal("OOPS!", "Please sign in using your BRACU gsuit mail!", "error");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoading(true);
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
  }, []);

  return { signInWithGoogle, logOut, user, isLoading };
};
