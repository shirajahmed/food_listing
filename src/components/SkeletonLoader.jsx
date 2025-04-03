import { Skeleton } from "./ui/skeleton";

const SkeletonLoader = ({ count = 1 }) => {
  if (count === 1) {
    return (
      <div className="flex container mx-auto p-4 max-w-4xl flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Skeleton className="w-full h-64 rounded-lg shadow-md" />
        </div>
        <div className="md:w-2/3">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-4" />

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>

          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-4 w-full mb-4" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return Array(count)
    .fill(0)
    .map((_, i) => (
      <div
        key={i}
        className="rounded-lg shadow-md p-4 bg-white dark:bg-gray-800"
      >
        <Skeleton className="h-48 w-full rounded mb-4" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    ));
};

export default SkeletonLoader;
