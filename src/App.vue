<template>
  <header
    v-if="!shouldHideHeader"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
    :class="{ hovered: hovering, scrolled: scrolled }"
  >
    <div class="header-container">
      <!-- Logo with hover effect -->
      <div class="logo-container">
        <img
          alt="LML logo"
          class="logo"
          src="/public/images/logos/LML_logo.png"
          width="125"
          height="125"
        />
      </div>

      <!-- Hamburger Button for Mobile -->
      <button class="hamburger" @click="toggleMobileNav" aria-label="Toggle navigation menu">
        <div class="hamburger-icon" :class="{ 'is-active': isNavOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <!-- Nav with conditional visibility on small screens -->
      <nav :class="{ open: isNavOpen }">
        <div class="nav-links">
          <RouterLink to="/" @click="closeMobileNav">Home</RouterLink>
          <RouterLink to="/book-appointment" @click="closeMobileNav">Book Appointment</RouterLink>
          <RouterLink to="/locations" @click="closeMobileNav">Locations</RouterLink>
          <RouterLink to="/patient-reports" @click="closeMobileNav">Patient Reports</RouterLink>
          <RouterLink to="/test-catalog" @click="closeMobileNav">Test Catalog</RouterLink>
          <RouterLink to="/faq" @click="closeMobileNav">FAQ</RouterLink>
          <RouterLink to="/about" @click="closeMobileNav">About</RouterLink>
        </div>
      </nav>

      <div class="header-icons">
        <!-- Search Button with animation -->
        <button class="icon-btn search-btn" aria-label="Search">
          <i class="fas fa-search"></i>
        </button>

        <!-- User Dropdown -->
        <div class="user-dropdown" ref="dropdownRef">
          <button class="icon-btn user-btn" @click="toggleDropdown" aria-label="User menu">
            <i class="fas fa-user"></i>
          </button>
          <div v-if="isDropdownOpen" class="dropdown-menu">
            <RouterLink to="/profile" @click="closeDropdown">My Profile</RouterLink>
            <RouterLink to="/settings" @click="closeDropdown">Settings</RouterLink>           
            <RouterLink to="/register" @click="closeDropdown">Register</RouterLink>
            <RouterLink to="/login" @click="closeDropdown">Login</RouterLink>
            <RouterLink to="/admin-booking-panel" @click="closeDropdown">Admin</RouterLink>
            <button @click="handleLogout" class="dropdown-menu-link">Logout</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress indicator that appears when scrolling -->
    <div class="scroll-progress-container">
      <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }"></div>
    </div>
  </header>

  <!-- Spacer to prevent header overlap -->
  <div v-if="needsSpacer" class="header-spacer"></div>

  <RouterView />
  <AppFooter v-if="!shouldHideFooter"/> 
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppFooter from '@/components/footer/Footer.vue'

// Router instance
const router = useRouter()
const auth = useAuthStore()

// Header hover and scroll state
const hovering = ref(false)
const scrolled = ref(false)
const scrollProgress = ref(0)

// Dropdown state and ref
const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

// Navigation state for mobile
const isNavOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
  if (isDropdownOpen.value && isNavOpen.value) {
    isNavOpen.value = false // Close mobile nav when opening dropdown
  }
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const toggleMobileNav = () => {
  isNavOpen.value = !isNavOpen.value
  if (isNavOpen.value && isDropdownOpen.value) {
    isDropdownOpen.value = false // Close dropdown when opening mobile nav
  }
}

const closeMobileNav = () => {
  isNavOpen.value = false
}

const handleLogout = async () => {
  await auth.logout() // clear store
  closeDropdown()
  router.push('/login') // redirect to login page
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

// Update scroll progress bar
const updateScrollProgress = () => {
  const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (window.scrollY / scrollTotal) * 100
}

const updateHeaderState = () => {
  scrolled.value = window.scrollY > 50 || specialRoutes.includes(route.path)
  updateScrollProgress()
}

onMounted(() => {
  window.addEventListener('scroll', updateHeaderState)
  document.addEventListener('click', handleClickOutside)
  updateHeaderState()
  auth.loadAuth()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateHeaderState)
  document.removeEventListener('click', handleClickOutside)
})

// Route logic
const route = useRoute()

const hideHeaderRoutes = [
  '/admin-booking-panel',
  '/login',
  '/register',
  '/admin',
  '/dashboard',
  '/users',
  '/settings',
]
const shouldHideHeader = computed(() => hideHeaderRoutes.includes(route.path))

