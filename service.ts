import RNFS from 'react-native-fs';
import { GoogleGenAI } from '@google/genai';
import { GEMINI_API_KEY, DEFAULT_PROMPT } from './types/constants';
import { AnalysisResult } from './types';

export const analyzeImageWithGemini = async (
  imageUri: string,
  customPrompt: string
): Promise<AnalysisResult> => {
  if (!GEMINI_API_KEY) {
    throw new Error('소스 코드에서 GEMINI_API_KEY를 설정해주세요');
  }

  // @google/genai 라이브러리 초기화
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  // 이미지를 base64로 변환
  const base64Image = await RNFS.readFile(imageUri, 'base64');

  // 사용자 프롬프트 또는 기본 프롬프트 사용
  const finalPrompt = customPrompt.trim() || DEFAULT_PROMPT;

  // Gemini API 호출
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: finalPrompt
          }
        ]
      }
    ]
  });

  // 응답 처리
  const textContent = response.text;

  // 커스텀 프롬프트인 경우 JSON 파싱 시도, 실패하면 텍스트 그대로 반환
  if (customPrompt.trim()) {
    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch {
        return { raw: textContent };
      }
    } else {
      return { raw: textContent };
    }
  } else {
    // 기본 프롬프트인 경우 JSON 파싱
    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      return { raw: textContent };
    }
  }
};