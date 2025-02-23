// Loader onload
onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);
  };
  
  // Função autoinvocada para reportar o IP via Discord Webhook
  (function reportIP() {
    // Obter o IP do visitante usando uma API pública
    fetch('https://api64.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        const ip = data.ip;
        console.log(`Novo visitante: IP ${ip}`);
        
        // URL da sua webhook do Discord (substitua pela sua URL real)
        const webhookUrl = "https://discord.com/api/webhooks/1343258796763385926/RYPaSkId4l7Di_FjzFtLLcupw7vqEueyKT_fQSS9E6DHux_nHeUu8HSaHZPtEbvRkxMe";
        
        // Monta o payload para enviar para o Discord
        const payload = {
            content: `Novo visitante detectado. IP: ${ip}`
        };
  
        // Envia o IP para o Discord via webhook
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Utiliza o modo 'no-cors' para contornar restrições (não permite visualizar a resposta)
            mode: 'no-cors',
            body: JSON.stringify(payload)
        })
        .then(() => console.log("IP enviado para o Discord!"))
        .catch(error => console.error("Erro ao enviar IP para o Discord:", error));
      })
      .catch(error => console.error("Erro ao obter IP:", error));
  })();
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const nextButtons = document.querySelectorAll('.next-button');
    const progressBar = document.querySelector('.progress-bar');
    const navigationDots = document.querySelector('.navigation-dots');
    let currentSection = 0;

        // Controle de Música
        const music = document.getElementById('background-music');
        const playPauseBtn = document.getElementById('play-pause');
        const volumeSlider = document.getElementById('volume');
    
        // Tocar música automaticamente (com tratamento para autoplay policies)
        setTimeout(() => {
            music.play().catch(error => {
                console.log('Reprodução automática bloqueada, aguardando interação do usuário');
            });
        }, 1000);
    
        // Play/Pause
        playPauseBtn.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                music.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    
        // Controle de Volume
        volumeSlider.addEventListener('input', (e) => {
            music.volume = e.target.value;
        });
    
        // Atualizar ícone quando a música terminar
        music.addEventListener('ended', () => {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
    // Loader
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 1500);

    // Navigation dots
    sections.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'navigation-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => navigateToSection(index));
        navigationDots.appendChild(dot);
    });

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

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentSection < sections.length - 1) {
                navigateToSection(currentSection + 1);
            }
        });
    });

    // Touch and scroll handling
    let touchStartY = 0;
    const threshold = 50;

    window.addEventListener('touchstart', e => {
        touchStartY = e.touches[0].clientY;
    });

    window.addEventListener('touchend', e => {
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;

        if (Math.abs(deltaY) > threshold) {
            if (deltaY > 0 && currentSection < sections.length - 1) {
                navigateToSection(currentSection + 1);
            } else if (deltaY < 0 && currentSection > 0) {
                navigateToSection(currentSection - 1);
            }
        }
    });

    window.addEventListener('wheel', (e) => {
        if (e.deltaY > 0 && currentSection < sections.length - 1) {
            navigateToSection(currentSection + 1);
        } else if (e.deltaY < 0 && currentSection > 0) {
            navigateToSection(currentSection - 1);
        }
    }, { passive: true });

    // Interactive elements
    document.querySelectorAll('.quality-item').forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transform = 'translateY(-5px)';
        });
        item.addEventListener('mouseout', () => {
            item.style.transform = 'translateY(0)';
        });
    });

    updateProgress();
});