Page({
  data: {
    videoUrl: '',
    result: '',
    isLoading: false,
    debugUrl: ''
  },

  onInputChange: function(e) {
    this.setData({
      videoUrl: e.detail.value
    });
  },

  onCreateClick: function() {
    if (!this.data.videoUrl) {
      wx.showToast({
        title: '请输入视频URL',
        icon: 'none'
      });
      return;
    }

    // 移除 URL 校验，只检查长度
    if (this.data.videoUrl.length > 2000) {
      wx.showToast({
        title: 'URL 长度不能超过 2000 字符',
        icon: 'none'
      });
      return;
    }

    this.setData({ isLoading: true, result: '' });

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
        workflow_id: '7392555099266252815', // 请确认这是正确的工作流ID
        parameters: {
          URL: this.data.videoUrl
        }
      },
      success: this.handleSuccess.bind(this),
      fail: this.handleFail.bind(this),
      complete: this.handleComplete.bind(this)
    });
  },

  handleSuccess: function(res) {
    console.log('Full API response:', JSON.stringify(res, null, 2));
    if (res.statusCode === 200) {
      if (res.data.code === 0) {
        let result;
        try {
          const parsedData = JSON.parse(res.data.data);
          if (parsedData.data) {
            // 格式化显示 data 中的内容
            result = this.formatResult(parsedData.data);
          } else {
            result = '返回的数据格式不正确';
          }
        } catch (error) {
          console.error('解析结果时出错:', error);
          result = '解析结果时出错';
        }
        this.setData({ result: result });
        console.log('Debug URL:', res.data.debug_url);
        this.setData({ debugUrl: res.data.debug_url });
      } else {
        this.setData({ result: '错误: ' + res.data.msg });
      }
    } else {
      this.setData({ result: '服务器响应异常: ' + res.statusCode });
    }
  },

  handleFail: function(err) {
    console.error('API调用失败', err);
    this.setData({ result: '错误: API 调用失败' });
    wx.showToast({
      title: '网络错误,请重试',
      icon: 'none'
    });
  },

  handleComplete: function() {
    console.log('Request completed');
    this.setData({ isLoading: false });
  },

  copyResult: function() {
    if (this.data.result) {
      wx.setClipboardData({
        data: this.data.result,
        success: function(res) {
          wx.showToast({
            title: '复制成功',
            icon: 'success',
            duration: 2000
          });
        },
        fail: function(res) {
          wx.showToast({
            title: '复制失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    } else {
      wx.showToast({
        title: '没有可复制的内容',
        icon: 'none',
        duration: 2000
      });
    }
  },

  formatResult: function(data) {
    // 将数据按换行符分割成数组
    const lines = data.split('\n');
    // 使用 reduce 方法来格式化每一行
    return lines.reduce((formatted, line) => {
      // 如果是标题行，添加额外的换行
      if (line.startsWith('1.') || line.startsWith('2.')) {
        return formatted + '\n' + line + '\n';
      }
      // 如果是子项，添加缩进
      if (line.startsWith('    -')) {
        return formatted + '  ' + line + '\n';
      }
      // 其他行直接添加
      return formatted + line + '\n';
    }, '').trim(); // 使用 trim() 移除开头和结尾的空白字符
  }
});
