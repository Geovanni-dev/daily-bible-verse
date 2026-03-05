let messages = [];

// Carrega os versículos do JSON
fetch('versiculos.json')
  .then(response => response.json())
  .then(data => {
    // ajuste conforme a estrutura do JSON
    messages = Array.isArray(data) ? data : data.versiculos;
  })
  .catch(error => {
    console.error('Erro ao carregar versículo:', error); 
  });

function showMessage() {
    const messageElement = document.getElementById("message"); // declara logo no início
    const lastClick = localStorage.getItem("lastClickTime");
    const oneMinute = 24 * 60 * 60 * 1000; // tempo de bloqueio 24 hrs em milissegundos)
    const now = new Date().getTime();

    if (lastClick && now - lastClick < oneMinute) {
        messageElement.style.display = "block";
        messageElement.innerHTML = "Volte novamente amanhã para mais um versículo.";

        // Reinicia a animação
        messageElement.classList.remove("fade");
        void messageElement.offsetWidth;
        messageElement.classList.add("fade");
        return;
    }

    // Salva o horário do clique atual
    localStorage.setItem("lastClickTime", now);

    // Sorteia uma mensagem aleatória
    const randomIndex = Math.floor(Math.random() * messages.length);
    messageElement.innerHTML = messages[randomIndex];
    messageElement.style.display = "block";

    // Reinicia a animação
    messageElement.classList.remove("fade");
    void messageElement.offsetWidth;
    messageElement.classList.add("fade");
}

// Animação de partículas
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});
var count_particles, stats, update;
stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top = "0px";
document.body.appendChild(stats.domElement);
count_particles = document.querySelector(".js-count-particles");
update = function () {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);

