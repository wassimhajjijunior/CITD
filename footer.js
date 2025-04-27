

document.getElementById('year').textContent = new Date().getFullYear();
        
// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Create floating particles
const particlesContainer = document.getElementById('particles');
const particleCount = 30;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size between 2px and 6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = `-${size}px`;
    
    // Random animation duration between 10s and 20s
    const duration = Math.random() * 10 + 10;
    particle.style.animationDuration = `${duration}s`;
    
    // Random delay
    particle.style.animationDelay = `${Math.random() * 10}s`;
    
    particlesContainer.appendChild(particle);
}

// Add hover effect to footer columns
const footerColumns = document.querySelectorAll('.footer-column.left, .footer-column.right');
footerColumns.forEach(column => {
    column.addEventListener('mouseenter', () => {
        column.style.transform = 'translateY(-10px)';
        column.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.2)';
    });
    
    column.addEventListener('mouseleave', () => {
        column.style.transform = 'translateY(0)';
        column.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.15)';
    });
});


