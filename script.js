/* ================================================
   Main JavaScript File for Afaq Travel Website
   ================================================ */

   document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.menu-toggle') && !e.target.closest('nav')) {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        }
    });
    
    // Hero Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.slider-indicators span');
    const prevSlide = document.querySelector('.prev-slide');
    const nextSlide = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;
    
    if (slides.length > 0) {
        // Function to show a specific slide
        function showSlide(n) {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Remove active class from all indicators
            indicators.forEach(indicator => {
                indicator.classList.remove('active');
            });
            
            // Set the current slide index
            currentSlide = (n + slides.length) % slides.length;
            
            // Show the current slide
            slides[currentSlide].classList.add('active');
            
            // Set the current indicator as active
            if (indicators.length > 0) {
                indicators[currentSlide].classList.add('active');
            }
        }
        
        // Auto slide functionality
        function startSlideInterval() {
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000); // Change slide every 5 seconds
        }
        
        // Initialize the auto slide
        startSlideInterval();
        
        // Event listeners for next and previous buttons
        if (nextSlide) {
            nextSlide.addEventListener('click', () => {
                clearInterval(slideInterval); // Clear the interval when manually changing slides
                showSlide(currentSlide + 1);
                startSlideInterval(); // Restart the interval
            });
        }
        
        if (prevSlide) {
            prevSlide.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(currentSlide - 1);
                startSlideInterval();
            });
        }
        
        // Event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                startSlideInterval();
            });
        });
    }
    
    // Testimonials Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialIndicators = document.querySelectorAll('.testimonial-indicators span');
    const prevTestimonial = document.querySelector('.prev-testimonial');
    const nextTestimonial = document.querySelector('.next-testimonial');
    let currentTestimonial = 0;
    
    if (testimonialItems.length > 0) {
        // Function to show a specific testimonial
        function showTestimonial(n) {
            // Hide all testimonials
            testimonialItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Remove active class from all indicators
            testimonialIndicators.forEach(indicator => {
                indicator.classList.remove('active');
            });
            
            // Set the current testimonial index
            currentTestimonial = (n + testimonialItems.length) % testimonialItems.length;
            
            // Show the current testimonial
            testimonialItems[currentTestimonial].classList.add('active');
            
            // Set the current indicator as active
            if (testimonialIndicators.length > 0) {
                testimonialIndicators[currentTestimonial].classList.add('active');
            }
        }
        
        // Event listeners for next and previous buttons
        if (nextTestimonial) {
            nextTestimonial.addEventListener('click', () => {
                showTestimonial(currentTestimonial + 1);
            });
        }
        
        if (prevTestimonial) {
            prevTestimonial.addEventListener('click', () => {
                showTestimonial(currentTestimonial - 1);
            });
        }
        
        // Event listeners for indicators
        testimonialIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
        
        // Auto change testimonials
        setInterval(() => {
            showTestimonial(currentTestimonial + 1);
        }, 8000); // Change testimonial every 8 seconds
    }
    
    // Trip Categories Filter
    const categoryItems = document.querySelectorAll('.category-item');
    
    if (categoryItems.length > 0) {
        categoryItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all category items
                categoryItems.forEach(cat => {
                    cat.classList.remove('active');
                });
                
                // Add active class to the clicked category item
                item.classList.add('active');
                
                // Here you would add code to filter the trips based on the selected category
                // For now, we'll just show a message in console
                console.log('Category selected:', item.querySelector('h3').textContent);
            });
        });
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const icon = question.querySelector('.toggle-icon i');
                
                // Toggle active class
                question.classList.toggle('active');
                
                // Toggle display of the answer
                if (question.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.classList.replace('fa-plus', 'fa-minus');
                } else {
                    answer.style.maxHeight = '0';
                    icon.classList.replace('fa-minus', 'fa-plus');
                }
            });
        });
    }
    
    // Destination and Trip Filters
    const filterButton = document.querySelector('.filter-button');
    
    if (filterButton) {
        filterButton.addEventListener('click', () => {
            // Here you would add code to filter the destinations or trips based on the selected filters
            // For now, we'll just show a message in console
            console.log('Filters applied!');
            
            // You might want to get the values of the filter inputs
            const filterInputs = document.querySelectorAll('.filter-item select');
            filterInputs.forEach(input => {
                console.log(input.id + ':', input.value);
            });
        });
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if the href is just '#'
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height
                const headerHeight = document.querySelector('header').offsetHeight;
                
                // Scroll to the target element with offset for the header
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Countdown Timer for Limited Time Offers
    const countdownElements = document.querySelectorAll('.countdown-timer');
    
    if (countdownElements.length > 0) {
        countdownElements.forEach(countdown => {
            // Get timer elements
            const daysElement = countdown.querySelector('.timer-item:nth-child(1) .timer-number');
            const hoursElement = countdown.querySelector('.timer-item:nth-child(3) .timer-number');
            const minutesElement = countdown.querySelector('.timer-item:nth-child(5) .timer-number');
            
            if (daysElement && hoursElement && minutesElement) {
                // Set the countdown to a fixed date for demo purposes
                // In a real application, you would get this from a database or API
                const endDate = new Date();
                endDate.setDate(endDate.getDate() + parseInt(daysElement.textContent));
                endDate.setHours(endDate.getHours() + parseInt(hoursElement.textContent));
                endDate.setMinutes(endDate.getMinutes() + parseInt(minutesElement.textContent));
                
                // Update the countdown every 1 minute
                const countdownInterval = setInterval(() => {
                    const now = new Date().getTime();
                    const distance = endDate - now;
                    
                    // Calculate days, hours, minutes
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    
                    // Update the countdown elements
                    daysElement.textContent = String(days).padStart(2, '0');
                    hoursElement.textContent = String(hours).padStart(2, '0');
                    minutesElement.textContent = String(minutes).padStart(2, '0');
                    
                    // If the countdown is over, show a message and clear the interval
                    if (distance < 0) {
                        clearInterval(countdownInterval);
                        daysElement.textContent = '00';
                        hoursElement.textContent = '00';
                        minutesElement.textContent = '00';
                    }
                }, 60000); // Update every 1 minute
            }
        });
    }
    
    // Sticky Header on Scroll
    const header = document.querySelector('header');
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    if (header && navbar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 200) {
                // Add sticky class when scrolled down
                navbar.classList.add('sticky');
                
                // Hide/show navbar based on scroll direction
                if (scrollTop > lastScrollTop) {
                    // Scrolling down, hide navbar
                    navbar.style.top = '-100px';
                } else {
                    // Scrolling up, show navbar
                    navbar.style.top = '0';
                }
            } else {
                // Remove sticky class when at the top
                navbar.classList.remove('sticky');
                navbar.style.top = '0';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Add CSS class for sticky navbar
    const style = document.createElement('style');
    style.textContent = `
        .navbar.sticky {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transition: top 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    // Add CSS for the Back to Top Button
    const btnStyle = document.createElement('style');
    btnStyle.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background-color: var(--primary-dark);
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(btnStyle);
    
    // Show/Hide Back to Top Button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicking the button
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Form Validation for Contact Forms
    const contactForms = document.querySelectorAll('form');
    
    if (contactForms.length > 0) {
        contactForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                // Prevent the form from submitting
                e.preventDefault();
                
                // Flag to track form validity
                let isValid = true;
                
                // Validate each required input
                const requiredInputs = form.querySelectorAll('input[required], textarea[required]');
                requiredInputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        // Add error class to the input
                        input.classList.add('error');
                        
                        // Show error message
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'هذا الحقل مطلوب';
                        
                        // Remove existing error message if any
                        const existingError = input.parentElement.querySelector('.error-message');
                        if (existingError) {
                            existingError.remove();
                        }
                        
                        // Add the error message after the input
                        input.parentElement.appendChild(errorMsg);
                    } else {
                        // Remove error class and message if input is valid
                        input.classList.remove('error');
                        const existingError = input.parentElement.querySelector('.error-message');
                        if (existingError) {
                            existingError.remove();
                        }
                    }
                });
                
                // Validate email format if there's an email input
                const emailInput = form.querySelector('input[type="email"]');
                if (emailInput && emailInput.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(emailInput.value.trim())) {
                        isValid = false;
                        emailInput.classList.add('error');
                        
                        // Show error message
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'يرجى إدخال بريد إلكتروني صحيح';
                        
                        // Remove existing error message if any
                        const existingError = emailInput.parentElement.querySelector('.error-message');
                        if (existingError) {
                            existingError.remove();
                        }
                        
                        // Add the error message after the input
                        emailInput.parentElement.appendChild(errorMsg);
                    }
                }
                
                // If form is valid, show success message
                if (isValid) {
                    // For demo purposes, we'll just show a success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'success-message';
                    successMsg.textContent = 'تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.';
                    
                    // Remove existing success message if any
                    const existingSuccess = form.querySelector('.success-message');
                    if (existingSuccess) {
                        existingSuccess.remove();
                    }
                    
                    // Add the success message at the top of the form
                    form.prepend(successMsg);
                    
                    // Reset the form
                    form.reset();
                    
                    // Remove the success message after 5 seconds
                    setTimeout(() => {
                        successMsg.remove();
                    }, 5000);
                }
            });
            
            // Remove error class and message when input changes
            form.querySelectorAll('input, textarea').forEach(input => {
                input.addEventListener('input', () => {
                    input.classList.remove('error');
                    const existingError = input.parentElement.querySelector('.error-message');
                    if (existingError) {
                        existingError.remove();
                    }
                });
            });
        });
        
        // Add CSS for form validation
        const formStyle = document.createElement('style');
        formStyle.textContent = `
            input.error, textarea.error {
                border-color: var(--danger-color) !important;
            }
            
            .error-message {
                color: var(--danger-color);
                font-size: 0.9rem;
                margin-top: 5px;
            }
            
            .success-message {
                background-color: var(--success-color);
                color: white;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
                text-align: center;
            }
        `;
        document.head.appendChild(formStyle);
    }
    
    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
});