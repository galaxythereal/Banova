    <script>
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            header.classList.toggle('scrolled', window.scrollY > 50);
        });

        // GSAP Animations
        gsap.registerPlugin(ScrollTrigger);

        // Hero animations
        gsap.from('.hero-content', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });

        // Feature animations
        gsap.utils.toArray('.feature').forEach((feature, index) => {
            gsap.from(feature, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: feature,
                    start: "top 80%",
                },
                delay: index * 0.2
            });
        });

        // Stats counter animation
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            gsap.to(stat, {
                innerHTML: target,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: stat,
                    start: "top 80%",
                },
                onUpdate: function() {
                    stat.innerHTML = Math.ceil(this.targets()[0].innerHTML);
                }
            });
        });
        
 const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    let current = 0;
    const increment = target / 200; // Adjust for animation speed
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            el.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            el.textContent = target;
        }
    };
    updateCounter();
}

const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.impact-number').forEach(animateCounter);
            impactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('#live-impact').forEach(section => {
    impactObserver.observe(section);
});

document.getElementById('interest').addEventListener('change', function() {
    var productSection = document.getElementById('productSection');
    var quantitySection = document.getElementById('quantitySection');
    if (this.value === 'purchase') {
        productSection.style.display = 'block';
        quantitySection.style.display = 'block';
    } else {
        productSection.style.display = 'none';
        quantitySection.style.display = 'none';
    }
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var form = this;
    
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('شكراً لك! تم إرسال رسالتك بنجاح.');
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert('عذراً، حدث خطأ أثناء إرسال الرسالة. الرجاء المحاولة مرة أخرى.');
                }
            })
        }
    }).catch(error => {
        alert('عذراً، حدث خطأ أثناء إرسال الرسالة. الرجاء المحاولة مرة أخرى.');
    });
});
// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}

// Intersection Observer to trigger counter animation when in view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.impact-section').forEach(section => {
    observer.observe(section);
});
document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    var locations = [
        {lat: 20.5937, lng: 78.9629, name: "الهند"}, // India
        {lat: -30.5595, lng: 22.9375, name: "جنوب أفريقيا"}, // South Africa
        {lat: -14.2350, lng: -51.9253, name: "البرازيل"}, // Brazil
        {lat: 26.8206, lng: 30.8025, name: "مصر"} // Egypt
        // Add more locations as needed
    ];

    // Define a custom icon style using --primary-color
    var customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<i class="fas fa-map-marker-alt"></i>`,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });

    // Add markers with the custom icon
    locations.forEach(function(loc) {
        L.marker([loc.lat, loc.lng], {icon: customIcon}).addTo(map)
            .bindPopup(loc.name);
    });
});

// Impact Counter Animation (unchanged)
const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const inc = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(updateCount, 1);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
});

// Testimonial Slider (unchanged)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-item');

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.display = i === index ? 'block' : 'none';
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}

// Initialize testimonial display and set interval for rotation
showTestimonial(currentTestimonial);
setInterval(nextTestimonial, 5000); // Change testimonial every 5 seconds
    </script>
