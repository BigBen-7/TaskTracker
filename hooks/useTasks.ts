import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { FilterType, Task } from "../types";

const STORAGE_KEY = "@task_tracker_tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from AsyncStorage on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        await AsyncStorage.clear(); // 👈 TEMP: remove this line after one run
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setTasks(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Failed to load tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, []);

  // Persist tasks whenever they change
  const persistTasks = useCallback(async (updatedTasks: Task[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  }, []);

  const addTask = useCallback(
    (title: string) => {
      const trimmed = title.trim();
      if (!trimmed) return false; // Prevent empty tasks

      const newTask: Task = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        title: trimmed,
        completed: false,
        createdAt: Date.now(),
      };

      const updated = [newTask, ...tasks];
      setTasks(updated);
      persistTasks(updated);
      return true;
    },
    [tasks, persistTasks],
  );

  const toggleTask = useCallback(
    (id: string) => {
      const updated = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      );
      setTasks(updated);
      persistTasks(updated);
    },
    [tasks, persistTasks],
  );

  const deleteTask = useCallback(
    (id: string) => {
      const updated = tasks.filter((task) => task.id !== id);
      setTasks(updated);
      persistTasks(updated);
    },
    [tasks, persistTasks],
  );

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    isLoading,
    counts,
  };
}
