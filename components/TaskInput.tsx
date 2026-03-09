import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Text,
  Keyboard,
} from 'react-native';
import { theme } from '../constants/theme';

interface TaskInputProps {
  onAdd: (title: string) => boolean;
}

export function TaskInput({ onAdd }: TaskInputProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const triggerShake = () => {
    setError(true);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start(() => setTimeout(() => setError(false), 1000));
  };

  const handleAdd = () => {
    const success = onAdd(value);
    if (success) {
      setValue('');
      Keyboard.dismiss();
    } else {
      triggerShake();
    }
  };

  const handleCancel = () => {
    setValue('');
    setError(false);
    setIsFocused(false);
    Keyboard.dismiss();
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: shakeAnim }] }]}>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
        ]}
        value={value}
        onChangeText={(text) => {
          setValue(text);
          if (error) setError(false);
        }}
        placeholder="Add a new task..."
        placeholderTextColor={theme.colors.textMuted}
        onSubmitEditing={handleAdd}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        returnKeyType="done"
        maxLength={200}
      />
      {isFocused ? (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelText}>✕</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.button, !value.trim() && styles.buttonDisabled]}
          onPress={handleAdd}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    fontFamily: 'DMSans_400Regular',
  },
  inputFocused: {
    borderColor: theme.colors.accent,
  },
  inputError: {
    borderColor: theme.colors.danger,
  },
  button: {
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.md,
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.35,
  },
  buttonText: {
    color: '#0F0F0F',
    fontSize: 26,
    fontWeight: '300',
    lineHeight: 30,
  },
  cancelButton: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cancelText: {
    color: theme.colors.textSecondary,
    fontSize: 18,
  },
});