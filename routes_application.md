# Liste des routes de l'application

## Routes publiques (Home)

### `/` (Page d'accueil)
- **Fichier**: `src/app/(home)/page.tsx`
- **Layout**: `src/app/(home)/layout.tsx`
- **Description**: Page d'accueil de l'application

## Routes d'erreur

### `/error/403` (Accès interdit)
- **Fichier**: `src/app/error/403/page.tsx`
- **Path configuré**: `paths.page403`

### `/error/404` (Page non trouvée)
- **Fichier**: `src/app/error/404/page.tsx`
- **Path configuré**: `paths.page404`

### `/error/500` (Erreur serveur)
- **Fichier**: `src/app/error/500/page.tsx`
- **Path configuré**: `paths.page500`

## Routes Dashboard

### `/dashboard` (Vue d'ensemble)
- **Fichier**: `src/app/dashboard/page.tsx`
- **Layout**: `src/app/dashboard/layout.tsx`
- **Path configuré**: `paths.dashboard.root`
- **Description**: Page principale du dashboard (Overview/App)

### `/dashboard/file-manager` (Gestionnaire de fichiers)
- **Fichier**: `src/app/dashboard/file-manager/page.tsx`
- **Path configuré**: `paths.dashboard.fileManager`
- **Description**: Gestionnaire de fichiers

## Routes Utilisateur

### `/dashboard/user` (Profil utilisateur)
- **Fichier**: `src/app/dashboard/user/page.tsx`
- **Path configuré**: `paths.dashboard.user.root`
- **Description**: Page de profil utilisateur

### `/dashboard/user/new` (Créer un utilisateur)
- **Fichier**: `src/app/dashboard/user/new/page.tsx`
- **Path configuré**: `paths.dashboard.user.new`
- **Description**: Formulaire de création d'utilisateur

### `/dashboard/user/list` (Liste des utilisateurs)
- **Fichier**: `src/app/dashboard/user/list/page.tsx`
- **Path configuré**: `paths.dashboard.user.list`
- **Description**: Liste de tous les utilisateurs

### `/dashboard/user/cards` (Cartes utilisateurs)
- **Fichier**: `src/app/dashboard/user/cards/page.tsx`
- **Path configuré**: `paths.dashboard.user.cards`
- **Description**: Vue en cartes des utilisateurs

### `/dashboard/user/[id]/edit` (Modifier un utilisateur)
- **Fichier**: `src/app/dashboard/user/[id]/edit/page.tsx`
- **Path configuré**: `paths.dashboard.user.edit(id)`
- **Path exemple**: `paths.dashboard.user.demo.edit` = `/dashboard/user/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit`
- **Description**: Formulaire d'édition d'utilisateur (route dynamique)

## Routes Compte (Account)

### `/dashboard/user/account` (Paramètres du compte)
- **Fichier**: `src/app/dashboard/user/account/page.tsx`
- **Layout**: `src/app/dashboard/user/account/layout.tsx`
- **Path configuré**: `paths.dashboard.user.account`
- **Description**: Page principale des paramètres du compte (General uniquement)

## Structure de navigation

Les routes sont organisées dans la navigation via `src/layouts/nav-config-dashboard.tsx` :

### Section "Overview"
- App (`/dashboard`)

### Section "Management"
- **User** (avec sous-menu) :
  - Profile (`/dashboard/user`)
  - Cards (`/dashboard/user/cards`)
  - List (`/dashboard/user/list`)
  - Create (`/dashboard/user/new`)
  - Edit (`/dashboard/user/[id]/edit`)
  - Account (`/dashboard/user/account` - avec deepMatch)
- **File manager** (`/dashboard/file-manager`)

## Configuration des routes

Les chemins sont définis dans `src/routes/paths.ts` :
- Routes d'erreur : `paths.page403`, `paths.page404`, `paths.page500`
- Routes dashboard : `paths.dashboard.*`
- Routes utilisateur : `paths.dashboard.user.*`

## Notes

- Toutes les routes dashboard utilisent le layout `src/app/dashboard/layout.tsx`
- Les routes account utilisent un layout spécifique `src/app/dashboard/user/account/layout.tsx`
- La route `/dashboard/user/account` utilise `deepMatch: true` pour correspondre à toutes les sous-routes
- La route d'édition utilisateur est dynamique avec le paramètre `[id]`

