import { Card, CardContent, CardFooter } from "../ui/card";
const CardItem = ({ id, onClick, img, title }: any) => {
  return (
    <div className="flex flex-col items-center">
      <button
        className="flex flex-col items-center"
        onClick={() => onClick(id)}
      >
        <Card className="hover:bg-slate-50 hover:shadow-sm hover:shadow-slate-400 w-[200px] flex justify-center">
          <CardContent>
            <div className="mb-2 flex my-5 justify-center">{img}</div>
            <span>{title}</span>
          </CardContent>
        </Card>
      </button>
    </div>
  );
};
export default CardItem;
