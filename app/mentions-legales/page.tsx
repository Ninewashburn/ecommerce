import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales | Notre E-commerce",
  description:
    "Mentions légales et informations juridiques concernant notre site e-commerce",
};

export default function MentionsLegalesPage() {
  return (
    <main className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Mentions Légales</h1>
        <p className="text-muted-foreground mb-8">
          Dernière mise à jour : {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Éditeur du site</h2>
            <p>
              Le site internet www.notre-ecommerce.com est édité par la société
              MARQUE, [forme juridique] au capital de [montant] euros,
              immatriculée au Registre du Commerce et des Sociétés de [ville]
              sous le numéro [numéro RCS].
            </p>
            <p>
              <strong>Siège social</strong> : [adresse complète]
              <br />
              <strong>Numéro de téléphone</strong> : [numéro de téléphone]
              <br />
              <strong>Adresse e-mail</strong> : [adresse e-mail]
              <br />
              <strong>Numéro de TVA intracommunautaire</strong> : [numéro de
              TVA]
              <br />
              <strong>Directeur de la publication</strong> : [nom et prénom]
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Hébergeur</h2>
            <p>
              Le site est hébergé par la société [nom de l'hébergeur], [forme
              juridique], dont le siège social est situé à [adresse de
              l'hébergeur].
            </p>
            <p>
              <strong>Téléphone</strong> : [numéro de téléphone de l'hébergeur]
              <br />
              <strong>E-mail</strong> : [adresse e-mail de l'hébergeur]
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              3. Propriété intellectuelle
            </h2>
            <p>
              L'ensemble des éléments constituant le site
              www.notre-ecommerce.com (textes, graphismes, logiciels,
              photographies, images, vidéos, sons, plans, logos, marques,
              créations et œuvres protégeables diverses, bases de données, etc.)
              ainsi que le site lui-même, relèvent des législations françaises
              et internationales sur le droit d'auteur et la propriété
              intellectuelle.
            </p>
            <p>
              Ces éléments sont la propriété exclusive de la société MARQUE.
              Toute reproduction ou représentation, totale ou partielle, de ce
              site ou de l'un quelconque des éléments qui le composent, par
              quelque procédé que ce soit, sans l'autorisation expresse de la
              société MARQUE, est interdite et constituerait une contrefaçon
              sanctionnée par les articles L.335-2 et suivants du Code de la
              Propriété Intellectuelle.
            </p>
            <p>
              Les marques, logos, dénominations sociales, sigles, noms
              commerciaux, enseignes et noms de domaine de la société MARQUE
              constituent des signes distinctifs insusceptibles d'utilisation
              sans l'autorisation expresse et préalable de leur titulaire.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              4. Données personnelles
            </h2>
            <p>
              La société MARQUE s'engage à respecter la confidentialité des
              données personnelles communiquées par les utilisateurs du site et
              à les traiter dans le respect de la loi Informatique et Libertés
              du 6 janvier 1978 et du Règlement Général sur la Protection des
              Données (RGPD).
            </p>
            <p>
              Les informations que nous collectons sont utilisées uniquement
              dans le cadre légal prévu en France pour le respect de la vie
              privée. La société MARQUE s'engage à ne pas divulguer les
              informations collectées à des partenaires commerciaux ou à des
              tiers, sauf avec l'accord express de l'utilisateur.
            </p>
            <p>
              Conformément à la réglementation en vigueur, tout utilisateur
              dispose d'un droit d'accès, de rectification, de suppression et de
              portabilité des données le concernant, ainsi que du droit de
              s'opposer au traitement pour motif légitime, droits qu'il peut
              exercer en s'adressant au responsable de traitement à l'adresse
              e-mail [adresse e-mail] ou à l'adresse postale indiquée ci-dessus.
            </p>
            <p>
              Pour plus d'informations sur la façon dont nous traitons vos
              données, veuillez consulter notre{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Politique de Confidentialité
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
            <p>
              Le site www.notre-ecommerce.com utilise des cookies pour améliorer
              l'expérience utilisateur et proposer des contenus personnalisés.
              Un cookie est un petit fichier texte déposé sur votre ordinateur
              lors de la visite d'un site. Il a pour but de collecter des
              informations relatives à votre navigation et de vous adresser des
              services adaptés à votre terminal.
            </p>
            <p>
              Les cookies sont gérés par votre navigateur internet. Vous pouvez
              à tout moment désactiver l'utilisation de ces cookies en
              sélectionnant les paramètres appropriés de votre navigateur.
              Cependant, cette désactivation peut réduire la fonctionnalité du
              site et votre expérience de navigation.
            </p>
            <p>
              Pour plus d'informations sur l'utilisation des cookies, veuillez
              consulter notre{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Politique de Confidentialité
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              6. Limitation de responsabilité
            </h2>
            <p>
              La société MARQUE s'efforce d'assurer au mieux de ses possibilités
              l'exactitude et la mise à jour des informations diffusées sur son
              site, dont elle se réserve le droit de corriger, à tout moment et
              sans préavis, le contenu.
            </p>
            <p>
              Toutefois, la société MARQUE ne peut garantir l'exactitude, la
              précision ou l'exhaustivité des informations mises à disposition
              sur ce site. En conséquence, la société MARQUE décline toute
              responsabilité :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Pour toute imprécision, inexactitude ou omission portant sur des
                informations disponibles sur le site
              </li>
              <li>
                Pour tous dommages résultant d'une intrusion frauduleuse d'un
                tiers ayant entraîné une modification des informations mises à
                disposition sur le site
              </li>
              <li>
                Et plus généralement, pour tous dommages, directs ou indirects,
                qu'elles qu'en soient les causes, origines, natures ou
                conséquences, provoqués à raison de l'accès de quiconque au site
                ou de l'impossibilité d'y accéder, de même que l'utilisation du
                site et/ou du crédit accordé à une quelconque information
                provenant directement ou indirectement de ce dernier
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              7. Liens hypertextes
            </h2>
            <p>
              Le site www.notre-ecommerce.com peut contenir des liens
              hypertextes vers d'autres sites internet ou d'autres sources
              d'informations. Dans la mesure où la société MARQUE ne peut
              contrôler ces sites et ces sources externes, elle ne peut être
              tenue pour responsable de la mise à disposition de ces sites et
              sources externes, et ne peut supporter aucune responsabilité quant
              au contenu, publicités, produits, services ou tout autre matériel
              disponible sur ou à partir de ces sites ou sources externes.
            </p>
            <p>
              Par ailleurs, la responsabilité de la société MARQUE ne saurait
              être engagée au titre d'un site tiers qui ferait un lien
              hypertexte vers le site www.notre-ecommerce.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              8. Droit applicable et juridiction compétente
            </h2>
            <p>
              Les présentes mentions légales sont régies par le droit français.
              En cas de litige relatif à l'interprétation ou à l'exécution des
              présentes, la compétence est attribuée aux tribunaux compétents de
              [ville], sauf disposition légale contraire.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
