# 🛡️ Security Hub Lite - React

> Modern admin dashboard built with React 19, TypeScript, and TanStack Query showcasing best practices and modern patterns.

**🌐 Live Demo:** [security-hub-lite-react.zambon.dev](https://security-hub-lite-react.zambon.dev/)

---

## 🎯 Overview

A lightweight security management dashboard demonstrating practical implementation of modern React concepts including server state management, TypeScript type safety, and component composition patterns.

---

## 🚀 Tech Stack

- **React 19** - Latest features and concurrent rendering
- **TypeScript** - Full type safety and IntelliSense
- **TanStack Query (React Query)** - Server state management with intelligent caching
- **React Router v7** - Type-safe routing with nested layouts
- **Tailwind CSS v4** - Utility-first styling with dark mode
- **Vite** - Lightning-fast dev server and build tool

---

## ✨ Key Concepts Demonstrated

### **1. Server State Management**
```typescript
// Smart caching, automatic refetching, loading states
const { data, isLoading, isFetching } = useQuery({
  queryKey: ['applications'],
  queryFn: fetchApplications,
  staleTime: 5 * 60 * 1000, // 5min cache
});
```

### **2. Custom Hooks Pattern**
```typescript
// Reusable business logic separated from UI
export function useApplications(): EntityList<Application> {
  // Filtering, selection, and data transformation
  return { items, selectedItem, filter, setFilter };
}
```

### **3. Component Composition**
```typescript
// Flexible, reusable components with render props
<ListGrid columns={columns} useEntityList={hook}>
  <CustomButton />
</ListGrid>
```

### **4. Type-Safe Architecture**
- Generic types for reusable components (`EntityList<T>`)
- Discriminated unions for routing
- Strict TypeScript configuration

---

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom hooks for business logic
│   └── entities/   # Domain-specific hooks (applications, roles, users)
├── pages/          # Route components (list + detail views)
├── services/       # API layer (mock data)
├── lib/            # Query client config and utilities
└── types/          # Shared TypeScript definitions
```

---

## 🎨 Features

✅ **Dark/Light Theme** - Persistent theme switching with Tailwind  
✅ **Smart Data Fetching** - Automatic caching, deduplication, and background updates  
✅ **Optimistic Updates** - Instant UI feedback with automatic rollback on errors  
✅ **Row Selection** - Global state management without URL pollution  
✅ **Responsive Design** - Mobile-first approach with Tailwind  
✅ **Loading States** - Skeleton screens and spinner animations  

---

## 🏃 Quick Start

```bash
cd security-hub-react
npm install
npm run dev
```

Visit `http://localhost:5173`

---

## 🧪 Learning Highlights

This project demonstrates real-world patterns for:

- **Separating concerns** - Business logic in hooks, UI in components
- **Performance optimization** - Memoization, query deduplication, lazy loading
- **Developer experience** - TypeScript autocomplete, ESLint, hot reload
- **Scalability** - Modular architecture ready for growth

---

## 📝 License

MIT © [Ricardo Zambon](https://github.com/RicardoZambon)