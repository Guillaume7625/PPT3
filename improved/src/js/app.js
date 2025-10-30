// ============================================================================
// CONFIGURATION & CONSTANTS
// ============================================================================

const CONFIG = {
  AUTO_SAVE_DELAY: 10000, // 10 secondes
  MAX_HISTORY_ITEMS: 10,
  STORAGE_KEYS: {
    CURRENT_JSON: 'pptgen_current_json',
    HISTORY: 'pptgen_history'
  }
};

// ============================================================================
// TEMPLATES PRÉ-DÉFINIS
// ============================================================================

const TEMPLATES = {
  business: {
    name: 'Présentation Business',
    description: '8 slides · Style professionnel',
    data: {
      metadata: {
        title: 'Présentation Business',
        fileName: 'business-presentation.pptx',
        author: 'PowerPoint Generator Pro',
        expectedSlideCount: 8
      },
      slides: [
        { type: 'title', title: 'Présentation Business', subtitle: 'Stratégie & Perspectives' },
        { type: 'content', title: 'Vue d\'ensemble', bullets: ['Mission et vision', 'Objectifs stratégiques', 'Valeurs fondamentales'] },
        { type: 'twoColumn', title: 'Forces & Opportunités', leftContent: ['Expertise reconnue', 'Équipe talentueuse', 'Innovation continue'], rightContent: ['Marché en croissance', 'Nouvelles technologies', 'Partenariats stratégiques'] },
        { type: 'chart', title: 'Croissance sur 3 ans', chartType: 'bar', data: [{ label: '2023', value: 45 }, { label: '2024', value: 62 }, { label: '2025', value: 78 }] },
        { type: 'table', title: 'Indicateurs Clés', tableData: [['KPI', 'Cible', 'Réalisé'], ['CA', '5M€', '5.2M€'], ['Clients', '150', '165'], ['Satisfaction', '85%', '92%']] },
        { type: 'content', title: 'Feuille de Route', bullets: ['Q1: Expansion internationale', 'Q2: Nouveaux produits', 'Q3: Digitalisation', 'Q4: Bilan projection'] },
        { type: 'image', title: 'Notre Équipe', imagePath: 'IMAGE_PLACEHOLDER_team-photo' },
        { type: 'content', title: 'Conclusion', bullets: ['Merci pour votre attention', 'Questions & Discussion', 'Contact: contact@example.com'] }
      ]
    }
  },
  marketing: {
    name: 'Pitch Marketing',
    description: '6 slides · Style créatif',
    data: {
      metadata: {
        title: 'Campagne Marketing Digitale',
        fileName: 'marketing-pitch.pptx',
        author: 'Marketing Team',
        expectedSlideCount: 6
      },
      slides: [
        { type: 'title', title: 'Campagne Marketing 2025', subtitle: 'Stratégie Digitale Innovante' },
        { type: 'content', title: 'Objectifs de la Campagne', bullets: ['Augmenter la visibilité de 50%', 'Générer 1000 leads qualifiés', 'ROI de 300% en 6 mois'] },
        { type: 'chart', title: 'Budget Allocation', chartType: 'pie', data: [{ label: 'Social Media', value: 40 }, { label: 'SEO/SEM', value: 30 }, { label: 'Content', value: 20 }, { label: 'Influence', value: 10 }] },
        { type: 'twoColumn', title: 'Canaux & Tactiques', leftContent: ['LinkedIn: B2B targeting', 'Instagram: Visual content', 'YouTube: Tutorials'], rightContent: ['Automation emails', 'Webinars mensuels', 'Podcasts sectoriels'] },
        { type: 'table', title: 'Timeline', tableData: [['Mois', 'Action', 'KPI'], ['Janvier', 'Lancement', '500 vues'], ['Février', 'Optimisation', '200 leads'], ['Mars', 'Scale-up', '500 leads']] },
        { type: 'content', title: 'Next Steps', bullets: ['Validation du budget cette semaine', 'Kick-off meeting le 15 janvier', 'Premier reporting fin février'] }
      ]
    }
  },
  quarterly: {
    name: 'Rapport Trimestriel',
    description: '10 slides · Style analytique',
    data: {
      metadata: {
        title: 'Rapport Q4 2024',
        fileName: 'quarterly-report-q4.pptx',
        author: 'Finance Department',
        expectedSlideCount: 10
      },
      slides: [
        { type: 'title', title: 'Rapport Trimestriel Q4 2024', subtitle: 'Résultats & Perspectives' },
        { type: 'content', title: 'Points Clés', bullets: ['Croissance de 15% vs Q3', 'Rentabilité en hausse', 'Expansion réussie'] },
        { type: 'chart', title: 'Chiffre d\'Affaires', chartType: 'line', data: [{ label: 'Q1', value: 1.2 }, { label: 'Q2', value: 1.4 }, { label: 'Q3', value: 1.6 }, { label: 'Q4', value: 1.85 }] },
        { type: 'table', title: 'Performance par Région', tableData: [['Région', 'CA M€', 'Var%'], ['Europe', '0.8', '+12%'], ['Amérique', '0.6', '+18%'], ['Asie', '0.45', '+20%']] },
        { type: 'chart', title: 'Répartition Clients', chartType: 'pie', data: [{ label: 'PME', value: 45 }, { label: 'ETI', value: 35 }, { label: 'Grands Comptes', value: 20 }] },
        { type: 'twoColumn', title: 'Succès & Défis', leftContent: ['Nouveau produit lancé', '25% de clients récurrents', 'NPS de 72'], rightContent: ['Délais de livraison', 'Turn-over 12%', 'Coûts logistiques'] },
        { type: 'content', title: 'Initiatives Q1 2025', bullets: ['Automatisation production', 'Programme fidélité', 'Recrutement 15 postes', 'Partenariat stratégique'] },
        { type: 'table', title: 'Prévisions 2025', tableData: [['Trimestre', 'CA Prévu', 'Marge'], ['Q1', '2.0M€', '28%'], ['Q2', '2.2M€', '30%'], ['Q3', '2.3M€', '31%'], ['Q4', '2.5M€', '32%']] },
        { type: 'image', title: 'Nouveau Produit', imagePath: 'IMAGE_PLACEHOLDER_product-launch' },
        { type: 'content', title: 'Conclusion', bullets: ['Année exceptionnelle', '2025 très prometteuse', 'Merci à toutes les équipes'] }
      ]
    }
  }
};

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

