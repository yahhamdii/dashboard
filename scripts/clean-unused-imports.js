#!/usr/bin/env node

/**
 * Script pour identifier les imports MUI inutilisés dans les fichiers migrés
 * 
 * Usage: node scripts/clean-unused-imports.js [file-path]
 * 
 * Si aucun fichier n'est spécifié, analyse tous les fichiers avec wrappers Circuit UI
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src');

// Mapping des composants MUI vers leurs wrappers Circuit UI
const MUI_TO_CIRCUIT = {
  'Box': 'BoxWrapper',
  'Stack': 'StackWrapper',
  'Button': 'ButtonWrapper',
  'TextField': 'InputWrapper',
  'Select': 'SelectWrapper',
  'Checkbox': 'CheckboxWrapper',
  'Switch': 'SwitchWrapper',
  'Card': 'CardWrapper',
  'CardHeader': 'CardHeaderWrapper',
  'CardContent': 'CardContentWrapper',
  'Typography': 'TypographyWrapper',
  'Avatar': 'AvatarWrapper',
  'IconButton': 'IconButtonWrapper',
  'Dialog': 'DialogWrapper',
  'Tooltip': 'TooltipWrapper',
  'Container': 'ContainerWrapper',
  'Tabs': 'TabsWrapper',
  'Tab': 'TabWrapper',
};

function findUnusedImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(SRC_DIR, filePath);
  
  const issues = [];

  // Vérifier si le fichier utilise des wrappers Circuit UI
  const hasCircuitWrappers = Object.values(MUI_TO_CIRCUIT).some(wrapper => 
    content.includes(wrapper)
  );

  if (!hasCircuitWrappers) {
    return null; // Pas un fichier migré
  }

  // Extraire les imports MUI
  const importRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*)?\s+from\s+['"]@mui\/material['"]/g;
  const imports = content.match(importRegex);

  if (!imports) {
    return null; // Pas d'imports MUI
  }

  // Analyser chaque import
  imports.forEach(importLine => {
    // Extraire les composants importés
    const namedImports = importLine.match(/\{([^}]+)\}/);
    if (namedImports) {
      const components = namedImports[1]
        .split(',')
        .map(c => c.trim().split(/\s+as\s+/)[0].trim())
        .filter(Boolean);

      components.forEach(component => {
        // Vérifier si le composant a un wrapper Circuit UI
        if (MUI_TO_CIRCUIT[component]) {
          const wrapper = MUI_TO_CIRCUIT[component];
          
          // Vérifier si le wrapper est utilisé dans le fichier
          if (content.includes(wrapper)) {
            // Vérifier si le composant MUI est encore utilisé directement
            const directUsageRegex = new RegExp(`<${component}[\\s>]|\\b${component}\\b`, 'g');
            const directUsages = content.match(directUsageRegex);
            
            // Filtrer les faux positifs (commentaires, strings, etc.)
            const lines = content.split('\n');
            let hasRealUsage = false;
            
            for (let i = 0; i < lines.length; i++) {
              const line = lines[i];
              if (line.includes(component) && 
                  !line.trim().startsWith('//') && 
                  !line.includes('//') &&
                  !line.includes('import') &&
                  !line.includes('from')) {
                // Vérifier si c'est une utilisation réelle
                if (line.includes(`<${component}`) || line.includes(`{${component}`)) {
                  hasRealUsage = true;
                  break;
                }
              }
            }

            if (!hasRealUsage) {
              issues.push({
                component,
                wrapper,
                importLine: importLine.trim(),
                suggestion: `Supprimer '${component}' de l'import et utiliser '${wrapper}' à la place`,
              });
            }
          }
        }
      });
    }
  });

  if (issues.length === 0) {
    return null;
  }

  return {
    file: relativePath,
    issues,
  };
}

function findFiles(dir, extensions = ['.tsx', '.ts']) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!['node_modules', '.next', 'out', 'dist', 'build'].includes(item)) {
        files.push(...findFiles(fullPath, extensions));
      }
    } else if (extensions.some(ext => item.endsWith(ext))) {
      files.push(fullPath);
    }
  }

  return files;
}

// Exécution
const targetFile = process.argv[2];
const files = targetFile ? [path.resolve(targetFile)] : findFiles(SRC_DIR);

console.log('🔍 Recherche des imports MUI inutilisés...\n');

const results = files
  .map(findUnusedImports)
  .filter(Boolean);

if (results.length === 0) {
  console.log('✅ Aucun import MUI inutilisé trouvé !\n');
  process.exit(0);
}

console.log(`⚠️  ${results.length} fichier(s) avec des imports MUI potentiellement inutilisés:\n`);
console.log('='.repeat(80));

results.forEach(result => {
  console.log(`\n📄 ${result.file}`);
  result.issues.forEach(issue => {
    console.log(`  ⚠️  ${issue.component} → Utiliser ${issue.wrapper} à la place`);
    console.log(`     Import: ${issue.importLine}`);
    console.log(`     💡 ${issue.suggestion}`);
  });
});

console.log('\n' + '='.repeat(80));
console.log(`\n📊 Résumé: ${results.length} fichier(s) à nettoyer`);
console.log(`   Total d'imports inutilisés: ${results.reduce((sum, r) => sum + r.issues.length, 0)}`);

// Sauvegarder le rapport
const reportPath = path.join(__dirname, '../PHASE6_UNUSED_IMPORTS.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
console.log(`\n✅ Rapport sauvegardé dans: ${reportPath}\n`);


