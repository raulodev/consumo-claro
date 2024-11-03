import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import registerRootComponent from "expo/build/launch/registerRootComponent";
import Calculator from "./src/components/calculator";
import { FloatingButton } from "./src/components/floating-buttons";
import { Modal } from "./src/components/modal";
import { Button } from "./src/components/button";
import { Card } from "./src/components/card";
import { TopBar } from "./src/components/top-bar";
import { ListEmpty } from "./src/components/list-empty";
import { palette } from "./src/utils/colors";
import { moderateScale } from "./src/utils/metrics";
import {
  insertRegister,
  createTables,
  getAllRegisters,
  deleteRegister,
  updateRegister,
} from "./src/lib/database";
import { Register } from "./src/lib/interfaces";
import { calculateElectricityCost } from "./src/utils/tariff";

// Hacer dos Vistas
// 7- Tomar foto
// 8- Guardar foto en la base de datos
// 9- mostrar foto

type modals = "calculator" | "add-register";

export default function App() {
  const [showModal, setShowModal] = useState<modals>();
  const [selectQuick, setSelectQuick] = useState<boolean>(false);
  const [recordToUpdate, setRecordToUpdate] = useState<Register>();
  const [registers, setRegisters] = useState<Register[]>([]);
  const [meterCounter, setMeterCounter] = useState<string | undefined>("");
  const [selected, setSelected] = useState<number[]>([]);
  const [cost, setCost] = useState<number>(0);

  useEffect(() => {
    async function init() {
      await createTables();

      const allRegisters = await getAllRegisters();
      setRegisters(allRegisters);

      if (allRegisters.length === 0) {
        setCost(0);
      } else if (allRegisters.length == 1) {
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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={palette.successLight} style="light" />
      <TopBar count={cost} />

      <FlatList
        ListEmptyComponent={<ListEmpty />}
        data={registers}
        renderItem={({ item }) => (
          <Card register={item} onSelect={handlerAddToDelete} selectQuick={selectQuick} />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={<View style={{ height: 40 }}></View>}
      />

      {selected.length == 1 && (
        <FloatingButton
          icon="pencil"
          animate
          style={{ bottom: moderateScale(260), right: moderateScale(20) }}
          onPress={async () => {
            setShowModal("add-register");
            const editRegister = registers.filter((item) => item.id === selected[0]);
            setRecordToUpdate(editRegister[0]);
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

      <Modal open={showModal === "calculator"} onAction={() => setShowModal(undefined)}>
        <Calculator />
      </Modal>

      <Modal open={showModal === "add-register"} onAction={() => setShowModal(undefined)}>
        <View
          style={{ paddingHorizontal: moderateScale(15), marginTop: 20, gap: moderateScale(20) }}>
          <Text style={styles.label}>Agregar lectura</Text>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <TextInput
              keyboardType="numeric"
              cursorColor={palette.accents_7}
              selectionColor={palette.accents_3}
              placeholder="1234..."
              style={styles.input}
              onChangeText={(text) => setMeterCounter(text)}
              value={meterCounter}
              autoFocus
            />

            <Button circle icon="camera" type="successLight" onPress={() => {}} />
          </View>

          <Button
            title={recordToUpdate ? "Actualizar" : "Guardar"}
            type="successLight"
            onPress={async () => {
              if (meterCounter && meterCounter.length > 0) {
                if (recordToUpdate) {
                  // Evitar agregar un registro mayor al registro siguiente si existe
                  // y menor al anterior si existe

                  let prevRecord: Register | undefined;
                  let nextRecord: Register | undefined;

                  for (let index = 0; index < registers.length; index++) {
                    const record = registers[index];

                    if (record.id === recordToUpdate.id) {
                      prevRecord = registers[index - 1];
                      nextRecord = registers[index + 1];
                    }
                  }

                  if (
                    (prevRecord && prevRecord.read >= Number(meterCounter)) ||
                    (nextRecord && nextRecord.read <= Number(meterCounter))
                  ) {
                    return;
                  }

                  await updateRegister(recordToUpdate.id, Number(meterCounter));
                  setRecordToUpdate(undefined);
                } else {
                  // Evitar agregar un registro menor al anterior existente
                  if (
                    registers.length >= 1 &&
                    Number(meterCounter) <= registers[registers.length - 1].read
                  )
                    return;

                  const date = new Date();

                  await insertRegister(
                    date.getDay(),
                    date.getMonth(),
                    date.getFullYear(),
                    date.getTime(),
                    Number(meterCounter),
                  );
                }

                setMeterCounter(undefined); // Restablecer el valor de la entrada
                setShowModal(undefined);
              }
            }}
          />
          <Button
            title="Cancelar"
            type="secondary"
            onPress={() => {
              setShowModal(undefined);
              setRecordToUpdate(undefined);
              setMeterCounter(undefined);
            }}
          />
        </View>
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
