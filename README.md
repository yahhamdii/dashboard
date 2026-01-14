## Prerequisites

- Node.js >=22 (Recommended)

## Installation

**Using Yarn (Recommended)**

```sh
yarn install
yarn dev
```

**Using Npm**

```sh
npm i
npm run dev
```

## Build

```sh
yarn build
# or
npm run build
```

## Mock server

By default we provide demo data from : `https://api-dev-minimal-[version].vercel.app`

To set up your local server:

- **Guide:** [https://docs.minimals.cc/mock-server](https://docs.minimals.cc/mock-server).

- **Resource:** [Download](https://www.dropbox.com/scl/fo/bopqsyaatc8fbquswxwww/AKgu6V6ZGmxtu22MuzsL5L4?rlkey=8s55vnilwz2d8nsrcmdo2a6ci&dl=0).

## Full version

- Create React App ([migrate to CRA](https://docs.minimals.cc/migrate-to-cra/)).
- Next.js
- Vite.js

## Starter version

- To remove unnecessary components. This is a simplified version ([https://starter.minimals.cc/](https://starter.minimals.cc/))
- Good to start a new project. You can copy components from the full version.
- Make sure to install the dependencies exactly as compared to the full version.

---

## Migration vers Circuit UI

Ce projet est en cours de migration vers **Circuit UI** avec une approche progressive utilisant des feature flags.

### Documentation

- 📖 **[Guide du Développeur](DEVELOPER_GUIDE.md)** - Comment utiliser Circuit UI
- 📊 **[Rapport de Migration](MIGRATION_COMPLETE.md)** - État de la migration
- 🧹 **[Plan de Clean-up](PHASE6_CLEANUP.md)** - Actions de nettoyage
- 🚀 **[Guide d'Activation](GUIDE_ACTIVATION_PROGRESSIVE.md)** - Activation progressive

### Feature Flags

Les feature flags permettent d'activer Circuit UI progressivement. Configuration dans `.env` :

```env
NEXT_PUBLIC_USE_CIRCUIT_LAYOUTS=false
NEXT_PUBLIC_USE_CIRCUIT_CARDS=false
NEXT_PUBLIC_USE_CIRCUIT_FORMS=false
# ... voir GUIDE_ACTIVATION_PROGRESSIVE.md
```

### Utilisation

```tsx
// Utiliser les wrappers Circuit UI
import { ButtonWrapper as Button } from 'src/components/circuit-ui';
import { TypographyWrapper as Typography } from 'src/components/circuit-ui';

export function MyComponent() {
  return (
    <div>
      <Typography variant="h4">Titre</Typography>
      <Button variant="contained">Cliquer</Button>
    </div>
  );
}
```

Voir [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) pour plus de détails.

---

**NOTE:**
_When copying folders remember to also copy hidden files like .env. This is important because .env files often contain environment variables that are crucial for the application to run correctly._
