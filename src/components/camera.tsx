import { CameraView, CameraType, FlashMode } from "expo-camera";
import { Image } from "expo-image";
import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { Button } from "./button";
import { moderateScale } from "../utils/metrics";

interface CameraProps {
  getImageBase64: (image: string) => void;
  back?: () => void;
}

export const Camera: React.FC<CameraProps> = ({ getImageBase64, back }) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [cameraReady, setCameraReady] = useState<boolean>();
  const [image, setImage] = useState<{ uri: string; base64: string }>();
  const cameraRef = useRef<CameraView | null>(null);

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function toggleCameraFlash() {
    setFlash((current) => (current === "off" ? "on" : "off"));
  }

  async function takePicture() {
    if (cameraReady) {
      const source = await cameraRef.current?.takePictureAsync({ base64: true });

      if (source && source.base64 && source.uri) {
        setImage({ ...image, uri: source.uri, base64: source.base64 });
      }
    }
  }

  function savePicture() {
    if (image && image.base64) getImageBase64(image.base64);
  }

  return (
    <Animated.View style={styles.container} entering={FadeIn}>
      {image ? (
        <View style={{ flex: 1, gap: moderateScale(20) }}>
          <Image source={image} style={styles.image} transition={500} contentFit="cover" />
          <Button onPress={savePicture} type="successLight" title="Guardar" />
          <Button
            onPress={() => setImage(undefined)}
            type="secondary"
            title="Reintentar"
            icon="camera"
          />
        </View>
      ) : (
        <View>
          <CameraView
            animateShutter={false}
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
            flash={flash}
            onCameraReady={() => {
              setCameraReady(true);
            }}></CameraView>
          <View style={styles.buttonContainer}>
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
  container: {
    flex: 1,
    height: 300,
    justifyContent: "center",
    backgroundColor: "transparent",
    padding: 10,
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
  image: {
    height: "50%",
    borderRadius: moderateScale(8),
    overflow: "hidden",
  },
});
