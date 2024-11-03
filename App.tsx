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
import { insertRegister, createTables, getAllRegisters, deleteRegister } from "./src/lib/database";
import { Register } from "./src/lib/interfaces";
import { calculateElectricityCost } from "./src/utils/tariff";

// Hacer dos Vistas
// 7- Tomar foto
// 8- Guardar foto en la base de datos
// 9- mostrar foto

export default function App() {
  const [isCalculatorOpen, setCalculatorOpen] = useState<boolean>(false);
  const [isAddRegisterOpen, setAddRegisterOpen] = useState<boolean>(false);
  const [selectQuick, setSelectQuick] = useState<boolean>(false);
  const [registers, setRegisters] = useState<Register[]>([]);
  const [register, setRegister] = useState<string | undefined>("");
  const [toDelete, setDelete] = useState<number[]>([]);
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

    if (toDelete.length > 0) setSelectQuick(true);
    else setSelectQuick(false);
  }, [toDelete, isAddRegisterOpen]);

  const handlerAddToDelete = (id: number) => {
    if (!toDelete.includes(id)) {
      setDelete([...toDelete, id]);
    } else {
      setDelete(toDelete.filter((item) => item !== id));
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

      {toDelete.length > 0 && (
        <FloatingButton
          icon="trash"
          iconColor={palette.error}
          animate
          style={{ bottom: moderateScale(180), right: moderateScale(20) }}
          onPress={async () => {
            toDelete.forEach(async (id) => {
              await deleteRegister(id);
            });
            setDelete([]);
            setSelectQuick(false);
          }}
        />
      )}

      <FloatingButton
        icon="calculator"
        animate={false}
        style={{ bottom: moderateScale(100), right: moderateScale(20) }}
        onPress={() => setCalculatorOpen(true)}
      />

      <FloatingButton
        animate={false}
        style={{ bottom: moderateScale(20), right: moderateScale(20) }}
        onPress={() => setAddRegisterOpen(!isAddRegisterOpen)}
      />

      <Modal open={isCalculatorOpen} onAction={() => setCalculatorOpen(false)}>
        <Calculator />
      </Modal>

      <Modal open={isAddRegisterOpen} onAction={() => setAddRegisterOpen(!isAddRegisterOpen)}>
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
              onChangeText={(text) => setRegister(text)}
              autoFocus
            />

            <Button circle icon="camera" type="successLight" onPress={() => {}} />
          </View>

          <Button
            title="Guardar"
            type="successLight"
            onPress={async () => {
              if (register && register.length > 0) {
                if (
                  registers.length >= 1 &&
                  Number(register) <= registers[registers.length - 1].read
                )
                  return;

                const date = new Date();

                await insertRegister(
                  date.getDay(),
                  date.getMonth(),
                  date.getFullYear(),
                  date.getTime(),
                  Number(register),
                );

                setRegister(undefined);

                setAddRegisterOpen(false);
              }
            }}
          />
          <Button title="Cancelar" type="secondary" onPress={() => setAddRegisterOpen(false)} />
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
