import Header from "../components/Header";
import FixedBottomNavigation from "../components/Navbar";

const AmisPage = () => {
  // Liste fictive d'amis
  const amis = [
    { id: 1, pseudo: "_Vive_" },
    { id: 2, pseudo: "__Le__" },
    { id: 3, pseudo: "__P2I__" },
    { id: 4, pseudo: "__<3__" },
  ];

  return (
    <div>
      <Header />
      <div style={{ textAlign: "center", marginTop: "70px" }}>
        <h2>Vos Amis</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {amis.map((ami) => (
            <div
              key={ami.id}
              style={{
                margin: "10px",
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.3)",
              }}
            >
              <span style={{ marginRight: "10px" }}>{ami.pseudo}</span>
              <button
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              >
                Gérer l'amitié
              </button>
            </div>
          ))}
        </div>
      </div>
      <FixedBottomNavigation />
    </div>
  );
};

export default AmisPage;
