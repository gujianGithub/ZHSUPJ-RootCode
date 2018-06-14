import React from "react";
import {InputItem, Button, Flex} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {browserHistory} from "./history";
import "../../css/style.css";
import "../../css/login.css";

const Item = Flex.Item;

export class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: localStorage.getItem("teaName"), userpwd: ""};
    }

    handleChangeName(event) {
        this.setState({username: event});
    }

    handleChangePwd(event) {
        this.setState({userpwd: event});
    }

    handleClick() {
        let postData = "method=POST&interface=Login/Login&data={\"LoginName\":\"" + this.state.username + "\",\"LoginPwd\":\"" + this.state.userpwd + "\"}";
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
              //  console.log(JSON.stringify(res));
                if (res.Msg == "") {
                    sessionStorage.setItem("Token",res.Token);
                    sessionStorage.setItem("schSn",res.Data.SchSn);
                    localStorage.setItem("teaName",res.Data.TeaName);
                    sessionStorage.setItem("teaSn", res.Data.TeacherRoles[0].TeaSn.toString());
                    sessionStorage.setItem("TeacherRoles", JSON.stringify(res.Data.TeacherRoles));
                    sessionStorage.setItem("rolClass", res.Data.TeacherRoles[0].RolClass.toString());
                    sessionStorage.setItem("rolName", res.Data.TeacherRoles[0].RolName.toString());
                    sessionStorage.setItem("rolSn", res.Data.TeacherRoles[0].RolSn.toString());
                    sessionStorage.setItem("rolToken", encodeURIComponent(JSON.stringify(res.Data.TeacherRoles[0].Token)));
                    alert("登陆成功");
                    browserHistory.push("/guide");
                } else {
                    alert(res.Msg);
                }
            }
        )
    }

    render() {
        return (
            <Flex direction="column" align="stretch" style={{height:"100%"}} className="loginCss1">
             <Item style={{height:"150px",flexGrow:0}} className="loginCss2">宝山区新陶行知评价</Item>
                <Item className="itemMarginLeft" style={{width:"300px",height:"55px",flexGrow:0,alignSelf:"center"}}>
                    <InputItem
                        type="text"
                        placeholder="请输入您的用户名"
                        value={this.state.username}
                        onChange={this.handleChangeName.bind(this)}>用户名</InputItem>
                </Item>
                <Item className="itemMarginLeft" style={{width:"300px",height:"55px",flexGrow:0,alignSelf:"center",marginTop:"20px"}}>
                    <InputItem
                        type="password"
                        placeholder="*******"
                        value={this.state.userpwd}
                        onChange={this.handleChangePwd.bind(this)}>密码</InputItem>
                </Item>
                <Item className="itemMarginLeft" style={{height:"55px",flexGrow:0,width:"300px",alignSelf:"center",marginTop:"20px"}}>
                    <Button type="primary" onClick={this.handleClick.bind(this)}>
                        登录
                    </Button>
                </Item>
                <Item className="loginCss3" style={{flexGrow:1,alignSelf:"center",justify:"end"}}>
                    
                </Item>
            </Flex>
        )
    }
}




