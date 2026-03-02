import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { openCamera, pickImageFromLibrary } from './utils/imagePicker';
import { analyzeImageWithGemini } from './service';
import { PromptInput } from './components/PromptInput';
import { ResultCard } from './components/ResultCard';
import { AnalysisResult } from './types';

export default function HomeScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);
  const promptInputRef = useRef<TextInput>(null);

  const handleImageSelected = (uri: string) => {
    setImage(uri);
    setResult(null);
  };

  const handlePromptFocus = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  const handleAnalyze = async () => {
    if (!image) {
      Alert.alert('오류', '이미지를 선택해주세요');
      return;
    }

    setAnalyzing(true);

    try {
      const analysisResult = await analyzeImageWithGemini(image, customPrompt);
      setResult(analysisResult);
    } catch (err: any) {
      Alert.alert('분석 실패', err.message);
      console.error('Analysis error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f4ff" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.header}>
            <Text style={styles.title}>📸 이미지 분석기</Text>
            <Text style={styles.subtitle}>
              카메라로 촬영하거나 이미지를 선택하여 AI 분석을 받아보세요
            </Text>
            <Text style={styles.badge}>Powered by 윤창현</Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => openCamera(handleImageSelected)}
            >
              <Text style={styles.buttonText}>📸 카메라 촬영</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => pickImageFromLibrary(handleImageSelected)}
            >
              <Text style={styles.buttonText}>📁 갤러리에서 선택</Text>
            </TouchableOpacity>
          </View>

          {image && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />

              <PromptInput
                ref={promptInputRef}
                value={customPrompt}
                onChangeText={setCustomPrompt}
                onFocus={handlePromptFocus}
              />

              <TouchableOpacity
                style={[
                  styles.analyzeButton,
                  analyzing && styles.disabledButton,
                ]}
                onPress={handleAnalyze}
                disabled={analyzing}
              >
                {analyzing ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator color="#fff" />
                    <Text style={[styles.buttonText, styles.loadingText]}>
                      분석 중...
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.buttonText}>🔍 Gemini로 분석하기</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {result && <ResultCard result={result} />}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  badge: {
    fontSize: 11,
    color: '#4f46e5',
    marginTop: 4,
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#4f46e5',
  },
  secondaryButton: {
    backgroundColor: '#64748b',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    margin: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 12,
  },
  analyzeButton: {
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    marginLeft: 8,
  },
});