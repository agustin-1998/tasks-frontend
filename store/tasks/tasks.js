// stores/tasksStore.js
import { defineStore } from 'pinia';
import { useAuthStore } from '~/store/auth/auth';
import { apiCall } from '~/utils/api';
import { truncateText } from '~/utils/truncateText';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: []
  }),

  getters: {
    userToken() {
      const authStore = useAuthStore();
      return authStore.token ?? localStorage.getItem('auth_token');
    }
  },

  actions: {
    async getTasks() {
      try {
        const response = await apiCall({
          route: 'tasks',
          method: 'GET',
          token: this.userToken
        });
        this.tasks = response.data.map(task => ({
          ...task,
          title_truncated: truncateText(task.title, 80)
        }));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },

    async createTask({title, description, status, due_date}) {
      const data = {
        title,
        description,
        status,
        due_date
      }
      console.log(data);
      try {
        const response = await apiCall({
          route: 'tasks',
          method: 'POST',
          data: JSON.stringify(data),
          token: this.userToken
        });
        this.tasks = [...this.tasks, response.data]
      } catch (error) {
        console.log(error)
      }
    },

    async deleteTask({ id }) {
      try {
        await apiCall({
          route: `tasks/${id}`,
          method: 'DELETE',
          data: {
            id
          },
          token: this.userToken
        });
      } catch (error) {
        console.log(error)
      }
    }
  },
  persist: true
});
