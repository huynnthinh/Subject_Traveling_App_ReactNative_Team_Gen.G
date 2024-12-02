import React, { useState } from "react";
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
import { deleteAccount } from "../data/dataSlice";

const UserListScreen = ({ navigation }) => {
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { accounts } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const confirmDeleteAccount = async () => {
    setConfirmationModalVisible(false);
    if (selectedUserId) {
      dispatch(deleteAccount(selectedUserId));
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <View style={styles.userRow}>
        <Image
          style={styles.profileImage}
          source={{
            uri: `https://robohash.org/${item.id}?set=set1`,
          }}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{item.name}</Text>
          <Text style={styles.text_item}>{item.id}</Text>
          <Text style={styles.text_item}>{item.email}</Text>
          <Text style={styles.text_item}>{item.phone}</Text>
          <Text style={styles.text_item}>{item.diachi}</Text>
        </View>
      </View>
      {item.ROLE !== "ADMIN" && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              setSelectedUserId(item.id);
              setConfirmationModalVisible(true);
            }}
          >
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User List</Text>
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
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
            Are you sure you want to delete this account? This action cannot be
            undone.
          </Text>
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: "#ff4d4f" }]}
            onPress={confirmDeleteAccount}
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
          style={styles.logoutButton}
          onPress={() => navigation.navigate("ItemsListScreen")}
        >
          <Text style={styles.logoutText}>Go to Items List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            navigation.navigate("LoginScreen");
          }}
        >
          <Text style={styles.logoutText}>Log Out</Text>
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
  username: {
    fontWeight: "bold",
    fontSize: 18,
  },
  text_item: {
    fontSize: 14,
    color: "#555",
  },
  logoutButton: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
    elevation: 2,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  userItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    padding: 5,
    borderRadius: 5,
    flex: 1,
    textAlign: "center",
  },
  actionText: {
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
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  textStyle: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
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
});

export default UserListScreen;
