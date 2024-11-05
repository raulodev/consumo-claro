import registerRootComponent from "expo/build/launch/registerRootComponent";
import { useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";

import { Alert } from "./src/components/alert";
import { Button } from "./src/components/button";
import { Calculator } from "./src/components/calculator";
import { Camera } from "./src/components/camera";
import { Card } from "./src/components/card";
import { FloatingButton } from "./src/components/floating-buttons";
import { ListEmpty } from "./src/components/list-empty";
import { Modal } from "./src/components/modal";
import { TopBar } from "./src/components/top-bar";
import {
  insertRegister,
  createTables,
  getAllRegisters,
  deleteRegister,
  updateRegister,
} from "./src/lib/database";
import { Register } from "./src/lib/interfaces";
import { palette } from "./src/utils/colors";
import { horizontalScale, moderateScale, verticalScale } from "./src/utils/metrics";
import { calculateElectricityCost } from "./src/utils/tariff";

type modals = "calculator" | "add-register" | "image-view";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [showModal, setShowModal] = useState<modals>();
  const [showAlert, setshowAlert] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });
  const [selectQuick, setSelectQuick] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [registerToUpdate, setRegisterToUpdate] = useState<Register>();
  const [registers, setRegisters] = useState<Register[]>([]);
  const [meterCounter, setMeterCounter] = useState<string | undefined>("");
  const [selected, setSelected] = useState<number[]>([]);
  const [cost, setCost] = useState<number>(0);
  const [image, setImage] = useState<string>();

  useEffect(() => {
    async function init() {
      await createTables();

      const allRegisters = await getAllRegisters();
      setRegisters(allRegisters);

      if (allRegisters.length === 0) {
        setCost(0);
      } else if (allRegisters.length === 1) {
        setCost(calculateElectricityCost(allRegisters[0].read));
      } else {
        setCost(
          calculateElectricityCost(
            allRegisters[allRegisters.length - 1].read - allRegisters[0].read,
          ),
        );
      }
    }
    init();

    if (selected.length > 0) setSelectQuick(true);
    else setSelectQuick(false);
  }, [selected, showModal]);

  const handlerAddToDelete = (id: number) => {
    if (!selected.includes(id)) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected.filter((item) => item !== id));
    }
  };

  const restartSelect = () => {
    if (selected.length === registers.length) {
      setSelected((current) => []);
    } else {
      const allIds = registers.map((item) => item.id);
      setSelected(allIds);
    }
  };

  return (
    <View style={styles.container}>
      <Alert
        message={showAlert.message}
        open={showAlert.open}
        onClose={() => {
          setshowAlert({ ...showAlert, open: false, message: "" });
        }}
      />

      <StatusBar backgroundColor={palette.successLight} style="light" />

      <TopBar count={cost} rightAction={restartSelect} />

      <FlatList
        ListEmptyComponent={<ListEmpty />}
        data={registers}
        renderItem={({ item, index }) => (
          <Card
            register={item}
            onSelect={handlerAddToDelete}
            isSelectQuick={selectQuick}
            selected={selected}
            onGetImage={(image) => {
              setShowModal("image-view");
              setImage(image);
            }}
            prevRegister={registers[index - 1]}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={<View style={{ height: 100 }}></View>}
      />

      {selected.length === 1 && (
        <FloatingButton
          icon="pencil"
          animate
          style={{ bottom: moderateScale(260), right: moderateScale(20) }}
          onPress={async () => {
            setShowModal("add-register");
            const editRegister = registers.filter((item) => item.id === selected[0]);
            setRegisterToUpdate(editRegister[0]);
          }}
        />
      )}

      {selected.length > 0 && (
        <FloatingButton
          icon="trash"
          iconColor={palette.error}
          animate
          style={{ bottom: moderateScale(180), right: moderateScale(20) }}
          onPress={async () => {
            selected.forEach(async (id) => {
              await deleteRegister(id);
            });
            setSelected([]);
            setSelectQuick(false);
          }}
        />
      )}

      <FloatingButton
        icon="calculator"
        animate={false}
        style={{ bottom: moderateScale(100), right: moderateScale(20) }}
        onPress={() => setShowModal("calculator")}
      />

      <FloatingButton
        animate={false}
        style={{ bottom: moderateScale(20), right: moderateScale(20) }}
        onPress={() => setShowModal("add-register")}
      />

      <Modal
        open={showModal === "image-view"}
        onAction={() => {
          setShowModal(undefined);
          setImage(undefined);
        }}>
        <View
          style={{
            padding: moderateScale(10),
            paddingTop: verticalScale(20),
            gap: moderateScale(20),
          }}>
          <Image
            source={{ uri: image }}
            transition={500}
            style={{ height: "80%", borderRadius: moderateScale(8), overflow: "hidden" }}
          />
          <Button
            type="secondary"
            title="Cerrar"
            onPress={() => {
              setShowModal(undefined);
              setImage(undefined);
            }}
          />
        </View>
      </Modal>

      <Modal open={showModal === "calculator"} onAction={() => setShowModal(undefined)}>
        <Calculator onClose={() => setShowModal(undefined)} />
      </Modal>

      <Modal
        open={showModal === "add-register"}
        onAction={() => {
          setShowModal(undefined);
          setImage(undefined);
        }}>
        {showCamera ? (
          <Camera
            back={() => setShowCamera(false)}
            getImage={(image) => {
              setImage(image);
              setShowCamera(false);
            }}
          />
        ) : (
          <View
            style={{
              paddingHorizontal: horizontalScale(15),
              marginTop: verticalScale(20),
              gap: moderateScale(20),
            }}>
            <Text style={styles.label}>Agregar lectura</Text>
            <View style={{ flexDirection: "row", gap: moderateScale(20) }}>
              <TextInput
                keyboardType="numeric"
                cursorColor={palette.successLight}
                selectionColor={palette.successLight}
                placeholder="Lectura"
                style={styles.input}
                onChangeText={(text) => setMeterCounter(text)}
                value={meterCounter}
                defaultValue={registerToUpdate ? registerToUpdate.read.toString() : meterCounter}
                autoFocus
              />

              <Button
                circle
                icon={image ? "checkmark" : "camera"}
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
              title={registerToUpdate ? "Actualizar" : "Guardar"}
              type="successLight"
              onPress={async () => {
                if (meterCounter && meterCounter.length > 0) {
                  if (registerToUpdate) {
                    // Evitar agregar un registro mayor al registro siguiente si existe
                    // y menor al anterior si existe

                    let prevRecord: Register | undefined;
                    let nextRecord: Register | undefined;

                    for (let index = 0; index < registers.length; index++) {
                      const record = registers[index];

                      if (record.id === registerToUpdate.id) {
                        prevRecord = registers[index - 1];
                        nextRecord = registers[index + 1];
                      }
                    }

                    if (prevRecord && prevRecord.read >= Number(meterCounter)) {
                      setshowAlert({
                        ...showAlert,
                        open: true,
                        message: `Esta lectura no puede ser menor o igual a ${prevRecord?.read}`,
                      });
                      return;
                    }

                    if (nextRecord && nextRecord.read <= Number(meterCounter)) {
                      setshowAlert({
                        ...showAlert,
                        open: true,
                        message: `Esta lectura no puede ser mayor o igual a ${nextRecord?.read}`,
                      });
                      return;
                    }

                    await updateRegister(registerToUpdate.id, Number(meterCounter), image);
                    setRegisterToUpdate(undefined);
                  } else {
                    const lastRecord = registers[registers.length - 1];
                    // Evitar agregar un registro menor al anterior existente
                    if (registers.length >= 1 && Number(meterCounter) <= lastRecord.read) {
                      setshowAlert({
                        ...showAlert,
                        open: true,
                        message: `Esta lectura no puede ser menor o igual a ${lastRecord.read}`,
                      });
                      return;
                    }

                    const date = new Date();

                    await insertRegister(
                      date.getDay(),
                      date.getMonth(),
                      date.getFullYear(),
                      date.getTime(),
                      Number(meterCounter),
                      image,
                    );
                  }

                  setMeterCounter(undefined); // Restablecer el valor de la entrada
                  setShowModal(undefined);
                  setImage(undefined);
                }
              }}
            />
            <Button
              title="Cancelar"
              type="secondary"
              onPress={() => {
                setShowModal(undefined);
                setRegisterToUpdate(undefined);
                setMeterCounter(undefined);
                setImage(undefined);
              }}
            />
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.successLight,
    justifyContent: "space-between",
  },
  label: {
    color: palette.accents_7,
    fontSize: moderateScale(18),
    fontWeight: "500",
  },
  input: {
    fontSize: moderateScale(18),
    borderWidth: 0.25,
    borderColor: palette.accents_5,
    borderRadius: moderateScale(5),
    padding: moderateScale(8),
    flex: 1,
  },
});

registerRootComponent(App);
