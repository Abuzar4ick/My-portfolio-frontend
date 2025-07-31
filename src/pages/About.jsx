import useApi from "../hooks/useApi"
import { useEffect, useState } from "react"
import BioSkeleton from "../components/skeletons/BioSkeleton"
import WorkSkeleton from "../components/skeletons/WorkSkeleton"
import EduSkeleton from "../components/skeletons/EduSkeleton"
import HardSkills from '../components/HardSkills'
import SoftSkills from '../components/SoftSkills'

const About = () => {
  const { request, loading, error } = useApi()
  const [bio, setBio] = useState(null)
  const [educations, setEducation] = useState([])
  const [workExperiences, setWorkExperience] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await request({
        url: `${import.meta.env.VITE_API}/profile/info`,
        method: "GET"
      })

      if (result?.success) {
        setBio(result.data.bio)
      }
    }

    const fetchEducation = async () => {
      const result = await request({
        url: `${import.meta.env.VITE_API}/education`,
        method: "GET"
      })

      if (result?.success) {
        setEducation(result.data)
      }
    }

    const fetchWorkExperience = async () => {
      const result = await request({
        url: `${import.meta.env.VITE_API}/work-experience`,
        method: "GET"
      })

      if (result?.success) {
        setWorkExperience(result.data)
      }
    }

    fetchData()
    fetchEducation()
    fetchWorkExperience()
  }, [])

  return (
    <section className="px-4 sm:px-6 lg:px-8 grid gap-y-10 text-[#171F26] dark:text-white">
      {loading ? (
        <BioSkeleton />
      ) : error ? (
        <p className="text-red-500">{error.message}</p>
      ) : (
        <p>{bio}</p>
      )}

      <div className="grid gap-y-4">
        <h1 className="text-[32px] font-semibold">Work Experience</h1>
        {loading ? (
          [1, 2].map((i) => <WorkSkeleton key={i} />)
        ) : error ? (
          <p className="text-red-500">{error.message}</p>
        ) : (
          workExperiences.map((workExperience) => (
            <div key={workExperience._id} className="grid gap-y-4">
              <h2 className="text-[24px] font-semibold">{workExperience.role}</h2>
              <div className="grid gap-y-2">
                <h3 className="flex gap-3 items-center font-medium">
                  <span className="bg-[#FBD144] text-[#171F26] px-[8px] py-[3px] rounded-[5px] text-[12px] font-medium">
                    {workExperience.time_length}
                  </span>
                  {workExperience.company_name} / {workExperience.country}
                </h3>
                <p>{workExperience.description}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="grid gap-y-4">
        <h1 className="text-[32px] font-semibold">Education</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-5">
          {loading ? (
            [1, 2].map((i) => <EduSkeleton key={i} />)
          ) : error ? (
            <p className="text-red-500">{error.message}</p>
          ) : (
            educations.map((education) => (
              <div key={education._id}>
                <span className="bg-[#FBD144] text-[#171F26] px-[8px] py-[3px] rounded-[5px] text-[12px] font-medium inline-block">
                  {education.time_length}
                </span>
                <h2 className="text-[24px] font-semibold mt-2">{education.role}</h2>
                <p>{education.place_name}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="grid gap-y-4">
        <h1 className="text-[32px] font-semibold">Hard Skills</h1>
        <HardSkills />
      </div>

      <div className="grid gap-y-4">
        <h1 className="text-[32px] font-semibold">Soft Skills</h1>
        <SoftSkills />
      </div>
    </section>
  )
}

export default About
