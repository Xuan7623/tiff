// 聊天記錄數組
let chatHistory = [];

// API 配置
const API_URL = 'https://free.v36.cm';
const API_KEY = 'sk-OhaHI8DbzGFFbnAW5c909e9b44C746Af9f8aC81e34E1Dc60';

// 初始化聊天界面
window.onload = function() {
    // 為輸入框添加回車鍵監聽
    document.getElementById('message-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
};

// 發送消息函數
async function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (message === '') return;

    // 添加用戶消息到聊天界面
    addMessageToChat('user', message);
    messageInput.value = '';

    try {
        // 顯示正在輸入提示
        addMessageToChat('assistant', '正在思考...');
        
        // 調用 API
        const response = await fetch(`${API_URL}/v1/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: '你是一個友善的助手，可以用中文回答問題。'
                    },
                    ...chatHistory,
                    {
                        role: 'user',
                        content: message
                    }
                ]
            })
        });

        const data = await response.json();
        
        // 移除"正在思考..."消息
        removeLastMessage();

        // 獲取 AI 回覆
        const aiResponse = data.choices[0].message.content;
        
        // 添加到聊天記錄
        chatHistory.push(
            { role: 'user', content: message },
            { role: 'assistant', content: aiResponse }
        );

        // 顯示 AI 回覆
        addMessageToChat('assistant', aiResponse);

    } catch (error) {
        console.error('Error:', error);
        removeLastMessage();
        addMessageToChat('assistant', '抱歉，發生錯誤，請稍後再試。');
    }
}

// 添加消息到聊天界面
function addMessageToChat(role, content) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;
    messageDiv.textContent = content;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 移除最後一條消息
function removeLastMessage() {
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages.lastChild) {
        chatMessages.removeChild(chatMessages.lastChild);
    }
} 