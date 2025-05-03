import { View, TextInput, Text } from "react-native";
import React from "react";

interface FormInputProps {
  onChangeText: (str: string) => void;
  placeholder: string;
  value: string;
  label: string;
}

const FormInput = ({
  placeholder,
  onChangeText,
  value,
  label,
}: FormInputProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Text className="text-white text-lg font-normal mt-5 mb-3">{label}</Text>
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        className="flex-1 text-white ml-2"
        placeholderTextColor="#a8b5db"
      />
    </View>
  );
};

export default FormInput;
