// src/hooks/useChatData.ts

import { useMemo } from 'react';
import { parseChat } from '../utils/parser';
import {
  countLinks,
  countMusicLinks,
  countEmojisByType,
  topWords,
  totalCallTime,
  countByAuthor,
  avgMessagesByWeekday
} from '../utils/metrics';
import { ChatData } from '../types/chat';

/**
 * Hook que recebe o texto bruto da exportação (.txt)
 * e retorna as mensagens parseadas + todas as métricas calculadas.
 */
export function useChatData(raw: string): ChatData {
  // Parse apenas quando raw muda
  const messages = useMemo(() => parseChat(raw), [raw]);

  // Recalcula métricas sempre que as mensagens mudam
  const metrics = useMemo(() => ({
    links: countLinks(messages),
    musicLinks: countMusicLinks(messages),
    emojis: countEmojisByType(messages),
    topWords: topWords(messages),
    callTime: totalCallTime(messages),
    authorCounts: countByAuthor(messages),
    busiestWeekday: avgMessagesByWeekday(messages).busiest,
    avgPerDay: avgMessagesByWeekday(messages).avgPerDay,
    totalPerDay: avgMessagesByWeekday(messages).totalPerDay,
  }), [messages]);

  return { messages, metrics };
}
