import Skeleton from "./Skeleton";

const ProjectDetailSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-10 px-4 sm:px-8">
      {/* Back button (top) */}
      <Skeleton className="w-[56px] h-[56px] rounded-full" />

      {/* Title & description */}
      <div className="text-center flex flex-col gap-y-4 w-full max-w-[400px]">
        <Skeleton className="h-6 w-3/4 mx-auto rounded" />
        <Skeleton className="h-4 w-1/2 mx-auto rounded" />
        <div className="flex flex-wrap gap-2 justify-center">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-16 h-6 rounded" />
          ))}
        </div>
      </div>

      {/* Image */}
      <Skeleton className="w-full max-w-[652px] h-[220px] rounded-[18px]" />

      {/* Overview & Challenge */}
      <div className="flex flex-col gap-y-10 max-w-[720px] w-full">
        <div>
          <Skeleton className="h-6 w-1/3 mb-2 rounded" />
          <Skeleton className="h-4 w-full mb-1 rounded" />
          <Skeleton className="h-4 w-5/6 mb-1 rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>

        <div>
          <Skeleton className="h-6 w-1/3 mb-2 rounded" />
          <Skeleton className="h-4 w-full mb-1 rounded" />
          <Skeleton className="h-4 w-5/6 mb-1 rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <Skeleton className="w-[132px] h-[56px] rounded-[8px]" />
        <Skeleton className="w-[132px] h-[56px] rounded-[8px]" />
      </div>
    </div>
  );
};

export default ProjectDetailSkeleton;