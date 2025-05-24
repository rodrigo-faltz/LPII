import SubjectCard from "./SubjectCard";
import React from "react";

interface SubjectsSectionProps {
  title: string;
  subjects: Array<{ id: number; name: string; image_link: string }>;
  size?: "small" | "large";
  cols?: {
    default: number;
    md: number;
    lg: number;
  };
}

const SubjectsSection = ({
  title,
  subjects,
  size = "large",
  cols = { default: 1, md: 2, lg: 4 },
}: SubjectsSectionProps) => {
  return (
    <section className="mb-5">
      <h2 className="mb-4">{title}</h2>
      <div
        className={`row row-cols-${cols.default} row-cols-md-${cols.md} row-cols-lg-${cols.lg} g-4`}
      >
        {subjects.map((subject, key) => (
          <div className="col" key={key}>
            <SubjectCard
              id={subject.id}
              title={subject.name}
              image_link={subject.image_link}
              size={size}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubjectsSection;
