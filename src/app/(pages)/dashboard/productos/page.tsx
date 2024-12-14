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
import { Textarea } from "@/components/ui/textarea";
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

interface Productos {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  image: string;
  nombre_categoria: string;
}

export default function Productos() {
  const [productos, setProductos] = useState<Productos[]>([]);
  const [editinProduct, setEditinProduct] = useState<Productos | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateMenu = () => {
    setEditinProduct(null);
    setIsDialogOpen(true);
  };

  const handleEditMenu = (menu: Productos) => {
    setEditinProduct(menu);
    setIsDialogOpen(true);
  };

  const handleDeleteMenu = (id: number) => {
    setProductos(productos.filter((menu) => menu.id !== id));
  };

  const handleSaveMenu = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newProducto = {
      id: editinProduct ? editinProduct.id : Date.now(),
      nombre: formData.get("nombre") as string,
      descripcion: formData.get("descripcion") as string,
      precio: formData.get("precio") as string,
      image: formData.get("image") as string,
      nombre_categoria: formData.get("categoria") as string,
    };

    if (editinProduct) {
      setProductos(
        productos.map((producto) =>
          producto.id === editinProduct.id ? newProducto : producto
        )
      );
    } else {
      setProductos([...productos, newProducto]);
    }

    setIsDialogOpen(false);
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vR7GK-O8BJ6Ah3qgTNVpc9tmwOrZhfqZXaK35hav5FvIARYSXiGLQjcIBgwwKQhg-w0gfKM2UVoomYU/pub?output=csv"
        );
        const data = await response.text();
        const products = data
          .split("\n")
          .slice(1)
          .map((row) => {
            const [id, nombre, descripcion, nombre_categoria, precio, image] =
              row.split(",");
            return {
              id: parseInt(id),
              nombre,
              descripcion,
              precio: precio,
              image,
              nombre_categoria,
            };
          });
        setProductos(products);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    fetchProductos();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Lista de Productos</h1>
        <Button onClick={handleCreateMenu}>
          <Plus className="mr-2 h-4 w-4" /> Crear Menú
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.nombre}</TableCell>
                <TableCell>{product.descripcion}</TableCell>
                <TableCell>{product.nombre_categoria}</TableCell>
                <TableCell>${product.precio}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => handleEditMenu(product)}
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
                          permanentemente el menú de la lista.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteMenu(product.id)}
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
              {editinProduct ? "Editar Menú" : "Crear Nuevo Menú"}
            </DialogTitle>
            <DialogDescription>
              {editinProduct
                ? "Modifica los detalles del menú existente."
                : "Completa los detalles para crear un nuevo menú."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveMenu}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre del Menú</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editinProduct?.nombre}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editinProduct?.descripcion}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nombre_categoria">Categoria</Label>
                <Textarea
                  id="nombre_categoria"
                  name="nombre_categoria"
                  defaultValue={editinProduct?.nombre_categoria}
                  required
                />
              </div>
              <div>
                <Label htmlFor="precio">Precio</Label>
                <Input
                  id="precio"
                  name="precio"
                  type="text"
                  defaultValue={editinProduct?.precio}
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">
                {editinProduct ? "Guardar Cambios" : "Crear Menú"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
