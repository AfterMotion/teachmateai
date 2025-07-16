// Load external chatbot script dynamically
const script = document.createElement('script');
script.src = "https://bot.todvob.com/button-chatbot-minified.js";
script.onload = () => {
  // This runs after the chatbot script is fully loaded
  const html = `
    <todvob-ai
      id="cmd5on73o001b1q0ku9p2znqk"
      srcBase="https://bot.todvob.com/"
    ></todvob-ai>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html.trim();

  const container = document.getElementById("container");
  if (container) {
    container.appendChild(wrapper.firstChild);
  } else {
    console.error('Element with ID "container" not found.');
  }
};

document.head.appendChild(script);
