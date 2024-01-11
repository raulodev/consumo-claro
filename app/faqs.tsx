import { View, Text, StyleSheet, Image, Linking } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavBar } from "./components/navbar";
import { Accordion } from "./components/accordion";
import { verticalScale, horizontalScale, moderateScale } from "./utils/metrics";

export default function Page() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View
        style={{
          // justifyContent: "flex-start",
          gap: moderateScale(20),
          flex: 1,
          paddingHorizontal: horizontalScale(10),
          paddingTop: verticalScale(40),
        }}
      >
        <Accordion title="Cuál tarifa se usa en la aplicación ?">
          <Text style={styles.text}>Tarifa Residencial del año 2022</Text>
        </Accordion>
        <Accordion
          title="Cómo agregar una nueva lectura ?"
          bodyStyle={{
            gap: moderateScale(10),
            alignItems: "flex-start",
          }}
        >
          <Text style={styles.text}>
            1 - Primero hacemos click en el botón "+".
          </Text>
          <Image
            source={require("../assets/sc1.jpg")}
            style={{
              width: "100%",
              height: verticalScale(400),
              resizeMode: "contain",
            }}
          />
          <Text style={styles.text}>
            2 - Último paso rellenamos la entrada y presionamos OK.
          </Text>
          <Image
            source={require("../assets/sc2.jpg")}
            style={{
              width: "100%",
              height: verticalScale(400),
              resizeMode: "contain",
              marginBottom: verticalScale(100),
            }}
          />
        </Accordion>
        <Accordion
          title="Cómo elimino una lectura ?"
          bodyStyle={{
            gap: moderateScale(10),
            alignItems: "flex-start",
          }}
        >
          <Text style={styles.text}>
            1 - Primero dejamos presionado por un par de segundos la lectura que
            queremos borrar.
          </Text>
          <Image
            source={require("../assets/sc3.jpg")}
            style={{
              width: "100%",
              height: verticalScale(400),
              resizeMode: "contain",
            }}
          />
          <Text style={styles.text}>
            2 - Una vez que seleccionamos la o las lecturas a borrar presionamos
            el icono de basurero.
          </Text>
          <Image
            source={require("../assets/sc4.jpg")}
            style={{
              width: "100%",
              height: verticalScale(400),
              resizeMode: "contain",
              marginBottom: verticalScale(160),
            }}
          />
        </Accordion>

        <Accordion title="Es de código abierto la app ?">
          <Text style={styles.text}>
            Si, puede obtener el código fuente de Consumo Claro siguiendo el
            enlace a continuación:{" "}
            <Text
              onPress={() => {
                Linking.openURL("https://github.com/raulodev/ConsumoClaro");
              }}
              style={{
                color: "#59adff",
                textDecorationLine: "underline",
              }}
            >
              GitHub - Consumo Claro
            </Text>
          </Text>
        </Accordion>
        <Text
          style={{
            fontSize: moderateScale(12),
            color: "#757575",
            textAlign: "center",
          }}
        >
          Versión: 1.0.0
        </Text>
      </View>
      <NavBar screen="faqs" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  text: {
    color: "#757575",
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
});
