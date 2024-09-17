import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ stationName, onClose }) => {

  const handleCloseClick = () => {
    onClose(); // 모달 닫기 함수 호출
  }

  return (
    <div className={styles.dim} onClick={handleCloseClick}>
      <div className={`${styles.modal} ${styles.modal_location}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.correct_modal}>
          {/* 클릭한 역명을 받아와 표시 */}
          <h1>{stationName}역, 정답입니다.</h1>
          <p>다시 시작하려면 창을 닫고 <br />
            START! 버튼을 눌러주세요.
          </p>
          <button
           onClick={handleCloseClick}
           className={styles.btn_close}
          >닫기</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;