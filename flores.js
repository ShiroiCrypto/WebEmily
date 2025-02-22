document.addEventListener('DOMContentLoaded', () => {
    // Cria flores adicionais dinamicamente
    const garden = document.querySelector('.flower-garden');
    
    for(let i = 0; i < 5; i++) {
        const flower = document.createElement('div');
        flower.className = `flower ${['small', 'medium', 'large'][i % 3]}`;
        flower.style.left = `${Math.random() * 90 + 5}%`;
        flower.style.animationDelay = `${Math.random() * 2}s`;
        
        flower.innerHTML = `
            <div class="petals"></div>
            <div class="center"></div>
            <div class="stem"></div>
            <div class="leaf"></div>
        `;
        
        garden.insertBefore(flower, garden.firstChild);
    }

    // Adiciona animação de pétalas flutuantes
    setInterval(() => {
        const petals = document.createElement('div');
        petals.className = 'floating-petal';
        petals.style.left = `${Math.random() * 100}%`;
        petals.style.animationDuration = `${Math.random() * 3 + 2}s`;
        garden.appendChild(petals);
        
        setTimeout(() => petals.remove(), 5000);
    }, 3000);
});