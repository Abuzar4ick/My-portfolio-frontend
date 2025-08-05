import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useApi from "../../hooks/useApi";
// icon
import { IoMdArrowRoundBack } from "react-icons/io";
// component
import Profile from "../../components/admin/ProfileInfo";

const ProfileInfo = () => {
  const token = localStorage.getItem("token");
  const { request, loading, error } = useApi();

  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [satisfiedClients, setSatisfiedClients] = useState("");
  const [completedProjects, setCompletedProjects] = useState("");
  const [bio, setBio] = useState("");
  const [fileName, setFileName] = useState("No file chosen");
  const [image, setImage] = useState(null);
  const [reload, setReload] = useState(false);

  const initialData = useRef({});

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const result = await request({
        url: `${import.meta.env.VITE_API}/profile/info`,
      });

      if (result?.success) {
        const data = result.data;
        setFullName(data.full_name || "");
        setRole(data.role || "");
        setExperience(data.experience || "");
        setSatisfiedClients(data.satisfied_clients || "");
        setCompletedProjects(data.completed_projects || "");
        setBio(data.bio || "");

        initialData.current = {
          full_name: data.full_name || "",
          role: data.role || "",
          experience: data.experience || "",
          satisfied_clients: data.satisfied_clients || "",
          completed_projects: data.completed_projects || "",
          bio: data.bio || "",
        };
      }
    })();
  }, []);

  const isChanged =
    fullName !== initialData.current.full_name ||
    role !== initialData.current.role ||
    experience !== initialData.current.experience ||
    satisfiedClients !== initialData.current.satisfied_clients ||
    completedProjects !== initialData.current.completed_projects ||
    bio !== initialData.current.bio;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("full_name", fullName);
    formData.append("role", role);
    formData.append("experience", experience);
    formData.append("satisfied_clients", satisfiedClients);
    formData.append("completed_projects", completedProjects);
    formData.append("bio", bio);
    formData.append("image", image);

    try {
      const result = await request({
        url: `${import.meta.env.VITE_API}/profile/info`,
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result?.success) {
        initialData.current = {
          full_name: fullName,
          role: role,
          experience: experience,
          satisfied_clients: satisfiedClients,
          completed_projects: completedProjects,
          bio: bio,
        };

        setFullName("");
        setRole("");
        setExperience("");
        setSatisfiedClients("");
        setCompletedProjects("");
        setBio("");
        setImage(null);
        setFileName("No file chosen");
        setReload((prev) => !prev);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while uploading.");
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 space-y-10">
      <button
        onClick={() => navigate(-1)}
        className="top-6 left-4 w-[56px] h-[56px] cursor-pointer bg-[#FBD144] hover:bg-[#e5bc29] active:bg-[#cfae1e] flex items-center justify-center rounded-full drop-shadow-xl text-[#171F26] transition"
      >
        <IoMdArrowRoundBack size={20} />
      </button>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#171F26] rounded-xl shadow-lg p-8 space-y-6 w-full sm:w-[450px]"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
          Profile Info
        </h2>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-white">
            Full name
          </label>
          <input
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f2937] text-black dark:text-white outline-none h-[40px] rounded-lg pl-4 py-1 focus:ring-2 focus:ring-blue-500"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
          <label className="mb-1 text-gray-700 dark:text-white">Image</label>

          <div className="flex items-center gap-4">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              required
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  if (file.size > 5 * 1024 * 1024) {
                    alert("File is too large! Max 5MB allowed.");
                    return;
                  }
                  setFileName(file.name);
                  setImage(file);
                } else {
                  setFileName("No file chosen");
                  setImage(null);
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
            Experience (years)
          </label>
          <input
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f2937] text-black dark:text-white outline-none h-[40px] rounded-lg pl-4 py-1 focus:ring-2 focus:ring-blue-500"
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-white">
            Satisfied clients
          </label>
          <input
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f2937] text-black dark:text-white outline-none h-[40px] rounded-lg pl-4 py-1 focus:ring-2 focus:ring-blue-500"
            type="text"
            value={satisfiedClients}
            onChange={(e) => setSatisfiedClients(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-white">
            Completed projects
          </label>
          <input
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f2937] text-black dark:text-white outline-none h-[40px] rounded-lg pl-4 py-1 focus:ring-2 focus:ring-blue-500"
            type="text"
            value={completedProjects}
            onChange={(e) => setCompletedProjects(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-white">Bio</label>
          <textarea
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f2937] text-black dark:text-white outline-none min-h-[40px] max-h-[400px] rounded-lg pl-4 py-1 focus:ring-2 focus:ring-blue-500"
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !isChanged}
          className={`w-full py-2 rounded-md font-semibold transition duration-200
            ${
              isChanged
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
            ${loading && "opacity-50"}
          `}
        >
          {loading ? "Loading..." : "Update"}
        </button>

        {error && (
          <p className="text-red-500 mt-3 text-center text-sm">{error.error}</p>
        )}
      </form>

      <Profile reload={reload} setReload={setReload} />
    </section>
  );
};

export default ProfileInfo;
