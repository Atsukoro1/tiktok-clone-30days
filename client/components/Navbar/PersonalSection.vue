<template>
    <div v-if="this.$auth.loggedIn">
        <button @focusin="toggleDropdown" @focusout="toggleDropdown" 
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
            <a 
                v-for="link in links"
                @click="eval(link.action)"
                href="#" 
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 text-bold" 
                role="menuitem" 
                tabindex="-1" 
                id="user-menu-item-0">
                <fa-icon
                    :icon="link.icon"
                />
                {{ link.name }}
            </a>
        </div>
    </div>
    
    <div v-else="this.$auth.loggedIn">
        <h1>Not logged in</h1>
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
                        onClick: this.onProfile
                    },
                    {
                        name: "Settings",
                        icon: ["fas", "gear"],
                        onClick: this.onSettings
                    },
                    {
                        name: "Sign out",
                        icon: ["fas", "right-from-bracket"],
                        onClick: this.onSignOut
                    }
                ]
            }
        },
        methods: {
            toggleDropdown() {
                this.dropdownOpen = !this.dropdownOpen;
            },

            onProfile() {
                console.log("Profile opened");
            },

            onSettings() {
                console.log("Settings opened");
            },

            onSignOut() {
                console.log("Signed out opened");
            }
        }
    }
</script>