let autoSaveTimeout = null;
let validationTimeout = null;

// ============================================================================
// INITIALIZATION
// ============================================================================

window.addEventListener('DOMContentLoaded', () => {
  initLibraryCheck();
  loadSavedJSON();
  setupEventListeners();
  populateTemplates();
});

function initLibraryCheck() {
  const dot = document.getElementById('statusDot');
  const text = document.getElementById('statusText');
  
  if (typeof PptxGenJS !== 'undefined' || typeof window.PptxGenJS !== 'undefined' || typeof pptxgen !== 'undefined') {
    if (typeof PptxGenJS === 'undefined' && typeof pptxgen !== 'undefined') {
      window.PptxGenJS = pptxgen;
    }
    dot.className = 'status-dot';
    text.textContent = 'Système prêt';
  } else {
    dot.className = 'status-dot error';
    text.textContent = 'Bibliothèque manquante';
    showToast('error', '⚠️ Placez pptxgen.bundle.js dans le même dossier');
  }
}

function setupEventListeners() {
  const jsonInput = document.getElementById('jsonInput');
  const templatesBtn = document.getElementById('templatesBtn');
  const historyBtn = document.getElementById('historyBtn');
  const generateBtn = document.getElementById('generateBtn');
  const copyPromptBtn = document.getElementById('copyPromptBtn');
  const clearJsonBtn = document.getElementById('clearJsonBtn');
  const importJsonBtn = document.getElementById('importJsonBtn');
  const exportJsonBtn = document.getElementById('exportJsonBtn');
  const closeTemplatesBtn = document.getElementById('closeTemplatesBtn');
  const closeHistoryBtn = document.getElementById('closeHistoryBtn');
  const fileInput = document.getElementById('fileInput');

  // Validation en temps réel
  jsonInput.addEventListener('input', () => {
    clearTimeout(validationTimeout);
    validationTimeout = setTimeout(() => {
      validateJSONRealtime();
    }, 500);

    // Auto-save
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      saveJSON();
    }, CONFIG.AUTO_SAVE_DELAY);
  });

  if (templatesBtn) {
    templatesBtn.addEventListener('click', openTemplatesModal);
  }

  if (historyBtn) {
    historyBtn.addEventListener('click', openHistoryModal);
  }

  if (generateBtn) {
    generateBtn.addEventListener('click', generate);
  }

  if (copyPromptBtn) {
    copyPromptBtn.addEventListener('click', copyPrompt);
  }

  if (clearJsonBtn) {
    clearJsonBtn.addEventListener('click', clearJSON);
  }

  if (importJsonBtn) {
    importJsonBtn.addEventListener('click', importJSON);
  }

  if (exportJsonBtn) {
    exportJsonBtn.addEventListener('click', exportJSON);
  }

  if (closeTemplatesBtn) {
    closeTemplatesBtn.addEventListener('click', closeTemplatesModal);
  }

  if (closeHistoryBtn) {
    closeHistoryBtn.addEventListener('click', closeHistoryModal);
  }

  if (fileInput) {
    fileInput.addEventListener('change', handleFileImport);
  }

  // Accessibility: Close modal on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeTemplatesModal();
      closeHistoryModal();
    }
  });
}