const specialRoutes = [
  '/test-catalog',
  '/about',
  '/faq',
  '/locations',
  '/book-appointment',
  '/patient-reports',
  '/profile',
]
const needsSpacer = computed(() => specialRoutes.includes(route.path))

watch(
  () => route.path,
  () => {
    updateHeaderState()
    isNavOpen.value = false // Close mobile nav on route change
    isDropdownOpen.value = false // Close dropdown on route change
  },
)

// Optionally, hide footer on the same routes as header
const hideFooterRoutes = [
  '/admin-booking-panel',
  '/login',
  '/register',
  '/admin',
  '/dashboard',
  '/users',
  '/settings',
];
const shouldHideFooter = computed(() => hideFooterRoutes.includes(route.path));
</script>

<style scoped>
/* Base header styles */
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  backdrop-filter: blur(0);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 2rem;
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
}

.header-spacer {
  height: 80px;
}

/* Logo styling with hover effect */
.logo-container {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.logo-container:hover {

}

.logo {
  width: auto;
  height: 50px;
  max-height: 100%;
  object-fit: contain;
  transition: filter 0.3s ease;
}

/* Improved navigation styling */
nav {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

nav a {
  position: relative;
  display: inline-block;
  padding: 0.5rem 0.75rem;
  margin: 0 0.25rem;
  text-decoration: none;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: color 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
}

nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #007bff;
  transition: all 0.3s ease;
  transform: translateX(-50%);
  opacity: 0;
}

nav a:hover::after,
nav a.router-link-active::after {
  width: 70%;
  opacity: 1;
}

nav a.router-link-active {
  font-weight: 600;
}

nav a:hover {
  color: #007bff !important;
}

/* Icons with improved hover effects */
.header-icons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-btn {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  color: white;
  overflow: hidden;
}

.icon-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(0);
  transition: transform 0.3s ease-out;
}

.icon-btn:hover::before {
  transform: scale(1);
}

.icon-btn i {
  font-size: 20px;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.icon-btn:hover {
  transform: translateY(-2px);
}

.icon-btn:hover i {
  color: #007bff !important;
}

.icon-btn:active {
  transform: translateY(1px);
}

/* Animated hamburger button */
.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 20;
}

.hamburger-icon {
  position: relative;
  width: 26px;
  height: 20px;
}

.hamburger-icon span {
  position: absolute;
  left: 0;
  height: 3px;
  width: 100%;
  background-color: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger-icon span:nth-child(1) {
  top: 0;
}

.hamburger-icon span:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.hamburger-icon span:nth-child(3) {
  bottom: 0;
}

.hamburger-icon.is-active span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger-icon.is-active span:nth-child(2) {
  opacity: 0;
}

.hamburger-icon.is-active span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

/* Dropdown styling */
.user-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 120%;
  right: 0;
  background-color: white;
  border-radius: 12px;
  padding: 0.75rem 0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05);
  min-width: 180px;
  z-index: 999;
  transform-origin: top right;
  animation: dropdownAppear 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  overflow: hidden;
}

