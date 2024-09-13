import React from 'react';
import stations from "../../assets/data/stations"
import styles from "./Map.module.css";

const Map = ({ data, selectedStationCD, onStationClick }) => {

  // 역 위치
  const transferStn = (stationCD) => {
    return stations[stationCD] || null;
  }
  return (
    <div className={styles.stn_cont}>
      {data.map((item) => {
        const position = transferStn(item.STATION_CD);
        return (
          <div
            key={item.STATION_CD} 
            id={item.STATION_CD} 
            style={{
             ...position,
              display: selectedStationCD === item.STATION_CD ? 'block' : 'none',
            }} // 선택된 난수의 역 === 렌더링 중 일치하는 역은 block, 불일치는 none
            className={styles.stn_box}
            onClick={() => onStationClick(item)}>
            <h2 className={styles.stn_nm}>{item.STATION_NM}</h2>
            <p className={styles.line_nm}>{item.LINE_NUM}</p>
            <p className={styles.stn_index}>{item.STATION_CD}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Map;