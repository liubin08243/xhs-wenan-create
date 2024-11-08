# 视频文案一键生成微信小程序项目

## 项目简介
本项目可以通过输入小红书、抖音等平台的视频 URL，一键提取原视频文案，并利用 AI 进行二次创作，生成全新的视频文案。

## 项目说明
本项目是可以直接发布微信小程序提供给他人使用的，但是因为涉及到API KEY调用产生费用，所以目前没有商业化打算，只供大家学习使用。大家可以利用这个项目打造自己的私人微信小程序，满足自己的需求。

## 工具及环境准备
1. **Coze (字节扣子平台)**
   - 用于创建工作流
   - 发布智能体
   - coze官网地址：https://coze.cn/
   - 本期视频用到的工作流地址：https://www.coze.cn/work_flow?space_id=7372453085525999668&workflow_id=7392555099266252815。代码中无需改动直接可调用。
   - 由于目前coze官方赞不支持发布工作流，所以可以先使用我的工作流，或者参考我的工作流自己创建。待后续coze官方放开发布权限后，我将发布工作流到模板商店，大家可以进行复制二创。
   - ![alt text](/readme/image.png)

2. **Cursor**
   - AI 驱动的代码编辑器
   - 默认集成 Claude-3.5-sonnet 模型
   - 强大的 AI 编程体验
   - 下载地址：https://www.cursor.com

3. **微信开发者工具**
   - 用于调试微信小程序
   - 与 Cursor 完美配合
   - 提供流畅的开发体验
   - 下载地址：https://developers.weixin.qq.com/miniprogram/dev/devtools/stable.html

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
![alt text](/readme/image-1.png)

3、调试完成后，可以部署到微信小程序平台。
如何上传到微信小程序平台查看我的视频：66 【cursor AI微信小程序开发&发布到小程序平台 - 刘大大AI | 小红书 - 你的生活指南】 😆 LNlgwea0wZ4MFZu 😆 https://www.xiaohongshu.com/discovery/item/6710f6d500000000210009a0?source=webshare&xhsshare=pc_web&xsec_token=AB1GoHiL47irNDrr9hMDFOkuBZHpGu1I7PNVzYJmaf_aI=&xsec_source=pc_share

更多问题请参考官方文档：https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html


4、以上调试使用过程中，如有任何问题或建议，请发送我的邮箱：liudada@aiwfy.com。 
