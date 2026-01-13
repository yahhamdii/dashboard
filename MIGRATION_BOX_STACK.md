# Migration Box/Stack → Tailwind CSS

## 📋 Contexte

Circuit UI **n'a pas de composants Box ou Stack équivalents**. La bibliothèque utilise plutôt :
- Des composants spécifiques (Card, List, etc.)
- Du CSS natif avec des classes utilitaires
- Des design tokens pour les espacements

## ✅ Solution Recommandée : Tailwind CSS

Le projet utilise déjà **Tailwind CSS**, ce qui rend la migration naturelle.

## 🔄 Stratégie de Migration

### Phase 1 : Cas Simples (Migration Manuelle)

Convertir les cas simples de `Box` et `Stack` vers des `div` avec classes Tailwind :

```tsx
// Avant (MUI)
<Box sx={{ display: 'flex', gap: 2, p: 3 }}>
  <Stack direction="row" spacing={2}>
    ...
  </Stack>
</Box>

// Après (Tailwind)
<div className="flex gap-2 p-3">
  <div className="flex flex-row gap-2">
    ...
  </div>
</div>
```

### Phase 2 : Cas Complexes (Garder MUI temporairement)

Pour les cas avec `sx` dynamiques ou complexes, garder MUI Box/Stack temporairement :

```tsx
// Cas complexe - garder MUI pour l'instant
<Box
  sx={(theme) => ({
    display: 'flex',
    gap: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  })}
>
  ...
</Box>
```

### Phase 3 : Wrappers (Optionnel)

Des wrappers `BoxWrapper` et `StackWrapper` ont été créés mais ne font rien pour l'instant.
Ils serviront de point d'entrée pour une migration future plus automatisée.

## 📝 Mapping MUI → Tailwind

### Box

| MUI Box | Tailwind CSS |
|---------|--------------|
| `sx={{ display: 'flex' }}` | `className="flex"` |
| `sx={{ gap: 2 }}` | `className="gap-2"` |
| `sx={{ p: 3 }}` | `className="p-3"` |
| `sx={{ m: 2 }}` | `className="m-2"` |
| `sx={{ width: '100%' }}` | `className="w-full"` |
| `sx={{ height: '100%' }}` | `className="h-full"` |

### Stack

| MUI Stack | Tailwind CSS |
|-----------|--------------|
| `<Stack direction="row">` | `<div className="flex flex-row">` |
| `<Stack direction="column">` | `<div className="flex flex-col">` |
| `<Stack spacing={2}>` | `<div className="flex gap-2">` |
| `<Stack alignItems="center">` | `<div className="flex items-center">` |
| `<Stack justifyContent="center">` | `<div className="flex justify-center">` |

## 🎯 Ordre de Migration Recommandé

1. **Composants simples** (display, gap, padding, margin)
2. **Layouts de base** (flexbox, grid)
3. **Responsive** (breakpoints)
4. **Cas complexes** (sx dynamiques, thème)

## ⚠️ Limitations

- Les `sx` dynamiques avec fonctions `(theme) => ...` nécessitent une conversion manuelle
- Les breakpoints MUI doivent être convertis en classes Tailwind responsive
- Certains cas complexes peuvent nécessiter de garder MUI temporairement

## 📚 Ressources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind Flexbox](https://tailwindcss.com/docs/flex)
- [Tailwind Spacing](https://tailwindcss.com/docs/padding)

