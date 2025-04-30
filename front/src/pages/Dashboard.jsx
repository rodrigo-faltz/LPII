import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SubjectsSection from "../components/SubjectsSection";

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState("inicio");

  const favoriteSubjects = [ // vai ser chamada de API
    {
      name: "Matemática",
      imageUrl: "/placeholder.svg?height=200&width=400&text=Matemática",
    },
    {
      name: "Física",
      imageUrl: "/placeholder.svg?height=200&width=400&text=Física",
    },
    {
      name: "Química",
      imageUrl: "/placeholder.svg?height=200&width=400&text=Química",
    },
    {
      name: "História",
      imageUrl: "/placeholder.svg?height=200&width=400&text=História",
    },
  ];

  const suggestedSubjects = [  // vai ser chamada de API
    {
      name: "Sociologia",
      imageUrl: "/placeholder.svg?height=150&width=200&text=Sociologia",
    },
    {
      name: "Filosofia",
      imageUrl: "/placeholder.svg?height=150&width=200&text=Filosofia",
    },
    {
      name: "Geografia",
      imageUrl: "/placeholder.svg?height=150&width=200&text=Geografia",
    },
    {
      name: "Biologia",
      imageUrl: "/placeholder.svg?height=150&width=200&text=Biologia",
    },
    {
      name: "Atualidades",
      imageUrl: "/placeholder.svg?height=150&width=200&text=Atualidades",
    },
    {
      name: "Português",
      imageUrl: "/placeholder.svg?height=150&width=200&text=Português",
    },
  ];

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

        <div className="col main-content">
          <Header />

          <div className="container-fluid p-4">
            <SubjectsSection
              title="Disciplinas favoritas"
              subjects={favoriteSubjects}
              size="large"
              cols={{ default: 1, md: 2, lg: 4 }}
            />

            <SubjectsSection
              title="Veja também"
              subjects={suggestedSubjects}
              size="small"
              cols={{ default: 1, md: 3, lg: 6 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;