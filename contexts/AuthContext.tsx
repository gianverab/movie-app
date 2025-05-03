import { account } from "@/services/appwrite";
import React, { createContext, useState } from "react";
import { Text, SafeAreaView } from "react-native";
import { Models } from "react-native-appwrite";

// Define the shape of our authentication context data
interface AuthContextType {
  session: Models.Session | null;
  user: any; // Will be replaced with a more specific type later
  signin: () => Promise<void>;
  sigout: () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define props for the provider component
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [session, setSession] = useState<Models.Session | null>(null);
  const [user, setUser] = useState<any>(false);

  const signin = async (): Promise<void> => {};

  const sigout = async (): Promise<void> => {};

  const contextData: AuthContextType = {
    session,
    user,
    signin,
    sigout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <SafeAreaView>
          <Text>Loading...</Text>
        </SafeAreaView>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
