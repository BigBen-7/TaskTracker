import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

interface SectionHeaderProps {
  label: string;
  count: number;
}

export function SectionHeader({ label, count }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.line} />
      <Text style={styles.count}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.xs,
    fontFamily: 'DMSans_700Bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  count: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.xs,
    fontFamily: 'DMSans_500Medium',
  },
});