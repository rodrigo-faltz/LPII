import React from "react";

interface SubjectCardProps {
  title: string;
  imageUrl: string;
  size?: "small" | "large";
}

const SubjectCard = ({ title, imageUrl, size = "large" }: SubjectCardProps) => {

  return (
    <div className="card h-100 border-0 shadow-sm">
      <img
        src={imageUrl}
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
