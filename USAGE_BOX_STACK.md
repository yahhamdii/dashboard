# Utilisation de Box et Stack dans le projet

## 📊 Statistiques

- **Box** : ~90 fichiers utilisent `Box` de MUI
- **Stack** : ~12 fichiers utilisent `Stack` de MUI
- **Total** : ~102 fichiers avec Box/Stack

## 📁 Répartition par catégorie

### 🎨 Layouts (5 fichiers)
- `src/layouts/dashboard/layout.tsx`
- `src/layouts/dashboard/nav-vertical.tsx`
- `src/layouts/dashboard/nav-horizontal.tsx`
- `src/layouts/dashboard/nav-mobile.tsx`
- `src/layouts/simple/layout.tsx`
- `src/layouts/simple/content.tsx`
- `src/layouts/components/workspaces-popover.tsx`

### 📄 Sections - User Management (12 fichiers)
- `src/sections/user/user-create-edit-form.tsx` (Box + Stack)
- `src/sections/user/user-quick-edit-form.tsx`
- `src/sections/user/user-table-row.tsx` (Stack)
- `src/sections/user/user-card.tsx`
- `src/sections/user/user-card-list.tsx`
- `src/sections/user/user-table-toolbar.tsx`
- `src/sections/user/profile-home.tsx` (Box + Stack)
- `src/sections/user/profile-cover.tsx`
- `src/sections/user/profile-post-item.tsx` (Box + Stack)
- `src/sections/user/profile-friends.tsx`
- `src/sections/user/profile-gallery.tsx`
- `src/sections/user/profile-followers.tsx`
- `src/sections/user/view/user-list-view.tsx`
- `src/sections/user/view/user-profile-view.tsx`

### 📁 Sections - File Manager (15 fichiers)
- `src/sections/file-manager/view/file-manager-view.tsx` (Box + Stack)
- `src/sections/file-manager/file-manager-table.tsx`
- `src/sections/file-manager/file-manager-grid-view.tsx`
- `src/sections/file-manager/file-manager-filters.tsx`
- `src/sections/file-manager/file-manager-panel.tsx`
- `src/sections/file-manager/file-manager-action-selected.tsx`
- `src/sections/file-manager/file-manager-share-dialog.tsx`
- `src/sections/file-manager/file-manager-create-folder-dialog.tsx`
- `src/sections/file-manager/file-storage-overview.tsx`
- `src/sections/file-manager/file-manager-invited-item.tsx`
- `src/sections/file-manager/file-widget.tsx`
- `src/sections/file-manager/file-upgrade.tsx` (Box + Stack)
- `src/sections/file-manager/file-manager-file-details.tsx` (Box + Stack)
- `src/sections/file-manager/file-manager-file-item-slots.tsx` (Box + Stack)
- `src/sections/file-manager/file-manager-table-row.tsx`

### 📊 Sections - Overview/Dashboard (8 fichiers)
- `src/sections/overview/app/view/overview-app-view.tsx`
- `src/sections/overview/app/app-welcome.tsx`
- `src/sections/overview/app/app-featured.tsx`
- `src/sections/overview/app/app-top-related.tsx` (Box + Stack)
- `src/sections/overview/app/app-top-installed-countries.tsx`
- `src/sections/overview/app/app-widget.tsx`
- `src/sections/overview/app/app-new-invoices.tsx`
- `src/sections/overview/app/app-top-authors.tsx`
- `src/sections/overview/app/app-widget-summary.tsx`

### 👤 Sections - Account (1 fichier)
- `src/sections/account/account-general.tsx` (Box + Stack)

### 🧩 Composants réutilisables (20+ fichiers)
- `src/components/empty-content/empty-content.tsx`
- `src/components/search-not-found/search-not-found.tsx`
- `src/components/table/table-selected-action.tsx`
- `src/components/table/table-head-custom.tsx`
- `src/components/table/table-pagination-custom.tsx`
- `src/components/upload/default/upload-default.tsx`
- `src/components/upload/avatar/upload-avatar.tsx`
- `src/components/hook-form/rhf-slider.tsx`
- `src/components/hook-form/rhf-switch.tsx`
- `src/components/hook-form/rhf-upload.tsx`
- `src/components/hook-form/rhf-checkbox.tsx`
- `src/components/hook-form/rhf-rating.tsx`
- `src/components/hook-form/rhf-code.tsx`
- `src/components/hook-form/rhf-select.tsx`
- `src/components/carousel/components/carousel-dot-buttons.tsx`
- `src/components/lightbox/lightbox.tsx`
- `src/components/chart/components/chart-loading.tsx`
- `src/components/animate/motion-container.tsx`

### 🎨 Theme (1 fichier)
- `src/theme/core/components/avatar.tsx`

## 🎯 Pages les plus impactées

### Pages principales utilisant Box/Stack :

1. **Dashboard Overview** (`/dashboard`)
   - `overview-app-view.tsx` + 8 composants app-*
   - Utilisation intensive de Box pour les layouts

2. **User Management** (`/dashboard/user/*`)
   - `user-list-view.tsx`
   - `user-create-edit-form.tsx` (Box + Stack)
   - `user-profile-view.tsx`
   - `user-card.tsx`, `user-card-list.tsx`
   - `user-table-row.tsx` (Stack)

3. **File Manager** (`/dashboard/file-manager`)
   - `file-manager-view.tsx` (Box + Stack)
   - 14 autres fichiers dans file-manager/
   - Utilisation intensive pour les layouts de fichiers

4. **Account** (`/dashboard/user/account`)
   - `account-general.tsx` (Box + Stack)

5. **Layouts**
   - Tous les layouts utilisent Box pour la structure principale

## 📝 Types d'utilisation courants

### Box - Cas d'usage typiques :
- Layouts flexbox (`display: 'flex'`)
- Containers avec padding/margin
- Wrappers pour composants
- Responsive breakpoints
- Styling conditionnel avec `sx`

### Stack - Cas d'usage typiques :
- Layouts verticaux/horizontaux
- Espacement entre éléments (`spacing`)
- Formulaires (champs empilés)
- Listes d'éléments

## 🔄 Stratégie de migration recommandée

### Priorité 1 : Composants réutilisables
Migrer d'abord les composants utilisés partout :
- `empty-content.tsx`
- `search-not-found.tsx`
- `table-selected-action.tsx`

### Priorité 2 : Pages simples
- Error pages (déjà partiellement migrées)
- Account General

### Priorité 3 : Pages complexes
- Dashboard Overview
- User Management
- File Manager

### Priorité 4 : Layouts
- Migrer en dernier car très utilisés partout

## ⚠️ Complexité estimée

- **Cas simples** (display, gap, padding) : ~40% des usages
- **Cas moyens** (responsive, conditions) : ~40% des usages
- **Cas complexes** (sx dynamiques, thème) : ~20% des usages

