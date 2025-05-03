import { View, TextInput, Text } from "react-native";
import React from "react";

interface FormInputProps {
  onChangeText: (str: string) => void;
  placeholder: string;
  value: string;
  secureTextEntry?: boolean;
}

const FormInput = ({
  placeholder,
  onChangeText,
  value,
  secureTextEntry,
}: FormInputProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        className="flex-1 text-white ml-2"
        placeholderTextColor="#a8b5db"
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default FormInput;
