import CardsStatus from "./cardStatus";

const CardListStatus = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-7 mt-10 xl:mt-0">
      <div className="w-full text-start ms-10">
      <h3 className="text-3xl font-bold">Estado de Pedidos</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-5">
        <CardsStatus titulo="En Preparacion" descripcion={""} />
        <CardsStatus titulo="Entregados" descripcion={""} />
        <CardsStatus titulo="Cancelados" descripcion={""} />
      </div>
    </div>
  );
};

export default CardListStatus;
