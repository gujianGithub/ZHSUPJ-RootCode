import React from "react";
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import {Flex,Icon,Button,Modal} from "antd-mobile";
import "../../css/student.css";
import "../../css/style.css";
import $ from "jquery";
import {browserHistory} from "./history";


const Item = Flex.Item;
const alert = Modal.alert;
var array =[];

export class StudentComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            /* token:sessionStorage.getItem("Token"),
            roleToken :sessionStorage.getItem("rolToken"),
            graKindSN : sessionStorage.getItem("graKindSn"),
            perSN :sessionStorage.getItem("perSn"),
            graSN :sessionStorage.getItem("graSn"),
            terSN :sessionStorage.getItem("terSn"),
            schSN : sessionStorage.getItem("schSn"), */
            grade:[],
            class:[],
            student:[],
            selectStateChange:"全选",
        }
    }
    componentDidMount(){
        this.getGrade();
    }
    getGrade(){
        let graKindGrade = JSON.parse(sessionStorage.getItem("graKindGrade"));
        let level = [];
        //根据指标获取班级
        $.each(JSON.parse(sessionStorage.getItem("comparedGraKind")),function(index1,object1){
            $.each(graKindGrade,function(index2,object2){
                $.each(object2.perInfo,function(index3,object3){
                    if(object2.graKindSN == object1.graKindSN && object3.graSN == object1.graSN && object3.perSN == object1.perSN){
                        level.push(React.createElement("div",{key:index2+index3,onClick:this.changeGradeFocusState.bind(this),"grakindsn":object2.graKindSN,"grasn":object3.graSN,"persn":object3.perSN,"tersn":object1.terSN,className:"studentCss8"},object3.graName));
                    }
                }.bind(this))
            }.bind(this))
        }.bind(this))
         this.setState({grade:level},()=>{
             $(".studentCss8").eq(0).addClass("clickedColor");
             sessionStorage.setItem("getClassGraKindSN",$(".studentCss8").eq(0).attr("grakindsn"));
             sessionStorage.setItem("getClassGraSN",$(".studentCss8").eq(0).attr("grasn"));
             sessionStorage.setItem("getClassPerSN",$(".studentCss8").eq(0).attr("persn"));
             sessionStorage.setItem("getClassTerSN",$(".studentCss8").eq(0).attr("tersn"));
             this.getClass();
         });
    }
    getClass(){
            let graKindGrade = JSON.parse(sessionStorage.getItem("graKindGrade"));
            let level =[];
            $.each(graKindGrade,function(index1,object1){
                $.each(object1.perInfo,function(index2,object2){
                    $.each(object2.claInfo,function(index3,object3){
                        if(object1.graKindSN == sessionStorage.getItem("getClassGraKindSN") && object2.graSN == sessionStorage.getItem("getClassGraSN")&&object2.perSN == sessionStorage.getItem("getClassPerSN")){
                            level.push(React.createElement("div",{key:index1+index2+index3,onClick:this.changeClassFocusState.bind(this),className:"studentCss9","clasn":object3.claSN,"basclasn":object3.basClaSN,"claname":object3.claName},object3.claName));
                        }
                    }.bind(this))
                }.bind(this))
            }.bind(this))
            this.setState({class:level},res=>{
                $(".studentCss9").eq(0).addClass("clickedColor");
                sessionStorage.setItem("getStudentClaSN",$(".studentCss9").eq(0).attr("clasn"));
               this.getStudent();
            });
    }
    getStudent(){
        let postData = "method=POST&interface=Base/GetStudent&data={\"Token\":\"" + sessionStorage.getItem("Token") + "\",\"RoleToken\":\"" + sessionStorage.getItem("rolToken") + "\",\"perSN\":\""+sessionStorage.getItem("getClassPerSN")+"\",\"graSN\":\""+sessionStorage.getItem("getClassGraSN")+"\",\"terSN\":\""+sessionStorage.getItem("getClassTerSN")+"\",\"schSN\":\""+sessionStorage.getItem("schSn")+"\",\"claSN\":\""+ sessionStorage.getItem("getStudentClaSN")+"\"}";
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
            //console.log(JSON.stringify(res));
            
            let level =[];
            $.each(res.Msg,function(index,object){
                level.push(React.createElement("div",{key:index,onClick:this.changeStudentFocusState.bind(this),className:"studentCss10","basclasn":object.BasClaSn,"clasn":object.ClaSn,"claname":object.ClaName,"stusn":object.StuSn,"stuid":object.StuId,"stuname":object.StuName},object.StuName));
            }.bind(this))
            this.setState({student:level},res=>{
                $(".studentCss10").removeClass("clickedColor");
                if(array.length >0){
                    $.each(array,function(index,object){
                        $(".studentCss10").each(function(){
                            if(object.StuId == $(this).attr("stuid")){
                                $(this).addClass("clickedColor");
                            }
                        })
                    })
                }
           });
        })
    }
    changeGradeFocusState(e){
        if($(e.target).is(".clickedColor")){
            return false;
        }else{
            $(e.target).addClass("clickedColor").siblings().removeClass("clickedColor");
            sessionStorage.setItem("getClassGraKindSN",$(e.target).attr("grakindsn"));
             sessionStorage.setItem("getClassGraSN",$(e.target).attr("grasn"));
             sessionStorage.setItem("getClassPerSN",$(e.target).attr("persn"));
             sessionStorage.setItem("getClassTerSN",$(e.target).attr("tersn"));
            this.getClass();
        }
    }
    changeClassFocusState(e){
        if($(e.target).is(".clickedColor")){
            return false;
        }else{
            $(e.target).addClass("clickedColor").siblings().removeClass("clickedColor");
            sessionStorage.setItem("getStudentClaSN",$(e.target).attr("clasn"));
            this.getStudent();
        }
    }
    changeStudentFocusState(e){
        if($(e.target).is(".clickedColor")){
            $(e.target).removeClass("clickedColor");
            $.each(array,function(index,object){
                if($(e.target).attr("stuid") == object.StuId){
                    array.splice(index,1);
                    return false;
                }
            })
        }else{
            $(e.target).addClass("clickedColor");
            array.push({"ClaName":$(e.target).attr("claname"),"BasClaSn":$(e.target).attr("basclasn"),"ClaSn":$(e.target).attr("clasn"),"StuSn":$(e.target).attr("stusn"),"StuId":$(e.target).attr("stuid"),"StuName":$(e.target).attr("stuname")});
        }
    }
    confirmStudentInfo(){
        alert('确定', '提交吗？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '提交', onPress: () => {
               // console.log(JSON.stringify(array));
                sessionStorage.setItem("studentInfo", JSON.stringify(array));  //保存学生信息
                array = [];
                browserHistory.push("/check");
            }
                }
            ])
    }
    selectAllStudents(e)
    {
        if(this.state.selectStateChange == "全选"){
            this.setState({selectStateChange:"全不选"},()=>{
                $(".studentCss10").addClass("clickedColor");
                $(".studentCss10").each(function(){
                    array.push({"ClaName":$(this).attr("claname"),"BasClaSn":$(this).attr("basclasn"),"ClaSn":$(this).attr("clasn"),"StuSn":$(this).attr("stusn"),"StuId":$(this).attr("stuid"),"StuName":$(this).attr("stuname")});
                })
                //console.log(JSON.stringify(array));
            })
        
        }else{
            this.setState({selectStateChange:"全选"},()=>{
                $(".clickedColor").each(function(){
                    $(this).removeClass("clickedColor");
                    let thisType= $(this);
                    $.each(array,function(index,object){
                     if($(thisType).attr("stuid") == object.StuId){
                         array.splice(index,1);
                         return false;
                     }
                 })
             })
            // console.log(JSON.stringify(array));
          //  $(".studentCss10").removeClass("clickedColor");
            })
            
        }
        
    }
    goBack(){
        browserHistory.push("/index");
    }
    render(){
        return(
            <Router>
                <Flex direction="column" align="stretch" style={{height:"100%"}}>
                    <Item className="studentCss1">
                        <Flex direction="row" align="center" style={{height:"100%",marginLeft:"20px"}}>
                            <Item style={{flexGrow:0}}><Icon type="left" onClick={this.goBack.bind(this)}/></Item>
                            <Item className="studentCss2">选择学生</Item>
                            <Item className="studentCss3"></Item>
                        </Flex>
                    </Item>
                    <Item className="studentCss4">
                        <Flex direction="row" align="center" wrap="wrap" style={{height:"100%"}}>
                            {this.state.grade}
                        </Flex>
                    </Item>
                    <Item className="studentCss5 itemMarginLeft" id="classInfo">
                    <Flex direction="row" align="center" justify="around" wrap="wrap" style={{height:"100%",overflow:"auto"}}>
                           {this.state.class}
                        </Flex>
                    </Item>
                    <Item  className="itemMarginLeft studentCss7" style={{overflow:"auto"}}>
                    <Flex direction="row" justify="between" wrap="wrap">
                            {this.state.student}
                    </Flex>
                    </Item>
                    <Item className="itemMarginLeft studentCss6">
                        <Flex direction="row">
                            <Item><Button type="primary" onClick={this.selectAllStudents.bind(this)}>{this.state.selectStateChange}</Button></Item>
                           <Item className="itemMarginLeft"> <Button type="primary" onClick={this.confirmStudentInfo.bind(this)}>确定</Button></Item>
                        </Flex>
                        
                    </Item>
                </Flex>
            </Router>
        )
    }
}