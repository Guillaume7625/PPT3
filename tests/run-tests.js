const fs = require('fs');
const path = require('path');
const assert = require('assert');

const validator = require('../improved/src/js/validator.js');

const cases = [
  {
    file: 'test_valid_basic.json',
    expectation: 'valid'
  },
  {
    file: 'test_invalid_too_many_bullets.json',
    expectation: 'warning',
    warningIncludes: 'puces'
  },
  {
    file: 'test_invalid_table_too_large.json',
    expectation: 'warning',
    warningIncludes: 'tableau'
  },
  {
    file: 'test_invalid_missing_metadata.json',
    expectation: 'error'
  }
];

function loadJSON(fileName) {
  const filePath = path.join(__dirname, fileName);
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

let allPassed = true;

cases.forEach((testCase) => {
  const data = loadJSON(testCase.file);
  const result = validator.validateData(data);

  try {
    switch (testCase.expectation) {
      case 'valid': {
        assert.strictEqual(result.errors.length, 0, 'Aucune erreur attendue');
        assert.strictEqual(result.warnings.length, 0, 'Aucun avertissement attendu');
        break;
      }
      case 'warning': {
        assert.strictEqual(result.errors.length, 0, 'Pas d\'erreurs attendues');
        assert.ok(result.warnings.length > 0, 'Au moins un avertissement attendu');
        if (testCase.warningIncludes) {
          const hasWarning = result.warnings.some((warning) => warning.message.includes(testCase.warningIncludes));
          assert.ok(hasWarning, `Un avertissement contenant "${testCase.warningIncludes}" est attendu`);
        }
        break;
      }
      case 'error': {
        assert.ok(result.errors.length > 0, 'Des erreurs étaient attendues');
        break;
      }
      default:
        throw new Error(`Expectation inconnue: ${testCase.expectation}`);
    }

    console.log(`✅ ${testCase.file}`);
  } catch (error) {
    allPassed = false;
    console.error(`❌ ${testCase.file}: ${error.message}`);
  }
});

if (!allPassed) {
  process.exitCode = 1;
} else {
  console.log('\nTous les tests sont passés avec succès.');
}
