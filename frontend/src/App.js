import React, { useEffect, useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL || "https://your-backend.onrender.com";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  
  useEffect(() => {
    fetch(`${apiUrl}/api/hello`)
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка запроса к бэкенду");
        return res.json();
      })
      .then((data) => setData(data))
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#112d13",
      color: "#eaffda",
      fontFamily: "Roboto, Arial, sans-serif",
      padding: "2rem"
    }}>
      <h1>P2P Exchange Frontend</h1>
      <p>Пробуем запрос к бэкенду:</p>
      {error && <div style={{ color: "#ff4d4d" }}>Ошибка: {error}</div>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <footer style={{ marginTop: "3rem", color: "#6ee2b5" }}>
        Powered by P2P
      </footer>
    </div>
  );
}

export default App;
