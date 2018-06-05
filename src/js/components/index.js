import React from "react";
import {Flex,Icon,Button,DatePicker,Modal,ImagePicker} from "antd-mobile";
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import "../../css/index.css";
import "../../css/style.css";
import "../../css/hbuilderAudio.css";
import {DatePickerComponent} from "./datePicker";
import "./hello H5+Common";
import {browserHistory} from "./history";
import $ from "jquery";
import dateTimeNow from "./date";
import voiceWrapperMethods from "../wrapperMethod/mobileVoice";


const Item = Flex.Item;
const alert = Modal.alert;
var gentry=null,hl=null,le=null;
var er=null,ep=null;
var bUpdated=false; //用于兼容可能提前注入导致DOM未解析完更新的问题
var r=null,t=0,ri=null,rt=null;
var p=null,pt=null,pp=null,ps=null,pi=null;
var voiceRecords=[]; var voiceRecordsTime = 1;
export class IndexComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dataTimeNow:new Date().toLocaleDateString()+"  "+ new Date().toLocaleTimeString(),
            div:[],
            divTakePhoto:[],
            displayStateTypeWritting:"block",
            displayStateAlbum:"none",
            displayStatePhoto:"none",
            displayStateVoice:"none",
            
        }
    }
    componentDidMount(){
        this.timerID=setInterval(
            function(){
                this.tick();
            }.bind(this),
            1000);
    }
   
    
    updateHistory(){
        if(bUpdated||!gentry||!document.body){//兼容可能提前注入导致DOM未解析完更新的问题
            return;
        }
          var reader = gentry.createReader();
          reader.readEntries(function(entries){
              for(var i in entries){
                  if(entries[i].isFile){
                      this.createItem(entries[i]);
                  }
              }
          }.bind(this), function(e){
              //outLine('读取录音列表失败：'+e.message);
          });
        bUpdated = true;
    }
    componentWillUnmount(){
        clearInterval(this.timerID);
    }
    tick(){
        this.setState({ dataTimeNow:new Date().toLocaleDateString()+"  "+ new Date().toLocaleTimeString()});
    }
    /* pickDateTime(){
        return <DatePickerComponent/>;
    } */
    pickStudent(){
        browserHistory.push("/student");
    }
    pickCheck(){
        browserHistory.push("/check");
    }
    
    saveRecord(){
        //判断提交条件是否完全
        if(sessionStorage.getItem("studentInfo") == null ||sessionStorage.getItem("studentInfo" == "undefined"))
        {
            alert("请选择学生");
            return false;
        }
        if(sessionStorage.getItem("level3IndCode") == null ||sessionStorage.getItem("level3IndCode" == "undefined"))
        {
            alert("请选择考核项");
            return false;
        }
       //确定是否保存
        alert('确定', '保存吗？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '保存', onPress: () => {
                let graKindSN = sessionStorage.getItem("getClassGraKindSN");
        let perSN = sessionStorage.getItem("getClassPerSN");
        let graSN = sessionStorage.getItem("getClassGraSN");
        let terSN = sessionStorage.getItem("getClassTerSN");
        let dapSN = "";
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
         let dapState ="";
        //分解学生信息
        $.each(JSON.parse(sessionStorage.getItem("studentInfo")),function(index,object){
            stuInfo += object.ClaSn+"⊙"+object.ClaName+"⊙"+object.StuName+"⊙"+object.StuId+"⊙"+object.BasClaSn;
            if(index!= JSON.parse(sessionStorage.getItem("studentInfo")).length-1)
            {
                stuInfo+="∮";
            }
        }) 
        //语音二进制流
        var reader =null;
        $.each(voiceRecords,function(index,object){
             plus.io.resolveLocalFileSystemURL(object.props.entry,function(entry){
                entry.file(function(file){
                    reader =new plus.io.FileReader();
                    reader.onloadend = function(e) {
                        plus.console.log("Read success");
                        // Get data
                        //plus.console.log(e.target.result);
                        //alert(e.target.result);
                        sessionStorage.setItem("voiceBase64",e.target.result);
                    };
                    reader.readAsDataURL(file);
                },function(e){
                    alert(e.message);
                })
            },function(e){
                alert(e);
            })
        })

        let postData = "method=POST&interface=AssessPerformance/SaveAssessPerformance&data={\"stuInfo\":\""+stuInfo+"\",\"graKindSN\":\"" + graKindSN + "\",\"perSN\":\"" + perSN + "\",\"graSN\":\""+graSN+"\",\"terSN\":\""+terSN+"\",\"dapSN\":\""+dapSN+"\",\"txtData\":\""+txtData+"\",\"indCode\":\""+ indCode+"\",\"filePath\":\""+filePath+"\",\"yeaName\":\""+yeaName+"\",\"Token\":\""+Token+"\",\"schSN\":\""+schSN+"\",\"schName\":\""+schName+"\",\"teaSN\":\""+teaSN+"\",\"parentIndName\":\""+parentIndName+"\",\"parentIndCode\":\""+parentIndCode+"\",\"source\":\""+source+"\",\"RoleToken\":\""+RoleToken+"\",\"dapState\":\""+dapState+"\"}"
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
            //console.log(res.Msg);
                sessionStorage.removeItem("studentInfo");
                sessionStorage.removeItem("level3IndCode");
                sessionStorage.setItem("dateTime",dateTimeNow);
                
            }
        )//
            }
                }
            ])
 
        
    }
    submitRecord(){
        //判断提交条件是否完全
        if(sessionStorage.getItem("studentInfo") == null ||sessionStorage.getItem("studentInfo" == "undefined"))
        {
            alert("请选择学生");
            return false;
        }
        if(sessionStorage.getItem("level3IndCode") == null ||sessionStorage.getItem("level3IndCode" == "undefined"))
        {
            alert("请选择考核项");
            return false;
        }
       //确定是否保存
        alert('确定', '提交吗？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '提交', onPress: () => {
            let graKindSN = sessionStorage.getItem("getClassGraKindSN");
            let perSN = sessionStorage.getItem("getClassPerSN");
            let graSN = sessionStorage.getItem("getClassGraSN");
            let terSN = sessionStorage.getItem("getClassTerSN");
            let dapSN = "";
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
            let dapState ="2";
            //分解学生信息
            $.each(JSON.parse(sessionStorage.getItem("studentInfo")),function(index,object){
                stuInfo += object.ClaSn+"⊙"+object.ClaName+"⊙"+object.StuName+"⊙"+object.StuId+"⊙"+object.BasClaSn;
                if(index!= JSON.parse(sessionStorage.getItem("studentInfo")).length-1)
                {
                    stuInfo+="∮";
                }
            }) 
        //语音二进制流
            var reader =null;
            $.each(voiceRecords,function(index,object){
                plus.io.resolveLocalFileSystemURL(object.props.entry,function(entry){
                    entry.file(function(file){
                        reader =new plus.io.FileReader();
                        reader.onloadend = function(e) {
                            plus.console.log("Read success");
                            // Get data
                            //plus.console.log(e.target.result);
                            //alert(e.target.result);
                            sessionStorage.setItem("voiceBase64",e.target.result);
                        };
                        reader.readAsDataURL(file);
                    },function(e){
                        alert(e.message);
                    })
                },function(e){
                    alert(e);
                })
            })

        let postData = "method=POST&interface=AssessPerformance/SaveAssessPerformance&data={\"stuInfo\":\""+stuInfo+"\",\"graKindSN\":\"" + graKindSN + "\",\"perSN\":\"" + perSN + "\",\"graSN\":\""+graSN+"\",\"terSN\":\""+terSN+"\",\"dapSN\":\""+dapSN+"\",\"txtData\":\""+txtData+"\",\"indCode\":\""+ indCode+"\",\"filePath\":\""+filePath+"\",\"yeaName\":\""+yeaName+"\",\"Token\":\""+Token+"\",\"schSN\":\""+schSN+"\",\"schName\":\""+schName+"\",\"teaSN\":\""+teaSN+"\",\"parentIndName\":\""+parentIndName+"\",\"parentIndCode\":\""+parentIndCode+"\",\"source\":\""+source+"\",\"RoleToken\":\""+RoleToken+"\",\"dapState\":\""+dapState+"\"}";
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
            //console.log(res.Msg);
                sessionStorage.removeItem("studentInfo");
                sessionStorage.removeItem("level3IndCode");
                sessionStorage.setItem("dateTime",dateTimeNow);
            }
        )
            }
                }
            ])
    }
    goRecord(){
        browserHistory.push("/record");
    }
    goBack(){
        sessionStorage.removeItem("studentInfo");
        sessionStorage.removeItem("level3IndCode");
        sessionStorage.setItem("dateTime",dateTimeNow);
        browserHistory.push("/guide");
    }

   
