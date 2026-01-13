# Phase 2: Migration des Composants de Base - État d'Avancement

## ✅ Wrappers de Compatibilité Créés

### 1. **TypographyWrapper** (`src/components/circuit-ui/typography-wrapper.tsx`)

**Fonctionnalité** :
- Wrapper qui permet d'utiliser Circuit UI Typography avec l'API MUI
- Mapping automatique des variants MUI → Circuit UI :
  - `h1-h4` → `Headline` (tailles `l` ou `m`)
  - `h5-h6`, `subtitle1-2` → `Headline` (taille `s`)
  - `body1-2` → `Body` (tailles `one` ou `two`)
  - `caption`, `overline` → `Body` (taille `two`)

**Utilisation** :
```tsx
import { TypographyWrapper } from 'src/components/circuit-ui';

// Utilise Circuit UI si USE_CIRCUIT_TYPOGRAPHY=true, sinon MUI
<TypographyWrapper variant="h1">Title</TypographyWrapper>
```

**Feature Flag** : `USE_CIRCUIT_TYPOGRAPHY`

---

### 2. **ButtonWrapper** (`src/components/circuit-ui/button-wrapper.tsx`)

**Fonctionnalité** :
- Wrapper qui permet d'utiliser Circuit UI Button avec l'API MUI
- Mapping automatique :
  - `variant="contained"` → `variant="primary"`
  - `variant="outlined"` → `variant="secondary"`
  - `variant="text"` ou `"soft"` → `variant="tertiary"`
  - `size="small"` → `size="s"`
  - `size="medium"` ou `"large"` → `size="m"`
  - `color="error"` → `destructive={true}`

**Utilisation** :
```tsx
import { ButtonWrapper } from 'src/components/circuit-ui';

<ButtonWrapper variant="contained" color="primary">
  Click me
</ButtonWrapper>
```

**Feature Flag** : `USE_CIRCUIT_BUTTONS`

**Limitations actuelles** :
- Les icônes (`startIcon`, `endIcon`) ne sont pas encore supportées (Circuit UI utilise `icon` avec un type différent)

---

### 3. **InputWrapper** (`src/components/circuit-ui/input-wrapper.tsx`)

**Fonctionnalité** :
- Wrapper qui permet d'utiliser Circuit UI Input avec l'API MUI TextField
- Mapping automatique :
  - `error` → `invalid`
  - `helperText` (quand error) → `validationHint`
  - `label` → affiché manuellement + passé à Circuit UI Input

**Utilisation** :
```tsx
import { InputWrapper } from 'src/components/circuit-ui';

<InputWrapper
  label="Email"
  error={hasError}
  helperText={errorMessage}
  fullWidth
/>
```

**Feature Flag** : `USE_CIRCUIT_FORMS`

**Limitations actuelles** :
- `sx` de MUI n'est pas converti (seulement `fullWidth` est géré)
- Certaines props MUI spécifiques ne sont pas supportées

---

## 📋 Prochaines Étapes

### Semaine 1 - Priorité CRITIQUE

1. **Migrer Typography** (en cours)
   - [ ] Remplacer les imports `Typography` par `TypographyWrapper` dans les fichiers prioritaires
   - [ ] Tester visuellement chaque page migrée
   - [ ] Activer le flag `USE_CIRCUIT_TYPOGRAPHY` progressivement

2. **Migrer Box/Stack vers Tailwind CSS**
   - [ ] Identifier les usages de `Box` et `Stack`
   - [ ] Créer un guide de migration Box → Tailwind
   - [ ] Migrer les cas simples (display, gap, padding, margin)
   - [ ] Gérer les cas complexes (sx dynamiques)

3. **Migrer Button**
   - [ ] Remplacer les imports `Button` par `ButtonWrapper`
   - [ ] Gérer les cas avec icônes (créer un helper si nécessaire)
   - [ ] Tester tous les variants et sizes

4. **Migrer TextField/Input**
   - [ ] Remplacer les imports `TextField` par `InputWrapper`
   - [ ] Améliorer le support de `sx` si nécessaire
   - [ ] Tester les formulaires existants

### Semaine 2 - Priorité HAUTE

5. **Migrer Card**
6. **Migrer Table**
7. **Migrer Dialog/Modal**
8. **Migrer Form components** (Select, Checkbox, Switch)

---

## 🔧 Améliorations à Apporter

### TypographyWrapper
- [ ] Gérer mieux la conversion de `sx` (styles MUI) vers `style` (CSS)
- [ ] Support des props `color` de MUI (mapping vers variants Circuit UI)

### ButtonWrapper
- [ ] Support des icônes (`startIcon`, `endIcon`)
- [ ] Meilleure gestion de `component` et `href`

### InputWrapper
- [ ] Conversion complète de `sx` vers styles CSS
- [ ] Support de tous les types d'input (number, email, password, etc.)
- [ ] Gestion des `InputAdornment` (startAdornment, endAdornment)

---

## 📝 Notes

- Les wrappers permettent une migration progressive sans casser le code existant
- Tous les wrappers utilisent les feature flags pour activer/désactiver Circuit UI
- Le build compile avec succès ✅
- Les composants MUI restent disponibles comme fallback

---

## 🚀 Utilisation

Pour activer Circuit UI sur un composant :

1. **Activer le feature flag** dans `.env.local` :
```bash
NEXT_PUBLIC_USE_CIRCUIT_TYPOGRAPHY=true
NEXT_PUBLIC_USE_CIRCUIT_BUTTONS=true
NEXT_PUBLIC_USE_CIRCUIT_FORMS=true
```

2. **Remplacer les imports** :
```tsx
// Avant
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// Après
import { TypographyWrapper as Typography } from 'src/components/circuit-ui';
import { ButtonWrapper as Button } from 'src/components/circuit-ui';
import { InputWrapper as TextField } from 'src/components/circuit-ui';
```

3. **Redémarrer le serveur de développement**

