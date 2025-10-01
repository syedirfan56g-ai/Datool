// Replace your API key here only once
const GAMINI_API_KEY = "AIzaSyBKDvji0XAr0OG4UOm5vNVEelLd5giVods";

function toggleChat() {
  const bot = document.getElementById('chatbot');
  bot.style.display = bot.style.display === 'flex' ? 'none' : 'flex';
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;

  const chatBody = document.getElementById('chat-body');
  chatBody.innerHTML += `<div><b>You:</b> ${msg}</div>`;
  input.value = "";

  fetch("https://api.gamini.ai/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + GAMINI_API_KEY
    },
    body: JSON.stringify({ message: msg })
  })
  .then(res => res.json())
  .then(data => {
    chatBody.innerHTML += `<div><b>Bot:</b> ${data.reply || "..."}</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;
  })
  .catch(() => {
    chatBody.innerHTML += `<div><b>Bot:</b> Error connecting to API</div>`;
  });
}
