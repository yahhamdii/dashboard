# Plan de Migration MUI → Circuit UI (Version Ajustée)

## ⚠️ AVANT DE COMMENCER : Évaluation des alternatives

### Phase 0.5: Proof of Concept (Durée: 3-5 jours) - **NOUVEAU**

**Objectif**: Valider le choix de Circuit UI ou identifier une meilleure alternative

**Actions**:
1. Créer un POC avec Circuit UI sur une page simple (ex: Error 404)
2. Créer un POC parallèle avec Shadcn/UI sur la même page
3. Comparer:
   - Facilité d'intégration
   - Qualité des composants
   - Performance
   - Documentation
   - Support communautaire
4. **Décision**: Choisir la meilleure solution avant de continuer

**Recommandation**: Si Circuit UI n'est pas un choix imposé, **Shadcn/UI est recommandé** pour ce projet.

---

## Phase 0: Préparation (Durée: 2 jours) - **AJUSTÉ**

### Actions supplémentaires:
- [ ] Analyser toutes les dépendances MUI (grep sur 700+ fichiers)
- [ ] Créer un mapping complet MUI → Circuit UI (ou alternative choisie)
- [ ] Identifier les composants custom qui dépendent de MUI
- [ ] Établir une stratégie de migration progressive (feature flags)

---

## Phase 1: Fondations (Durée: 4-5 jours) - **AJUSTÉ**

### Modifications proposées:

**Option A: Si Circuit UI est choisi**
```typescript
// theme-provider.tsx
import { ThemeProvider, GlobalStyles } from '@sumup-oss/circuit-ui';
import { light as lightTheme } from '@sumup-oss/design-tokens';

// ⚠️ PROBLÈME: Circuit UI n'a pas de dark mode natif
// Solution: Implémenter un système custom ou utiliser CSS variables
```

**Option B: Si Shadcn/UI est choisi (RECOMMANDÉ)**
```typescript
// Pas besoin de ThemeProvider global
// Utilisation directe de Tailwind CSS (déjà présent)
// Dark mode via Tailwind dark: classes
```

### Fichiers à migrer:
- `src/theme/theme-provider.tsx` - Remplacer complètement
- `src/theme/create-theme.ts` - Adapter ou supprimer
- `src/theme/core/palette.ts` - Mapper vers design tokens
- `src/theme/core/typography.ts` - Adapter vers système Circuit/Shadcn
- `src/app/layout.tsx` - Adapter les providers

---

## Phase 2: Composants de Base (Durée: 8-10 jours) - **AJUSTÉ**

### Priorisation révisée:

**🔴 Priorité CRITIQUE (Semaine 1)**
1. **Typography** - Utilisé partout (668 occurrences)
   - Circuit UI: `Headline`, `Body`, `SubHeadline`
   - Shadcn: Classes Tailwind typography
2. **Box/Stack/Grid** - Layout system
   - Circuit UI: CSS Grid/Flexbox custom
   - Shadcn: Tailwind utilities (déjà présent)
3. **Button** - Utilisé partout
4. **Input/TextField** - Formulaires critiques

**🟡 Priorité HAUTE (Semaine 2)**
5. **Card** - Dashboard principal
6. **Table** - File Manager, User List
7. **Dialog/Modal** - Modales importantes
8. **Form components** (Select, Checkbox, Switch)

**🟢 Priorité MOYENNE (Semaine 3)**
9. Navigation components
10. Avatar, Badge, Tooltip
11. Tabs, Pagination

### Composants sans équivalent - **STRATÉGIE RÉVISÉE**

| Composant MUI | Solution Circuit UI | Solution Shadcn/UI | Recommandation |
|---------------|-------------------|-------------------|----------------|
| DataGrid | ❌ Pas d'équivalent | ❌ Pas d'équivalent | **Garder MUI-X** ou TanStack Table |
| DatePicker | ❌ Pas d'équivalent | ✅ react-day-picker | **Migrer vers react-day-picker** |
| TreeView | ❌ Pas d'équivalent | ✅ Custom avec Radix | **Développer custom** |
| Autocomplete | ⚠️ Select limité | ✅ Combobox (Radix) | **Migrer vers Combobox** |
| Rating | ❌ Pas d'équivalent | ❌ Pas d'équivalent | **Garder custom ou lib tierce** |
| Slider | ❌ Pas d'équivalent | ✅ Slider (Radix) | **Migrer vers Radix Slider** |

---

## Phase 3: Layouts & Navigation (Durée: 5-6 jours) - **AJUSTÉ**

### Complexité révisée:
- **22 fichiers de layout** avec Box/Stack/Grid massivement utilisés
- **Stratégie**: Migration progressive avec feature flags

