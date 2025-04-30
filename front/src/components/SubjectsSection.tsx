import SubjectCard from "./SubjectCard";
import React from "react";

interface SubjectsSectionProps {
  title: string;
  subjects: Array<{ name: string; imageUrl: string }>;
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
        {subjects.map((subject) => (
          <div className="col" key={subject.name}>
            <SubjectCard
              title={subject.name}
              imageUrl={subject.imageUrl}
              size={size}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubjectsSection;
