import { CameraView, CameraType, FlashMode } from "expo-camera";
import * as ExpoFileSystem from "expo-file-system";
import { Image } from "expo-image";
import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { Button } from "./button";

interface CameraProps {
  getImage: (image: string) => void;
  back?: () => void;
}

export const Camera: React.FC<CameraProps> = ({ getImage, back }) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [cameraReady, setCameraReady] = useState<boolean>();
  const [image, setImage] = useState<string>();
  const cameraRef = useRef<CameraView | null>(null);

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function toggleCameraFlash() {
    setFlash((current) => (current === "off" ? "on" : "off"));
  }

  async function takePicture() {
    if (cameraReady) {
      const source = await cameraRef.current?.takePictureAsync();

      if (source && source.uri) {
        setImage(source.uri);
      }
    }
  }

  async function savePicture() {
    if (image) {
      const date = new Date();
      const timestamp = date.getTime();
      const imageUrl = ExpoFileSystem.documentDirectory + `${timestamp}.jpg`;
      ExpoFileSystem.copyAsync({
        from: image,
        to: imageUrl,
      });
      getImage(imageUrl);
    }
  }

  return (
    <Animated.View entering={FadeIn}>
      {image ? (
        <View style={{ gap: 20 }}>
          <Image source={image} style={styles.image} transition={500} contentFit="cover" />
          <Button onPress={savePicture} type="successLight" title="Aceptar" />
          <Button
            onPress={() => setImage(undefined)}
            type="secondary"
            title="Reintentar"
            icon="camera"
          />
        </View>
      ) : (
        <View style={{ gap: 20 }}>
          <View style={styles.cameraContainer}>
            <CameraView
              animateShutter={false}
              ref={cameraRef}
              style={styles.camera}
              facing={facing}
              flash={flash}
              onCameraReady={() => {
                setCameraReady(true);
              }}></CameraView>
          </View>

          <View style={styles.buttonSettingContainer}>
            <Button icon="return-up-back" circle onPress={back} type="successLight" />
            <Button
              icon={flash === "on" ? "flash" : "flash-off"}
              circle
              onPress={toggleCameraFlash}
              type="successLight"
            />
            <Button
              icon="refresh-outline"
              circle
              onPress={toggleCameraFacing}
              type="successLight"
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Button
              icon="camera"
              circle
              type={cameraReady ? "successLight" : "secondary"}
              style={{
                borderRadius: 60 / 2,
                width: 60,
                height: 60,
              }}
              onPress={takePicture}
            />
          </View>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    height: 300,
  },
  buttonSettingContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  image: {
    height: 300,
    borderRadius: 8,
    overflow: "hidden",
  },
});
