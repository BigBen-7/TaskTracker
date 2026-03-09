import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';
import { FilterType } from '../types';

interface EmptyStateProps {
  filter: FilterType;
}

const MESSAGES: Record<FilterType, { icon: string; title: string; subtitle: string }> = {
  all: {
    icon: '◎',
    title: 'No tasks yet',
    subtitle: 'Add something above to get started',
  },
  active: {
    icon: '✦',
    title: 'All caught up',
    subtitle: 'No active tasks remaining',
  },
  completed: {
    icon: '○',
    title: 'Nothing completed yet',
    subtitle: 'Finish a task to see it here',
  },
};

export function EmptyState({ filter }: EmptyStateProps) {
  const { icon, title, subtitle } = MESSAGES[filter];

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxl,
    gap: theme.spacing.sm,
  },
  icon: {
    fontSize: 36,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
  },
  title: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.lg,
    fontFamily: 'DMSans_500Medium',
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.sm,
    fontFamily: 'DMSans_400Regular',
  },
});