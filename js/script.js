/* ==========================================================================
   XENTREX E - MOBILITY SOLUTIONS
   Main JavaScript Controller & Interactive Features
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. MOBILE NAVIGATION MENU
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // ==========================================
  // 2. NAVBAR SCROLL EFFECT
  // ==========================================
  const navbar = document.getElementById('navbar');
  
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ==========================================
  // 3. SCROLL REVEAL ANIMATION
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // ==========================================
  // 4. BATTERY PACK CATEGORY FILTER
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const vehicleItems = document.querySelectorAll('.vehicle-item');

  if (filterBtns.length > 0 && vehicleItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        vehicleItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || filterValue === category) {
            item.style.display = 'flex';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // ==========================================
  // 5. ESTIMATE RANGE CALCULATOR FOR LIFEPO4 PACKS
  // ==========================================
  const batterySlider = document.getElementById('battery-slider');
  const batteryValDisplay = document.getElementById('battery-val');
  const estimatedRangeDisplay = document.getElementById('estimated-range');
  const modeButtons = document.querySelectorAll('.mode-btn');

  let currentVoltageFactor = 60; // Default 60V factor

  function calculateAndDisplayRange() {
    if (!batterySlider || !estimatedRangeDisplay) return;

    const ahValue = parseInt(batterySlider.value, 10);
    
    if (batteryValDisplay) {
      batteryValDisplay.textContent = `${ahValue} Ah`;
    }

    // Estimate range: Ah * Voltage Factor * 0.055 approx km per Wh
    const baseWh = ahValue * currentVoltageFactor;
    const minKm = Math.round(baseWh * 0.045);
    const maxKm = Math.round(baseWh * 0.065);

    estimatedRangeDisplay.textContent = `${minKm}–${maxKm} km`;
  }

  if (batterySlider) {
    batterySlider.addEventListener('input', calculateAndDisplayRange);
  }

  // Voltage Pack Buttons (48V, 60V, 72V)
  if (modeButtons.length > 0) {
    modeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        modeButtons.forEach(b => {
          b.classList.remove('bg-emerald-500', 'text-black', 'font-extrabold', 'shadow-md', 'shadow-emerald-500/20');
          b.classList.add('bg-neutral-800', 'text-neutral-300', 'hover:bg-neutral-700');
        });

        btn.classList.remove('bg-neutral-800', 'text-neutral-300', 'hover:bg-neutral-700');
        btn.classList.add('bg-emerald-500', 'text-black', 'font-extrabold', 'shadow-md', 'shadow-emerald-500/20');

        const mode = btn.getAttribute('data-mode');
        if (mode === 'eco') {
          currentVoltageFactor = 48; // 48V
        } else if (mode === 'sport') {
          currentVoltageFactor = 72; // 72V
        } else {
          currentVoltageFactor = 60; // 60V
        }

        calculateAndDisplayRange();
      });
    });
  }

  calculateAndDisplayRange();

  // ==========================================
  // 6. CONTACT FORM SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formStatusMsg = document.getElementById('form-status-msg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = document.getElementById('name')?.value || 'Valued Customer';
      const phoneVal = document.getElementById('phone')?.value || '';

      if (formStatusMsg) {
        formStatusMsg.innerHTML = `
          <div class="p-5 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 rounded-xl space-y-2">
            <div class="flex items-center space-x-2 font-bold text-base">
              <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Thank you, ${nameVal}! Your inquiry has been received.</span>
            </div>
            <p class="text-xs text-neutral-300 pl-8">
              Our team will call you back at <strong class="text-emerald-400">${phoneVal}</strong> shortly. You can also call us directly anytime at <a href="tel:0778102469" class="underline font-bold text-emerald-400">077 810 2469</a>.
            </p>
          </div>
        `;
        formStatusMsg.classList.remove('hidden');
      }

      contactForm.reset();
    });
  }

  // ==========================================
  // 7. BATTERY PACK DETAILS MODAL
  // ==========================================
  const vehicleModal = document.getElementById('vehicle-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalImage = document.getElementById('modal-image');
  const modalRange = document.getElementById('modal-range');
  const modalPower = document.getElementById('modal-power');
  const modalAccel = document.getElementById('modal-accel');
  const modalDesc = document.getElementById('modal-desc');
  const viewDetailBtns = document.querySelectorAll('.view-details-btn');

  // Specs dataset for Xentrex LiFePO4 E-Bike Battery Packs
  const vehicleData = {
    '48v': {
      title: 'Xentrex Pro 48V 20Ah',
      subtitle: '3-Years Warranty • Grade A Cells',
      image: 'assets/images/lifepo4_hero.jpg',
      range: '48V DC',
      power: '20Ah (960Wh)',
      accel: '3 Years',
      description: 'The Xentrex Pro 48V 20Ah pack is built with 100% Brand New Grade A LiFePO4 cells. Includes a 45A Continuous Smart BMS protection circuit for over-charge, over-discharge, short circuit, and cell balancing. Perfect for 350W – 1000W electric bikes.'
    },
    '60v': {
      title: 'Xentrex Ultra 60V 24Ah',
      subtitle: '3-Years Warranty • Grade A Cells',
      image: 'assets/images/lifepo4_cells.jpg',
      range: '60V DC',
      power: '24Ah (1440Wh)',
      accel: '3 Years',
      description: 'Engineered for long-range daily commuting and high-performance e-bikes. Features a 60A Continuous Smart BMS, zero voltage sag, and over 3500 deep charge cycles. Backed by our full 3-Years replacement warranty.'
    },
    '72v': {
      title: 'Xentrex Hyper 72V 30Ah',
      subtitle: '3-Years Warranty • Grade A Cells',
      image: 'assets/images/lifepo4_hero.jpg',
      range: '72V DC',
      power: '30Ah (2160Wh)',
      accel: '3 Years',
      description: 'Designed for high-speed, heavy-torque electric bikes and scooters (2000W - 4000W motors). Delivers high continuous discharge, active thermal safety management, and 3-years warranty peace of mind.'
    }
  };

  function openModal(carKey) {
    const data = vehicleData[carKey];
    if (!data || !vehicleModal) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalSubtitle) modalSubtitle.textContent = data.subtitle;
    if (modalImage) modalImage.src = data.image;
    if (modalRange) modalRange.textContent = data.range;
    if (modalPower) modalPower.textContent = data.power;
    if (modalAccel) modalAccel.textContent = data.accel;
    if (modalDesc) modalDesc.textContent = data.description;

    vehicleModal.classList.remove('hidden');
    vehicleModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!vehicleModal) return;
    vehicleModal.classList.add('hidden');
    vehicleModal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const carKey = btn.getAttribute('data-car');
      openModal(carKey);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (vehicleModal) {
    vehicleModal.addEventListener('click', (e) => {
      if (e.target === vehicleModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && vehicleModal && !vehicleModal.classList.contains('hidden')) {
      closeModal();
    }
  });

});
