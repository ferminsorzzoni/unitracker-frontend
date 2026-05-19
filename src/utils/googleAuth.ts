import type { LoginResponseDTO } from "../types/auth"

export function loginWithGoogle(): Promise<LoginResponseDTO> {
  return new Promise((resolve, reject) => {
    const popup = window.open(
      `${import.meta.env.VITE_API_URL}/auth/google/`,
      'google-auth',
      'width=500,height=600'
    )

    window.addEventListener('message', (event) => {
      if (event.origin !== import.meta.env.VITE_API_URL) return
      if (event.data?.accessToken) {
        resolve(event.data)
        popup?.close()
      } else {
        reject(new Error('Error al autenticar con Google'))
        popup?.close()
      }
    }, { once: true })
  })
}