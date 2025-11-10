import axiosInstance from './axiosInstance';

/**
 * TTS API를 호출하고, 재생 가능한 오디오 URL을 반환합니다.
 * @param {string} url - 호출할 엔드포인트 URL
 * @param {object} body - { text, voiceName, pitch, speakingRate }
 * @returns {Promise<string>} - 오디오를 재생할 수 있는 Blob URL
 */
export const postTTS = async (url, body) => {
  try {
    const response = await axiosInstance.post(url, body, {
      responseType: 'blob', // ⭐️ 오디오 데이터를 Blob으로 받습니다.
    });
    
    // Blob 데이터를 재생 가능한 URL로 변환하여 반환
    return URL.createObjectURL(response.data); 

  } catch (error) {
    console.error(`TTS API request failed at ${url}:`, error);
    throw error;
  }
};