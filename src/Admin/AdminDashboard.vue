<template>
    <div class="min-h-screen bg-gray-100">
      <!-- Top Navigation Bar -->
      <!-- <nav class="bg-white shadow-sm px-6 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span class="ml-2 text-xl font-bold text-gray-800">Admin Portal</span>
          </div>
          <div class="flex items-center space-x-4">
            <div class="relative">
              <input
                type="text"
                placeholder="Search..."
                class="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button class="relative p-1 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
              <span class="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div class="flex items-center space-x-2">
              <div class="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white font-medium">
                AM 
              </div>
              <span class="text-sm font-medium text-gray-700">Admin</span>
             
            </div>
          </div>
        </div>
      </nav> -->
  
      <!-- Main Content -->
      <div class="container mx-auto py-6 px-4">
        <!-- Welcome Header -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-800">Welcome back, Admin</h1>
          <p class="text-gray-600">Here's what's happening with your platform today.</p>
        </div>
  
        <!-- Dashboard Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow p-4 flex items-center">
            <div class="rounded-full bg-blue-100 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-sm font-medium text-gray-600">Total Users</h2>
              <p class="text-xl font-bold text-gray-800">1,234</p> 
              <span class="text-sm text-green-600">↑ 12% from last month</span>
            </div>
          </div>
  
          <div class="bg-white rounded-lg shadow p-4 flex items-center">
            <div class="rounded-full bg-green-100 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-sm font-medium text-gray-600">New Appointments</h2>
              <p class="text-xl font-bold text-gray-800">45</p>
              <span class="text-sm text-green-600">↑ 8% from last week</span>
            </div>
          </div>
  
          <div class="bg-white rounded-lg shadow p-4 flex items-center">
            <div class="rounded-full bg-purple-100 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-sm font-medium text-gray-600">Reports Generated</h2>
              <p class="text-xl font-bold text-gray-800">89</p> 
              <span class="text-sm text-red-600">↓ 5% from last month</span>
            </div>
          </div>
  
          <div class="bg-white rounded-lg shadow p-4 flex items-center">
            <div class="rounded-full bg-yellow-100 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-sm font-medium text-gray-600">Revenue</h2>
              <p class="text-xl font-bold text-gray-800">$23,456</p> 
              <span class="text-sm text-green-600">↑ 15% from last month</span>
            </div>
          </div>
        </div>
  
        <!-- Four Main Navigation Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Appointments Card -->
          <router-link to="/admin-booking-panel" class="block bg-white rounded-lg shadow overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <div class="bg-blue-600 h-2"></div>
            <div class="p-5">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-800">Appointments</h3>
                <div class="rounded-full bg-blue-100 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p class="mt-2 text-sm text-gray-600">Manage client appointments, scheduling and calendar</p>
              <div class="mt-4 flex items-center">
                <span class="text-xl font-bold text-gray-800">45</span> 
                <span class="ml-2 text-sm text-gray-600">pending today</span>
              </div>
            </div>
          </router-link>
  
          <!-- Users Card -->
          <router-link to="/users" class="block bg-white rounded-lg shadow overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <div class="bg-green-600 h-2"></div>
            <div class="p-5">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-800">Users</h3>
                <div class="rounded-full bg-green-100 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <p class="mt-2 text-sm text-gray-600">Manage user accounts, permissions and roles</p>
              <div class="mt-4 flex items-center">
                <span class="text-xl font-bold text-gray-800">1,234</span> 
                <span class="ml-2 text-sm text-gray-600">active users</span>
              </div>
            </div>
          </router-link>
  
          <!-- Reports Card -->
          <router-link to="/admin/reports" class="block bg-white rounded-lg shadow overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            <div class="bg-purple-600 h-2"></div>
            <div class="p-5">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-800">Reports</h3>
                <div class="rounded-full bg-purple-100 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <p class="mt-2 text-sm text-gray-600">Generate analytics and insights reports</p>
              <div class="mt-4 flex items-center">
                <span class="text-xl font-bold text-gray-800">89</span> 
                <span class="ml-2 text-sm text-gray-600">reports available</span>
              </div>
            </div>
          </router-link>
  
          <!-- Settings Card -->
          <router-link to="/settings" class="block bg-white rounded-lg shadow overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <div class="bg-gray-600 h-2"></div>
            <div class="p-5">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-800">Settings</h3>
                <div class="rounded-full bg-gray-100 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <p class="mt-2 text-sm text-gray-600">Configure system preferences and parameters</p>
              <div class="mt-4 flex items-center">
                <span class="text-sm text-gray-600">Configure system</span>
              </div>
            </div>
          </router-link>
        </div>
  
        <!-- Two Column Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Recent Activity Column -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow">
              <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 class="text-lg font-semibold text-gray-800">Recent Activity</h3>
                <button class="text-sm text-green-600 hover:text-green-800 focus:outline-none">View All</button>
              </div>
              <div class="p-6">
                <div class="space-y-6">
                  <!-- Activity Item 1 -->
                  <div class="flex items-start">
                    <div class="h-10 w-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div class="ml-4 flex-1">
                      <p class="text-sm font-medium text-gray-800">New user registered</p>
                      <p class="text-sm text-gray-600">John Smith created a new account</p>
                      <p class="text-xs text-gray-500 mt-1">10 minutes ago</p>
                    </div>
                  </div>
  
                  <!-- Activity Item 2 -->
                  <div class="flex items-start">
                    <div class="h-10 w-10 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div class="ml-4 flex-1">
                      <p class="text-sm font-medium text-gray-800">New appointment scheduled</p>
                      <p class="text-sm text-gray-600">Sara Johnson booked a consultation</p>
                      <p class="text-xs text-gray-500 mt-1">45 minutes ago</p>
                    </div>
                  </div>
  
                  <!-- Activity Item 3 -->
                  <div class="flex items-start">
                    <div class="h-10 w-10 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center text-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div class="ml-4 flex-1">
                      <p class="text-sm font-medium text-gray-800">System alert</p>
                      <p class="text-sm text-gray-600">Storage reaching capacity (85% used)</p>
                      <p class="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
  
                  <!-- Activity Item 4 -->
                  <div class="flex items-start">
                    <div class="h-10 w-10 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center text-purple-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div class="ml-4 flex-1">
                      <p class="text-sm font-medium text-gray-800">Monthly report generated</p>
                      <p class="text-sm text-gray-600">March 2025 performance report is ready</p>
                      <p class="text-xs text-gray-500 mt-1">5 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Quick Actions -->
            <div class="mt-6 bg-white rounded-lg shadow">
              <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-800">Quick Actions</h3>
              </div>
              <div class="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <button class="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg flex flex-col items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span class="mt-2 text-sm text-gray-700">Add User</span>
                </button>
                <button class="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg flex flex-col items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="mt-2 text-sm text-gray-700">Schedule</span>
                </button>
                <button class="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg flex flex-col items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="mt-2 text-sm text-gray-700">New Report</span>
                </button>
                <button class="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg flex flex-col items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span class="mt-2 text-sm text-gray-700">Edit Page</span> 
                </button>
              </div>
            </div>
          </div> 
           <!-- End Left Column  -->
  
          <!-- Right Column -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Task Management Widget -->
            <div class="bg-white rounded-lg shadow">
              <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 class="text-lg font-semibold text-gray-800">Tasks</h3>
                <button class="text-sm text-green-600 hover:text-green-800 focus:outline-none">Add Task</button>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  <!-- Task Item 1 -->
                  <div class="flex items-center">
                    <input type="checkbox" id="task1" class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                    <div class="ml-3 flex-1">
                      <label for="task1" class="text-sm font-medium text-gray-800 cursor-pointer">Review new user registrations</label>
                      <p class="text-xs text-gray-500">Due today</p>
                    </div>
                    <span class="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">Urgent</span>
                  </div>
  
                  <!-- Task Item 2 -->
                  <div class="flex items-center">
                    <input type="checkbox" id="task2" class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                    <div class="ml-3 flex-1">
                      <label for="task2" class="text-sm font-medium text-gray-800 cursor-pointer">Update monthly reports</label>
                      <p class="text-xs text-gray-500">Due in 2 days</p>
                    </div>
                    <span class="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Medium</span>
                  </div>
  
                  <!-- Task Item 3 -->
                  <div class="flex items-center">
                    <input type="checkbox" id="task3" class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                    <div class="ml-3 flex-1">
                      <label for="task3" class="text-sm font-medium text-gray-800 cursor-pointer">Schedule system maintenance</label>
                      <p class="text-xs text-gray-500">Due next week</p>
                    </div>
                    <span class="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">Low</span>
                  </div>
  
                  <!-- Task Item 4 -->
                  <div class="flex items-center">
                    <input type="checkbox" id="task4" class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                    <div class="ml-3 flex-1">
                      <label for="task4" class="text-sm font-medium text-gray-800 cursor-pointer">Prepare quarterly presentation</label>
                      <p class="text-xs text-gray-500">Due in 10 days</p>
                    </div>
                    <span class="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Medium</span>
                  </div>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-200 text-center">
                  <button class="text-sm text-gray-600 hover:text-gray-800 focus:outline-none">View All Tasks</button>
                </div>
              </div>
            </div>
  
            <!-- System Status Widget -->
            <div class="bg-white rounded-lg shadow">
              <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-800">System Status</h3>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  <!-- Status Item 1 -->
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-gray-700">Server Uptime</span>
                      <span class="text-sm font-semibold text-green-600">99.98%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-1.5">
                      <div class="bg-green-600 h-1.5 rounded-full" style="width: 99.98%"></div>
                    </div>
                  </div>
  
                  <!-- Status Item 2 -->
                   <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-gray-700">Database Connection</span>
                       <span class="text-sm font-semibold text-green-600">Healthy</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-1.5">
                      <div class="bg-green-600 h-1.5 rounded-full" style="width: 100%"></div>
                    </div>
                  </div>
  
                  <!-- Status Item 3 -->
                   <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-gray-700">API Response Time</span>
                      <span class="text-sm font-semibold text-blue-600">120ms</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-1.5">
                   <!-- Assuming 120ms is good relative to a 500ms threshold  -->
                      <div class="bg-blue-600 h-1.5 rounded-full" style="width: 76%"></div>
                    </div>
                  </div>
  
                   <!-- Status Item 4 -->
                   <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-gray-700">Disk Usage</span>
                      <span class="text-sm font-semibold text-yellow-600">75%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-1.5">
                      <div class="bg-yellow-500 h-1.5 rounded-full" style="width: 75%"></div>
                    </div>
                  </div>
  
                </div>
              </div>
            </div> 
            <!-- /* End System Status Widget */ -->
  
          </div>
           <!-- {/* End Right Column */} -->
        </div> 
        <!-- {/* End Two Column Layout */} -->
  
      </div> 
      <!-- {/* End Main Content Container */} -->
    </div>
     <!-- {/* End Root Template Div */} -->
  </template>
  
  <script setup>
  // No specific script logic is required for this static layout example yet.
  // You would import components or fetch data here in a real application.
  import { ref } from 'vue'; // Example import if needed later
  
  // Example reactive data (replace with actual data fetching)
  const totalUsers = ref(1234);
  const newAppointments = ref(45);
  // etc.
  
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  /* Example: Add subtle animation to summary card percentage */
  .text-green-600, .text-red-600 {
    transition: color 0.3s ease;
  }
  
  /* You can leverage Tailwind's @apply directive for cleaner custom styles */
  /* .my-custom-button {
    @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700;
  } */
  </style>