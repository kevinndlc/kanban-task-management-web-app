import { defineStore } from 'pinia';
import { useDark } from '@vueuse/core';
import data from '@/assets/data.json';
import type { BoardIntf } from '@/interfaces';

interface KanbanState {
  isDark: any;
  boards: BoardIntf[];
  selectedBoard: BoardIntf | null;
  isSidebarOpen: boolean;
}

export const useKanban = defineStore({
  id: 'kanban',
  state: (): KanbanState => ({
    isDark: useDark(),
    boards: [],
    selectedBoard: null,
    isSidebarOpen: false,
  }),
  getters: {
    availableStatus(state) {
      if (state.selectedBoard) {
        return state.selectedBoard?.columns.reduce((acc: any, curr) => {
          acc.push(curr.name);
          return acc;
        }, []);
      } else {
        return [];
      }
    },
  },
  actions: {
    fetchData() {
      this.boards = data.boards;

      if (this.boards.length) {
        this.selectedBoard = this.boards[0];
      }
    },
  },
});
