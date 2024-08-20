import { useEffect, useState, createContext } from "react";
import { getFirebaseBackend } from "../helper/firebase_helper"; // Import Firebase auth module

import { Spinner } from "flowbite-react";
// Create a context for the auth state
export const AuthContext = createContext();

// Create a provider component for the auth context
export const AuthProvider = (children) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const firebaseBackend = getFirebaseBackend();

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = firebaseBackend.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Unsubscribe from auth state changes on unmount
    return () => unsubscribe();
  }, [firebaseBackend]);

  // Show a loading message while the auth state is loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" size="xl" />
          <span className="pl-3">Loading...</span>
        </div>
      </div>
    );
  }

  // Provide the current user and loading state to children
  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
