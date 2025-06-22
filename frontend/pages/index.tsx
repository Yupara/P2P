import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hello`)
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка запроса к бэкенду");
        return res.json();
      })
      .then((data) => setData(data))
      .catch((e) => setError(e.message));
  }, []);

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Фронтенд работает!</h1>
      <p>Пробуем запрос к бэкенду:</p>
      {error && <div style={{ color: "red" }}>Ошибка: {error}</div>}
      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
      <p>
        <small>
          (Редактируй <code>pages/index.tsx</code>)
        </small>
      </p>
    </main>
  );
}
