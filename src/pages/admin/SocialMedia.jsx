import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import useApi from "../../hooks/useApi";
// icons
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaGithub, FaTelegram, FaInstagramSquare, FaYoutube, FaLinkedin } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

const SocialMedia = () => {
  const token = localStorage.getItem("token");
  const { request, loading, error } = useApi();
  const navigate = useNavigate();

  const [gitHub, setGitHub] = useState('');
  const [telegram, setTelegram] = useState('');
  const [instagram, setInstagram] = useState('');
  const [youtube, setYoutube] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');

  const initialData = useRef({});

  useEffect(() => {
    (async () => {
      const result = await request({
        url: `${import.meta.env.VITE_API}/social-networks`
      });

      if (result?.success) {
        const data = result.data;
        setGitHub(data.github_link || '');
        setTelegram(data.telegram_link || '');
        setInstagram(data.instagram_link || '');
        setYoutube(data.youtube_link || '');
        setEmail(data.email_link || '');
        setLinkedin(data.linkedin_link || '');

        initialData.current = {
          github_link: data.github_link || '',
          telegram_link: data.telegram_link || '',
          instagram_link: data.instagram_link || '',
          youtube_link: data.youtube_link || '',
          email_link: data.email_link || '',
          linkedin_link: data.linkedin_link || '',
        };
      }
    })();
  }, []);

  const isChanged =
    gitHub !== initialData.current.github_link ||
    telegram !== initialData.current.telegram_link ||
    instagram !== initialData.current.instagram_link ||
    youtube !== initialData.current.youtube_link ||
    email !== initialData.current.email_link ||
    linkedin !== initialData.current.linkedin_link;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      github_link: gitHub,
      telegram_link: telegram,
      instagram_link: instagram,
      youtube_link: youtube,
      email_link: email,
      linkedin_link: linkedin
    };

    try {
      const result = await request({
        url: `${import.meta.env.VITE_API}/social-networks`,
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result?.success) {
        initialData.current = { ...formData };

        setGitHub('');
        setTelegram('');
        setInstagram('');
        setYoutube('');
        setEmail('');
        setLinkedin('');
      }
    } catch (err) {
      alert(`Ma'lumot yuborishda xatolik: ${err.message}`);
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen px-4 space-y-10">
      <button
        onClick={() => navigate(-1)}
        className="w-[56px] h-[56px] cursor-pointer bg-[#FBD144] hover:bg-[#e5bc29] active:bg-[#cfae1e] flex items-center justify-center rounded-full drop-shadow-xl text-[#171F26] transition"
      >
        <IoMdArrowRoundBack size={22} />
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#171F26] rounded-xl shadow-lg p-8 space-y-6 w-full sm:w-[450px]"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
          Social networks
        </h2>

        {[
          { icon: <FaGithub />, label: "Github", value: gitHub, setValue: setGitHub },
          { icon: <FaTelegram />, label: "Telegram", value: telegram, setValue: setTelegram },
          { icon: <FaInstagramSquare />, label: "Instagram", value: instagram, setValue: setInstagram },
          { icon: <FaYoutube />, label: "Youtube", value: youtube, setValue: setYoutube },
          { icon: <MdOutlineMail />, label: "Email", value: email, setValue: setEmail },
          { icon: <FaLinkedin />, label: "Linkedin", value: linkedin, setValue: setLinkedin },
        ].map(({ icon, label, value, setValue }) => (
          <div key={label} className="flex flex-col">
            <label className="mb-1 text-gray-700 dark:text-white flex items-center gap-1">
              {icon} {label}
            </label>
            <input
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f2937] text-black dark:text-white outline-none h-[40px] rounded-lg pl-4 py-1 focus:ring-2 focus:ring-blue-500"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={loading && "Loading..."}
              required
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading || !isChanged}
          className={`w-full py-2 rounded-md font-semibold transition duration-200
            ${isChanged ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
            ${loading && "opacity-50"}
          `}
        >
          {loading ? "Loading..." : "Update"}
        </button>

        {error && (
          <p className="text-red-500 mt-3 text-center text-sm">
            {error.error}
          </p>
        )}
      </form>
    </section>
  );
};

export default SocialMedia;
