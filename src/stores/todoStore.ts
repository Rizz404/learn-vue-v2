import { useLocalStorage } from '@/composables/useLocalStorage'
import type { TodoItem } from '@/types'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useTodoStore = defineStore('todos', () => {
  // * State
  const todos = useLocalStorage<TodoItem[]>('task-master-data', [])

  // * Getters
  const totalTodos = computed(() => todos.value.length)

  const completedTodosCount = computed(() => todos.value.filter((t) => t.isCompleted).length)

  const getTodoById = computed(() => {
    return (id: string) => todos.value.find((t) => t.id === id)
  })

  // * Actions
  function addTodo(title: string, description: string) {
    const newTask: TodoItem = {
      id: crypto.randomUUID(),
      title,
      description,
      isCompleted: false,
      createdAt: Date.now(),
    }

    todos.value.push(newTask)
  }

  function toggleTodo(id: string) {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) {
      todo.isCompleted = !todo.isCompleted
    }
  }

  function deleteTodo(id: string) {
    todos.value = todos.value.filter((t) => t.id !== id)
  }

  return { todos, totalTodos, completedTodosCount, getTodoById, addTodo, toggleTodo, deleteTodo }
})
