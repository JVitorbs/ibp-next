import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/test/**',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.d.ts',
        'src/components/ui/**',
        'src/app/**/_{*}*',
        'src/app/layout.tsx',
        'src/app/globals.css',
        'src/app/page.tsx',
        'src/app/pg/page.tsx',
        'src/app/instituto-biblico/page.tsx',
        'src/app/diretoria/page.tsx',
        'src/app/galeria/page.tsx',
        'next-env.d.ts',
        'global.d.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
