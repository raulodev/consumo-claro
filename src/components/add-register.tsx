import { useCameraPermissions } from "expo-camera";
import React, { useState, useEffect } from "react";
import { View } from "react-native";

import { Button } from "./button";
import { Camera } from "./camera";
import { Input } from "./input";
import { Label } from "./label";
import { Register } from "../lib/interfaces";
import { moderateScale } from "../utils/metrics";

interface AddRegisterProps {
  onClose: () => void;
  onAddOrUpdateRegister: (value: number, image: string | undefined) => void;
  register?: Register;
}

export const AddRegister: React.FC<AddRegisterProps> = ({
  onClose,
  onAddOrUpdateRegister,
  register,
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [meterCounter, setMeterCounter] = useState<number>();
  const [image, setImage] = useState<string>();
  const [showCamera, setShowCamera] = useState<boolean>(false);

  const handlerRestart = () => {
    setMeterCounter(undefined);
    setImage(undefined);
  };

  useEffect(() => {
    if (register) {
      setMeterCounter(register.read);
      if (register.image !== "undefined") setImage(register.image);
    }
  }, [register]);

  if (showCamera)
    return (
      <Camera
        getImage={(image) => {
          setImage(image);
          setShowCamera(false);
        }}
        back={() => setShowCamera(false)}
      />
    );

  return (
    <View
      style={{
        gap: moderateScale(20),
      }}>
      <Label text="Agregar lectura" />

      <View style={{ flexDirection: "row", gap: moderateScale(20) }}>
        <Input
          onGetValue={(value) => setMeterCounter(value)}
          placeholder="Lectura"
          defaultValue={meterCounter?.toString() || ""}
          style={{ flex: 1 }}
          autoFocus
        />

        <Button
          circle
          icon={image ? "repeat" : "camera"}
          type="successLight"
          onPress={async () => {
            if (permission && !permission.granted) {
              const response = await requestPermission();
              if (response.granted) {
                setShowCamera(true);
              }
            } else {
              setShowCamera(true);
            }
          }}
        />
      </View>

      <Button
        title={register ? "Actualizar" : "Guardar"}
        type="successLight"
        disabled={!meterCounter}
        onPress={() => {
          if (meterCounter) onAddOrUpdateRegister(meterCounter, image);
        }}
      />
      <Button
        title="Cancelar"
        type="secondary"
        onPress={() => {
          handlerRestart();
          onClose();
        }}
      />
    </View>
  );
};
