# Task Tracker

A clean, minimal task management app built with React Native, Expo, and TypeScript.

Dark theme mobile app with amber accent

---

## Setup

```bash
npm install
npx expo start
```

Then scan the QR code with the **Expo Go** app (iOS or Android), or press `a` for Android emulator / `i` for iOS simulator.

> Requires Node.js 18+ and the Expo Go app on your device.

---


---

## Libraries Used

| Library | Why |
|---|---|
| `@react-native-async-storage/async-storage` | The standard, well-maintained solution for local key-value persistence in React Native. Straightforward API, works seamlessly with Expo. |
| `@expo-google-fonts/dm-sans` | DM Sans gives the UI a clean, modern feel without defaulting to system fonts. The Expo Google Fonts package handles loading and caching cleanly. |

No state management library was added — the app's complexity doesn't warrant it. A single `useTasks` custom hook handles all task logic and AsyncStorage writes, keeping `App.tsx` focused purely on rendering.

---

## Project Structure

```
task-tracker/
├── App.tsx                    # Root component, layout
├── src/
│   ├── types/index.ts         # Shared TypeScript interfaces
│   ├── constants/theme.ts     # Design tokens (colors, spacing, typography)
│   ├── hooks/useTasks.ts      # All task logic + persistence
│   └── components/
│       ├── TaskInput.tsx      # Input field with validation + shake feedback
│       ├── TaskItem.tsx       # Individual task row with toggle + delete
│       ├── FilterBar.tsx      # All / Active / Done filter pills
│       └── EmptyState.tsx     # Context-aware empty state messages
```

---

## What I'd Improve With More Time

- **Swipe-to-delete** using `react-native-gesture-handler` for a more native feel
- **Drag-to-reorder** tasks with `react-native-draggable-flatlist`
- **Edit task title** inline with a long-press gesture
- **Due dates** with a date picker and overdue highlighting
- **Haptic feedback** on task completion using `expo-haptics`
- **Animated list transitions** when tasks are added or removed (using `LayoutAnimation`)
- **Unit tests** for the `useTasks` hook with Jest + React Native Testing Library
