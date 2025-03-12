import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import FeaturedProducts from "@/components/featured-products";
import CategoryShowcase from "@/components/category-showcase";
import Newsletter from "@/components/newsletter";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Section Héro */}
      <section className="relative h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Image d'accueil"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Découvrez Votre Style
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Explorez notre collection soigneusement sélectionnée de produits
              premium conçus pour un mode de vie moderne.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="bg-black hover:bg-black-700 text-white px-6 py-3 rounded-md font-medium inline-flex items-center justify-center"
              >
                Acheter Maintenant <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="bg-white hover:bg-white/90 text-black px-6 py-3 rounded-md font-medium inline-flex items-center justify-center"
              >
                En Savoir Plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Produits Vedettes */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              Produits Vedettes
            </h2>
            <Link
              href="/shop"
              className="text-primary hover:underline font-medium inline-flex items-center"
            >
              Voir Tout <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Présentation des Catégories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Acheter par Catégorie
          </h2>
          <CategoryShowcase />
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Ce Que Disent Nos Clients
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-background p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "La qualité des produits a dépassé mes attentes. Livraison
                  rapide et service client excellent !"
                </p>
                <div className="font-medium">Client {i}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Newsletter />
        </div>
      </section>
    </main>
  );
}
