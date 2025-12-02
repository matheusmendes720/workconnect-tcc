import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, '../'),
  publicDir: resolve(__dirname, '../assets'),
  build: {
    outDir: resolve(__dirname, '../../../dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, '../app/core/routing/pages/IndexPage.html'),
        landing: resolve(__dirname, '../app/landing/pages/index.html'),
        dashboard: resolve(__dirname, '../app/modules/dashboard/pages/DashboardPage.html'),
        estoque: resolve(__dirname, '../app/modules/estoque/pages/EstoquePage.html'),
        vendas: resolve(__dirname, '../app/modules/vendas/pages/VendasPage.html'),
        financas: resolve(__dirname, '../app/modules/financas/pages/FinancasPage.html'),
        relatorios: resolve(__dirname, '../app/modules/relatorios/pages/RelatoriosPage.html'),
        configuracoes: resolve(__dirname, '../app/modules/configuracoes/pages/ConfiguracoesPage.html'),
        login: resolve(__dirname, '../app/core/auth/pages/LoginPage.html')
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../app'),
      '@shared': resolve(__dirname, '../app/shared'),
      '@core': resolve(__dirname, '../app/core'),
      '@assets': resolve(__dirname, '../assets'),
      '@modules': resolve(__dirname, '../app/modules')
    }
  },
  server: {
    port: 3000,
    open: true,
    cors: true
  }
});
