export enum Discipline {
  MMA = 'MMA',
  HandToHandCombat = 'Рукопашный бой',
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
  discipline: Discipline;
  maxParticipants: number;
  startDate: string | Date;
  posterImage?: string;
}

// Объект для сопоставления дисциплин с иконками SVG
export const disciplineIcons: Record<Discipline, string> = {
  [Discipline.MMA]: 'assets/icons/mma.svg',
  [Discipline.HandToHandCombat]: 'assets/icons/h2h.svg',
};
