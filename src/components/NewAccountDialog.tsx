import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  platform: z.string().min(1, "Debes seleccionar una plataforma"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  cost: z.number().min(0, "El costo debe ser mayor o igual a 0"),
});

type FormData = z.infer<typeof formSchema>;

interface NewAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FormData) => void;
}

export function NewAccountDialog({ open, onOpenChange, onSubmit }: NewAccountDialogProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: "",
      email: "",
      password: "",
      cost: 0,
    },
  });

  const { toast } = useToast();

  const handleSubmit = (data: FormData) => {
    onSubmit(data);
    form.reset();
    onOpenChange(false);
    toast({
      title: "Cuenta creada",
      description: "La cuenta ha sido creada exitosamente",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Nueva Cuenta</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Plataforma</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Netflix">Netflix</SelectItem>
                      <SelectItem value="Disney+">Disney+</SelectItem>
                      <SelectItem value="HBO Max">HBO Max</SelectItem>
                      <SelectItem value="Prime Video">Prime Video</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingresa el email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Ingresa la contraseña" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Costo Mensual ($)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Guardar
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}