// ============================================================================
// VALIDATION
// ============================================================================

function getValidator() {
  if (window.PPTValidator && typeof window.PPTValidator.validateData === 'function') {
    return window.PPTValidator;
  }
  return null;
}

function validateJSONRealtime() {
  const jsonText = document.getElementById('jsonInput').value.trim();
  const validationStatus = document.getElementById('validationStatus');
  const validationText = document.getElementById('validationText');
  const validationErrors = document.getElementById('validationErrors');
  const generateBtn = document.getElementById('generateBtn');

  // Reset
  validationErrors.innerHTML = '';
  validationErrors.classList.remove('show');

  if (!jsonText) {
    validationStatus.className = 'validation-status';
    generateBtn.disabled = true;
    return;
  }

  try {
    const data = JSON.parse(jsonText);
    const validator = getValidator();

    if (!validator) {
      validationStatus.className = 'validation-status invalid';
      validationText.textContent = '✗ Module de validation indisponible';
      generateBtn.disabled = true;
      displayValidationErrors([{ message: 'Module de validation introuvable', type: 'error' }]);
      return;
    }

    const result = validator.validateData(data);

    if (result.errors.length === 0) {
      validationStatus.className = 'validation-status valid';
      if (result.warnings.length > 0) {
        validationText.textContent = `✓ JSON valide (${result.warnings.length} avertissement(s))`;
        displayValidationErrors(result.warnings);
      } else {
        validationText.textContent = '✓ JSON valide';
      }
      generateBtn.disabled = false;
    } else {
      validationStatus.className = 'validation-status invalid';
      validationText.textContent = `✗ ${result.errors.length} erreur(s) détectée(s)`;
      generateBtn.disabled = true;
      displayValidationErrors([...result.errors, ...result.warnings]);
    }
  } catch (e) {
    validationStatus.className = 'validation-status invalid';
    validationText.textContent = '✗ JSON invalide';
    generateBtn.disabled = true;
    displayValidationErrors([{ message: 'Format JSON invalide: ' + e.message, type: 'error' }]);
  }
}

function displayValidationErrors(messages) {
  const validationErrors = document.getElementById('validationErrors');
  
  if (messages.length === 0) {
    validationErrors.classList.remove('show');
    return;
  }

  validationErrors.innerHTML = messages.map(msg => {
    const icon = msg.type === 'warning' ? '⚠' : '❌';
    const cssClass = msg.type === 'warning' ? 'validation-warning-item' : 'validation-error-item';
    return `
      <div class="${cssClass}">
        <span class="validation-error-icon">${icon}</span>
        <span>${sanitizeHTML(msg.message)}</span>
      </div>
    `;
  }).join('');
  
  validationErrors.classList.add('show');
}

