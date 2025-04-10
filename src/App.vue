<template>
  <header @mouseenter="hovering = true" @mouseleave="hovering = false" :class="{ hovered: hovering }">
    <div class="header-container">
      <img alt="Vue logo" class="logo" src="/public/images/logos/LML_logo.png" width="125" height="125" />

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

  <RouterView />
</template>
<script>
export default {
  data() {
    return {
      hovering: false
    }
  }
}
</script>


<style scoped>
header {
  position: fixed; /* ✅ changed from absolute */
  top: 0;
  left: 0;
  background-color: transparent;
  padding: 1rem 2rem;
  z-index: 1000;
  width: 100%;
  transition: background-color 0.3s ease;
}


header.hovered {
  background-color: white;
}

header.hovered nav a {
  color: black;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: block;
  width: 210px;
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
}

.icon-btn:hover {
  transform: scale(1.1);
  color: #007bff;
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
