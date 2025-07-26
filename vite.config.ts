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
        hooks: path.resolve(__dirname, 'src/hooks/index.ts'),
        lib: path.resolve(__dirname, 'src/lib/index.ts'),
      },
      name: 'valkoma-package',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'esm' : 'cjs'}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
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
          'react/jsx-runtime': 'jsxRuntime',
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
    cssCodeSplit: false,
  },
  assetsInclude: ['src/index.css'],
  css: {
    postcss: './postcss.config.js',
  },
});