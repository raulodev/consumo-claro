// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ScrollView } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { verticalScale, horizontalScale, moderateScale } from "./utils/metrics";
// import { calculatePrecie } from "./utils/calculate-precie";
// import { openDatabase } from "./utils/open-db";
// import { NavBar } from "./components/navbar";
// import { FloatingButton } from "./components/floating-button";
// import { NewReadModal } from "./components/modal";
// import { ReadingCard } from "./components/reading-card";

// interface Reading {
//   id: number;
//   date: number;
//   read: number;
// }

// const db = openDatabase();

// export default function Page() {
//   const [isShowModal, setShowModal] = useState(false);
//   const [toPay, setPay] = useState<string>();
//   const [readingList, setReadingList] = useState<Reading[]>([]);
//   const [toDelete, setDelete] = useState<number[]>([]);

//   const handlerModal = (value: boolean) => {
//     setShowModal(value);
//   };

//   const handlerAddReading = (read: number) => {
//     if (read > 0) {
//       var date = new Date();
//       var timestamp = date.getTime();

//       db.transaction((tx) => {
//         tx.executeSql("INSERT INTO readings (date, read) VALUES (?, ?);", [timestamp, read]);
//       });
//     }
//   };

//   const handlerAddToDelete = (id: number) => {
//     if (!toDelete.includes(id)) {
//       setDelete([...toDelete, id]);
//     } else {
//       setDelete(toDelete.filter((item) => item !== id));
//     }
//   };

//   const handlerDelete = () => {
//     db.transaction((tx) => {
//       toDelete.forEach((id) => {
//         tx.executeSql("DELETE FROM readings WHERE id == ?", [id]);
//       });
//     });
//     setDelete([]);
//   };

//   const handlerDeselect = () => {
//     setDelete([]);
//   };

//   useEffect(() => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         "CREATE TABLE IF NOT EXISTS readings (id INTEGER PRIMARY KEY NOT NULL, date INT, read INT);",
//       );
//     });

//     db.transaction((tx) => {
//       tx.executeSql("SELECT * FROM readings", [], (_, { rows: { _array } }) => {
//         if (_array?.length >= 2) {
//           const first = _array[0]?.read;
//           const last = _array[_array.length - 1]?.read;

//           const precie = calculatePrecie(`${last - first}`);

//           setPay(precie.toString());
//         } else setPay(undefined);
//         setReadingList(_array);
//       });
//     });
//   }, [isShowModal, toDelete]);

//   return (
//     <View style={styles.container}>
//       <StatusBar style="auto" backgroundColor={toDelete.length > 0 ? "#3792EC" : undefined} />
//       <View style={styles.readings_container}>
//         <View
//           style={[
//             styles.info_container,
//             {
//               backgroundColor:
//                 toDelete.length > 0 ? "#3792EC" : styles.info_container.backgroundColor,
//               justifyContent: toDelete.length > 0 ? "space-between" : "center",
//             },
//           ]}>
//           <Text
//             style={[
//               styles.text,
//               {
//                 display: toDelete.length > 0 ? "none" : "flex",
//               },
//             ]}>
//             {toPay ? `${toPay} $` : "Total a Pagar"}
//           </Text>

//           {toDelete.length > 0 && (
//             <>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   gap: 20,
//                 }}>
//                 <Ionicons
//                   name="close"
//                   color="white"
//                   size={moderateScale(28)}
//                   onPress={handlerDeselect}
//                 />
//                 <Text
//                   style={{
//                     color: "white",
//                     fontSize: moderateScale(20),
//                   }}>
//                   {toDelete.length}
//                 </Text>
//               </View>
//               <Ionicons
//                 name="trash"
//                 color="white"
//                 size={moderateScale(24)}
//                 onPress={handlerDelete}
//               />
//             </>
//           )}
//         </View>
//         {readingList.length >= 1 ? (
//           <ScrollView>
//             {readingList.map((el, index, array) => (
//               <ReadingCard
//                 key={el.id}
//                 idReading={el.id}
//                 date={el.date}
//                 reading={el.read}
//                 prevReading={array[index - 1]?.read}
//                 onDelete={handlerAddToDelete}
//                 isSelected={toDelete.includes(el.id)}
//               />
//             ))}
//           </ScrollView>
//         ) : (
//           <NoReadings />
//         )}

//         <FloatingButton
//           style={{
//             position: "absolute",
//             bottom: moderateScale(20),
//             right: moderateScale(20),
//           }}
//           onPress={() => setShowModal(true)}>
//           <Ionicons name="add" color="white" size={moderateScale(24)} />
//         </FloatingButton>
//       </View>
//       <NavBar screen="main" />
//       <NewReadModal
//         setIsShow={handlerModal}
//         isShow={isShowModal}
//         onAddReading={handlerAddReading}
//       />
//     </View>
//   );
// }

// function NoReadings() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//       }}>
//       <Text
//         style={{
//           color: "#757575",
//           fontSize: moderateScale(18),
//           fontWeight: "600",
//           textAlign: "center",
//         }}>
//         No hay lecturas
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     justifyContent: "space-between",
//   },
//   readings_container: {
//     flex: 1,
//   },
//   info_container: {
//     backgroundColor: "white",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     height: verticalScale(70),
//     paddingVertical: verticalScale(10),
//     paddingHorizontal: horizontalScale(20),
//     borderBottomWidth: 0.5,
//     borderBottomColor: "#bdbdbd",
//   },
//   text: {
//     color: "#757575",
//     fontSize: moderateScale(22),
//     fontWeight: "500",
//     textAlign: "center",
//   },
// });
