<script setup lang="ts">
import { ref } from 'vue'

// * Primitive tipe data
const count = ref(0)
const step = ref(1)
const message = ref('')
const isAutoMode = ref(false)

// * Object dalam ref
interface CounterHistory {
  timestamp: string
  value: number
  action: string
}

const history = ref<CounterHistory[]>([])

// * Interval ID bukan ref karena gak perlu reactive
let intervalId: number | null = null

// * Methods untuk manipulasi ref
const addHistory = (action: string) => {
  history.value.push({
    timestamp: new Date().toLocaleTimeString(),
    value: count.value,
    action,
  })

  // * Cuma simpen 5 items
  if (history.value.length > 5) {
    history.value.shift()
  }
}

const updateMessage = (msg: string) => {
  message.value = msg

  // * Hapus setelah 3 detik
  setTimeout(() => {
    message.value = ''
  }, 3000)
}

const increment = () => {
  count.value += step.value
  addHistory('increment')
  updateMessage(`Incremented by ${step.value}`)
}

const decrement = () => {
  count.value -= step.value
  addHistory('decrement')
  updateMessage(`Decremented by ${step.value}`)
}

const reset = () => {
  count.value = 0
  addHistory('reset')
  updateMessage('Counter reset to 0')
  history.value = []
}

const setStep = (newStep: number) => {
  step.value = newStep
  updateMessage(`Step changed to ${newStep}`)
}

const toggleAutoMode = () => {
  isAutoMode.value = !isAutoMode.value

  if (isAutoMode.value) {
    intervalId = window.setInterval(() => {
      increment()
    }, 1000)
    updateMessage('Auto mode started')
  } else {
    // * Stop auto increment
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
    updateMessage('Auto mode stopped')
  }
}

// * Mutasi object property vs replace object
const demoMutation = () => {
  // * Cara 1 mutate property (reactive)
  history.value[0]!.action = 'MODIFIED'

  // * Cara 2 replace whole array (reactive juga)
  // history.value = [...history.value]
}
</script>

<template>
  <div class="counter-container">
    <h1>Advance counter</h1>

    <!-- * Main counter display -->
    <div class="counter-display">
      <div class="count-value">{{ count }}</div>
      <div class="count-label">Current count</div>
    </div>

    <!-- * Message feedback -->
    <div v-if="message" class="message">{{ message }}</div>

    <!-- * Control button -->
    <div class="controls">
      <button @click="decrement" class="btn btn-decrement">➖ Decrement</button>
      <button @click="reset" class="btn btn-reset">🔄 Reset</button>
      <button @click="increment" class="btn btn-increment">➕ Increment</button>
    </div>

    <!-- * Step selector -->
    <div class="step-selector">
      <label> Step size:</label>
      <div class="step-buttons">
        <button @click="setStep(1)" :class="{ active: step === 1 }" class="btn-step">1</button>
        <button @click="setStep(5)" :class="{ active: step === 5 }" class="btn-step">5</button>
        <button @click="setStep(10)" :class="{ active: step === 10 }" class="btn-step">10</button>
        <button @click="setStep(100)" :class="{ active: step === 100 }" class="btn-step">
          100
        </button>
      </div>
      <p class="step-info">
        Current step: <strong>{{ step }}</strong>
      </p>
    </div>

    <!-- * Auto mode toggle -->
    <div class="auto-mode">
      <button @click="toggleAutoMode" :class="{ active: isAutoMode }" class="btn-auto">
        {{ isAutoMode ? '⏸️ Stop Auto' : '▶️ Start Auto' }}
      </button>
      <p v-if="isAutoMode" class="auto-info">Auto incrementing by {{ step }} every second...</p>
    </div>

    <!-- * History log -->
    <div class="history-section">
      <h3>History (last 5 actions)</h3>
      <div v-if="history.length === 0" class="no-history">No actions yet. Start clicking</div>
      <ul v-else>
        <li v-for="(item, index) in history" :key="index" class="history-item">
          <span class="history-time">{{ item.timestamp }}</span>
          <span class="history-action">{{ item.action }}</span>
          <span class="history-value">→ {{ item.value }}</span>
        </li>
      </ul>
    </div>

    <!-- * ref() explanation box -->
    <div class="info-box">
      <h4>What's happening with the ref()</h4>
      <ul>
        <li>
          <span v-pre>
            <code>count.value</code> in script → <code>{{ count }}</code> in template
          </span>
        </li>
        <li>Every mutation to <code>.value</code> triggers reactivity</li>
        <li>Array mutations (push, shift) are also reactive</li>
        <li><code>isAutoMode</code> boolean ref controls interval state</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.counter-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.counter-display {
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.count-value {
  font-size: 4rem;
  font-weight: bold;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.count-label {
  font-size: 1rem;
  opacity: 0.9;
}

.message {
  text-align: center;
  padding: 0.75rem;
  background: #e8f5e9;
  color: #2e7d32;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 500;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-increment {
  background: #42b883;
  color: white;
}

.btn-decrement {
  background: #ff6b6b;
  color: white;
}

.btn-reset {
  background: #f0f0f0;
  color: #333;
}

.step-selector {
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.step-selector label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.step-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.btn-step {
  flex: 1;
  padding: 0.5rem;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.btn-step.active {
  background: #42b883;
  color: white;
  border-color: #42b883;
}

.btn-step:hover {
  border-color: #42b883;
}

.step-info {
  margin: 0.5rem 0 0 0;
  font-size: 0.9rem;
  color: #666;
}

.auto-mode {
  text-align: center;
  margin-bottom: 2rem;
}

.btn-auto {
  padding: 0.75rem 2rem;
  background: #35495e;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s;
}

.btn-auto.active {
  background: #ff6b6b;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.btn-auto:hover {
  transform: scale(1.05);
}

.auto-info {
  margin-top: 0.5rem;
  color: #ff6b6b;
  font-weight: bold;
  font-size: 0.9rem;
}

.history-section {
  margin-bottom: 2rem;
}

.history-section h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.no-history {
  text-align: center;
  padding: 2rem;
  color: #999;
  font-style: italic;
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.history-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: #f9f9f9;
  border-left: 4px solid #42b883;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  font-family: monospace;
}

.history-time {
  color: #666;
  font-size: 0.85rem;
}

.history-action {
  font-weight: bold;
  color: #2c3e50;
  text-transform: uppercase;
}

.history-value {
  color: #42b883;
  font-weight: bold;
}

.info-box {
  padding: 1.5rem;
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  border-radius: 8px;
}

.info-box h4 {
  margin-top: 0;
  color: #856404;
}

.info-box ul {
  margin: 0.5rem 0 0 0;
  padding-left: 1.5rem;
}

.info-box li {
  margin-bottom: 0.5rem;
  color: #856404;
}

.info-box code {
  background: #fff;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: monospace;
  color: #c7254e;
}
</style>
