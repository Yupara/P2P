import React from "react";
import { useParams } from "react-router-dom";
export default function DealChat() {
  const { id } = useParams();
  return <h2>💬 Чат по сделке #{id}</h2>;
}
