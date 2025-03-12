import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Notre E-commerce",
  description:
    "Notre politique de confidentialité et d'utilisation des cookies",
};

export default function PrivacyPage() {
  return (
    <main className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">
          Politique de confidentialité
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            Bienvenue sur notre politique de confidentialité. Nous respectons
            votre vie privée et nous nous engageons à protéger vos données
            personnelles. Cette politique de confidentialité vous informera sur
            la façon dont nous traitons vos données personnelles lorsque vous
            visitez notre site web et vous informera de vos droits en matière de
            protection des données.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Les données que nous collectons
          </h2>
          <p className="mb-4">
            Nous pouvons collecter, utiliser, stocker et transférer différents
            types de données personnelles vous concernant, notamment :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Données d'identité</strong> : prénom, nom, nom
              d'utilisateur ou identifiant similaire.
            </li>
            <li>
              <strong>Données de contact</strong> : adresse e-mail, adresse
              postale, numéro de téléphone.
            </li>
            <li>
              <strong>Données de transaction</strong> : détails des produits et
              services que vous avez achetés auprès de nous.
            </li>
            <li>
              <strong>Données techniques</strong> : adresse IP, données de
              connexion, type et version du navigateur, fuseau horaire et
              localisation, types et versions de plug-ins, système
              d'exploitation et plateforme.
            </li>
            <li>
              <strong>Données d'utilisation</strong> : informations sur la façon
              dont vous utilisez notre site web, nos produits et services.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Utilisation des cookies
          </h2>
          <p className="mb-4">
            Notre site utilise des cookies pour distinguer les utilisateurs de
            notre site web. Cela nous aide à vous offrir une bonne expérience
            lorsque vous naviguez sur notre site web et nous permet également
            d'améliorer notre site.
          </p>
          <p className="mb-4">
            Un cookie est un petit fichier de lettres et de chiffres que nous
            stockons sur votre navigateur ou sur le disque dur de votre
            ordinateur si vous l'acceptez. Les cookies contiennent des
            informations qui sont transférées sur le disque dur de votre
            ordinateur.
          </p>
          <p className="mb-4">Nous utilisons les types de cookies suivants :</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Cookies strictement nécessaires</strong>. Ce sont des
              cookies nécessaires au fonctionnement de notre site web. Ils
              comprennent, par exemple, des cookies qui vous permettent de vous
              connecter à des zones sécurisées de notre site web, d'utiliser un
              panier d'achat ou d'utiliser des services de facturation
              électronique.
            </li>
            <li>
              <strong>Cookies analytiques/de performance</strong>. Ils nous
              permettent de reconnaître et de compter le nombre de visiteurs et
              de voir comment les visiteurs se déplacent sur notre site web
              lorsqu'ils l'utilisent. Cela nous aide à améliorer le
              fonctionnement de notre site web, par exemple, en veillant à ce
              que les utilisateurs trouvent facilement ce qu'ils recherchent.
            </li>
            <li>
              <strong>Cookies de fonctionnalité</strong>. Ils sont utilisés pour
              vous reconnaître lorsque vous revenez sur notre site web. Cela
              nous permet de personnaliser notre contenu pour vous, de vous
              accueillir par votre nom et de mémoriser vos préférences (par
              exemple, votre choix de langue ou de région).
            </li>
            <li>
              <strong>Cookies de ciblage</strong>. Ces cookies enregistrent
              votre visite sur notre site web, les pages que vous avez visitées
              et les liens que vous avez suivis. Nous utiliserons ces
              informations pour rendre notre site web et la publicité qui y est
              affichée plus pertinents par rapport à vos intérêts.
            </li>
          </ul>
          <p className="mb-4">
            Vous pouvez configurer votre navigateur pour qu'il refuse tous les
            cookies ou pour qu'il vous avertisse lorsque des sites web
            définissent ou accèdent à des cookies. Cependant, si vous désactivez
            ou refusez les cookies, veuillez noter que certaines parties de ce
            site web peuvent devenir inaccessibles ou ne pas fonctionner
            correctement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Vos droits</h2>
          <p className="mb-4">
            Selon les lois applicables en matière de protection des données,
            vous pouvez avoir le droit :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>D'accéder à vos données personnelles.</li>
            <li>
              De corriger vos données personnelles si elles sont inexactes ou
              incomplètes.
            </li>
            <li>D'effacer vos données personnelles.</li>
            <li>De limiter le traitement de vos données personnelles.</li>
            <li>
              De demander le transfert de vos données personnelles à vous ou à
              un tiers.
            </li>
            <li>De vous opposer au traitement de vos données personnelles.</li>
            <li>
              De retirer votre consentement à tout moment lorsque nous nous
              appuyons sur votre consentement pour traiter vos données
              personnelles.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="mb-4">
            Si vous avez des questions concernant cette politique de
            confidentialité ou nos pratiques en matière de protection des
            données, veuillez nous contacter à l'adresse suivante :
            privacy@notre-ecommerce.com
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Modifications de la politique de confidentialité
          </h2>
          <p className="mb-4">
            Nous pouvons mettre à jour notre politique de confidentialité de
            temps à autre. Nous vous informerons de tout changement en publiant
            la nouvelle politique de confidentialité sur cette page.
          </p>
          <p className="mb-4">
            Dernière mise à jour : {new Date().toLocaleDateString()}
          </p>
        </section>
      </div>
    </main>
  );
}
