let goals = [];

let currentTheme = 'light';
let selectedEmoji = 'target';
let currentSort = 'default';
let goalType = 'numeric';
let editingGoalId = null;

const iconSvgs = {
    book: '<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z"/></svg>',
    dumbbell: '<svg viewBox="0 0 24 24"><path d="M14.4 14.4 9.6 9.6M18.657 21.485c1.886-1.886 1.886-4.943 0-6.829l-1.414-1.414c-1.886-1.886-4.943-1.886-6.829 0l-1.414 1.414c-1.886 1.886-1.886 4.943 0 6.829l1.414 1.414c1.886 1.886 4.943 1.886 6.829 0l1.414-1.414ZM8.586 8.586c1.886-1.886 1.886-4.943 0-6.829L7.172.343c-1.886-1.886-4.943-1.886-6.829 0L-.071 1.757c-1.886 1.886-1.886 4.943 0 6.829l1.414 1.414c1.886 1.886 4.943 1.886 6.829 0l1.414-1.414Z"/></svg>',
    piggy: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"/><path d="M20 10c0-.5-.5-1-1-1h-2.5c-1-.5-2.5-1-4.5-1s-3.5.5-4.5 1H5c-.5 0-1 .5-1 1v4c0 .5.5 1 1 1h2.5c1 .5 2.5 1 4.5 1s3.5-.5 4.5-1H19c.5 0 1-.5 1-1v-4Zm-8 7v3m0-16v3"/></svg>',
    run: '<svg viewBox="0 0 24 24"><circle cx="13" cy="5" r="1"/><path d="m17 22-1-9 3-1-1-4-3 1-2-3-2 2-3-2v5l3 3-2 7"/></svg>',
    palette: '<svg viewBox="0 0 24 24"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
    music: '<svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13M9 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3Zm12-2c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3Z"/></svg>',
    apple: '<svg viewBox="0 0 24 24"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06ZM10 2c1 .5 2 2 2 5-1.5 0-3-2-3-5h1Z"/></svg>',
    laptop: '<svg viewBox="0 0 24 24"><rect width="16" height="10" x="4" y="3" rx="2"/><path d="M8 21h8m-10 0h12"/></svg>',
    plane: '<svg viewBox="0 0 24 24"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
    sprout: '<svg viewBox="0 0 24 24"><path d="M12 22v-5M12 17c-1-3-5-5-9-5 0 5 4 9 9 9Zm0 0c1-3 5-5 9-5 0 5-4 9-9 9Zm3-14c0-5-4-5-4-5s-4 0-4 5c0 2 1 3 2 3 2 0 2-2 2-2s0 2 2 2c1 0 2-1 2-3z"/></svg>',
    star: '<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    flame: '<svg viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
    bulb: '<svg viewBox="0 0 24 24"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6m-7 4h8a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2Z"/></svg>',
    graduate: '<svg viewBox="0 0 24 24"><path d="m22 10-10-5L2 10l10 5 10-5z"/><path d="m6 12 4 2 4-2v4.7c0 .2-.1.4-.2.6L12 21l-1.8-1.7c-.1-.2-.2-.4-.2-.6V14z"/></svg>',
    trophy: '<svg viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6m12 5h1.5a2.5 2.5 0 0 0 0-5H18M6 9v5a6 6 0 0 0 12 0V9M6 9h12m-6 12v-3m-4 3h8"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
    coffee: '<svg viewBox="0 0 24 24"><path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8zm7-6v3m-4-3v3m8-3v3"/></svg>',
    target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    home: '<svg viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>',
    yoga: '<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6m-6-8 6 2m-4-4V7l2-3 2 3v3"/></svg>',
    pen: '<svg viewBox="0 0 24 24"><path d="M12 19.5v-15m3 3-3-3-3 3m-5 15h16"/></svg>',
    game: '<svg viewBox="0 0 24 24"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="8" cy="12" r="1"/><path d="m15.5 11 .5-1 .5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5z"/></svg>',
    chef: '<svg viewBox="0 0 24 24"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><path d="M6 17h12"/></svg>',
    bike: '<svg viewBox="0 0 24 24"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>'
};

