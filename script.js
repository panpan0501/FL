function animateDemo() {
  const demo = document.querySelector('.interactive-demo');
  demo.style.animation = 'pulse 2s ease-in-out';
  
  setTimeout(() => {
    demo.style.animation = '';
  }, 2000);
}

// 添加一些額外的動態效果
document.addEventListener('DOMContentLoaded', function() {
  // 滑鼠跟隨效果 - 只在桌機運行
  if (window.innerWidth > 768) {
    const cursorGlow = document.querySelector('.cursor-glow');
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateGlowPosition() {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      cursorGlow.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`;
      requestAnimationFrame(updateGlowPosition);
    }

    updateGlowPosition();
  }

  // 平滑滾動到錨點
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 導覽列點擊高亮
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentUrl = window.location.href;
  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    if (href && (currentUrl.includes(href) || (href === 'index.html' && currentUrl.endsWith('/')))) {
      link.classList.add('active');
    }

    link.addEventListener('click', function () {
      navLinks.forEach(item => item.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // 添加一些視覺效果
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // 為面板添加淡入動畫
  document.querySelectorAll('.panel').forEach(panel => {
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(20px)';
    panel.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(panel);
  });
});

// 添加脈衝動畫
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(style);

// 倒計時功能
function updateCountdown() {
  const targetDate = new Date('2027-05-01T00:00:00').getTime();
  const now = new Date().getTime();
  const timeLeft = targetDate - now;

  if (timeLeft > 0) {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  } else {
    // 展覽已開始
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    document.querySelector('.countdown-date').textContent = '展覽已開始！';
  }
}

// 每秒更新倒計時
setInterval(updateCountdown, 1000);
updateCountdown(); // 立即執行一次