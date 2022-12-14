import React from 'react';
import styled from 'styled-components';
import NextImage, { ImageProps } from 'next/image';

export const Image = (props: ImageProps) => {
  // return <NextImage {...props} />;
  // eslint-disable-next-line @next/next/no-img-element
  return <Img src={`/blog${String(props.src)}`} alt={props.alt} />;
};

const Img = styled.img`
  width: inherit;
  height: inherit;
  object-fit: cover;
`;
