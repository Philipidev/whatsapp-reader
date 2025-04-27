// src/utils/metrics.ts

import LinkifyIt from "linkify-it";
import emojiRegex from "emoji-regex";
import { removeStopwords, porBr } from "stopword";
import { getDay } from "date-fns";
import {
  Message,
  EmojiCount,
  WordCount,
  CallTime,
  WeekdayAvg,
} from "../types/chat";

const linkify = new LinkifyIt();

/**
 * Conta todos os links nas mensagens.
 */
export function countLinks(msgs: Message[]): number {
  return msgs.reduce((total, { content }) => {
    const matches = linkify.match(content);
    return total + (matches ? matches.length : 0);
  }, 0);
}

/**
 * Conta somente links de música (e.g. Spotify).
 */
export function countMusicLinks(msgs: Message[]): number {
  return msgs.reduce((total, { content }) => {
    const matches = linkify.match(content);
    if (!matches) return total;
    const musicCount = matches.filter((m) =>
      m.url.includes("spotify.com/track")
    ).length;
    return total + musicCount;
  }, 0);
}

/**
 * Conta frequência de cada emoji nas mensagens.
 */
export function countEmojisByType(msgs: Message[]): EmojiCount {
  const counter: EmojiCount = {};
  const regex = emojiRegex();

  for (const { content } of msgs) {
    let match: RegExpExecArray | null;
    while ((match = regex.exec(content))) {
      const emoji = match[0];
      counter[emoji] = (counter[emoji] || 0) + 1;
    }
  }

  return counter;
}

/**
 * Retorna as top N palavras mais usadas (sem stopwords).
 */
export function topWords(msgs: Message[], topN = 20): WordCount[] {
  const freq: Record<string, number> = {};
  const arrayPalavrasIgnorar = [
    "figurinha",
    "omitida",
    "imagem",
    "ocultada",
    "ocultado",
    'minutos',
    'omitido',
    'ligação'
  ];
  for (const { content } of msgs) {
    // Preserve accented letters by matching letters (incl. accents) and digits
    const tokens = content.toLowerCase().match(/[A-Za-zÀ-ÖØ-öø-ÿ0-9_]+/g) || [];
    const filtered = removeStopwords(tokens, porBr).filter(
      (word) => word.length > 3 && !arrayPalavrasIgnorar.includes(word)
    );
    filtered.forEach((word) => {
      freq[word] = (freq[word] || 0) + 1;
    });
  }

  return Object.entries(freq)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);
}

/**
 * Soma o tempo de ligações de vídeo e de voz em segundos.
 * Procura por "Ligação de vídeo. X minuto(s)" e "Ligação de voz. Y segundo(s)".
 */
export function totalCallTime(msgs: Message[]): CallTime {
  let videoSec = 0;
  let audioSec = 0;
  const videoRegex = /Ligação de vídeo\.\s*(\d+)\s*minuto/;
  const audioRegex = /Ligação de voz\.\s*(\d+)\s*segund/;

  for (const { content } of msgs) {
    const vMatch = content.match(videoRegex);
    if (vMatch) {
      videoSec += parseInt(vMatch[1], 10) * 60;
    }
    const aMatch = content.match(audioRegex);
    if (aMatch) {
      audioSec += parseInt(aMatch[1], 10);
    }
  }

  return { videoSec, audioSec };
}

/**
 * Conta quantas mensagens cada autor enviou.
 */
export function countByAuthor(msgs: Message[]): Record<string, number> {
  return msgs.reduce<Record<string, number>>((acc, { author }) => {
    acc[author] = (acc[author] || 0) + 1;
    return acc;
  }, {});
}

/**
 * Calcula a média de mensagens por ocorrência para cada dia da semana
 * e retorna o dia de maior média.
 */
export function avgMessagesByWeekday(msgs: Message[]): {
  busiest: WeekdayAvg;
  avgPerDay: WeekdayAvg[];
  totalPerDay: WeekdayAvg[];
} {
  // contas totais por dia (0=Domingo … 6=Sábado)
  const totalByDay: Record<number, number> = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };
  // dias distintos em que houveram mensagens, por dia da semana
  const daysSet: Record<number, Set<string>> = {
    0: new Set(),
    1: new Set(),
    2: new Set(),
    3: new Set(),
    4: new Set(),
    5: new Set(),
    6: new Set(),
  };

  msgs.forEach(({ date }) => {
    const weekday = getDay(date);
    totalByDay[weekday]++;
    daysSet[weekday].add(date.toDateString());
  });

  // calcula médias e identifica o dia com maior média
  let busiest: WeekdayAvg = { day: 0, avg: 0, weekdayName: "" };
  const avgPerDay: WeekdayAvg[] = [];
  const totalPerDay: WeekdayAvg[] = [];
  for (let day = 0; day < 7; day++) {
    const occurrences = daysSet[day].size || 1;
    const avg = totalByDay[day] / occurrences;
    const weekdayName = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][day];
    if (avg > busiest.avg) {
      busiest = { day, avg, weekdayName };
    }
    avgPerDay.push({ day, avg, weekdayName });
    totalPerDay.push({ day, avg: totalByDay[day], weekdayName });
  }

  return { busiest, avgPerDay, totalPerDay };
}
