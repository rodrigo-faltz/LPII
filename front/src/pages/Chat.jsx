import React from "react";
import ChatMain from "../components/ChatMain";

import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    const extractChatIdFromUrl = () => {
      const urlPath = window.location.pathname;
      const match = urlPath.match(/\/chat\/(\d+)/);
      return match ? parseInt(match[1]) : null;
    };

    console.log("URL atual:", window.location.pathname);

    this.state = {
      messages: [],
      inputMessage: "",
      activeNav: "chat",
      chatId: extractChatIdFromUrl(),
      userId: parseInt(localStorage.getItem("userId"))
    };
  }

  componentDidMount() {
    if (this.state.messages.length === 0) {
      const initialMessage = {
        id: 1,
        content: "Olá! Como posso ajudar você hoje?",
        sender: "assistant",
        timestamp: new Date().toLocaleString("pt-BR"),
      };
      this.setState({ messages: [initialMessage] });
    }
  }

  componentDidUpdate(prevProps) {
   

    const oldChatId = prevProps.match?.params?.id;
    const newChatId = this.props.match?.params?.id;

   

    if (oldChatId !== newChatId) {
      const parsedNewChatId = parseInt(newChatId) || null;


      this.setState({ 
        messages: [],
        chatId: parsedNewChatId
      }, () => {
        console.log(`State atualizado - chatId no state: ${this.state.chatId}`);
      });
    }
  }


  setMessages = (newMessages) => {
    this.setState({
      messages: newMessages
    });
  }

  handleSendMessage = (e, sender = "user") => {
    e.preventDefault();
    console.log("Parent handleSendMessage called", { sender });
    const messageContent = e.aiResponse || this.state.inputMessage;

    if (
      (sender === "user" && this.state.inputMessage.trim() === "") ||
      (sender === "assistant" && !e.aiResponse)
    )
      return;

    const newMessage = {
      id: this.state.messages.length + 1,
      content: messageContent,
      sender: sender,
      timestamp: new Date().toLocaleString("pt-BR"),
    };

    console.log("Adding new message:", newMessage);
    this.setState((prevState) => ({
      messages: [...prevState.messages, newMessage],
    }));

    if (sender === "user") {
      this.setState({ inputMessage: "" });
    }
  };

  render() {
    return (
      <div className="container-fluid vh-100 p-0 d-flex flex-column">
        <div className="row g-0 flex-grow-1 overflow-hidden">
          <Sidebar
            activeNav={this.state.activeNav}
            setActiveNav={(newNav) => this.setState({ activeNav: newNav })}
          />
          <div className="col d-flex flex-column h-100">
            <Header />
            <div className="flex-grow-1 overflow-hidden d-flex flex-column h-100">
              <div
                className="flex-grow-1 d-flex flex-column h-100"
                style={{ padding: "0 1rem" }}
              >
                <ChatMain
                  messages={this.state.messages}
                  setMessages={this.setMessages}
                  inputMessage={this.state.inputMessage}
                  setInputMessage={(value) =>
                    this.setState({ inputMessage: value })
                  }
                  handleSendMessage={this.handleSendMessage}
                  chatId={this.state.chatId}
                  userId={this.state.userId} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
