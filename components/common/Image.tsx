import React from 'react';
import NextImage, { ImageProps } from 'next/image';

export const Image = (props: ImageProps) => {
  return <NextImage {...props} />;
};
