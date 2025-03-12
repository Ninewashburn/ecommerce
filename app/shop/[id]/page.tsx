import { Suspense } from "react";
import ProductDetail from "@/components/products/product-detail";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Attendre les paramètres avant d'y accéder
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetail id={productId} />
    </Suspense>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 aspect-square bg-muted animate-pulse rounded-lg"></div>
        <div className="md:w-1/2 space-y-4">
          <div className="h-8 bg-muted animate-pulse rounded w-3/4"></div>
          <div className="h-6 bg-muted animate-pulse rounded w-1/4"></div>
          <div className="h-24 bg-muted animate-pulse rounded"></div>
          <div className="h-10 bg-muted animate-pulse rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
}
