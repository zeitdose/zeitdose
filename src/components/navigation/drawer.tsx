import type { FunctionComponent, ReactNode } from 'react'

import {
  BellIcon,
  ChevronLeftIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MixerVerticalIcon,
  Pencil2Icon,
  ReaderIcon,
} from '@radix-ui/react-icons'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'

export interface Props {
  children: ReactNode
}

export const Drawer: FunctionComponent<Props> = ({ children }) => (
  <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1">
          <header className="flex items-center gap-2 p-2">
            <Avatar>
              <AvatarImage src="https://github.com/importantimport.png" />
              <AvatarFallback>II</AvatarFallback>
            </Avatar>
            <span className="flex-1">Time Capsule</span>
            <div className="ml-auto">
              <ChevronLeftIcon className="h-4 w-4" />
              {/* <Pencil2Icon className="mr-2 h-4 w-4" /> */}
            </div>
          </header>
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Separator className="mt-2 mb-4" />
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              href="#"
            >
              <HomeIcon className="h-4 w-4" />
              Home
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              href="#"
            >
              <ReaderIcon className="h-4 w-4" />
              Journals
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              href="#"
            >
              <MagnifyingGlassIcon className="h-4 w-4" />
              Search
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              href="#"
            >
              <BellIcon className="h-4 w-4" />
              Notifications
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                1
              </Badge>
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              href="#"
            >
              <MixerVerticalIcon className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button className="w-full" variant="secondary">
            <Pencil2Icon className="mr-2 h-4 w-4" />
            Create New Log
          </Button>
        </div>
      </div>
    </div>
    {children}
  </div>
)
