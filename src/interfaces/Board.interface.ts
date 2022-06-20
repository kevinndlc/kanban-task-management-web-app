export interface BoardIntf {
  name: string;
  columns: BoardColumnIntf[];
}

export interface BoardColumnIntf {
  name: string;
  tasks: TaskIntf[];
}

export interface TaskIntf {
  title: string;
  description: string;
  status?: TaskStatus;
  subtasks: SubtaskIntf[];
}

export interface SubtaskIntf {
  title: string;
  isCompleted: boolean;
}

type TaskStatus = 'Todo' | 'Doing' | 'Done'