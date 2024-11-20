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
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CalendarList } from "react-native-calendars";
import moment from "moment";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  ); // Default to today
  const calendarRef = useRef(null);
  const [days, setDays] = useState(1);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [dateRange, setDateRange] = useState("Add time");
  const [idSelected, setIdSelected] = useState("1");
  const [guestModalVisible, setGuestModalVisible] = useState(false);
  const [guests, setGuests] = useState("Add guests"); // Initial state for guests
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

  //nút next trong lịch
  const handleNext = () => {
    if (selectedDate) {
      const startDate = moment(selectedDate);
      const endDate = startDate.clone().add(days - 1, "days");
      const range = `${startDate.format("D MMM")} - ${endDate.format("D MMM")}`;
      setDateRange(range);
    }
    setModalVisible(false);
  };

  //mở modal thêm guests
  const handleOpenGuestModal = () => {
    setGuestModalVisible(true);
  };

  //tắt modal thêm guests
  const handleCloseGuestModal = () => {
    setGuestModalVisible(false);
  };

  //tắt modal lịch
  const handleCloseCalendarListModal = () => {
    setModalVisible(false);
  };

  // tăng giảm Adults
  const handleIncreaseAdults = () => setAdults((prev) => prev + 1);
  const handleDecreaseAdults = () => setAdults((prev) => Math.max(0, prev - 1));

  //tăng giảm Children
  const handleIncreaseChildren = () => setChildren((prev) => prev + 1);
  const handleDecreaseChildren = () =>
    setChildren((prev) => Math.max(0, prev - 1));

  // nút next trong thêm guest
  const handleNextGuests = () => {
    setGuests(`${adults} Adults - ${children} Children`);
    handleCloseGuestModal();
  };

  //nút clear all
  const handleClearAll = () => {
    setSelectedDate(moment().format("YYYY-MM-DD")); // Reset ngày về hôm nay
    setDays(1); // Reset số ngày về 1
    setAdults(0); // Reset số người lớn về 0
    setChildren(0); // Reset số trẻ em về 0
    setGuests("Add guests"); // Reset văn bản khách về 'Add guests'
    setDateRange("Add time"); // Reset văn bản khoảng thời gian về 'Add time'
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
                minDate={moment().format("YYYY-MM-DD")} // Chỉ cho phép chọn từ ngày hiện tại trở đi
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
        <Text style={styles.timeOptionText}>Add guests</Text>
        <TouchableOpacity
          style={styles.guestsOption}
          onPress={handleOpenGuestModal}
        >
          <Text style={styles.guestsOptionText}>{guests}</Text>
        </TouchableOpacity>

        <Modal
          visible={guestModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCloseGuestModal}
        >
          <View style={styles.guestModalContainer}>
            <View style={styles.guestView}>
              <Text style={styles.titleManyGuest}>How many guests?</Text>
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
                  onPress={handleCloseGuestModal} // Close modal on Skip
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
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={styles.textClear}>Clear all</Text>
        </TouchableOpacity>

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
    fontSize: 18,
    fontWeight: "bold",
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
  footerCalendar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
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
});

export default SearchScreen;
