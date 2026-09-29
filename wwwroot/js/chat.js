(() => {
    const app = document.querySelector('[data-chat-app]');
    if (!app) return;

    const sidebar = app.querySelector('.sidebar');
    const panel = app.querySelector('.chat-panel');
    const conversations = [...app.querySelectorAll('[data-conversation]')];
    const messages = app.querySelector('[data-messages]');
    const input = app.querySelector('[data-message-input]');
    const composer = app.querySelector('[data-composer]');
    const send = composer.querySelector('.send-button');
    let activeId = 'elena';

    function selectConversation(button) {
        activeId = button.dataset.id;
        conversations.forEach(item => item.classList.toggle('active', item === button));
        app.querySelector('[data-chat-name]').textContent = button.dataset.name;
        app.querySelector('[data-chat-status]').textContent = button.dataset.online === 'true' ? 'Online now' : 'Last active recently';
        const avatar = app.querySelector('[data-chat-avatar]');
        avatar.childNodes[0].nodeValue = button.dataset.initials;
        avatar.className = `avatar ${button.dataset.accent}`;
        avatar.append(app.querySelector('[data-chat-presence]'));
        app.querySelectorAll('[data-message]').forEach(message => {
            message.hidden = message.dataset.conversationId !== activeId;
        });
        sidebar.classList.add('sidebar-hidden');
        panel.classList.add('chat-open');
    }

    conversations.forEach(button => button.addEventListener('click', () => selectConversation(button)));
    app.querySelector('[data-chat-back]').addEventListener('click', () => {
        sidebar.classList.remove('sidebar-hidden');
        panel.classList.remove('chat-open');
    });

    app.querySelector('[data-chat-search]').addEventListener('input', event => {
        const query = event.target.value.trim().toLowerCase();
        let visible = 0;
        conversations.forEach(item => {
            const matches = item.dataset.name.toLowerCase().includes(query);
            item.hidden = !matches;
            if (matches) visible++;
        });
        app.querySelector('[data-conversation-count]').textContent = visible;
    });

    input.addEventListener('input', () => {
        send.disabled = !input.value.trim();
        app.querySelector('[data-character-count]').textContent = `${input.value.length} / 2000`;
        input.style.height = '38px';
        input.style.height = `${Math.min(input.scrollHeight, 110)}px`;
        input.style.overflowY = input.scrollHeight > 110 ? 'auto' : 'hidden';
    });

    input.addEventListener('keydown', event => {
        if (event.key !== 'Enter' || event.shiftKey || !input.value.trim()) return;

        event.preventDefault();
        composer.requestSubmit();
    });

    composer.addEventListener('submit', event => {
        event.preventDefault();
        const body = input.value.trim();
        if (!body) return;

        const row = document.createElement('article');
        row.className = 'message-row mine';
        row.dataset.message = '';
        row.dataset.conversationId = activeId;
        const wrap = document.createElement('div');
        wrap.className = 'message-wrap';
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = body;
        const meta = document.createElement('div');
        meta.className = 'message-meta';
        meta.textContent = `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}  ✓`;
        wrap.append(bubble, meta);
        row.append(wrap);
        messages.append(row);
        input.value = '';
        input.dispatchEvent(new Event('input'));
        messages.scrollTop = messages.scrollHeight;
    });

    app.querySelector('[data-new-chat]').addEventListener('click', () => {
        const notice = app.querySelector('[data-chat-notice]');
        notice.textContent = 'Connect this action to your authorized user directory when the backend is ready.';
        notice.hidden = false;
    });
})();
