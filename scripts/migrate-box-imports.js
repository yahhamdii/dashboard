#!/usr/bin/env node

/**
 * Script pour migrer les imports Box de MUI vers BoxWrapper
 * 
 * Usage: node scripts/migrate-box-imports.js
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src');

// Fichiers déjà migrés ou à exclure
const EXCLUDED_FILES = [
  'circuit-ui/box-wrapper.tsx', // Le wrapper lui-même
  'theme/', // Fichiers de theme
  'app/layout.tsx', // Layout principal
];

function shouldExclude(filePath) {
  return EXCLUDED_FILES.some(excluded => filePath.includes(excluded));
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

function migrateFile(filePath) {
  const relativePath = path.relative(SRC_DIR, filePath);
  
  if (shouldExclude(relativePath)) {
    return { file: relativePath, migrated: false, reason: 'excluded' };
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Vérifier si le fichier importe Box de MUI
  const hasMuiBoxImport = /import\s+.*\bBox\b.*from\s+['"]@mui\/material['"]/.test(content);
  
  if (!hasMuiBoxImport) {
    return { file: relativePath, migrated: false, reason: 'no_box_import' };
  }

  // Vérifier si BoxWrapper est déjà importé
  const hasBoxWrapper = /BoxWrapper.*from.*circuit-ui/.test(content);
  
  if (hasBoxWrapper) {
    return { file: relativePath, migrated: false, reason: 'already_has_wrapper' };
  }

  // Remplacer l'import
  let newContent = content;
  
  // Pattern 1: import Box from '@mui/material/Box';
  newContent = newContent.replace(
    /import\s+Box\s+from\s+['"]@mui\/material\/Box['"];?/g,
    "import { BoxWrapper as Box } from 'src/components/circuit-ui';"
  );
  
  // Pattern 2: import Box, { ... } from '@mui/material';
  newContent = newContent.replace(
    /import\s+Box\s*,\s*\{([^}]+)\}\s+from\s+['"]@mui\/material['"];?/g,
    (match, otherImports) => {
      return `import { BoxWrapper as Box } from 'src/components/circuit-ui';\nimport {${otherImports}} from '@mui/material';`;
    }
  );
  
  // Pattern 3: import { Box, ... } from '@mui/material';
  newContent = newContent.replace(
    /import\s+\{\s*Box\s*,\s*([^}]+)\}\s+from\s+['"]@mui\/material['"];?/g,
    (match, otherImports) => {
      return `import { BoxWrapper as Box } from 'src/components/circuit-ui';\nimport {${otherImports}} from '@mui/material';`;
    }
  );

  // Pattern 4: import { ..., Box, ... } from '@mui/material';
  newContent = newContent.replace(
    /import\s+\{\s*([^,}]+),\s*Box\s*,?\s*([^}]*)\}\s+from\s+['"]@mui\/material['"];?/g,
    (match, before, after) => {
      const otherImports = before + (after ? `, ${after}` : '');
      return `import { BoxWrapper as Box } from 'src/components/circuit-ui';\nimport {${otherImports}} from '@mui/material';`;
    }
  );

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    return { file: relativePath, migrated: true };
  }

  return { file: relativePath, migrated: false, reason: 'no_match' };
}

// Exécution
console.log('🔄 Migration des imports Box vers BoxWrapper...\n');

const files = findFiles(SRC_DIR);
console.log(`Fichiers analysés: ${files.length}\n`);

const results = files.map(migrateFile);
const migrated = results.filter(r => r.migrated);
const skipped = results.filter(r => !r.migrated);

console.log(`✅ Fichiers migrés: ${migrated.length}`);
if (migrated.length > 0) {
  console.log('\nFichiers migrés:');
  migrated.forEach(r => console.log(`  - ${r.file}`));
}

console.log(`\n⏭️  Fichiers ignorés: ${skipped.length}`);
const reasons = {};
skipped.forEach(r => {
  reasons[r.reason] = (reasons[r.reason] || 0) + 1;
});
Object.entries(reasons).forEach(([reason, count]) => {
  console.log(`  - ${reason}: ${count}`);
});

console.log('\n✅ Migration terminée!\n');

