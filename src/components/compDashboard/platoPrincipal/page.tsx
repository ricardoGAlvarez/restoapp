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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Badge } from "@/components/ui/badge"

interface Order {
  id: number
  customerName: string
  items: string
  total: number
  status: 'Preparando' | 'Entregado' | 'Cancelado'
}

export default function TablaPLatoPrincipal() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, customerName: "Juan Pérez", items: "2x Hamburguesa, 1x Refresco", total: 25.99, status: 'Preparando' },
    { id: 2, customerName: "María García", items: "1x Pizza familiar, 2x Cerveza", total: 32.50, status: 'Entregado' },
    { id: 3, customerName: "Carlos Rodríguez", items: "3x Tacos, 1x Agua mineral", total: 15.75, status: 'Cancelado' },
  ])
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateOrder = () => {
    setEditingOrder(null)
    setIsDialogOpen(true)
  }

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order)
    setIsDialogOpen(true)
  }

  const handleDeleteOrder = (id: number) => {
    setOrders(orders.filter((order) => order.id !== id))
  }

  const handleSaveOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newOrder = {
      id: editingOrder ? editingOrder.id : Date.now(),
      customerName: formData.get("customerName") as string,
      items: formData.get("items") as string,
      total: parseFloat(formData.get("total") as string),
      status: formData.get("status") as 'Preparando' | 'Entregado' | 'Cancelado',
    }

    if (editingOrder) {
      setOrders(orders.map((order) => (order.id === editingOrder.id ? newOrder : order)))
    } else {
      setOrders([...orders, newOrder])
    }

    setIsDialogOpen(false)
  }


  return (
    <div className="w-full   mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold">Lista de Platos Principales</h3>
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
              <TableHead>Total</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.customerName}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell className="flex">
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditOrder(order)}>
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
                          Esta acción no se puede deshacer. Esto eliminará permanentemente el pedido de la lista.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteOrder(order.id)}>Eliminar</AlertDialogAction>
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
            <DialogTitle>{editingOrder ? "Editar Pedido" : "Crear Nuevo Pedido"}</DialogTitle>
            <DialogDescription>
              {editingOrder
                ? "Modifica los detalles del pedido existente."
                : "Completa los detalles para crear un nuevo pedido."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveOrder}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="customerName">Nombre del Cliente</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  defaultValue={editingOrder?.customerName}
                  required
                />
              </div>
              <div>
                <Label htmlFor="items">Artículos</Label>
                <Input
                  id="items"
                  name="items"
                  defaultValue={editingOrder?.items}
                  required
                />
              </div>
              <div>
                <Label htmlFor="total">Total</Label>
                <Input
                  id="total"
                  name="total"
                  type="number"
                  step="0.01"
                  defaultValue={editingOrder?.total}
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Estado</Label>
                <Select name="status" defaultValue={editingOrder?.status || 'Preparando'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Preparando">Preparando</SelectItem>
                    <SelectItem value="Entregado">Entregado</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">{editingOrder ? "Guardar Cambios" : "Crear Pedido"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

