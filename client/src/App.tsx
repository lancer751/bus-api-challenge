import { useEffect, useState } from "react";
import "./App.css";
import type { Bus, BusJsonInfo } from "./types/bus.type";

function App() {
  const BASE_URL = "http://localhost:8085";
  const [buses, setBuses] = useState<Bus[]>([]);
  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);
  useEffect(() => {
    async function getAllBuses() {
      try {
        const response = await fetch(`${BASE_URL}/bus`);
        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        const jsonData: BusJsonInfo = await response.json();
        setBuses(jsonData.content);
      } catch (error) {
        console.error("Error in getAllBuses", error);
      }
    }
    getAllBuses();
  }, []);

  useEffect(() => {
    async function getBusByID(id: number) {
      try {
        const response = await fetch(`${BASE_URL}/bus/${id}`);
        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        const jsonData: Bus = await response.json();
        alert(JSON.stringify(jsonData))
        setSelectedBusId(null)
      } catch (error) {
        console.error("Error in getAllBuses", error);
      }
    }

    if (selectedBusId) getBusByID(selectedBusId);
  }, [selectedBusId]);

  function handleShowDetails(id: number) {
    setSelectedBusId(id)
  }

  return (
    <div className="">
      <section className="container">
        <h1>Listado de Buses</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
          quaerat?
        </p>
        <div className="">
          <table border={1} cellPadding="8">
            <thead>
              <tr>
                <th>ID</th>
                <th>Número de Bus</th>
                <th>Placa</th>
                <th>Marca</th>
                <th>Características</th>
                <th>Activo</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => (
                <tr key={bus.id}>
                  <td>{bus.id}</td>
                  <td>{bus.numeroBus}</td>
                  <td>{bus.placa}</td>
                  <td>{bus.marca?.nombre}</td>
                  <td>{bus.caracteristicas}</td>
                  <td>{bus.activo ? "✅" : "❌"}</td>
                  <td>
                    <button onClick={() => handleShowDetails(bus.id)}>
                      Mostrar detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;
