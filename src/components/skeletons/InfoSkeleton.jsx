import Skeleton from "./Skeleton"

const InfoSkeleton = () => {
  return (
    <div className="grid gap-6">
      <div className="flex gap-6 items-center sm:items-start">
        <div className="w-[110px] h-[110px] min-w-[110px] min-h-[110px] rounded-full border-4 border-[#FBD144] overflow-hidden flex items-center justify-center">
          <Skeleton className="w-full h-full rounded-full" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <div className="flex gap-4 mt-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
        </div>
      </div>

      <div className="flex justify-around gap-4 text-center">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 sm:gap-6">
        <Skeleton className="h-[56px] w-full sm:w-[464px] rounded-[8px]" />
        <div className="flex gap-4">
          <Skeleton className="w-[56px] h-[56px] rounded-[8px]" />
          <Skeleton className="w-[56px] h-[56px] rounded-[8px]" />
        </div>
      </div>
    </div>
  )
}

export default InfoSkeleton
