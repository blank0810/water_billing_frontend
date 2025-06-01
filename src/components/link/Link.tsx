'use client';

import { Button, ButtonProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ComponentProps } from 'react';

type LinkProps = ButtonProps & ComponentProps<typeof NextLink>;

function Link({ href, children, ...props }: LinkProps) {
  return (
    <Button
      as={NextLink}
      href={href}
      variant="a"
      {...props}
    >
      {children}
    </Button>
  );
}

export default Link;
