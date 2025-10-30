# Guide développeur – Tests de validation JSON

Ce projet inclut désormais une base de tests hors ligne pour vérifier la logique de validation du JSON utilisé par PowerPoint Generator Pro.

## Prérequis
- Node.js (>= 16) installé localement. Aucun autre outil n'est nécessaire.

## Lancer la suite de tests
```bash
node tests/run-tests.js
```

La commande lit les jeux de données contenus dans `tests/` et applique le validateur (`improved/src/js/validator.js`). Le script affiche un résumé détaillé avec ✅/❌ et renvoie un code de sortie non nul en cas d'échec.

## Cas actuellement couverts
- `test_valid_basic.json` : JSON minimal valide (aucune erreur ni avertissement).
- `test_invalid_too_many_bullets.json` : slide de type `content` avec plus de 4 puces → avertissement attendu.
- `test_invalid_table_too_large.json` : tableau dépassant les limites recommandées → avertissements attendus.
- `test_invalid_missing_metadata.json` : absence de bloc `metadata` → erreurs attendues.

## Pistes de couverture future
- Cas limites sur les graphiques (`chart`) avec données manquantes ou types invalides.
- Vérifications supplémentaires sur les contenus très longs (titres, puces, cellules de tableau) pour affiner les avertissements.
- Tests d'intégration couvrant la génération PPTX et l'historique local.

Toutes ces opérations restent 100 % offline et ne nécessitent aucune dépendance externe.

## Vérifications rapides
- `scripts/verify_offline.sh` exécute automatiquement la suite de tests et s'assure qu'aucun attribut inline n'a été réintroduit dans `index-improved.html`.
