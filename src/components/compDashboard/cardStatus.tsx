import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function CardsStatus({titulo, descripcion}:any) {
  return (
    <div className="w-full flex justify-center">
      <Card className="flex items-center lg:justify-around hover:bg-slate-50 hover:shadow-sm hover:shadow-slate-400 w-[400px] ">
        <CardHeader>
          <CardTitle className="text-start">{titulo }</CardTitle>
          <CardDescription className="text-start">{descripcion}</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-end text-3xl text-violet-600 font-semibold">
            0
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
