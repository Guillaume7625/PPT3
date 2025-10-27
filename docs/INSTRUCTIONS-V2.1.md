# 📋 Instructions pour tester la Version 2.1

## 🎯 Objectif

Valider que la version 2.1 résout les deux problèmes critiques identifiés:
1. ❌ Graphiques non pertinents apparaissant avec les tableaux
2. ❌ Contenu débordant du cadre des slides

---

## 📁 Fichiers de test

### 1. Fichier principal v2.1
**Chemin**: `/home/user/webapp/improved/index-improved.html`
- ✅ Système d'avertissements activé
- ✅ Dimensions adaptatives pour tableaux
- ✅ Ajustement automatique taille de police
- ✅ Limitation 4 bullets maximum
- ✅ Wrapping activé

### 2. JSON de test complet
**Chemin**: `/home/user/webapp/test-v2.1.json`

Ce fichier contient 6 slides conçues pour tester toutes les corrections:
- Slide 1: Page de titre
- Slide 2: Test 6 bullets (devrait limiter à 4 + avertissement)
- Slide 3: Titre long + bullets longues (avertissements)
- Slide 4: Tableau 3 colonnes (dimensions adaptatives)
- Slide 5: Tableau 7 colonnes (avertissement + adaptation)
- Slide 6: Cellules longues (ajustement police + wrapping)

### 3. Archive complète
**Chemin**: `/home/user/webapp/ppt-v2.1.zip`
Contient tous les fichiers nécessaires pour exécution autonome.

---

## 🧪 Procédure de test

### Étape 1: Ouvrir l'application
1. Ouvrir le fichier `improved/index-improved.html` dans un navigateur
2. Vérifier que le titre indique "PowerPoint Generator Pro - v2.1"

### Étape 2: Tester avec le JSON de validation
1. Copier le contenu de `test-v2.1.json`
2. Coller dans le champ de droite de l'application
3. Observer la validation en temps réel

**Résultats attendus:**
```
✓ JSON valide (X avertissement(s))
```

**Avertissements attendus:**
- ⚠ Slide 2: 6 puces (max recommandé: 4)
- ⚠ Slide 3: titre long (XX car.) - risque de débordement
- ⚠ Slide 3, puce 1: XX mots (max recommandé: 12)
- ⚠ Slide 5: tableau avec 7 colonnes (max recommandé: 5)
- ⚠ Slide 6: cellule [0,2] longue (XX car.)
- ⚠ Slide 6: cellule [1,2] longue (XX car.)

### Étape 3: Générer le PowerPoint
1. Cliquer sur "Générer PowerPoint"
2. Attendre la génération (quelques secondes)
3. Le fichier `test-v2.1.pptx` devrait être téléchargé

### Étape 4: Vérifier le résultat
Ouvrir le fichier `.pptx` généré et vérifier:

**Slide 2 - Test bullets:**
- ✅ Devrait afficher SEULEMENT 4 bullets (pas 6)
- ✅ Pas de débordement vertical
- ✅ Espacement correct

**Slide 3 - Titre long:**
- ✅ Titre long mais lisible
- ✅ Première bullet longue avec texte réduit si nécessaire
- ✅ Pas de débordement

**Slide 4 - Tableau 3 colonnes:**
- ✅ Tableau centré horizontalement
- ✅ Colonnes de largeur égale
- ✅ Pas de débordement
- ✅ Police lisible (12-13pt)

**Slide 5 - Tableau 7 colonnes:**
- ✅ Tableau prend toute la largeur (max 9 inches)
- ✅ Colonnes compressées mais lisibles
- ✅ Centrage horizontal
- ✅ Pas de débordement

**Slide 6 - Cellules longues:**
- ✅ Texte long dans en-tête [0,2]: police réduite (11pt)
- ✅ Texte très long dans cellule [1,2]: police réduite (9pt)
- ✅ Retour à la ligne automatique (wrapping)
- ✅ Tout le texte visible
- ✅ Pas de débordement

---

## 🔄 Re-test avec marine-nationale.pptx

### Étape 1: Récupérer le JSON original
1. Si disponible, récupérer le JSON qui a généré `marine-nationale.pptx`
2. Ou créer un nouveau JSON similaire

