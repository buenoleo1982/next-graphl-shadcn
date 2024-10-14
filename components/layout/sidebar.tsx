import { Cog, Home, LogOut, Package, Package2, SquareMenu } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-muted/40 w-full">
      <aside className="left-0 z-10 fixed inset-y-0 sm:flex flex-col hidden bg-background border-r w-14">
        <nav className="flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Link
              href="/"
              className="flex justify-center items-center bg-primary rounded-full w-9 h-9 text-primary-foreground shrink-0"
            >
              <Package2 className="w-6 h-6" />
              <span className="sr-only">Inicio</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className="flex justify-center items-center rounded-lg w-9 h-9 text-muted-foreground hover:text-foreground transition-colors shrink-0"
                >
                  <Home className="w-6 h-6" />
                  <span className="sr-only">Inicio</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Inicio</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className="flex justify-center items-center rounded-lg w-9 h-9 text-muted-foreground hover:text-foreground transition-colors shrink-0"
                >
                  <Cog className="w-6 h-6" />
                  <span className="sr-only">Projetos</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Projetos</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="flex flex-col items-center gap-4 mt-auto px-2 py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/auth/logout"
                  className="flex justify-center items-center rounded-lg w-9 h-9 text-muted-foreground hover:text-foreground transition-colors shrink-0"
                >
                  <LogOut className="w-6 h-6" />
                  <span className="sr-only">Sair</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Sair</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:hidden sm:py-4 sm:pl-14">
        <header className="top-0 z-30 sm:static sticky flex items-center gap-4 sm:border-0 bg-background sm:bg-transparent px-4 sm:px-6 border-b h-14 sm:h-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <SquareMenu className="w-5 h-5" />
                <span className="sr-only">Abrir/Fechar menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-x">
              <nav className="gap-6 grid font-medium text-lg">
                <Link
                  href="/"
                  className="flex justify-center items-center gap-2 bg-primary rounded-full w-10 h-10 text-lg text-primary-foreground md:text-base"
                >
                  <Package className="w-5 h-5 transition-all" />
                  <span className="sr-only">Menu</span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="w-5 h-5 transition-all" />
                  Inicio
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="w-5 h-5 transition-all" />
                  Inicio
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="w-5 h-5 transition-all" />
                  Inicio
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="w-5 h-5 transition-all" />
                  Inicio
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <h2 className="font-semibold text-lg">TcheTask</h2>
        </header>
      </div>
    </div>
  )
}

export default Sidebar
