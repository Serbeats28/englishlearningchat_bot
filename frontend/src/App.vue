
<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">English Learning Chatbot</h2>

    <div class="card p-3 mb-3">
      <div class="mb-3">
        <input type="text" class="form-control" v-model="message" placeholder="Type your message here..." @keyup.enter="sendMessage"/>
      </div>
      <button class="btn btn-primary" @click="sendMessage">Send</button>
    </div>

    <div v-if="chatHistory.length" class="card p-3">
      <div v-for="(chat, index) in chatHistory" :key="index" class="mb-2">
        <strong>{{ chat.role === 'user' ? ' You' : ' Bot' }}: </strong>
        <span> {{ chat.content }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ApiRequest from '../src/helper/ApiConfig'
import { showWaitBox, closeWaitBox } from '../src/helper/common'

const message = ref('')
const chatHistory = ref([])


const sendMessage = async () => {
  if (!message.value.trim()) return
  showWaitBox('Loading...')
  // Add user message to chat history
  chatHistory.value.push({ role: 'user', content: message.value })

  try {
    const res = await ApiRequest.post('/chat', {
      messages: [{ role: 'user', content: message.value }]
    })
    // Add bot reply to chat history
    chatHistory.value.push({ role: 'bot', content: res.data.reply })
    
  } 
  catch (err) {
    chatHistory.value.push({ role: 'bot', content: 'Error: ' + err.message })
  }

  message.value = ''
  closeWaitBox()
}
</script>
