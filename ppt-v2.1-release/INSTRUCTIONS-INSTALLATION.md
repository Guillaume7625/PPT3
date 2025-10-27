# PowerPoint Generator Pro v2.1 - Instructions d'Installation

## 📦 Contenu du Package

Ce package contient les fichiers suivants:
- `index.html` - Application principale (version 2.1 avec corrections anti-débordement)
- `pptxgen.bundle.js` - Bibliothèque PptxGenJS (467 KB)
- `README.md` - Documentation complète
- `INSTRUCTIONS-INSTALLATION.md` - Ce fichier

## 🚀 Installation (3 étapes simples)

### Étape 1: Extraire les fichiers
1. **Décompressez** le fichier `ppt-v2.1.zip`
2. Vous obtiendrez un dossier `ppt-v2.1-release` contenant les fichiers

### Étape 2: Placer les fichiers ensemble
⚠️ **IMPORTANT**: Les 2 fichiers suivants DOIVENT être dans le **même dossier**:
- `index.html`
- `pptxgen.bundle.js`

### Étape 3: Ouvrir l'application
1. **Double-cliquez** sur `index.html`
2. L'application s'ouvre dans votre navigateur par défaut
3. ✅ C'est prêt! Vous pouvez générer des PowerPoint

## 💻 Utilisation

### Méthode 1: Avec un template pré-défini
1. Cliquez sur le bouton **"📄 Templates"**
2. Choisissez un template (Business, Marketing, ou Quarterly Report)
3. Le JSON est automatiquement chargé
4. Cliquez sur **"▶ Générer PowerPoint"**
5. Le fichier .pptx se télécharge automatiquement

### Méthode 2: Avec votre propre JSON
1. Copiez votre JSON généré par l'IA (ChatGPT, Claude, etc.)
2. Collez-le dans la zone de texte à droite
3. La validation s'affiche en temps réel:
   - ✓ JSON valide (vert) = Prêt à générer
   - ⚠ Warnings (jaune) = Génération possible avec avertissements
   - ✗ Erreurs (rouge) = Correction nécessaire avant génération
4. Cliquez sur **"▶ Générer PowerPoint"**
5. Le fichier .pptx se télécharge automatiquement

## ⚠️ Nouveautés v2.1 (Anti-débordement)

### Corrections Principales
✅ **Plus de contenu débordant des slides!**
- Bullets automatiquement limités à 4 maximum
- Tables avec dimensions adaptatives
- Taille de police ajustée automatiquement
- Text wrapping activé partout

✅ **Système d'avertissements préventifs**
- Warnings (⚠️ jaune) pour contenu risquant débordement
- Erreurs (❌ rouge) pour structure JSON invalide
- Génération possible avec warnings (bloquée uniquement par erreurs)

### Limites Recommandées (Warnings si dépassées)
- **Titres**: Max 50 caractères
- **Bullets**: Max 4 par slide, max 12 mots par bullet
- **Tables**: Max 5 colonnes × 8 lignes
- **Cellules**: Max 30 caractères

## 🔧 Dépannage

### Erreur "Bibliothèque PptxGenJS manquante"
**Cause**: Les fichiers ne sont pas dans le même dossier
**Solution**: 
1. Vérifiez que `index.html` et `pptxgen.bundle.js` sont ensemble
2. Rechargez la page (F5)

### Le bouton "Générer" est grisé
**Cause**: JSON invalide ou erreurs détectées
**Solution**:
1. Vérifiez les messages d'erreur affichés en rouge
2. Corrigez le JSON selon les indications
3. Le bouton se débloque automatiquement

### Warnings en jaune affichés
**Cause**: Contenu risquant débordement (non bloquant)
**Solution**:
- Vous pouvez générer quand même (clic sur "Générer PowerPoint")
- La v2.1 adaptera automatiquement le contenu
- Ou corrigez le JSON pour éliminer les warnings

### Le fichier .pptx ne se télécharge pas
**Cause**: Bloqueur de pop-ups du navigateur
**Solution**:
1. Autorisez les téléchargements pour ce fichier
2. Cliquez à nouveau sur "Générer PowerPoint"

## 📱 Compatibilité

### Navigateurs Supportés
✅ Chrome / Edge (recommandé)
✅ Firefox
✅ Safari
✅ Opera

### Systèmes d'Exploitation
✅ Windows 10/11
✅ macOS (toutes versions)
✅ Linux (toutes distributions)

### PowerPoint Versions
Les fichiers .pptx générés sont compatibles avec:
✅ Microsoft PowerPoint 2016 et supérieur
✅ Microsoft PowerPoint Online
✅ Google Slides (import)
✅ LibreOffice Impress
✅ Keynote (macOS)

## 🔒 Sécurité & Confidentialité

### 100% Offline
- ✅ Aucune connexion Internet requise
- ✅ Toutes les données restent sur votre ordinateur
- ✅ Aucune donnée envoyée à un serveur externe
- ✅ Fonctionnement local complet

### Content Security Policy
- Protection contre les injections malveillantes
- Scripts externes bloqués
- Connexions réseau désactivées

### Stockage Local
- Auto-sauvegarde toutes les 10 secondes
- Historique des 10 dernières générations
- Données stockées uniquement dans le navigateur
- Suppression possible via bouton "Effacer"

## 📚 Structure du JSON

### Format Minimal
```json
{
  "metadata": {
    "title": "Ma Présentation",
    "fileName": "presentation.pptx",
    "author": "Votre Nom"
  },
  "slides": [
    {
      "type": "title",
      "title": "Titre Principal",
      "subtitle": "Sous-titre"
    },
    {
      "type": "content",
      "title": "Titre de la Slide",
      "bullets": [
        "Point 1",
        "Point 2",
        "Point 3"
      ]
    }
  ]
}
```

### Types de Slides Disponibles
- `title` - Slide de titre avec subtitle
- `content` - Bullets points (max 4 recommandés)
- `twoColumn` - Deux colonnes de bullets
- `table` - Tableau de données (max 5 cols × 8 rows recommandés)
- `chart` - Graphique (bar, line, pie)
- `image` - Placeholder pour image

## 📞 Support

### Documentation Complète
- Consultez `README.md` pour plus de détails
- Exemples de JSON dans les templates

### Problèmes Connus
Aucun problème connu dans la v2.1 ✅

### Versions
- **v1.0**: Version initiale
- **v2.0**: Audit complet + 15 nouvelles fonctionnalités
- **v2.1**: Corrections anti-débordement (version actuelle)

## ✅ Checklist d'Installation

- [ ] Fichier `ppt-v2.1.zip` téléchargé
- [ ] Archive extraite
- [ ] Fichiers `index.html` et `pptxgen.bundle.js` dans le même dossier
- [ ] `index.html` ouvert dans le navigateur
- [ ] Message "Système prêt" affiché en haut à gauche
- [ ] Test avec un template effectué
- [ ] Premier .pptx généré avec succès ✅

---

**🎉 Vous êtes prêt à générer des PowerPoint professionnels!**

Version: 2.1 (Anti-débordement)  
Date: 27 octobre 2025  
Repository: https://github.com/Guillaume7625/PPT3
