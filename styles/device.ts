export const size = {
  sm: 414,
  md: 768,
  lg: 1176,
  xl: 1440
};

type DeviceSize = keyof typeof size | number;

export const device = (width: DeviceSize) =>
  `@media(max-width: ${
    typeof width === 'number' ? `${width}px` : `${size[width]}px`
  })`;
