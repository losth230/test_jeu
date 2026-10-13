# Imperium Saeculi IX

Jeu de stratégie géopolitique au 9e siècle (inspiré de Geopolitical Simulator × Crusader Kings), jouable dans le navigateur.

## Développement

```bash
npm install
npm run dev      # serveur de dev local
npm test         # tests de la logique de simulation
npm run build    # build de production dans dist/
```

## Déploiement (GitHub Pages)

Le workflow `.github/workflows/deploy.yml` build et publie automatiquement le site à chaque push sur `main`.

À activer une seule fois dans **Settings → Pages → Source : GitHub Actions**.

## Structure

- `src/engine/` — moteur de jeu pur (types, simulation, setup), sans dépendance à React
- `src/App.tsx` — interface joueur
- `index.html` — point d'entrée

Le moteur est volontairement séparé de l'UI pour rester testable et portable.
