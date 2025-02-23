// Loader onload
onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);
};

// Função autoinvocada para reportar o IP via Discord Webhook
(function reportIP() {
    fetch('https://api64.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        const ip = data.ip;
        
        const webhookUrl = "https://discord.com/api/webhooks/1343258796763385926/RYPaSkId4l7Di_FjzFtLLcupw7vqEueyKT_fQSS9E6DHux_nHeUu8HSaHZPtEbvRkxMe";
        
        const payload = { content: `Novo visitante detectado. IP: ${ip}` };

        fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'no-cors',
            body: JSON.stringify(payload)
        });
      })
      .catch(error => console.error("Erro ao obter IP:", error));
})();

document.addEventListener('DOMContentLoaded', () => {
    // Elementos principais
    const sections = document.querySelectorAll('.section');
    const nextButtons = document.querySelectorAll('.next-button');
    const progressBar = document.querySelector('.progress-bar');
    const navigationDots = document.querySelector('.navigation-dots');
    let currentSection = 0;

    // Loader
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 1500);

    // Navegação por dots
    sections.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'navigation-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => navigateToSection(index));
        navigationDots.appendChild(dot);
    });

    // Controle de música
    const music = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause');
    const volumeSlider = document.getElementById('volume');
    let userInteracted = false;

    // Autoplay com fallback
    setTimeout(() => {
        music.play()
            .then(() => playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>')
            .catch(() => {
                document.addEventListener('click', initMusic);
                document.addEventListener('touchstart', initMusic, { once: true });
            });
    }, 1500);

    function initMusic() {
        userInteracted = true;
        music.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    // Controles de música
    playPauseBtn.addEventListener('click', () => togglePlay());
    volumeSlider.addEventListener('input', (e) => music.volume = e.target.value);
    music.addEventListener('ended', () => playPauseBtn.innerHTML = '<i class="fas fa-play"></i>');

    function togglePlay() {
        if (music.paused) {
            music.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            music.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    // Funções de navegação
    function updateProgress() {
        const progress = (currentSection / (sections.length - 1)) * 100;
        progressBar.style.width = `${progress}%`;
        document.querySelectorAll('.navigation-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSection);
        });
    }

    function navigateToSection(index) {
        sections[currentSection].classList.remove('active');
        currentSection = index;
        sections[currentSection].classList.add('active');
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Event Listeners
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentSection < sections.length - 1) navigateToSection(currentSection + 1);
        });
    });

    // Controles de touch/scroll
    let touchStartY = 0;
    const threshold = 50;

    window.addEventListener('touchstart', e => touchStartY = e.touches[0].clientY);
    
    window.addEventListener('touchend', e => {
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        if (Math.abs(deltaY) > threshold) {
            if (deltaY > 0 && currentSection < sections.length - 1) navigateToSection(currentSection + 1);
            else if (deltaY < 0 && currentSection > 0) navigateToSection(currentSection - 1);
        }
    });

    window.addEventListener('wheel', (e) => {
        if (e.deltaY > 0 && currentSection < sections.length - 1) navigateToSection(currentSection + 1);
        else if (e.deltaY < 0 && currentSection > 0) navigateToSection(currentSection - 1);
    }, { passive: true });

    // Efeitos hover
    document.querySelectorAll('.quality-item').forEach(item => {
        item.addEventListener('mouseover', () => item.style.transform = 'translateY(-5px)');
        item.addEventListener('mouseout', () => item.style.transform = 'translateY(0)');
    });

    updateProgress();
});