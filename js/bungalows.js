/* =========================================================
   Noumbi Resort · données des bungalows (page bungalow.html)

   Pour ajouter une photo : ajouter une ligne dans "photos".
     src   chemin de la grande version (ex. assets/img/kelly-salon.webp)
     small version 700px pour mobile (voir README, « Ajouter une photo »)
     w, h  dimensions de la grande version
   Une ligne { placeholder: '…' } affiche un emplacement vide : la supprimer
   dès qu'une vraie photo la remplace.
   Les photos verticales s'affichent en entier (sans recadrage) dans la galerie.

   Photos et ordre repris des galeries de l'ancien site Bubble (octobre 2026).

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
      { src: 'assets/img/kelly-2.webp', small: 'assets/img/kelly-2-700.webp', w: 1400, h: 934, alt: 'Façade du bungalow Kelly, volets turquoise et terrasse en bois' },
      { src: 'assets/img/kelly-3.webp', small: 'assets/img/kelly-3-700.webp', w: 914, h: 1200, alt: 'Planches de surf sur le sable, près du bungalow Kelly' }
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
      { src: 'assets/img/chad-2.webp', small: 'assets/img/chad-2-700.webp', w: 1024, h: 768, alt: 'Terrasse du bungalow Chad avec fauteuils en bois, vue sur l\'océan' },
      { src: 'assets/img/chad-3.webp', small: 'assets/img/chad-3-700.webp', w: 683, h: 1024, alt: 'Coin salon de la terrasse du bungalow Chad, sous les arbres' },
      // même photo que dans la galerie du Wallys sur l'ancien site : à confirmer avec le client
      { src: 'assets/img/chad-4.webp', small: 'assets/img/chad-4-700.webp', w: 1024, h: 684, alt: 'Chambre sous les toits avec lit double et moustiquaire' }
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
      { src: 'assets/img/wallys-2.webp', small: 'assets/img/wallys-2-700.webp', w: 720, h: 540, alt: 'Le Wallys vu de face, duplex sur pilotis avec escalier' },
      { src: 'assets/img/wallys-3.webp', small: 'assets/img/wallys-3-700.webp', w: 1024, h: 768, alt: 'Escalier extérieur du Wallys, entouré de bougainvilliers' },
      { src: 'assets/img/wallys-4.webp', small: 'assets/img/wallys-4-700.webp', w: 1024, h: 768, alt: 'Chambre du Wallys avec lit et miroir en rotin' },
      { src: 'assets/img/wallys-5.webp', small: 'assets/img/wallys-5-700.webp', w: 1024, h: 768, alt: 'Lit double sous moustiquaire dans le Wallys' },
      { src: 'assets/img/wallys-6.webp', small: 'assets/img/wallys-6-700.webp', w: 1024, h: 684, alt: 'Chambre sous les toits avec lit double et moustiquaire' }
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
      { src: 'assets/img/bali-2.webp', small: 'assets/img/bali-2-700.webp', w: 900, h: 1200, alt: 'Terrasse du bungalow Bali ouverte sur l\'océan' },
      { src: 'assets/img/bali-3.webp', small: 'assets/img/bali-3-700.webp', w: 1024, h: 768, alt: 'Lit sous moustiquaire dans le bungalow Bali' }
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
      { src: 'assets/img/nsuini-2.webp', small: 'assets/img/nsuini-2-700.webp', w: 900, h: 1200, alt: 'Entrée du bungalow Nsuini et son allée de pierres' },
      { src: 'assets/img/nsuini-3.webp', small: 'assets/img/nsuini-3-700.webp', w: 768, h: 1024, alt: 'Chambre du bungalow Nsuini, lit et armoire sculptée' },
      { src: 'assets/img/nsuini-4.webp', small: 'assets/img/nsuini-4-700.webp', w: 768, h: 1024, alt: 'Terrasse du bungalow Nsuini, fauteuils en bois et tapis bleu' },
      { src: 'assets/img/nsuini-5.webp', small: 'assets/img/nsuini-5-700.webp', w: 960, h: 720, alt: 'Chambre du bungalow Nsuini avec fenêtre sur la végétation' }
    ]
  }
];
