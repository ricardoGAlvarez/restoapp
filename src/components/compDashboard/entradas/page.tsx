"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Entrada {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
}

export default function TableEntradas() {
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [editinEntrada, setEditingOrder] = useState<Entrada | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateOrder = () => {
    setEditingOrder(null);
    setIsDialogOpen(true);
  };

  const handleEditOrder = (entrada: Entrada) => {
    setEditingOrder(entrada);
    setIsDialogOpen(true);
  };

  const handleDeleteOrder = (id: number) => {
    setEntradas(entradas.filter((entrada) => entrada.id !== id));
  };

  const handleSaveOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newEntrada = {
      id: editinEntrada ? editinEntrada.id : Date.now(),
      nombre: formData.get("nombre") as string,
      descripcion: formData.get("descripcion") as string,
      precio: formData.get("precio") as string,
    };

    if (editinEntrada) {
      setEntradas(
        entradas.map((entrada) =>
          entrada.id === editinEntrada.id ? newEntrada : entrada
        )
      );
    } else {
      setEntradas([...entradas, newEntrada]);
    }

    setIsDialogOpen(false);
  };

  useEffect(() => {
    const fetchEntradas = async () => {
      try {
        const response = await fetch(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vR8pu35_VBgtRL--jNL_v2SWKUe2tj7JVYS4uydX1EKrEyivVsM1mFuKPJ7DZ6FlGmGDaKuF8_w-axY/pub?output=csv"
        );
        const data = await response.text();
        const entradas = data
      .split("\n")
      .slice(1) // Excluye la primera línea si es un encabezado
      .map((row) => {
        const [id, nombre, descripcion, precio] = row.split(",");
        return {
          id: parseInt(id),
          nombre: nombre.trim(),
          descripcion: descripcion.trim(),
          precio: precio.trim(),
        };
      });
    setEntradas(entradas);
      } catch (error) {
        console.error("Error al obtener las entradas:", error);
      }
    };

    fetchEntradas();
  }, []);

  return (
    <div className="w-full   mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold">Lista de Entradas</h3>
        <Button onClick={handleCreateOrder}>
          <Plus className="mr-2 h-4 w-4" /> Agregar Entrada
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead className="text-center">Productos</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entradas.map((entrada) => (
              <TableRow key={entrada.id}>
                <TableCell className="font-medium">{entrada.nombre}</TableCell>
                <TableCell>{entrada.descripcion}</TableCell>
                <TableCell>${entrada.precio}</TableCell>
                <TableCell className="flex">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => handleEditOrder(entrada)}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Editar
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Esto eliminará
                          permanentemente el pedido de la lista.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteOrder(entrada.id)}
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editinEntrada ? "Editar Pedido" : "Crear Nuevo Pedido"}
            </DialogTitle>
            <DialogDescription>
              {editinEntrada
                ? "Modifica los detalles del pedido existente."
                : "Completa los detalles para crear un nuevo pedido."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveOrder}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nombre">Nombre del Cliente</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  defaultValue={editinEntrada?.nombre}
                  required
                />
              </div>
              <div>
                <Label htmlFor="descripcion">Artículos</Label>
                <Input
                  id="descripcion"
                  name="descripcion"
                  defaultValue={editinEntrada?.descripcion}
                  required
                />
              </div>
              <div>
                <Label htmlFor="precio">Precio</Label>
                <Input
                  id="precio"
                  name="precio"
                  defaultValue={editinEntrada?.precio}
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">
                {editinEntrada ? "Guardar Cambios" : "Crear Pedido"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
