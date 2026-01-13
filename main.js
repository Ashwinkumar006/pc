/**
* Template Name: Proconnect
* Template URL: https://bootstrapmade.com/Proconnect-free-html-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Newsletter functionality with AI features
   */
  const newsletterForm = document.querySelector('.php-email-form');
  const newsletterInput = document.querySelector('.newsletter-form input[type="email"]');
  const newsletterButton = document.querySelector('.newsletter-form input[type="submit"]');
  const loadingMessage = document.querySelector('.loading');
  const errorMessage = document.querySelector('.error-message');
  const sentMessage = document.querySelector('.sent-message');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = newsletterInput.value.trim();
      const name = newsletterInput.dataset.name || '';
      
      // Basic validation
      if (!email) {
        showError('Please enter your email address');
        return;
      }
      
      if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
      }
      
      // Show loading state
      setLoading(true);
      
      try {
        const response = await fetch('newsletter-handler.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            name: name,
            preferences: {
              tech_insights: true,
              networking_tips: true,
              career_development: true
            }
          })
        });
        
        const result = await response.json();
        
        if (result.success) {
          showSuccess(result.message);
          newsletterForm.reset();
          
          // Show AI insights if available
          if (result.ai_insights) {
            showAIInsights(result.ai_insights);
          }
        } else {
          showError(result.message);
        }
      } catch (error) {
        showError('Network error. Please try again.');
        console.error('Newsletter subscription error:', error);
      } finally {
        setLoading(false);
      }
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function setLoading(isLoading) {
    if (newsletterButton) {
      newsletterButton.disabled = isLoading;
      newsletterButton.value = isLoading ? 'Subscribing...' : 'Subscribe';
    }
    
    if (loadingMessage) {
      loadingMessage.style.display = isLoading ? 'block' : 'none';
    }
    
    if (errorMessage) {
      errorMessage.style.display = 'none';
    }
    
    if (sentMessage) {
      sentMessage.style.display = 'none';
    }
  }

  function showError(message) {
    if (errorMessage) {
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
    }
    
    if (sentMessage) {
      sentMessage.style.display = 'none';
    }
  }

  function showSuccess(message) {
    if (sentMessage) {
      sentMessage.textContent = message;
      sentMessage.style.display = 'block';
    }
    
    if (errorMessage) {
      errorMessage.style.display = 'none';
    }
  }

  function showAIInsights(insights) {
    // Create AI insights modal or display
    const insightsDiv = document.createElement('div');
    insightsDiv.className = 'ai-insights alert alert-info mt-3';
    insightsDiv.innerHTML = `
      <h6><i class="bi bi-cpu"></i> AI Analysis</h6>
      <small>
        <strong>Domain Type:</strong> ${insights.domain_type}<br>
        <strong>Engagement Prediction:</strong> ${Math.round(insights.engagement_prediction * 100)}%<br>
        <strong>Risk Score:</strong> ${Math.round(insights.risk_score * 100)}%<br>
        ${insights.recommendations.length > 0 ? '<strong>Recommendations:</strong> ' + insights.recommendations.join(', ') : ''}
      </small>
    `;
    
    newsletterForm.parentNode.insertBefore(insightsDiv, newsletterForm.nextSibling);
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
      if (insightsDiv.parentNode) {
        insightsDiv.remove();
      }
    }, 10000);
  }

  /**
   * Real-time email validation
   */
  if (newsletterInput) {
    newsletterInput.addEventListener('input', function() {
      const email = this.value.trim();
      
      if (email && !isValidEmail(email)) {
        this.classList.add('is-invalid');
        this.classList.remove('is-valid');
      } else if (email && isValidEmail(email)) {
        this.classList.add('is-valid');
        this.classList.remove('is-invalid');
      } else {
        this.classList.remove('is-valid', 'is-invalid');
      }
    });
  }

  /**
   * Load newsletter analytics (admin feature)
   */
  async function loadNewsletterAnalytics() {
    try {
      const response = await fetch('newsletter-handler.php?analytics=true');
      const result = await response.json();
      
      if (result.success) {
        displayAnalytics(result.data);
      }
    } catch (error) {
      console.error('Analytics load error:', error);
    }
  }

  function displayAnalytics(data) {
    const analyticsContainer = document.getElementById('newsletter-analytics');
    if (analyticsContainer) {
      analyticsContainer.innerHTML = `
        <div class="row">
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <h5>Total Subscribers</h5>
                <h3>${data.total_subscribers || 0}</h3>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <h5>Avg Engagement</h5>
                <h3>${Math.round((data.avg_engagement || 0) * 100)}%</h3>
              </div>
            </div>
          </div>
          <div class="col-md-2">
            <div class="card">
              <div class="card-body">
                <h5>Personal</h5>
                <h3>${data.personal_domains || 0}</h3>
              </div>
            </div>
          </div>
          <div class="col-md-2">
            <div class="card">
              <div class="card-body">
                <h5>Business</h5>
                <h3>${data.business_domains || 0}</h3>
              </div>
            </div>
          </div>
          <div class="col-md-2">
            <div class="card">
              <div class="card-body">
                <h5>Custom</h5>
                <h3>${data.custom_domains || 0}</h3>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  // Load analytics if analytics container exists
  if (document.getElementById('newsletter-analytics')) {
    loadNewsletterAnalytics();
  }

})();