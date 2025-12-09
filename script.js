
document.addEventListener('DOMContentLoaded', function() {
    
    
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const mobileMenu = document.getElementById('mobileMenu');
    const navbarNav = document.querySelector('nav');
    const bookBtn = document.getElementById('bookBtn');
    const serviceBtns = document.querySelectorAll('.service-btn');
    const expertBtns = document.querySelectorAll('.expert-btn');
    const loginBtn = document.getElementById('loginBtn');
    
    const appointmentModal = document.getElementById('appointmentModal');
    const loginModal = document.getElementById('loginModal');
    const successModal = document.getElementById('successModal');
    
    const appointmentForm = document.getElementById('appointmentForm');
    const loginForm = document.getElementById('loginForm');
    const serviceSelect = document.getElementById('serviceSelect');
    
    const closes = document.querySelectorAll('.close');
    
    
    let currentUser = null;
    let selectedService = '';
    let selectedExpert = '';
    
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Update active nav
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scroll
            targetSection.scrollIntoView({ behavior: 'smooth' });
            
            // Close mobile menu
            navbarNav.style.display = 'none';
        });
    });
    
    
    mobileMenu.addEventListener('click', function() {
        navbarNav.style.display = navbarNav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    
    serviceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceCard = this.closest('.card');
            selectedService = serviceCard.dataset.service;
            serviceSelect.value = selectedService;
            document.getElementById('modalTitle').textContent = `Book ${serviceCard.querySelector('h3').textContent}`;
            appointmentModal.style.display = 'block';
        });
    });
    
    
    expertBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const expertCard = this.closest('.expert-card');
            selectedExpert = expertCard.dataset.expert;
            document.getElementById('modalTitle').textContent = `Book with ${expertCard.querySelector('h3').textContent}`;
            serviceSelect.value = '';
            appointmentModal.style.display = 'block';
        });
    });
    
    
    bookBtn.addEventListener('click', function() {
        document.getElementById('modalTitle').textContent = 'Book Appointment';
        serviceSelect.value = '';
        appointmentModal.style.display = 'block';
    });
    
    
    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'block';
    });
    
    
    closes.forEach(close => {
        close.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('patientName').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            service: serviceSelect.value,
            date: document.getElementById('appointmentDate').value,
            expert: selectedExpert || 'Not specified'
        };
        
        
        setTimeout(() => {
            appointmentModal.style.display = 'none';
            successModal.style.display = 'block';
            document.getElementById('successMessage').textContent = 
                `Appointment booked successfully for ${formData.name}! 
                 Service: ${serviceSelect.options[serviceSelect.selectedIndex].text} 
                 on ${new Date(formData.date).toLocaleString('en-IN')}`;
            
            
            appointmentForm.reset();
            selectedService = '';
            selectedExpert = '';
        }, 1000);
    });
    
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        
        currentUser = { email: email, loggedIn: true };
        loginBtn.textContent = `Welcome, ${email.split('@')[0]}`;
        loginBtn.classList.add('user-logged');
        loginModal.style.display = 'none';
        
        
        this.reset();
    });
    
    
    document.getElementById('closeSuccess').addEventListener('click', function() {
        successModal.style.display = 'none';
    });
    
    
    document.querySelector('.toggle-auth span').addEventListener('click', function() {
        const toggleText = this.parentElement;
        if (toggleText.textContent.includes('Register')) {
            toggleText.innerHTML = 'Already have an account? <span>Login</span>';
        } else {
            toggleText.innerHTML = "Don't have an account? <span>Register</span>";
        }
    });
    
    
    document.querySelectorAll('.card, .expert-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
