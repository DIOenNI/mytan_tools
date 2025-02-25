MyTan 补全计划：字数统计

![image](https://github.com/user-attachments/assets/ed8bc29d-1127-426e-b444-03b075e6cc41) ![image](https://github.com/user-attachments/assets/9ba38a99-a604-414f-b239-ee20dee6538b)


一个为 MyTan Web 端添加字数统计功能的用户脚本，让您在输入时实时了解文本字数。

预览图

✨ 功能特点
在输入框右上角实时显示字数统计
完全可自定义的外观设置
简洁直观的设置面板
轻量级设计，不影响网站性能
设置自动保存，无需重复配置

📋 安装指南
首先安装一个用户脚本管理器：
[Tampermonkey](https://www.tampermonkey.net/) (推荐)

安装本脚本：
点击这里安装https://github.com/DIOenNI/mytan_tools/raw/main/mytan_counter.user.js

或者复制脚本代码到您的用户脚本管理器中手动创建
访问 MyTan 网站，字数统计功能将自动启用

🎨 自定义设置
点击页面右下角的 ⚙️ 图标打开设置面板，可以自定义以下选项：

文字颜色：统计器文字的颜色
背景颜色：统计器背景色
透明度：控制统计器的透明度
字体大小：可选小、中、大三种尺寸
设置面板背景色：自定义设置面板的背景颜色
所有设置会自动保存到本地存储，下次访问时自动应用。

🔧 技术实现
使用 MutationObserver 监听页面变化，确保在动态加载内容时统计器正常工作
采用防抖技术优化输入时的性能
本地存储 (localStorage) 保存用户配置
纯 JavaScript 实现，无外部依赖

🔄 更新日志
0.1.0 (初始版本)
实现基本的字数统计功能
添加可自定义的外观设置
设置面板实时预览

🤝 贡献
欢迎提交 Issues 或 Pull Requests 来帮助改进这个脚本！

📜 许可证
本项目采用 MIT 许可证。

🙏 致谢
感谢 LC 提供的灵感
感谢所有提供反馈和建议的用户
