export interface TaskIntf {
  id: number;
  board_id: number;
  title: string;
  description?: string;
  status: string;
}

export interface SubtaskIntf {
  id: number;
  task_id: number;
  title: string;
  is_completed: boolean;
}