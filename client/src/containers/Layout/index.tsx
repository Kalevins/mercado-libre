import type { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '@/components'

import './styles.scss'

export const Layout = (): ReactElement => {

  return (
    <main className='layout'>
      <Header/>
      <Outlet/>
    </main>
  )
}
