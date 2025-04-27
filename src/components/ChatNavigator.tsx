// src/components/ChatNavigator.tsx

import React, { useState, useRef, TouchEvent } from 'react';
import { Box, MobileStepper } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

export interface ChatNavigatorProps {
  /** Um array de ReactNodes, cada um representando um StatsCard ou outra “tela” */
  items: React.ReactNode[];
}

export const ChatNavigator: React.FC<ChatNavigatorProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handleBack = () => {
    setActiveIndex((prev) =>
      prev === 0 ? items.length - 1 : prev - 1
    );
  };

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 50; // px mínimo para considerar swipe
    if (deltaX > threshold) {
      handleBack();
    } else if (deltaX < -threshold) {
      handleNext();
    }
    touchStartX.current = null;
  };

  return (
    <Box
      position="relative"
      height="100vh"
      width="100%"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ bgcolor: 'background.default' }}
    >
      {/* Content */}
      <Box width="100%" px={2}>
        {items[activeIndex]}
      </Box>

      {/* Stepper */}
      <MobileStepper
        variant="dots"
        steps={items.length}
        position="bottom"
        activeStep={activeIndex}
        nextButton={
          <KeyboardArrowRight
            onClick={handleNext}
            sx={{ cursor: 'pointer' }}
          />
        }
        backButton={
          <KeyboardArrowLeft
            onClick={handleBack}
            sx={{ cursor: 'pointer' }}
          />
        }
        sx={{
          background: 'transparent',
          justifyContent: 'center',
        }}
      />
    </Box>
  );
};