// 添加播放项
    createItem(entry) {
        let level2_2_1  =React.createElement("div",{key:voiceRecordsTime,className:"cleanCurrentHistory",entry:entry,onClick:this.cleanCurrentHistory.bind(this)},"");
        let level2_2  =React.createElement("div",{key:voiceRecordsTime+1,className:"cleanCurrentHistoryContain"},level2_2_1);
        let level2_1  =React.createElement("div",{key:voiceRecordsTime,entry:entry,onClick:this.playAudio.bind(this),className:"voicePlay"},"");
        let level1 = React.createElement("div",{key:voiceRecordsTime,entry:entry,className:"voiceHistory"},level2_1,level2_2);
        //保存语音记录
        voiceRecords.push(level1);
        voiceRecordsTime++;
        this.setState({div:voiceRecords},()=>{
        })
    }
    startRecord(){  //开始录音
        this.setState({displayStateTypeWritting:"none"});
        this.setState({displayStateAlbum:"none"});
        this.setState({displayStatePhoto:"none"});
        this.setState({displayStateVoice:"block"});
        // 扩展API加载完毕后调用onPlusReady回调函数 
        r = plus.audio.getRecorder(); 
        if ( r == null ) {
		alert( "Device not ready!" );
		return; 
    } 
	r.record( {filename:"_doc/audio/"}, function (pathVoice) {
        plus.io.resolveLocalFileSystemURL(pathVoice, function(){//读取刚录完的文件
			this.createItem(pathVoice);
		}.bind(this), function(e){
		});
	}.bind(this), function ( e ) {
    } );
     document.getElementById("record").style.display = 'block';
	t = 0;
	ri = setInterval(function(){
		t++;
		document.getElementById('recordTime').innerText = timeToStr(t);
	}, 1000);
    }
    //停止录音
    stopRecord(){
        document.getElementById("record").style.display = 'none';
        document.getElementById("recordTime").innerText = '00:00:00';
        clearInterval(ri);
        ri = null;
        r.stop();
        r = null;
        t = 0;
    }

    playAudio(e){
        if(!e || !$(e.target).attr("entry")){
            ouSet('无效的音频文件');
            return;
        }
        this.startPlay($(e.target).attr("entry"));
    }

