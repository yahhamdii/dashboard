/**
 * Typography Wrapper - Compatibilité MUI → Circuit UI
 * 
 * Wrapper qui permet d'utiliser Circuit UI Typography avec l'API MUI
 * pour faciliter la migration progressive.
 */

'use client';


import { Headline, Body } from '@sumup-oss/circuit-ui';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface TypographyWrapperProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'subtitle1' | 'subtitle2' | 'overline' | 'inherit' | string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
  component?: React.ElementType;
  color?: string;
  sx?: any;
  [key: string]: any;
}


/**
 * Mapping MUI Typography variants → Circuit UI components
 */
const variantMapping = {
  h1: { component: Headline, as: 'h1' as const, size: 'l' as const },
  h2: { component: Headline, as: 'h2' as const, size: 'l' as const },
  h3: { component: Headline, as: 'h3' as const, size: 'm' as const },
  h4: { component: Headline, as: 'h4' as const, size: 'm' as const },
  h5: { component: Headline, as: 'h5' as const, size: 's' as const },
  h6: { component: Headline, as: 'h6' as const, size: 's' as const },
  subtitle1: { component: Headline, as: 'h6' as const, size: 's' as const },
  subtitle2: { component: Headline, as: 'h6' as const, size: 's' as const },
  body1: { component: Body, as: 'p' as const, size: 'm' as const },
  body2: { component: Body, as: 'p' as const, size: 's' as const },
  caption: { component: Body, as: 'span' as const, size: 's' as const },
  overline: { component: Body, as: 'span' as const, size: 's' as const },
} as const;

/**
 * Typography wrapper component
 * 
 * Utilise Circuit UI quand le flag USE_CIRCUIT_TYPOGRAPHY est activé,
 * sinon utilise MUI Typography
 */
export function TypographyWrapper({
  variant = 'body1',
  children,
  className,
  sx,
  ...other
}: TypographyWrapperProps) {
  // const useCircuit = useCircuitComponent('USE_CIRCUIT_TYPOGRAPHY');

  // Normaliser le variant (peut être une string ou un type MUI)
  const normalizedVariant = (typeof variant === 'string' ? variant : 'body1');

  // Utiliser Circuit UI
  const mapping = variantMapping[normalizedVariant as keyof typeof variantMapping];

  if (!mapping) {
    // Fallback sur body1 si variant non reconnu
    const fallback = variantMapping.body1;
    const Component = fallback.component;
    const {
      color,
      noWrap,
      gutterBottom,
      paragraph,
      align,
      component,
      ...circuitProps
    } = other as any;

    // Merge styles
    const style = {
      ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? sx as React.CSSProperties : undefined),
      ...(noWrap ? { whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' } : {}),
      ...(align ? { textAlign: align } : {}),
      ...(color ? { color } : {})
    };

    // If component is passed, we might want to respect it, but Circuit UI components expect proper 'as' prop.
    // 'as' prop in Circuit UI usually accepts valid HTML tags.
    const asProp = component || fallback.as;

    return (
      <Component as={asProp} size={fallback.size} className={className} style={style} {...circuitProps}>
        {children}
      </Component>
    );
  }

  const { component: Component, as, size } = mapping as typeof variantMapping[keyof typeof variantMapping];

  // Filtrer les props MUI incompatibles avec Circuit UI
  // Circuit UI n'accepte pas toutes les props de MUI Typography
  const {
    color,
    noWrap, // MUI prop qui n'existe pas dans Circuit UI
    gutterBottom, // MUI prop qui n'existe pas dans Circuit UI
    paragraph, // MUI prop qui n'existe pas dans Circuit UI
    align, // MUI prop qui n'existe pas dans Circuit UI
    component,
    ...circuitProps
  } = other as any;

  // Convertir sx (MUI) en style (Circuit UI) - seulement pour les styles simples
  const style = sx ? (typeof sx === 'object' && !Array.isArray(sx) ? sx as React.CSSProperties : undefined) : undefined;

  // Gérer noWrap avec style CSS si nécessaire
  const finalStyle = noWrap
    ? { ...style, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
    : style;

  // Gérer align avec style CSS si nécessaire
  const finalStyleWithAlign = align
    ? { ...finalStyle, textAlign: align }
    : finalStyle;

  // Handle color override
  const finalStyleWithColor = color ? { ...finalStyleWithAlign, color } : finalStyleWithAlign;

  const asProp = component || as;

  return (
    <Component as={asProp} size={size} className={className} style={finalStyleWithColor} {...circuitProps}>
      {children}
    </Component>
  );
}

