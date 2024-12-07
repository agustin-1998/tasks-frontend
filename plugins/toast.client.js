import { useToast } from 'vue-toastification';
import Toast from "vue-toastification";
import 'vue-toastification/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  const toast = useToast();
  nuxtApp.vueApp.provide('toast', toast);
  nuxtApp.provide('toast', toast);
  nuxtApp.vueApp.use(Toast);
});
