"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { X } from "lucide-react";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      }),
    });

    const res = await response.json();

    if (response.ok) {
      setSuccess(res.message || "Registro exitoso");
      setError(null);
      setTimeout(() => {
        router.push("/"); // Redirige a "/" después de 2 segundos
      }, 2000);
    } else {
      setError(res.message || "Error al registrar");
      setSuccess(null);
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
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm w-[400px]">
        <CardHeader>
          <div className="absolute right-1 top-1 rounded-xl p-2">
            {error && <Alerta message={error} type="error" onClose={() => setError(null)} />}
            {success && <Alerta message={success} type="success" onClose={() => setSuccess(null)} />}
          </div>
          <CardTitle className="text-2xl">Registro de Usuario</CardTitle>
          <CardDescription>
            Crea un nuevo registro con tus credenciales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <Label>
              Nombre
              <Input type="text" {...register("name", { required: true })} />
            </Label>
            {errors.name && (
              <span className="text-red-500">Este campo es obligatorio</span>
            )}
            <Label>
              Email
              <Input type="text" {...register("email", { required: true })} />
            </Label>
            {errors.email && (
              <span className="text-red-500">Este campo es obligatorio</span>
            )}
            <Label>
              Contraseña
              <Input
                type="password"
                {...register("password", { required: true })}
              />
            </Label>
            {errors.password && (
              <span className="text-red-500">Este campo es obligatorio</span>
            )}
            <Label>
              Confirmar Contraseña
              <Input
                type="password"
                {...register("confirmPassword", { required: true })}
              />
            </Label>
            {errors.confirmPassword && (
              <span className="text-red-500">Este campo es obligatorio</span>
            )}
            <div className="grid gap-2 my-4">
              <select
                {...register("role", { required: "El rol es obligatorio" })}
                className="rounded-2xl p-2 border border-black"
              >
                <option value="">Seleccionar Rol</option>
                <option value="Admin">Administrador</option>
                <option value="User">Usuario</option>
              </select>
            </div>

            <Button type="submit" className="w-full">
              Registrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
