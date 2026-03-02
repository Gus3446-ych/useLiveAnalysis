import React, { forwardRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface PromptInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onFocus: () => void;
}

export const PromptInput = forwardRef<TextInput, PromptInputProps>(
  ({ value, onChangeText, onFocus }, ref) => {
    return (
      <View style={styles.promptCard}>
        <Text style={styles.promptLabel}>🤖 AI에게 질문하기 (선택사항)</Text>
        <TextInput
          ref={ref}
          style={styles.promptInput}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          placeholder="예: 이 이미지에서 텍스트만 추출해줘"
          placeholderTextColor="#94a3b8"
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
        <Text style={styles.promptHint}>
          💡 비워두면 자동으로 상세 분석을 진행합니다
        </Text>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  promptCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  promptLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  promptInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1e293b',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  promptHint: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 8,
  },
});
