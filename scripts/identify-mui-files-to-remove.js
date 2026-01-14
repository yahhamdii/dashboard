#!/usr/bin/env node

/**
 * Script pour identifier les fichiers qui utilisent MUI directement
 * et qui peuvent être supprimés (exclut les wrappers et fichiers critiques)
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src');

// Fichiers à EXCLURE (ne pas supprimer)
const EXCLUDE_PATTERNS = [
  // Wrappers Circuit UI (utilisent MUI en fallback)
  /circuit-ui.*wrapper\.tsx?$/,
  
  // Fichiers de theme (overrides MUI - à supprimer séparément)
  /theme\/core\/components\//,
  /theme\/.*\.tsx?$/,
  
  // Fichiers critiques
  /app\/layout\.tsx$/,
  /theme-provider\.tsx$/,
  
  // Types et configurations
  /extend-theme-types\.d\.ts$/,
  /theme-config\.ts$/,
  /types\.ts$/,
  
  // Fichiers qui utilisent MUI-X (DataGrid, DatePickers)
  /mui-x/,
];

// Composants MUI directs (pas via wrappers)
const MUI_COMPONENTS = [
  'Box',
  'Stack',
  'Button',
  'TextField',
  'Select',
  'Checkbox',
  'Switch',
  'Card',
  'CardHeader',
  'CardContent',
  'Typography',
  'Avatar',
  'IconButton',
  'Dialog',
  'Tooltip',
  'Container',
  'Paper',
  'FormControl',
  'InputLabel',
  'InputAdornment',
  'MenuItem',
  'MenuList',
  'Rating',
  'Chip',
  'Badge',
  'Alert',
  'Skeleton',
  'Slider',
  'Radio',
  'Tabs',
  'Tab',
  'Breadcrumbs',
  'Link',
  'List',
  'ListItem',
  'Drawer',
  'AppBar',
  'Toolbar',
  'Backdrop',
  'Progress',
  'Pagination',
  'Autocomplete',
  'Popover',
  'Menu',
];

function shouldExclude(filePath) {
  return EXCLUDE_PATTERNS.some(pattern => pattern.test(filePath));
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

function analyzeFile(filePath) {
  const relativePath = path.relative(SRC_DIR, filePath);
  
  // Exclure les fichiers dans la liste d'exclusion
  if (shouldExclude(relativePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Vérifier si le fichier importe MUI directement
  const hasMuiImport = /from ['"]@mui\/material['"]/.test(content);
  
  if (!hasMuiImport) {
    return null;
  }

  // Vérifier si le fichier utilise des composants MUI directement (pas via wrappers)
  const usesMuiDirectly = MUI_COMPONENTS.some(component => {
    // Chercher l'utilisation directe du composant
    const importRegex = new RegExp(`import.*${component}.*from ['"]@mui\/material['"]`, 'g');
    if (importRegex.test(content)) {
      // Vérifier si c'est utilisé dans le JSX
      const usageRegex = new RegExp(`<${component}[\\s>]`, 'g');
      return usageRegex.test(content);
    }
    return false;
  });

  // Vérifier si le fichier utilise des wrappers Circuit UI
  const usesCircuitWrappers = /(ButtonWrapper|TypographyWrapper|CardWrapper|InputWrapper|SelectWrapper|CheckboxWrapper|SwitchWrapper|IconButtonWrapper|AvatarWrapper|DialogWrapper|TooltipWrapper|ContainerWrapper|TabsWrapper|TabWrapper|BoxWrapper|StackWrapper)/.test(content);

  // Vérifier si le fichier utilise MUI-X
  const usesMuiX = /@mui\/x-/.test(content);

  if (usesMuiDirectly && !usesCircuitWrappers && !usesMuiX) {
    return {
      file: relativePath,
      usesMuiDirectly,
      usesCircuitWrappers,
      usesMuiX,
    };
  }

  return null;
}

// Exécution
console.log('🔍 Identification des fichiers utilisant MUI directement...\n');

const files = findFiles(SRC_DIR);
console.log(`Fichiers analysés: ${files.length}\n`);

const results = files
  .map(analyzeFile)
  .filter(Boolean);

if (results.length === 0) {
  console.log('✅ Aucun fichier à supprimer trouvé !\n');
  process.exit(0);
}

console.log(`⚠️  ${results.length} fichier(s) utilisent MUI directement (peuvent être supprimés):\n`);
console.log('='.repeat(80));

results.forEach(result => {
  console.log(`\n📄 ${result.file}`);
});

console.log('\n' + '='.repeat(80));
console.log(`\n📊 Résumé: ${results.length} fichier(s) identifié(s)`);
console.log('\n⚠️  ATTENTION: Vérifiez manuellement ces fichiers avant de les supprimer !');
console.log('   Certains peuvent encore être nécessaires pour le fonctionnement de l\'application.\n');

// Sauvegarder le rapport
const reportPath = path.join(__dirname, '../FILES_TO_REMOVE.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
console.log(`✅ Liste sauvegardée dans: ${reportPath}\n`);

