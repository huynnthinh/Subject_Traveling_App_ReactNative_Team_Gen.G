import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Fuse from "fuse.js";
import bookingFAQs from "../data/bookingFAQs";
const InboxScreen = () => {
  const [buttonFooterState, setButtonFooterState] = useState("Inbox");
  const navigation = useNavigation();

  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredFAQs, setFilteredFAQs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState(""); // Hiển thị tin nhắn bot với hiệu ứng

  //config fuse.js
  function removeAccentsAndSpecialChars(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/[^\w\s]/gi, "");
  }

  function toLowerCaseNoAccentsAndSpecialChars(str) {
    return removeAccentsAndSpecialChars(str).toLowerCase();
  }
  const options = {
    includeScore: true,
    keys: ["normalizedQuestion"],
    distance: 100, // Tăng yêu cầu về độ dài khớp
    threshold: 0.4,
    getFn: (obj, path) => toLowerCaseNoAccentsAndSpecialChars(obj[path]),
  };

  const normalizedData = bookingFAQs.map((item) => ({
    ...item,
    normalizedQuestion: toLowerCaseNoAccentsAndSpecialChars(
      item.clientQuestion
    ),
  }));
  const fuse = new Fuse(normalizedData, options);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(bookingFAQs.map((item) => item.category)),
    ];
    const categoriesWithId = uniqueCategories.map((item, index) => ({
      id: index,
      name: item,
    }));
    setCategory(categoriesWithId);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filteredData = bookingFAQs.filter(
        (item) => item.category === selectedCategory
      );
      // console.log(filteredData);
      filteredData.forEach((item) => {
        const count = messages.length;
        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-${Math.random()}`, // Ensure uniqueness
            message: item.clientQuestion,
            sender: "server",
          },
        ]);
      });
    }
  }, [selectedCategory]);

  const renderList = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedCategory(item.name)}
        style={styles.listItem}
      >
        <Text style={styles.listItemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const handleBotResponse = (question) => {
    if (!question) return;

    setMessages([
      ...messages,
      { id: Date.now(), message: question, sender: "client" },
    ]);
    const questionNormalized = toLowerCaseNoAccentsAndSpecialChars(question);
    // const botResponse = bookingFAQs.find(
    //   (faq) => faq.clientQuestion === question
    // );
    const result = fuse.search(questionNormalized);
    console.log(questionNormalized + "//");
    console.log(result);
    const botResponse = result[0] ? result[0].item : "";

    if (botResponse && question.trim().length > 3) {
      // Bot gõ câu trả lời nếu tìm thấy
      setIsBotTyping(true);
      let index = 0;
      setDisplayedText("");

      const interval = setInterval(() => {
        if (index < botResponse.botAnswer.length) {
          setDisplayedText((prev) => prev + botResponse.botAnswer[index]);
          index++;
        } else {
          clearInterval(interval);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              message: botResponse.botAnswer,
              sender: "server",
              icon: "robot",
            },
          ]);
          setDisplayedText("");
          setIsBotTyping(false);
        }
      }, 20);
    } else {
      // Câu trả lời mặc định khi không tìm thấy
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: "Xin lỗi, tôi không hiểu câu hỏi của bạn :(",
          sender: "server",
          icon: "robot",
        },
      ]);
    }
  };
  // const renderQuestion = ({ item }) => {
  //   return (
  //     <TouchableOpacity
  //       style={[
  //         styles.messageContainer,
  //         styles.serverMessage,
  //         { backgroundColor: "white" },
  //       ]}
  //       onPress={() => {
  //         handleBotResponse(item.clientQuestion);
  //       }}
  //     >
  //       <Text style={styles.messageText}>{item.clientQuestion}</Text>
  //     </TouchableOpacity>
  //   );
  // };
  const renderMessage = ({ item }) => {
    const isClient = item.sender === "client";

    // Nếu tin nhắn là câu hỏi, hiển thị dưới dạng nút TouchableOpacity
    if (item.sender === "server" && item.message.includes("?")) {
      return (
        <TouchableOpacity
          style={[
            styles.messageContainer,
            styles.serverMessage,
            { backgroundColor: "lightgreen" },
          ]}
          onPress={() => handleBotResponse(item.message)} // Gọi hàm khi nhấn vào câu hỏi
        >
          <Text style={styles.messageText}>{item.message}</Text>
        </TouchableOpacity>
      );
    }

    // Nếu không phải câu hỏi, hiển thị tin nhắn bình thường (câu trả lời của bot hoặc client)
    return (
      <View
        style={[
          styles.messageContainer,
          isClient ? styles.clientMessage : styles.serverMessage,
          { backgroundColor: isClient ? "#ffeb3b" : "#e0f7fa" },
        ]}
      >
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color="#41cbda" />
        </TouchableOpacity>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/0.jpg" }}
          style={styles.avatar}
        />
        <Text style={styles.headerText}>Thưa Đấng Thịnh và Thái</Text>
      </View>

      {/* Main Content */}
      <View style={styles.body}>
        <ScrollView nestedScrollEnabled={true}>
          <View
            style={[
              styles.messageContainer,
              styles.serverMessage,
              { backgroundColor: "#e0f7fa" },
            ]}
          >
            <Text style={[styles.messageText]}>Chào bạn!</Text>
          </View>
          <View
            style={[
              styles.messageContainer,
              styles.serverMessage,
              { backgroundColor: "#e0f7fa" },
            ]}
          >
            <Text style={[styles.messageText]}>
              Câu trả lời của mình chỉ mang tính tương đối!
            </Text>
          </View>
          <View
            style={[
              styles.messageContainer,
              styles.serverMessage,
              { backgroundColor: "#e0f7fa" },
            ]}
          >
            <Text style={[styles.messageText]}>
              Bạn có thể liên hệ HOTLINE: 0336784220 để được hỗ trợ nhanh nhất
              và chi tiết nha! Cảm ơn bạn đã sử dụng dịch vụ
            </Text>
          </View>

          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id.toString()}
            nestedScrollEnabled={true}
          />
          {/* <FlatList
            data={filteredFAQs}
            renderItem={renderQuestion}
            keyExtractor={(item) => item.id.toString()}
          /> */}
        </ScrollView>
        <View style={styles.inputContainer}>
          <FlatList
            data={category}
            renderItem={renderList}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            contentContainerStyle={{ backgroundColor: "white" }}
          />
          <View style={styles.textInputContainer}>
            <TextInput
              value={text}
              onChangeText={(value) => setText(value)}
              placeholder="Bạn muốn hỏi gì?"
              style={styles.textInput}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => {
                handleBotResponse(text);
                // setMessages([
                //   ...messages,
                //   {
                //     id: Date.now(),
                //     message: text,
                //     sender: "client",
                //     icon: "hearto",
                //   },
                // ]);
                setText("");
              }}
            >
              <AntDesign name="pluscircleo" size={30} color="#41cbda" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebfdff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ebfdff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginTop: 30,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  headerText: {
    fontSize: 20,
    marginLeft: 10,
    color: "#333",
  },
  body: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "white",
  },
  greetingContainer: {
    padding: 10,
  },
  bodyText: {
    fontSize: 16,
    color: "#555",
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ebfdff",
  },
  textInput: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 20,
    color: "#333",
    marginRight: 10,
    height: 70,
  },
  sendButton: {
    position: "absolute",
    zIndex: 1,
    right: 10,
  },
  listItem: {
    flexDirection: "row",
    backgroundColor: "#41cbda",
    padding: 10,
    margin: 5,
    borderRadius: 20,
    alignItems: "center",
  },
  listItemText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 16,
  },
  messageContainer: {
    flexDirection: "row",
    padding: 10,
    margin: 5,
    borderRadius: 20,
    alignItems: "center",
  },
  clientMessage: {
    backgroundColor: "#41cbda",
    alignSelf: "flex-end",
  },
  serverMessage: {
    borderWidth: 1,
    borderColor: "#41cbda",
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#333",
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
});

export default InboxScreen;
