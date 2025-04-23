<template>
  <header
    v-if="!shouldHideHeader"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
    :class="{ hovered: hovering, scrolled: scrolled }"
  >
  <div class="header-container">
  <img
    alt="Vue logo"
    class="logo"
    src="/public/images/logos/LML_logo.png"
    width="125"
    height="125"
  />

  <!-- Hamburger Button for Mobile -->
  <button class="hamburger" @click="isNavOpen = !isNavOpen">
    <i class="fas fa-bars"></i>
  </button>

  <!-- Nav with conditional visibility on small screens -->
  <nav :class="{ open: isNavOpen }">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/book-appointment">Book Appointment</RouterLink>
    <RouterLink to="/locations">Locations</RouterLink>
    <RouterLink to="/patient-reports">Patient Reports</RouterLink>
    <RouterLink to="/test-catalog">Test Catalog</RouterLink>
    <RouterLink to="/faq">FAQ</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>

  <div class="header-icons">
    <button class="icon-btn"><i class="fas fa-search"></i></button>

    <!-- User Dropdown -->
    <div class="user-dropdown" ref="dropdownRef">
      <button class="icon-btn" @click="toggleDropdown">
        <i class="fas fa-user"></i>
      </button>
      <div v-if="isDropdownOpen" class="dropdown-menu">
        <RouterLink to="/profile">My Profile</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
        <RouterLink to="/logout">Logout</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/admin-booking-panel">Admin</RouterLink>
      </div>
    </div>

    <button class="icon-btn"><i class="fas fa-shopping-cart"></i></button>
  </div>
</div>

  </header>

  <!-- Spacer to prevent header overlap -->
  <div v-if="needsSpacer" class="header-spacer"></div>

  <RouterView />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

// Header hover and scroll state
const hovering = ref(false)
const scrolled = ref(false)

// Dropdown state and ref
const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

// Navigation state for mobile
const isNavOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateHeaderState)
  document.addEventListener('click', handleClickOutside)
  updateHeaderState()
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
]
const needsSpacer = computed(() => specialRoutes.includes(route.path))

const updateHeaderState = () => {
  scrolled.value = window.scrollY > 50 || specialRoutes.includes(route.path)
}

watch(
  () => route.path,
  () => {
    updateHeaderState()
  },
)
</script>

<style scoped>
/* Hamburger Button */
.hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 28px;
  color: white;
  cursor: pointer;
}
/* General Header Styling */
header {
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
  padding: 1rem 2rem;
  z-index: 1000;
  width: 100%;
  transition: background-color 0.3s ease;
}

.header-spacer {
  height: 90px;
}

.header-container {
  display: flex;
  flex-wrap: wrap; /* allows wrapping on smaller screens */
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
}

.logo {
  width: auto;
  height: 60px; /* adjust height only */
  max-height: 100%;
}

/* Navigation Styling */
nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-grow: 1;
}

nav a {
  display: inline-block;
  padding: 0.75rem 1rem;
  margin: 0 1rem;
  text-decoration: none;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  transition:
    color 0.3s,
    transform 0.3s;

  padding: 0.5rem 0.75rem;
  margin: 0 0.25rem;
  white-space: nowrap;
}

nav a:hover {
  color: #007bff !important;
}

/* Icons */
.header-icons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition:
    transform 0.3s,
    color 0.3s;
  color: white;
}

.icon-btn i {
  font-size: 24px;
  transition: opacity 0.3s;
}

.icon-btn:hover {
  transform: scale(1.1);
  color: #007bff !important;
}

.icon-btn:hover i {
  opacity: 0.8;
}

/* Hover/Scroll Variants */
header.hovered nav a {
  color: black;
}

header.hovered {
  background-color: white;
}

header.hovered .icon-btn {
  color: black;
}

header.scrolled {
  background-color: #2f3193;
}

header.scrolled nav a {
  color: white;
}

header.scrolled .icon-btn {
  color: white !important;
}

header.scrolled .icon-btn:hover {
  color: #007bff !important;
}

header.scrolled .icon-btn i {
  color: white !important;
  transition: color 0.3s ease;
}

header.scrolled .icon-btn:hover i {
  color: #007bff !important;
}

/* Dropdown */
.user-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 110%;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.5rem 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-width: 160px;
  z-index: 999;
}

.dropdown-menu a {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #333;
  transition: background 0.2s;
}

.dropdown-menu a:hover {
  background-color: #f0f0f0;
}

/* Responsive */
@media (max-width: 1024px) {
  .hamburger {
    display: block;
  }
  .header-container {
    height: auto; /* allow height to expand when stacked */
    flex-direction: column;
    padding: 1rem;
    text-align: center;
  }

  .logo {
    height: 50px;
    margin-bottom: 0.5rem;
  }

  nav {
    display: none;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 1rem;
  }
  nav.open {
    display: flex;
  }
  nav a {
    margin: 0.5rem 0;
    font-size: 1rem;
  }

  .header-icons {
    margin-top: 0.5rem;
    gap: 0.75rem;
  }
}
</style>
