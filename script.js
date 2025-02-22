onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);
  };
  
  
document.addEventListener('DOMContentLoaded', () => {
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