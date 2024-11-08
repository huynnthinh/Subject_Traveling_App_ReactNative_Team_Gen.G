import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Rating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
const ReviewScreen = () => {
  const navigation = useNavigation();
  const reviews = [
    {
      id: "1",
      name: "John King",
      date: "A day ago",
      avatar:
        "https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2021/05/08/kimoanh-851-1620472406599.jpeg",
      rating: 4.5,
      review:
        "We loved staying in this charming home! It had all the amenities we needed, and the historic...",
    },
    {
      id: "2",
      name: "Jennifer Harris",
      date: "A day ago",
      avatar:
        "https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-5.jpg",
      rating: 3,
      review:
        "While the location of this home was convenient, we were disappointed with the cleanliness and overall...",
    },
    {
      id: "3",
      name: "John Edwards",
      date: "A day ago",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlgwWYagUS9zzeWbum6q4bnaBay3NlKokpmg&s",
      rating: 5,
      review:
        "This home was perfect for our family vacation! The kids loved the pool and the game room...",
    },
    {
      id: "4",
      name: "Elizabeth Lopez",
      date: "A day ago",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs59ZpZtsHhXu5bcM_Pv3My5lFgFgac_fJHA&s",
      rating: 5,
      review:
        "The photos don't do this home justice - it's absolutely stunning in person...",
    },
  ];

  const ReviewItem = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={15}
            readonly
            startingValue={item.rating}
            style={styles.rating}
            ratingBackgroundColor="#D2D2D2" // Màu nền xám
          />
        </View>
        <Text style={styles.reviewDate}>{item.date}</Text>
        <Text style={styles.reviewContent}>{item.review}</Text>
      </View>
    </View>
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Reviews</Text>
      </View>
      <Text style={styles.reviewCount}>262 reviews</Text>
      <View style={styles.rating}>
        <View style={styles.ratingContainerLeft}>
          <Text style={styles.averageRating}>4.5/5</Text>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={21}
            startingValue={4.5}
            readonly
            style={{ backgroundColor: "#EFEFEF" }}
          />
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.ratingBar}>
            <View style={[styles.ratingFill, { width: "90%" }]} />
            <Text style={styles.starCount}>5</Text>
          </View>
          <View style={styles.ratingBar}>
            <View style={[styles.ratingFill, { width: "70%" }]} />
            <Text style={styles.starCount}>4</Text>
          </View>
          <View style={styles.ratingBar}>
            <View style={[styles.ratingFill, { width: "30%" }]} />
            <Text style={styles.starCount}>3</Text>
          </View>
          <View style={styles.ratingBar}>
            <View style={[styles.ratingFill, { width: "10%" }]} />
            <Text style={styles.starCount}>2</Text>
          </View>
          <View style={styles.ratingBar}>
            <View style={[styles.ratingFill, { width: "5%" }]} />
            <Text style={styles.starCount}>1</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    marginBottom: 30,
  },
  reviewCount: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
  },
  rating: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 50,
    backgroundColor: "#EFEFEF",
  },
  ratingContainerLeft: {
    alignItems: "flex-start",
    marginLeft: 15,
    backgroundColor: "#EFEFEF",
  },
  averageRating: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
  },
  ratingContainer: {
    width: "40%",
    marginRight: 10,
    marginTop: 15,
    marginBottom: 10,
  },
  ratingBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 13,
    backgroundColor: "#D2D2D2",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 5,
  },
  ratingFill: {
    height: "100%",
    backgroundColor: "#FFD700",
  },
  starCount: {
    marginLeft: 10,
    fontSize: 10,
    color: "#333",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  reviewContainer: {
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderColor: "#D2D2D2",
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rating1: {
    alignItems: "flex-start",
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  reviewDate: {
    fontSize: 15,
    color: "#777",
    marginTop: -30,
  },
  reviewContent: {
    fontSize: 17,
    color: "black",
    marginLeft: 0,
    textAlign: "left",
    marginLeft: -60,
    marginBottom: 15,
    marginTop: 20,
  },
  listContainer: {
    padding: 10,
  },
});

export default ReviewScreen;
