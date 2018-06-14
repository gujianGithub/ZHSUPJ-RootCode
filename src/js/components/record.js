import React from "react";
import {BrowserRouter as Router,Route,Link,NavLink} from "react-router-dom";
import {Flex,Icon} from "antd-mobile";
import {browserHistory} from "./history";
//import {hashHistory} from "./history";
import "../../css/record.css"; 
import $ from "jquery"; 


const Item = Flex.Item;
let recordName = "未交记录-详细";
export class RecordComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    componentDidMount(){
        let height = document.getElementById("index").scrollHeight;
        $("#itemHeight").height(height-45*2);
    }
    changeState(e){
        if($(e.target).is(".clickedColorRecord")){
            return false;
        }else{
            $(".noclickedColorRecord").removeClass("clickedColorRecord");
            $(e.target).addClass("clickedColorRecord");
        }
        let height = document.getElementById("index").scrollHeight;
        $("#itemHeight").height(height-45*2);
    }
    
    goBack(){
        browserHistory.push("/index");
    }
    render(){
        return(
            <Router>
                <Flex direction="column" align="stretch" style={{height:"100%"}}>
                    <Item className="recordCss1">
                        <Flex direction="column" align="stretch" style={{height:"100%"}}>
                            <Item style={{height:"45px",flexGrow:0,marginLeft:"20px"}}>
                                <Flex direction="row" align="center" style={{height:"100%"}}>
                                    <Item style={{flexGrow:0}}><Icon type="left" onClick={this.goBack.bind(this)}/></Item>
                                    <Item className="recordCss2">考核记录</Item>
                                    <Item className="recordCss3"></Item>
                                </Flex>
                            </Item>
                            <Item style={{flexGrow:1,marginLeft:"0px"}}>
                                <Flex direction="row" align="stretch" style={{height:"100%"}}>
                                    <Item className="recordCss4">
                                        <Link to="/record" className="noclickedColorRecord clickedColorRecord" onClick={this.changeState.bind(this)}>未交记录</Link>
                                    </Item>
                                    <Item className="recordCss4">
                                        <Link to="/record/waitRecord" className="noclickedColorRecord" onClick={this.changeState.bind(this)}>待审记录</Link>
                                    </Item>
                                    <Item className="recordCss4">
                                        <Link to="/record/passRecord" className="noclickedColorRecord" onClick={this.changeState.bind(this)}>审核通过</Link>
                                    </Item>
                                    <Item className="recordCss4">
                                        <Link to="/record/refuseRecord" className="noclickedColorRecord" onClick={this.changeState.bind(this)}>审核拒绝</Link>
                                    </Item>
                                </Flex>
                            </Item>
                        </Flex>
                    </Item>
                    <Item  id="itemHeight" style={{flexGrow:1,marginLeft:"0px"}}>
                        <Flex direction="column" align="stretch" style={{height:"100%"}}>
                            <Route exact path="/record" component={FunctionRecord}></Route>
                            <Route path="/record/waitRecord" component={FunctionRecord}></Route>
                            <Route path="/record/passRecord" component={FunctionRecord}></Route>
                            <Route path="/record/refuseRecord" component={FunctionRecord}></Route>
                        </Flex>
                    </Item>
                </Flex>
            </Router>
        )
    }
}

class FunctionRecord extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
           // url:this.props.match.url,
        }
    }
    componentDidMount(){
        let height = document.getElementById("index").scrollHeight;
        $("#itemHeight2").height(height-45*3);
        switch(this.props.match.url){
            case "/record" : recordName = "未交记录-详细";break;
            case "/record/waitRecord" : recordName = "待审记录-详细";break;
            case "/record/passRecord" : recordName = "审核通过-详细";break;
            case "/record/refuseRecord" : recordName = "审核拒绝-详细";break;
        }
    }
    changeState2(e){
        if($(e.target).is(".clickedColorRecord2")){
            return false;
        }else{
            $(".noclickedColorRecord2").removeClass("clickedColorRecord2");
            $(e.target).addClass("clickedColorRecord2");
        }
    }
    render(){
        return(
            <Router>
                <div style={{height:"100%"}}>
                    <Item style={{flexGrow:0,height:"45px"}} className="recordCss6">
                        <Flex direction="row" align="stretch" style={{height:"100%"}}>
                            <Item className="recordCss5">
                                <Link to={`${this.props.match.url}`} className="noclickedColorRecord2 clickedColorRecord2" onClick={this.changeState2.bind(this)}>减分记录</Link>
                            </Item>
                            <Item className="recordCss5">
                                <Link to={`${this.props.match.url}/addRecord`} className="noclickedColorRecord2" onClick={this.changeState2.bind(this)}>加分记录</Link>
                            </Item>
                            <Item className="recordCss5">
                                <Link to={`${this.props.match.url}/allRecord`} className="noclickedColorRecord2" onClick={this.changeState2.bind(this)}>全部记录</Link>
                            </Item>
                        </Flex>
                    </Item>
                    
                    <Item id="itemHeight2" style={{flexGrow:1,overflow:"auto",marginLeft:"0px"}}>
                        <Route exact path={`${this.props.match.url}`} component={RecordContent}></Route>
                        <Route path={`${this.props.match.url}/addRecord`} component={RecordContent}></Route>
                        <Route path={`${this.props.match.url}/allRecord`} component={RecordContent}></Route>
                    </Item>
                </div>
            </Router>
        )
    }
}

