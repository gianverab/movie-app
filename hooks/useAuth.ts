import { AuthContext, AuthContextType } from "@/contexts/AuthContext";
import { useContext } from "react";

// Custom hook to use the auth context
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { useAuth };
