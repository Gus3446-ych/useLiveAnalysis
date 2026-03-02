export const GEMINI_API_KEY = '제미니 API 키를 여기에 입력하세요';

export const DEFAULT_PROMPT = `이미지를 상세히 분석하여 다음 정보를 JSON 형식으로 제공해주세요:

{
  "description": "이미지에 대한 제품명 사용 용도에 대한 설명 (한국어)",
  "objects": ["감지된 객체 목록"],
  "brand": "제품명",
  "store": ["제품명을 검색해서 판매하는 곳 (있는 경우)"],
  "price": "정가, 할인 정보 등 (있는 경우)",
}

반드시 유효한 JSON만 반환하고 다른 텍스트는 포함하지 마세요.`;
