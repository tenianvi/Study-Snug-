export type Subject = 'Biology' | 'Chemistry' | 'Physics' | 'Math' | 'English';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  subject?: Subject;
}

export interface Note {
  id: string;
  subject: Subject;
  chapter: string;
  content: string;
  updatedAt: number;
}

export interface Resource {
  id: string;
  title: string;
  type: 'link' | 'pdf' | 'video' | 'article';
  url: string;
  category: string;
}

export interface DailyGoal {
  id: string;
  text: string;
  completed: boolean;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  earned: boolean;
}
