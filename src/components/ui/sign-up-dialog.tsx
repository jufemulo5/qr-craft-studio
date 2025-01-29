import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function SignUpDialog() {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Regístrate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Regístrate</DialogTitle>
          <DialogDescription>
            Crea una cuenta para guardar tus códigos QR y acceder a más funciones.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right font-medium">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              placeholder="Ingresa tu nombre"
              className="col-span-3 border rounded-md px-2 py-1"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="usuario@ejemplo.com"
              className="col-span-3 border rounded-md px-2 py-1"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="password" className="text-right font-medium">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="col-span-3 border rounded-md px-2 py-1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Regístrate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
