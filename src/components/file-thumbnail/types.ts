import type { TooltipWrapperProps } from 'src/components/circuit-ui/tooltip-wrapper';
import type { RemoveButton, ThumbnailRoot, ThumbnailImage, DownloadButton } from './styles';

// ----------------------------------------------------------------------

export type FileThumbnailProps = React.ComponentProps<typeof ThumbnailRoot> & {
  sx?: any;
  tooltip?: boolean;
  showImage?: boolean;
  previewUrl?: string;
  file?: File | string | null;
  onDownload?: () => void;
  onRemove?: () => void;
  slotProps?: {
    tooltip?: TooltipWrapperProps;
    img?: React.ComponentProps<typeof ThumbnailImage>;
    icon?: React.ComponentProps<typeof ThumbnailImage>;
    removeBtn?: React.ComponentProps<typeof RemoveButton>;
    downloadBtn?: React.ComponentProps<typeof DownloadButton>;
  };
};
