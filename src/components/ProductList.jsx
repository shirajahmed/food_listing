import ProductCard from "./ProductCard";
import SkeletonLoader from "./SkeletonLoader";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const ProductList = ({
  pages,
  fetchNextPage,
  hasNextPage,
  isLoading,
  isFetchingNextPage,
}) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  console.log("pages", pages, inView, isLoading);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pages?.map((page) =>
        page.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}

      {(isLoading || isFetchingNextPage) && <SkeletonLoader count={6} />}

      <div ref={ref} className="h-10 col-span-full" />
    </div>
  );
};

export default ProductList;
