import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

export function AuthCallback() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get('data')
    if (raw) {
      const { accessToken, user } = JSON.parse(decodeURIComponent(raw))
      setAuth(user, accessToken)
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }, [])

  return <p>Redirigiendo...</p>
}