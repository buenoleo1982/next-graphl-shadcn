import type { ReactNode } from 'react'
import Sidebar from './sidebar'

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Sidebar />
      <main className="sm:ml-14 p-4">{children}</main>
    </div>
  )
}

export default MainLayout
