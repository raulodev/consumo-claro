// import React, { useState, useRef } from "react";
// import { StyleSheet, Text, View, ViewProps, TextInput, Keyboard } from "react-native";
// import { Button } from "./old_button";
// import { verticalScale, horizontalScale, moderateScale } from "../utils/metrics";
// import Ionicons from "@expo/vector-icons/Ionicons";

// interface NewReadModalProps extends ViewProps {
//   setIsShow: (value: boolean) => void;
//   isShow: boolean;
//   onAddReading: (read: number) => void;
// }

// export const NewReadModal: React.FC<NewReadModalProps> = ({
//   style,
//   isShow,
//   onAddReading,
//   setIsShow,
//   ...props
// }) => {
//   const [reading, setReading] = useState<string>("");
//   const inputRef = useRef<TextInput | null>(null);

//   const reset = () => {
//     Keyboard.dismiss();
//     setReading("");
//     setIsShow(false);
//   };

//   return (
//     <View
//       style={[
//         styles.overlay,
//         style,
//         {
//           display: isShow ? "flex" : "none",
//         },
//       ]}
//       {...props}>
//       <View style={styles.touchClose} onTouchStart={reset}></View>
//       <View style={styles.modal}>
//         <Text style={styles.label}>Lectura del Metrocontador</Text>
//         <View style={styles.container_input}>
//           <Ionicons name="reader-outline" color="#757575" size={moderateScale(20)} />
//           <TextInput
//             ref={inputRef}
//             style={styles.input}
//             keyboardType="numeric"
//             onChangeText={(text) => setReading(text)}
//             value={reading}
//             cursorColor={"#424242"}
//             selectionColor={"rgba(0,0,0,0.1)"}
//             placeholder="Escribe aquí"
//             // onLayout={() => inputRef.current?.focus()} // FIXME
//             onSubmitEditing={() => {
//               onAddReading(Number(reading));
//               reset();
//             }}
//           />
//         </View>
//         <Button
//           title="OK"
//           onPress={() => {
//             onAddReading(Number(reading));
//             reset();
//           }}
//         />
//         <Button
//           title="Cancelar"
//           style={{ backgroundColor: "#424242" }}
//           underlayColor={"#212121"}
//           onPress={() => reset()}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     position: "absolute",
//     backgroundColor: "rgba(0,0,0,0.2)",
//     top: 0,
//     bottom: 0,
//     right: 0,
//     left: 0,
//   },
//   modal: {
//     height: "70%",
//     backgroundColor: "#fff",
//     padding: moderateScale(20),
//     gap: moderateScale(20),
//     borderTopLeftRadius: moderateScale(10),
//     borderTopRightRadius: moderateScale(10),
//   },
//   touchClose: {
//     height: "30%",
//   },
//   input: {
//     width: "100%",
//     color: "#757575",
//     fontSize: moderateScale(18),
//   },
//   container_input: {
//     height: verticalScale(45),
//     borderColor: "#757575",
//     borderWidth: 0.5,
//     borderRadius: moderateScale(5),
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//     paddingHorizontal: horizontalScale(6),
//   },
//   label: {
//     color: "#757575",
//     fontSize: moderateScale(20),
//     fontWeight: "600",
//     textAlign: "center",
//   },
// });
