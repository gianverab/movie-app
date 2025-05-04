import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const { user, singout } = useAuth();

  const handleLogout = async () => {
    await singout();
  };

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <View className="flex-1 px-5">
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <View className="flex-row my-20 gap-x-4 items-center justify-center">
          <Image source={icons.person} className="size-8" tintColor="#fff" />
        </View>
        <View className="flex-row mt-5 gap-x-4 items-center justify-start">
          <Text className="text-gray-500 text-lg">Name:</Text>
          <Text className="text-white text-lg">{user?.name}</Text>
        </View>
        <View className="flex-row mt-5 gap-x-4 items-center justify-start">
          <Text className="text-gray-500 text-lg">Email:</Text>
          <Text className="text-white text-lg">{user?.email}</Text>
        </View>

        <TouchableOpacity
          className="bg-accent py-3.5 rounded-lg flex-row items-center justify-center mt-20"
          onPress={handleLogout}
        >
          <Text className="text-white text-base font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
