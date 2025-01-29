import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";

interface EditClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    pin: string;
    phone: string;
    amountDue: number;
  }) => void;
  client?: {
    id: string;
    name: string;
    pin: string;
    phone: string;
    amountDue: number;
  };
}

export function EditClientDialog({ open, onOpenChange, onSubmit, client }: EditClientDialogProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: client ? {
      name: client.name,
      pin: client.pin,
      phone: client.phone,
      amountDue: client.amountDue,
    } : {
      name: "",
      pin: "",
      phone: "",
      amountDue: 0,
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{client ? "Editar Cliente" : "Nuevo Cliente"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" {...register("name", { required: true })} />
            {errors.name && <span className="text-red-500 text-sm">Este campo es requerido</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="pin">PIN</Label>
            <Input id="pin" {...register("pin", { required: true })} />
            {errors.pin && <span className="text-red-500 text-sm">Este campo es requerido</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" {...register("phone", { required: true })} />
            {errors.phone && <span className="text-red-500 text-sm">Este campo es requerido</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="amountDue">Monto a Pagar</Label>
            <Input 
              id="amountDue" 
              type="number" 
              step="0.01"
              {...register("amountDue", { required: true, min: 0 })} 
            />
            {errors.amountDue && <span className="text-red-500 text-sm">Monto inválido</span>}
          </div>
          <DialogFooter>
            <Button type="submit">{client ? "Guardar Cambios" : "Agregar Cliente"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}