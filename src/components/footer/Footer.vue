<template>
    <footer class="bg-[#2d307d] text-indigo-100 text-base leading-relaxed mt-20 relative border-t-4">
      <!-- Main Content Area -->
      <div class="container mx-auto px-0 pt-16 pb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
  
          <!-- Column 1: Brand & About -->
          <!-- Text centered on mobile/tablet, left-aligned on large screens -->
          <div class="footer-column text-center lg:text-left">
            <img
              alt="LML Logo"
              class="footer-logo block h-auto max-w-[340px] mb-5 filter brightness-110 mx-auto lg:mx-0"  
              src="/public/images/logos/LML_logo.png"
             
       
            />
            <p class="tagline text-sm text-indigo-200 mb-4 italic">
              Leading the way in diagnostic accuracy and patient care.
            </p>
            <p class="address text-sm text-indigo-200 leading-normal">
              123 Health Drive<br />
              Wellness City, HC 54321
            </p>
          </div>
  
          <!-- Column 2: Navigation Links -->
          <div class="footer-column text-center lg:text-left">
            <h4 class="footer-heading text-white text-lg font-semibold mb-3 pb-2 border-b-2 border-blue-500 inline-block lg:block lg:border-none lg:relative lg:after:content-[''] lg:after:absolute lg:after:bottom-0 lg:after:left-0 lg:after:w-10 lg:after:h-[2px] lg:after:bg-blue-500">
               Navigate
            </h4> 
             <!-- Replicated underline effect more closely for lg screens -->
            <nav class="flex flex-col gap-3 items-center lg:items-start mt-2 lg:mt-0">
               <!-- Added items-center lg:items-start -->
              <RouterLink to="/" class="hover:text-blue-600 hover:translate-x-1 transition-transform duration-300">Home</RouterLink>
              <RouterLink to="/book-appointment" class="hover:text-blue-600 hover:translate-x-1 transition-transform duration-300">Book Appointment</RouterLink>
              <RouterLink to="/locations" class="hover:text-blue-600 hover:translate-x-1 transition-transform duration-300">Locations</RouterLink>
              <RouterLink to="/patient-reports" class="hover:text-blue-600 hover:translate-x-1 transition-transform duration-300">Patient Reports</RouterLink>
              <RouterLink to="/test-catalog" class="hover:text-blue-600 hover:translate-x-1 transition-transform duration-300">Test Catalog</RouterLink>
            </nav>
          </div>
  
          <!-- Column 3: Resources & Support -->
          <div class="footer-column text-center lg:text-left">
           <h4 class="footer-heading text-white text-lg font-semibold mb-3 pb-2 border-b-2 border-blue-600 inline-block lg:block lg:border-none lg:relative lg:after:content-[''] lg:after:absolute lg:after:bottom-0 lg:after:left-0 lg:after:w-10 lg:after:h-[2px] lg:after:bg-blue-600">
               Support
           </h4>
           <nav class="flex flex-col gap-3 items-center lg:items-start mt-2 lg:mt-0">
               <!-- Added items-center lg:items-start -->
              <RouterLink to="/faq" class="hover:text-blue-600 hover:translate-x-1 transition-transform duration-300">FAQ</RouterLink>
              <RouterLink to="/about" class="hover:text-blue-600 hover:translate-x-1 transition-transform duration-300">About LML</RouterLink>
              <RouterLink to="/contact" class="hover:text-blue-600 hover:translate-x-1 transition-transform duration-300">Contact Us</RouterLink>
              <RouterLink to="/privacy-policy" class="hover:text-blue-600 hover:translate-x-1 transition-transform duration-300">Privacy Policy</RouterLink>
              <RouterLink to="/terms" class="hover:text-blue-600 hover:translate-x-1 transition-transform duration-300">Terms of Service</RouterLink>
            </nav>
          </div>
  
          <!-- Column 4: Connect & Subscribe -->
          <div class="footer-column text-center lg:text-left">
            <h4 class="footer-heading text-white text-lg font-semibold mb-3 pb-2 border-b-2 border-blue-500 inline-block lg:block lg:border-none lg:relative lg:after:content-[''] lg:after:absolute lg:after:bottom-0 lg:after:left-0 lg:after:w-10 lg:after:h-[2px] lg:after:bg-blue-500">
              Connect
            </h4>
            <div class="social-icons flex gap-4 mb-6 justify-center lg:justify-start">
               <!-- Added justify-center lg:justify-start -->
              <a href="#" target="_blank" aria-label="Facebook" title="Facebook" class="text-indigo-100 text-2xl transition-all duration-300 ease-in-out hover:text-blue-600 hover:scale-110 hover:-translate-y-0.5">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" target="_blank" aria-label="Twitter" title="Twitter" class="text-indigo-100 text-2xl transition-all duration-300 ease-in-out hover:text-blue-600 hover:scale-110 hover:-translate-y-0.5">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" target="_blank" aria-label="LinkedIn" title="LinkedIn" class="text-indigo-100 text-2xl transition-all duration-300 ease-in-out hover:text-blue-600 hover:scale-110 hover:-translate-y-0.5">
                <i class="fab fa-linkedin-in"></i>
              </a>
               <a href="#" target="_blank" aria-label="Instagram" title="Instagram" class="text-indigo-100 text-2xl transition-all duration-300 ease-in-out hover:text-blue-600 hover:scale-110 hover:-translate-y-0.5">
                <i class="fab fa-instagram"></i>
              </a>
            </div>
  
            <!-- Optional Newsletter Signup -->
            <h4 class="footer-heading text-white text-lg font-semibold mt-8 mb-3 pb-2 border-b-2 border-blue-500 inline-block lg:block lg:border-none lg:relative lg:after:content-[''] lg:after:absolute lg:after:bottom-0 lg:after:left-0 lg:after:w-10 lg:after:h-[2px] lg:after:bg-blue-500">
              Stay Updated
            </h4>
            <form @submit.prevent="handleSubscribe" class="newsletter-form flex mt-2 max-w-xs mx-auto lg:mx-0">
              <!-- Added mx-auto lg:mx-0 -->
              <input
                type="email"
                v-model="newsletterEmail"
                placeholder="Enter your email"
                required
                aria-label="Email for newsletter"
                class="flex-grow py-2 px-3 border-y border-l border-white bg-white/10 text-indigo-100 rounded-l text-sm focus:outline-none placeholder-indigo-300 placeholder-opacity-80 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/15"
                
              >
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                class="px-4 py-2 border-y border-r border-white bg-blue-500 text-white cursor-pointer rounded-r text-base transition-colors duration-300 ease-in-out hover:bg-blue-600"
           
              >
                <i class="fas fa-paper-plane"></i>
              </button>
            </form>
            <p v-if="subscribeMessage" class="subscribe-message text-xs mt-2 text-blue-400">
              {{ subscribeMessage }}
            </p>
            <!-- End Optional Newsletter -->
          </div>
        </div>
      </div>
  
      <!-- Footer Bottom Bar -->
      <div class="footer-bottom-bar bg-indigo-950 py-5 mt-12 text-xs text-indigo-300">
        <div class="container mx-auto px-4 flex flex-col md:flex-row justify-center md:justify-between items-center gap-2">
           <!-- Adjusted flex classes for responsive layout -->
          <p>© {{ currentYear }} LML Diagnostics Inc. All Rights Reserved.</p>
           <!-- Optional: Add secondary links like Privacy/Terms here -->
          <nav class="bottom-links">
             <RouterLink to="/privacy-policy" class="mx-2 hover:text-indigo-100 transition-colors duration-300">Privacy Policy</RouterLink>
             <span class="hidden md:inline">|</span>
             <RouterLink to="/terms" class="mx-2 hover:text-indigo-100 transition-colors duration-300">Terms of Service</RouterLink>
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
  
  // Newsletter State (Optional)
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