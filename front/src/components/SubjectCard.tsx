import React from "react";
import axios from "axios";

interface SubjectCardProps {
  id: number;
  title: string;
  image_link: string;
  size?: "small" | "large";
}

const SubjectCard = ({ id, title, image_link, size = "large" }: SubjectCardProps) => {
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
    
      window.location.href = `/home/chat/${response.data.id}`;
    } catch (error) {
      console.error("Erro ao criar chat:", error);
      alert("Não foi possível criar um novo chat. Tente novamente.");
    }
  };

  return (
    <div
      className="card h-100 border-0 shadow-sm"
      onClick={createNewChat}
    >
      <img
        src={image_link}
        alt={title}
        className={`card-img-top card-img-${size}`}
      />
      <div className="card-body">
        {size === "small" ? (
          <h6 className="card-title">{title}</h6>
        ) : (
          <h5 className="card-title">{title}</h5>
        )}
      </div>
    </div>
  );
};

export default SubjectCard;