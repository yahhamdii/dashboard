// ----------------------------------------------------------------------

export function layoutSectionVars(theme?: any) {
  // Valeurs par défaut pour zIndex (équivalentes à MUI)
  const defaultZIndex = {
    drawer: 1200,
    appBar: 1100,
  };

  const zIndex = theme?.zIndex || defaultZIndex;

  return {
    '--layout-nav-zIndex': zIndex.drawer + 1,
    '--layout-nav-mobile-width': '288px',
    '--layout-header-blur': '8px',
    '--layout-header-zIndex': zIndex.appBar + 1,
    '--layout-header-mobile-height': '64px',
    '--layout-header-desktop-height': '72px',
  };
}
