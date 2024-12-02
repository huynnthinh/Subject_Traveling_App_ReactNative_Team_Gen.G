import React, { useState, useEffect, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Rating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { CalendarList } from "react-native-calendars";
import { Dimensions } from "react-native";
import axios from "axios";

const MyScreen = () => {
  const route = useRoute(); // Sử dụng useRoute để lấy tham số
  const { price } = route.params; // Lấy giá từ tham số
  const [guestModalVisible, setGuestModalVisible] = useState(false);

  const kayaFee = 5; // Phí Kayak
  const streetParkingFee = 5; // Phí đỗ xe

  const [transactionData, setTransactionData] = useState({
    price: price,
    rating: "5.0",
    numberOfComment: "(262)",
    kayaFee: `$${kayaFee}`,
    streetParking: `$${streetParkingFee}`,
    total: "", // Sẽ được tính toán sau
  });
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  // Tính toán tổng mỗi khi giá phòng hoặc phí thay đổi
  useEffect(() => {
    const total = parseFloat(price) + kayaFee + streetParkingFee;
    setTransactionData((prevData) => ({
      ...prevData,
      total: `$${total.toFixed(2)}`, // Định dạng thành tiền tệ
    }));
  }, [price]);

  const [tripDetails, setTripDetails] = useState({
    dates: "May 1 - 6",
    guests: "1 guest",
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();

  const handleGoBack = () => {
    console.log("Go back");
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  ); // Default to today
  const calendarRef = useRef(null);
  const [days, setDays] = useState(1);
  //tắt modal lịch
  const handleCloseCalendarListModal = () => {
    setModalVisible(false);
  };
  //nút next trong lịch
  const handleNext = () => {
    if (selectedDate) {
      const startDate = moment(selectedDate);
      const endDate = startDate.clone().add(days - 1, "days");
      const range = `${startDate.format("D MMM")} - ${endDate.format("D MMM")}`;
      setTripDetails((prev) => ({
        ...prev,
        dates: range, // Cập nhật ngày trong tripDetails
      }));
    }
    setModalVisible(false);
  };

  const handleOpenDatePicker = () => {
    setModalVisible(true);
  };

  const handlePrevMonth = () => {
    if (calendarRef.current) {
      calendarRef.current.scrollToMonth(
        moment(selectedDate).subtract(1, "month").format("YYYY-MM-DD")
      );
    }
  };

  const handleNextMonth = () => {
    if (calendarRef.current) {
      calendarRef.current.scrollToMonth(
        moment(selectedDate).add(1, "month").format("YYYY-MM-DD")
      );
    }
  };

  //giảm ngày
  const handleReduceDays = () => {
    if (days > 1) {
      setDays((prevDays) => prevDays - 1);
    }
  };

  //tăng ngày
  const handleIncreaseDays = () => {
    setDays((prevDays) => prevDays + 1);
  };

  const [dateRange, setDateRange] = useState("Add time");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  //mở modal thêm guests
  const handleOpenGuestModal = () => {
    setGuestModalVisible(true);
  };

  //tắt modal thêm guests
  const handleCloseGuestModal = () => {
    setGuestModalVisible(false);
  };

  // tăng giảm Adults
  const handleIncreaseAdults = () => setAdults((prev) => prev + 1);
  const handleDecreaseAdults = () => setAdults((prev) => Math.max(0, prev - 1));

  //tăng giảm Children
  const handleIncreaseChildren = () => setChildren((prev) => prev + 1);
  const handleDecreaseChildren = () =>
    setChildren((prev) => Math.max(0, prev - 1));

  // Nút next trong thêm guest
  const handleNextGuests = () => {
    setTripDetails((prev) => ({
      ...prev,
      guests: `${adults} Adults - ${children} Children`, // Cập nhật số lượng khách
    }));
    handleCloseGuestModal();
  };

  const [guests, setGuests] = useState("Add guests");
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
            <TouchableOpacity onPress={handleOpenDatePicker}>
              <Ionicons name="create-outline" size={25} color="gray" />
            </TouchableOpacity>
            {/* Modal */}
            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.calendarContainer}>
                  <View style={styles.calendarHeader}>
                    <Text style={styles.titleDate}>When staying</Text>
                    <View style={styles.chooseDate}>
                      <TouchableOpacity style={styles.buttonChooseLeft}>
                        <Text style={styles.chooseText}>Choose dates</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonChooseRight}>
                        <Text style={styles.chooseText1}>Anytime</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.date}>
                      <View>
                        <Text style={styles.calendarHeaderText}>
                          {moment(selectedDate).format("MMMM YYYY")}
                        </Text>
                      </View>
                      <View style={styles.buttonHandle}>
                        <TouchableOpacity onPress={handlePrevMonth}>
                          <Ionicons
                            name="chevron-back"
                            size={24}
                            color="grey"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleNextMonth}>
                          <Ionicons
                            name="chevron-forward"
                            size={24}
                            color="grey"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <CalendarList
                    ref={calendarRef.current}
                    onDayPress={onDayPress}
                    selected={[selectedDate]}
                    markedDates={{
                      [selectedDate]: {
                        selected: true,
                        marked: true,
                        selectedColor: "#3FB3BB",
                      },
                      [moment().format("YYYY-MM-DD")]: {
                        marked: true,
                        dotColor: "#3FB3BB",
                      },
                    }}
                    onPressArrowLeft={handlePrevMonth}
                    onPressArrowRight={handleNextMonth}
                    horizontal={true}
                    pagingEnabled={true}
                    calendarWidth={Dimensions.get("window").width - 30}
                    firstDay={1}
                    theme={{
                      backgroundColor: "#FFFFFF",
                      calendarBackground: "#FFFFFF",
                      textSectionTitleColor: "#3FB3BB",
                      textSectionTitleDisabledColor: "#d9e1e8",
                      selectedDayBackgroundColor: "#3FB3BB",
                      selectedDayTextColor: "#ffffff",
                      todayTextColor: "#3FB3BB",
                      dayTextColor: "#000000",
                      textDisabledColor: "#d9e1e8",
                      dotColor: "#00adf5",
                      selectedDotColor: "#ffffff",
                      arrowColor: "#02BCD8",
                      disabledArrowColor: "#d9e1e8",
                      monthTextColor: "#02BCD8",
                      indicatorColor: "#02BCD8",
                      textDayFontFamily: "HelveticaNeue-Medium",
                      textMonthFontFamily: "HelveticaNeue-Medium",
                      textDayHeaderFontFamily: "HelveticaNeue-Medium",
                      textDayFontSize: 14,
                      textMonthFontSize: 16,
                      textDayHeaderFontSize: 12,
                    }}
                    minDate={moment().format("YYYY-MM-DD")}
                  />
                  <View style={styles.countDay}>
                    <TouchableOpacity
                      style={styles.reduceDay}
                      onPress={handleReduceDays}
                    >
                      <Text>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.titleDays}>{days} days</Text>
                    <TouchableOpacity
                      style={styles.increaseDay}
                      onPress={handleIncreaseDays}
                    >
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.footerCalendar}>
                    <TouchableOpacity
                      style={{ marginTop: 20 }}
                      onPress={handleCloseCalendarListModal}
                    >
                      <Text style={{ fontSize: 18, color: "grey" }}>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.nextButton}
                      onPress={handleNext}
                    >
                      <Text style={styles.nextText}>Next</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.tripDetail}>
            <View style={styles.tripValueContainer}>
              <Text style={styles.tripLabel}>Guests</Text>
              <Text style={styles.tripValue}>{tripDetails.guests}</Text>
            </View>
            <TouchableOpacity onPress={handleOpenGuestModal}>
              <Ionicons name="create-outline" size={25} color="gray" />
            </TouchableOpacity>
            {/* Modal */}
            <Modal
              visible={guestModalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={handleCloseGuestModal}
            >
              <View style={styles.guestModalContainer}>
                <View style={styles.guestView}>
                  <Text style={styles.titleManyGuest}>How many guests?</Text>

                  {/* Số lượng Adults */}
                  <View style={styles.countGuests}>
                    <Text style={styles.titleAdults}>Adults</Text>
                    <View style={styles.countChildren}>
                      <TouchableOpacity
                        style={styles.reduceGuests}
                        onPress={handleDecreaseAdults}
                      >
                        <Text>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.titleGuest}>{adults}</Text>
                      <TouchableOpacity
                        style={styles.reduceGuests}
                        onPress={handleIncreaseAdults}
                      >
                        <Text>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.countGuests}>
                    <Text style={styles.titleAdults}>Children</Text>
                    <View style={styles.countChildren}>
                      <TouchableOpacity
                        style={styles.reduceGuests}
                        onPress={handleDecreaseChildren}
                      >
                        <Text>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.titleGuest}>{children}</Text>
                      <TouchableOpacity
                        style={styles.reduceGuests}
                        onPress={handleIncreaseChildren}
                      >
                        <Text>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.footerGuest}>
                    <TouchableOpacity
                      style={{ marginTop: 20 }}
                      onPress={handleCloseGuestModal}
                    >
                      <Text style={{ fontSize: 18, color: "grey" }}>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.nextButton}
                      onPress={handleNextGuests}
                    >
                      <Text style={styles.nextText}>Next</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
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
                  Thanh toán {transactionData.total} khi nhận phòng.
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
                  Thanh toán bằng VNPay.
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
            <Text style={styles.detailLabel}>1 night</Text>
            <Text style={styles.detailValue}>{transactionData.price}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Kayak fee</Text>
            <Text style={styles.detailValue}>{transactionData.kayaFee}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Street parking fee</Text>
            <Text style={styles.detailValue}>
              {transactionData.streetParking}
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
          onPress={async () => {
            const bookingData = {
              hotel_name: "Tropical Paradise",
              price: 100.0, // Đảm bảo giá trị hợp lệ
              booking_date: new Date().toISOString().split("T")[0], // Định dạng ngày đúng
              number_of_guests: `${adults} Adults - ${children} Children`, // Đảm bảo không có giá trị undefined
              payment_type: "Thanh toán khi nhận phòng",
              total_price: parseFloat(
                transactionData.total.replace("$", "").replace(",", "")
              ), // Chuyển đổi sang số
            };
            try {
              const response = await axios.post(
                "http://10.10.88.44:3000/book",
                bookingData
              );
              alert(response.data.message);
            } catch (error) {}
            navigation.navigate("PaymentScreen");
          }}
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
    alignItems: "center",
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
    width: "95%",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  calendarContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "95%",
  },
  titleDate: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "99%",
  },
  chooseDate: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 40,
  },
  buttonChooseLeft: {
    width: "50%",
    height: 40,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00BDD5",
  },
  chooseText: {
    fontSize: 16,
    color: "white",
  },
  chooseText1: {
    fontSize: 16,
    color: "grey",
  },
  buttonChooseRight: {
    width: "50%",
    height: 40,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
  },
  reduceDay: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 10,
    height: 45,
    width: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  increaseDay: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 10,
    height: 45,
    width: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  countDay: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    width: "90%",
    justifyContent: "center",
  },
  footerCalendar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    width: "99%",
  },
  titleDays: {
    fontSize: 18,
    marginHorizontal: 20,
    height: 50,
    width: 130,
    borderRadius: 25,
    borderWidth: 1,
    textAlign: "center",
    lineHeight: 45,
  },
  nextButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#02BCD8",
    borderRadius: 8,
    height: 50,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonHandle: {
    flexDirection: "row",
  },
  guestModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  guestView: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "90%",
  },
  titleManyGuest: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  countGuests: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titleAdults: {
    fontSize: 18,
    color: "#333",
  },
  countChildren: {
    flexDirection: "row",
    alignItems: "center",
  },
  reduceGuests: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 10,
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  titleGuest: {
    fontSize: 18,
    fontWeight: "bold",
    width: 30,
    textAlign: "center",
  },
  footerGuest: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
});

export default MyScreen;