function initEmojiPicker() {
    const picker = document.getElementById('emoji-picker');
    picker.innerHTML = '';
    Object.keys(iconSvgs).forEach(iconName => {
        const option = document.createElement('div');
        option.className = 'emoji-option';
        option.innerHTML = iconSvgs[iconName];
        option.onclick = () => selectEmoji(iconName);
        picker.appendChild(option);
    });
}

function selectEmoji(iconName) {
    selectedEmoji = iconName;
    document.querySelectorAll('.emoji-option').forEach((opt, index) => {
        opt.classList.remove('selected');
        if (Object.keys(iconSvgs)[index] === iconName) {
            opt.classList.add('selected');
        }
    });
}

function selectGoalType(type) {
    goalType = type;
    document.getElementById('type-numeric').classList.toggle('selected', type === 'numeric');
    document.getElementById('type-checklist').classList.toggle('selected', type === 'checklist');
    document.getElementById('numeric-fields').style.display = type === 'numeric' ? 'block' : 'none';
}

function changeTheme(theme) {
    currentTheme = theme;
    document.body.className = `theme-${theme}`;
    
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.theme-btn.theme-${theme}`).classList.add('active');
}

function getProgressBadge(percentage) {
    if (percentage === 100) return '🎉 완료!';
    if (percentage >= 90) return '🔥 거의 다 왔어요!';
    if (percentage >= 75) return '💪 화이팅!';
    if (percentage >= 50) return '✨ 절반 통과!';
    if (percentage >= 25) return '🌱 좋은 시작!';
    return '📍 시작 단계';
}

function calculateProgress(goal) {
    if (goal.type === 'checklist') {
        if (!goal.subtasks || goal.subtasks.length === 0) return 0;
        const completed = goal.subtasks.filter(st => st.completed).length;
        return Math.round((completed / goal.subtasks.length) * 100);
    } else {
        return Math.round((goal.current / goal.target) * 100);
    }
}

function updateSummary() {
    const total = goals.length;
    const completed = goals.filter(g => calculateProgress(g) >= 100).length;
    document.getElementById('total-goals').textContent = `목표 ${total}개`;
    document.getElementById('completed-goals').textContent = `완료 ${completed}개`;
}

function toggleSortDropdown() {
    const dropdown = document.getElementById('sort-dropdown');
    dropdown.classList.toggle('active');
}

function sortGoals(type, label) {
    currentSort = type;
    document.getElementById('sort-label').textContent = `정렬: ${label}`;
    document.getElementById('sort-dropdown').classList.remove('active');

    if (type === 'progress') {
        goals.sort((a, b) => calculateProgress(b) - calculateProgress(a));
    } else if (type === 'name') {
        goals.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        goals.sort((a, b) => a.id - b.id);
    }
    renderGoals();
}

function showCelebration() {
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    celebration.textContent = '🎉';
    document.body.appendChild(celebration);
    setTimeout(() => celebration.remove(), 1000);
}

function toggleStats(goalId) {
    const detail = document.getElementById(`stats-detail-${goalId}`);
    if (detail) {
        detail.classList.toggle('active');
    }
}

function toggleSubtasks(goalId) {
    const section = document.getElementById(`subtasks-${goalId}`);
    if (section) {
        section.classList.toggle('hidden');
    }
}

function toggleSubtask(goalId, subtaskId) {
    const goal = goals.find(g => g.id === goalId);
    if (goal && goal.subtasks) {
        const subtask = goal.subtasks.find(st => st.id === subtaskId);
        if (subtask) {
            const oldProgress = calculateProgress(goal);
            subtask.completed = !subtask.completed;
            const newProgress = calculateProgress(goal);
            
            if (oldProgress < 100 && newProgress >= 100) {
                showCelebration();
            }
            renderGoals();
        }
    }
}

function deleteSubtask(goalId, subtaskId) {
    const goal = goals.find(g => g.id === goalId);
    if (goal && goal.subtasks) {
        goal.subtasks = goal.subtasks.filter(st => st.id !== subtaskId);
        renderGoals();
    }
}

function addSubtask(goalId) {
    const input = document.getElementById(`subtask-input-${goalId}`);
    const text = input.value.trim();
    
    if (text) {
        const goal = goals.find(g => g.id === goalId);
        if (goal) {
            if (!goal.subtasks) goal.subtasks = [];
            goal.subtasks.push({
                id: Date.now(),
                text: text,
                completed: false
            });
            input.value = '';
            renderGoals();
        }
    }
    function renderGoals() {
    const container = document.getElementById('goals-container');
    container.innerHTML = '';

    goals.forEach(goal => {
        const percentage = calculateProgress(goal);
        const badge = getProgressBadge(percentage);
        const isCompleted = percentage >= 100;
        
        const card = document.createElement('div');
        card.className = `goal-card ${isCompleted ? 'completed' : ''}`;
        
        let content = `
            <div class="goal-header">
                <div class="goal-title-area">
                    <span class="goal-emoji">${iconSvgs[goal.emoji]}</span>
                    <div class="goal-info">
                        <div class="goal-title-row">
                            <div class="goal-title">${goal.name}</div>
                            <div class="progress-badge">${badge}</div>
                        </div>
                    </div>
                </div>
                <div class="goal-actions">
                    ${goal.type === 'checklist' ? `<button class="toggle-subtasks-btn" onclick="toggleSubtasks(${goal.id})">📋</button>` : ''}
                    <div class="goal-percentage">${percentage}%</div>
                    <button class="edit-btn" onclick="editGoal(${goal.id})">✏️</button>
                    <button class="delete-btn" onclick="deleteGoal(${goal.id})">🗑️</button>
                </div>
            </div>
            <div class="progress-container">
                <div class="progress-bar" style="width: ${Math.min(percentage, 100)}%"></div>
            </div>
        `;

        if (goal.type === 'numeric') {
            const completed = goal.current;
            const total = goal.target;
            const remaining = Math.max(0, total - completed);
            content += `
                <div class="goal-stats" onclick="toggleStats(${goal.id})">
                    <div class="stats-main">현재 ${completed} / 목표 ${total} ▼</div>
                    <div class="stats-detail" id="stats-detail-${goal.id}">
                        <div class="stat">
                            <div class="stat-label">현재</div>
                            <div class="stat-value">${completed}</div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">목표</div>
                            <div class="stat-value">${total}</div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">남은 양</div>
                            <div class="stat-value">${remaining}</div>
                        </div>
                    </div>
                </div>
            `;
        } else if (goal.type === 'checklist') {
            const completed = goal.subtasks ? goal.subtasks.filter(st => st.completed).length : 0;
            const total = goal.subtasks ? goal.subtasks.length : 0;
            const remaining = total - completed;
            content += `
                <div class="goal-stats" onclick="toggleStats(${goal.id})">
                    <div class="stats-main">완료 ${completed} / 전체 ${total} ▼</div>
                    <div class="stats-detail" id="stats-detail-${goal.id}">
                        <div class="stat">
                            <div class="stat-label">완료</div>
                            <div class="stat-value">${completed}</div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">전체</div>
                            <div class="stat-value">${total}</div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">남은 할일</div>
                            <div class="stat-value">${remaining}</div>
                        </div>
                    </div>
                </div>
            `;
        }

        if (goal.memo) {
            content += `<div class="goal-memo">"${goal.memo}"</div>`;
        }

        if (goal.type === 'numeric') {
            content += `
                <div class="button-group">
                    <button class="btn-increase btn-small" onclick="updateGoal(${goal.id}, 1)">+1</button>
                    <button class="btn-increase btn-main" onclick="updateGoal(${goal.id}, 5)">+5</button>
                    <button class="btn-increase btn-main" onclick="updateGoal(${goal.id}, 10)">+10</button>
                    <button class="btn-decrease btn-small" onclick="updateGoal(${goal.id}, -1)">-1</button>
                    <button class="btn-decrease btn-small" onclick="updateGoal(${goal.id}, -5)">-5</button>
                    <button class="btn-decrease btn-small" onclick="updateGoal(${goal.id}, -10)">-10</button>
                </div>
            `;
        }

        if (goal.type === 'checklist' && goal.subtasks) {
            content += `
                <div class="subtasks-section" id="subtasks-${goal.id}">
                    ${goal.subtasks.map(subtask => `
                        <div class="subtask-item">
                            <input type="checkbox" class="subtask-checkbox" 
                                ${subtask.completed ? 'checked' : ''} 
                                onchange="toggleSubtask(${goal.id}, ${subtask.id})">
                            <span class="subtask-text ${subtask.completed ? 'completed' : ''}">${subtask.text}</span>
                            <button class="subtask-delete" onclick="deleteSubtask(${goal.id}, ${subtask.id})">✕</button>
                        </div>
                    `).join('')}
                    <div class="add-subtask-area">
                        <input type="text" class="subtask-input" id="subtask-input-${goal.id}" 
                            placeholder="새 할일 추가" 
                            onkeypress="if(event.key==='Enter') addSubtask(${goal.id})">
                        <button class="add-subtask-btn" onclick="addSubtask(${goal.id})">추가</button>
                    </div>
                </div>
            `;
        }

        card.innerHTML = content;
        container.appendChild(card);
    });
    updateSummary();
}

function updateGoal(id, change) {
    const goal = goals.find(g => g.id === id);
    if (goal && goal.type === 'numeric') {
        const oldValue = goal.current;
        goal.current = Math.max(0, goal.current + change);
        
        const oldPercentage = Math.round((oldValue / goal.target) * 100);
        const newPercentage = Math.round((goal.current / goal.target) * 100);
        
        if (oldPercentage < 100 && newPercentage >= 100) {
            showCelebration();
        }
        
        renderGoals();
    }
}

function editGoal(id) {
    const goal = goals.find(g => g.id === id);
    if (!goal) return;

    editingGoalId = id;
    document.getElementById('modal-title').textContent = '목표 수정하기';
    document.querySelector('.btn-submit').textContent = '수정';
    
    selectGoalType(goal.type);
    selectEmoji(goal.emoji);
    document.getElementById('goal-name').value = goal.name;
    document.getElementById('goal-memo').value = goal.memo || '';
    
    if (goal.type === 'numeric') {
        document.getElementById('goal-current').value = goal.current;
        document.getElementById('goal-target').value = goal.target;
    }
    
    document.getElementById('modal').classList.add('active');
    initEmojiPicker();
    selectEmoji(goal.emoji);
}

function deleteGoal(id) {
    if (confirm('이 목표를 삭제하시겠습니까?')) {
        goals = goals.filter(g => g.id !== id);
        renderGoals();
    }
}

function openModal() {
    editingGoalId = null;
    document.getElementById('modal-title').textContent = '새 목표 만들기';
    document.querySelector('.btn-submit').textContent = '추가';
    document.getElementById('modal').classList.add('active');
    initEmojiPicker();
    selectEmoji('target');
    selectGoalType('numeric');
}

function closeModal() {
    editingGoalId = null;
    document.getElementById('modal').classList.remove('active');
    document.getElementById('goal-name').value = '';
    document.getElementById('goal-current').value = '0';
    document.getElementById('goal-target').value = '';
    document.getElementById('goal-memo').value = '';
}

function saveGoal() {
    const name = document.getElementById('goal-name').value;
    const memo = document.getElementById('goal-memo').value;

    if (!name) {
        alert('목표 이름을 입력해주세요!');
        return;
    }

    if (editingGoalId) {
        // 수정 모드
        const goal = goals.find(g => g.id === editingGoalId);
        if (goal) {
            goal.name = name;
            goal.emoji = selectedEmoji;
            goal.memo = memo;
            
            if (goalType === 'numeric') {
                const current = parseInt(document.getElementById('goal-current').value) || 0;
                const target = parseInt(document.getElementById('goal-target').value);
                if (!target || target <= 0) {
                    alert('목표 값을 입력해주세요!');
                    return;
                }
                goal.current = current;
                goal.target = target;
            }
        }
    } else {
        // 새로 만들기 모드
        const newGoal = {
            id: Date.now(),
            name: name,
            emoji: selectedEmoji,
            memo: memo,
            type: goalType
        };

        if (goalType === 'numeric') {
            const current = parseInt(document.getElementById('goal-current').value) || 0;
            const target = parseInt(document.getElementById('goal-target').value);
            if (!target || target <= 0) {
                alert('목표 값을 입력해주세요!');
                return;
            }
            newGoal.current = current;
            newGoal.target = target;
        } else if (goalType === 'checklist') {
            newGoal.subtasks = [];
        }

        goals.push(newGoal);
    }
    
    renderGoals();
    closeModal();
}

// 초기 렌더링
renderGoals();
}
