'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'
import { createWordStore,type CounterStore } from './text'

export const CounterStoreContext = createContext<StoreApi<CounterStore> | null >(
  null,
)

export interface TypingStoreProvider {
  children: ReactNode
}

export const CounterStoreProvider = ({
  children,
}: TypingStoreProvider) => {
  const storeRef = useRef<StoreApi<CounterStore>>()
  if (!storeRef.current) {
    storeRef.current = createWordStore()
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  )
}

export const useCounterStore = <T,>(
  selector: (store: CounterStore) => T,
): T => {
  const counterStoreContext = useContext(CounterStoreContext)

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be use within CounterStoreProvider`)
  }

  return useStore(counterStoreContext, selector)
}