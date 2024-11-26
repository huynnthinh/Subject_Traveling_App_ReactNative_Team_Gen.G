import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const PaymentScreen = () => {
  const [transactionData, setTransactionData] = useState({
    refNumber: "00000072697027",
    date: "09-05-2023",
    time: "05:40 AM",
    paymentMethod: "Credit card",
    amount: "$30",
  });

  const handleGetPDF = () => {
    console.log("Generating PDF...");
  };

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.space}></View>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://d2kpe7grvhf8ri.cloudfront.net/website/optimized_images/checkmark.png",
          }}
          style={styles.img}
        />
        <Text style={styles.title}>Payment success!</Text>
        <View style={styles.transactionDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Ref number:</Text>
            <Text style={styles.detailValue}>{transactionData.refNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date:</Text>
            <Text style={styles.detailValue}>{transactionData.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time:</Text>
            <Text style={styles.detailValue}>{transactionData.time}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment method:</Text>
            <Text style={styles.detailValue}>
              {transactionData.paymentMethod}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.headerAmount}>
        <View style={styles.transactionDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount:</Text>
            <Text style={styles.detailValue}>{transactionData.amount}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.buttonPDF} onPress={handleGetPDF}>
          <View style={styles.buttonContent}>
            <Icon name="file-pdf-o" size={20} color="#E63946" />
            <Text style={styles.buttonTextPDF}> Get PDF receipt</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.space}></View>
      <TouchableOpacity
        style={styles.buttonView}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Text style={styles.buttonTextView}>View booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  header: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: "100%",
    marginBottom: 2,
    flex: 2,
    justifyContent: "flex-end",
    position: "relative", // Thêm vị trí tương đối cho header
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    position: "absolute", // Để hình ảnh có thể đè lên header
    top: -50, // Điều chỉnh vị trí hình ảnh
    left: "50%", // Căn giữa theo chiều ngang
    marginLeft: -30, // Điều chỉnh để căn giữa
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
    marginBottom: 40,
  },
  transactionDetails: {
    width: "100%",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 16,
    color: "#000",
  },
  detailValue: {
    fontSize: 16,
    color: "#000",
    textAlign: "right",
    fontWeight: "bold",
  },
  headerAmount: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: "100%",
  },
  buttonPDF: {
    backgroundColor: "#fff",
    color: "#F5F5F5",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    borderColor: "#B0B0B0",
    borderWidth: 1,
    width: "100%",
    marginTop: 30,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonView: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  buttonTextPDF: {
    color: "gray",
    fontWeight: "bold",
    marginLeft: 10,
  },
  buttonTextView: {
    color: "#fff",
    fontWeight: "bold",
  },
  space: {
    flex: 1,
  },
});

export default PaymentScreen;
