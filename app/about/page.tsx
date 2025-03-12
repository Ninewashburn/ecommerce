import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Section Héro */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div
          className="h-[40vh] bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=800&width=1920')",
          }}
        >
          <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">
              Notre Histoire
            </h1>
          </div>
        </div>
      </section>

      {/* Histoire de l'Entreprise */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                Fondée en 2010, notre aventure a commencé avec une vision simple
                : créer des produits de haute qualité qui améliorent la vie
                quotidienne. Ce qui a commencé comme une petite opération dans
                un garage s'est transformé en une marque mondiale de confiance
                pour les clients du monde entier.
              </p>
              <p>
                Notre fondatrice, Jane Smith, a remarqué un manque sur le marché
                pour des produits bien conçus et fonctionnels qui ne
                compromettaient ni la qualité ni la durabilité. Avec une
                formation en design et une passion pour l'innovation, Jane a
                rassemblé une équipe de personnes partageant les mêmes idées et
                sa vision.
              </p>
              <p>
                Les premières années ont été difficiles, mais notre engagement
                envers l'excellence et la satisfaction du client nous a aidés à
                surmonter les obstacles et à établir une clientèle fidèle. En
                2015, nous avions élargi notre gamme de produits et ouvert notre
                première boutique physique.
              </p>
              <p>
                Aujourd'hui, nous continuons à grandir et à évoluer, mais nos
                valeurs fondamentales restent les mêmes. Nous croyons en la
                création de produits qui sont non seulement beaux et
                fonctionnels, mais aussi fabriqués de manière responsable et
                accessibles à tous.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission et Valeurs */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Notre Mission</h2>
            <p className="text-xl mb-12">
              Créer des produits exceptionnels qui améliorent la vie des gens
              tout en maintenant un engagement envers la qualité, la durabilité
              et la satisfaction du client.
            </p>

            <h3 className="text-2xl font-bold mb-6">Nos Valeurs</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h4 className="text-xl font-semibold mb-3">Qualité</h4>
                <p>
                  Nous ne compromettons jamais la qualité. Chaque produit subit
                  des tests rigoureux pour s'assurer qu'il répond à nos normes
                  élevées.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h4 className="text-xl font-semibold mb-3">Innovation</h4>
                <p>
                  Nous recherchons constamment de nouvelles façons d'améliorer
                  nos produits et nos processus, en embrassant le changement et
                  les avancées technologiques.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h4 className="text-xl font-semibold mb-3">Durabilité</h4>
                <p>
                  Nous nous engageons à réduire notre impact environnemental
                  grâce à un approvisionnement responsable et des pratiques
                  écologiques.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h4 className="text-xl font-semibold mb-3">Focus Client</h4>
                <p>
                  Nos clients sont au cœur de tout ce que nous faisons. Nous
                  écoutons les retours et nous nous efforçons de dépasser les
                  attentes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Équipe */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Rencontrez Notre Équipe
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Jane Smith", role: "Fondatrice & PDG" },
              { name: "John Davis", role: "Directeur du Design" },
              { name: "Sarah Johnson", role: "Directrice Marketing" },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 mx-auto rounded-full overflow-hidden w-48 h-48 relative">
                  <Image
                    src={`/placeholder.svg?height=200&width=200`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
