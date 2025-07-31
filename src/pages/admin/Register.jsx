import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useApi from '../../hooks/useApi'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { request, loading, error } = useApi()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await request({
      url: `${import.meta.env.VITE_API}/admin-register`,
      method: 'POST',
      body: { username, password },
    })

    setUsername('')
    setPassword('')

    if (result?.success) {
      localStorage.setItem('token', result.token)
      navigate('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-[#171F26] p-8 rounded-xl shadow-xl"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
          Admin Register
        </h2>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Admin username
          </label>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full h-11 px-4 rounded-md bg-gray-100 dark:bg-[#1E2A34] dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-[#1E2A34] transition-all duration-200 ease-in-out"
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Admin password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder={showPassword ? 'password' : '••••••••'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-11 px-4 pr-10 rounded-md bg-gray-100 dark:bg-[#1E2A34] dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-[#1E2A34] transition-all duration-200 ease-in-out"
          />
          <div
            className="absolute top-10 right-3 text-gray-500 hover:text-gray-700 cursor-pointer dark:text-gray-400 dark:hover:text-gray-200"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEyeOutline size={18} /> : <IoEyeOffOutline size={18} />}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 font-semibold disabled:opacity-50"
        >
          {loading ? "Loading..." : "Register"}
        </button>
        {error && <p className="text-red-500 mt-3 text-center text-sm">{error.error}</p>}
      </form>
    </div>
  )
}

export default Register
