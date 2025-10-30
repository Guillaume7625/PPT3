# Guide de déploiement – PowerPoint Generator Pro (offline)

Ce package fournit une version 100 % hors-ligne de PowerPoint Generator Pro v2.1. Aucun serveur ni connexion Internet n'est requis.

## Version incluse
- v2.2-offline-secure (modularisation CSS/JS, CSP durcie sans inline, tests offline, packaging automatisé)

## Utilisation
1. Décompressez l'archive `PowerPointGeneratorPro_v2.2_offline.zip` sur votre poste.
2. Ouvrez le dossier `improved/` et double-cliquez sur `index-improved.html`.
   - Sur macOS, si le système bloque l'ouverture, faites un clic droit sur le fichier puis « Ouvrir ».
3. L'application fonctionne intégralement hors-ligne : génération PPTX, historique local et validations JSON.

## Scripts fournis

### Packaging
- `scripts/package_offline.sh`
  - Exécute au préalable `scripts/verify_offline.sh` (tests + contrôle anti-inline).
  - Crée `PowerPointGeneratorPro_v2.2_offline.zip` contenant uniquement le dossier `improved/`.
  - Produit la somme `PowerPointGeneratorPro_v2.2_offline.zip.sha256` pour vérifier l'intégrité.
  - Les répertoires de tests, fichiers de documentation développeur et métadonnées CI sont exclus du package.

### Vérifications offline
- `scripts/verify_offline.sh`
  - Vérifie l'absence de gestionnaires/style inline dans `index-improved.html`.
  - Exécute la suite de tests `node tests/run-tests.js` pour garantir la validité du validateur JSON.

## Vérification d'intégrité
Après exécution du script de packaging :
```bash
sha256sum -c PowerPointGeneratorPro_v2.2_offline.zip.sha256
```
(ou `shasum -a 256 -c ...` sur macOS). La commande doit retourner « OK ».

## Notes
- L'application ne réalise **aucun** appel réseau (`connect-src 'none'` dans la CSP).
- Toute évolution future devra mettre à jour la CSP de manière explicite si de nouvelles sources sont requises.
