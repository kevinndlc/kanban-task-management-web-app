import type { SubtaskIntf } from "./Task.interface";

export interface BoardIntf {
  id: number;
  name: string;
}

export interface SelectedBoardIntf extends BoardIntf {
  tasks: {
    id: number;
    board_id: number;
    title: string;
    description?: string;
    status: string;
    subtasks: SubtaskIntf[]
  }[];
}