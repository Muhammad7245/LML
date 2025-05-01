<template>
  <footer class="bg-gradient-to-br from-blue-900 to-indigo-950 text-white text-base leading-relaxed mt-20 relative border-t-2 border-blue-500">
    <!-- Wave SVG Divider -->
    
    <!-- Main Content Area -->
    <div class="container mx-auto px-4 pt-20 pb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        <!-- Column 1: Brand & About -->
        <div class="footer-column text-center lg:text-left">
          <div class="relative mb-6 group cursor-pointer">
            <img
              alt="LML Logo"
              class="footer-logo block h-auto max-w-[240px] mb-5 mx-auto lg:mx-0 transition-all duration-300 group-hover:scale-105"  
              src="/public/images/logos/LML_logo.png"
            />
            <div class="absolute -inset-0.5  from-blue-400 to-indigo-500 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
          </div>
          <p class="tagline text-sm text-blue-200 mb-4 italic font-light">
            Leading the way in diagnostic accuracy and patient care.
          </p>
          <div class="flex items-center justify-center lg:justify-start mb-4 text-sm">
            <span class="inline-flex bg-blue-600/20 rounded-full p-1.5 text-blue-300 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <address class="text-indigo-200 leading-normal not-italic">
              123 Health Drive<br />
              Wellness City, HC 54321
            </address>
          </div>
        </div>

        <!-- Column 2: Navigation Links -->
        <div class="footer-column text-center lg:text-left">
          <h4 class="footer-heading relative text-white text-lg font-semibold mb-6 pb-2 inline-block">
            Navigate
            <span class="absolute -bottom-1 left-0 right-0 lg:right-auto lg:w-16 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-400"></span>
          </h4>
          <nav class="flex flex-col gap-3 items-center lg:items-start">
            <RouterLink to="/" class="group flex items-center hover:text-blue-300 transition-all duration-200">
              <span class="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
              Home
            </RouterLink>
            <RouterLink to="/book-appointment" class="group flex items-center hover:text-blue-300 transition-all duration-200">
              <span class="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
              Book Appointment
            </RouterLink>
            <RouterLink to="/locations" class="group flex items-center hover:text-blue-300 transition-all duration-200">
              <span class="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
              Locations
            </RouterLink>
            <RouterLink to="/patient-reports" class="group flex items-center hover:text-blue-300 transition-all duration-200">
              <span class="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
              Patient Reports
            </RouterLink>
            <RouterLink to="/test-catalog" class="group flex items-center hover:text-blue-300 transition-all duration-200">
              <span class="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
              Test Catalog
            </RouterLink>
          </nav>
        </div>

        <!-- Column 3: Resources & Support -->
        <div class="footer-column text-center lg:text-left">
          <h4 class="footer-heading relative text-white text-lg font-semibold mb-6 pb-2 inline-block">
            Support
            <span class="absolute -bottom-1 left-0 right-0 lg:right-auto lg:w-16 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-400"></span>
          </h4>
          <nav class="flex flex-col gap-3 items-center lg:items-start">
            <RouterLink to="/faq" class="group flex items-center hover:text-blue-300 transition-all duration-200">
              <span class="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
              FAQ
            </RouterLink>
            <RouterLink to="/about" class="group flex items-center hover:text-blue-300 transition-all duration-200">
              <span class="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
              About LML
            </RouterLink>
            <RouterLink to="/contact" class="group flex items-center hover:text-blue-300 transition-all duration-200">
              <span class="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
              Contact Us
            </RouterLink>
            <RouterLink to="/privacy-policy" class="group flex items-center hover:text-blue-300 transition-all duration-200">
              <span class="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
              Privacy Policy
            </RouterLink>
            <RouterLink to="/terms" class="group flex items-center hover:text-blue-300 transition-all duration-200">
              <span class="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
              Terms of Service
            </RouterLink>
          </nav>
        </div>

        <!-- Column 4: Connect & Subscribe -->
        <div class="footer-column text-center lg:text-left">
          <h4 class="footer-heading relative text-white text-lg font-semibold mb-6 pb-2 inline-block">
            Connect
            <span class="absolute -bottom-1 left-0 right-0 lg:right-auto lg:w-16 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-400"></span>
          </h4>
          <div class="social-icons flex gap-4 mb-8 justify-center lg:justify-start">
            <a href="#" target="_blank" aria-label="Facebook" title="Facebook" class="bg-blue-800/30 text-blue-200 hover:text-white hover:bg-blue-600 p-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center w-10 h-10">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" target="_blank" aria-label="Twitter" title="Twitter" class="bg-blue-800/30 text-blue-200 hover:text-white hover:bg-blue-400 p-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center w-10 h-10">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" target="_blank" aria-label="LinkedIn" title="LinkedIn" class="bg-blue-800/30 text-blue-200 hover:text-white hover:bg-blue-700 p-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center w-10 h-10">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="#" target="_blank" aria-label="Instagram" title="Instagram" class="bg-blue-800/30 text-blue-200 hover:text-white hover:bg-gradient-to-br from-purple-600 to-pink-500 p-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center w-10 h-10">
              <i class="fab fa-instagram"></i>
            </a>
          </div>

          <!-- Newsletter Signup -->
          <h4 class="footer-heading relative text-white text-lg font-semibold mt-8 mb-6 pb-2 inline-block">
            Stay Updated
            <span class="absolute -bottom-1 left-0 right-0 lg:right-auto lg:w-16 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-400"></span>
          </h4>
          <form @submit.prevent="handleSubscribe" class="newsletter-form relative mx-auto lg:mx-0 max-w-xs">
            <div class="absolute inset-0 bg-blue-500/20 rounded-lg blur-md -z-10"></div>
            <div class="flex">
              <input
                type="email"
                v-model="newsletterEmail"
                placeholder="Enter your email"
                required
                aria-label="Email for newsletter"
                class="flex-grow py-3 px-4 bg-white/10 border border-blue-300/30 text-white rounded-l-lg text-sm focus:outline-none placeholder:text-blue-200/70 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
              >
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 rounded-r-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 flex items-center justify-center group"
              >
                <span class="hidden md:inline mr-2">Subscribe</span>
                <i class="fas fa-paper-plane group-hover:translate-x-1 transition-transform duration-300"></i>
              </button>
            </div>
            <p v-if="subscribeMessage" class="subscribe-message text-xs mt-2 text-blue-300 font-medium">
              {{ subscribeMessage }}
            </p>
          </form>
        </div>
      </div>
    </div>

    <!-- Quality Badges Section -->
    <div class="py-8 bg-indigo-950/50 backdrop-blur-sm">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-8 items-center">
          <div class="badge flex flex-col items-center text-center">
            <div class="icon-wrapper mb-2 bg-blue-800/20 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span class="text-xs font-medium text-blue-200">CLIA Certified</span>
          </div>
          <div class="badge flex flex-col items-center text-center">
            <div class="icon-wrapper mb-2 bg-blue-800/20 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <span class="text-xs font-medium text-blue-200">HIPAA Compliant</span>
          </div>
          <div class="badge flex flex-col items-center text-center">
            <div class="icon-wrapper mb-2 bg-blue-800/20 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span class="text-xs font-medium text-blue-200">24/7 Results</span>
          </div>
          <div class="badge flex flex-col items-center text-center">
            <div class="icon-wrapper mb-2 bg-blue-800/20 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <span class="text-xs font-medium text-blue-200">Rapid Testing</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bottom Bar -->
    <div class="footer-bottom-bar bg-indigo-950 py-5 text-xs text-indigo-300 border-t border-blue-900/50">
      <div class="container mx-auto px-4 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4">
        <div class="flex items-center">
          <p>© {{ currentYear }} LML Diagnostics Inc. All Rights Reserved.</p>
        </div>
        <nav class="bottom-links flex flex-wrap justify-center gap-x-6">
          <RouterLink to="/privacy-policy" class="hover:text-blue-300 transition-colors duration-300">Privacy Policy</RouterLink>
          <RouterLink to="/terms" class="hover:text-blue-300 transition-colors duration-300">Terms of Service</RouterLink>
          <RouterLink to="/accessibility" class="hover:text-blue-300 transition-colors duration-300">Accessibility</RouterLink>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router'; // Import if not globally registered

// Dynamic Year
const currentYear = computed(() => new Date().getFullYear());

// Newsletter State
const newsletterEmail = ref('');
const subscribeMessage = ref('');
const handleSubscribe = () => {
  if (!newsletterEmail.value || !newsletterEmail.value.includes('@')) {
    subscribeMessage.value = 'Please enter a valid email.';
    return;
  }
  console.log('Subscribing email:', newsletterEmail.value);
  subscribeMessage.value = 'Thank you for subscribing!';
  newsletterEmail.value = ''; // Clear input
  setTimeout(() => subscribeMessage.value = '', 3000); // Clear message after 3s
}

// REMEMBER: Ensure Font Awesome (fas & fab) is included in your project for icons to work.
</script>

<!-- No <style scoped> block needed when using Tailwind extensively -->