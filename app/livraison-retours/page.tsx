import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aide & FAQ | Notre E-commerce",
  description:
    "Réponses à vos questions et informations sur nos services de livraison et retours",
};

export default function AideFAQPage() {
  return (
    <main className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Aide & FAQ</h1>

        <div className="space-y-8">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Livraison</h2>

            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  Quels sont les délais de livraison ?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Nous nous efforçons de traiter et d'expédier votre commande
                  dans les meilleurs délais.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Livraison standard : 3-5 jours ouvrables</li>
                  <li>Livraison express : 1-2 jours ouvrables</li>
                  <li>Livraison internationale : 7-14 jours ouvrables</li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  Quels sont les frais de livraison ?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Les frais de livraison sont calculés en fonction du poids, des
                  dimensions et de la destination de votre commande.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Livraison standard : à partir de 4,99€</li>
                  <li>Livraison express : à partir de 9,99€</li>
                  <li>
                    Livraison gratuite pour toute commande supérieure à 50€
                  </li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  Comment suivre ma commande ?
                </h3>
                <p className="text-muted-foreground">
                  Un numéro de suivi vous sera communiqué par e-mail dès que
                  votre commande sera expédiée. Vous pourrez suivre votre colis
                  en temps réel via notre interface ou directement sur le site
                  du transporteur.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  Puis-je modifier mon adresse de livraison après avoir passé ma
                  commande ?
                </h3>
                <p className="text-muted-foreground">
                  Si votre commande n'a pas encore été expédiée, vous pouvez
                  nous contacter par e-mail ou par téléphone pour modifier votre
                  adresse de livraison. Une fois la commande expédiée, il n'est
                  plus possible de modifier l'adresse.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  Que faire si mon colis est endommagé à la livraison ?
                </h3>
                <p className="text-muted-foreground">
                  Si vous constatez que votre colis est endommagé à la
                  livraison, veuillez le signaler immédiatement au livreur et
                  nous contacter dans les 24 heures avec des photos du colis et
                  des articles endommagés.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Retours et Remboursements
            </h2>

            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  Quelles sont les conditions de retour ?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Vous disposez d'un délai de 14 jours à compter de la réception
                  de votre commande pour nous retourner un article.
                </p>
                <p className="text-muted-foreground">
                  Pour être éligible à un retour, votre article doit être
                  inutilisé, dans son état d'origine et dans son emballage
                  d'origine. Il doit également être accompagné de la facture ou
                  du bon de livraison.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  Comment retourner un article ?
                </h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    Connectez-vous à votre compte client et accédez à la section
                    "Mes commandes"
                  </li>
                  <li>
                    Sélectionnez la commande concernée et cliquez sur "Retourner
                    un article"
                  </li>
                  <li>
                    Suivez les instructions pour générer votre étiquette de
                    retour
                  </li>
                  <li>
                    Emballez soigneusement l'article avec tous ses accessoires
                    et sa documentation
                  </li>
                  <li>
                    Collez l'étiquette de retour sur le colis et déposez-le au
                    point de collecte indiqué
                  </li>
                </ol>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  Quand serai-je remboursé après un retour ?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Une fois votre retour reçu et vérifié, nous procéderons au
                  remboursement sur votre moyen de paiement initial.
                </p>
                <p className="text-muted-foreground">
                  Le délai de remboursement peut varier en fonction de votre
                  banque, mais il est généralement effectué sous 5 à 10 jours
                  ouvrables après la validation de votre retour.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  Les frais de retour sont-ils à ma charge ?
                </h3>
                <p className="text-muted-foreground">
                  Les frais de retour sont à votre charge, sauf dans le cas d'un
                  article défectueux ou d'une erreur de notre part. Dans ces cas
                  précis, nous vous fournirons une étiquette de retour prépayée.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  Puis-je échanger un article plutôt que de le retourner ?
                </h3>
                <p className="text-muted-foreground">
                  Oui, vous pouvez échanger un article contre un autre modèle ou
                  une autre taille. Pour cela, suivez la procédure de retour
                  standard et précisez que vous souhaitez un échange lors de la
                  création de votre demande.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Commandes et Paiements
            </h2>

            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  Quels modes de paiement acceptez-vous ?
                </h3>
                <p className="text-muted-foreground">
                  Nous acceptons les cartes de crédit (Visa, Mastercard,
                  American Express), PayPal, Apple Pay et les virements
                  bancaires. Tous les paiements sont sécurisés et cryptés.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  Puis-je modifier ou annuler ma commande ?
                </h3>
                <p className="text-muted-foreground">
                  Vous pouvez modifier ou annuler votre commande uniquement si
                  elle n'a pas encore été traitée. Pour cela, contactez notre
                  service client dès que possible par e-mail ou par téléphone.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  Ma commande peut-elle être livrée à une adresse différente de
                  mon adresse de facturation ?
                </h3>
                <p className="text-muted-foreground">
                  Oui, vous pouvez indiquer une adresse de livraison différente
                  de votre adresse de facturation lors du processus de commande.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Produits</h2>

            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  Les tailles correspondent-elles aux standards ?
                </h3>
                <p className="text-muted-foreground">
                  Nos tailles sont conformes aux standards européens. Vous
                  trouverez un guide des tailles détaillé sur chaque page
                  produit pour vous aider à choisir la taille qui vous convient
                  le mieux.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  Comment entretenir mes produits ?
                </h3>
                <p className="text-muted-foreground">
                  Les instructions d'entretien spécifiques sont indiquées sur
                  l'étiquette de chaque produit. Nous recommandons généralement
                  un lavage à basse température et un séchage à l'air libre pour
                  préserver la qualité et la durabilité de nos articles.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  Vos produits sont-ils éco-responsables ?
                </h3>
                <p className="text-muted-foreground">
                  Nous nous engageons à proposer des produits respectueux de
                  l'environnement. Une grande partie de notre collection est
                  fabriquée à partir de matériaux durables et recyclés. Vous
                  trouverez des informations détaillées sur la composition et
                  l'origine de chaque produit sur sa page.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Compte Client</h2>

            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  Comment créer un compte ?
                </h3>
                <p className="text-muted-foreground">
                  Vous pouvez créer un compte en cliquant sur "Mon compte" en
                  haut à droite de notre site, puis en sélectionnant "Créer un
                  compte". Remplissez le formulaire avec vos informations
                  personnelles et définissez un mot de passe sécurisé.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  J'ai oublié mon mot de passe, que faire ?
                </h3>
                <p className="text-muted-foreground">
                  Si vous avez oublié votre mot de passe, cliquez sur "Mon
                  compte", puis sur "Connexion", et enfin sur "Mot de passe
                  oublié". Saisissez votre adresse e-mail et suivez les
                  instructions qui vous seront envoyées pour réinitialiser votre
                  mot de passe.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  Comment contacter le service client ?
                </h3>
                <p className="text-muted-foreground">
                  Vous pouvez contacter notre service client par e-mail à
                  support@notre-ecommerce.com, par téléphone au 01 23 45 67 89
                  (du lundi au vendredi, de 9h à 18h) ou via le formulaire de
                  contact disponible sur notre site.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
