import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { updateItemSelection } from "../data/dataSlice";
import { useEffect, useState } from "react";
const RoomScreen = () => {
  const route = useRoute();
  const { item } = route.params;
  const data = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      date: "2024-10-01",
      description:
        "The experience was wonderful! The room was cozy, and the staff was very friendly and accommodating. Would definitely come back again!",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 3,
      date: "2024-10-05",
      description:
        "Nice location and friendly staff, but the room could have been cleaner. Overall, a pleasant stay.",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Robert Brown",
      rating: 4,
      date: "2024-10-10",
      description:
        "Absolutely fantastic! From check-in to check-out, everything was perfect. Highly recommend to anyone visiting!",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "Emily White",
      rating: 4,
      date: "2024-10-12",
      description:
        "The place was nice, with great amenities. The view was stunning, and I enjoyed every moment of my stay.",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 5,
      name: "Michael Johnson",
      rating: 3,
      date: "2024-10-15",
      description:
        "Good value for money, but some facilities could use a bit of improvement. Still a decent experience overall.",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 6,
      name: "Sophia Williams",
      rating: 5,
      date: "2024-10-18",
      description:
        "Great ambiance and excellent service. The room was clean and comfortable, making my stay very enjoyable.",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 7,
      name: "David Martinez",
      rating: 4,
      date: "2024-10-20",
      description:
        "Conveniently located and well-maintained. Staff was attentive, though the room was slightly small.",
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      id: 8,
      name: "Olivia Taylor",
      rating: 5,
      date: "2024-10-22",
      description:
        "Amazing experience! The amenities were top-notch, and I loved the decor of the room. Will recommend to friends.",
      avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      id: 9,
      name: "Liam Lee",
      rating: 3,
      date: "2024-10-25",
      description:
        "The stay was pleasant, and the food was delicious. Some noise from the street, but nothing too bothersome.",
      avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    {
      id: 10,
      name: "Isabella Thomas",
      rating: 4,
      date: "2024-10-28",
      description:
        "Friendly staff and cozy atmosphere. The check-in process was smooth, and the room had a nice view.",
      avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    },
  ];

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.data);
  const [isSelected, setIsSelected] = useState(false);
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: item.image }}
            style={{ height: 250, flex: 1 }}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              backgroundColor: "#FFFFFF80",

              height: 40,
              width: 40,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="left" size={25} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              position: "absolute",
              right: 20,
              top: 20,
              backgroundColor: "#FFFFFF80",

              height: 40,
              width: 40,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              dispatch(updateItemSelection(item.id));
              setIsSelected(!isSelected);
            }}
          >
            <AntDesign
              name={isSelected ? item.icon1 : item.icon}
              size={20}
              color={isSelected ? "red" : "#808080"}
            />
          </TouchableOpacity>

          <AntDesign
            name="sharealt"
            size={20}
            color="white"
            style={{ position: "absolute", right: 20, top: 200 }}
          />
        </View>
        <View style={styles.second}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Entypo name="location-pin" size={20} color="#3FB3BB" />
              <Text style={{ color: "grey" }}>{item.location}</Text>
            </View>
            <TouchableOpacity>
              <Text style={{ color: "#3FB3BB" }}>View map</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 0,
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              style={{
                height: 50,
                backgroundColor: "#f0f0f0",
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                borderRadius: 10,
              }}
              onPress={() => {
                navigation.navigate("ReviewScreen");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <AntDesign name="star" size={17} color="#ebd067" />
                <Text style={{ color: "#808080", paddingLeft: 5 }}>
                  {item.evaluated}/5
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#808080", marginRight: 10 }}>
                  262 reviews
                </Text>
                <AntDesign name="right" size={20} color="grey" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            borderBottomColor: "#f0f0f0",
            borderBottomWidth: 1,
            width: "100%",
          }}
        ></View>
        <View style={styles.facilities}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Facilities & services
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "70%",
              justifyContent: "space-around",
            }}
          >
            <Text style={{ color: "#808080" }}>2 Guests</Text>
            <Text style={{ color: "#808080" }}>1 bedroom</Text>
            <Text style={{ color: "#808080" }}>1 bed</Text>
            <Text style={{ color: "#808080" }}>1 bath</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="wifi" size={20} color="#808080" />
            <Text style={{ marginLeft: 10, color: "#808080", fontSize: 20 }}>
              Wifi
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="restaurant" size={20} color="#808080" />
            <Text style={{ marginLeft: 10, color: "#808080", fontSize: 20 }}>
              Kitchen
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="water" size={20} color="#808080" />
            <Text style={{ marginLeft: 10, color: "#808080", fontSize: 20 }}>
              Pool
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="leaf" size={20} color="#808080" />
            <Text style={{ marginLeft: 10, color: "#808080", fontSize: 20 }}>
              Garden
            </Text>
          </View>
          <TouchableOpacity
            style={{
              height: 50,
              borderWidth: 1,
              borderColor: "#808080",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("FacilityScreen");
            }}
          >
            <Text style={{ color: "#808080", fontSize: 20 }}>Show all</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomColor: "#f0f0f0",
            borderBottomWidth: 1,
            width: "100%",
          }}
        ></View>
        <View style={styles.reviews}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Reviews</Text>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => {
                navigation.navigate("ReviewScreen");
              }}
            >
              <Text style={{ color: "#808080" }}>See all </Text>
              <AntDesign name="right" size={15} color="#808080" />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 40, fontWeight: "bold" }}>
              {item.evaluated}
            </Text>
            <Text style={{ fontSize: 20, color: "#808080", top: 5 }}>/5</Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  alignItems: "center",
                  marginTop: 20,
                  borderWidth: 1,
                  borderColor: "#f0f0f0",
                  width: 300,
                  padding: 15,
                  borderRadius: 10,
                  marginRight: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={{ uri: item.avatar }}
                      style={{ height: 50, width: 50, borderRadius: 25 }}
                    />
                    <View
                      style={{
                        justifyContent: "space-between",
                        marginLeft: 10,
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                      <Text style={{ color: "#808080" }}>{item.date}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    {[...Array(5)].map((e, i) => (
                      <AntDesign
                        key={i}
                        name="star"
                        size={20}
                        color={i < item.rating ? "#ebd067" : "#808080"}
                      />
                    ))}
                  </View>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ color: "#808080" }}>{item.description}</Text>
                </View>
              </View>
            )}
            horizontal
          />
        </View>
        <View
          style={{
            marginVertical: 20,
            borderBottomColor: "#f0f0f0",
            borderBottomWidth: 1,
            width: "100%",
          }}
        ></View>
        <View style={styles.policies}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Polices</Text>
          <View
            style={{
              backgroundColor: "#f0f0f0",
              height: 100,
              paddingHorizontal: 20,
              justifyContent: "space-around",
            }}
          >
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: "#808080" }}
            >
              House rules
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntDesign
                name="clockcircleo"
                size={20}
                color="#808080"
                style={{ marginRight: 10 }}
              />
              <Text>Earliest check-in time: 14:00</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntDesign
                name="clockcircleo"
                size={20}
                color="#808080"
                style={{ marginRight: 10 }}
              />
              <Text>Lastest check-out time: 12:00</Text>
            </View>
          </View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Checkin policies
          </Text>
          <Text style={{ color: "#808080" }}>
            It's always a good ideal to confirm the check-in policy directly
            with the owner/manager before your arrival so that you can...
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#808080",
            }}
          >
            <Text style={{ color: "#808080", fontSize: 20, marginRight: 10 }}>
              View more
            </Text>
            <AntDesign name="right" size={20} color="#808080" />
          </TouchableOpacity>
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "grey" }}>From: </Text>
          <Text style={{ fontWeight: "bold" }}>${item.price}</Text>
          <Text style={{ color: "grey" }}>/night</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#3FB3BB",
            height: 50,
            paddingHorizontal: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate("ConfirmScreen", { price: item.price });
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Book now</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  header: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    marginTop: 40,
  },
  second: {
    flex: 3,
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    justifyContent: "space-around",
    height: 150,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#f0f0f0",
    paddingVertical: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
  },
  facilities: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 280,
    justifyContent: "space-around",
  },
  reviews: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  policies: {
    paddingHorizontal: 20,
    height: 320,
    justifyContent: "space-around",
  },
});

export default RoomScreen;
