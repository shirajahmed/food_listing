const Skeleton = ({ className, ...props }) => (
  <div
    className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${className}`}
    {...props}
  />
);

export { Skeleton };
