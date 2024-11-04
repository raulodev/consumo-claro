import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { CameraView, CameraType, useCameraPermissions, FlashMode } from "expo-camera";
import { Button } from "./button";

interface CameraProps {
  action?: () => void;
  back?: () => void;
}

export const Camera: React.FC<CameraProps> = ({ action, back }) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function toggleCameraFlash() {
    setFlash((current) => (current === "off" ? "on" : "off"));
  }

  function takePicture() {}

  return (
    <Animated.View style={styles.container} entering={FadeIn}>
      <CameraView
        style={styles.camera}
        facing={facing}
        flash={flash}
        onCameraReady={() => {
          console.log("redy");
        }}></CameraView>
      <View style={styles.buttonContainer}>
        <Button icon="return-up-back" circle onPress={back} type="successLight" />
        <Button
          icon={flash === "on" ? "flash" : "flash-off"}
          circle
          onPress={toggleCameraFlash}
          type="successLight"
        />
        <Button icon="refresh-outline" circle onPress={toggleCameraFacing} type="successLight" />
      </View>
      <View style={{ alignItems: "center" }}>
        <Button
          icon="camera"
          circle
          type="successLight"
          style={{
            borderRadius: 60 / 2,
            width: 60,
            height: 60,
          }}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  camera: {
    height: "50%",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    margin: 64,
  },
});
