import React from 'react';
import NextImage, { ImageProps } from 'next/image';
import styled from 'styled-components';

export const Image = (props: ImageProps) => {
  return <NextImage {...props} />;
  // eslint-disable-next-line @next/next/no-img-element
  //return <Img src={`${String(props.src)}`} alt={props.alt} />;
};

const Img = styled.img`
  width: inherit;
  height: inherit;
  object-fit: cover;
`;
