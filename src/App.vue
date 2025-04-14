<template>
  <header
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

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/book-appointment">Book Appointment</RouterLink>
        <RouterLink to="/locations">Locations</RouterLink>
        <RouterLink to="/patient-reports">Patient Reports</RouterLink>
        <RouterLink to="/test-catalog">Test Catalog</RouterLink>
        <RouterLink to="/faq">FAQ</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>

      <div class="header-icons">
        <button class="icon-btn">
          <i class="fas fa-search"></i>
        </button>
        <button class="icon-btn">
          <i class="fas fa-user"></i>
        </button>
        <button class="icon-btn">
          <i class="fas fa-shopping-cart"></i>
        </button>
      </div>
    </div>
  </header>

  <!-- Spacer to prevent header overlap on selected pages -->
  <div v-if="needsSpacer" class="header-spacer"></div>

  <RouterView />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

// 1. Reactive state
const hovering = ref(false)
const scrolled = ref(false)

// 2. Access current route
const route = useRoute()

// 3. Routes that should force the header background + spacing
const specialRoutes = ['/test-catalog', '/about', '/faq', '/locations', '/book-appointment', '/patient-reports']

// 4. Check if current route needs spacer
const needsSpacer = computed(() => specialRoutes.includes(route.path))

// 5. Handle scroll and route-based background
const updateHeaderState = () => {
  scrolled.value = window.scrollY > 50 || specialRoutes.includes(route.path)
}

onMounted(() => {
  window.addEventListener('scroll', updateHeaderState)
  updateHeaderState()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateHeaderState)
})

// 6. Watch for route changes
watch(() => route.path, () => {
  updateHeaderState()
})
</script>

<style scoped>
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
  height: 90px; /* Match your header's visual height */
}
header.hovered nav a {
  color: black;
}
header.hovered {
  background-color: white;
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
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  display: block;
  width: 230px;
  height: 50px;
}
nav {
  flex-grow: 1;
  text-align: center;
}
nav a {
  display: inline-block;
  padding: 0.75rem 1rem;
  margin: 0 1rem;
  text-decoration: none;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  transition: color 0.3s, transform 0.3s;
}
nav a:hover {
  color: #007bff !important;
}
.header-icons {
  display: flex;
  gap: 1.5rem;
}
.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.3s, color 0.3s;
  color: white;
}
.icon-btn:hover {
  transform: scale(1.1);
  color: #007bff !important;
}
header.hovered .icon-btn {
  color: black;
}
.icon-btn i {
  font-size: 24px;
  transition: opacity 0.3s;
}
.icon-btn:hover i {
  opacity: 0.8;
}

@media (max-width: 1024px) {
  .header-container {
    flex-direction: column;
    align-items: center;
  }

  nav {
    text-align: center;
    margin-top: 1rem;
  }

  .header-icons {
    margin-top: 1rem;
    gap: 1rem;
  }
}
</style>
