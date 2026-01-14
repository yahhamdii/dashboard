#!/usr/bin/env node

/**
 * Script d'analyse de l'utilisation de MUI dans le projet
 * 
 * Usage: node scripts/analyze-mui-usage.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SRC_DIR = path.join(__dirname, '../src');

// Composants MUI à analyser
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

// Wrappers Circuit UI disponibles
const CIRCUIT_WRAPPERS = [
  'BoxWrapper',
  'StackWrapper',
  'ButtonWrapper',
  'InputWrapper',
  'SelectWrapper',
  'CheckboxWrapper',
  'SwitchWrapper',
  'CardWrapper',
  'CardHeaderWrapper',
  'CardContentWrapper',
  'TypographyWrapper',
  'AvatarWrapper',
  'IconButtonWrapper',
  'DialogWrapper',
  'TooltipWrapper',
  'ContainerWrapper',
  'TabsWrapper',
  'TabWrapper',
];

function findFiles(dir, extensions = ['.tsx', '.ts']) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Ignorer node_modules et .next
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
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(SRC_DIR, filePath);

  const results = {
    file: relativePath,
    muiImports: [],
    muiComponents: [],
    circuitWrappers: [],
    hasCircuitFlag: content.includes('useCircuit') || content.includes('useCircuitLayoutsWithPathname') || content.includes('useCircuitComponent'),
  };

  // Détecter les imports MUI
  const muiImportRegex = /from ['"]@mui\/material['"]/g;
  const muiImports = content.match(muiImportRegex);
  if (muiImports) {
    results.muiImports = muiImports;
  }

  // Détecter l'utilisation des composants MUI
  for (const component of MUI_COMPONENTS) {
    // Chercher l'utilisation directe (pas dans les imports)
    const regex = new RegExp(`<${component}[\\s>]|\\b${component}\\b`, 'g');
    if (regex.test(content) && !content.includes(`import.*${component}.*from`)) {
      // Vérifier si c'est dans un commentaire ou une string
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(component) && !lines[i].trim().startsWith('//') && !lines[i].includes('//')) {
          results.muiComponents.push(component);
          break;
        }
      }
    }
  }

  // Détecter l'utilisation des wrappers Circuit UI
  for (const wrapper of CIRCUIT_WRAPPERS) {
    if (content.includes(wrapper)) {
      results.circuitWrappers.push(wrapper);
    }
  }

  return results;
}

function generateReport(results) {
  console.log('\n📊 RAPPORT D\'ANALYSE MUI\n');
  console.log('='.repeat(80));

  // Statistiques globales
  const totalFiles = results.length;
  const filesWithMUI = results.filter(r => r.muiImports.length > 0 || r.muiComponents.length > 0).length;
  const filesWithCircuit = results.filter(r => r.circuitWrappers.length > 0).length;
  const filesWithBoth = results.filter(r => 
    (r.muiImports.length > 0 || r.muiComponents.length > 0) && r.circuitWrappers.length > 0
  ).length;

  console.log('\n📈 STATISTIQUES GLOBALES\n');
  console.log(`Total de fichiers analysés: ${totalFiles}`);
  console.log(`Fichiers avec imports/composants MUI: ${filesWithMUI}`);
  console.log(`Fichiers avec wrappers Circuit UI: ${filesWithCircuit}`);
  console.log(`Fichiers avec MUI ET Circuit UI: ${filesWithBoth}`);

  // Fichiers avec MUI uniquement
  const filesMUIOnly = results.filter(r => 
    (r.muiImports.length > 0 || r.muiComponents.length > 0) && 
    r.circuitWrappers.length === 0 &&
    !r.hasCircuitFlag
  );

  console.log(`\n⚠️  Fichiers avec MUI uniquement (non migrés): ${filesMUIOnly.length}`);

  // Composants MUI les plus utilisés
  const componentUsage = {};
  results.forEach(r => {
    r.muiComponents.forEach(comp => {
      componentUsage[comp] = (componentUsage[comp] || 0) + 1;
    });
  });

  const topComponents = Object.entries(componentUsage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  console.log('\n🔝 TOP 10 COMPOSANTS MUI UTILISÉS\n');
  topComponents.forEach(([comp, count]) => {
    console.log(`  ${comp.padEnd(20)} ${count} fichiers`);
  });

  // Wrappers Circuit UI les plus utilisés
  const wrapperUsage = {};
  results.forEach(r => {
    r.circuitWrappers.forEach(wrapper => {
      wrapperUsage[wrapper] = (wrapperUsage[wrapper] || 0) + 1;
    });
  });

  const topWrappers = Object.entries(wrapperUsage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  console.log('\n🔝 TOP 10 WRAPPERS CIRCUIT UI UTILISÉS\n');
  topWrappers.forEach(([wrapper, count]) => {
    console.log(`  ${wrapper.padEnd(25)} ${count} fichiers`);
  });

  // Fichiers à migrer (avec MUI mais sans Circuit UI)
  if (filesMUIOnly.length > 0) {
    console.log('\n📋 FICHIERS À MIGRER (MUI uniquement)\n');
    filesMUIOnly.slice(0, 20).forEach(r => {
      console.log(`  ${r.file}`);
      if (r.muiComponents.length > 0) {
        console.log(`    → Composants: ${r.muiComponents.join(', ')}`);
      }
    });
    if (filesMUIOnly.length > 20) {
      console.log(`  ... et ${filesMUIOnly.length - 20} autres fichiers`);
    }
  }

  // Fichiers avec feature flags Circuit UI
  const filesWithFlags = results.filter(r => r.hasCircuitFlag);
  console.log(`\n🚩 Fichiers avec feature flags Circuit UI: ${filesWithFlags.length}`);

  console.log('\n' + '='.repeat(80) + '\n');
}

// Exécution
console.log('🔍 Analyse de l\'utilisation de MUI dans le projet...\n');

const files = findFiles(SRC_DIR);
console.log(`Fichiers trouvés: ${files.length}`);

const results = files.map(analyzeFile);
generateReport(results);

// Sauvegarder le rapport
const reportPath = path.join(__dirname, '../PHASE6_ANALYSIS_REPORT.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
console.log(`\n✅ Rapport sauvegardé dans: ${reportPath}`);


