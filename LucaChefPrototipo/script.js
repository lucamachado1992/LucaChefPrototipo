function enviarMensaje() {
  const input = document.getElementById("inputUsuario");
  const texto = input.value.trim();
  if (!texto) return;
  agregarMensaje(texto, "usuario");
  input.value = "";

  fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        { role: "system", content: "Sos un chef simpático que da recetas personalizadas según lo que la persona quiere." },
        { role: "user", content: texto }
      ]
    })
  })
  .then(res => res.json())
  .then(data => agregarMensaje(data.choices[0].message.content, "chef"))
  .catch(() => agregarMensaje("Error al contactar con el chef IA", "chef"));
}

function agregarMensaje(texto, clase) {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.className = "mensaje " + clase;
  div.textContent = texto;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}