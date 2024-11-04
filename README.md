# 视频文案一键生成工具

## 项目简介
本项目可以通过输入小红书、抖音等平台的视频 URL，一键提取原视频文案，并利用 AI 进行二次创作，生成全新的视频文案。

## 必需工具
1. **Coze (字节扣子平台)**
   - 用于创建工作流
   - 发布智能体

2. **Cursor**
   - AI 驱动的代码编辑器
   - 默认集成 Claude-3.5-sonnet 模型
   - 强大的 AI 编程体验

3. **微信开发者工具**
   - 用于调试微信小程序
   - 与 Cursor 完美配合
   - 提供流畅的开发体验

## 项目配置步骤

### 1. 配置 Authorization
在 `videoCreation.js` 文件中，替换为你自己的 Authorization：

```javascript
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
```   
2、在微信开发者工具中，进项调试。
