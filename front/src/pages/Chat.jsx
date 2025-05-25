import React from "react";
import ChatMain from "../components/ChatMain";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      inputMessage: "",
      activeNav: "chat",
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
                  chatId={this.props.match?.params?.id || 1}
                  userId={this.props.match?.params?.userId || 1} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
