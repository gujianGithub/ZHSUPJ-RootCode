import React from "react";
import {Flex,Icon,Button,Modal} from "antd-mobile";
import "../../css/detailRecord.css";
import "../../css/style.css";
import {browserHistory} from "./history";
import $ from "jquery";

const Item = Flex.Item;
export class DetailWaitRecordComponent extends React.Component{
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
                                            </Flex>
                                        </Item> 
                                    </Flex>
                                </Item>
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
            </Flex>
        )
    }
}