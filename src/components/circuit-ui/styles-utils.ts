import React from 'react';

// Breakpoints MUI → valeurs en pixels
const BREAKPOINTS = {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
};

// Conversion spacing MUI (facteur 8px)
export function convertSpacing(value: any): string | undefined {
    if (value === undefined || value === null) return undefined;
    if (typeof value === 'number') return `${value * 8}px`;
    if (typeof value === 'string') return value;
    return undefined;
}

// Conversion des props sx en styles CSS
export function convertSxToStyles(sx: any): React.CSSProperties {
    if (!sx) return {};

    // Handle array of styles
    if (Array.isArray(sx)) {
        return sx.reduce((acc, item) => ({ ...acc, ...convertSxToStyles(item) }), {});
    }

    if (typeof sx !== 'object') return {};

    const styles: React.CSSProperties = {};

    for (const [key, value] of Object.entries(sx)) {
        if (value === undefined || value === null) continue;

        // Ignorer les clés de breakpoint et les sélecteurs CSS
        if (key.startsWith('@') || key.startsWith('&') || key.startsWith('.')) continue;

        const getValueForBreakpoint = (val: any) => {
            if (val && typeof val === 'object' && ('xs' in val || 'sm' in val || 'md' in val || 'lg' in val || 'xl' in val)) {
                // For now, we only take 'xs' or the first available value as a fallback for inline-styles
                // Real responsive styles need media queries which inline styles don't support well,
                // or we need a resize observer/hook to determine current breakpoint.
                // BoxWrapper currently assumes 'xs' is the default value.
                return val.xs ?? Object.values(val)[0];
            }
            return val;
        };

        // Propriétés de spacing
        if (['p', 'pt', 'pb', 'pl', 'pr', 'px', 'py', 'm', 'mt', 'mb', 'ml', 'mr', 'mx', 'my', 'gap', 'rowGap', 'columnGap'].includes(key)) {
            const spacingValue = getValueForBreakpoint(value);
            const converted = convertSpacing(spacingValue);

            switch (key) {
                case 'p': styles.padding = converted; break;
                case 'pt': styles.paddingTop = converted; break;
                case 'pb': styles.paddingBottom = converted; break;
                case 'pl': styles.paddingLeft = converted; break;
                case 'pr': styles.paddingRight = converted; break;
                case 'px':
                    styles.paddingLeft = converted;
                    styles.paddingRight = converted;
                    break;
                case 'py':
                    styles.paddingTop = converted;
                    styles.paddingBottom = converted;
                    break;
                case 'm': styles.margin = converted; break;
                case 'mt': styles.marginTop = converted; break;
                case 'mb': styles.marginBottom = converted; break;
                case 'ml': styles.marginLeft = converted; break;
                case 'mr': styles.marginRight = converted; break;
                case 'mx':
                    styles.marginLeft = converted;
                    styles.marginRight = converted;
                    break;
                case 'my':
                    styles.marginTop = converted;
                    styles.marginBottom = converted;
                    break;
                case 'gap': styles.gap = converted; break;
                case 'rowGap': styles.rowGap = converted; break;
                case 'columnGap': styles.columnGap = converted; break;
            }
            continue;
        }

        // Propriétés de taille
        if (['width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight'].includes(key)) {
            const sizeValue = getValueForBreakpoint(value);

            if (typeof sizeValue === 'number') {
                // MUI convention: values <= 1 are percentages, > 1 are pixels
                (styles as any)[key] = sizeValue <= 1 ? `${sizeValue * 100}%` : `${sizeValue}px`;
            } else {
                (styles as any)[key] = sizeValue;
            }
            continue;
        }

        // Propriétés de couleur
        if (key === 'bgcolor' || key === 'backgroundColor') {
            styles.backgroundColor = getValueForBreakpoint(value);
            continue;
        }
        if (key === 'color') {
            styles.color = getValueForBreakpoint(value);
            continue;
        }

        // Propriétés flexbox
        if (['display', 'flexDirection', 'flexWrap', 'justifyContent', 'alignItems', 'alignContent', 'flex', 'flexGrow', 'flexShrink', 'flexBasis', 'order'].includes(key)) {
            (styles as any)[key] = getValueForBreakpoint(value);
            continue;
        }

        // Propriétés de position
        if (['position', 'top', 'right', 'bottom', 'left', 'zIndex'].includes(key)) {
            const posVal = getValueForBreakpoint(value);
            (styles as any)[key] = typeof posVal === 'number' && ['top', 'right', 'bottom', 'left'].includes(key) ? `${posVal}px` : posVal;
            continue;
        }

        // Propriétés de bordure et ombre
        if (['borderRadius', 'border', 'borderTop', 'borderBottom', 'borderLeft', 'borderRight', 'borderColor', 'borderWidth', 'borderStyle', 'boxShadow'].includes(key)) {
            const borderVal = getValueForBreakpoint(value);
            (styles as any)[key] = typeof borderVal === 'number' && key === 'borderRadius' ? `${borderVal}px` : borderVal;
            continue;
        }

        // Propriétés de texte
        if (['textAlign', 'textTransform', 'fontWeight', 'fontSize', 'lineHeight', 'letterSpacing', 'textDecoration', 'fontFamily'].includes(key)) {
            (styles as any)[key] = getValueForBreakpoint(value);
            continue;
        }

        // Overflow
        if (['overflow', 'overflowX', 'overflowY'].includes(key)) {
            (styles as any)[key] = getValueForBreakpoint(value);
            continue;
        }

        // Opacity et visibility
        if (['opacity', 'visibility'].includes(key)) {
            (styles as any)[key] = getValueForBreakpoint(value);
            continue;
        }

        // Background image etc
        if (key === 'backgroundImage' || key === 'backgroundSize' || key === 'backgroundPosition' || key === 'backgroundRepeat') {
            (styles as any)[key] = getValueForBreakpoint(value);
            continue;
        }

        // CSS variables (starting with --)
        if (key.startsWith('--')) {
            (styles as any)[key] = getValueForBreakpoint(value);
            continue;
        }

        // Autres propriétés CSS directes
        if (typeof value === 'string' || typeof value === 'number') {
            (styles as any)[key] = value;
        }
    }

    return styles;
}
