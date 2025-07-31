import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
// icon
import { FaRegTrashAlt } from "react-icons/fa";

const ExperienceList = ({ reload, setReload }) => {
  const token = localStorage.getItem("token");
  const { request, loading, error } = useApi();
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await request({
        url: `${import.meta.env.VITE_API}/work-experience`,
      });

      if (result?.success) {
        setExperiences(result.data);
      }
    })();
  }, [reload]);

  const deleteProject = async (id) => {
    const confirmDelete = confirm("Rostdan ham o'chirmoqchimisiz?");
    if (!confirmDelete) return;

    const result = await request({
      url: `${import.meta.env.VITE_API}/work-experience/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (result?.success) {
      setReload((prev) => !prev);
    }
  };
  return (
    <div className="grid gap-y-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center dark:text-white">
        My work experience 👨‍💻
      </h1>
      {!loading &&
        !error &&
        experiences.map((experience) => (
          <div
            key={experience._id}
            className="grid gap-y-4 border p-4 relative rounded-lg"
          >
            <button
              onClick={() => deleteProject(experience._id)}
              className="absolute right-1 top-1 w-[40px] h-[40px] text-white rounded-lg cursor-pointer bg-red-500 hover:bg-red-600 active:text-red-700 flex items-center justify-center"
            >
              <FaRegTrashAlt />
            </button>
            <h2 className="text-[24px] font-semibold">{experience.role}</h2>
            <div className="grid gap-y-2">
              <h3 className="flex gap-3 items-center font-medium">
                <span className="bg-[#FBD144] text-[#171F26] px-[8px] py-[3px] rounded-[5px] text-[12px] font-medium">
                  {experience.time_length}
                </span>
                {experience.company_name} / {experience.country}
              </h3>
              <p>{experience.description}</p>
            </div>
          </div>
        ))}
      {loading && <p className="text-center">Loading...</p>}
      {!loading && experiences.length === 0 && (
        <p className="text-center">No content :(</p>
      )}
    </div>
  );
};

export default ExperienceList;
