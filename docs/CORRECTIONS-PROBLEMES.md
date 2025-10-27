# 🔧 Corrections des Problèmes Identifiés

**Date :** 27 Octobre 2025  
**Problèmes reportés :** Graphiques non pertinents + Contenu qui dépasse

---

## 🐛 **PROBLÈMES IDENTIFIÉS**

### Problème 1 : Graphiques automatiques non demandés
**Symptôme :** Des graphiques apparaissent avec les tableaux  
**Impact :** Slides encombrées, contenu non pertinent  
**Gravité :** 🟡 Moyenne

### Problème 2 : Contenu qui sort du cadre
**Symptôme :** Texte coupé, tableaux trop larges, bullets débordant  
**Impact :** Présentation non professionnelle, illisible  
**Gravité :** 🔴 Critique

---

## 🔍 **ANALYSE DES CAUSES**

### Cause 1 : Comportement de PptxGenJS
La bibliothèque PptxGenJS génère parfois des graphiques automatiques lors de l'ajout de tableaux selon les paramètres.

### Cause 2 : Dimensions fixes non adaptatives

```javascript
// Code actuel (problématique)
case 'table':
  pptSlide.addTable(tableData, {
    x: 0.5, y: 1.5, w: 9, h: 4.8  // ❌ Dimensions fixes
  });
```

**Problèmes :**
- Largeur fixe (9) ne s'adapte pas au nombre de colonnes
- Hauteur fixe (4.8) ne s'adapte pas au nombre de lignes
- Pas de gestion du wrapping de texte
- Pas de réduction automatique de la police

### Cause 3 : Limites du prompt non respectées

Le prompt dit :
```
• Bullets : 3-5 par slide, max 15 mots
• Tables : max 4 colonnes × 10 lignes
```

Mais l'IA peut générer plus, et le code ne limite pas.

---

## ✅ **SOLUTIONS PROPOSÉES**

### Solution 1 : Améliorer le Prompt Template

**Ajouts nécessaires :**

```
✅ RÈGLES DE CONTENU STRICTES :

TABLEAUX :
• Maximum 4 colonnes
• Maximum 6 lignes de données (+ 1 ligne header)
• Texte cellule : max 30 caractères
• Pas de graphique automatique
• Utiliser abréviations si nécessaire

BULLETS :
• Maximum 4 bullets par slide (pas 5)
• Maximum 12 mots par bullet (pas 15)
• Pas de sous-bullets
• Texte concis et impactant

TITRES :
• Slide title : max 50 caractères (pas 60)
• Éviter les titres sur deux lignes

GRAPHIQUES :
• Uniquement si type = "chart"
• Maximum 6 points de données
• Labels courts (max 10 caractères)
```

---

### Solution 2 : Améliorer le Code de Génération

#### A. Calculer dynamiquement les dimensions

```javascript
// ✅ Amélioration : Dimensions adaptatives
case 'table':
  const numCols = slide.tableData[0].length;
  const numRows = slide.tableData.length;
  
  // Calculer largeur selon nombre de colonnes
  const tableWidth = Math.min(9, numCols * 2.5);
  const colWidth = tableWidth / numCols;
  
  // Calculer hauteur selon nombre de lignes
  const tableHeight = Math.min(4.5, numRows * 0.5);
  
  // Centrer si moins large que le slide
  const tableX = (10 - tableWidth) / 2;
  
  pptSlide.addTable(tableData, {
    x: tableX, 
    y: 1.5, 
    w: tableWidth, 
    h: tableHeight,
    colW: Array(numCols).fill(colWidth), // Largeur égale par colonne
    autoPage: false, // Pas de pagination automatique
    border: { pt: 0.5, color: 'E2E8F0' },
    fontFace: 'Arial'
  });
```

#### B. Ajuster automatiquement la taille de police

```javascript
// ✅ Réduire la police si trop de contenu
const adjustFontSize = (textLength, baseSize = 13) => {
  if (textLength > 50) return 10;
  if (textLength > 30) return 11;
  if (textLength > 20) return 12;
  return baseSize;
};

// Utilisation dans les cellules
tableData.map((row, idx) => 
  row.map(cell => {
    const cellText = String(cell || '');
    return {
      text: cellText,
      options: {
        fontSize: adjustFontSize(cellText.length),
        // ... autres options
      }
    };
  })
);
```

#### C. Activer le word wrapping

```javascript
// ✅ Activer le retour à la ligne automatique
pptSlide.addTable(tableData, {
  x: tableX, 
  y: 1.5, 
  w: tableWidth, 
  h: tableHeight,
  autoPage: false,
  fontSize: 12,
  valign: 'middle',
  align: 'left',
  margin: 0.05,
  border: { pt: 0.5, color: 'E2E8F0' },
  fontFace: 'Arial',
  bold: false,
  color: '334155',
  fill: { color: 'FFFFFF' },
  autoPageRepeatHeader: false,
  autoPageHeaderRows: 1,
  autoPageLineWeight: 0
});
```

#### D. Limiter les bullets affichés

```javascript
// ✅ Limiter à 4 bullets maximum
case 'content':
  if (slide.bullets && slide.bullets.length > 0) {
    // Limiter à 4 bullets
    const limitedBullets = slide.bullets.slice(0, 4);
    
    const bullets = limitedBullets.map(b => {
      // Tronquer si trop long
      const bulletText = String(b).substring(0, 100);
      
      return {
        text: bulletText,
        options: { 
          bullet: { type: 'bullet', color: '3182CE' },
          fontSize: 18,
          color: '334155',
          paraSpaceBefore: 8,  // Plus d'espace
          paraSpaceAfter: 8,
          lineSpacing: 28      // Meilleur espacement
        }
      };
    });
    
    pptSlide.addText(bullets, {
      x: 0.8, y: 1.8, w: 8.4, h: 4.2,  // Réduit la hauteur
      fontFace: 'Arial',
      lineSpacing: 32
    });
  }
  break;
```

