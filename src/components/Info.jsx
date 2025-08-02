import useApi from "../hooks/useApi"
import { useEffect, useState } from "react"
// images
import ProfileImage from "../assets/Profile-img.svg"
// icons
import { FaTelegram, FaGithub } from "react-icons/fa"
import { GoDownload } from "react-icons/go"
import { MdOutlineMail } from "react-icons/md"
import { FiLinkedin } from "react-icons/fi"
// skeleton
import InfoSkeleton from "../components/skeletons/InfoSkeleton"

const Info = () => {
  const { request, loading, error } = useApi()
  const [info, setInfo] = useState(null)
  const [social, setSocial] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await request({
        url: `${import.meta.env.VITE_API}/profile/info`,
        method: "GET",
      })

      if (result?.success) {
        setInfo(result.data)
      }
    }

    const fetchSocialNetworks = async () => {
      const result = await request({
        url: `${import.meta.env.VITE_API}/social-networks`,
        method: "GET",
      })

      if (result?.success) {
        setSocial(result.data)
      }
    }

    fetchData()
    fetchSocialNetworks()
  }, [])

  const cloudBaseUrl = `${import.meta.env.VITE_CLOUDINARY_URL}`
  const imageUrl = info?.image ? cloudBaseUrl + info.image : ProfileImage

  if (loading || !info || !social) return <InfoSkeleton />
  if (error) return <p className="text-red-500">{error.message}</p>

  return (
    <>
      {/* Profile image & text */}
      <div className="flex gap-6 items-center sm:items-start text-left">
        <div className="w-[110px] h-[110px] min-w-[110px] min-h-[110px] rounded-full border-4 border-[#FBD144] overflow-hidden flex items-center justify-center">
          <img
            className="w-full h-full object-cover"
            src={imageUrl}
            alt="Profile"
          />
        </div>
        <div className="text-xs sm:text-base text-base/10">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            {info.full_name}
          </h1>
          <p className="text-[#555555] dark:text-white text-xs sm:text-base">
            {info.role}
          </p>
          <div className="text-xl sm:text-2xl flex gap-4 text-[#555555] dark:text-white mt-2">
            <a href={social.telegram_link} target="_blank" rel="noreferrer">
              <FaTelegram />
            </a>
            <a href={social.github_link} target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-around gap-4 text-center">
        <p className="flex flex-col items-center">
          <span className="text-xl">{info.experience}+</span>
          Years of Experience
        </p>
        <p className="flex flex-col items-center">
          <span className="text-xl">{info.satisfied_clients}+</span>
          Satisfied Clients
        </p>
        <p className="flex flex-col items-center">
          <span className="text-xl">{info.completed_projects}+</span>
          Completed Projects
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center text-md font-medium gap-4 sm:gap-6">
        <button className="bg-[#FBD144] hover:bg-[#e5bc29] active:bg-[#cfae1e] text-black dark:text-[#171F26] h-[56px] w-full sm:w-[464px] flex items-center justify-center gap-2 rounded-[8px] cursor-pointer">
          Download CV
          <GoDownload size={22} />
        </button>
        <div className="flex gap-4 justify-center">
          <a
            href={`mailto:${social.email_link}`}
            target="_blank"
            rel="noreferrer"
            className="w-[68px] h-[56px] bg-white dark:bg-[#171F26] dark:text-white flex items-center justify-center rounded-[8px]"
          >
            <MdOutlineMail size={20} />
          </a>
          <a
            href={social.linkedin_link}
            target="_blank"
            rel="noreferrer"
            className="w-[68px] h-[56px] bg-white dark:bg-[#171F26] dark:text-white flex items-center justify-center rounded-[8px]"
          >
            <FiLinkedin size={20} />
          </a>
        </div>
      </div>
    </>
  )
}

export default Info
