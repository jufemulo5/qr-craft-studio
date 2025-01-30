import * as React from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignUpDialog() {
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSignIn, setIsSignIn] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isSignIn) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        toast({
          title: "¡Bienvenido de nuevo!",
          description: "Has iniciado sesión exitosamente.",
        })
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) throw error

        toast({
          title: "¡Registro exitoso!",
          description: "Por favor verifica tu correo electrónico para continuar.",
        })
      }

      setOpen(false)
      navigate("/qrgenerator")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Regístrate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isSignIn ? "Iniciar sesión" : "Regístrate"}</DialogTitle>
          <DialogDescription>
            {isSignIn 
              ? "Ingresa tus credenciales para acceder a tu cuenta."
              : "Crea una cuenta para guardar tus códigos QR y acceder a más funciones."
            }
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAuth} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="usuario@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:space-x-0">
            <Button 
              type="button" 
              variant="ghost"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Procesando..." : (isSignIn ? "Iniciar sesión" : "Registrarse")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}