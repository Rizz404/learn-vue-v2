<script setup lang="ts">
import { computed, ref } from 'vue'

// * Anjay masih inget buat interface
interface Todo {
  id: number
  text: string
  isCompleted: boolean
  priority: 'low' | 'medium' | 'high'
}

// * Statenya
const todos = ref<Todo[]>([
  { id: 1, text: 'Setup Vue project', isCompleted: true, priority: 'high' },
  { id: 2, text: 'Learn directives', isCompleted: false, priority: 'high' },
  { id: 3, text: 'Build todo app', isCompleted: false, priority: 'medium' },
  { id: 4, text: 'Master Vue Router', isCompleted: false, priority: 'low' },
])

const newTodoText = ref('')
const filter = ref<'all' | 'active' | 'completed'>('all')
const showStats = ref(true)

// * Methodnya
const addTodo = () => {
  if (newTodoText.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodoText.value,
      isCompleted: false,
      priority: 'medium',
    })
    newTodoText.value = ''
  }
}
const toggleTodo = (id: number) => {
  const todo = todos.value.find((t) => t.id === id)
  if (todo) {
    todo.isCompleted = !todo.isCompleted
  }
}

const removeTodo = (id: number) => {
  todos.value = todos.value.filter((t) => t.id !== id)
}

// * Computed value
const filteredTodos = computed<Todo[]>(() => {
  if (filter.value === 'active') {
    return todos.value.filter((t) => !t.isCompleted)
  } else if (filter.value === 'completed') {
    return todos.value.filter((t) => t.isCompleted)
  }

  return todos.value
})

const completedCount = computed(() => todos.value.filter((t) => t.isCompleted).length)

const activeCount = computed(() => todos.value.filter((t) => !t.isCompleted).length)
</script>

<template>
  <div class="container">
    <h1>My Todo List</h1>

    <!-- * Input form -->
    <div class="add-todo">
      <input
        type="text"
        v-model="newTodoText"
        @keyup.enter="addTodo"
        placeholder="What needs to be done?"
        class="todo-input"
      />
      <button @click="addTodo" class="btn-add">Add</button>
    </div>

    <div class="filters">
      <button @click="filter = 'all'" :class="{ active: filter === 'all' }">All</button>
      <button @click="filter = 'active'" :class="{ active: filter === 'active' }">Active</button>
      <button @click="filter = 'completed'" :class="{ completed: filter === 'completed' }">
        Completed
      </button>
    </div>

    <!-- * Conditionals pas empty state -->
    <div v-if="todos.length === 0" class="empty-state">
      <p>No todos! Time to relax or add something new.</p>
    </div>

    <!-- * Conditionals pas ada todo -->
    <div v-else>
      <p v-if="filteredTodos.length === 0" class="no-result">No {{ filter }} todos found!</p>
      <ul v-else class="todo-list">
        <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          :class="{ completed: todo.isCompleted }"
          class="todo-item"
        >
          <div class="todo-content">
            <input type="checkbox" :checked="todo.isCompleted" @change="toggleTodo(todo.id)" />
            <span class="todo-text">{{ todo.text }}</span>

            <!-- * State priority -->
            <span v-if="todo.priority === 'high'" class="badge-high">🔴 High</span>
            <span v-else-if="todo.priority === 'medium'" class="badge-medium">🟡 Medium</span>
            <span v-else class="badge-low"> 🟢 Low</span>
          </div>

          <button v-show="todo.isCompleted" @click="removeTodo(todo.id)" class="btn-delete">
            🗑️
          </button>
        </li>
      </ul>

      <div class="stats-container">
        <button @click="showStats = !showStats" class="btn-toggle-stats">
          {{ showStats ? 'Hide Stats' : 'Show Stats' }}
        </button>

        <div v-show="showStats" class="stats">
          <p>
            Total: <strong>{{ todos.length }}</strong>
          </p>
          <p>
            Active: <strong>{{ activeCount }}</strong>
          </p>
          <p>
            Completed: <strong>{{ completedCount }}</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.add-todo {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.todo-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
}

.todo-input:focus {
  outline: none;
  border-color: #42b883;
}

.btn-add {
  padding: 0.75rem 1.5rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.btn-add:hover {
  background: #38a073;
}

.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.filters button {
  flex: 1;
  padding: 0.5rem;
  background: #f4f4f4;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.filters button.active {
  background: #42b883;
  color: white;
  border-color: #42b883;
}

.filters button:hover {
  border-color: #42b883;
}

.empty-state,
.no-results {
  text-align: center;
  padding: 2rem;
  color: #999;
  font-style: italic;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  transition: all 0.2s;
}

.todo-item:hover {
  border-color: #42b883;
  background: #f9f9f9;
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.todo-text {
  flex: 1;
  font-size: 1rem;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
}

.badge-high {
  background: #ffebee;
  color: #c62828;
}

.badge-medium {
  background: #fff9c4;
  color: #f57f17;
}

.badge-low {
  background: #e8f5e9;
  color: #2e7d32;
}

.btn-delete {
  background: #ff5252;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-delete:hover {
  background: #ff1744;
}

.stats-container {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e0e0e0;
}

.btn-toggle-stats {
  width: 100%;
  padding: 0.75rem;
  background: #35495e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 1rem;
}

.btn-toggle-stats:hover {
  background: #2c3e50;
}

.stats {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background: #f4f4f4;
  border-radius: 6px;
}

.stats p {
  margin: 0;
  font-size: 0.95rem;
}

.stats strong {
  color: #42b883;
  font-size: 1.2rem;
}
</style>
