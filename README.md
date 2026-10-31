# Noumbi Resort · site vitrine

Site statique codé à la main (HTML, CSS, JavaScript), sans framework ni dépendance.
Refonte du site Bubble `noumbiresort.bubbleapps.io`, d'après la maquette « une journée à Noumbi ».

Identité conservée : orange #E85D04, Caudex (titres), Montserrat (texte), logo et photos du client.

## Structure

```
index.html        page d'accueil
bungalow.html     page détail d'un bungalow (bungalow.html?b=kelly)
css/style.css     style, mobile d'abord (desktop à partir de 900px)
js/main.js        animations et interactions
js/bungalows.js   données des bungalows : photos, détails, prix
js/bungalow.js    remplit la page détail et gère sa galerie
assets/img/       photos en WebP (version 700px pour mobile + grande version)
assets/video/     vidéo de vagues pour l'accueil (optionnelle)
```

## Voir le site en local

```bash
npx http-server noumbi-resort -p 5174 -c-1
```

Puis ouvrir http://localhost:5174

## Animations

| Section | Effet |
|---|---|
| Accueil | lettres du titre une par une, vague orange qui se dessine, léger zoom arrière de la photo |
| Toute la page | le fond passe du sable (matin) au pêche (coucher de soleil) puis au bleu nuit |
| Histoire | la frise 2005 → aujourd'hui se trace au scroll |
| Camp | galerie horizontale : au doigt sur mobile, glisser ou flèches sur desktop |
| Bungalows | filtre par capacité, chaque carte ouvre la page du bungalow |
| Page bungalow | galerie à swiper au doigt, glisser à la souris, flèches, miniatures et clavier |
| Accès | le trajet s'allume étape par étape au scroll |
| Partout | apparitions douces, bouton WhatsApp flottant après l'accueil |

Le réglage « réduire les animations » du téléphone ou de l'ordinateur coupe tout.

## À faire avant la mise en ligne

Rechercher `À REMPLACER`, `À VÉRIFIER` et `À COMPLÉTER` dans `index.html` et `js/bungalows.js`.

1. **Photo de surf** pour la carte Surf (aucune sur l'ancien site).
2. **3 vrais avis clients**, avec leur accord.
3. **Photos et équipements des bungalows** : vérifier avec le client quelle photo va avec quel bungalow, puis ajouter les photos de chaque bungalow dans `js/bungalows.js` (elles remplacent les emplacements « à ajouter » de la galerie). Les équipements (salle de bain, électricité…) se complètent au même endroit. Les prix sont écrits à la fois dans `index.html` et `js/bungalows.js`.
4. **Carte** : la carte de l'ancien site pointait près de Brazzaville. Mettre les coordonnées exactes du resort dans `data-map-src` (ex. `q=-3.9,11.4`).
5. **Numéro WhatsApp** : `242055338959` est utilisé partout (constante `WHATSAPP` dans `js/main.js` et liens dans `index.html`). La bio Instagram mentionne un second numéro.
6. **Vidéo d'accueil (optionnel)** : boucle de vagues de 5 s, muette, moins de 1,5 Mo, puis ajouter `data-video="assets/video/vagues.mp4"` sur `.hero-media`. Elle ne se charge jamais sur mobile.
   ```bash
   ffmpeg -i source.mp4 -t 5 -an -vf "scale=1600:-2" -c:v libx264 -crf 28 -preset slow -movflags +faststart assets/video/vagues.mp4
   ```

## Ajouter une photo

```bash
ffmpeg -i photo.jpg -vf "scale=1400:-2" -c:v libwebp -quality 60 assets/img/nom.webp
ffmpeg -i photo.jpg -vf "scale=700:-2" -c:v libwebp -quality 60 assets/img/nom-700.webp
```

## Mise en ligne gratuite

Netlify (glisser-déposer le dossier sur app.netlify.com/drop), Vercel ou GitHub Pages.
Pour un nom de domaine (ex. noumbiresort.com), le relier ensuite dans les réglages de l'hébergeur.
