<template>
    <div v-if="this.$auth.loggedIn">
        <button @focusout="toggleDropdown" @click="toggleDropdown" 
            :class="`
                rounded-full focus:outline-none focus:ring focus:ring-gray-400
                dark:focus:ring-gray-600 focus:ring-opacity-50
            `">
            <span class="sr-only">Open user menu</span>
            <img 
                class="w-10 h-10 rounded-full hover:cursor-pointer dark:hover:opacity-80" 
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" 
                alt="Rounded avatar"
            />
        </button>

        <div :class="`
            absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 
            shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800
            dark:ring-gray-600
            ${this.dropdownOpen ? 'block' : 'hidden'}
        `"
        >
            <button v-for="link in links" @click.prevent="link.onClick">
            <a 
                href="#" 
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 text-bold" 
                >
                <fa-icon
                    :icon="link.icon"
                />
                {{ link.name }}
            </a>
            </button>
        </div>
    </div>
    
    <div v-else="this.$auth.loggedIn">
        <a @click.prevent="$router.push({ name: 'auth' })">
            <button class="bg-blue-600 p-2 rounded-lg text-white pr-4 pl-4">
                Sign in
            </button>
        </a>
    </div>
</template>

<script>
    export default {
        name: "PersonalSection",
        data() {
            return {
                dropdownOpen: false,
                links: [
                    {
                        name: "Your Profile",
                        icon: ["fas", "user"],
                        onClick: this.onprofile
                    },
                    {
                        name: "Settings",
                        icon: ["fas", "gear"],
                        onClick: this.onsettings
                    },
                    {
                        name: "Sign out",
                        icon: ["fas", "right-from-bracket"],
                        onClick: this.onsignout
                    }
                ]
            }
        },
        methods: {
            toggleDropdown() {
                // This is done to prevent modal from dissapearing when clicking on it
                setTimeout(() => {
                    this.dropdownOpen = !this.dropdownOpen;
                }, 100);
            },

            onprofile() {
                console.log("Profile opened");
            },

            onsettings() {
                console.log("Settings opened");
            },

            onsignout() {
                this.$auth.logout();
                this.$router.push({ name: "auth" });
            }
        }
    }
</script>