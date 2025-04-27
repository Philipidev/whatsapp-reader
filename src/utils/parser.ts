// src/utils/parser.ts

import { parse } from 'date-fns';
import { Message } from '../types/chat';

/**
 * Regex para identificar o início de uma mensagem:
 *  [DD/MM/YYYY, HH:mm:ss] Autor: Conteúdo
 */
const lineRegex = /^\[?(\d{2}\/\d{2}\/\d{4}), (\d{2}:\d{2}:\d{2})\]? (.*?): (.*)$/;

/**
 * Converte o texto bruto da exportação do WhatsApp em um array de Message.
 * Suporta mensagens que quebram em múltiplas linhas, juntando-as ao conteúdo da mensagem anterior.
 */
export function parseChat(raw: string): Message[] {
  const lines = raw.split(/\r?\n/);
  const messages: Message[] = [];
  let currentMessage: Message | null = null;

  for (const line of lines) {
    const match = line.match(lineRegex);

    if (match) {
      // nova mensagem
      const [, dateStr, timeStr, author, content] = match;
      const date = parse(`${dateStr} ${timeStr}`, 'dd/MM/yyyy HH:mm:ss', new Date());

      currentMessage = { date, author, content };
      messages.push(currentMessage);
    } else if (currentMessage) {
      // linha de continuação: anexa ao conteúdo da última mensagem
      currentMessage.content += '\n' + line.trim();
    }
    // linhas que não batem e sem mensagem corrente são ignoradas
  }

  return messages;
}
