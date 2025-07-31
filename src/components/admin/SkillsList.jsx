import useApi from "../../hooks/useApi";
import { useState, useEffect } from "react";
// icons
import { FaRegTrashAlt } from "react-icons/fa";

const SkillsList = ({ reload, setReload }) => {
  const { request, loading, error } = useApi();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await request({
        url: `${import.meta.env.VITE_API}/skills`,
      });

      if (result?.success) {
        setSkills(result.data);
      }
    })();
  }, [reload]);

  const deleteProject = async (id) => {
    const confirmDelete = confirm("Rostdan ham o'chirmoqchimisiz?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    const result = await request({
      url: `${import.meta.env.VITE_API}/skills/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (result?.success) {
      setReload((prev) => !prev);
    }
  };

  const cloudBaseUrl = "https://res.cloudinary.com/dbbg33z9v/image/upload/";

  return (
    <div className="px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center dark:text-white">
        My skills 🧑‍🔧
      </h1>

      {loading && <p className="text-center">Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {!loading &&
          !error &&
          skills.map((skill) => {
            const imageUrl = skill.image
              ? cloudBaseUrl + skill.image
              : "https://via.placeholder.com/300x220?text=No+Image";

            return (
              <div
                key={skill._id}
                className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col items-center gap-4 hover:scale-[1.02] transition-transform duration-200"
              >
                <button
                  onClick={() => deleteProject(skill._id)}
                  className="absolute right-2 top-2 w-[36px] h-[36px] rounded-full text-white bg-red-500 hover:bg-red-600 flex items-center justify-center shadow"
                >
                  <FaRegTrashAlt size={16} />
                </button>

                <div
                  style={{ backgroundColor: skill.back_color }}
                  className="p-3 w-[100px] h-[100px] rounded-full flex items-center justify-center"
                >
                  <img
                    src={imageUrl}
                    alt={skill.name}
                    className="w-[70px] h-[70px] object-contain rounded-full"
                  />
                </div>

                <div className="text-center space-y-1">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {skill.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Projects: {skill.projects}+
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Color: <span className="font-mono">{skill.back_color}</span>
                  </p>
                </div>
              </div>
            );
          })}
      </div>

      {!loading && skills.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No content :(</p>
      )}
    </div>
  );
};

export default SkillsList;
