import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// base: './' — сайт живёт в подпапке (/Salary-calculator-/ на GitHub Pages),
// с абсолютными путями ассеты не находятся и страница остаётся пустой.
export default defineConfig({base:'./',plugins:[react()],server:{port:5173,strictPort:true}});
