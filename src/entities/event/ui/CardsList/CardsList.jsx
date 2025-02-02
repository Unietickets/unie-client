'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Container } from '@shared/ui';

import { Card } from './Card';

import * as Styles from './CardsList.styles';

export const CardsList = ({ title, events }) => {
  const ref = useRef(null);
  const [horizontalPadding, setHorizontalPadding] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const titleNode = ref.current;
    const rect = titleNode.getBoundingClientRect();
    setHorizontalPadding(rect.left);
    setIsLoading(false);
  }, []);

  return (
    <>
      <Container>
        <Styles.Title ref={ref}>{title}</Styles.Title>
      </Container>
      <Styles.CardsWrapper horizontalPadding={horizontalPadding}>
        {isLoading && (
          <Container>
            Loading...
          </Container>
        )}
        {!isLoading && events.map((event) => (
          <Styles.Card key={event.id}>
            <Card {...event} />
          </Styles.Card>
        ))}
      </Styles.CardsWrapper>
    </>
  )
};
