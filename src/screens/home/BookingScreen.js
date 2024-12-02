import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import axios from "axios";
import Footer from "./includes/Footer";

const BookingScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const buttonFooterState = "Bookings";
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = async () => {
    try {
      console.log("Fetching bookings...");
      const response = await axios.get("http://10.10.88.44:3000/bookings");
      console.log("Response data:", response.data);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedBooking(null);
  };

  // Hàm để tính toán số ngày chênh lệch giữa ngày đặt và ngày hiện tại
  const calculateDateDifference = (bookingDate) => {
    const currentDate = new Date();
    const bookingDateObj = new Date(bookingDate);
    const timeDifference = bookingDateObj - currentDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24); // Chuyển đổi từ milliseconds sang ngày
    return daysDifference;
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking</Text>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const daysDifference = calculateDateDifference(item.booking_date);
          const canCancel = daysDifference >= 4; // Điều kiện hủy phòng (>= 4 ngày)

          return (
            <View>
              <TouchableOpacity
                style={styles.bookingItem}
                onPress={() => openModal(item)}
              >
                <View style={styles.titlehotel}>
                  <Text style={{ fontSize: 20 }}>Tên khách sạn:</Text>
                  <Text style={styles.hotelName}>{item.hotel_name}</Text>
                </View>

                <View style={styles.titlehotel}>
                  <Text style={{ fontSize: 20 }}>Ngày đặt:</Text>
                  <Text style={styles.bookingDate}>{item.booking_date}</Text>
                </View>

                <View style={styles.titlehotel}>
                  <Text style={{ fontSize: 20 }}>Giá:</Text>
                  <Text style={styles.price}>${item.total_price}</Text>
                </View>
              </TouchableOpacity>

              {/* Hiển thị nút Hủy phòng nếu đủ điều kiện */}
              {canCancel && (
                <TouchableOpacity style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Hủy phòng</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedBooking && (
              <>
                <Text style={styles.modalTitle}>Chi tiết đặt phòng</Text>
                <View style={styles.chiTiet}>
                  <View>
                    <Text style={styles.italicText}>Mã đặt phòng:</Text>
                    <Text style={styles.italicText}>Tên khách sạn:</Text>
                    <Text style={styles.italicText}>Ngày đặt:</Text>
                    <Text style={styles.italicText}>Giá:</Text>
                    <Text style={styles.italicText}>Số khách:</Text>
                    <Text style={styles.italicText}>Thanh toán:</Text>
                    <Text style={styles.italicText}>Tổng giá:</Text>
                  </View>

                  <View>
                    <Text style={styles.textRight}> {selectedBooking.id}</Text>
                    <Text style={styles.textRight}>
                      {selectedBooking.hotel_name}
                    </Text>
                    <Text style={styles.textRight}>
                      {selectedBooking.booking_date}
                    </Text>
                    <Text style={styles.textRight}>
                      ${selectedBooking.total_price}
                    </Text>
                    <Text style={styles.textRight}>
                      {selectedBooking.number_of_guests}
                    </Text>
                    <Text style={styles.textRight}>
                      {selectedBooking.payment_type}
                    </Text>
                    <Text style={styles.textRight}>
                      ${selectedBooking.total_price}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeModal}
                >
                  <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
      <Footer buttonFooterState={buttonFooterState} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
  },
  bookingItem: {
    backgroundColor: "#A9E7E7",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bookingDate: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  titlehotel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 15,
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#FF6B6B",
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "95%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#3DD9C9",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  chiTiet: {
    flexDirection: "row",
    width: "100%",
  },
  textRight: {
    textAlign: "right",
    marginBottom: 15,
    fontSize: 20,
    marginLeft: 40,
    fontWeight: "bold",
  },
  italicText: {
    fontStyle: "italic",
    fontSize: 20,
    marginBottom: 15,
  },
});

export default BookingScreen;
