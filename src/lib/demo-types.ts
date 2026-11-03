export interface DemoMessage {
  role: "user" | "assistant";
  content: string;
}

export interface DemoSnapshot {
  symptoms: string[];
  timeline: string;
  history: string;
  discuss: string[];
  specialty: string;
  summary: string;
}

export type DemoReply =
  | { type: "question"; text: string; options: string[]; understood: string[]; consult: boolean }
  | { type: "snapshot"; text: string; snapshot: DemoSnapshot }
  | { type: "emergency"; text: string }
  | { type: "off_topic"; text: string };

export const DEMO_LIMITS = {
  freeChats: 10,
  messageChars: 500,
  messages: 14,
  userTurnsBeforeSnapshot: 6
};
