import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "./firebase.config";

// Initialize Firebase
const initializeAuthentication = () => {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
};

export default initializeAuthentication;
