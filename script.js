// 聊天相關功能
class ChatSystem {
    constructor() {
        this.chatBox = document.querySelector('.chat-box');
        this.chatButton = document.querySelector('.chat-button');
        this.responses = [
            "您好！想了解哪種鉤織作品的製作方法呢？",
            "需要我為您推薦適合初學者的毛線嗎？",
            "我可以為您介紹一些基礎的鉤針使用技巧。",
            "有興趣學習如何製作可愛的玩偶嗎？",
            "需要了解更多關於鉤織工具的選擇建議嗎？"
        ];
        this.initializeChat();
    }

    initializeChat() {
        this.chatButton.addEventListener('click', () => this.startChat());
    }

    startChat() {
        const response = this.responses[Math.floor(Math.random() * this.responses.length)];
        this.addMessage(response);
    }

    addMessage(text) {
        const messageElement = document.createElement('p');
        messageElement.textContent = text;
        messageElement.classList.add('chat-message');
        this.chatBox.appendChild(messageElement);
        this.chatBox.scrollTop = this.chatBox.scrollHeight;
    }
}

// 搜索功能
class SearchSystem {
    constructor() {
        this.searchInput = document.querySelector('.search-bar input');
        this.searchButton = document.querySelector('.search-bar button');
        this.initializeSearch();
    }

    initializeSearch() {
        this.searchButton.addEventListener('click', (e) => this.handleSearch(e));
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch(e);
            }
        });
    }

    handleSearch(e) {
        e.preventDefault();
        const searchTerm = this.searchInput.value.trim();
        if (searchTerm) {
            // 這裡可以添加實際的搜索邏輯
            alert(`正在搜索: ${searchTerm}`);
            this.searchInput.value = '';
        }
    }
}

// 導航欄效果
class Navigation {
    constructor() {
        this.header = document.querySelector('header');
        this.initializeNavigation();
    }

    initializeNavigation() {
        // 平滑滾動
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });

        // 滾動效果
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }
}

// 產品卡片動畫
class ProductCards {
    constructor() {
        this.cards = document.querySelectorAll('.tutorial-card');
        this.initializeObserver();
    }

    initializeObserver() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        this.cards.forEach(card => observer.observe(card));
    }
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    new ChatSystem();
    new SearchSystem();
    new Navigation();
    new ProductCards();
}); 