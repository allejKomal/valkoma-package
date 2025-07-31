# My Component Library

`valkoma-package` is a modular, type-safe React component library built with TypeScript and Vite, featuring a comprehensive set of UI components from shadcn/ui and many custom primitives. The library is designed for easy integration into React projects, with components organized into two main modules: `primitive` (containing all shadcn/ui and custom components) and `design-system` (reserved for custom components). It leverages Tailwind CSS for styling, ensuring customizable and responsive UI elements.

## Purpose

This library provides a collection of reusable, accessible, and customizable UI components for building modern web applications. It includes all shadcn/ui components (e.g., Button, Card, Accordion, Sidebar) and many additional primitives under the `primitive` module, making it ideal for developers who want a robust set of UI building blocks with TypeScript support and Tailwind CSS styling.

## Features

- **Comprehensive shadcn/ui Components**: Includes all shadcn/ui components such as Accordion, Button, Card, Dialog, Sidebar, and more, accessible via `valkoma-package/primitive`.
- **Additional Primitives**: Includes custom components like Pagination, Carousel, Chart, Resizable, InputOTP, ToggleGroup, Sonner (Toaster), and more.
- **Modular Imports**: Supports structured imports for `primitive` (shadcn/ui and custom components) and `design-system` (future custom components).
- **TypeScript Support**: Fully type-safe with generated type definitions for seamless integration in TypeScript projects.
- **Tailwind CSS Styling**: Uses Tailwind CSS with the `tailwindcss-animate` plugin for responsive and animated components.
- **Dual Module Formats**: Provides both ES Modules and CommonJS formats for broad compatibility.
- **Lightweight and Performant**: Built with Vite for optimized builds and minimal bundle size.

## Installation

Install the library via npm:

```bash
npm install valkoma-package
```

Replace `valkoma-package` with the actual package name published on npm.

## Setup

This library relies on **Tailwind CSS** for styling. You must configure Tailwind CSS in your project to use the components correctly.

### 1. Install Tailwind CSS and Dependencies
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
    "./node_modules/valkoma-package/**/*.{js,ts,jsx,tsx}",
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
Create or update your main CSS file (e.g., `src/index.css`) with Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Import Library CSS
In your main application file (e.g., `src/main.tsx`), import the library's CSS:

```tsx
import 'valkoma-package/src/index.css';
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

Import components from the `primitive` module to use shadcn/ui components. The `design-system` module is currently a placeholder for future custom components.

### Example

```tsx
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Pagination,
  Carousel,
  ChartContainer,
  ResizablePanelGroup,
  InputOTP,
  ToggleGroup,
  Toaster,
} from 'valkoma-package/primitive';

function App() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Dashboard</SidebarMenuButton>
            </SidebarMenuItem>
            {/* ...other menu items */}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Sample Card</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="default">Click Me</Button>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Details</AccordionTrigger>
                <AccordionContent>Content goes here.</AccordionContent>
              </AccordionItem>
            </Accordion>
            <Pagination />
            <Carousel />
            <ChartContainer config={{}}>{/* ... */}</ChartContainer>
            <ResizablePanelGroup>{/* ... */}</ResizablePanelGroup>
            <InputOTP />
            <ToggleGroup />
            <Toaster />
          </CardContent>
        </Card>
      </div>
    </SidebarProvider>
  );
}

export default App;
```

### Available Components
The `primitive` module includes the following shadcn/ui components:

* Accordion
* Alert
* Alert Dialog
* Aspect Ratio
* Avatar
* Badge
* Button
* Calendar
* Card
* Checkbox
* Collapsible
* Command
* Context Menu
* Dialog
* Dropdown Menu
* Form
* Hover Card
* Input
* Label
* Menubar
* Navigation Menu
* Popover
* Progress
* Radio Group
* Scroll Area
* Select
* Separator
* Sheet
* Skeleton
* Slider
* Switch
* Table
* Tabs
* Textarea
* Toast
* Toggle
* Tooltip
* Toaster

#### **Sidebar (with all related subcomponents)**

* `SidebarProvider`
* `Sidebar`
* `SidebarContent`
* `SidebarHeader`
* `SidebarFooter`
* `SidebarMenu`
* `SidebarMenuItem`
* `SidebarMenuButton`
* `SidebarTrigger`
* `SidebarRail`
* `SidebarInset`
* `SidebarInput`
* `SidebarSeparator`
* `SidebarGroup`
* `SidebarGroupLabel`
* `SidebarGroupAction`
* `SidebarGroupContent`
* `SidebarMenuAction`
* `SidebarMenuBadge`
* `SidebarMenuSkeleton`
* `SidebarMenuSub`
* `SidebarMenuSubItem`
* `SidebarMenuSubButton`

#### **Pagination**

* `Pagination`
* `PaginationContent`
* `PaginationItem`
* `PaginationLink`
* `PaginationPrevious`
* `PaginationNext`
* `PaginationEllipsis`

#### **Carousel**

* `Carousel`
* `CarouselContent`
* `CarouselItem`
* `CarouselPrevious`
* `CarouselNext`

#### **Chart**

* `ChartContainer`
* `ChartTooltip`
* `ChartTooltipContent`
* `ChartLegend`
* `ChartLegendContent`

#### **Resizable**

* `ResizablePanelGroup`
* `ResizablePanel`
* `ResizableHandle`

#### **Input OTP**

* `InputOTP`
* `InputOTPGroup`
* `InputOTPSlot`
* `InputOTPSeparator`

#### **Toggle Group**

* `ToggleGroup`
* `ToggleGroupItem`



Each component can be imported from valkoma-package/primitive`, e.g., `import { Button } from 'valkoma-package/primitive'`.

### Utility Functions
The library includes a utility function `cn` for class name merging, available via:

```tsx
import { cn } from 'valkoma-package';

const className = cn('text-center', 'bg-blue-500', 'p-4');
```

### Hooks

The package also provides several useful React hooks:

- `useIsMobile` – Detects if the current screen is mobile-sized.
- `useSessionStorage` – Syncs state with `sessionStorage`.
- `useLocalStorage` – Syncs state with `localStorage`.
- `useCopyToClipboard` – Copies text to clipboard and tracks copy state.
- `useToast` – Toast notification hook.
- `useThemeProvider` – Theme context/provider.

Example usage:

```tsx
import { useIsMobile, useSessionStorage, useLocalStorage, useCopyToClipboard } from 'valkoma-package/hooks';

const isMobile = useIsMobile();
const [value, setValue] = useSessionStorage('key', 'default');
const [localValue, setLocalValue] = useLocalStorage('key', 'default');
const { isCopied, copy } = useCopyToClipboard();
```

## Requirements

- **Node.js**: v16 or higher
- **React**: v17 or v18
- **TypeScript**: v5 or higher (optional, for type-safe projects)
- **Tailwind CSS**: v3.3 or higher
- **Peer Dependencies**:
  - `react`
  - `react-dom`
  - `@radix-ui/react-slot`
  - `class-variance-authority`
  - `lucide-react`
  - `tailwindcss`
  - `tailwindcss-animate`

## Troubleshooting

### Tailwind CSS Issues
If components do not render with correct styles:
- Ensure `tailwind.config.js` includes the library's paths.
- Verify that `src/index.css` from the library is imported in your app.
- Check that `tailwindcss-animate` is installed and included in `tailwind.config.js`.

### Missing Peer Dependencies
If you encounter errors about missing dependencies, install them:

```bash
npm install react react-dom @radix-ui/react-slot class-variance-authority lucide-react tailwindcss tailwindcss-animate
```

## License

This project is licensed under the MIT License.