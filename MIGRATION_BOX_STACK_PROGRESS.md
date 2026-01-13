# Migration Box/Stack → Tailwind CSS - Progression

## 📊 Statistiques

- **Box** : 90 fichiers (66 fichiers uniques)
- **Stack** : 12 fichiers (11 fichiers uniques)
- **Total** : ~102 fichiers à migrer

## 🎯 Stratégie de Migration

### Phase 1 : Composants Réutilisables Simples ✅
- [x] `src/components/search-not-found/search-not-found.tsx` - Migré vers Tailwind

### Phase 2 : Fichiers avec Usages Simples (En cours)
Cas simples à migrer (display, gap, padding, margin) :
- [ ] `src/sections/file-manager/file-upgrade.tsx` - Stack simple
- [ ] `src/components/table/table-selected-action.tsx` - Box simple
- [ ] Autres fichiers avec `sx={{ display: 'flex', gap: X }}`

### Phase 3 : Fichiers avec Usages Moyens
Cas avec responsive ou conditions :
- [ ] Fichiers avec breakpoints MUI → Tailwind responsive
- [ ] Fichiers avec conditions simples

### Phase 4 : Fichiers Complexes (Garder MUI temporairement)
Cas avec sx dynamiques ou thème :
- [ ] Fichiers avec `sx={(theme) => ...}`
- [ ] Fichiers avec breakpoints complexes
- [ ] Layouts principaux

## 📝 Mapping MUI → Tailwind

### Box - Conversions simples

| MUI | Tailwind |
|-----|----------|
| `sx={{ display: 'flex' }}` | `className="flex"` |
| `sx={{ display: 'grid' }}` | `className="grid"` |
| `sx={{ gap: 1 }}` | `className="gap-1"` |
| `sx={{ gap: 2 }}` | `className="gap-2"` |
| `sx={{ p: 1 }}` | `className="p-1"` |
| `sx={{ p: 2 }}` | `className="p-2"` |
| `sx={{ p: 3 }}` | `className="p-3"` |
| `sx={{ m: 1 }}` | `className="m-1"` |
| `sx={{ width: '100%' }}` | `className="w-full"` |
| `sx={{ height: '100%' }}` | `className="h-full"` |
| `sx={{ flexDirection: 'column' }}` | `className="flex-col"` |
| `sx={{ alignItems: 'center' }}` | `className="items-center"` |
| `sx={{ justifyContent: 'center' }}` | `className="justify-center"` |
| `sx={{ borderRadius: 1.5 }}` | `className="rounded-xl"` |

### Stack - Conversions simples

| MUI Stack | Tailwind |
|-----------|----------|
| `<Stack direction="row">` | `<div className="flex flex-row">` |
| `<Stack direction="column">` | `<div className="flex flex-col">` |
| `<Stack spacing={1}>` | `<div className="flex gap-1">` |
| `<Stack spacing={2}>` | `<div className="flex gap-2">` |
| `<Stack spacing={3}>` | `<div className="flex gap-3">` |
| `<Stack alignItems="center">` | `<div className="flex items-center">` |
| `<Stack justifyContent="center">` | `<div className="flex justify-center">` |

### Responsive Breakpoints

| MUI | Tailwind |
|-----|----------|
| `xs` (0px) | (par défaut, pas de préfixe) |
| `sm` (600px) | `sm:` |
| `md` (900px) | `md:` |
| `lg` (1200px) | `lg:` |
| `xl` (1536px) | `xl:` |

Exemple :
```tsx
// MUI
<Box sx={{ flexDirection: { xs: 'column', md: 'row' } }}>

// Tailwind
<div className="flex flex-col md:flex-row">
```

## ⚠️ Cas à Garder en MUI (temporairement)

1. **sx dynamiques avec theme** :
```tsx
<Box sx={(theme) => ({ padding: theme.spacing(3) })}>
```

2. **Breakpoints complexes** :
```tsx
<Box sx={{ [theme.breakpoints.down('md')]: { ... } }}>
```

3. **Styles conditionnels complexes** :
```tsx
<Box sx={[...(condition ? [style1] : [style2])]}>
```

## 🔄 Pattern de Migration

```tsx
// Avant
import Box from '@mui/material/Box';
<Box sx={{ display: 'flex', gap: 2, p: 3 }}>...</Box>

// Après
import { useCircuitComponent } from 'src/lib/feature-flags';
const useCircuit = useCircuitComponent('USE_CIRCUIT_LAYOUTS');

{useCircuit ? (
  <div className="flex gap-2 p-3">...</div>
) : (
  <Box sx={{ display: 'flex', gap: 2, p: 3 }}>...</Box>
)}
```

## 📈 Progression

- **Fichiers migrés** : 1/102 (1%)
- **Fichiers en cours** : 0
- **Fichiers à migrer** : 101

