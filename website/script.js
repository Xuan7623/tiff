function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user-message');
        input.value = '';
        
        // 模擬AI回應
        setTimeout(() => {
            const responses = [
                '很高興認識你！',
                '這是個有趣的話題呢！',
                '謝謝你的分享！',
                '我完全理解你的想法。',
                '讓我們繼續討論這個話題吧！'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'ai-message');
        }, 1000);
    }
}

function addMessage(text, className) {
    const messagesDiv = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    messageElement.textContent = text;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// 按下 Enter 鍵也可以發送訊息
document.getElementById('message-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}); 