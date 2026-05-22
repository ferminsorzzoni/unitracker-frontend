export default function GoogleAuthButton() {
  return (
    <a
      href={`${import.meta.env.VITE_API_URL}/auth/google`}
      className="w-full py-2 border border-gray-mid rounded-lg text-sm font-medium text-gray-dark hover:bg-gray-light transition-colors flex items-center justify-center gap-2"
    >
      <img src="/logos/google.svg" alt="" className="w-4 h-4" />
      Continuar con Google
    </a>
  )
}