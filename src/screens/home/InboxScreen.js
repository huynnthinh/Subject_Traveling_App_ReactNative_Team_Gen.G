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

const InboxScreen = () => {
  const [buttonFooterState, setButtonFooterState] = useState("Inbox");
  const navigation = useNavigation();
  const bookingFAQs = [
    {
      id: 1,
      clientQuestion: "Làm thế nào để tôi đặt phòng?",
      botAnswer:
        "Bạn có thể đặt phòng trực tuyến thông qua trang web của chúng tôi bằng cách chọn ngày và loại phòng.",
      category: "Đặt phòng",
    },
    {
      id: 2,
      clientQuestion: "Tôi có thể hủy đặt phòng không?",
      botAnswer:
        "Có, bạn có thể hủy đặt phòng của mình miễn phí trong vòng 24 giờ trước khi đến.",
      category: "Đặt phòng",
    },
    {
      id: 3,
      clientQuestion: "Có cần phải trả tiền trước khi nhận phòng không?",
      botAnswer:
        "Một số phòng yêu cầu thanh toán trước, nhưng cũng có tùy chọn thanh toán khi nhận phòng.",
      category: "Thanh toán",
    },
    {
      id: 4,
      clientQuestion: "Tôi có thể thay đổi ngày đặt phòng không?",
      botAnswer:
        "Có, bạn có thể thay đổi ngày đặt phòng của mình bằng cách liên hệ với bộ phận hỗ trợ khách hàng.",
      category: "Đặt phòng",
    },
    {
      id: 5,
      clientQuestion: "Có chương trình giảm giá nào không?",
      botAnswer: "Có cái cc. Khách chứ không phải thượng đế. Biến mày",
      category: "Khuyến mãi",
    },
    {
      id: 6,
      clientQuestion: "Có thể đặt phòng cho nhóm lớn không?",
      botAnswer:
        "Có, chúng tôi có các gói đặt phòng cho nhóm lớn. Vui lòng liên hệ với chúng tôi để biết thêm thông tin.",
      category: "Đặt phòng",
    },
    {
      id: 7,
      clientQuestion: "Có dịch vụ đưa đón sân bay không?",
      botAnswer:
        "Có, chúng tôi cung cấp dịch vụ đưa đón sân bay với một khoản phí bổ sung.",
      category: "Dịch vụ",
    },
    {
      id: 8,
      clientQuestion: "Có thể yêu cầu thêm giường không?",
      botAnswer:
        "Có, bạn có thể yêu cầu thêm giường khi đặt phòng, tùy thuộc vào tình trạng phòng.",
      category: "Dịch vụ",
    },
    {
      id: 9,
      clientQuestion: "Thời gian nhận phòng và trả phòng là khi nào?",
      botAnswer: "Thời gian nhận phòng là 14:00 và trả phòng là 12:00.",
      category: "Thông tin chung",
    },
    {
      id: 10,
      clientQuestion: "Có dịch vụ ăn uống tại khách sạn không?",
      botAnswer:
        "Có, chúng tôi có nhà hàng phục vụ bữa sáng, trưa và tối ngay tại khách sạn.",
      category: "Dịch vụ",
    },
  ];
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredFAQs, setFilteredFAQs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState(""); // Hiển thị tin nhắn bot với hiệu ứng

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
      console.log(filteredData);
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
    setMessages([
      ...messages,
      { id: Date.now(), message: question, sender: "client" },
    ]);
    const botResponse = bookingFAQs.find(
      (faq) => faq.clientQuestion === question
    );

    if (botResponse) {
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
      }, 10);
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
            <Text style={[styles.messageText]}>Chào mày!</Text>
          </View>
          <View
            style={[
              styles.messageContainer,
              styles.serverMessage,
              { backgroundColor: "#e0f7fa" },
            ]}
          >
            <Text style={[styles.messageText]}>Mày muốn gì ở tao?</Text>
          </View>
          <View
            style={[
              styles.messageContainer,
              styles.serverMessage,
              { backgroundColor: "#e0f7fa" },
            ]}
          >
            <Text style={[styles.messageText]}>
              Phone cho tao: 0336784220 hoặc Zalo Ok!
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
              placeholder="Sủa đi?"
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
