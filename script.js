document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const chatList = document.getElementById('chat-list');
    const chatWindow = document.getElementById('chat-window');
    const chatPlaceholder = document.getElementById('chat-placeholder');
    const messageList = document.getElementById('message-list');
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const searchInput = document.getElementById('search-input');
    const chatContactName = document.getElementById('chat-contact-name');

    const chats = [{
            id: 1,
            name: 'John Doe',
            lastMessage: 'Hey, how are you?',
            time: '10:30 AM'
        },
        {
            id: 2,
            name: 'Jane Smith',
            lastMessage: 'Remember the meeting at 2 PM',
            time: 'Yesterday'
        },
        {
            id: 3,
            name: 'Bob Johnson',
            lastMessage: 'Can you send me the report?',
            time: 'Tuesday'
        },
    ];

    let selectedChat = null;
    let messages = {};

    function renderChatList(chats) {
        chatList.innerHTML = '';
        chats.forEach(chat => {
            const chatItem = document.createElement('div');
            chatItem.classList.add('chat-item');
            chatItem.innerHTML = `
                <div class="avatar"></div>
                <div class="chat-item-content">
                    <div class="chat-item-header">
                        <span class="chat-item-name">${chat.name}</span>
                        <span class="chat-item-time">${chat.time}</span>
                    </div>
                    <div class="chat-item-last-message">${chat.lastMessage}</div>
                </div>
            `;
            chatItem.addEventListener('click', () => selectChat(chat));
            chatList.appendChild(chatItem);
        });
    }

    function selectChat(chat) {
        selectedChat = chat;
        chatContactName.textContent = chat.name;
        chatPlaceholder.classList.add('hidden');
        chatWindow.classList.remove('hidden');
        renderMessages();

        if (window.innerWidth <= 768) {
            document.querySelector('.chat-list-container').style.display = 'none';
            document.querySelector('.chat-window-container').style.display = 'flex';
        }
    }

    function renderMessages() {
        messageList.innerHTML = '';
        if (!messages[selectedChat.id]) {
            messages[selectedChat.id] = [];
        }
        messages[selectedChat.id].forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', message.sender === 'me' ? 'sent' : 'received');
            messageElement.innerHTML = `
                ${message.text}
                <span class="message-time">${message.time}</span>
            `;
            messageList.appendChild(messageElement);
        });
        messageList.scrollTop = messageList.scrollHeight;
    }

    function addMessage(text, sender) {
        if (!messages[selectedChat.id]) {
            messages[selectedChat.id] = [];
        }
        messages[selectedChat.id].push({
            text,
            sender,
            time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })
        });
        renderMessages();
    }

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageText = messageInput.value.trim();
        if (messageText && selectedChat) {
            addMessage(messageText, 'me');
            messageInput.value = '';
            // Simulate received message
            setTimeout(() => {
                addMessage('This is a simulated response.', 'them');
            }, 1000);
        }
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredChats = chats.filter(chat =>
            chat.name.toLowerCase().includes(searchTerm) ||
            chat.lastMessage.toLowerCase().includes(searchTerm)
        );
        renderChatList(filteredChats);
    });

    renderChatList(chats);
});