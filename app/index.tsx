import { EmptyState } from "@/components/EmptyState";
import { FilterBar } from "@/components/FilterBar";
import { SectionHeader } from "@/components/Sectionheader";
import { TaskInput } from "@/components/TaskInput";
import { TaskItem } from "@/components/TaskItem";
import { theme } from "@/constants/theme";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
  useFonts,
} from "@expo-google-fonts/dm-sans";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  const {
    tasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    isLoading,
    counts,
  } = useTasks();

  if (!fontsLoaded || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={theme.colors.accent} />
      </View>
    );
  }

  // Build list data with section headers injected when filter is 'all'
  type ListItem =
    | { type: 'task'; data: Task }
    | { type: 'header'; label: string; count: number };

  const listData: ListItem[] = (() => {
    if (filter !== 'all') {
      return tasks.map((t) => ({ type: 'task' as const, data: t }));
    }

    const active = tasks.filter((t) => !t.completed);
    const completed = tasks.filter((t) => t.completed);
    const items: ListItem[] = [];

    if (active.length > 0) {
      items.push({ type: 'header', label: 'Active', count: active.length });
      active.forEach((t) => items.push({ type: 'task', data: t }));
    }

    if (completed.length > 0) {
      items.push({ type: 'header', label: 'Completed', count: completed.length });
      completed.forEach((t) => items.push({ type: 'task', data: t }));
    }

    return items;
  })();

  const renderItem = ({ item }: { item: ListItem }) => {
    if (item.type === 'header') {
      return <SectionHeader label={item.label} count={item.count} />;
    }
    return (
      <TaskItem task={item.data} onToggle={toggleTask} onDelete={deleteTask} />
    );
  };

  const isEmpty = tasks.length === 0;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerLabel}>TODAY</Text>
            <Text style={styles.headerTitle}>Task Tracker</Text>
            {counts.active > 0 && (
              <Text style={styles.headerMeta}>
                {counts.active} task{counts.active !== 1 ? "s" : ""} remaining
              </Text>
            )}
          </View>

          <TaskInput onAdd={addTask} />

          <FilterBar active={filter} counts={counts} onChange={setFilter} />

          <FlatList
            data={listData}
            keyExtractor={(item, index) =>
              item.type === 'task' ? item.data.id : `header-${index}`
            }
            renderItem={renderItem}
            ListEmptyComponent={<EmptyState filter={filter} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={isEmpty ? styles.flex : styles.listContent}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  flex: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  headerLabel: {
    color: theme.colors.accent,
    fontSize: theme.fontSize.xs,
    fontFamily: "DMSans_700Bold",
    letterSpacing: 3,
    marginBottom: theme.spacing.xs,
  },
  headerTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.xxl,
    fontFamily: "DMSans_700Bold",
    letterSpacing: -0.5,
  },
  headerMeta: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    fontFamily: "DMSans_400Regular",
    marginTop: theme.spacing.xs,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
});