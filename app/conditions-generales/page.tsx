import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | Notre E-commerce",
  description:
    "Conditions générales de vente régissant l'utilisation de notre site e-commerce",
};

export default function ConditionsGeneralesPage() {
  return (
    <main className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">
          Conditions Générales de Vente
        </h1>
        <p className="text-muted-foreground mb-8">
          Dernière mise à jour : {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Préambule</h2>
            <p>
              Les présentes conditions générales de vente (ci-après "CGV")
              s'appliquent à toutes les ventes conclues sur le site Internet
              MARQUE (ci-après "le Site").
            </p>
            <p>
              Le Site est la propriété de la société MARQUE, [forme juridique]
              au capital de [montant] euros, dont le siège social est situé à
              [adresse], immatriculée au Registre du Commerce et des Sociétés de
              [ville] sous le numéro [numéro RCS] (ci-après "le Vendeur").
            </p>
            <p>
              Les CGV régissent les relations contractuelles entre le Vendeur et
              le client consommateur (ci-après "le Client"), les deux parties
              les acceptant sans réserve. Ces CGV prévaudront sur toutes autres
              conditions figurant dans tout autre document, sauf dérogation
              préalable, expresse et écrite.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              2. Produits et services
            </h2>
            <p>
              Les produits proposés à la vente sont ceux qui figurent sur le
              Site, avec une description de leurs caractéristiques essentielles,
              dans la limite des stocks disponibles.
            </p>
            <p>
              Le Vendeur se réserve le droit de modifier à tout moment
              l'assortiment de produits proposés sur le Site, sans préavis.
            </p>
            <p>
              Les photographies illustrant les produits n'entrent pas dans le
              champ contractuel. Si ces photographies présentaient un quelconque
              caractère erroné, la responsabilité du Vendeur ne saurait être
              engagée.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Prix</h2>
            <p>
              Les prix des produits sont indiqués en euros toutes taxes
              comprises (TTC), hors frais de livraison et de transport
              mentionnés avant validation de la commande et facturés en
              supplément.
            </p>
            <p>
              Le montant total dû par le Client est indiqué sur la page de
              confirmation de commande.
            </p>
            <p>
              Le Vendeur se réserve le droit de modifier ses prix à tout moment,
              étant toutefois entendu que le prix figurant au catalogue le jour
              de la commande sera le seul applicable au Client.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Commandes</h2>
            <p>Le Client peut passer commande :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Sur Internet : www.notre-ecommerce.com</li>
              <li>
                Par téléphone au [numéro de téléphone], aux heures d'ouverture
                indiquées sur le Site
              </li>
            </ul>
            <p>
              Les informations contractuelles sont présentées en langue
              française et feront l'objet d'une confirmation par e-mail au plus
              tard au moment de la livraison.
            </p>
            <p>
              Le Vendeur se réserve le droit de ne pas enregistrer un paiement,
              et de ne pas confirmer une commande pour quelque raison que ce
              soit, et plus particulièrement en cas de problème
              d'approvisionnement, ou en cas de difficulté concernant la
              commande reçue.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              5. Modalités de paiement
            </h2>
            <p>Le règlement des achats s'effectue par :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Carte bancaire (Visa, MasterCard, American Express)</li>
              <li>PayPal</li>
              <li>Apple Pay</li>
              <li>Virement bancaire</li>
            </ul>
            <p>
              Les paiements effectués par le Client ne seront considérés comme
              définitifs qu'après encaissement effectif des sommes dues par le
              Vendeur.
            </p>
            <p>
              Le Vendeur ne sera pas tenu de procéder à la délivrance des
              produits commandés par le Client si celui-ci ne lui en paye pas le
              prix en totalité dans les conditions indiquées ci-dessus.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Livraisons</h2>
            <p>
              Les produits sont livrés à l'adresse de livraison indiquée par le
              Client lors de sa commande, dans le délai indiqué sur la page de
              validation de la commande.
            </p>
            <p>
              En cas de retard d'expédition, un e-mail sera adressé au Client.
              Il aura alors la possibilité d'annuler sa commande, et d'obtenir
              un remboursement des sommes versées.
            </p>
            <p>
              En cas de livraison par un transporteur, le Vendeur ne saurait
              être tenu pour responsable du retard de livraison dû exclusivement
              à une indisponibilité du Client après plusieurs propositions de
              rendez-vous.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              7. Droit de rétractation
            </h2>
            <p>
              Conformément aux dispositions légales en vigueur, le Client
              dispose d'un délai de 14 jours à compter de la réception des
              produits pour exercer son droit de rétractation sans avoir à
              justifier de motifs ni à payer de pénalité.
            </p>
            <p>
              Les retours sont à effectuer dans leur état d'origine et complets
              (emballage, accessoires, notice...). Dans ce cadre, la
              responsabilité du Client est engagée. Tout dommage subi par le
              produit à cette occasion peut être de nature à faire échec au
              droit de rétractation.
            </p>
            <p>
              En cas d'exercice du droit de rétractation, le Vendeur procédera
              au remboursement des sommes versées, dans un délai de 14 jours
              suivant la notification de la demande de rétractation du Client.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Garanties</h2>
            <p>
              Les produits vendus sur le Site sont conformes à la réglementation
              en vigueur en France et ont des performances compatibles avec des
              usages non professionnels.
            </p>
            <p>
              Les produits fournis par le Vendeur bénéficient de plein droit et
              sans paiement complémentaire, conformément aux dispositions
              légales :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                De la garantie légale de conformité, pour les produits
                apparemment défectueux, abîmés ou endommagés ou ne correspondant
                pas à la commande
              </li>
              <li>
                De la garantie légale contre les vices cachés provenant d'un
                défaut de matière, de conception ou de fabrication affectant les
                produits livrés et les rendant impropres à l'utilisation
              </li>
            </ul>
            <p>
              Toute garantie est exclue en cas de mauvaise utilisation,
              négligence ou défaut d'entretien de la part du Client, comme en
              cas d'usure normale du bien ou de force majeure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Responsabilité</h2>
            <p>
              Les produits proposés sont conformes à la législation française en
              vigueur. La responsabilité du Vendeur ne saurait être engagée en
              cas de non-respect de la législation du pays où le produit est
              livré. Il appartient au Client de vérifier auprès des autorités
              locales les possibilités d'importation ou d'utilisation des
              produits qu'il envisage de commander.
            </p>
            <p>
              Le Vendeur ne pourra être tenu pour responsable des dommages de
              toute nature, tant matériels qu'immatériels ou corporels, qui
              pourraient résulter d'un mauvais fonctionnement ou de la mauvaise
              utilisation des produits commercialisés.
            </p>
            <p>
              La responsabilité du Vendeur sera limitée au montant de la
              commande et ne saurait être mise en cause pour de simples erreurs
              ou omissions qui auraient pu subsister malgré toutes les
              précautions prises dans la présentation des produits.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              10. Propriété intellectuelle
            </h2>
            <p>
              Tous les éléments du Site, qu'ils soient visuels ou sonores, y
              compris la technologie sous-jacente, sont protégés par le droit
              d'auteur, des marques ou des brevets. Ils sont la propriété
              exclusive du Vendeur.
            </p>
            <p>
              Toute reproduction, totale ou partielle, du Site, de l'un de ses
              éléments ou de ses contenus, par quelque procédé que ce soit, sans
              autorisation expresse du Vendeur, est strictement interdite et
              constituerait une contrefaçon sanctionnée par les articles L.335-2
              et suivants du Code de la Propriété Intellectuelle.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              11. Données personnelles
            </h2>
            <p>
              Le Vendeur s'engage à respecter la confidentialité des données
              personnelles communiquées par le Client sur le Site et à les
              traiter dans le respect de la loi Informatique et Libertés du 6
              janvier 1978 et du Règlement Général sur la Protection des Données
              (RGPD).
            </p>
            <p>
              Les informations et données concernant le Client sont nécessaires
              à la gestion de sa commande et à ses relations commerciales avec
              le Vendeur. Elles peuvent être transmises aux sociétés qui
              contribuent à ces relations, telles que celles chargées de
              l'exécution des services et commandes pour leur gestion,
              exécution, traitement et paiement.
            </p>
            <p>
              Conformément à la réglementation en vigueur, le Client peut
              exercer ses droits d'accès, de rectification, de suppression et de
              portabilité des données le concernant en contactant le Vendeur à
              l'adresse e-mail suivante : [adresse e-mail] ou à l'adresse
              postale indiquée au début des présentes CGV.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              12. Droit applicable et litiges
            </h2>
            <p>
              Les présentes CGV sont soumises au droit français. En cas de
              litige, les tribunaux français seront seuls compétents.
            </p>
            <p>
              Conformément aux dispositions du Code de la consommation
              concernant le règlement amiable des litiges, le Client peut en
              tout état de cause recourir à une médiation conventionnelle,
              notamment auprès de la Commission de la médiation de la
              consommation ou auprès des instances de médiation sectorielles
              existantes, ou à tout mode alternatif de règlement des différends
              (conciliation, par exemple) en cas de contestation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              13. Information précontractuelle - Acceptation du Client
            </h2>
            <p>
              Le Client reconnaît avoir eu communication, préalablement à la
              passation de sa commande, d'une manière lisible et compréhensible,
              des présentes CGV et de toutes les informations et renseignements
              visés aux articles L111-1 à L111-7 du Code de la consommation.
            </p>
            <p>
              Le fait pour un Client de commander sur le Site emporte adhésion
              et acceptation pleine et entière des présentes CGV, ce qui est
              expressément reconnu par le Client, qui renonce, notamment, à se
              prévaloir de tout document contradictoire, qui serait inopposable
              au Vendeur.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
