import { Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const openCamera = (onSuccess: (uri: string) => void) => {
  const options = {
    mediaType: 'photo' as const,
    quality: 0.8,
    saveToPhotos: false,
    cameraType: 'back' as const,
  };

  launchCamera(options, (response) => {
    if (response.didCancel) {
      return;
    }
    if (response.errorCode) {
      Alert.alert('오류', response.errorMessage || '카메라 실행 실패');
      return;
    }
    if (response.assets && response.assets[0]) {
      onSuccess(response.assets[0].uri!);
    }
  });
};

export const pickImageFromLibrary = (onSuccess: (uri: string) => void) => {
  const options = {
    mediaType: 'photo' as const,
    quality: 0.8,
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      return;
    }
    if (response.errorCode) {
      Alert.alert('오류', response.errorMessage || '이미지 선택 실패');
      return;
    }
    if (response.assets && response.assets[0]) {
      onSuccess(response.assets[0].uri!);
    }
  });
};
