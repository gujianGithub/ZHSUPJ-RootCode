import React from "react";
import "../../css/datePicker.css";
import "../../css/style.css";
import "../../css/index.css";
import "../../css/detailRecord.css";
import { DatePicker, List,Flex,Icon } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
const Item = Flex.Item;
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
// GMT is not currently observed in the UK. So use UTC now.
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

// Make sure that in `time` mode, the maxDate and minDate are within one day.
let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
// console.log(minDate, maxDate);
if (minDate.getDate() !== maxDate.getDate()) {
  // set the minDate to the 0 of maxDate
  minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
}
const pad = n => n < 10 ? `0${n}` : n;
function formatDate(date) {
  /* eslint no-confusing-arrow: 0 */
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  sessionStorage.setItem("dateTime",dateStr+" "+timeStr);//保存时间
  return `${dateStr} ${timeStr}`;
}
// If not using `List.Item` as children
// The `onClick / extra` props need to be processed within the component
const CustomChildren = ({ extra, onClick, children }) => (
    <div
      onClick={onClick}
      style={{ backgroundColor: '#fff', height: '45px', lineHeight: '45px', padding: '0 15px' }}
    >
      {children}
      <span style={{ float: 'right', color: '#888' }}>{extra}</span>
    </div>
  );

export class DatePickerComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: now,
            time: now,
            utcDate: utcNow,
            dpValue: null,
            customChildValue: null,
            visible: false,
            dateTimeNow:`${new Date().getFullYear()}-${pad(new Date().getMonth() + 1)}-${pad(new Date().getDate())}`+" "+`${pad(new Date().getHours())}:${pad(new Date().getMinutes())}:${pad(new Date().getSeconds())}`,
          }
    }
    componentDidMount(){
        this.timerID=setInterval(
            function(){
                this.tick();
            }.bind(this),
            1000);
    }
    componentWillUnmount(){
        clearInterval(this.timerID);
    }
    tick(){
        this.setState({ dateTimeNow:`${new Date().getFullYear()}-${pad(new Date().getMonth() + 1)}-${pad(new Date().getDate())}`+" "+`${pad(new Date().getHours())}:${pad(new Date().getMinutes())}:${pad(new Date().getSeconds())}`});
    }
    render() {
      return (
        <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
          <DatePicker
            value={this.state.date}
            onChange={date => this.setState({ date })}
            onOk={formatDate}
          >
          <Item className="itemMarginLeft indexCss9">
                    <Flex direction="row" align="stretch" style={{height:"100%"}}>
                            <Item style={{flexGrow:0,flexBasis:"80px"}}>
                                <Flex direction="row" align="center" justify="center" style={{height:"100%"}}>
                                    <Item className="indexCss5"></Item>
                                </Flex>
                            </Item> 
                            <Item className="itemMarginLeft indexCss6">{this.state.dateTimeNow}</Item> 
                            <Item className="itemMarginLeft" style={{flexGrow:0,flexBasis:"80px"}}>
                                <Flex direction="row" align="center" justify="end" className="indexCss7">
                                    <Icon type="right"/>
                                </Flex>
                            </Item> 
                    </Flex>
                </Item>
          </DatePicker>
        </List>
      )
    }
}

export class DatePickerComponent2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: now,
            time: now,
            utcDate: utcNow,
            dpValue: null,
            customChildValue: null,
            visible: false,
            dateTimeNow:`${new Date().getFullYear()}-${pad(new Date().getMonth() + 1)}-${pad(new Date().getDate())}`+" "+`${pad(new Date().getHours())}:${pad(new Date().getMinutes())}:${pad(new Date().getSeconds())}`,
          }
    }
    componentDidMount(){
        this.timerID=setInterval(
            function(){
                this.tick();
            }.bind(this),
            1000);
    }
    componentWillUnmount(){
        clearInterval(this.timerID);
    }
    tick(){
        this.setState({ dateTimeNow:`${new Date().getFullYear()}-${pad(new Date().getMonth() + 1)}-${pad(new Date().getDate())}`+" "+`${pad(new Date().getHours())}:${pad(new Date().getMinutes())}:${pad(new Date().getSeconds())}`});
    }
    render() {
      return (
        <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
          <DatePicker
            value={this.state.date}
            onChange={date => this.setState({ date })}
            onOk={formatDate}
          >
            <Item className="detailRecordCss8">
                <Flex direction="row" align="stretch" style={{height:"100%"}}>
                    <Item style={{flexGrow:0,flexBasis:"50px"}}>
                        <Flex direction="row" align="center" justify="center" style={{height:"100%"}}>
                            <Item className="detailRecordCss9"></Item>
                        </Flex>
                        </Item> 
                    <Item className="itemMarginLeft detailRecordCss6">{sessionStorage.getItem("assessDate")}</Item>
                    <Item className="itemMarginLeft" style={{flexGrow:0,flexBasis:"50px"}}>
                        <Flex direction="row" align="center" justify="end" className="detailRecordCss7">
                            <Icon type="right"/>
                        </Flex>
                    </Item> 
                </Flex>
            </Item>
          </DatePicker>
        </List>
      )
    }
}