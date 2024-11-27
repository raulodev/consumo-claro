import { registerRootComponent } from "expo";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { AddRegister } from "./src/components/add-register";
import { Alert } from "./src/components/alert";
import { Button } from "./src/components/button";
import { Calculator } from "./src/components/calculator";
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
import { moderateScale, verticalScale } from "./src/utils/metrics";
import { calculateElectricityCost } from "./src/utils/tariff";

type modals = "calculator" | "add-register" | "image-view";

export default function App() {
  const [showModal, setShowModal] = useState<modals>();
  const [image, setImage] = useState<string>();
  const [selectQuick, setSelectQuick] = useState<boolean>(false);
  const [registerToUpdate, setRegisterToUpdate] = useState<Register>();
  const [registers, setRegisters] = useState<Register[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [cost, setCost] = useState<number>(0);
  const [showAlert, setshowAlert] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  useEffect(() => {
    async function init() {
      await createTables();

      const allRegisters = await getAllRegisters();
      setRegisters(allRegisters);

      if (allRegisters.length <= 1) {
        setCost(0);
      } else {
        setCost(
          calculateElectricityCost(
            allRegisters[allRegisters.length - 1].read - allRegisters[0].read,
          ),
        );
      }
    }
    init();

    if (selectedIds.length > 0) setSelectQuick(true);
    else setSelectQuick(false);
  }, [selectedIds, showModal]);

  const handlerAddToDelete = (id: number) => {
    if (!selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    }
  };

  const handlerRestartSelect = () => {
    if (selectedIds.length === registers.length) {
      setSelectedIds((current) => []);
    } else {
      const allIds = registers.map((item) => item.id);
      setSelectedIds(allIds);
    }
  };

  const handlerAddOrUpdateRegister = async (value: number, image: string | undefined) => {
    // Evitar agregar un registro mayor al registro siguiente si existe
    // y menor al anterior si existe

    if (registerToUpdate) {
      let prevRecord: Register | undefined;
      let nextRecord: Register | undefined;
      for (let index = 0; index < registers.length; index++) {
        const record = registers[index];
        if (record.id === registerToUpdate.id) {
          prevRecord = registers[index - 1];
          nextRecord = registers[index + 1];
        }
      }

      if (prevRecord && prevRecord.read >= value) {
        setshowAlert({
          ...showAlert,
          open: true,
          message: `Esta lectura no puede ser menor o igual a ${prevRecord?.read}`,
        });
        return;
      }
      if (nextRecord && nextRecord.read <= value) {
        setshowAlert({
          ...showAlert,
          open: true,
          message: `Esta lectura no puede ser mayor o igual a ${nextRecord?.read}`,
        });
        return;
      }
      await updateRegister(registerToUpdate.id, value, image);
      setRegisterToUpdate(undefined);
    } else {
      const lastRecord = registers[registers.length - 1];

      if (lastRecord && lastRecord.read >= value) {
        setshowAlert({
          ...showAlert,
          open: true,
          message: `Esta lectura no puede ser menor o igual a ${lastRecord.read}`,
        });
        return;
      }

      const date = new Date();

      await insertRegister(
        date.getDate(),
        date.getMonth(),
        date.getFullYear(),
        date.getTime(),
        value,
        image,
      );
    }

    setShowModal(undefined);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={palette.successLight} style="light" />
      <TopBar count={cost} rightAction={handlerRestartSelect} />

      <Alert
        message={showAlert.message}
        open={showAlert.open}
        onClose={() => {
          setshowAlert({ ...showAlert, open: false, message: "" });
        }}
      />

      <FlatList
        ListEmptyComponent={<ListEmpty />}
        data={registers}
        renderItem={({ item, index }) => (
          <Card
            register={item}
            onSelect={handlerAddToDelete}
            isSelectQuick={selectQuick}
            selected={selectedIds}
            onGetImage={(image) => {
              setImage(image);
              setShowModal("image-view");
            }}
            prevRegister={registers[index - 1]}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={<View style={{ height: 100 }}></View>}
      />

      {selectedIds.length === 1 && (
        <FloatingButton
          icon="pencil"
          animate
          style={{ bottom: moderateScale(260), right: moderateScale(20) }}
          onPress={async () => {
            setShowModal("add-register");
            const editRegister = registers.filter((item) => item.id === selectedIds[0]);
            setRegisterToUpdate(editRegister[0]);
          }}
        />
      )}

      {selectedIds.length > 0 && (
        <FloatingButton
          icon="trash"
          iconColor={palette.error}
          animate
          style={{ bottom: moderateScale(180), right: moderateScale(20) }}
          onPress={async () => {
            selectedIds.forEach(async (id) => {
              await deleteRegister(id);
            });
            setSelectedIds([]);
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
        }}>
        <View
          style={{
            gap: moderateScale(20),
          }}>
          <Image
            source={{ uri: image }}
            transition={500}
            style={{
              height: verticalScale(300),
              borderRadius: moderateScale(8),
              overflow: "hidden",
            }}
          />
          <Button
            type="secondary"
            title="Cerrar"
            onPress={() => {
              setShowModal(undefined);
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
          setRegisterToUpdate(undefined);
        }}>
        <AddRegister
          onAddOrUpdateRegister={handlerAddOrUpdateRegister}
          onClose={() => {
            setShowModal(undefined);
            setRegisterToUpdate(undefined);
          }}
          register={registerToUpdate}
        />
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
