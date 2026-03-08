<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue'

// ============================================
// EXPERIMENT A: reactive() for form data
// ============================================
interface UserForm {
  name: string
  email: string
  age: number
  role: 'admin' | 'user' | 'guest'
  newsletter: boolean
}

const form = reactive<UserForm>({
  name: '',
  email: '',
  age: 0,
  role: 'user',
  newsletter: false,
})

const isSubmitted = ref(false)
const submittedData = ref<UserForm | null>(null)

const submitForm = () => {
  submittedData.value = { ...form } // * Dispread biar anu
  isSubmitted.value = true
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.age = 0
  form.role = 'user'
  form.newsletter = false
  isSubmitted.value = false
  submittedData.value = null
}

// ============================================
// EXPERIMENT B: Destructuring DANGER demo
// ============================================
const counter = reactive({ count: 0, label: 'Dangerous Counter' })

// * count terputus dari reactivity karena diassign ulang
let { count: dangerousCount } = counter

const incrementDangerous = () => {
  dangerousCount++
  // DOM TIDAK akan update karena dangCount bukan reactive!
  console.warn('dangCount (plain var):', dangerousCount)
  console.warn('counter.count (reactive):', counter.count)
}

// ============================================
// EXPERIMENT C: toRefs() SAFE demo
// ============================================
const safeCounter = reactive({ count: 0, label: 'Safe counter' })

// AMAN: toRefs() convert ke ref, tetap reactive!
const { count: safeCount, label } = toRefs(safeCounter)

const incrementSafe = () => {
  safeCount.value++ // Harus .value karena sudah jadi ref
  // DOM AKAN update!
}
</script>

<template>
  <div class="container">
    <h1>🧪 reactive() Experiments</h1>

    <!-- ======================== -->
    <!-- EXPERIMENT A: User Form  -->
    <!-- ======================== -->
    <section class="experiment">
      <h2>A. reactive() for Form Data</h2>
      <p class="desc">
        reactive() cocok untuk form karena semua field ada dalam satu object. Akses langsung pakai
        dot notation, tanpa <code>.value</code>!
      </p>

      <div v-if="!isSubmitted" class="form">
        <div class="form-group">
          <label>Name</label>
          <input v-model="form.name" type="text" placeholder="Your name" />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input v-model="form.email" type="email" placeholder="your@email.com" />
        </div>

        <div class="form-group">
          <label>Age</label>
          <input v-model.number="form.age" type="number" min="0" max="100" />
        </div>

        <div class="form-group">
          <label>Role</label>
          <select v-model="form.role">
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="guest">Guest</option>
          </select>
        </div>

        <div class="form-group checkbox">
          <input v-model="form.newsletter" type="checkbox" id="newsletter" />
          <label for="newsletter">Subscribe to newsletter?</label>
        </div>

        <!-- Live preview pakai reactive() -->
        <div class="live-preview">
          <h4>Live Preview (reactive form):</h4>
          <code>form.name = "{{ form.name || '...' }}"</code><br />
          <code>form.email = "{{ form.email || '...' }}"</code><br />
          <code>form.age = {{ form.age }}</code
          ><br />
          <code>form.role = "{{ form.role }}"</code><br />
          <code>form.newsletter = {{ form.newsletter }}</code>
        </div>

        <div class="buttons">
          <button @click="submitForm" class="btn-primary">Submit</button>
          <button @click="resetForm" class="btn-secondary">Reset</button>
        </div>
      </div>

      <div v-else class="success-box">
        <h3>Form Submitted!</h3>
        <p>
          Name: <strong>{{ submittedData?.name }}</strong>
        </p>
        <p>
          Email: <strong>{{ submittedData?.email }}</strong>
        </p>
        <p>
          Age: <strong>{{ submittedData?.age }}</strong>
        </p>
        <p>
          Role: <strong>{{ submittedData?.role }}</strong>
        </p>
        <p>
          Newsletter: <strong>{{ submittedData?.newsletter ? 'Yes' : 'No' }}</strong>
        </p>
        <button @click="resetForm" class="btn-secondary">Reset Form</button>
      </div>
    </section>

    <!-- ================================= -->
    <!-- EXPERIMENT B: Destructure DANGER  -->
    <!-- ================================= -->
    <section class="experiment experiment-danger">
      <h2>B. Destructuring — BAHAYA!</h2>
      <p class="desc">
        Klik tombol berkali-kali. Lihat counter di bawah TIDAK berubah, tapi console menunjukkan
        dangCount terus bertambah!
      </p>

      <div class="demo-box danger">
        <div class="counter-display">{{ counter.count }}</div>
        <p class="hint">
          counter.count di DOM (reactive): <strong>{{ counter.count }}</strong>
        </p>
        <p class="hint">dangCount (plain var, check console): cek DevTools!</p>
        <button @click="incrementDangerous" class="btn-danger">Increment (Dangerous)</button>
      </div>

      <div class="code-note">
        <code>let {{ '{' }} count {{ '}' }} = counter</code> — Reactivity PUTUS!<br />
        <code>count++</code> — DOM tidak update!
      </div>
    </section>

    <!-- =============================== -->
    <!-- EXPERIMENT C: toRefs() SAFE     -->
    <!-- =============================== -->
    <section class="experiment experiment-safe">
      <h2>C. toRefs() — AMAN!</h2>
      <p class="desc">
        Dengan toRefs(), destructuring tetap reactive. Counter ini AKAN update setiap klik!
      </p>

      <div class="demo-box safe">
        <div class="counter-display">{{ safeCount }}</div>
        <p class="hint">
          Label: <strong>{{ label }}</strong>
        </p>
        <p class="hint">safeCount adalah ref, harus .value di script</p>
        <button @click="incrementSafe" class="btn-safe">Increment (Safe with toRefs)</button>
      </div>

      <div class="code-note">
        <code>const {{ '{' }} count {{ '}' }} = toRefs(safeCounter)</code> — Tetap reactive!<br />
        <code>count.value++</code> — DOM update dengan benar!
      </div>
    </section>

    <!-- Key Takeaways -->
    <section class="takeaways">
      <h2>🎯 Kapan Pakai ref() vs reactive()?</h2>
      <div class="comparison">
        <div class="col">
          <h3>ref()</h3>
          <ul>
            <li>Primitive values (string, number, boolean)</li>
            <li>Single value yang mungkin di-replace</li>
            <li>Lebih fleksibel & official-recommended</li>
          </ul>
        </div>
        <div class="col">
          <h3>reactive()</h3>
          <ul>
            <li>Form data dengan banyak fields</li>
            <li>Object yang propertynya sering diakses</li>
            <li>Ketika dot notation lebih readable</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 750px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.experiment {
  padding: 1.5rem;
  margin-bottom: 2rem;
  background: #f9f9f9;
  border-left: 4px solid #42b883;
  border-radius: 8px;
}

