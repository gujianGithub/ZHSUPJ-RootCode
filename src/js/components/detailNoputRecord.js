import React from "react";
import {Flex,Icon,Button,Modal} from "antd-mobile";
import "../../css/detailRecord.css";
import "../../css/style.css";
import {DatePickerComponent2} from "./datePicker";
import {browserHistory} from "./history";
import $ from "jquery";

const Item = Flex.Item;
const alert = Modal.alert;
export class DetailNoputRecordComponent extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            dapSNStudent:[],
        }
    }
    componentDidMount(){
        this.getDapSNStudent();
    }
    getDapSNStudent(){
        let postData = "method=POST&interface=AssessPerformance/GetAssessPerformanceDetailTable&data={\"Token\":\"" + sessionStorage.getItem("Token") + "\",\"dapSN\":\""+sessionStorage.getItem("dapSN")+"\"}";
        //console.log(postData);
        fetch(REQUEST_API, {
            method: 'POST',
            mode: 'cors',
            //credentials: 'include',
            xhrFields: {
                withCredentials: true
            },
            headers: {
                "Accept": "application/json,text/javascript,*/*",
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body: postData
        }).then(res => {
                if (res.status != 200) {
                    alert("服务器出错");
                }
                return res;
            }
        ).then(res => res.json()).then(res=>{
            let level =[];
            $.each(res.Msg,function(index,object){
                level.push(React.createElement("div",{key:index,className:"detailRecordCss13"},object.stuName));
            })
            this.setState({dapSNStudent:level},()=>{});
        })
    }
    //删除记录
    deleteDapSN(){
        alert('确定', '删除吗？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '删除', onPress: () => {
                let postData = "method=POST&interface=AssessPerformance/DeleteAssessPerformance&data={\"Token\":\"" + sessionStorage.getItem("Token") + "\",\"dapSN\":\""+sessionStorage.getItem("dapSN")+"\"}";
                //console.log(postData);
                fetch(REQUEST_API, {
                    method: 'POST',
                    mode: 'cors',
                    //credentials: 'include',
                    xhrFields: {
                        withCredentials: true
                    },
                    headers: {
                        "Accept": "application/json,text/javascript,*/*",
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    },
                    body: postData
                }).then(res => {
                        if (res.status != 200) {
                            alert("服务器出错");
                        }
                        return res;
                    }
                ).then(res => res.json()).then(res=>{
                    browserHistory.push("/record");
                })
               
            }
                }
            ])
       
    }
    //修改记录
    reSelect(){
        alert('确定', '修改吗？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => {
                sessionStorage.setItem("alter","true");
               
                browserHistory.push("/student");
            }
                }
            ])
    }
    //提交
    submit(){
        alert('确定', '提交吗？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => {
                let dapSN = sessionStorage.getItem("dapSN");
                let Token = sessionStorage.getItem("Token");
                let dapState ="2";
                let teaSN = sessionStorage.getItem("rolTeaSn");
                let postData = "method=POST&interface=AssessPerformance/SetDapState&data={\"Token\":\""+Token+"\",\"dapState\":\"" + dapState + "\",\"dapSN\":\"" + dapSN + "\",\"teaSN\":\""+teaSN+"\"}"
                fetch(REQUEST_API, {
                    method: 'POST',
                    mode: 'cors',
                    //credentials: 'include',
                    xhrFields: {
                        withCredentials: true
                    }, 
                    headers: {
                        "Accept": "application/json,text/javascript,*/*",
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    },
                     body: postData
                }).then(res => {
                        if (res.status != 200) {
                            alert("服务器出错");
                        }
                        return res;
                    }
                ).then(res => res.json()).then(res => {
                   // console.log(JSON.stringify(res.Msg));
                    browserHistory.push("/index");
                })
               
            }
                }
            ])
      

    }
    goBack(){
        browserHistory.push("/record");
    }
    render(){
        return(
            <Flex direction="column" align="stretch" style={{height:"100%"}}>
                <Item className="detailRecordCss1">
                    <Flex direction="row" align="center" style={{height:"100%",marginLeft:"20px"}}>
                        <Item style={{flexGrow:0}}><Icon type="left" onClick={this.goBack.bind(this)}/></Item>
                        <Item className="detailRecordCss2">{sessionStorage.getItem("recordName")}</Item>
                        <Item className="detailRecordCss3"></Item>
                    </Flex>
                </Item>
                <Item className="itemMarginLeft detailRecordCss5">
                    <Flex direction="row" align="center" justify="center" style={{height:"100%"}}>
                        <Item className="detailRecordCss4">
                            <Flex direction="column" align="stretch" style={{height:"100%"}}>
                               <DatePickerComponent2/>
                                <Item className="itemMarginLeft detailRecordCss11">
                                    <Flex direction="row" align="stretch" style={{height:"100%"}}>
                                        <Item style={{flexGrow:0,flexBasis:"50px"}}>
                                            <Flex direction="row" align="center" justify="center" style={{height:"100%"}}>
                                                <Item className="detailRecordCss10"></Item>
                                            </Flex>
                                        </Item>
                                        <Item style={{flexGrow:1,alignSelf:"center",height:"60px"}}>
                                            <Flex direction="row" wrap="wrap" style={{height:"100%",overflow:"auto"}}>
                                                {this.state.dapSNStudent}
                                            </Flex>
                                        </Item>
                                    </Flex>
                                </Item>
                                <Item className="itemMarginLeft detailRecordCss8">
                                    <Flex direction="row" align="stretch" style={{height:"100%"}}>
                                        <Item style={{flexGrow:0,flexBasis:"50px"}}>
                                            <Flex direction="row" align="center" justify="center" style={{height:"100%"}}>
                                                <Item className="detailRecordCss12"></Item>
                                            </Flex>
                                         </Item> 
                                         <Item className="itemMarginLeft detailRecordCss6">{sessionStorage.getItem("currentIndicatorName")+"-"+sessionStorage.getItem("recordDetialParentIndName")+"-"+sessionStorage.getItem("recordDetialIndName")+"("+sessionStorage.getItem("recordDetialIndScorecount")+")"}</Item> 
                                    </Flex>
                                </Item>
                            </Flex>
                        </Item>
                    </Flex>
                </Item>
                <Item className="itemMarginLeft" style={{height:"47px",flexGrow:0}}>
                    <Flex direction="row" align="end" style={{height:"100%"}}>
                        <Item style={{flexGrow:1}}><Button type="primary" onClick={this.deleteDapSN.bind(this)}>删除</Button></Item>
                        <Item className="itemMarginLeft" style={{flexGrow:1}}><Button type="primary" onClick={this.reSelect.bind(this)}>修改</Button></Item>
                        <Item className="itemMarginLeft" style={{flexGrow:1}}><Button type="primary" onClick={this.submit.bind(this)}>提交</Button></Item>
                    </Flex>
                </Item>
            </Flex>
        )
    }
}