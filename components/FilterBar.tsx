import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';
import { FilterType } from '../types';

interface FilterBarProps {
  active: FilterType;
  counts: { all: number; active: number; completed: number };
  onChange: (filter: FilterType) => void;
}

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Done' },
];

export function FilterBar({ active, counts, onChange }: FilterBarProps) {
  return (
    <View style={styles.container}>
      {FILTERS.map(({ key, label }) => (
        <TouchableOpacity
          key={key}
          style={[styles.pill, active === key && styles.pillActive]}
          onPress={() => onChange(key)}
          activeOpacity={0.7}
        >
          <Text style={[styles.label, active === key && styles.labelActive]}>
            {label}
          </Text>
          <View style={[styles.badge, active === key && styles.badgeActive]}>
            <Text style={[styles.badgeText, active === key && styles.badgeTextActive]}>
              {counts[key]}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  pillActive: {
    backgroundColor: theme.colors.accentMuted,
    borderColor: theme.colors.accent,
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    fontFamily: 'DMSans_500Medium',
  },
  labelActive: {
    color: theme.colors.accent,
  },
  badge: {
    backgroundColor: theme.colors.border,
    borderRadius: theme.radius.full,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeActive: {
    backgroundColor: theme.colors.accent,
  },
  badgeText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.xs,
    fontFamily: 'DMSans_500Medium',
  },
  badgeTextActive: {
    color: '#0F0F0F',
  },
});