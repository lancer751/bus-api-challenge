import React, { useEffect, useState } from "react";
import type { Bus, BusJsonInfo } from "../types/bus.type";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
} from "lucide-react";

const ITEMS_PER_PAGE = 10;

export default function BusesTable() {
  const BASE_URL = "http://localhost:8085";
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    async function getAllBuses() {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/bus?page=${currentPage - 1}&size=${ITEMS_PER_PAGE}`
        );
        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        const jsonData: BusJsonInfo = await response.json();
        setBuses(jsonData.content);
        setTotalCount(jsonData.totalElements);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error in getAllBuses", error);
      }
    }
    getAllBuses();
  }, [currentPage]);

  useEffect(() => {
    async function getBusByID(id: number) {
      try {
        const response = await fetch(`${BASE_URL}/bus/${id}`);
        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        const jsonData: Bus = await response.json();
        alert(JSON.stringify(jsonData));
        setSelectedBusId(null);
      } catch (error) {
        console.error("Error in getAllBuses", error);
      }
    }

    if (selectedBusId) getBusByID(selectedBusId);
  }, [selectedBusId]);

  function handleShowDetails(id: number) {
    setSelectedBusId(id);
  }
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  function goToPage(page: number) {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }

  return (
    <div className="max-w-7xl mx-auto w-[90%] rounded-md">
      <div className="bg-white rounded-md shadow-lg overflow-hidden">
        <div className="border-b border-b-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tabla de Buses
          </h1>
        </div>
        {/* Se muestran los buses despues de realizr la request a la Api */}
        <div className="overflow-x-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-800"></div>
            </div>
          ) : buses.length === 0 ? (
            <div className="text-center py-20 text-gray-200">No hay buses</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 via-whte to-indigo-50">
                <tr>
                  <th className="th-cell">ID</th>
                  <th className="th-cell">Número de Bus</th>
                  <th className="th-cell">Placa</th>
                  <th className="th-cell">Marca</th>
                  <th className="th-cell">Características</th>
                  <th className="th-cell">Activo</th>
                  <th className="th-cell">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {buses.map((bus) => (
                  <tr className="tbody-row" key={bus.id}>
                    <td className="tbody-tds">{bus.id}</td>
                    <td className="tbody-tds">{bus.numeroBus}</td>
                    <td className="tbody-tds">{bus.placa}</td>
                    <td className="tbody-tds">{bus.marca?.nombre}</td>
                    <td className="tbody-tds">{bus.caracteristicas}</td>
                    <td className="tbody-tds">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          bus.activo
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {bus.activo ? "activo" : "inactivo"}
                      </span>
                    </td>
                    <td className="tbody-tds">
                      <button
                        className="bg-violet-600 hover:bg-violet-400 transition-colors rounded-md text-white p-2 text-sm"
                        onClick={() => handleShowDetails(bus.id)}
                      >
                        <Eye/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* paginacion de buses */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-semibold">
              {buses.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold">
              {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)}
            </span>{" "}
            of <span className="font-semibold">{totalCount}</span> products
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              title="First page"
            >
              <ChevronsLeft className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              title="Previous page"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`min-w-[40px] px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              title="Next page"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              title="Last page"
            >
              <ChevronsRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
