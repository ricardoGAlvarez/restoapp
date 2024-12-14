"use client";
import TableBebidas from "@/components/compDashboard/bebidas/page";
import CardItem from "@/components/compDashboard/cardItem";
import TableEntradas from "@/components/compDashboard/entradas/page";
import CardListStatus from "@/components/compDashboard/listCardStatus";
import TablaPLatoPrincipal from "@/components/compDashboard/platoPrincipal/page";
import TablePostres from "@/components/compDashboard/postres/page";
import TablePedidos from "@/components/compDashboard/tablePedidos";
import { Utensils, Wine, IceCream, Drumstick, Home } from "lucide-react";
import { JSX, useState } from "react";

// Define un mapeo de id a componentes
const componentsMap: Record<string, JSX.Element> = {
  "0": (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <CardListStatus />
      <TablePedidos />
    </div>
  ),
  "1": <TableEntradas />,
  "2": <TablaPLatoPrincipal />,
  "3": <TableBebidas />,
  "4": <TablePostres />,
};

export default function HomeDashboard() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setSelectedItem(id);
  };

  return (
    <div className="w-10/12 mx-auto">
      {/* Grid de CardItems */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        <CardItem
          id="0"
          img={<Home size={32} />}
          title={"Inicio"}
          onClick={handleCardClick}
        />
        <CardItem
          id="1"
          img={<Utensils size={32} />}
          title={"Entradas"}
          onClick={handleCardClick}
        />
        <CardItem
          id="2"
          img={<Drumstick size={32} />}
          title={"Plato Principal"}
          onClick={handleCardClick}
        />
        <CardItem
          id="3"
          img={<Wine size={32} />}
          title={"Bebidas"}
          onClick={handleCardClick}
        />
        <CardItem
          id="4"
          img={<IceCream size={32} />}
          title={"Postres"}
          onClick={handleCardClick}
        />
      </div>

      {/* Contenido dinámico */}
      <div className="w-full text-center mb-5 items-center">
        {selectedItem ? (
          <div className=" p-4 rounded-lg">
            {/* Renderiza el componente correspondiente al id */}
            {componentsMap[selectedItem] || <p>Componente no encontrado</p>}
          </div>
        ) : (
          // Renderiza contenido por defecto si no hay selección
          componentsMap["0"]
        )}
      </div>
    </div>
  );
}
