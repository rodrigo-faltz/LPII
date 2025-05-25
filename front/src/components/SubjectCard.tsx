import React, { useState } from "react";
import axios from "axios";

interface SubjectCardProps {
  id: number;
  title: string;
  image_link: string;
  size?: "small" | "large";
}

const SubjectCard = ({ id, title, image_link, size = "large" }: SubjectCardProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const createNewChat = async () => {
    const userId = localStorage.getItem("userId");
    
    if (!userId) {
      window.location.href = "/login";
      return;
    }
    
    try {
      const response = await axios.post("http://localhost:3000/api/chat", {
        user_id: Number(userId),
        subject_id: id
      });
    
      const newChatId = response.data.id;

      await axios.post("http://localhost:3000/api/message", {
        content: `Olá! Bem-vindo ao chat sobre ${title}. Como posso ajudar você hoje?`,
        chat_id: Number(newChatId),
        author_id: 0 // ID 0 para mensagens do assistente
      });

      window.location.href = `/home/chat/${newChatId}`;
    } catch (error) {
      console.error("Erro ao criar chat:", error);
    }
  };
  
  const navigateToHistory = (e) => {
    e.stopPropagation();
    localStorage.setItem("clickedSubject", title);
    window.location.href = `/home/historico?materia=${encodeURIComponent(title)}`;
  };
  
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  return (
    <div
      className="card h-100 border-0 shadow-sm position-relative"
      onClick={createNewChat}
    >
      <img
        src={image_link}
        alt={title}
        className={`card-img-top card-img-${size}`}
      />
      <div className="card-body position-relative">
        {size === "small" ? (
          <h6 className="card-title">{title}</h6>
        ) : (
          <h5 className="card-title">{title}</h5>
        )}
        <div 
          className="position-absolute bottom-0 end-0 p-2"
          onClick={toggleDropdown}
        >
          <button 
            className="btn btn-sm btn-light rounded-circle" 
            style={{ width: '28px', height: '28px', padding: '0px' }}
          >
            <i className="bi bi-three-dots-vertical"></i>
          </button>
          
          {showDropdown && (
            <div 
              className="position-absolute end-0 bottom-100 mb-1 bg-white shadow rounded p-1"
              style={{ width: '180px', zIndex: 1000 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="btn btn-sm text-start w-100"
                onClick={navigateToHistory}
              >
                <i className="bi bi-clock-history me-2"></i>
                Mostrar Histórico
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;