// src/components/common/SideMenu/SideMenu.jsx
import React, { useState } from "react";
import * as S from "./SideMenu.style";
import { useNavigate } from "react-router-dom";
import tokenManager from "../../../api/tokenManager";
import { logout } from "../../../api/authApi";
import DeleteAccountModal from "../DeleteAccountModal/DeleteAccountModal";
import InfoModal from "../InfoModal/InfoModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
// ⬇️ 1. 새로 만든 TTS 설정 모달 임포트
import TTSSettingsModal from "../TTSSettingsModal/TTSSettingsModal";
import { useTTS } from "../../../contexts/TTSContext";

const SideMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // ⬇️ 2. TTS 설정 모달 상태 추가
  const [isTTSSettingsModalOpen, setIsTTSSettingsModalOpen] = useState(false);

  const {updateSettings} = useTTS();

  const [infoModalInfo, setInfoModalInfo] = useState({
    isOpen: false,
    title: "",
    isError: false,
    onClose: () => {},
  });

  // ... (handleLogout, handleEditProfile, handleDeleteAccount, handleUpdateSuccess 함수는 변경 없음) ...
  const handleLogout = async () => {
    onClose(); 
    try {
      await logout(); 
      tokenManager.clearToken(); 
      tokenManager.clearRefreshToken(); 
      setInfoModalInfo({
        isOpen: true,
        title: "로그아웃 되었습니다.",
        isError: false,
        onClose: () => {
          setInfoModalInfo({ isOpen: false });
          navigate("/login"); 
        },
      });
    } catch (error) {
      console.error(error);
      setInfoModalInfo({
        isOpen: true,
        title: "로그아웃 실패",
        message: "다시 시도해주세요.",
        isError: true,
        onClose: () => setInfoModalInfo({ isOpen: false }),
      });
    }
  };

  const handleEditProfile = () => {
    onClose(); 
    setIsEditModalOpen(true); 
  };

  const handleDeleteAccount = () => {
    onClose(); 
    setIsDeleteModalOpen(true);
  };

  const handleUpdateSuccess = (message) => {
    setIsEditModalOpen(false); 
    setInfoModalInfo({ 
      isOpen: true,
      title: message,
      isError: false,
      onClose: () => setInfoModalInfo({ isOpen: false }),
    });
  };

  // ⬇️ 3. TTS 설정 모달 핸들러 추가
  const handleOpenTTSSettings = () => {
    onClose(); // 사이드 메뉴 닫기
    setIsTTSSettingsModalOpen(true); // TTS 설정 모달 열기
  };

  const handleSaveTTSSettings = (settings) => {
    console.log("TTS 설정 저장됨:", settings); 
    updateSettings(settings);
    
    setIsTTSSettingsModalOpen(false); // TTS 모달 닫기 (TTSSettingsModal 자체에서도 닫지만, 여기서도 관리)
    
    // "저장 완료" InfoModal 띄우기
    setInfoModalInfo({
      isOpen: true,
      title: "TTS 설정이 저장되었습니다.",
      isError: false,
      onClose: () => setInfoModalInfo({ isOpen: false }),
    });
  };


  return (
    <>
      <S.Backdrop isOpen={isOpen} onClick={onClose} />
      <S.ModalContainer isOpen={isOpen}>
        <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        <S.MenuList>
          {/* ⬇️ 4. 새 메뉴 항목 추가 */}
          <S.MenuItem onClick={handleOpenTTSSettings}>
            TTS 설정
          </S.MenuItem>
          <S.MenuItem onClick={handleEditProfile}>
            회원정보 수정
          </S.MenuItem>
          <S.MenuItem onClick={handleLogout}>
            로그아웃
          </S.MenuItem>
          <S.MenuItem onClick={handleDeleteAccount}>
            회원 탈퇴
          </S.MenuItem>
        </S.MenuList>
      </S.ModalContainer>

      {/* ... (DeleteAccountModal, InfoModal, EditProfileModal 렌더링은 변경 없음) ... */}
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />

      <InfoModal
        isOpen={infoModalInfo.isOpen}
        title={infoModalInfo.title}
        message={infoModalInfo.message}
        isError={infoModalInfo.isError}
        onClose={infoModalInfo.onClose}
      />

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdateSuccess={handleUpdateSuccess}
      />

      <TTSSettingsModal
        isOpen={isTTSSettingsModalOpen}
        onClose={() => setIsTTSSettingsModalOpen(false)}
        onSave={handleSaveTTSSettings} 
      />
    </>
  );
};

export default SideMenu;