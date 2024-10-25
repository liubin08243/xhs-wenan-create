### 本项目主要功能是通过输入如小红书，抖音平台视频的URL，一键提取原视频文案，然后根据原视频文案完成二次创作生成新的视频文案。

### 本项目运行需要的工具：
1、coze：字节扣子平台，可以在平台上创建工作流，发布智能体。
2、cursor：一款AI编辑器，默认集成Claude-3.5-sonnet模型，最近编程体验下来越来越觉得强大。
3、微信开发者工具：cursor创建完的微信小程序应用，直接在开发者工具调试，超级丝滑。🎯AI编程太神奇了，AI时代人人至少要成为"赤脚程序员"，你也赶紧去试试吧

### 本项目代码下载后的准备：
1、安装coze，注册账号，创建工作流，创建智能体。
2、安装cursor，注册账号，创建微信小程序应用。
3、下载本项目代码，在微信开发者工具中导入本项目代码。
4、修改videoCreation.js文件，替换自己的Authorization。

 wx.request({
      url: 'https://api.coze.cn/v1/workflow/run',
      method: 'POST',
      header: {
        'Authorization': 'Bearer pat_b9dvoSR1xw74uxSRLrnBwp2up3zzLz0oW6WkmtL4laBuCCtzjNIIiAtd3ZJV23Wi',
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Host': 'api.coze.cn',
        'Connection': 'keep-alive'
      },
      data: {
        workflow_id: '7392555099266252815', 
        parameters: {
          URL: this.data.videoUrl
        }
      },
      success: this.handleSuccess.bind(this),
      fail: this.handleFail.bind(this),
      complete: this.handleComplete.bind(this)
    });
    
5、在微信开发者工具中，进项调试。