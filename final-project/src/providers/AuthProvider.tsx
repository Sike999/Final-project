import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { fetchProfile, } = useAuth()

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  return (
    <>
      {children}
    </>
  )
};