// ============================================================================
// SANITIZATION
// ============================================================================

function sanitizeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ============================================================================
// STORAGE MANAGEMENT
// ============================================================================

function saveJSON() {
  const jsonText = document.getElementById('jsonInput').value.trim();
  if (jsonText) {
    try {
      localStorage.setItem(CONFIG.STORAGE_KEYS.CURRENT_JSON, jsonText);
    } catch (e) {
      console.error('Erreur de sauvegarde:', e);
    }
  }
}

function loadSavedJSON() {
  try {
    const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.CURRENT_JSON);
    if (saved) {
      document.getElementById('jsonInput').value = saved;
      validateJSONRealtime();
      showToast('info', 'ℹ️ JSON précédent restauré');
    }
  } catch (e) {
    console.error('Erreur de chargement:', e);
  }
}

function saveToHistory(data) {
  try {
    const history = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.HISTORY) || '[]');
    
    const entry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      title: data.metadata.title,
      fileName: data.metadata.fileName,
      slideCount: data.slides.length,
      data: data
    };

    history.unshift(entry);
    
    // Limiter à MAX_HISTORY_ITEMS
    if (history.length > CONFIG.MAX_HISTORY_ITEMS) {
      history.pop();
    }

    localStorage.setItem(CONFIG.STORAGE_KEYS.HISTORY, JSON.stringify(history));
  } catch (e) {
    console.error('Erreur sauvegarde historique:', e);
  }
}

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.HISTORY) || '[]');
  } catch (e) {
    console.error('Erreur chargement historique:', e);
    return [];
  }
}

function deleteFromHistory(id) {
  try {
    const history = loadHistory();
    const filtered = history.filter(item => item.id !== id);
    localStorage.setItem(CONFIG.STORAGE_KEYS.HISTORY, JSON.stringify(filtered));
    displayHistory();
    showToast('success', '✓ Élément supprimé');
  } catch (e) {
    console.error('Erreur suppression:', e);
    showToast('error', '❌ Erreur de suppression');
  }
}

// ============================================================================
// UI FUNCTIONS
// ============================================================================

function copyPrompt() {
  const text = document.getElementById('prompt').textContent;
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('success', '✓ Prompt copié dans le presse-papiers');
    }).catch((err) => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    showToast('success', '✓ Prompt copié dans le presse-papiers');
  } catch (err) {
    showToast('error', '❌ Impossible de copier');
  }
  
  document.body.removeChild(textarea);
}

function clearJSON() {
  if (confirm('Êtes-vous sûr de vouloir effacer le contenu ?')) {
    document.getElementById('jsonInput').value = '';
    validateJSONRealtime();
    saveJSON();
    showToast('info', 'ℹ️ Contenu effacé');
  }
}

