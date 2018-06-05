
'use strict';
exports.__esModule = true;

var voiceWrapperMethods = {
        /**
     * base64字符串转成语音文件(参考http://ask.dcloud.net.cn/question/16935)
     * @param {Object} base64Str
     * @param {Object} callback
     */
     dataURL2Audio :function dataURL2Audio(base64Str,callback){
        var base64Str = base64Str.replace('data:audio/vnd.wave;base64,','');
        var audioName = (new Date()).valueOf() + '.wav';
        plus.io.requestFileSystem(plus.io.PRIVATE_DOC,function(fs){
            fs.root.getFile(audioName,{create:true},function(entry){
                // 获得平台绝对路径
                var fullPath = entry.fullPath;
                if(isAndroid){  
                    // 读取音频
                    var Base64 = plus.android.importClass("android.util.Base64");
                    var FileOutputStream = plus.android.importClass("java.io.FileOutputStream");
                    try{
                        var out = new FileOutputStream(fullPath);
                        var bytes = Base64.decode(base64Str, Base64.DEFAULT);
                        out.write(bytes); 
                        out.close();
                        // 回调
                        callback && callback(entry);
                    }catch(e){
                        console.log(e.message);
                    }
                }else if(isiOS){
                    var NSData = plus.ios.importClass('NSData');
                    var nsData = new NSData();
                    nsData = nsData.initWithBase64EncodedStringoptions(base64Str,0);
                    if (nsData) {
                        nsData.plusCallMethod({writeToFile: fullPath,atomically:true});
                        plus.ios.deleteObject(nsData);
                    }
                    // 回调
                    callback && callback(entry);
                }
            })
        })
   }
 
}
exports.default  = voiceWrapperMethods;