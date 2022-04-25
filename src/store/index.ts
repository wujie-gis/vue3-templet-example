import { createPinia } from 'pinia';
import { useCountStore } from './modules/count';
import { useMapToolsStore } from './modules/mapToolsStore';
const store = createPinia();

export default store;
export { useCountStore, useMapToolsStore };
