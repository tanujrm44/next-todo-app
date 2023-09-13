'use client'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../app/store'
import { SessionProvider } from 'next-auth/react'

export default function Providers({ children, session }) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </Provider>
  )
}
