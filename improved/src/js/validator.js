(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.PPTValidator = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  const SLIDE_TYPES = ['title', 'content', 'twoColumn', 'table', 'chart', 'image'];
  const CHART_TYPES = ['bar', 'line', 'pie'];

  function validateData(data) {
    const errors = [];
    const warnings = [];

    if (!data || typeof data !== 'object') {
      errors.push({ message: 'Le JSON doit être un objet', type: 'error' });
      return { errors, warnings };
    }

    if (!data.metadata) {
      errors.push({ message: 'metadata manquant', type: 'error' });
    } else {
      if (!data.metadata.title || typeof data.metadata.title !== 'string') {
        errors.push({ message: 'metadata.title est requis et doit être une chaîne', type: 'error' });
      }
      if (data.metadata.title && data.metadata.title.length > 100) {
        errors.push({ message: 'metadata.title ne doit pas dépasser 100 caractères', type: 'error' });
      }
      if (!data.metadata.fileName || typeof data.metadata.fileName !== 'string') {
        errors.push({ message: 'metadata.fileName est requis et doit être une chaîne', type: 'error' });
      }
    }

    if (!data.slides || !Array.isArray(data.slides) || data.slides.length === 0) {
      errors.push({ message: 'slides est requis et doit contenir au moins une slide', type: 'error' });
    } else {
      if (data.metadata?.expectedSlideCount) {
        const expected = Number(data.metadata.expectedSlideCount);
        if (!Number.isNaN(expected) && data.slides.length !== expected) {
          errors.push({ message: `Nombre de slides incorrect: ${data.slides.length} au lieu de ${expected} attendues`, type: 'error' });
        }
      }

      data.slides.forEach((slide, index) => {
        const slideNum = index + 1;

        if (!slide.type || !SLIDE_TYPES.includes(slide.type)) {
          errors.push({ message: `Slide ${slideNum}: type invalide ou manquant. Types acceptés: ${SLIDE_TYPES.join(', ')}`, type: 'error' });
        }

        if (!slide.title || typeof slide.title !== 'string') {
          errors.push({ message: `Slide ${slideNum}: title manquant ou invalide`, type: 'error' });
        }

        if (slide.title && slide.title.length > 60) {
          errors.push({ message: `Slide ${slideNum}: title trop long (max 60 caractères)`, type: 'error' });
        }

        if (slide.title && slide.title.length > 50) {
          warnings.push({ message: `⚠ Slide ${slideNum}: titre long (${slide.title.length} car.) - risque de débordement`, type: 'warning' });
        }

        switch (slide.type) {
          case 'content':
            if (!slide.bullets || !Array.isArray(slide.bullets) || slide.bullets.length === 0) {
              errors.push({ message: `Slide ${slideNum}: bullets manquants ou vides`, type: 'error' });
            } else {
              if (slide.bullets.length > 4) {
                warnings.push({ message: `⚠ Slide ${slideNum}: ${slide.bullets.length} puces (max recommandé: 4) - seules les 4 premières seront affichées`, type: 'warning' });
              }
              slide.bullets.forEach((bullet, bIdx) => {
                const wordCount = String(bullet).split(/\s+/).length;
                if (wordCount > 12) {
                  warnings.push({ message: `⚠ Slide ${slideNum}, puce ${bIdx + 1}: ${wordCount} mots (max recommandé: 12) - risque de débordement`, type: 'warning' });
                }
              });
            }
            break;

          case 'twoColumn':
            if (!slide.leftContent || !Array.isArray(slide.leftContent)) {
              errors.push({ message: `Slide ${slideNum}: leftContent manquant ou invalide`, type: 'error' });
            } else if (slide.leftContent.length > 4) {
              warnings.push({ message: `⚠ Slide ${slideNum}: colonne gauche avec ${slide.leftContent.length} éléments (max recommandé: 4)`, type: 'warning' });
            }
            if (!slide.rightContent || !Array.isArray(slide.rightContent)) {
              errors.push({ message: `Slide ${slideNum}: rightContent manquant ou invalide`, type: 'error' });
            } else if (slide.rightContent.length > 4) {
              warnings.push({ message: `⚠ Slide ${slideNum}: colonne droite avec ${slide.rightContent.length} éléments (max recommandé: 4)`, type: 'warning' });
            }
            break;

          case 'table':
            if (!slide.tableData || !Array.isArray(slide.tableData) || slide.tableData.length < 2) {
              errors.push({ message: `Slide ${slideNum}: tableData doit contenir au moins 2 lignes`, type: 'error' });
            } else {
              const numCols = slide.tableData[0]?.length || 0;
              const numRows = slide.tableData.length;

              if (numCols > 5) {
                warnings.push({ message: `⚠ Slide ${slideNum}: tableau avec ${numCols} colonnes (max recommandé: 5) - risque de débordement`, type: 'warning' });
              }
              if (numRows > 8) {
                warnings.push({ message: `⚠ Slide ${slideNum}: tableau avec ${numRows} lignes (max recommandé: 8) - risque de débordement`, type: 'warning' });
              }

              slide.tableData.forEach((row, rIdx) => {
                row.forEach((cell, cIdx) => {
                  const cellText = String(cell || '');
                  if (cellText.length > 30) {
                    warnings.push({ message: `⚠ Slide ${slideNum}: cellule [${rIdx},${cIdx}] longue (${cellText.length} car.) - risque de débordement`, type: 'warning' });
                  }
                });
              });
            }
            break;

          case 'chart':
            if (!slide.chartType || !CHART_TYPES.includes(slide.chartType)) {
              errors.push({ message: `Slide ${slideNum}: chartType invalide. Types acceptés: ${CHART_TYPES.join(', ')}`, type: 'error' });
            }
            if (!slide.data || !Array.isArray(slide.data) || slide.data.length === 0) {
              errors.push({ message: `Slide ${slideNum}: data manquant pour le graphique`, type: 'error' });
            }
            break;
        }
      });
    }

    return { errors, warnings };
  }

  return {
    validateData
  };
});