.experiment-danger {
  border-left-color: #ff5252;
}
.experiment-safe {
  border-left-color: #4caf50;
}

.experiment h2 {
  margin-top: 0;
  color: #2c3e50;
}

.desc {
  color: #555;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.desc code {
  background: #e8e8e8;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-group label {
  font-weight: bold;
  color: #2c3e50;
  font-size: 0.9rem;
}

.form-group input,
.form-group select {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #42b883;
}

.form-group.checkbox {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.form-group.checkbox input {
  width: 18px;
  height: 18px;
  padding: 0;
}

.live-preview {
  padding: 1rem;
  background: #2c3e50;
  border-radius: 6px;
  color: #42b883;
  font-family: monospace;
  font-size: 0.85rem;
  line-height: 1.8;
}

.live-preview h4 {
  color: white;
  margin: 0 0 0.5rem 0;
  font-size: 0.85rem;
}

.buttons {
  display: flex;
  gap: 1rem;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

button:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background: #42b883;
  color: white;
}
.btn-secondary {
  background: #e0e0e0;
  color: #333;
}
.btn-danger {
  background: #ff5252;
  color: white;
}
.btn-safe {
  background: #4caf50;
  color: white;
}

.success-box {
  padding: 1.5rem;
  background: #e8f5e9;
  border-radius: 8px;
  border: 2px solid #42b883;
}

.success-box p {
  margin: 0.5rem 0;
}

.demo-box {
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 1rem;
}

.demo-box.danger {
  background: #ffebee;
  border: 2px dashed #ff5252;
}
.demo-box.safe {
  background: #e8f5e9;
  border: 2px dashed #4caf50;
}

.counter-display {
  font-size: 4rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.hint {
  font-size: 0.9rem;
  color: #666;
  margin: 0.25rem 0;
}

.code-note {
  padding: 1rem;
  background: #2c3e50;
  border-radius: 6px;
  color: #42b883;
  font-family: monospace;
  font-size: 0.85rem;
  line-height: 1.8;
}

.takeaways {
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
}

.takeaways h2 {
  color: white;
  margin-top: 0;
}

.comparison {
  display: flex;
  gap: 1rem;
}

.col {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
}

.col h3 {
  margin-top: 0;
  color: #fff;
}

.col ul {
  margin: 0;
  padding-left: 1.2rem;
}

.col li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}
</style>
