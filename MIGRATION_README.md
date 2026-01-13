# Migration MUI → Circuit UI - Guide de Démarrage

## 📋 État Actuel

- ✅ Branche créée: `feature/circuit-ui-migration`
- ✅ Commit initial effectué
- ✅ Système de feature flags créé
- ⏳ Circuit UI à installer: `npm install @sumup-oss/circuit-ui @sumup-oss/design-tokens @sumup-oss/icons`

## 🚀 Prochaines Étapes

### 1. Installer Circuit UI

```bash
npm install @sumup-oss/circuit-ui @sumup-oss/design-tokens @sumup-oss/icons
```

### 2. Configurer les Feature Flags

Copier `.env.example` vers `.env.local` et activer les flags progressivement :

```bash
cp .env.example .env.local
```

Puis modifier les valeurs dans `.env.local` selon vos besoins.

### 3. Utiliser les Feature Flags

Exemple d'utilisation dans un composant :

```tsx
import { useCircuitComponent } from 'src/lib/feature-flags';
import { Button as CircuitButton } from '@sumup-oss/circuit-ui';
import Button from '@mui/material/Button';

export function MyComponent() {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_BUTTONS');
  
  if (useCircuit) {
    return <CircuitButton variant="primary">Click me</CircuitButton>;
  }
  
  return <Button variant="contained">Click me</Button>;
}
```

### 4. Vérifier l'État de la Migration

```tsx
import { getMigrationProgress, getEnabledFlags } from 'src/lib/feature-flags';

// Dans votre code
const progress = getMigrationProgress(); // 0-100%
const enabledFlags = getEnabledFlags(); // Liste des flags activés
```

## 📝 Documentation

- Plan de migration: `plan_migration_final_validations.md`
- Routes de l'application: `routes_application.md`

## 🔄 Workflow Recommandé

1. Activer un flag dans `.env.local`
2. Migrer les composants concernés
3. Tester visuellement
4. Commit avec message descriptif
5. Passer au flag suivant

## ⚠️ Notes Importantes

- Les flags sont contrôlés via variables d'environnement (NEXT_PUBLIC_*)
- Redémarrer le serveur de dev après modification des flags
- Tous les flags sont `false` par défaut (MUI utilisé)
- Migration progressive recommandée (un flag à la fois)

