import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Rating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";

const MyScreen = () => {
  const [transactionData, setTransactionData] = useState({
    price: "$20",
    rating: "5.0",
    numberOfComment: "(262)",
    kayaFee: "$5",
    StreetParking: "$5",
    total: "$30",
  });

  const [tripDetails, setTripDetails] = useState({
    dates: "May 1 - 6",
    guests: "1 guest",
  });

  const [selectedOption, setSelectedOption] = useState(null);

  const handleGoBack = () => {
    console.log("Go back");
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Confirm and pay</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.bookingInfo}>
          <View>
            <View style={styles.priceRent}>
              <Text style={styles.roomPrice}>{transactionData.price}</Text>
              <Text>/night</Text>
            </View>
            <Text style={{ padding: 10, fontSize: 16 }}>Balian treehouse</Text>

            <View style={styles.rating}>
              <Rating
                type="star"
                ratingCount={1}
                imageSize={15}
                startingValue={1}
              />
              <Text style={{ marginRight: 5, marginLeft: 5 }}>
                {transactionData.rating}
              </Text>
              <Text>{transactionData.numberOfComment}</Text>
            </View>
          </View>
          <Image
            source={{
              uri: "https://khachsanvietnam.com.vn/vnt_upload/news/07_2021/kk-sapa-hotel-2.jpg",
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.YourTrip}>
          <Text style={styles.tripTitle}>Your trip</Text>
          <View style={styles.tripDetail}>
            <View style={styles.tripValueContainer}>
              <Text style={styles.tripLabel}>Dates</Text>
              <Text style={styles.tripValue}>{tripDetails.dates}</Text>
            </View>
            <Ionicons name="create-outline" size={25} color="gray" />
          </View>
          <View style={styles.tripDetail}>
            <View style={styles.tripValueContainer}>
              <Text style={styles.tripLabel}>Guests</Text>
              <Text style={styles.tripValue}>{tripDetails.guests}</Text>
            </View>
            <Ionicons name="create-outline" size={25} color="gray" />
          </View>
        </View>
        <View style={styles.Paymentoptions}>
          <Text style={styles.tripTitle}>Payment options</Text>

          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => handleOptionSelect("full")}
          >
            <View style={styles.option}>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Pay in full</Text>
                <Text style={styles.optionDescription}>
                  Pay $30 now to finalize your booking.
                </Text>
              </View>
              <Ionicons
                name={
                  selectedOption === "full"
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={24}
                color={selectedOption === "full" ? "#00BCD6" : "gray"}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => handleOptionSelect("part")}
          >
            <View style={styles.option}>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Pay a part now</Text>
                <Text style={styles.optionDescription}>
                  You can make a partial payment now and the remaining amount at
                  a later time.
                </Text>
              </View>
              <Ionicons
                name={
                  selectedOption === "part"
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={24}
                color={selectedOption === "part" ? "#00BCD6" : "gray"}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.priceDetail}>
          <Text style={styles.tripTitle}>Price details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>$20 x 1 night</Text>
            <Text style={styles.detailValue}>{transactionData.price}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Kayak fee</Text>
            <Text style={styles.detailValue}>{transactionData.kayaFee}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Street parking fee</Text>
            <Text style={styles.detailValue}>
              {transactionData.StreetParking}
            </Text>
          </View>
        </View>
        <View style={styles.priceDetail}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total (USD)</Text>
            <Text style={styles.detailValue}>{transactionData.total}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("PaymentScreen")}
        >
          <Text style={styles.titleButton}>Book now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center", // Căn giữa nội dung
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    width: "95%",
    paddingVertical: 10,
    marginTop: 50,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  scrollView: {
    width: "100%",
    backgroundColor: "#fff",
  },
  bookingInfo: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    width: "95%", // Đảm bảo chiều rộng không vượt quá 100%
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: 130,
    height: 135,
    borderRadius: 5,
    marginRight: 5,
  },
  roomPrice: {
    fontWeight: "bold",
    fontSize: 25,
  },
  priceRent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  rating: {
    flexDirection: "row",
    padding: 10,
  },
  YourTrip: {
    backgroundColor: "#fff",
    padding: 10,
    width: "95%",
  },
  tripTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    paddingVertical: 10,
  },
  tripDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    marginBottom: 10,
  },
  tripLabel: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#fff",
    marginBottom: 5,
  },
  tripValueContainer: {
    flexDirection: "column",
  },
  tripValue: {
    fontSize: 16,
    color: "gray",
  },
  Paymentoptions: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 20,
    width: "96%",
  },
  optionContainer: {
    marginBottom: 15,
    borderColor: "#EAEAEA",
    overflow: "hidden",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 1,
    justifyContent: "space-between",
  },
  optionText: {
    flexDirection: "column",
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 16,
    color: "gray",
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#00BCD6",
    height: 45,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  titleButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  priceDetail: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 20,
    width: "96%",
    borderTopWidth: 0.2,
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
    fontWeight: "bold",
  },
});

export default MyScreen;
