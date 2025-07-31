import { useState } from "react";
import useApi from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";
// icons
import { IoMdArrowRoundBack } from "react-icons/io";
// component
import SkillsList from '../../components/admin/SkillsList'

const Education = () => {
  const token = localStorage.getItem('token')

  const { request, loading, error } = useApi()

  const [bgColor, setBgColor] = useState('')
  const [title, setTitle] = useState('')
  const [projects, setProjects] = useState('')
  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("No file chosen")
  const [reload, setReload] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('back_color', bgColor)
    formData.append('projects', projects)
    formData.append('image', image)

    try {
      const result = await request({
        url: `${import.meta.env.VITE_API}/skills`,
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (result?.success) {
        setBgColor('')
        setTitle('')
        setProjects('')
        setFileName("No file chosen")
        setReload((prev) => !prev)
      }
    } catch(err) {
      alert(`Ma'lumot yuborishda xatolik: ${err.message}`);
      console.log(`Error: ${err.message}`);
    }
  }
  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen px-4 space-y-10">
        {/* O'rtadagi back tugmasi */}
        <button
          onClick={() => navigate(-1)}
          className="w-[56px] h-[56px] cursor-pointer bg-[#FBD144] hover:bg-[#e5bc29] active:bg-[#cfae1e] flex items-center justify-center rounded-full drop-shadow-xl text-[#171F26] transition"
        >
          <IoMdArrowRoundBack size={22} />
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#171F26] rounded-xl shadow-lg p-8 space-y-6 w-full sm:w-[450px]">
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
            New skill
          </h2>

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
            <label className="mb-1 text-gray-700 dark:text-white">
              Title
            </label>
            <input
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f2937] text-black dark:text-white outline-none h-[40px] rounded-lg pl-4 py-1 focus:ring-2 focus:ring-blue-500"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 dark:text-white">
              Background color
            </label>
            <input
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f2937] text-black dark:text-white outline-none h-[40px] rounded-lg pl-4 py-1 focus:ring-2 focus:ring-blue-500"
              type="text"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 dark:text-white">
              Projects (2)
            </label>
            <input
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f2937] text-black dark:text-white outline-none h-[40px] rounded-lg pl-4 py-1 focus:ring-2 focus:ring-blue-500"
              type="text"
              value={projects}
              onChange={(e) => setProjects(e.target.value)}
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
            <p className="text-red-500 mt-3 text-center text-sm">
              {error.error}
            </p>
          )}
        </form>
      </section>
      <SkillsList reload={reload} setReload={setReload} />
    </>
  );
};

export default Education;
