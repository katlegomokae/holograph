// Avatar Loader using Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 800/400, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("avatarCanvas"), alpha: true });
renderer.setSize(800, 400);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1).normalize();
scene.add(light);

const loader = new THREE.GLTFLoader();
loader.load('avatar.glb', function(gltf) {
  scene.add(gltf.scene);
  camera.position.z = 2;
  animate();
}, undefined, function(error) {
  console.error(error);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Chat Functionality with OpenAI API
async function handleUserInput() {
  const input = document.getElementById("user-input").value;
  appendMessage("You", input);
  document.getElementById("user-input").value = "";

  const reply = await fetchGPT(input);
  appendMessage("Teller", reply);
}

function appendMessage(sender, message) {
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<p><strong>${sender}:</strong> ${message}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function fetchGPT(userMessage) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_OPENAI_API_KEY"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a friendly holographic FNB bank teller that helps users with savings and loan advice. Keep it simple and helpful."
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
