/* =========================================================
   Noumbi Resort · données des bungalows (page bungalow.html)

   Pour ajouter une photo : ajouter une ligne dans "photos".
     src   chemin de la grande version (ex. assets/img/kelly-salon.webp)
     small version 700px pour mobile (voir README, « Ajouter une photo »)
     w, h  dimensions de la grande version
   Une ligne { placeholder: '…' } affiche un emplacement vide : la supprimer
   dès qu'une vraie photo la remplace.

   À COMPLÉTER : équipements de chaque bungalow (salle de bain, électricité,
   moustiquaire, terrasse…), à ajouter dans "details" une fois confirmés.
   Les prix et descriptions sont aussi écrits dans index.html : modifier les deux.
   ========================================================= */
window.BUNGALOWS = [
  {
    id: 'kelly',
    name: 'Kelly',
    cap: 2,
    summary: 'Une chambre, un lit double.',
    details: [
      ['Capacité', '2 personnes'],
      ['Chambre', 'Une chambre'],
      ['Couchage', 'Un lit double']
    ],
    price: '30 000 FCFA',
    priceNote: 'la première nuit, puis 20 000 FCFA',
    photos: [
      { src: 'assets/img/camp.webp', small: 'assets/img/camp-700.webp', w: 1200, h: 800, alt: 'Bungalow Kelly sur le sable, sous les arbres' },
      { placeholder: 'Photo de l\'intérieur à ajouter' },
      { placeholder: 'Photo de la vue à ajouter' }
    ]
  },
  {
    id: 'chad',
    name: 'Chad',
    cap: 2,
    summary: 'Une chambre, un lit double.',
    details: [
      ['Capacité', '2 personnes'],
      ['Chambre', 'Une chambre'],
      ['Couchage', 'Un lit double']
    ],
    price: '30 000 FCFA',
    priceNote: 'la première nuit, puis 20 000 FCFA',
    photos: [
      { src: 'assets/img/chambre.webp', small: 'assets/img/chambre-700.webp', w: 1024, h: 684, alt: 'Chambre du bungalow Chad, avec moustiquaire et bois naturel' },
      { placeholder: 'Photo de l\'extérieur à ajouter' },
      { placeholder: 'Photo de la vue à ajouter' }
    ]
  },
  {
    id: 'le-wallys',
    name: 'Le Wallys',
    cap: 6,
    summary: 'Duplex à étage : une chambre parents à l\'étage et un espace enfants avec deux lits superposés.',
    details: [
      ['Capacité', '6 personnes'],
      ['Configuration', 'Duplex à étage'],
      ['Étage', 'Une chambre parents'],
      ['Espace enfants', 'Deux lits superposés']
    ],
    price: '100 000 FCFA',
    priceNote: 'la nuit',
    photos: [
      { src: 'assets/img/cabane-arbre.webp', small: 'assets/img/cabane-arbre-700.webp', w: 1200, h: 1200, alt: 'Le Wallys, cabane perchée au toit vert' },
      { placeholder: 'Photo de la chambre parents à ajouter' },
      { placeholder: 'Photo de l\'espace enfants à ajouter' }
    ]
  },
  {
    id: 'bali',
    name: 'Bali',
    cap: 4,
    summary: 'Une chambre, deux lits doubles.',
    details: [
      ['Capacité', '4 personnes'],
      ['Chambre', 'Une chambre'],
      ['Couchage', 'Deux lits doubles']
    ],
    price: '30 000 FCFA',
    priceNote: 'la première nuit, puis 20 000 FCFA',
    photos: [
      { src: 'assets/img/bungalow-couleurs.webp', small: 'assets/img/bungalow-couleurs-700.webp', w: 1200, h: 1600, alt: 'Fenêtre colorée du bungalow Bali' },
      { placeholder: 'Photo de l\'intérieur à ajouter' },
      { placeholder: 'Photo de la vue à ajouter' }
    ]
  },
  {
    id: 'nsuini',
    name: 'Nsuini',
    cap: 2,
    summary: 'Une chambre, un lit double.',
    details: [
      ['Capacité', '2 personnes'],
      ['Chambre', 'Une chambre'],
      ['Couchage', 'Un lit double']
    ],
    price: '30 000 FCFA',
    priceNote: 'la première nuit, puis 20 000 FCFA',
    photos: [
      { src: 'assets/img/cabane-sable.webp', small: 'assets/img/cabane-sable-700.webp', w: 1200, h: 1600, alt: 'Bungalow Nsuini, cabane en bois sur pilotis' },
      { placeholder: 'Photo de l\'intérieur à ajouter' },
      { placeholder: 'Photo de la vue à ajouter' }
    ]
  }
];
