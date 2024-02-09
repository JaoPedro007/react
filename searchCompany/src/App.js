import "./App.css";
import { FaSearchLocation } from "react-icons/fa";
import { useState } from "react";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");

  const [data, setData] = useState({});

  async function handleSearch() {
    if (input === "" || input.length !== 14) {
      alert("Digite um CNPJ");
      setInput("");
      return;
    }

    try {
      const response = await api.get(`${input}/is_blocked`);
      setData(response.data);
      setInput("");
    } catch (error) {
      alert("Ops, ocorreu um erro ao buscar esse CNPJ ");
      setInput("");
    }
  }

  return (
    <div className="container">
      <div className="title">
        <h1>Search Company</h1>
      </div>

      <div className="containerInput">
        <input
          type="number"
          placeholder="Type the cnpj..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button className="buttonSearch" onClick={handleSearch}>
          <FaSearchLocation color="rgb(2, 16, 27)" size={25} />
        </button>
      </div>

      {Object.keys(data).length > 0 && (
        <main>
          <h2>CNPJ: {data.cnpj}</h2>
          <span>Id: {data.id}</span>
          <span>Name: {data.name}</span>
          <span>Active: {data.active}</span>
          <span>
            City/State: {data.city} - {data.state}
          </span>
          <span>Installation date: {data.installation_date}</span>
          <span>Block: {data.is_blocked}</span>
          <span>Lock date: {data.lock_date}</span>
          <span>Observation: {data.observation}</span>
          <span>Phone: {data.phone}</span>
          <span>System: {data.system}</span>
          <span>Test date: {data.test_date}</span>
          <span>Test system: {data.test_system}</span>
          <span>Version: {data.version}</span>
        </main>
      )}
    </div>
  );
}

export default App;
