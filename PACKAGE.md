# My Component Library

A React TypeScript component library built with Vite, featuring shadcn/ui components for reusable UI elements. This library supports modular imports such as `@your-scope/my-component-library/primitive` for shadcn/ui components and `@your-scope/my-component-library/design-system` for custom components.

## Features

- Built with **React**, **TypeScript**, and **Vite** for fast development and builds.
- Includes all **shadcn/ui** components (e.g., Button, Card, Accordion, etc.) in the `primitive` module.
- Supports Tailwind CSS for styling, with a customizable configuration.
- Modular exports for easy imports (e.g., `@your-scope/my-component-library/primitive/button`).
- Type-safe with TypeScript and includes generated type definitions.
- CommonJS and ES Module formats for broad compatibility.

## Installation

To use this library in your project, install it via npm:

```bash
npm install @your-scope/my-component-library
```

Replace `@your-scope/my-component-library` with the actual package name published on npm.

## Setup

This library uses **Tailwind CSS** for styling. You must configure Tailwind CSS in your project to use the components correctly.

### 1. Install Tailwind CSS
Run the following commands in your project:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Configure `tailwind.config.js`
Update your `tailwind.config.js` to include the library's components:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@your-scope/my-component-library/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
};
```

Install the `tailwindcss-animate` plugin:

```bash
npm install tailwindcss-animate
```

### 3. Set Up Global CSS
Create or update `src/index.css` (or your main CSS file) with Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Import Library CSS
In your main application file (e.g., `src/main.tsx`), import the library's CSS:

```tsx
import '@your-scope/my-component-library/src/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### 5. Install Peer Dependencies
Ensure the following peer dependencies are installed in your project:

```bash
npm install react react-dom @radix-ui/react-slot class-variance-authority lucide-react tailwindcss tailwindcss-animate
```

## Usage

Import components from the `primitive` module for shadcn/ui components or the `design-system` module for custom components.

### Example

```tsx
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@your-scope/my-component-library/primitive';

function App() {
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Example Card</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Click Me</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
```

### Available Components
The `primitive` module includes the following shadcn/ui components:

- Accordion
- Alert
- Alert Dialog
- Aspect Ratio
- Avatar
- Badge
- Button
- Calendar
- Card
- Checkbox
- Collapsible
- Command
- Context Menu
- Dialog
- Dropdown Menu
- Form
- Hover Card
- Input
- Label
- Menubar
- Navigation Menu
- Popover
- Progress
- Radio Group
- Scroll Area
- Select
- Separator
- Sheet
- Skeleton
- Slider
- Switch
- Table
- Tabs
- Textarea
- Toast
- Toggle
- Tooltip

Each component can be imported from `@your-scope/my-component-library/primitive`, e.g., `import { Button } from '@your-scope/my-component-library/primitive'`.

## Development Setup

For contributors or maintainers, follow these steps to set up the development environment.

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### 1. Clone the Repository
If hosted on GitHub or another version control system:

```bash
git clone <repository-url>
cd my-component-library
```

### 2. Install Dependencies
Install all dependencies listed in `package.json`:

```bash
npm install
```

### 3. Project Structure
The project is organized as follows:

```
my-component-library/
├── src/
│   ├── primitive/
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── ... (other shadcn/ui components)
│   │   ├── index.ts
│   ├── design-system/
│   │   ├── index.ts
│   ├── utils.ts
│   ├── index.ts
│   ├── index.css
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── components.json
├── .eslintrc.json
├── .prettierrc
├── README.md
```

### 4. Key Commands
- **Build the library**:
  ```bash
  npm run build
  ```
  Generates the `dist` folder with ES modules, CommonJS modules, and type definitions.

- **Run development server** (for testing components locally):
  ```bash
  npm run dev
  ```

- **Run tests** (if tests are set up):
  ```bash
  npm run test
  ```

- **Lint the codebase**:
  ```bash
  npm run lint
  ```

- **Format the codebase**:
  ```bash
  npm run format
  ```

### 5. Adding New shadcn/ui Components
To add new shadcn/ui components to the `primitive` folder:

```bash
npx shadcn@latest add <component-name>
```

For example:

