// src/components/StatsCard.tsx

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

export interface StatsCardProps {
  /** Título da métrica (e.g. “Links”, “Emojis”) */
  title: string;
  /** Valor a ser exibido (número, string ou ReactNode para composições mais ricas) */
  value: React.ReactNode;
  /** Ícone opcional (e.g. 🎵, 😊) */
  icon?: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <Card sx={{ minWidth: 180, flexGrow: 1 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          {icon && (
            <Box component="span" mr={1} fontSize="1.5rem">
              {icon}
            </Box>
          )}
          <Typography variant="subtitle1" color="textSecondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};
