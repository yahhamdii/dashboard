/**
 * Portal Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import { createPortal } from 'react-dom';

// ----------------------------------------------------------------------

export interface PortalWrapperProps {
    children: React.ReactNode;
    container?: Element | (() => Element | null) | null;
    disablePortal?: boolean;
    [key: string]: any;
}

export function PortalWrapper({
    children,
    container,
    disablePortal = false,
    ...other
}: PortalWrapperProps) {
    const [mountNode, setMountNode] = React.useState<Element | null>(null);

    React.useEffect(() => {
        if (!disablePortal) {
            setMountNode(
                typeof container === 'function' ? container() : container || document.body
            );
        }
    }, [container, disablePortal]);

    if (disablePortal) {
        return <>{children}</>;
    }

    return mountNode ? createPortal(children, mountNode) : null;
}
