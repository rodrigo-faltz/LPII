interface SubjectCardProps {
  title: string;
  image_link: string;
  size?: "small" | "large";
}

const SubjectCard = ({ title, image_link, size = "large" }: SubjectCardProps) => {
  return (
    <div
      className="card h-100 border-0 shadow-sm"
      onClick={() => {
        localStorage.setItem("clickedSubject", title);
        window.location.href = `/subject/${title}`;
      }}
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
