import type { ReactNode } from 'react';
import type { AgentTypeMap, MessageTypeMap, AssistantModeMap, TabMap } from '../store/maps';

export type AgentType = typeof AgentTypeMap[keyof typeof AgentTypeMap];
export type MessageType = typeof MessageTypeMap[keyof typeof MessageTypeMap];
export type AssistantMode = typeof AssistantModeMap[keyof typeof AssistantModeMap];
export type Tab = typeof TabMap[keyof typeof TabMap];

export interface AssistantMessage {
  id: string;
  type: MessageType;
  content: string;
  timestamp: number;
  agentType: AgentType;
}

export interface ContentBrief {
  objective: string;
  targetAudience: string[];
  keyPoints: string[];
  tone: string[];
  keywords: string[];
  desiredOutcome: string;
  lastUpdated: number;
}

export interface Alternative {
  id: string;
  content: string;
  type: 'hook';
}

export interface StickyNote {
  id: string;
  content: string;
  color: string;
  position: { x: number; y: number };
  isApproved?: boolean;
  group?: string;
  preview?: string;
  isSelected?: boolean;
}

export interface NoteCluster {
  id: string;
  title: string;
  notes: StickyNote[];
}

export interface NotepadItem {
  id: string;
  content: string;
  group: string;
  isSelected: boolean;
}

export interface PostConcept {
  id: string;
  hook: string;
  description: string;
  approved: boolean;
  thoughtProcess?: string;
  expandedContent?: string;
  origin?: 'ideas';
  sourceId?: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  url: string;
  thumbnail?: string;
}

export interface ComponentBaseProps {
  children?: ReactNode;
  className?: string;
}