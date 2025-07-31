import { useState, useEffect } from "react"
import useApi from "../../hooks/useApi";
// icons
import { FaRegTrashAlt } from "react-icons/fa";

const SoftSkillsList = ({ reload, setReload }) => {
  const token = localStorage.getItem('token')
  const { request, loading, error } = useApi()
  const [softSkills, setSoftSkills] = useState([])

  useEffect(() => {
    (async () => {
      const result = await request({
        url: `${import.meta.env.VITE_API}/soft-skills`
      })

      if (result?.success) {
        setSoftSkills(result.data)
      }
    })()
  }, [reload])

  const deleteProject = async (id) => {
    const confirmDelete = confirm("Rostdan ham o'chirmoqchimisiz?")
    if (!confirmDelete) return

    const result = await request({
      url: `${import.meta.env.VITE_API}/soft-skills/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    if (result?.success) {
      setReload((prev) => !prev);
    }
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">🧠 Soft Skills</h3>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      <div className="grid gap-6">
        {!loading && !error && softSkills.map((softSkill) => (
          <div
            key={softSkill._id}
            className="relative w-full bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-600 rounded-xl shadow-md p-5 transition hover:shadow-xl flex justify-between items-center"
          >
            <p className="text-lg font-medium text-gray-800 dark:text-white">{softSkill.title}</p>
            <button
              onClick={() => deleteProject(softSkill._id)}
              className="w-9 h-9 rounded-full text-white bg-red-500 hover:bg-red-600 active:scale-95 transition flex items-center justify-center"
              title="Delete"
            >
              <FaRegTrashAlt size={16} />
            </button>
          </div>
        ))}
      </div>

      {!loading && softSkills.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No content :(</p>
      )}
    </div>
  )
}

export default SoftSkillsList
