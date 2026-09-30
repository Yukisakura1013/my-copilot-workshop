const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const remainingCount = document.getElementById('remaining-count');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeLabel = document.getElementById('theme-label');
const filterButtons = document.querySelectorAll('.filter-button');

const STORAGE_KEY = 'my-todos';

let todos = loadTodos();
let currentFilter = 'all';
let selectedTheme = null;
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

// 從 localStorage 載入待辦事項,資料無法讀取時以空清單開始。
function loadTodos() {
  try {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    const parsedTodos = savedTodos ? JSON.parse(savedTodos) : [];
    return Array.isArray(parsedTodos) ? parsedTodos : [];
  } catch (error) {
    console.warn('讀取待辦清單失敗,將以空清單開始。', error);
    return [];
  }
}

// 將目前待辦事項保存至 localStorage。
function saveTodos() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.warn('保存待辦清單失敗。', error);
  }
}

// 取得目前手動選擇的主題,否則使用作業系統偏好。
function getActiveTheme() {
  return selectedTheme || (systemTheme.matches ? 'dark' : 'light');
}

// 更新主題按鈕的圖示、文字與無障礙狀態。
function updateThemeButton(theme) {
  const isDark = theme === 'dark';
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  themeLabel.textContent = isDark ? '淺色模式' : '深色模式';
  themeToggle.setAttribute('aria-pressed', String(isDark));
}

// 依目前篩選條件重繪清單,未完成數量始終統計全部項目。
function render() {
  list.replaceChildren();

  const visibleTodos = todos.filter((todo) => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true;
  });

  visibleTodos.forEach((todo) => {
    const item = document.createElement('li');
    item.className = todo.completed ? 'todo-item completed' : 'todo-item';
    item.dataset.id = todo.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-label', `標記「${todo.text}」為完成`);

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn-delete';
    deleteButton.textContent = '刪除';
    deleteButton.setAttribute('aria-label', `刪除「${todo.text}」`);

    item.append(checkbox, text, deleteButton);
    list.append(item);
  });

  emptyState.hidden = visibleTodos.length > 0;
  if (visibleTodos.length === 0) {
        if (todos.length === 0) {
          emptyState.textContent = '還沒有任何待辦事項,新增一個吧!';
        } else if (currentFilter === 'active') {
          emptyState.textContent = '目前沒有未完成的待辦事項，已完成項目仍保留。切換至「全部」或「已完成」即可查看。';
    } else if (currentFilter === 'completed') {
          emptyState.textContent = '目前沒有已完成的待辦事項，未完成項目仍保留。切換至「全部」或「未完成」即可查看。';
    }
  }

  const remaining = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成:${remaining} 項`;
}

// 新增待辦事項並更新畫面。
function addTodo(text) {
  todos.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text,
    completed: false,
  });
  saveTodos();
  render();
}

// 切換待辦事項的完成狀態並更新畫面。
function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos();
  render();
}

// 刪除待辦事項並更新畫面。
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  render();
}

// 依系統偏好初始化主題,手動切換只在本次開啟頁面期間生效。
updateThemeButton(getActiveTheme());

themeToggle.addEventListener('click', () => {
  selectedTheme = getActiveTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = selectedTheme;
  updateThemeButton(selectedTheme);
});

systemTheme.addEventListener('change', () => {
  if (!selectedTheme) updateThemeButton(getActiveTheme());
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle('is-active', isActive);
      filterButton.setAttribute('aria-pressed', String(isActive));
    });
    render();
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  addTodo(text);
  input.value = '';
  input.focus();
});

list.addEventListener('click', (event) => {
  const item = event.target.closest('.todo-item');
  if (!item) return;

  const id = item.dataset.id;
  if (event.target.matches('input[type="checkbox"]')) {
    toggleTodo(id);
  } else if (event.target.matches('.btn-delete')) {
    deleteTodo(id);
  }
});

render();
