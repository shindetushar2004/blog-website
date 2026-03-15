import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // jab tak Firebase check kare

  useEffect(() => {
    // ✅ Firebase ka proper way - user state subscribe karo
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      // LocalStorage sync karo
      if (user) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user.uid,
            username: user.displayName,
            email: user.email,
          }),
        );
      } else {
        localStorage.removeItem("user");
      }

      setLoading(false);
    });

    return unsubscribe; // cleanup on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {/* Loading khatam hone tak kuch mat render karo */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook - kisi bhi component mein use karo
export const useAuth = () => useContext(AuthContext);
