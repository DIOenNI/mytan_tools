// ==UserScript==
// @name         MyTan 补全计划：字数统计
// @namespace    https://github.com/DIOenNI/mytan_tools/
// @version      0.1.0
// @description  在 MyTan Web 端对话框右上角添加字数统计功能
// @author       K (借鉴自LC https://lcwebsite.cn/web/)
// @match        https://mytan.maiseed.com.cn/*
// @icon         https://mytan.maiseed.com.cn/assets/single-logo.png
// @grant        none
// @license      MIT
// ==/UserScript==

"use strict";

(function () {
    // 默认样式配置
    let config = {
        textColor: '#666',           // 文字颜色 - 可自定义统计器文字的颜色
        backgroundColor: '#f0f0f0',  // 背景颜色 - 统计器背景色，建议使用浅色以保持可读性
        opacity: 0.85,               // 透明度 (0-1) - 控制统计器的透明度，1为不透明
        fontSize: '12px',            // 字体大小 - 统计器文字大小，可选小(10px)、中(12px)、大(14px)
        padding: '3px 8px',          // 内边距 - 统计器内部文字与边框的距离
        borderRadius: '4px',         // 圆角 - 统计器边角的圆滑程度
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', // 阴影效果 - 给统计器添加立体感
        position: {                  // 位置设置 - 控制统计器在输入框中的位置
            top: '5px',              // 顶部距离 - 距离输入框顶部的像素值
            right: '15px'            // 右侧距离 - 距离输入框右侧的像素值
        },
        panelBgColor: '#ffffff'      // 设置面板背景色 - 控制设置面板的背景颜色
    };

    // 加载用户配置
    try {
        const saved = localStorage.getItem('mytan-counter-config');
        if (saved) config = {...config, ...JSON.parse(saved)};
    } catch (e) { console.error('加载配置失败:', e); }

    // 防抖函数
    const debounce = (fn, delay) => {
        let timer = null;
        return function() {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, arguments), delay);
        };
    };

    // 初始化字数统计
    function initCharCounter() {
        const textarea = document.querySelector('textarea');
        if (!textarea) return;

        const container = textarea.closest('.textarea-container') ||
                         textarea.closest('.input-container') ||
                         textarea.parentElement;
        if (!container) return;
        if (document.getElementById('mytan-char-counter')) return;

        if (getComputedStyle(container).position === 'static') {
            container.style.position = 'relative';
        }

        const counter = document.createElement('div');
        counter.id = 'mytan-char-counter';
        applyStyles(counter);
        container.appendChild(counter);

        const updateCount = () => counter.textContent = `${textarea.value.length} 字`;
        textarea.addEventListener('input', debounce(updateCount, 100));
        updateCount();
    }

    // 应用样式
    function applyStyles(el) {
        el.style.cssText = `
            position: absolute;
            top: ${config.position.top};
            right: ${config.position.right};
            font-size: ${config.fontSize};
            color: ${config.textColor};
            background-color: ${config.backgroundColor};
            opacity: ${config.opacity};
            padding: ${config.padding};
            border-radius: ${config.borderRadius};
            box-shadow: ${config.boxShadow};
            pointer-events: none;
            z-index: 1000;
            transition: all 0.2s ease;
        `;
    }

    // 创建设置面板
    function createSettingsPanel() {
        if (document.getElementById('mytan-counter-settings')) return;

        // 设置按钮
        const btn = document.createElement('button');
        btn.id = 'mytan-counter-settings-btn';
        btn.innerHTML = '⚙️';
        btn.title = '字数统计设置';
        btn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #fff;
            border: 1px solid #ddd;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            cursor: pointer;
            z-index: 10000;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        document.body.appendChild(btn);

        // 设置面板
        const panel = document.createElement('div');
        panel.id = 'mytan-counter-settings';
        updatePanelStyle(panel);

        panel.innerHTML = `
            <h3 style="margin-top: 0; margin-bottom: 10px; font-size: 14px;">字数统计设置</h3>

            <div style="margin-bottom: 8px;">
                <label style="display: block; margin-bottom: 3px; font-size: 12px;">文字颜色</label>
                <input type="color" id="mytan-text-color" value="${config.textColor}" style="width: 60px; height: 25px;">
            </div>

            <div style="margin-bottom: 8px;">
                <label style="display: block; margin-bottom: 3px; font-size: 12px;">背景颜色</label>
                <input type="color" id="mytan-bg-color" value="${config.backgroundColor}" style="width: 60px; height: 25px;">
            </div>

            <div style="margin-bottom: 8px;">
                <label style="display: block; margin-bottom: 3px; font-size: 12px;">透明度: <span id="opacity-value">${config.opacity}</span></label>
                <input type="range" id="mytan-opacity" min="0" max="1" step="0.05" value="${config.opacity}" style="width: 100%;">
            </div>

            <div style="margin-bottom: 8px;">
                <label style="display: block; margin-bottom: 3px; font-size: 12px;">字体大小</label>
                <select id="mytan-font-size" style="width: 60px; height: 25px;">
                    <option value="10px" ${config.fontSize === '10px' ? 'selected' : ''}>小</option>
                    <option value="12px" ${config.fontSize === '12px' ? 'selected' : ''}>中</option>
                    <option value="14px" ${config.fontSize === '14px' ? 'selected' : ''}>大</option>
                </select>
            </div>

            <div style="margin-bottom: 8px;">
                <label style="display: block; margin-bottom: 3px; font-size: 12px;">设置面板背景色</label>
                <input type="color" id="mytan-panel-bg-color" value="${config.panelBgColor}" style="width: 60px; height: 25px;">
            </div>

            <div style="text-align: right; margin-top: 10px;">
                <button id="mytan-settings-save" style="padding: 4px 8px; background: #4CAF50; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px;">保存</button>
                <button id="mytan-settings-cancel" style="padding: 4px 8px; background: #f44336; color: white; border: none; border-radius: 3px; margin-left: 5px; cursor: pointer; font-size: 12px;">取消</button>
            </div>
        `;

        document.body.appendChild(panel);

        // 更新面板样式函数
        function updatePanelStyle(panelElement) {
            panelElement.style.cssText = `
                position: fixed;
                bottom: 65px;
                right: 20px;
                width: 200px;
                background: ${config.panelBgColor};
                border: 1px solid #ddd;
                border-radius: 6px;
                box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                padding: 10px;
                z-index: 10000;
                display: none;
                font-size: 12px;
            `;
        }

        // 事件绑定
        btn.addEventListener('click', () => {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        });

        const opacitySlider = document.getElementById('mytan-opacity');
        const opacityValue = document.getElementById('opacity-value');
        opacitySlider.addEventListener('input', () => {
            opacityValue.textContent = opacitySlider.value;
        });

        // 面板背景色预览
        const panelBgColorInput = document.getElementById('mytan-panel-bg-color');
        panelBgColorInput.addEventListener('input', () => {
            panel.style.backgroundColor = panelBgColorInput.value;
        });

        document.getElementById('mytan-settings-save').addEventListener('click', () => {
            config.textColor = document.getElementById('mytan-text-color').value;
            config.backgroundColor = document.getElementById('mytan-bg-color').value;
            config.opacity = parseFloat(document.getElementById('mytan-opacity').value);
            config.fontSize = document.getElementById('mytan-font-size').value;
            config.panelBgColor = document.getElementById('mytan-panel-bg-color').value;

            localStorage.setItem('mytan-counter-config', JSON.stringify(config));

            const counter = document.getElementById('mytan-char-counter');
            if (counter) applyStyles(counter);

            updatePanelStyle(panel);
            panel.style.display = 'none';
        });

        document.getElementById('mytan-settings-cancel').addEventListener('click', () => {
            panel.style.display = 'none';
            // 恢复原来的面板背景色
            panel.style.backgroundColor = config.panelBgColor;
        });
    }

    // 设置观察器
    function setupObserver() {
        const observer = new MutationObserver(() => {
            if (!document.getElementById('mytan-char-counter')) {
                initCharCounter();
            }
        });

        const targetNode = document.querySelector('.chat-container') ||
                          document.querySelector('.conversation-container') ||
                          document.body;

        observer.observe(targetNode, {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false
        });

        return observer;
    }

    // 初始化
    window.addEventListener('load', () => {
        initCharCounter();
        setupObserver();
        createSettingsPanel();
    });

    // 立即尝试初始化
    initCharCounter();
    setupObserver();
    createSettingsPanel();
})();