**Exemple de migration Box → Tailwind (si Shadcn)**:
```tsx
// Avant
<Box sx={{ display: 'flex', gap: 2, p: 3 }}>
  <Stack direction="row">...</Stack>
</Box>

// Après
<div className="flex gap-2 p-3">
  <div className="flex flex-row">...</div>
</div>
```

---

## Phase 4: Sections (Pages) (Durée: 8-10 jours) - **AJUSTÉ**

### Ordre de migration recommandé:
1. **Error Pages** (403, 404, 500) - Plus simples, bon pour valider
2. **Account General** - Formulaire simple
3. **Dashboard Overview** - Complexe mais visible
4. **User Management** - Formulaires complexes
5. **File Manager** - Tables et interactions complexes

### Stratégie par page:
- Migrer une page complète à la fois
- Tests visuels après chaque page
- Rollback possible via feature flag

---

## Phase 5: Clean-up (Durée: 2-3 jours) - **AJUSTÉ**

### Actions:
- [ ] Supprimer dépendances MUI (sauf MUI-X si gardé)
- [ ] Nettoyer imports inutilisés
- [ ] Optimiser bundle size
- [ ] Documentation de migration
- [ ] Guide pour futurs développeurs

---

## Timeline Révisée

| Phase | Durée | Dates estimées |
|-------|-------|----------------|
| **0.5: POC** | 3-5 jours | J1-J5 |
| **0: Préparation** | 2 jours | J6-J7 |
| **1: Fondations** | 4-5 jours | J8-J12 |
| **2: Composants Base** | 8-10 jours | J13-J22 |
| **3: Layouts** | 5-6 jours | J23-J28 |
| **4: Sections** | 8-10 jours | J29-J38 |
| **5: Clean-up** | 2-3 jours | J39-J41 |
| **Buffer (imprévus)** | 5-7 jours | J42-J48 |

**Total révisé: 35-48 jours** (au lieu de 24-28)

---

## Risques & Mitigations - **ENRICHIS**

| Risque | Impact | Probabilité | Mitigation AJUSTÉE |
|--------|--------|-------------|-------------------|
| Circuit UI manque de composants | 🔴 Élevé | Haute | **Évaluer Shadcn/UI en POC** |
| Régression visuelle | 🔴 Élevé | Haute | Tests snapshot + Review manuelle systématique |
| Performance dégradée | 🟡 Moyen | Moyenne | Benchmarks avant/après + Code splitting |
| Props API incompatibles | 🟡 Moyen | Haute | Créer wrappers adaptateurs réutilisables |
| Temps de migration sous-estimé | 🔴 Élevé | Haute | **Buffer de 20% minimum** |
| MUI-X dépendances | 🟡 Moyen | Haute | Garder MUI core minimal pour MUI-X |
| Dark mode perdu | 🟡 Moyen | Moyenne | Implémenter système custom si Circuit UI |

---

## Recommandations Finales

### ✅ APPROCHE RECOMMANDÉE

1. **Faire un POC avec Shadcn/UI** (3-5 jours)
   - Plus adapté à Next.js 16
   - Utilise Tailwind (déjà présent)
   - Composants copiables = contrôle total
   - Communauté active

2. **Migration progressive avec feature flags**
   - Permet rollback facile
   - Tests A/B possibles
   - Réduction des risques

3. **Garder MUI-X pour DataGrid**
   - Pas d'équivalent viable
   - Coût de remplacement trop élevé

4. **Migrer DatePicker vers react-day-picker**
   - Meilleure intégration avec Tailwind
   - Plus léger que MUI-X

5. **Budget temps réaliste: 6-8 semaines**
   - Incluant tests, corrections, documentation

### ❌ SI CIRCUIT UI EST OBLIGATOIRE

- Prévoir **8-10 semaines** minimum
- Développer plus de composants custom
- Accepter des limitations fonctionnelles
- Budget plus élevé pour développement custom

---

## Questions Critiques à Résoudre AVANT de commencer

1. **Circuit UI est-il un choix imposé ou peut-on évaluer des alternatives?**
2. **Quel est le budget temps réel disponible?** (48 jours vs 24 jours)
3. **Y a-t-il une deadline absolue?**
4. **Peut-on accepter une période de migration hybride (MUI + Circuit UI)?**
5. **Qui valide les choix techniques pendant la migration?**

---

## Conclusion

Le plan original est **bien structuré mais optimiste**. Les ajustements proposés:

✅ Ajout d'une phase POC pour valider le choix
✅ Estimations de temps réalistes (35-48 jours)
✅ Recommandation d'évaluer Shadcn/UI comme alternative
✅ Stratégie de migration progressive avec feature flags
✅ Buffer pour imprévus

**Recommandation finale**: Faire un POC avec Shadcn/UI avant de s'engager sur Circuit UI, sauf si Circuit UI est un choix imposé par contrainte métier.

