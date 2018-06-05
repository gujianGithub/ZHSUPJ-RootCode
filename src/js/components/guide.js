import React from "react";
import {Flex,Pagination, Icon} from "antd-mobile";
import $ from "jquery";
import "../../css/style.css";
import "../../css/guide.css";
import {browserHistory} from "./history";
import GuideBackgroundImage from "../../image/guideBackground.png";
import indicatorIcon1 from "../../image/indicator_icon1.png";
import indicatorIcon2 from "../../image/indicator_icon2.png";
import indicatorIcon3 from "../../image/indicator_icon3.png";
import indicatorIcon4 from "../../image/indicator_icon4.png";



const Item = Flex.Item;

export class GuideComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Token:encodeURIComponent(sessionStorage.getItem("Token")),
            teacherRoles:JSON.parse(sessionStorage.getItem("TeacherRoles")),
            roleName:sessionStorage.getItem("rolName"),
            roleSelect:[],
            graKind:[],
            period:[],
            indicatorContent:[],
            totalPage:1,
            currentPage:1,
        }
    }
    componentDidMount(){
            this.getRoles();
        }
       //获取角色
    getRoles(){
        let level = []; 
        $.each(this.state.teacherRoles,function(index,object){
        level.push(React.createElement("option",{key:index,"rolsn":object.RolSn,"rolteasn":object.TeaSn,"rolclass":object.RolClass,"rolname":object.RolName,"roltoken":object.Token},object.RolName));
        })
        this.setState({roleSelect:level},()=>{
            sessionStorage.setItem("rolSn",$("#selectRole").find("option:selected").attr("rolsn"));
            sessionStorage.setItem("rolTeaSn",$("#selectRole").find("option:selected").attr("rolteasn"));
            sessionStorage.setItem("rolClass",$("#selectRole").find("option:selected").attr("rolclass"));
            sessionStorage.setItem("rolName",$("#selectRole").find("option:selected").attr("rolname"));
            sessionStorage.setItem("rolToken",encodeURIComponent($("#selectRole").find("option:selected").attr("roltoken")));
            this.getRole();
        });
    }
    getRole(){
        let postData = "method=POST&interface=Base/GetRole&data={\"Token\":\"" + sessionStorage.getItem("Token") + "\",\"RoleToken\":\""+sessionStorage.getItem("rolToken")+"\",\"RoleSN\":\""+sessionStorage.getItem("rolSn")+"\",\"teaSN\":\""+sessionStorage.getItem("rolTeaSn")+"\",\"schSN\":\""+sessionStorage.getItem("schSn")+"\"}";
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
            //console.log(JSON.stringify(res.Msg));
            sessionStorage.setItem("graKindGrade",JSON.stringify(res.Msg));
            let graKindRole = "";
            graKindRole += "[";
            $.each(res.Msg,function(index,object){
                graKindRole += "{\"graKindSN\":\""+object.graKindSN+"\"";
                graKindRole += ",";
                graKindRole += "\"perInfo\":";
                graKindRole += "[";
                $.each(object.perInfo,function(index2,object2){
                    graKindRole+="{\"perSN\":\""+object2.perSN+"\",\"graSN\":\""+object2.graSN+"\"}";
                    if(index2!=object.perInfo.length-1){
                        graKindRole+=",";
                    }
                })
                graKindRole+="]";
                graKindRole+="}";
            })
            graKindRole+="]";
            sessionStorage.setItem("graKindRole",graKindRole);
            this.getIndicator();
        })
    }
   getIndicator(){
        let postData = "method=POST&interface=AssessIndicator/GetAssessIndicatorTree2&data={\"Token\":\"" + sessionStorage.getItem("Token") + "\",\"schSN\":\"" + sessionStorage.getItem("schSn") + "\",\"disparkState\":\"3\",\"graKindRole\":"+sessionStorage.getItem("graKindRole")+"}";
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
           
             let level1 =[];
             if(typeof(res.Msg) == "object"){
                this.setState({currentPage:1});
                let time =1;
                let indicatorIcon = indicatorIcon1;
                this.setState({totalPage:Math.ceil(res.Msg.length/4)});
            sessionStorage.setItem("assessIndicatorTree",JSON.stringify(res.Msg));
          //  console.log(sessionStorage.getItem("assessIndicatorTree"));
                $.each(res.Msg,function(index,object){
                    if(index<=3){
                    switch(time){
                        case 1:indicatorIcon = indicatorIcon1;break;
                        case 2:indicatorIcon = indicatorIcon2;break;
                        case 3:indicatorIcon = indicatorIcon3;break;
                        case 4:indicatorIcon = indicatorIcon4;break;
                    }
                    let level2_1 = React.createElement('div',{"currentindicatorcode":object.indCode,"currentindicatorname":object.indName,onClick:this.goIndexPage.bind(this),style:{backgroundImage:`url(${indicatorIcon})`},key:index+1000,className:'css7'},'');
                    let level2_2 = React.createElement('div',{"currentindicatorcode":object.indCode,"currentindicatorname":object.indName,onClick:this.goIndexPage.bind(this),key:index,className:'css8'},object.indName);
                    let level2 = React.createElement("div",{key:index,className:"css9"},level2_1,level2_2);
                    level1.push(React.createElement('div',{key:index,className:'css10',asdf:"asdf"},level2));
                    time++;
                }
            }.bind(this))
           // console.log(level1);
            this.setState({indicatorContent:level1},res=>{
                // this.getIndicator(); 
                 });
        }else{
            this.setState({indicatorContent:[],currentPage:0,totalPage:0},res=>{
                
                 });
        }
        })
   }
   changePage(current){//默认一个参数当前页
    this.setState({currentPage:current},()=>{
        let level1 =[];
        let time =1;
        let indicatorIcon = indicatorIcon1;
        $.each(JSON.parse(sessionStorage.getItem("assessIndicatorTree")),function(index,object){
            if((index+1) <= current*4 && (index+1)>=(current*4-3)){
                switch(time){
                    case 1:indicatorIcon = indicatorIcon1;break;
                    case 2:indicatorIcon = indicatorIcon2;break;
                    case 3:indicatorIcon = indicatorIcon3;break;
                    case 4:indicatorIcon = indicatorIcon4;break;
                }
                let level2_1 = React.createElement('div',{"currentindicatorcode":object.indCode,"currentindicatorname":object.indName,onClick:this.goIndexPage.bind(this),style:{backgroundImage:`url(${indicatorIcon})`},key:index*current,className:'css7'},'');
                let level2_2 = React.createElement('div',{"currentindicatorcode":object.indCode,"currentindicatorname":object.indName,onClick:this.goIndexPage.bind(this),key:index*current+1,className:'css8'},object.indName);
                let level2 = React.createElement("div",{key:index*current,className:"css9"},level2_1,level2_2);
                level1.push(React.createElement('div',{key:index*current,className:'css10'},level2));
                time++;
            }
        }.bind(this)) 
         this.setState({indicatorContent:level1},res=>{
            });
    });
   }
   getRolSn(e){
        sessionStorage.setItem("rolSn",$(e.target).find("option:selected").attr("rolsn"));
        sessionStorage.setItem("rolTeaSn",$(e.target).find("option:selected").attr("rolteasn"));
        sessionStorage.setItem("rolClass",$(e.target).find("option:selected").attr("rolclass"));
        sessionStorage.setItem("rolName",$(e.target).find("option:selected").attr("rolname"));
        sessionStorage.setItem("rolToken",encodeURIComponent($(e.target).find("option:selected").attr("roltoken")));
        this.getIndicator();
   }
   
   goBack(){
    browserHistory.push("/");
   }
   goIndexPage(e){
    sessionStorage.setItem("currentIndicatorCode",$(e.target).attr("currentindicatorcode"));
    sessionStorage.setItem("currentIndicatorName",$(e.target).attr("currentindicatorname"));
    let comparedGraKind =[];
    $.each(JSON.parse(sessionStorage.getItem("assessIndicatorTree")),function(index1,object1){
        $.each(object1.graKind,function(index2,object2){
            if(object1.indCode == $(e.target).attr("currentindicatorcode")){
                comparedGraKind.push({"graKindSN":object2.graKindSN,"perSN":object2.perSN,"graSN":object2.graSN,"terSN":object2.terSN});
            }
        })
    })
    //console.log(JSON.stringify(comparedGraKind));
    sessionStorage.setItem("comparedGraKind",JSON.stringify(comparedGraKind));
    browserHistory.push("/index");
   }
    render(){
        return(
            <Flex direction="column" align="stretch" className="css1" style={{height:"100%"}}>
                <Item style={{height:"80px",flexGrow:0}} className="css2">宝山区新陶行知评价</Item>
                <Item className="itemMarginLeft" style={{height:"250px",flexGrow:0,marginTop:"30px"}}>
                    <Flex direction="row" align="between" justify="around" wrap="wrap" style={{height:"100%"}}>    
                        {this.state.indicatorContent}
                    </Flex>
                </Item>
                <Item className="itemMarginLeft" style={{height:"50px",flexGrow:0}}>
                    <Pagination total={this.state.totalPage}
                            onChange={this.changePage.bind(this)}
                            current={this.state.currentPage}
                    />
                </Item>
                <Item style={{flexGrow:1}}>
                  
                </Item>
                <Item className="itemMarginLeft css3" style={{flexGrow:0}}>
                    <Flex direction="row" align="center" style={{height:"100%"}}>
                        <Item style={{flexGrow:0,flexBasis:"100px",marginLeft:"8px"}} onClick={this.goBack.bind(this)}>   
                            返回
                        </Item>
                        <Item style={{flexBasis:1}}>
                            <Flex direction="row" justify="end">
                            当前角色&nbsp;:&nbsp;
                                <select id="selectRole" onChange={this.getRolSn.bind(this)}>
                                    {this.state.roleSelect}
                                </select>  
                            </Flex>
                        </Item>
                    </Flex>
                </Item>
            </Flex>
        )
    }
}