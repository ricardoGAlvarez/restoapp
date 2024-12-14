import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { X } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Error, verifica tus credenciales.");
      setSuccess(null); // Aseguramos que el éxito se limpia
    } else {
      setSuccess("Inicio de sesión exitoso.");
      setError(null); // Aseguramos que el error se limpia
      setTimeout(() => {
        router.push("/dashboard"); // Redirige después de 2 segundos
      }, 2000);
    }
  });

  const Alerta = ({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) => (
    <div
      className={`flex items-center justify-between p-4 rounded-xl shadow-md transition-all duration-300 ease-in-out ${
        type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
      }`}
    >
      <span className="text-sm font-medium">{message}</span>
      <button
        className="ml-4 text-white hover:bg-opacity-80 p-1 rounded-full transition-colors duration-200"
        onClick={onClose}
        aria-label="Cerrar alerta"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <div className="absolute right-1 top-1 rounded-xl p-2">
          {error && <Alerta message={error} type="error" onClose={() => setError(null)} />}
          {success && <Alerta message={success} type="success" onClose={() => setSuccess(null)} />}
        </div>
        <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
        <CardDescription>
          Escribe tus credenciales para ingresar al sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-y-4">
          <form onSubmit={onSubmit} className="grid gap-y-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email", { required: true })}
            />
            <div className="flex items-center">
              <Label htmlFor="password">Contraseña</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Olvidaste tu contraseña?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              {...register("password", { required: true })}
            />
            <div className="my-4">
              <Button type="submit" className="w-full">
                Ingresar
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
