import React from 'react'
import { useAuth } from '../context/AuthContext'

function AdminDashboard() {
  const {user} = useAuth()
  console.log(user);
  
  return (
    <div>AdminDashboard {user.name}</div>
  )
}

export default AdminDashboard