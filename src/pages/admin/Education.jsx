import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useApi from "../../hooks/useApi";
// icons
import { IoMdArrowRoundBack } from "react-icons/io";
// component
import EducationList from "../../components/admin/EducationList";

const Education = () => {
  const token = localStorage.getItem("token");

  const { request, loading, error } = useApi();

  const [timeLength, setTimeLength] = useState("");
  const [role, setRole] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      time_length: timeLength,
      role,
      place_name: placeName,
    };

    try {
      const result = await request({
        url: `${import.meta.env.VITE_API}/education`,
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result?.success) {
        setTimeLength("");
        setRole("");
        setPlaceName("");
        setReload((prev) => !prev);
      }
    } catch (err) {
      alert(`Ma'lumot yuborishda xatolik: ${err.message}`);
      console.log(`Error: ${err.message}`);
    }
  };

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
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#171F26] rounded-xl shadow-lg p-8 space-y-6 w-full sm:w-[450px]"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
            Education Info
          </h2>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 dark:text-white">
              Time length
            </label>
            <input
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f2937] text-black dark:text-white outline-none h-[40px] rounded-lg pl-4 py-1 focus:ring-2 focus:ring-blue-500"
              type="text"
              value={timeLength}
              onChange={(e) => setTimeLength(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 dark:text-white">Role</label>
            <input
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f2937] text-black dark:text-white outline-none h-[40px] rounded-lg pl-4 py-1 focus:ring-2 focus:ring-blue-500"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 dark:text-white">
              Place name
            </label>
            <input
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f2937] text-black dark:text-white outline-none h-[40px] rounded-lg pl-4 py-1 focus:ring-2 focus:ring-blue-500"
              type="text"
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
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
      <EducationList reload={reload} setReload={setReload} />
    </>
  );
};

export default Education;
