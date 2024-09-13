import React, { useEffect, useState, useRef } from 'react';
import styles from "./Home.module.css";
import Map from "../../component/Map/Map";
import Modal from "../../component/Modal/Modal";
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const Home = () => {
  
  const [data, setData] = useState([]);
  const [selectedStationCD, setSelectedStationCD] = useState(null);
  const [isStationSelected, setIsStationSelected] = useState(true); // 역 선택 전에는 비활성화
  const [time, setTime] = useState(0); // 타이머 시간
  const [isRunning, setIsRunning] = useState(false); // 타이머 작동 여부
  const timerRef = useRef(null); // 타이머 참조용
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 열기/닫기 관리
  const [stationName, setStationName] = useState(''); // 클릭한 역 이름 관리
  const API_KEY = process.env.REACT_APP_API_KEY;
  // const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/SearchSTNBySubwayLineInfo/1/1000/`;
  const url = `https://cors-anywhere.herokuapp.com/http://openapi.seoul.go.kr:8088/${API_KEY}/json/SearchSTNBySubwayLineInfo/1/1000/`;

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
      setData(data.SearchSTNBySubwayLineInfo.row);
    })
    .catch(error => {
      console.error("Error fetching the API: ", error);
    });
  }, [url]); //빈 배열을 넣어 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 설정

    // 타이머 기능
    useEffect(() => {
      if (isRunning) {
        timerRef.current = setInterval(() => {
          setTime((prevTime) => prevTime + 1);
        }, 1000);
      } else if (!isRunning && timerRef.current) {
        clearInterval(timerRef.current);
      }
      return () => clearInterval(timerRef.current);
    }, [isRunning]);
  
    const formatTime = (totalSeconds) => {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return totalSeconds < 60 ? `${seconds}초` : `${minutes}분 ${seconds}초`;
    };

    // 역 랜덤 배정 기능
    const genRandomStation = () => {
      let stationNumber = data.length; // 역의 총 갯수
      let randomIndex = Math.floor(Math.random() * stationNumber) // 역의 총 갯수 중 정수 형태의 난수 1개
      let randomStationCD = data[randomIndex]?.STATION_CD; // 결정된 난수의 역의 코드번호 호출
      setSelectedStationCD(randomStationCD); // 역 코드의 상태 변화
      console.log(stationNumber, randomIndex, randomStationCD);
      setStationName(data.find((station) => station.STATION_CD === randomStationCD)?.STATION_NM); // 역 이름 저장소 상태 변화
  
      // 타이머 초기화 및 시작
      setTime(0);
      setIsRunning(true);
      setIsStationSelected(false); // 버튼 비활성화 (역을 클릭하기 전까지)
    };

    // 역 클릭 시 처리
    const handleStnClick = (station) => {
      console.log("Correct");
      setIsRunning(false); // 스톱워치 멈추기
      setIsStationSelected(true); // 역 클릭 시 랜덤 버튼 다시 활성화
      // alert(`${station.STATION_NM}역을 찾았습니다⭕`);
      setIsModalOpen(true); // 모달 열기
      setStationName(station.STATION_NM); // 클릭한 역 이름 저장
    };

    // 모달 닫기
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
  // const handleClick = (e) => {
  //   // 역 위치 좌표 확인용, background_image div에 onClick={handleClick} 
  //   const rect = e.currentTarget.getBoundingClientRect();
  //   let x = e.clientX - rect.left - 5;
  //   let y = e.clientY - rect.top - 5;
  //   console.log(y, x);
  // }

  return (
    <div>
      <div>
        <button 
          onClick={genRandomStation} 
          className={styles.btn_random} 
          disabled={!isStationSelected} // 비활성화 상태 적용
        >
          GO!
        </button>
        {selectedStationCD && (
          <div className={styles.selected_position}>
            <p>현재 선택된 역: {data.find(station => station.STATION_CD === selectedStationCD)?.STATION_NM}</p>
            <p>시간: {formatTime(time)}</p>
          </div>
        )}
      </div>
      <div className={styles.important}>
        <TransformWrapper
          initialScale={1.3}      // 초기 스케일을 부모 요소에 맞게 조정
          minScale={1.3}          // 최소 스케일을 0.1로 설정 (너무 축소되지 않도록)
          maxScale={5}            // 최대 스케일 설정
          centerZoomedOut={true}     // 초기 로드 시 중앙에 배치
          limitToBounds={true}    // 경계 내에서만 드래그 가능하게 제한
        >
          <TransformComponent>
            <div className={styles.background_image}>
              <Map 
                data={data}
                selectedStationCD={selectedStationCD}
                onStationClick={handleStnClick}
              />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
      {isModalOpen && (
        <Modal 
          stationName={stationName} // 클릭된 역 이름 전달
          onClose={handleCloseModal} // 모달 닫기 함수 전달
        />
      )}
    </div>
  )
}

export default Home;