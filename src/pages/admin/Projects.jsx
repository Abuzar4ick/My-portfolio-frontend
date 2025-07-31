import { useNavigate } from "react-router-dom"
import { useState } from "react"
import useApi from "../../hooks/useApi"
// icons
import { IoMdArrowRoundBack } from "react-icons/io"
// components
import ProjectList from "../../components/admin/ProjectList"

const Projects = () => {
  const [title, setTitle] = useState("")
  const [role, setRole] = useState("")
  const [stackInput, setStackInput] = useState("")
  const [overview, setOverview] = useState("")
  const [challenge, setChallenge] = useState("")
  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("No file chosen")
  const [reload, setReload] = useState(false)

  const navigate = useNavigate()

  const { request, loading, error } = useApi()

  const token = localStorage.getItem("token")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const splittedStack = stackInput.split(/[,\s]+/).map(s => s.trim()).filter(Boolean)

    const formData = new FormData()
    formData.append("title", title)
    formData.append("role", role)
    formData.append("overview", overview)
    formData.append("challenge", challenge)
    formData.append("image", image)
    formData.append("stack", JSON.stringify(splittedStack))

    try {
      const result = await request({
        url: `${import.meta.env.VITE_API}/projects`,
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (result?.success) {
        alert("Project successfully uploaded!")
        setTitle("")
        setRole("")
        setStackInput("")
        setOverview("")
        setChallenge("")
        setImage(null)
        setFileName("No file chosen")
        setReload((prev) => !prev)
      } else {
        alert("Failed to upload project.")
      }
    } catch (err) {
      console.error(err)
      alert("An error occurred while uploading.")
    }
  }
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 space-y-10">
      <button
        onClick={() => navigate(-1)}
        className="top-6 left-4 w-[48px] h-[48px] cursor-pointer bg-[#FBD144] hover:bg-[#e5bc29] active:bg-[#cfae1e] flex items-center justify-center rounded-full drop-shadow-xl text-[#171F26] transition"
      >
        <IoMdArrowRoundBack size={20} />
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#171F26] rounded-xl shadow-lg p-8 space-y-6 w-full sm:w-[450px]"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
          New project
        </h2>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-white">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f2937] text-black dark:text-white outline-none h-[40px] rounded-lg pl-4 py-1 focus:ring-2 focus:ring-blue-500"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-white">Stack</label>
          <input
            value={stackInput}
            onChange={(e) => setStackInput(e.target.value)}
            placeholder="e.g. Node.js, Express, PostgreSQL"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f2937] text-black dark:text-white outline-none h-[40px] rounded-lg pl-4 py-1 focus:ring-2 focus:ring-blue-500"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-white">Image</label>

          <div className="flex items-center gap-4">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              required
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0]
                if (file) {
                  if (file.size > 5 * 1024 * 1024) {
                    alert("File is too large! Max 5MB allowed.")
                    return
                  }
                  setFileName(file.name)
                  setImage(file)
                } else {
                  setFileName("No file chosen")
                  setImage(null)
                }
              }}
            />

            <label
              htmlFor="image-upload"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition"
            >
              Upload
            </label>

            <span className="text-sm text-gray-500 dark:text-gray-400">
              {fileName}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-white">Role</label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Backend Developer"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f2937] text-black dark:text-white outline-none h-[40px] rounded-lg pl-4 py-1 focus:ring-2 focus:ring-blue-500"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-white">Overview</label>
          <textarea
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            placeholder="Short description of the project"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f2937] text-black dark:text-white outline-none min-h-[40px] rounded-lg pl-4 py-1 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-white">
            Challenge
          </label>
          <textarea
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
            placeholder="What was challenging in the project?"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f2937] text-black dark:text-white outline-none min-h-[40px] rounded-lg pl-4 py-1 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 font-semibold disabled:opacity-50"
        >
          {loading ? "Loading..." : "Create"}
        </button>

        {error && (
          <p className="text-red-500 mt-3 text-center text-sm">{error.error}</p>
        )}
      </form>

      <ProjectList reload={reload} setReload={setReload} />
    </section>
  )
}

export default Projects