function exportJSON() {
  const jsonText = document.getElementById('jsonInput').value.trim();
  
  if (!jsonText) {
    showToast('warning', '⚠️ Aucun JSON à exporter');
    return;
  }

  try {
    const data = JSON.parse(jsonText);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.metadata.fileName.replace('.pptx', '')}.json` || 'presentation.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('success', '✓ JSON exporté avec succès');
  } catch (e) {
    showToast('error', '❌ JSON invalide, impossible d\'exporter');
  }
}

function importJSON() {
  document.getElementById('fileInput').click();
}

function handleFileImport(event) {
  const file = event.target.files[0];
  
  if (!file) return;

  if (!file.name.endsWith('.json')) {
    showToast('error', '❌ Fichier doit être au format JSON');
    return;
  }

  const reader = new FileReader();
  
  reader.onload = (e) => {
    try {
      const content = e.target.result;
      JSON.parse(content); // Validate
      document.getElementById('jsonInput').value = content;
      validateJSONRealtime();
      saveJSON();
      showToast('success', '✓ JSON importé avec succès');
    } catch (err) {
      showToast('error', '❌ Fichier JSON invalide');
    }
  };

  reader.onerror = () => {
    showToast('error', '❌ Erreur de lecture du fichier');
  };

  reader.readAsText(file);
  
  // Reset input
  event.target.value = '';
}

function showToast(type, message) {
  const toast = document.getElementById('toast');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toast.style.display = 'block';
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      toast.style.display = 'none';
      toast.style.animation = '';
    }, 300);
  }, 4000);
}

// ============================================================================
// TEMPLATES MANAGEMENT
// ============================================================================

function populateTemplates() {
  const templateGrid = document.getElementById('templateGrid');
  
  Object.keys(TEMPLATES).forEach(key => {
    const template = TEMPLATES[key];
    const card = document.createElement('div');
    card.className = 'template-card';
    card.innerHTML = `
      <h3>${sanitizeHTML(template.name)}</h3>
      <p>${sanitizeHTML(template.description)}</p>
    `;
    card.addEventListener('click', () => loadTemplate(key));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        loadTemplate(key);
      }
    });
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    templateGrid.appendChild(card);
  });
}

function loadTemplate(templateKey) {
  const template = TEMPLATES[templateKey];
  if (!template) return;

  document.getElementById('jsonInput').value = JSON.stringify(template.data, null, 2);
  validateJSONRealtime();
  saveJSON();
  closeTemplatesModal();
  showToast('success', `✓ Template "${template.name}" chargé`);
}

function openTemplatesModal() {
  document.getElementById('templatesModal').classList.add('show');
}

function closeTemplatesModal() {
  document.getElementById('templatesModal').classList.remove('show');
}

// ============================================================================
// HISTORY MANAGEMENT
// ============================================================================

function openHistoryModal() {
  displayHistory();
  document.getElementById('historyModal').classList.add('show');
}

function closeHistoryModal() {
  document.getElementById('historyModal').classList.remove('show');
}

function displayHistory() {
  const history = loadHistory();
  const historyList = document.getElementById('historyList');

  historyList.innerHTML = '';

  if (history.length === 0) {
    const emptyState = document.createElement('p');
    emptyState.className = 'history-empty';
    emptyState.textContent = 'Aucun historique disponible';
    historyList.appendChild(emptyState);
    return;
  }

  history.forEach(item => {
    const date = new Date(item.timestamp).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';

    const info = document.createElement('div');
    info.className = 'history-info';

    const title = document.createElement('h4');
    title.textContent = item.title;

    const metaText = document.createElement('p');
    metaText.textContent = `${date} · ${item.slideCount} slides`;

    info.appendChild(title);
    info.appendChild(metaText);

    const actions = document.createElement('div');
    actions.className = 'history-actions';

    const loadButton = document.createElement('button');
    loadButton.className = 'btn btn-primary';
    loadButton.setAttribute('aria-label', 'Charger cet historique');
    loadButton.textContent = '📂 Charger';
    loadButton.addEventListener('click', () => loadFromHistory(item.id));

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn';
    deleteButton.setAttribute('aria-label', 'Supprimer cet historique');
    deleteButton.textContent = '🗑️';
    deleteButton.addEventListener('click', () => deleteFromHistory(item.id));

    actions.appendChild(loadButton);
    actions.appendChild(deleteButton);

    historyItem.appendChild(info);
    historyItem.appendChild(actions);

    historyList.appendChild(historyItem);
  });
}

function loadFromHistory(id) {
  const history = loadHistory();
  const item = history.find(h => h.id === id);
  
  if (!item) {
    showToast('error', '❌ Élément introuvable');
    return;
  }

  document.getElementById('jsonInput').value = JSON.stringify(item.data, null, 2);
  validateJSONRealtime();
  saveJSON();
  closeHistoryModal();
  showToast('success', '✓ Historique chargé');
}

// ============================================================================
// POWERPOINT GENERATION
// ============================================================================

async function generate() {
  try {
    // Vérification de la bibliothèque
    if (typeof PptxGenJS === 'undefined') {
      throw new Error('La bibliothèque PptxGenJS n\'est pas chargée. Assurez-vous que le fichier pptxgen.bundle.js est dans le même dossier.');
    }

    // Récupération du JSON
    const jsonText = document.getElementById('jsonInput').value.trim();
    if (!jsonText) {
      throw new Error('Veuillez coller le JSON généré par l\'IA dans le champ de droite');
    }

    // Parsing du JSON
    let data;
    try {
      data = JSON.parse(jsonText);
    } catch (e) {
      throw new Error('JSON invalide. Vérifiez le format et réessayez.');
    }
    
    // Validation complète
    const validator = getValidator();
    if (!validator) {
      throw new Error('Module de validation indisponible. Rechargez la page.');
    }

    const result = validator.validateData(data);
    if (result.errors.length > 0) {
      throw new Error(`Validation échouée: ${result.errors[0].message}`);
    }

    // Disable button during generation
    const generateBtn = document.getElementById('generateBtn');
    const originalContent = generateBtn.innerHTML;
    generateBtn.disabled = true;
    generateBtn.innerHTML = '<span class="spinner"></span> <span>Génération...</span>';

    // Création de la présentation
    const pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = data.metadata.author || 'PowerPoint Generator Pro';
    pptx.title = data.metadata.title;
    pptx.subject = data.metadata.subject || '';
    pptx.company = data.metadata.company || 'Improved Edition';

    // Définir le master slide
    pptx.defineSlideMaster({
      title: 'MASTER_SLIDE',
      background: { fill: 'FFFFFF' },
      margin: [0.5, 0.5, 0.5, 0.5],
      slideNumber: { x: 9, y: 5.3, fontSize: 10, color: '999999' }
    });

    // Génération des slides
    for (let i = 0; i < data.slides.length; i++) {
      const slide = data.slides[i];
      const pptSlide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
      
      switch (slide.type) {
        case 'title':
          pptSlide.background = { fill: 'F8FAFC' };
          pptSlide.addText(slide.title || '', {
            x: 0.5, y: 2.2, w: 9, h: 1.5,
            fontSize: 44, bold: true, align: 'center',
            color: '1A202C', fontFace: 'Arial'
          });
          if (slide.subtitle) {
            pptSlide.addText(slide.subtitle, {
              x: 0.5, y: 3.8, w: 9, h: 1,
              fontSize: 24, align: 'center',
              color: '64748B', fontFace: 'Arial'
            });
          }
          pptSlide.addShape(pptx.ShapeType.line, {
            x: 3.5, y: 3.5, w: 2.5, h: 0,
            line: { color: '3182CE', width: 2 }
          });
          break;

        case 'content':
          pptSlide.addText(slide.title || '', {
            x: 0.5, y: 0.5, w: 9, h: 0.8,
            fontSize: 32, bold: true, color: '2C5282',
            fontFace: 'Arial'
          });
          pptSlide.addShape(pptx.ShapeType.line, {
            x: 0.5, y: 1.3, w: 9, h: 0,
            line: { color: 'E2E8F0', width: 1 }
          });
          if (slide.bullets && slide.bullets.length > 0) {
            // Limit to 4 bullets maximum to prevent overflow
            const limitedBullets = slide.bullets.slice(0, 4);
            
            // Calculate average bullet length for adaptive font sizing
            const avgLength = limitedBullets.reduce((sum, b) => sum + String(b).length, 0) / limitedBullets.length;
            const fontSize = avgLength > 100 ? 14 : avgLength > 80 ? 16 : 18;
            
            const bullets = limitedBullets.map(b => ({
              text: String(b),
              options: { 
                bullet: { type: 'bullet', color: '3182CE' },
                fontSize: fontSize,
                color: '334155',
                paraSpaceBefore: 6,
                paraSpaceAfter: 6,
                breakLine: true
              }
            }));
            pptSlide.addText(bullets, {
              x: 0.8, y: 1.8, w: 8.4, h: 4.5,
              fontFace: 'Arial',
              lineSpacing: 32
            });
          }
          break;

        case 'twoColumn':
          pptSlide.addText(slide.title || '', {
            x: 0.5, y: 0.5, w: 9, h: 0.8,
            fontSize: 32, bold: true, color: '2C5282',
            fontFace: 'Arial'
          });
          pptSlide.addShape(pptx.ShapeType.line, {
            x: 0.5, y: 1.3, w: 9, h: 0,
            line: { color: 'E2E8F0', width: 1 }
          });
          if (slide.leftContent && slide.leftContent.length > 0) {
            // Limit to 4 bullets maximum to prevent overflow
            const limitedLeftContent = slide.leftContent.slice(0, 4);
            
            // Calculate average length for adaptive font sizing
            const avgLengthLeft = limitedLeftContent.reduce((sum, b) => sum + String(b).length, 0) / limitedLeftContent.length;
            const fontSizeLeft = avgLengthLeft > 70 ? 13 : avgLengthLeft > 50 ? 14 : 16;
            
            const leftBullets = limitedLeftContent.map(b => ({
              text: String(b),
              options: { 
                bullet: { type: 'bullet', color: '3182CE' },
                fontSize: fontSizeLeft,
                color: '334155',
                paraSpaceBefore: 4,
                paraSpaceAfter: 4,
                breakLine: true
              }
            }));
            pptSlide.addText(leftBullets, {
              x: 0.5, y: 1.8, w: 4.2, h: 4.5,
              fontFace: 'Arial'
            });
          }
          if (slide.rightContent && slide.rightContent.length > 0) {
            // Limit to 4 bullets maximum to prevent overflow
            const limitedRightContent = slide.rightContent.slice(0, 4);
            
            // Calculate average length for adaptive font sizing
            const avgLengthRight = limitedRightContent.reduce((sum, b) => sum + String(b).length, 0) / limitedRightContent.length;
            const fontSizeRight = avgLengthRight > 70 ? 13 : avgLengthRight > 50 ? 14 : 16;
            
            const rightBullets = limitedRightContent.map(b => ({
              text: String(b),
              options: { 
                bullet: { type: 'bullet', color: '3182CE' },
                fontSize: fontSizeRight,
                color: '334155',
                paraSpaceBefore: 4,
                paraSpaceAfter: 4,
                breakLine: true
              }
            }));
            pptSlide.addText(rightBullets, {
              x: 5.3, y: 1.8, w: 4.2, h: 4.5,
              fontFace: 'Arial'
            });
          }
          break;

        case 'table':
          pptSlide.addText(slide.title || '', {
            x: 0.5, y: 0.5, w: 9, h: 0.8,
            fontSize: 32, bold: true, color: '2C5282',
            fontFace: 'Arial'
          });
          if (slide.tableData && slide.tableData.length > 0) {
            // Adaptive dimensions based on content
            const numCols = slide.tableData[0]?.length || 1;
            const numRows = slide.tableData.length;
            
            // Calculate adaptive table width (max 9 inches, min 3 inches)
            const tableWidth = Math.min(9, Math.max(3, numCols * 1.8));
            const colWidth = tableWidth / numCols;
            const tableX = (10 - tableWidth) / 2; // Center horizontally
            
            // Calculate adaptive table height (max 4.8 inches)
            const rowHeight = Math.min(0.6, 4.8 / numRows);
            const tableHeight = Math.min(4.8, numRows * rowHeight);
            
            // Function to adjust font size based on text length
            const adjustFontSize = (text, isHeader) => {
              const textLength = String(text || '').length;
              if (isHeader) {
                if (textLength > 20) return 11;
                if (textLength > 15) return 12;
                return 13;
              } else {
                if (textLength > 40) return 9;
                if (textLength > 30) return 10;
                if (textLength > 20) return 11;
                return 12;
              }
            };
            
            const tableData = slide.tableData.map((row, idx) => 
              row.map(cell => {
                const cellText = String(cell || '');
                const fontSize = adjustFontSize(cellText, idx === 0);
                
                return {
                  text: cellText,
                  options: idx === 0 ? {
                    bold: true,
                    color: 'FFFFFF',
                    fill: { color: '2C5282' },
                    fontSize: fontSize,
                    align: 'center',
                    valign: 'middle',
                    wrap: true
                  } : {
                    fontSize: fontSize,
                    color: '334155',
                    align: 'center',
                    valign: 'middle',
                    fill: idx % 2 === 0 ? { color: 'F8FAFC' } : { color: 'FFFFFF' },
                    wrap: true
                  }
                };
              })
            );
            
            pptSlide.addTable(tableData, {
              x: tableX, 
              y: 1.5, 
              w: tableWidth, 
              h: tableHeight,
              border: { pt: 0.5, color: 'E2E8F0' },
              fontFace: 'Arial',
              colW: Array(numCols).fill(colWidth),
              rowH: Array(numRows).fill(rowHeight)
            });
          }
          break;

        case 'chart':
          pptSlide.addText(slide.title || '', {
            x: 0.5, y: 0.5, w: 9, h: 0.8,
            fontSize: 32, bold: true, color: '2C5282',
            fontFace: 'Arial'
          });
          if (slide.data && slide.data.length > 0) {
            const labels = slide.data.map(d => String(d.label));
            const values = slide.data.map(d => Number(d.value) || 0);
            const chartData = [{
              name: slide.title || 'Données',
              labels: labels,
              values: values
            }];
            
            const chartType = slide.chartType === 'line' ? pptx.ChartType.line :
                             slide.chartType === 'pie' ? pptx.ChartType.pie :
                             pptx.ChartType.bar;
            
            const chartColors = ['2C5282', '3182CE', '60A5FA', '93C5FD', 'BFDBFE'];
            
            pptSlide.addChart(chartType, chartData, {
              x: 0.5, y: 1.5, w: 9, h: 4.5,
              chartColors: chartColors,
              showLegend: true,
              legendPos: 'b',
              showTitle: false,
              showValue: true,
              dataLabelColor: '334155',
              dataLabelFontSize: 11
            });
          }
          break;

        case 'image':
          pptSlide.addText(slide.title || '', {
            x: 0.5, y: 0.5, w: 9, h: 0.8,
            fontSize: 32, bold: true, color: '2C5282',
            fontFace: 'Arial'
          });
          if (slide.imagePath && slide.imagePath.startsWith('IMAGE_PLACEHOLDER')) {
            const desc = slide.imagePath.replace('IMAGE_PLACEHOLDER_', '').replace(/-/g, ' ');
            pptSlide.addShape(pptx.ShapeType.rect, {
              x: 0.5, y: 1.5, w: 9, h: 4.5,
              fill: { color: 'F8FAFC' },
              line: { color: 'CBD5E1', width: 2, dashType: 'dash' }
            });
            pptSlide.addText(`[ ${desc} ]`, {
              x: 0.5, y: 3, w: 9, h: 1.5,
              fontSize: 16, color: '94A3B8',
              align: 'center', valign: 'middle',
              fontFace: 'Arial', italic: true
            });
          }
          break;

        default:
          pptSlide.addText('Type de slide non reconnu: ' + slide.type, {
            x: 0.5, y: 2.5, w: 9, h: 2,
            fontSize: 18, color: 'EF4444',
            align: 'center'
          });
      }
    }

    // Nom du fichier
    const fileName = data.metadata.fileName || `presentation-${Date.now()}.pptx`;
    
    // Génération et téléchargement du fichier
    await pptx.writeFile({ fileName });
    
    // Save to history
    saveToHistory(data);
    
    // Restore button
    generateBtn.disabled = false;
    generateBtn.innerHTML = originalContent;
    
    showToast('success', `✓ ${fileName} généré avec succès !`);
    
  } catch (error) {
    console.error('Erreur:', error);
    showToast('error', `❌ Erreur: ${error.message}`);
    
    // Restore button
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.disabled = false;
    generateBtn.innerHTML = originalContent || '<span class="btn-icon">▶</span><span>Générer PowerPoint</span>';
  }
}
