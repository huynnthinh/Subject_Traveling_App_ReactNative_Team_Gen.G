import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Fuse from "fuse.js";
import bookingFAQs from "../data/bookingFAQs";
import { useSelector } from "react-redux";

const InboxScreen = () => {
  const [buttonFooterState, setButtonFooterState] = useState("Inbox");
  const navigation = useNavigation();
  const { account } = useSelector((state) => state.data);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

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
    distance: 100,
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
      filteredData.forEach((item) => {
        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-${Math.random()}`,
            message: item.clientQuestion,
            sender: "server",
          },
        ]);
      });
    }
  }, [selectedCategory]);

  const renderList = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item.name)}
      style={styles.listItem}
    >
      <Text style={styles.listItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleBotResponse = (question) => {
    if (!question) return;

    setMessages([
      ...messages,
      { id: Date.now(), message: question, sender: "client" },
    ]);
    const questionNormalized = toLowerCaseNoAccentsAndSpecialChars(question);

    if (
      questionNormalized === "hi" ||
      questionNormalized === "hello" ||
      questionNormalized === "xin chao" ||
      questionNormalized === "2"
    ) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          message:
            "Xin chào " +
            account.name +
            ", Bạn có thế chat hoặc chọn một trong các câu hỏi dưới đây để được hỗ trợ nhanh nhất",
          sender: "server",
          icon: "robot",
        },
      ]);
      return;
    }

    const result = fuse.search(questionNormalized);
    const botResponse = result[0] ? result[0].item : "";

    if (botResponse && question.trim().length > 3) {
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

  const renderMessage = ({ item }) => {
    const isClient = item.sender === "client";

    if (item.sender === "server" && item.message.includes("?")) {
      return (
        <TouchableOpacity
          style={[
            styles.messageContainer,
            styles.serverMessage,
            { backgroundColor: "lightgreen" },
          ]}
          onPress={() => handleBotResponse(item.message)}
        >
          <Text style={styles.messageText}>{item.message}</Text>
        </TouchableOpacity>
      );
    }

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

      <View style={styles.body}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
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
});

export default InboxScreen;
