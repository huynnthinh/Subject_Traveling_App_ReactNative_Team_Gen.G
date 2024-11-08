import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CalendarList } from "react-native-calendars";
import moment from "moment";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // Khởi tạo là null
  const calendarRef = useRef(null);
  const [days, setDays] = useState(1);
  const [dateRange, setDateRange] = useState("Add time"); // Giá trị mặc định
  const [idSelected, setIdSelected] = useState("1");
  const destinations = [
    {
      id: "1",
      name: "Anywhere",
      image:
        "https://eurotravel.com.vn/wp-content/uploads/2023/03/nui-matterhorn-bieu-tuong-gan-lien-voi-dat-nuoc-thuy-si.jpg",
    },
    {
      id: "2",
      name: "Europe",
      image:
        "https://static1.cafeland.vn/cafelandnew/hinh-anh/2022/10/08/153/thap-4.jpg",
    },
    {
      id: "3",
      name: "Asia",
      image:
        "https://www.vietnambooking.com/wp-content/uploads/2020/01/tour-du-lich-chau-a-6-1.jpg",
    },
  ];

  const handleGoBack = () => {
    navigation.navigate("HomeScreen");
  };

  useEffect(() => {
    calendarRef.current = React.createRef();
  }, []);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
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

  const handleReduceDays = () => {
    if (days > 1) {
      setDays((prevDays) => prevDays - 1);
    }
  };

  const handleIncreaseDays = () => {
    setDays((prevDays) => prevDays + 1);
  };

  const handleNext = () => {
    if (selectedDate) {
      const startDate = moment(selectedDate);
      const endDate = startDate.clone().add(days - 1, "days");
      const range = `${startDate.format("D MMM")} - ${endDate.format("D MMM")}`;

      setDateRange(range); // Cập nhật khoảng thời gian
    }
    setModalVisible(false); // Đóng modal sau khi nhấn nút Next
  };

  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <Ionicons name="close" size={28} color="gray" onPress={handleGoBack} />
      </View>
      <View style={[styles.header, styles.headerShadow]}>
        <Text style={styles.title}>Where to?</Text>
        <View style={styles.searchBox}>
          <Ionicons
            name="search"
            size={20}
            color="black"
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, { paddingLeft: 40 }]}
            placeholder="Search"
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.options}>
          <FlatList
            data={destinations}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.optionsContainer}
            renderItem={({ item }) => (
              <View style={styles.option}>
                <TouchableOpacity
                  onPress={() => {
                    setIdSelected(item.id);
                  }}
                  style={{
                    borderWidth: 3,
                    borderColor:
                      idSelected === item.id ? "#3FB3BB" : "transparent",
                    borderRadius: 14,
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.optionImage}
                  />
                </TouchableOpacity>
                <Text style={styles.optionText}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      </View>
      <View style={[styles.timeAndGuests, styles.timeAndGuestsShadow]}>
        <Text style={styles.timeOptionText}>When</Text>
        <TouchableOpacity
          style={[styles.guestsOption, styles.timeAndGuestsShadow]}
          onPress={handleOpenDatePicker}
        >
          <Text style={styles.guestsOptionText}>{dateRange}</Text>
        </TouchableOpacity>
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
                      <Ionicons name="chevron-back" size={24} color="grey" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNextMonth}>
                      <Ionicons name="chevron-forward" size={24} color="grey" />
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
                <Text style={{ fontSize: 18, color: "grey" }}>Skip</Text>
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={handleNext} // Cập nhật hàm xử lý nút Next
                >
                  <Text style={styles.nextText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={[styles.timeAndGuests, styles.timeAndGuestsShadow]}>
        <Text style={styles.timeOptionText}>When</Text>
        <TouchableOpacity
          style={[styles.guestsOption, styles.timeAndGuestsShadow]}
        >
          <Text style={styles.guestsOptionText}>Add guests</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.textClear}>Clear all</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons
            name="search"
            size={20}
            color="white"
            style={styles.searchIconfooter}
          />
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    paddingBottom: 80,
  },
  back: {
    alignItems: "flex-end",
    height: 40,
    marginTop: 30,
  },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginVertical: 20,
    backgroundColor: "#FEFEFE",
    height: 310,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 27,
  },
  headerShadow: {
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  searchBox: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    height: 50,
    width: 350,
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: 15,
  },
  searchInput: {
    fontSize: 19,
    color: "#333",
    flex: 1,
  },
  options: {
    marginVertical: 20,
    marginLeft: 3,
    paddingHorizontal: 10,
    paddingRight: 20,
  },
  optionsContainer: {
    paddingVertical: 10,
  },
  option: {
    alignItems: "center",
    marginHorizontal: 12,
  },
  optionImage: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  optionText: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
  },
  timeAndGuests: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FEFEFE",
    borderWidth: 1,
    borderColor: "#f2f2f2",
    borderRadius: 12,
    alignItems: "center",
    height: 60,
    marginBottom: 27,
  },
  timeAndGuestsShadow: {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  timeOptionText: {
    fontSize: 16,
    color: "gray",
    marginLeft: 15,
  },
  guestsOption: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: "transparent",
  },
  guestsOptionText: {
    fontSize: 16,
    color: "#333",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  searchButton: {
    backgroundColor: "#02BCD8",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "flex-end",
    width: 150,
    marginRight: 18,
  },
  textClear: {
    color: "gray",
    fontSize: 20,
    marginLeft: 18,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 30,
  },
  searchIconfooter: {
    position: "absolute",
    left: 30,
    top: 17,
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
  nextButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#02BCD8",
    borderRadius: 8,
    height: 60,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
  },
  titleDate: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonHandle: {
    flexDirection: "row",
  },
  calendarHeaderText: {
    fontSize: 23,
    fontWeight: "bold",
  },
  footerCalendar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  buttonChooseRight: {
    width: "50%",
    height: 40,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
  },
  chooseText: {
    fontSize: 16,
    color: "white",
  },
  chooseText1: {
    fontSize: 16,
    color: "grey",
  },
  countDay: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    width: "100%",
    justifyContent: "center",
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
});

export default LoginScreen;
