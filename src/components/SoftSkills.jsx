import useApi from '../hooks/useApi'
import { useEffect, useState } from 'react'
import SoftSkillsSkeleton from './skeletons/SoftSkillsSkeleton'

const SoftSkills = () => {
    const { request, loading, error } = useApi()
    const [skills, setSkills] = useState([])

    useEffect(() => {
        (async () => {
            const result = await request({
                url: `${import.meta.env.VITE_API}/soft-skills`
            })

            if (result?.success) {
                setSkills(result.data)
            }
        })()
    }, [])

    if (loading) return <SoftSkillsSkeleton />
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-4'>
      {!loading &&
        !error &&
        skills.map((skill) => (
            <p key={skill._id} className='text-[24px] font-semibold'>{skill.title}</p>
        ))}
    </div>
  )
}

export default SoftSkills