@keyframes dropdownAppear {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.dropdown-menu a{
  display: block;
  padding: 0.75rem 1.25rem;
  text-decoration: none;
  color: #333;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  position: relative;
  text-align: left;
  width: 100%;
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
}
.dropdown-menu-link {
  display: block;
  padding: 0.75rem 1.25rem;
  text-decoration: none;
  color: red;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  position: relative;
  text-align: left;
  width: 100%;
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
}

.dropdown-menu a:hover{
  background-color: rgba(0, 123, 255, 0.08);
  color: #007bff;
  padding-left: 1.5rem;
}
.dropdown-menu-link:hover {
  background-color: rgba(221, 21, 21, 0.08);
  color: #bb0e0e;
  padding-left: 1.5rem;
}

.dropdown-menu a::before {
  content: '';
  position: absolute;
  left: 0.75rem;
  top: 50%;
  width: 3px;
  height: 0;
  background-color: #007bff;
  transform: translateY(-50%);
  opacity: 0;
  transition: all 0.2s ease;
}
.dropdown-menu-link::before {
  content: '';
  position: absolute;
  left: 0.75rem;
  top: 50%;
  width: 3px;
  height: 0;
  background-color: #ff0000;
  transform: translateY(-50%);
  opacity: 0;
  transition: all 0.2s ease;
}

.dropdown-menu a:hover::before,
.dropdown-menu-link:hover::before {
  height: 50%;
  opacity: 1;
}

/* Header state variants */
header.hovered {
  background-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

header.hovered nav a,
header.hovered .icon-btn {
  color: #333;
}

header.scrolled {
  background-color: rgba(47, 49, 147, 0.98);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

header.scrolled .hamburger-icon span {
  background-color: white;
}

header.hovered .hamburger-icon span {
  background-color: #333;
}

/* Scroll progress bar */
.scroll-progress-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: transparent;
  overflow: hidden;
}

.scroll-progress-bar {
  height: 100%;
  background: linear-gradient(to right, #007bff, #00c6ff);
  transition: width 0.1s ease;
}




/* === Overrides for Scrolled + Hovered State === */

/* Ensure Nav links remain white (including hover/active) when header is scrolled AND hovered */
header.scrolled.hovered nav a,
header.scrolled.hovered nav a:hover,
header.scrolled.hovered nav a.router-link-active {
  color: white; /* Keep text white */
}

/* Optional: Adjust the underline color for nav links in this state */
header.scrolled.hovered nav a:hover::after,
header.scrolled.hovered nav a.router-link-active::after {
  background: rgba(255, 255, 255, 0.8); /* Make underline white or slightly transparent white */
}


/* Ensure Icon Buttons base color remains white when scrolled AND hovered */
/* This overrides 'header.hovered .icon-btn { color: #333; }' */
header.scrolled.hovered .icon-btn {
  color: white;
}

/* Ensure Icons specifically remain white on button hover when scrolled AND hovered */
/* This overrides '.icon-btn:hover i { color: #007bff; }' */
header.scrolled.hovered .icon-btn:hover i {
  color: white;
}

/* Optional: Prevent or change the icon button background pulse effect in this state */
header.scrolled.hovered .icon-btn:hover::before {
  /* Option 1: Disable the pulse */
  /* transform: scale(0); */
  /* Option 2: Change the pulse color */
   background-color: rgba(255, 255, 255, 0.15); /* Subtler white pulse */
}

/* Ensure hamburger icon lines stay white when scrolled AND hovered */
/* (This overrides 'header.hovered .hamburger-icon span') */
header.scrolled.hovered .hamburger-icon span {
    background-color: white;
}

/* Responsive design */
@media (max-width: 1100px) {
  .header-container {
    padding: 0.75rem 1rem;
  }
  
  nav a {
    padding: 0.5rem 0.5rem;
    margin: 0 0.15rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 1024px) {
  .hamburger {
    display: block;
    order: 3;
  }
  
  .header-container {
    justify-content: space-between;
  }
  
  .logo-container {
    order: 1;
  }
  
  .header-icons {
    order: 2;
    margin-right: 1rem;
  }
  
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(47, 49, 147, 0.98);
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 15;
    backdrop-filter: blur(10px);
    visibility: hidden;
  }
  
  nav.open {
    transform: translateX(0);
    visibility: visible;
  }
  
  .nav-links {
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem 0;
  }
  
  nav a {
    font-size: 1.25rem;
    margin: 0;
    padding: 0.5rem 1rem;
    opacity: 0;
    transform: translateY(20px);
  }
  
  nav.open a {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  nav.open a:nth-child(1) { transition-delay: 0.1s; }
  nav.open a:nth-child(2) { transition-delay: 0.2s; }
  nav.open a:nth-child(3) { transition-delay: 0.3s; }
  nav.open a:nth-child(4) { transition-delay: 0.4s; }
  nav.open a:nth-child(5) { transition-delay: 0.5s; }
  nav.open a:nth-child(6) { transition-delay: 0.6s; }
  nav.open a:nth-child(7) { transition-delay: 0.7s; }
  
  .icon-btn {
    width: 36px;
    height: 36px;
  }
  
  .icon-btn i {
    font-size: 18px;
  }
  
  .dropdown-menu {
    right: -10px;
  }
}

@media (max-width: 640px) {
  .header-container {
    padding: 0.5rem 0.75rem;
  }
  
  .logo {
    height: 50px;
  }
  
  .header-icons {
    gap: 0.5rem;
  }
  
  .icon-btn {
    width: 32px;
    height: 32px;
  }
  
  .icon-btn i {
    font-size: 16px;
  }
  
  .dropdown-menu {
    min-width: 160px;
  }
}
</style>