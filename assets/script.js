document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    const carouselItems = document.querySelectorAll('.carousel-item img');
    let currentIndex = 0;

    carouselItems.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            updateLightboxContent();
            lightbox.style.display = 'flex';
        });
    });

    function updateLightboxContent() {
        const currentImg = carouselItems[currentIndex];
        lightboxImg.src = currentImg.src;
        lightboxCaption.textContent = currentImg.alt || 'No description provided';
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateLightboxContent();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateLightboxContent();
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        showNext();
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        showPrev();
    });

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === document.querySelector('.lightbox-content-wrapper')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        }
    });
});
