import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, deleteItem } from "../data/dataSlice";
import Entypo from "react-native-vector-icons/Entypo";

const ItemsListScreen = ({ navigation }) => {
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);

  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const confirmDeleteItem = async () => {
    setConfirmationModalVisible(false);
    if (selectedItemId) {
      dispatch(deleteItem(selectedItemId))
        .unwrap()
        .then(() => {
          setErrorMessage("Item deleted successfully.");
          setErrorModalVisible(true);
        })
        .catch((error) => {
          setErrorMessage(`Failed to delete item: ${error.message}`);
          setErrorModalVisible(true);
        });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("RoomScreen", { item });
        }}
      >
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={styles.itemRating}>
            <Entypo name="star" size={15} color="#ebd067" />
            <Text>{item.evaluated}</Text>
          </View>
          <Text style={styles.itemType}>{item.type}</Text>
          <View style={styles.itemPriceContainer}>
            <Text style={styles.itemPrice}>${item.price}</Text>
            <Text style={styles.itemPricePerNight}>/night</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          setSelectedItemId(item.id);
          setConfirmationModalVisible(true);
        }}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List Rooms</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={() => {
          setErrorModalVisible(!errorModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setErrorModalVisible(!errorModalVisible)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmationModalVisible}
        onRequestClose={() => {
          setConfirmationModalVisible(!confirmationModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.errorText}>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </Text>
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: "#ff4d4f" }]}
            onPress={confirmDeleteItem}
          >
            <Text style={styles.textStyle}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.closeButton, { marginTop: 10 }]}
            onPress={() => setConfirmationModalVisible(false)}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.footerButtons}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate("UserListScreen")}
        >
          <Text style={styles.footerButtonText}>Go to User List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.footerButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  itemImage: {
    width: "100%",
    height: 200,
  },
  itemInfo: {
    padding: 10,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  itemRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  itemType: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  itemPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemPrice: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemPricePerNight: {
    color: "grey",
    marginLeft: 5,
  },
  deleteButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  errorText: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  textStyle: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  footerButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  footerButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ItemsListScreen;
