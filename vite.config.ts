import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      outputDir: 'dist',
    }),
  ],
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        primitive: path.resolve(__dirname, 'src/primitive/index.ts'),
        'design-system': path.resolve(__dirname, 'src/design-system/index.ts'),
      },
      name: 'MyComponentLibrary',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'esm' : 'cjs'}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@radix-ui/react-slot',
        'class-variance-authority',
        'lucide-react',
        'tailwindcss',
        'tailwindcss-animate',
        'clsx',
        'tailwind-merge',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@radix-ui/react-slot': 'RadixSlot',
          'class-variance-authority': 'cva',
          'lucide-react': 'LucideReact',
          'clsx': 'Clsx',
          'tailwind-merge': 'TailwindMerge',
        },
      },
    },
    sourcemap: true,
    outDir: 'dist',
  },
  css: {
    postcss: './postcss.config.js',
  },
});