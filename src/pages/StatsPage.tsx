// src/pages/StatsPage.tsx

import React from 'react';
import { useChatData } from '../hooks/useChatData';
import { StatsCard } from '../components/StatsCard';
import { ChatNavigator } from '../components/ChatNavigator';

export interface StatsPageProps {
  /** Texto bruto do chat carregado */
  rawText: string;
}

export const StatsPage: React.FC<StatsPageProps> = ({ rawText }) => {
  const { metrics } = useChatData(rawText);
  console.log(metrics);

  // Prepara cada "slide" de estatística
  const items = [
    <StatsCard title="🔗 Links" value={metrics.links} key="links" />,
    <StatsCard title="🎵 Músicas" value={metrics.musicLinks} key="music" />,
    <StatsCard
      title="😊 Total de Emojis"
      value={Object.values(metrics.emojis).reduce((a, b) => a + b, 0)}
      key="emojis"
    />,
    <StatsCard
      title="📹 Tempo Vídeo"
      value={`${Math.floor(metrics.callTime.videoSec / 60)}m ${metrics.callTime.videoSec % 60}s`}
      key="video"
    />,
    <StatsCard
      title="🎙️ Tempo Áudio"
      value={`${metrics.callTime.audioSec}s`}
      key="audio"
    />,
    <StatsCard
      title="👤 Mensagens por Autor"
      /* exibe "Autor (count)" do mais ativo */
      value={
        <div>
          {Object.entries(metrics.authorCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([author, count]) => (
              <div key={author}>{author} ({count})</div>
            ))}
        </div>
      }
      key="author"
    />,
    <StatsCard
      title="📆 Média de mensagens por Dia e Total"     
      /* mapeia número do dia para nome */
      value={
        <div>
          {metrics.avgPerDay.map((w) => `${w.weekdayName} (${w.avg.toFixed(0)})`).join(', ')}
          <br />
          {metrics.totalPerDay.map((w) => `${w.weekdayName} (${w.avg.toFixed(0)})`).join(', ')}
        </div>
      }
      key="weekday"
    />,
    <StatsCard
      title="📝 Top Palavras"
      /* mostra as topWords como lista de "word (count)" */
      value={
        
        <div>
          {metrics.topWords.slice(0,10).map((w) => (
            <div key={w.word}>{w.word} ({w.count})</div>
          ))}
        </div>
      }
      key="words"
    />,
  ];

  return <ChatNavigator items={items} />;
};
