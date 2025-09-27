document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    var mobileMenu = document.querySelector('.mobile-menu');
    var navUl = document.querySelector('nav ul');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function () {
            navUl.classList.toggle('show');
        });
    }

    // Chat widget toggle
    var chatBtn = document.getElementById('chatBtn');
    var chatBox = document.getElementById('chatBox');
    var closeChat = document.getElementById('closeChat');
    
    if (chatBtn && chatBox) {
        chatBtn.addEventListener('click', function () {
            // Toggle display style between 'block' and 'none'
            var isVisible = chatBox.style.display === 'block';
            chatBox.style.display = isVisible ? 'none' : 'block';
            
            // Update accessibility attribute
            chatBox.setAttribute('aria-hidden', !isVisible);
        });
    }
    
    if (closeChat && chatBox) {
        closeChat.addEventListener('click', function () {
            chatBox.style.display = 'none';
            chatBox.setAttribute('aria-hidden', 'true');
        });
    }

    // Basic contact form handler (prevents real submit for demo)
    var qForm = document.getElementById('queryForm');
    if (qForm) {
        qForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // In a real application, you would send this data to a server here.
            alert('Thank you! Your message was sent (demo). Please check your email for a response!');
            qForm.reset();
        });
    }
});