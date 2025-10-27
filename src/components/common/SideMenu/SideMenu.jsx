// src/components/common/SideMenu/SideMenu.jsx
import React, { useState } from "react"; 
import * as S from "./SideMenu.style";
import { useNavigate } from "react-router-dom";
import tokenManager from "../../../api/tokenManager"; 
import { logout } from "../../../api/authApi"; 
import DeleteAccountModal from "../DeleteAccountModal/DeleteAccountModal";
import InfoModal from "../InfoModal/InfoModal";
// 1. EditProfileModal 임포트
import EditProfileModal from "../EditProfileModal/EditProfileModal";

const SideMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // 2. 회원정보 수정 모달 상태 추가
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [infoModalInfo, setInfoModalInfo] = useState({
    isOpen: false,
    title: "",
    isError: false,
    onClose: () => {},
  });

  // ... (handleLogout 변경 없음) ...
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

  // 3. 회원정보 수정 핸들러 수정
  const handleEditProfile = () => {
    onClose(); // 사이드 메뉴 닫기
    setIsEditModalOpen(true); // 수정 모달 열기
  };

  // 4. 회원 탈퇴 핸들러 수정 (변경 없음)
  const handleDeleteAccount = () => {
    onClose(); 
    setIsDeleteModalOpen(true);
  };

  // 5. 수정 성공 시 InfoModal을 띄우는 콜백 함수
  const handleUpdateSuccess = (message) => {
    setIsEditModalOpen(false); // 수정 모달 닫기
    setInfoModalInfo({ // 성공 알림 모달 열기
      isOpen: true,
      title: message,
      isError: false,
      onClose: () => setInfoModalInfo({ isOpen: false }),
    });
  };


  return (
    <>
      {/* (사이드 메뉴 JSX - 변경 없음) */}
      <S.Backdrop isOpen={isOpen} onClick={onClose} />
      <S.ModalContainer isOpen={isOpen}>
        <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        <S.MenuList>
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

      {/* (탈퇴 모달 JSX - 변경 없음) */}
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />

      {/* (Info 모달 JSX - 변경 없음) */}
      <InfoModal
        isOpen={infoModalInfo.isOpen}
        title={infoModalInfo.title}
        message={infoModalInfo.message}
        isError={infoModalInfo.isError}
        onClose={infoModalInfo.onClose}
      />

      {/* 6. 회원정보 수정 모달 렌더링 추가 */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </>
  );
};

export default SideMenu;