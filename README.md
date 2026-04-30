# Global Risk Intelligence Map (MVP)

Application Next.js + Leaflet + Tailwind qui affiche une carte du monde interactive avec filtres (catégorie, sous-catégorie dynamique, période), heatmap par pays et panneau d'information détaillé.

## Stack

- Next.js (App Router) + React + TypeScript
- Leaflet / React-Leaflet
- Tailwind CSS
- Zustand (état UI)
- Données simulées locales (`data/world-data.json`)

## Fonctionnalités

- Carte monde interactive avec hover, clic et sélection de pays
- Heatmap pays selon métrique choisie
- Tooltip au survol (nom + valeur)
- Filtres:
  - Catégorie: économie, géopolitique, science, environnement, énergie
  - Sous-catégorie dynamique
  - Période: temps réel, 1 mois, 1 an
- Légende dynamique gradient
- Info panel sous la carte (cards modernes + icônes + impact potentiel)
- Zoom automatique sur le pays sélectionné
- Design dark avec accent `#78c8a3`

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir `http://localhost:3000`.

## Vérifications

```bash
npx tsc --noEmit
npm run build
```

## Déploiement sur Vercel

1. Pousser le repo sur GitHub/GitLab/Bitbucket.
2. Importer le projet dans Vercel.
3. Build command: `npm run build`.
4. Output: configuration Next.js automatique.
5. Déployer.

Aucune variable d'environnement n'est requise pour le MVP mock data.