// 开始播放
startPlay(url){
	document.getElementById("play").style.display = 'block';
	var L = document.getElementById('progress').clientWidth;
	p = plus.audio.createPlayer(url);
	p.play(function(){
		//outLine('播放完成！');
		// 播放完成
		document.getElementById('playTime').innerText = timeToStr(d)+'/'+timeToStr(d);
		document.getElementById('schedule').style.webkitTransition = 'all 0.3s linear';
		document.getElementById('schedule').style.width = L+'px';
		this.stopPlay();
	}, function(e){
		//outLine('播放音频文件"'+url+'"失败：'+e.message);
	});
	// 获取总时长
	var d = p.getDuration();
	if(!d){
		document.getElementById('playTime').innerText = '00:00:00/'+timeToStr(d);
	}
	pi = setInterval(function(){
		if(!d){ // 兼容无法及时获取总时长的情况
			d = p.getDuration();
		}
		var c = p.getPosition();
		if(!c){  // 兼容无法及时获取当前播放位置的情况
			return;
		}
		document.getElementById('playTime').innerText = timeToStr(c)+'/'+timeToStr(d);
		var pct = Math.round(L*c/d);
		if(pct < 8){
			pct = 8;
		}
		document.getElementById('schedule').style.width = pct+'px';
	}, 1000);
}
// 停止播放
stopPlay(){
	clearInterval(pi);
	pi=null;
	setTimeout(this.resetPlay(), 500);
	// 操作播放对象
	if(p){
		p.stop();
		p=null;
	}
}
// 重置播放页面内容
resetPlay(){
	document.getElementById('play').style.display = 'none';
	document.getElementById('schedule').style.width = '8px';
	document.getElementById('schedule').style.webkitTransition = 'all 1s linear';
	document.getElementById('playTime').innerText = '00:00:00/00:00:00';	
}
cleanCurrentHistory(e){
    plus.io.resolveLocalFileSystemURL($(e.target).attr("entry"), function(entry){
            entry.remove();//删除指定录音文件
		}, function(e){
		outSet('Resolve "_doc/" failed: '+e.message);
    } );
    //删除对应的语音记录
    $.each(voiceRecords,function(index,object){
        if(object.props.entry == $(e.target).attr("entry"))
        {
            voiceRecords.splice(index,1);
            return false;
        }
    })
    this.setState({div:voiceRecords});

}
//打开取回的音频
dataURL2Audio(){
    var base64Str =sessionStorage.getItem("voiceBase64");
    voiceWrapperMethods.dataURL2Audio(base64Str,function(entry){
        var toURL = entry.toURL();
        //播放音频
        this.startPlay(toURL);
    }.bind(this))
}
//拍照
startTakePhoto(){
    this.setState({displayStateTypeWritting:"none"});
    this.setState({displayStateAlbum:"none"});
    this.setState({displayStatePhoto:"block"});
    this.setState({displayStateVoice:"none"});
    var cmr = plus.camera.getCamera();
    cmr.captureImage(function(p){
		plus.io.resolveLocalFileSystemURL(p, function(entry){
			this.createItemPhoto(entry);
		}, function(e){
			outLine('读取拍照文件错误：'+e.message);
		});
	}, function(e){
		//outLine('失败：'+e.message);
	}, {filename:'_doc/camera/',index:1});
}
createItemPhoto(entry) {
    let level2_2_1  =React.createElement("div",{key:voiceRecordsTime,className:"cleanCurrentHistory",entry:entry,onClick:this.cleanCurrentHistory.bind(this)},"");
    let level2_2  =React.createElement("div",{key:voiceRecordsTime+1,className:"cleanCurrentHistoryContain"},level2_2_1);
    let level2_1  =React.createElement("div",{key:voiceRecordsTime,className:"takePhoto"},"");
    let level1 = React.createElement("div",{key:voiceRecordsTime,entry:entry,className:"takePhotoHistory"},level2_1,level2_2);
    //保存语音记录
   /*  voiceRecords.push(level1);
    voiceRecordsTime++;
    this.setState({divTakePhoto:voiceRecords},()=>{ 
    })*/
}
//查看相册
startChoosePhoto(){
    this.setState({displayStateTypeWritting:"none"},()=>{
        this.setState({displayStatePhoto:"none"},()=>{
            this.setState({displayStateVoice:"none"},()=>{
                this.setState({displayStateAlbum:"block"},()=>{
                  //$(".am-image-picker-upload-btn").click(alert(555));
                  //alert($("#showAAA").html());
                  $("#showAAA").click();
                // this.refs.showAAA.click();
                });
            });
        });
    });
}
//输入文字
startWrite(){
    this.setState({displayStateTypeWritting:"block"});
    this.setState({displayStateAlbum:"none"});
    this.setState({displayStatePhoto:"none"});
    this.setState({displayStateVoice:"none"});
}
showAAA(){
    alert("showAAA");
}
    render(){
        return(
            <Router>
            <Flex direction="column" align="stretch" style={{height:"100%"}}>
                <Item style={{height:"55px",flexGrow:0}} id="countHeight">
                    <Flex direction="row" align="stretch" style={{height:"100%"}} className="indexCss2">
                        <Item>
                            <div className="indexCss1" onClick={this.goBack.bind(this)}>返回</div>
                        </Item> 
                        <Item className="indexCss3 itemMarginLeft">日常考核</Item> 
                        <Item className="itemMarginLeft">
                            <Flex direction="row" align="around" justify="end" className="indexCss4">
                                <Item style={{flexGrow:1}}>考核记录</Item>
                                <Icon type="right" onClick={this.goRecord.bind(this)}/>
                            </Flex>
                        </Item> 
                    </Flex>
                </Item>
                <DatePickerComponent/>
                
                <Item className="itemMarginLeft indexCss9" onClick={this.pickStudent.bind(this)}>
                    <Flex direction="row" align="stretch" style={{height:"100%"}}>
                        <Item style={{flexGrow:0,flexBasis:"80px"}}>
                            <Flex direction="row" align="center" justify="center" style={{height:"100%"}}>
                                <Item className="indexCss8"></Item>
                            </Flex>
                        </Item> 
                        <Item className="itemMarginLeft indexCss6">点击选择学生</Item> 
                        <Item className="itemMarginLeft" style={{flexGrow:0,flexBasis:"80px"}}>
                            <Flex direction="row" align="center" justify="end" className="indexCss7">
                                <Icon type="right"/>
                            </Flex>
                        </Item> 
                    </Flex>
                </Item>
                <Item className="itemMarginLeft indexCss11" onClick={this.pickCheck.bind(this)}>
                    <Flex direction="row" align="stretch" style={{height:"100%"}}>
                        <Item style={{flexGrow:0,flexBasis:"80px"}}>
                            <Flex direction="row" align="center" justify="center" style={{height:"100%"}}>
                                <Item className="indexCss10"></Item>
                            </Flex>
                        </Item> 
                        <Item className="itemMarginLeft indexCss6">点击选择考核项目</Item> 
                        <Item className="itemMarginLeft" style={{flexGrow:0,flexBasis:"80px"}}>
                            <Flex direction="row" align="center" justify="end" className="indexCss7">
                                <Icon type="right"/>
                            </Flex>
                        </Item> 
                    </Flex>
                </Item>
                <Item className="itemMarginLeft indexCss12">
                    <Flex direction="row" align="center" justify="around" style={{height:"100%"}}>
                        <div  className="indexCss13" onClick={this.startWrite.bind(this)}></div>
                        <div  className="indexCss14" onClick={this.startChoosePhoto.bind(this)}></div>
                        <div  className="indexCss15" onClick={this.startTakePhoto.bind(this)}></div>
                        <div  className="indexCss16" onClick={this.startRecord.bind(this)}></div>
                    </Flex>
                </Item>
                <Item id="typeWrite" className="itemMarginLeft" style={{flexGrow:1,display:this.state.displayStateTypeWritting}}>
                   
                </Item>
                <Item id="album" className="itemMarginLeft" style={{flexGrow:1,display:this.state.displayStateAlbum}}>
                <input type="file" id="input"/>
                <div id="showAAA" style={{width:"50px",height:"20px"}} onClick={this.showAAA.bind(this)}>showAAA</div>
                    <ImagePicker
                       /*  files={files} //图片
                        onChange={this.onChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={files.length < 5}
                        multiple={this.state.multiple} */
                    />
                </Item>
                <Item id="photo" className="itemMarginLeft" style={{flexGrow:1,display:this.state.displayStatePhoto}}>
                    {this.state.divTakePhoto}
                </Item>
                <Item id="voice" className="itemMarginLeft displayNone" style={{flexGrow:1,display:this.state.displayStateVoice}}>
                    <Flex id="ceshi" direction="column" align="stretch" style={{height:"100%"}}>
                        <div style={{width:"100px",height:"30px"}} onClick={this.dataURL2Audio.bind(this)}>播放取回来的音频</div>
                        {this.state.div}    
                    </Flex>
                </Item>
                <Item className="itemMarginLeft" style={{height:"47px",flexGrow:0}}>
                    <Flex direction="row" align="end" style={{height:"100%"}}>
                        <Item style={{flexGrow:1}}><Button type="primary">取消</Button></Item>
                        <Item className="itemMarginLeft" style={{flexGrow:1}}><Button type="primary" onClick={this.saveRecord.bind(this)}>保存</Button></Item>
                        <Item className="itemMarginLeft" style={{flexGrow:1}}><Button type="primary" onClick={this.submitRecord.bind(this)}>提交</Button></Item>
                    </Flex>
                </Item>
                <div id="record" className="recordPage">
                    <div style={{height:"20%",width:"100%"}}></div>
                    <div className="recordProgress"><div className="recordSchedule"></div></div>
                    <br/>
                    <div id="recordTime" className="recordTime">00:00:00</div><br/>
                    <div className="stop" onClick={this.stopRecord.bind(this)}></div>
		        </div>
                <div id="play" className="recordPage">
                    <div id="playTime" className="playTime">00:00:00/00:00:00</div><br/>
                    <div id="progress" className="progress"><div id="schedule" className="schedule"></div></div>
                    <br/>
                    <div className="stop" onClick={this.stopPlay.bind(this)}></div>
		        </div>
            </Flex>
            </Router>
        )
    }
}
