import { account } from "@/services/appwrite";
import React, { createContext, useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Models } from "react-native-appwrite";

// Define the shape of our authentication context data
export interface AuthContextType {
  session: Models.Session | null;
  user: Models.User<Models.Preferences> | null;
  signin: ({ email, password }: { email: string; password: string }) => void;
  sigout: () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define props for the provider component
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Models.Session | null>(null);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

  useEffect(() => {
    initLoading();
  }, []);

  const initLoading = async () => {
    checkoutSession();
  };

  const checkoutSession = async () => {
    try {
      const responseSession = await account.getSession("current");
      setSession(responseSession);
      const responseUser = await account.get();
      setUser(responseUser);
    } catch (error) {
      console.error("Error checking session:", error);
      throw new Error("Failed to check session");
    }
    setLoading(false);
  };

  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> => {
    setLoading(true);
    try {
      const responseSession = await account.createEmailPasswordSession(
        email,
        password
      );
      setSession(responseSession);
      const responseUser = await account.get();
      setUser(responseUser);
    } catch (error) {
      console.error("Error signing in:", error);
      throw new Error("Failed to sign in");
    }
    setLoading(false);
  };

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
        <View className="flex-1 bg-primary">
          <Text className="text-5xl text-dark-200 font-bold">Loading...</Text>
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
