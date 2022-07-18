import { defineStore } from 'pinia';
import { useDark } from '@vueuse/core';
import type { BoardIntf, SelectedBoardIntf, SubtaskIntf, TaskIntf } from '@/interfaces';
import { supabase } from '@/supabase';

interface KanbanState {
  isDark: any;
  boards: BoardIntf[];
  tasks: TaskIntf[];
  subtasks: SubtaskIntf[];
  selectedBoardId: number | null;
  isSidebarOpen: boolean;
}

export const useKanban = defineStore({
  id: 'kanban',
  state: (): KanbanState => ({
    isDark: useDark(),
    boards: [],
    tasks: [],
    subtasks: [],
    selectedBoardId: null,
    isSidebarOpen: false,
  }),
  getters: {
    selectedBoard(state): SelectedBoardIntf | null {
      if (this.selectedBoardId) {
        const boardDetails = state.boards.find(
          (b) => b.id === this.selectedBoardId
        )!;
        const boardTasks = state.tasks
          .filter((t) => t.board_id === this.selectedBoardId)
          .map((t) => ({
            ...t,
            subtasks: state.subtasks.filter((st) => st.task_id === t.id),
          }));

        return {
          id: boardDetails.id,
          name: boardDetails.name,
          tasks: boardTasks,
        };
      } else {
        return null;
      }
    },
    availableStatus() {
      if (this.selectedBoard) {
        return this.selectedBoard.tasks.reduce((acc, task) => {
          if (!acc.includes(task.status)) {
            acc.push(task.status)
          }
          return acc;
        }, []);
      } else {
        return [];
      }
    },
  },
  actions: {
    async fetchData() {
      const boardResponse: any = await supabase.from('board').select('*');
      this.boards = boardResponse.data;

      const taskResponse: any = await supabase.from('task').select('*');
      this.tasks = taskResponse.data;

      const subtaskResponse: any = await supabase.from('subtask').select('*');
      this.subtasks = subtaskResponse.data;

      if (this.boards.length) {
        this.selectedBoardId = this.boards[0].id;
      }
    },
  },
});
