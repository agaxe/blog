export const size: Record<string, number> = {
  sm: 414,
  md: 768,
  lg: 1176,
  xl: 1440
};

type DeviceType = 'sm' | 'md' | 'lg' | 'xl' | number;

export const device = (width: DeviceType) =>
  `@media(max-width: ${
    typeof width === 'number' ? `${width}px` : `${size[String(width)]}px`
  })`;
