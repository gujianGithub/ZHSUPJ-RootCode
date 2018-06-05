import React from "react";
import {BrowserRouter as Router,Route} from "react-router-dom";
import {Flex,Icon,Button,List,Radio,Modal} from "antd-mobile";
//import {browserHistory} from "./history";
import {browserHistory} from "./history";
import $ from "jquery";
import "../../css/check.css";
import "../../css/style.css";

const Item = Flex.Item;
const RadioItem = Radio.RadioItem;
const alert = Modal.alert;
export class CheckComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            item:[],
            data:[],
            value:0,
            level3IndCode:"",
        }
    }
    componentDidMount(){
        this.getItem();
    }
    getItem(){
        let postData = "method=POST&interface=AssessIndicator/GetAssessIndicator2&data={\"Token\":\"" + sessionStorage.getItem("Token") + "\",\"graKindSN\":\"" + sessionStorage.getItem("getClassGraKindSN") + "\",\"perSN\":\""+sessionStorage.getItem("getClassPerSN")+"\",\"graSN\":\""+sessionStorage.getItem("getClassGraSN")+"\",\"terSN\":\""+sessionStorage.getItem("getClassTerSN")+"\",\"schSN\":\""+sessionStorage.getItem("schSn")+"\",\"disparkState\":\"3\",\"indCode\":\""+sessionStorage.getItem("currentIndicatorCode")+"\"}";
       // console.log(postData);
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
            sessionStorage.setItem("assessIndicatorTree",JSON.stringify(res.Msg));
            //console.log(JSON.stringify(res.Msg));
            let level =[];
            $.each(res.Msg,function(index,object){
                if(index == 0){
                    level.push(React.createElement("div",{key:index,onClick:this.changeItemFocusState.bind(this),className:"checkCss9 clickedColor","planindcode":object.planIndCode,"indcode":object.indCode,"indname":object.indName,"indscore":object.indScore,"maxvalue":object.maxValue,"minvalue":object.minValue,"defaultValue":object.defaultValue,"indlevel":object.indLevel,"parentweight":object.parentWeight},object.indName));
                }else{
                    level.push(React.createElement("div",{key:index,onClick:this.changeItemFocusState.bind(this),className:"checkCss9","planindcode":object.planIndCode,"indcode":object.indCode,"indname":object.indName,"indscore":object.indScore,"maxvalue":object.maxValue,"minvalue":object.minValue,"defaultValue":object.defaultValue,"indlevel":object.indLevel,"parentweight":object.parentWeight},object.indName));
                }
            }.bind(this))
            this.setState({item:level},res=>{
                sessionStorage.setItem("level2IndCode",$("#itemInfo").find(".clickedColor").attr("indcode"));
                sessionStorage.setItem("level2IndName",$("#itemInfo").find(".clickedColor").attr("indname"));
               this.getCheck();
            });
        })
    }
    getCheck(){
        let level =[];
        $.each(JSON.parse(sessionStorage.getItem("assessIndicatorTree")),function(index1,object1){
                    if(object1.indCode == sessionStorage.getItem("level2IndCode")){
                        $.each(object1.children,function(index2,object2){
                            level.push({value:index2,label:object2.indName,indCode:object2.indCode});
                        }.bind(this))
                    }
        }.bind(this))
        this.setState({data:level},()=>{
            this.setState({value:-1000});
        });
   }
   changeItemFocusState(e){
    if($(e.target).is(".clickedColor")){
        return false;
    }else{
        $(e.target).addClass("clickedColor").siblings().removeClass("clickedColor");
        sessionStorage.setItem("level2IndCode",$(e.target).attr("indcode"));
        sessionStorage.setItem("level2IndName",$(e.target).attr("indname"));
        this.getCheck();
    }
   }
    confirmCheckInfo(){
        if(sessionStorage.getItem("alter") == "true"){
            alert('确定', '修改吗？', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '修改', onPress: () => {
                    sessionStorage.setItem("level3IndCode",this.state.level3IndCode);//保存考核项信息
                    sessionStorage.removeItem("alter");
                    let graKindSN = sessionStorage.getItem("getClassGraKindSN");
                    let perSN = sessionStorage.getItem("getClassPerSN");
                    let graSN = sessionStorage.getItem("getClassGraSN");
                    let terSN = sessionStorage.getItem("getClassTerSN");
                    let dapSN = sessionStorage.getItem("dapSN");
                    let txtData = sessionStorage.getItem("dateTime");
                    let indCode = sessionStorage.getItem("level3IndCode");
                    let filePath = "";
                    let yeaName = "";
                    let Token = sessionStorage.getItem("Token");
                    let schSN = sessionStorage.getItem("schSn");
                    let schName = "";
                    let teaSN = sessionStorage.getItem("rolTeaSn");
                    let parentIndName = sessionStorage.getItem("level2IndName");
                    let parentIndCode = sessionStorage.getItem("level2IndCode");
                    let RoleToken = sessionStorage.getItem("rolToken");
                    let source = "2";
                    let stuInfo ="";
                    //分解学生信息
                    $.each(JSON.parse(sessionStorage.getItem("studentInfo")),function(index,object){
                        stuInfo += object.ClaSn+"⊙"+object.ClaName+"⊙"+object.StuName+"⊙"+object.StuId+"⊙"+object.BasClaSn;
                        if(index!= JSON.parse(sessionStorage.getItem("studentInfo")).length-1)
                        {
                            stuInfo+="∮";
                        }
                    }) 
                    let postData = "method=POST&interface=AssessPerformance/SaveAssessPerformance&data={\"stuInfo\":\""+stuInfo+"\",\"graKindSN\":\"" + graKindSN + "\",\"perSN\":\"" + perSN + "\",\"graSN\":\""+graSN+"\",\"terSN\":\""+terSN+"\",\"dapSN\":\""+dapSN+"\",\"txtData\":\""+txtData+"\",\"indCode\":\""+ indCode+"\",\"filePath\":\""+filePath+"\",\"yeaName\":\""+yeaName+"\",\"Token\":\""+Token+"\",\"schSN\":\""+schSN+"\",\"schName\":\""+schName+"\",\"teaSN\":\""+teaSN+"\",\"parentIndName\":\""+parentIndName+"\",\"parentIndCode\":\""+parentIndCode+"\",\"source\":\""+source+"\",\"RoleToken\":\""+RoleToken+"\"}"
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
              //  console.log(res.Msg);
                    sessionStorage.removeItem("studentInfo");
                    sessionStorage.removeItem("level3IndCode");
                    sessionStorage.setItem("recordDetialParentIndName",res.Msg[0].parentIndName);
                    sessionStorage.setItem("recordDetialIndName",res.Msg[0].indName);
                    sessionStorage.setItem("recordDetialIndScorecount",res.Msg[0].indScoreCount);
                }
            )
                    browserHistory.push("/detailNoputRecord");
                }
                    }
                ])
        }else{
        alert('确定', '提交吗？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '提交', onPress: () => {
                sessionStorage.setItem("level3IndCode",this.state.level3IndCode);//保存考核项信息
                browserHistory.push("/index");
            }
                }
            ])
        }
    }
    onChangeCheck(value,indCode){
        sessionStorage.setItem("level3IndCode",indCode);
        this.setState({value:value},()=>{
            this.setState({level3IndCode:indCode});
        });
    }
    goBack(){
        browserHistory.push("/index");
    }
    render(){
        return(
            <Router>
                <Flex direction="column" align="stretch" style={{height:"100%"}}>
                    <Item className="checkCss1">
                        <Flex direction="row" align="center" style={{height:"100%",marginLeft:"20px"}}>
                            <Item style={{flexGrow:0}}><Icon type="left" onClick={this.goBack.bind(this)}/></Item>
                            <Item className="checkCss2">选择考核选项</Item>
                            <Item className="checkCss3"></Item>
                        </Flex>
                    </Item>
                    <Item className="checkCss5 itemMarginLeft" id="itemInfo">
                    <Flex direction="row" align="center" justify="around" wrap="wrap" style={{height:"100%",overflow:"auto"}}>
                           {this.state.item}
                        </Flex>
                    </Item>
                    <Item  className="itemMarginLeft checkCss7" style={{overflow:"auto"}}>
               
                    <List style={{height:"100%"}}>
                         {this.state.data.map(i => (
                            <RadioItem key={i.value} checked={this.state.value === i.value} onChange={()=>this.onChangeCheck(i.value,i.indCode)}>
                                    {i.label}
                            </RadioItem>
                        ))}
                    </List>
                   
                    </Item>
                    <Item className="itemMarginLeft checkCss6">
                    <Button type="primary"
                            onClick={ this.confirmCheckInfo.bind(this)}>
                                 确定
                    </Button>
                    </Item>
                </Flex>
            </Router>
        )
    }
}