### Étape 2: Coller dans v2.1
1. Ouvrir `improved/index-improved.html`
2. Coller le JSON
3. Observer les avertissements

### Étape 3: Générer et comparer
1. Générer le nouveau fichier
2. Comparer avec `marine-nationale.pptx` original

**Vérifications:**
- ✅ Pas de graphiques non pertinents
- ✅ Tableaux bien dimensionnés
- ✅ Contenu dans les limites des slides
- ✅ Police adaptée au contenu
- ✅ Pas de débordement

---

## ⚠️ Interprétation des avertissements

### Avertissement = Information, pas erreur
Les avertissements sont là pour **informer**, pas pour bloquer.

**Le fichier sera généré même avec des avertissements.**

### Types d'avertissements:

| Icône | Type | Signification | Action recommandée |
|-------|------|---------------|-------------------|
| ⚠️ | Titre long | Risque léger | Vérifier lisibilité |
| ⚠️ | Trop de bullets | Sera limité à 4 | Accepter ou réduire dans JSON |
| ⚠️ | Bullet longue | Risque moyen | Simplifier si possible |
| ⚠️ | Tableau large | Adaptation auto | Vérifier résultat |
| ⚠️ | Cellule longue | Police réduite | Vérifier lisibilité |

### Quand modifier le JSON:
- Si **plus de 5 avertissements** par slide
- Si cellules dépassent **50 caractères**
- Si tableaux dépassent **10 colonnes**
- Si bullets dépassent **20 mots**

---

## 📊 Comparaison avant/après

### Avant v2.1 (marine-nationale.pptx original):
- ❌ Tableaux débordent
- ❌ Texte sort du cadre
- ❌ Trop de contenu par slide
- ❌ Police fixe trop grande

### Après v2.1 (test-v2.1.pptx):
- ✅ Tableaux adaptés
- ✅ Texte dans les limites
- ✅ Maximum 4 bullets
- ✅ Police ajustée automatiquement

---

## 🐛 En cas de problème

### Problème 1: Avertissements ne s'affichent pas
**Cause**: Cache navigateur
**Solution**: Ctrl+F5 pour forcer le rechargement

### Problème 2: Tableaux encore trop larges
**Cause**: Trop de colonnes (> 10)
**Solution**: Réduire nombre de colonnes dans JSON

### Problème 3: Texte illisible (trop petit)
**Cause**: Cellules avec texte très long (> 50 car)
**Solution**: Simplifier le contenu dans JSON

### Problème 4: Génération échoue
**Cause**: Erreurs dans JSON (pas avertissements)
**Solution**: Corriger les erreurs affichées en rouge (❌)

---

## 📝 Checklist de validation

Cocher après test:

### Tests techniques
- [ ] Application v2.1 ouvre correctement
- [ ] Validation en temps réel fonctionne
- [ ] Avertissements s'affichent en jaune (⚠️)
- [ ] Erreurs s'affichent en rouge (❌)
- [ ] Génération réussit avec avertissements

### Tests visuels (fichier généré)
- [ ] Slide avec 6 bullets limite à 4
- [ ] Tableau 3 colonnes centré et adapté
- [ ] Tableau 7 colonnes adapté sans débordement
- [ ] Cellules longues avec police réduite
- [ ] Wrapping visible sur texte long
- [ ] Pas de contenu hors cadre

### Tests fonctionnels
- [ ] Re-test avec marine-nationale JSON
- [ ] Pas de graphiques non pertinents
- [ ] Tous les tableaux bien formatés
- [ ] Toutes les slides lisibles

---

## ✅ Validation finale

Une fois tous les tests passés:
1. ✅ Confirmer que v2.1 résout les problèmes
2. ✅ Noter les éventuelles améliorations souhaitées
3. ✅ Version prête pour utilisation production

---

## 📞 Support

Si problèmes persistent:
1. Vérifier la console du navigateur (F12)
2. Tester avec `test-v2.1.json` fourni
3. Comparer avec fichier généré attendu
4. Fournir captures d'écran du problème

---

**Version testée**: v2.1  
**Date de création**: 2025-10-27  
**Status**: ✅ Prêt pour tests utilisateur
