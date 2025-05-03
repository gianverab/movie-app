import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import FormInput from "@/components/FormInput";

const Signin = () => {
  const session = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async () => {
    // TODO: Implement login logic
  };

  if (session) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <View className="flex-1 px-5">
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <View className="flex-1 mt-5 pb-10">
          <FormInput
            label="Email:"
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <FormInput
            label="Password:"
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            className="mx-5 bg-accent py-3.5 rounded-lg flex-row items-center justify-center z-50"
            onPress={handleSubmit}
          >
            <Text className="text-white text-base font-semibold">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signin;