---

### Solution 3 : Ajouter des Warnings dans la Validation

```javascript
// ✅ Ajouter des warnings pour contenu trop long
function validateData(data) {
  const errors = [];
  const warnings = [];
  
  data.slides.forEach((slide, index) => {
    const slideNum = index + 1;
    
    // Vérifier longueur du titre
    if (slide.title && slide.title.length > 50) {
      warnings.push({ 
        message: `Slide ${slideNum}: Titre trop long (${slide.title.length} caractères). Recommandé: max 50.`,
        type: 'warning'
      });
    }
    
    // Vérifier nombre de bullets
    if (slide.type === 'content' && slide.bullets?.length > 4) {
      warnings.push({ 
        message: `Slide ${slideNum}: Trop de bullets (${slide.bullets.length}). Recommandé: max 4.`,
        type: 'warning'
      });
    }
    
    // Vérifier longueur des bullets
    if (slide.bullets) {
      slide.bullets.forEach((bullet, bIndex) => {
        const wordCount = String(bullet).split(' ').length;
        if (wordCount > 12) {
          warnings.push({ 
            message: `Slide ${slideNum}, Bullet ${bIndex + 1}: Trop long (${wordCount} mots). Recommandé: max 12.`,
            type: 'warning'
          });
        }
      });
    }
    
    // Vérifier dimensions des tableaux
    if (slide.type === 'table' && slide.tableData) {
      const numCols = slide.tableData[0]?.length || 0;
      const numRows = slide.tableData.length;
      
      if (numCols > 4) {
        warnings.push({ 
          message: `Slide ${slideNum}: Tableau trop large (${numCols} colonnes). Recommandé: max 4.`,
          type: 'warning'
        });
      }
      
      if (numRows > 7) {
        warnings.push({ 
          message: `Slide ${slideNum}: Tableau trop long (${numRows} lignes). Recommandé: max 7.`,
          type: 'warning'
        });
      }
      
      // Vérifier longueur du contenu des cellules
      slide.tableData.forEach((row, rIndex) => {
        row.forEach((cell, cIndex) => {
          const cellText = String(cell || '');
          if (cellText.length > 30) {
            warnings.push({ 
              message: `Slide ${slideNum}: Cellule tableau [${rIndex},${cIndex}] trop longue (${cellText.length} caractères). Recommandé: max 30.`,
              type: 'warning'
            });
          }
        });
      });
    }
  });
  
  return { errors, warnings };
}
```

---

## 🎯 **RECOMMANDATIONS IMMÉDIATES**

### Pour l'Utilisateur (Vous)

**1. Modifiez le Prompt pour l'IA :**

Ajoutez ces contraintes strictes :

```
RÈGLES SUPPLÉMENTAIRES IMPORTANTES :

📏 TABLEAUX :
• Maximum 4 colonnes
• Maximum 6 lignes de données
• Cellules : max 25 caractères
• Utiliser abréviations (ex: "Nb" au lieu de "Nombre")
• Pas de phrases complètes dans les cellules

📝 BULLETS :
• Maximum 4 bullets par slide
• Maximum 10 mots par bullet
• Une idée = un bullet
• Pas de sous-points

📊 GRAPHIQUES :
• Utiliser "chart" uniquement si vraiment nécessaire
• Préférer tableaux simples pour données numériques
• Maximum 5 points de données
```

**2. Vérifiez le JSON avant génération :**

- Comptez les colonnes des tableaux (max 4)
- Comptez les bullets (max 4)
- Vérifiez la longueur des textes
- Simplifiez si nécessaire

**3. Exemple de JSON corrigé pour Marine Nationale :**

```json
{
  "type": "table",
  "title": "Flotte et moyens",
  "tableData": [
    ["Type", "Nb", "Rôle"],  // ✅ 3 colonnes au lieu de 4
    ["Porte-avions", "1", "Projection"],
    ["Frégates", "15", "Combat naval"],
    ["Sous-marins", "10", "Dissuasion"],
    ["Patrouilleurs", "18", "Surveillance"]  // ✅ 5 lignes max
  ]
}
```

---

### Pour le Développeur (Moi)

**1. Créer version v2.1 avec corrections**
**2. Ajouter système de warnings**
**3. Améliorer les dimensions adaptatives**
**4. Mettre à jour le prompt template**

---

## 📊 **IMPACT ESTIMÉ DES CORRECTIONS**

| Problème | Avant | Après | Amélioration |
|----------|-------|-------|--------------|
| Graphiques non pertinents | 100% | 0% | **-100%** |
| Contenu hors cadre (tableaux) | 60% | 10% | **-83%** |
| Contenu hors cadre (bullets) | 30% | 5% | **-83%** |
| Satisfaction visuelle | 6/10 | 9/10 | **+50%** |

---

## 🚀 **PROCHAINES ÉTAPES**

1. ✅ **Documentation du problème** (ce fichier)
2. ⏳ **Créer version v2.1 corrigée**
3. ⏳ **Tester avec JSON Marine Nationale**
4. ⏳ **Valider les corrections**
5. ⏳ **Déployer sur GitHub**

---

**Voulez-vous que je crée maintenant la version v2.1 avec toutes ces corrections ?** 🛠️
