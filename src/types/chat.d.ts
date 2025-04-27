// src/types/chat.d.ts

/** Uma única mensagem extraída do .txt */
export interface Message {
    /** Data e hora do envio */
    date: Date;
    /** Nome do autor da mensagem */
    author: string;
    /** Conteúdo textual da mensagem */
    content: string;
  }
  
  /** Contagem de emojis, indexado pelo próprio emoji */
  export interface EmojiCount {
    [emoji: string]: number;
  }
  
  /** Palavra e sua frequência */
  export interface WordCount {
    word: string;
    count: number;
  }
  
  /** Tempo total de chamadas em segundos */
  export interface CallTime {
    /** Tempo total de ligações de vídeo, em segundos */
    videoSec: number;
    /** Tempo total de ligações de voz, em segundos */
    audioSec: number;
  }
  
  /** Média de mensagens por dia da semana */
  export interface WeekdayAvg {
    /** Dia da semana (0=Domingo … 6=Sábado) */
    day: number;
    /** Nome do dia da semana */
    weekdayName: string;
    /** Média de mensagens por ocorrência desse dia */
    avg: number;
  }
  
  /** Métricas agregadas do chat */
  export interface Metrics {
    /** Quantidade total de links */
    links: number;
    /** Quantidade total de links de música (e.g. Spotify) */
    musicLinks: number;
    /** Quantidade de cada emoji */
    emojis: EmojiCount;
    /** Lista das palavras mais usadas */
    topWords: WordCount[];
    /** Tempo total gasto em chamadas */
    callTime: CallTime;
    /** Quantidade de mensagens por autor */
    authorCounts: Record<string, number>;
    /** Dia da semana com a maior média de mensagens */
    busiestWeekday: WeekdayAvg;
    /** Média de mensagens por dia da semana */
    avgPerDay: WeekdayAvg[];
    /** Quantidade total de mensagens por dia da semana */
    totalPerDay: WeekdayAvg[];
  }
  
  /** Dados completos do chat, prontos para consumo na UI */
  export interface ChatData {
    messages: Message[];
    metrics: Metrics;
  }
  