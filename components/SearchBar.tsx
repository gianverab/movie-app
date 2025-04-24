import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface SearchBarProps {
  onPress?: () => void;
  //onChangeText: () => void;
  placeholder: string;
  //value: string;
}

const SearchBar = ({ onPress, placeholder }: SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPress={onPress}
        onChangeText={() => {}}
        placeholder={placeholder}
        value=""
        className="flex-1 text-white ml-2"
        placeholderTextColor="#a8b5db"
      />
    </View>
  );
};

export default SearchBar;