let dapState = "0";
class RecordContent extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
           itemRecord:[],
        }
    }
    
    componentDidMount(){
        if(this.props.match.url == "/record" || this.props.match.url == "/record/addRecord" || this.props.match.url == "/record/allRecord")
        {
            dapState = "1" ;
        }else if(this.props.match.url == "/record/waitRecord" || this.props.match.url == "/record/waitRecord/addRecord" || this.props.match.url == "/record/waitRecord/allRecord"){
            dapState = "2";
        }else if(this.props.match.url == "/record/passRecord" || this.props.match.url == "/record/passRecord/addRecord" || this.props.match.url == "/record/passRecord/allRecord"){
            dapState = "3";
        }else if(this.props.match.url == "/record/refuseRecord" || this.props.match.url == "/record/refuseRecord/addRecord" || this.props.match.url == "/record/refuseRecord/allRecord"){
            dapState = "4";
        }

        let createUser = sessionStorage.getItem("rolTeaSn");
        let schSN = sessionStorage.getItem("schSn");
        let Token = sessionStorage.getItem("Token");
        let dapState1 = dapState;
        var graKindSN =[];
        var perSN =[];
        var perSNArr =[];
        var graSN=[];
       // let terSN = sessionStorage.getItem("getClassTerSN");
        //console.log(sessionStorage.getItem("currentIndicatorCode"));
        console.log(graKindSN);
        $.each(JSON.parse(sessionStorage.getItem("assessIndicatorTree")),function(index,object){
            if(object.indCode == sessionStorage.getItem("currentIndicatorCode")){
                sessionStorage.setItem("opterateTree",JSON.stringify(object.graKind));
                $.each(object.graKind,function(index2,object2){
                    if(graKindSN.indexOf(object2.graKindSN) == -1){
                        graKindSN.push(object2.graKindSN);
                    }
                })
            }
            
        })
        console.log(graKindSN);
        var graKindInfo = "[";
        for(var i=0;i<graKindSN.length;i++){
            $.each(JSON.parse(sessionStorage.getItem("opterateTree")),function(index,object){
                //获取学界
                if(object.graKindSN == graKindSN[i]){
                    perSN.push(object.perSN);
                }
                //console.log(perSN.toString());
                //获取年级
                if(object.graKindSN == graKindSN[i]){
                    graSN.push(object.graSN);
                }
            })
       
            graKindInfo+="{\"graKindSN\":\""+graKindSN[i]+"\",";
            graKindInfo+="\"perInfo\":[";
            for(var j=0;j<perSN.length;j++){
                graKindInfo+="{\"perSN\":\""+perSN[j]+"\",";
                graKindInfo+="\"graInfo\":[";
                graKindInfo+="{\"graSN\":\""+graSN[j]+"\"}";
                graKindInfo+="]";
                graKindInfo+="}";
                if(j!=perSN.length-1){
                    graKindInfo+=",";
                }
            }
            graKindInfo+="]";
            graKindInfo+="}";
            if(i!=graKindSN.length-1){
                graKindInfo+=",";
            }
        }
        graKindInfo+="]";
        var claSNArr ="";
        var graKindGrade = JSON.parse(sessionStorage.getItem("graKindGrade"));
        
        $.each(graKindGrade,function(index,object){
            $.each(object.perInfo,function(index2,object2){
                $.each(object2.claInfo,function(index3,object3){
                    claSNArr+=object3.claSN+",";
                })
            })
        })
        claSNArr = claSNArr.substr(0,claSNArr.length-1);
        var startDate ="";
        var endDate = "";
        let postData = "method=POST&interface=AssessPerformance/GetAssessPerformanceTable4&data={\"createUser\":\""+createUser+"\",\"dapState\":\""+dapState1+"\",\"Token\":\""+Token+"\",\"schSN\":\""+schSN+"\",\"graKindInfo\":"+graKindInfo+",\"claSN\":\""+claSNArr+"\",\"startDate\":\""+startDate+"\",\"endDate\":\""+endDate+"\"}"
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
        ).then(res => res.json()).then(res => {
          //  console.log(JSON.stringify(res.Msg));
                if(typeof(res.Msg)=="object"){
                    let level = [];
                if(this.props.match.url == "/record" || this.props.match.url == "/record/waitRecord"||this.props.match.url == "/record/passRecord"||this.props.match.url == "/record/refuseRecord"){
                $.each(res.Msg,function(index,object){
                    if(object.indScoreCount<0){
                    let level2_4_1 = React.createElement("div",{key:(index+1)*7,className:"recordCss11"},"");
                    let level2_4 = React.createElement("div",{key:(index+1)*6,className:"recordCss8"},level2_4_1);
                    let level2_3 = React.createElement("div",{key:(index+1)*5},object.indScoreCount);
                    let level2_2 = React.createElement("div",{key:(index+1)*4,className:"recordCss9"},object.indName);
                    let level2_1 = React.createElement("div",{key:(index+1)*3,className:"recordCss10"},object.assessDate);
                    let level2 = React.createElement("div",{key:(index+1)*2,className:"recordCss7"},level2_1,level2_2,level2_3,level2_4);
                    level.push(React.createElement("div",{key:(index+1),onClick:this.skipToRecordDetail.bind(this),"dapsn":object.dapSN,"parentindcode":object.parentIndCode,"parentindname":object.parentIndName,"auditname":object.auditName,"audituser":object.auditUser,"batchname":object.batchname,"assessdate":object.assessDate,"indcode":object.indCode,"indname":object.indName,"dapstate":object.dapState,"personcount":object.personCount,"indscorecount":object.indScoreCount},level2));
                    }
                }.bind(this))
            }else if(this.props.match.url == "/record/addRecord" || this.props.match.url == "/record/waitRecord/addRecord"||this.props.match.url == "/record/passRecord/addRecord"||this.props.match.url == "/record/refuseRecord/addRecord"){
                $.each(res.Msg,function(index,object){
                    if(object.indScoreCount>0){
                        let level2_4_1 = React.createElement("div",{key:(index+1)*7,className:"recordCss11"},"");
                        let level2_4 = React.createElement("div",{key:(index+1)*6,className:"recordCss8"},level2_4_1);
                        let level2_3 = React.createElement("div",{key:(index+1)*5},object.indScoreCount);
                        let level2_2 = React.createElement("div",{key:(index+1)*4,className:"recordCss9"},object.indName);
                        let level2_1 = React.createElement("div",{key:(index+1)*3,className:"recordCss10"},object.assessDate);
                        let level2 = React.createElement("div",{key:(index+1)*2,className:"recordCss7"},level2_1,level2_2,level2_3,level2_4);
                        level.push(React.createElement("div",{key:(index+1),onClick:this.skipToRecordDetail.bind(this),"dapsn":object.dapSN,"parentindcode":object.parentIndCode,"parentindname":object.parentIndName,"auditname":object.auditName,"audituser":object.auditUser,"batchname":object.batchname,"assessdate":object.assessDate,"indcode":object.indCode,"indname":object.indName,"dapstate":object.dapState,"personcount":object.personCount,"indscorecount":object.indScoreCount},level2));
                    }
                }.bind(this))
            }else{
                $.each(res.Msg,function(index,object){
                    let level2_4_1 = React.createElement("div",{key:(index+1)*7,className:"recordCss11"},"");
                    let level2_4 = React.createElement("div",{key:(index+1)*6,className:"recordCss8"},level2_4_1);
                    let level2_3 = React.createElement("div",{key:(index+1)*5},object.indScoreCount);
                    let level2_2 = React.createElement("div",{key:(index+1)*4,className:"recordCss9"},object.indName);
                    let level2_1 = React.createElement("div",{key:(index+1)*3,className:"recordCss10"},object.assessDate);
                    let level2 = React.createElement("div",{key:(index+1)*2,className:"recordCss7"},level2_1,level2_2,level2_3,level2_4);
                    level.push(React.createElement("div",{key:(index+1),onClick:this.skipToRecordDetail.bind(this),"dapsn":object.dapSN,"parentindcode":object.parentIndCode,"parentindname":object.parentIndName,"auditname":object.auditName,"audituser":object.auditUser,"batchname":object.batchname,"assessdate":object.assessDate,"indcode":object.indCode,"indname":object.indName,"dapstate":object.dapState,"personcount":object.personCount,"indscorecount":object.indScoreCount},level2));
                }.bind(this))
            }
                this.setState({itemRecord:level});
            }
            }
        )
    }
    skipToRecordDetail(e){
        sessionStorage.setItem("dapSN",$(e.currentTarget).attr("dapSN"));
        if(e.currentTarget){
            sessionStorage.setItem("recordName",decodeURIComponent(recordName));
            sessionStorage.setItem("assessDate",$(e.currentTarget).attr("assessdate"));
            sessionStorage.setItem("recordDetialParentIndName",$(e.currentTarget).attr("parentindname"));
            sessionStorage.setItem("recordDetialIndName",$(e.currentTarget).attr("indname"));
            sessionStorage.setItem("recordDetialIndScorecount",$(e.currentTarget).attr("indscorecount"));
            switch(recordName){
                case "未交记录-详细":browserHistory.push("/detailNoputRecord");break;
                case "待审记录-详细":browserHistory.push("/detailWaitRecord");break;
                case "审核通过-详细":browserHistory.push("/detailPassRecord");break;
                case "审核拒绝-详细":browserHistory.push("/detailRefuseRecord");break;
            }
    }
    }
    render(){
        return(
            <div>
                <Flex direction="column" align="stretch">
                   {this.state.itemRecord}
                </Flex>
            </div>
        )
    }
}