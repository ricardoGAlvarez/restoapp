"use client"

import { useState } from "react"
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
} from "@/components/ui/alert-dialog"

interface Menu {
  id: number
  name: string
  description: string
  price: number
}


export default function Categorias() {
  const [menus, setMenus] = useState<Menu[]>([
    { id: 1, name: "Menú del día", description: "Incluye entrada, plato principal y postre", price: 15.99 },
    { id: 2, name: "Menú vegetariano", description: "Opciones saludables y deliciosas", price: 12.99 },
    { id: 3, name: "Menú infantil", description: "Porciones pequeñas y divertidas", price: 8.99 },
  ])
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateMenu = () => {
    setEditingMenu(null)
    setIsDialogOpen(true)
  }

  const handleEditMenu = (menu: Menu) => {
    setEditingMenu(menu)
    setIsDialogOpen(true)
  }

  const handleDeleteMenu = (id: number) => {
    setMenus(menus.filter((menu) => menu.id !== id))
  }

  const handleSaveMenu = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newMenu = {
      id: editingMenu ? editingMenu.id : Date.now(),
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
    }

    if (editingMenu) {
      setMenus(menus.map((menu) => (menu.id === editingMenu.id ? newMenu : menu)))
    } else {
      setMenus([...menus, newMenu])
    }

    setIsDialogOpen(false)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Lista de Categorias</h1>
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
              <TableHead>Precio</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menus.map((menu) => (
              <TableRow key={menu.id}>
                <TableCell className="font-medium">{menu.name}</TableCell>
                <TableCell>{menu.description}</TableCell>
                <TableCell>${menu.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditMenu(menu)}>
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
                          Esta acción no se puede deshacer. Esto eliminará permanentemente el menú de la lista.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteMenu(menu.id)}>Eliminar</AlertDialogAction>
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
            <DialogTitle>{editingMenu ? "Editar Menú" : "Crear Nuevo Menú"}</DialogTitle>
            <DialogDescription>
              {editingMenu
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
                  defaultValue={editingMenu?.name}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingMenu?.description}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Precio</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={editingMenu?.price}
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">{editingMenu ? "Guardar Cambios" : "Crear Menú"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

