//import React from "react";
/* 时间的各种格式取值*/

let now = new Date();
let fullYear = now.getFullYear();
let month = now.getMonth()+1;
let day = now.getDay();
let hour = now.getHours();
let minute = now.getMinutes();
let second = now.getSeconds();
//const dataTimeNow = fullYear+"-"+month+"-"+day+"  "+hour+":"+minute+":"+second; //当前时间 格式（2018-01-20 12:25:05）
//export default dataTimeNow;
/* class DateTime extends React.Component{
    constructor(props){
        super(props);
        let dataTimeNow = fullYear+"-"+month+"-"+day+"  "+hour+":"+minute+":"+second;
    }

}

export default DateTime; */
const pad = n => n < 10 ? `0${n}` : n;

  /* eslint no-confusing-arrow: 0 */
  const dateStr = `${new Date().getFullYear()}-${pad(new Date().getMonth() + 1)}-${pad(new Date().getDate())}`;
  const timeStr = `${pad(new Date().getHours())}:${pad(new Date().getMinutes())}:${pad(new Date().getSeconds())}`;
 const dateTimeNow = dateStr+" "+timeStr;
 export default dateTimeNow;