```bash
npx shadcn@latest add button
```

Update `src/primitive/index.ts` to export the new component:

```ts
export * from './<component-name>';
```

### 6. Local Testing with `npm link`
To test the library locally in another project:

1. In the library folder:
   ```bash
   npm run build
   npm link
   ```

2. Create a test React project:
   ```bash
   npx create-vite@latest test-app --template react-ts
   cd test-app
   npm install
   npm link @your-scope/my-component-library
   ```

3. Set up Tailwind CSS in the test project:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

4. Update `test-app/tailwind.config.js`:
   ```js
   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
       "./node_modules/@your-scope/my-component-library/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [require("tailwindcss-animate")],
   };
   ```

5. Update `test-app/src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

6. Import the library's CSS in `test-app/src/main.tsx`:
   ```tsx
   import '@your-scope/my-component-library/src/index.css';
   import React from 'react';
   import ReactDOM from 'react-dom/client';
   import App from './App.tsx';

   ReactDOM.createRoot(document.getElementById('root')!).render(
     <React.StrictMode>
       <App />
     </React.StrictMode>,
   );
   ```

7. Use components in `test-app/src/App.tsx`:
   ```tsx
   import { Button, Card, CardContent, CardHeader, CardTitle } from '@your-scope/my-component-library/primitive';

   function App() {
     return (
       <div className="p-4">
         <Card>
           <CardHeader>
             <CardTitle>Test Card</CardTitle>
           </CardHeader>
           <CardContent>
             <Button>Click Me</Button>
           </CardContent>
         </Card>
       </div>
     );
   }

   export default App;
   ```

8. Run the test app:
   ```bash
   npm run dev
   ```

## Publishing to npm

To publish the library to npm, follow these steps:

### 1. Prepare the Package
- Ensure the `files` field in `package.json` includes:
  ```json
  "files": ["dist", "src/index.css"]
  ```
- Verify that `package.json` includes all necessary dependencies and peer dependencies:
  ```json
  {
    "peerDependencies": {
      "react": "^17.0.0 || ^18.0.0",
      "react-dom": "^17.0.0 || ^18.0.0",
      "@radix-ui/react-slot": "^1.0.0",
      "class-variance-authority": "^0.7.0",
      "lucide-react": "^0.263.0",
      "tailwindcss": "^3.3.0",
      "tailwindcss-animate": "^1.0.7"
    },
    "dependencies": {
      "@radix-ui/react-slot": "^1.0.0",
      "class-variance-authority": "^0.7.0",
      "lucide-react": "^0.263.0",
      "tailwindcss-animate": "^1.0.7",
      "clsx": "^2.0.0",
      "tailwind-merge": "^2.0.0"
    }
  }
  ```

### 2. Log in to npm
Log in to your npm account:

```bash
npm login
```

### 3. Build and Publish
Build the library and publish it:

```bash
npm run build
npm publish --access public
```

For scoped packages (e.g., `@your-scope/my-component-library`), ensure the scope is registered on npm.

### 4. Update Versions
For new releases, update the version in `package.json` using semantic versioning (`major.minor.patch`):

```bash
npm version patch
npm run build
npm publish
```

### 5. Private Packages
For private packages, add to `package.json`:

```json
"publishConfig": {
  "access": "restricted"
}
```

## Troubleshooting

### Tailwind CSS Configuration
If you encounter errors like `No Tailwind CSS configuration found`, ensure:
- `tailwind.config.js` and `postcss.config.js` are present and correctly configured.
- Tailwind dependencies are installed:
  ```bash
  npm install -D tailwindcss postcss autoprefixer
  ```

### shadcn/ui Initialization
If `npx shadcn@latest init` fails, verify:
- `src/index.css` contains Tailwind directives.
- `components.json` is correctly configured with the right paths.

Run the init command again:

```bash
npx shadcn@latest init
```

### Deprecated Dependencies
If you see warnings like `npm WARN deprecated node-domexception@1.0.0`, ignore them for now as they don’t affect functionality. Check the shadcn/ui GitHub for updates.

## Contributing

1. Fork the repository (if hosted on GitHub).
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Make changes and commit:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Create a pull request.

## License

This project is licensed under the MIT License.