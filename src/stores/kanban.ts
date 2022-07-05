import { defineStore } from 'pinia'
import data from '@/assets/data.json';
import type { BoardIntf } from '@/interfaces';

interface KanbanState {
  boards: BoardIntf[];
  selectedBoard: BoardIntf | null;
  isMobileMenuOpen: boolean;
}

export const useKanban = defineStore({
  id: 'kanban',
  state: (): KanbanState => ({
    boards: [],
    selectedBoard: null,
    isMobileMenuOpen: false
  }),
  getters: {},
  actions: {
    fetchData() {
      this.boards = data.boards;

      if (this.boards.length) {
        this.selectedBoard = this.boards[0];
      }
    },
  },
});
