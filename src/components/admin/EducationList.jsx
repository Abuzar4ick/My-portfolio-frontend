import useApi from "../../hooks/useApi";
import { useState, useEffect } from "react";
// icons
import { FaRegTrashAlt } from "react-icons/fa";

const EducationList = ({ reload, setReload }) => {
  const token = localStorage.getItem("token");

  const { request, loading, error } = useApi();

  const [educations, setEducations] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await request({
        url: `${import.meta.env.VITE_API}/education`,
      });

      if (result?.success) {
        setEducations(result.data);
      }
    })();
  }, [reload]);

  const deleteProject = async (id) => {
    const confirmDelete = confirm("Rostdan ham o'chirmoqchimisiz?");
    if (!confirmDelete) return;

    const result = await request({
      url: `${import.meta.env.VITE_API}/education/${id}`,
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
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center dark:text-white">
        My certificates
      </h1>
      {loading && <p className="text-center">Loading...</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 gap-y-6 mt-8">
        {!loading &&
          !error &&
          educations.map((education) => (
            <div key={education._id} className="border p-4 relative rounded-lg">
              <button
                onClick={() => deleteProject(education._id)}
                className="absolute right-1 top-1 w-[40px] h-[40px] rounded-lg text-white cursor-pointer bg-red-500 hover:bg-red-600 active:text-red-700 flex items-center justify-center"
              >
                <FaRegTrashAlt />
              </button>
              <span className="bg-[#FBD144] text-[#171F26] px-[8px] py-[3px] rounded-[5px] text-[12px] font-medium inline-block">
                {education.time_length}
              </span>
              <h2 className="text-[24px] font-semibold mt-2">
                {education.role}
              </h2>
              <p>{education.place_name}</p>
            </div>
          ))}
      </div>
      {!loading && educations.length === 0 && (
        <p className="text-center">No content :(</p>
      )}
    </div>
  );
};

export default EducationList;
