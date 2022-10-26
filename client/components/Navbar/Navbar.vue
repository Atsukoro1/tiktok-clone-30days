<template>
    <nav class="bg-white dark:bg-gray-800 fixed top-0 w-full shadow-md">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="flex items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center">
              <img class="block h-8 w-auto lg:hidden" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
              <img class="hidden h-8 w-auto lg:block" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
            </div>
          </div>

          <div class="items-start flex-2 w-fit ml-auto mr-auto justify-center align-center">
            <SearchVue/>
          </div>

          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <ThemeSwitcherVue/>

            <div class="ml-6">
              <PersonalSection/>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-slate-300 dark:bg-gray-700 h-[1px] w-full">&nbsp;</div>

      <div class="sm:ml-6 sm:block mb-4 mt-3">
          <div class="space-x-4 flex-row justify-center align-center">
            <Link v-for="link in links"
              :key="link.text"
              :text="link.text"
              :link="link.link"
              :highlighted="link.hightlighted"
            />
          </div>
        </div>
    </nav>
</template>

<script>
  import PersonalSection from './PersonalSection.vue';
  import ThemeSwitcherVue from './ThemeSwitcher.vue';
  import SearchVue from './Search.vue';
  import Link from './Link.vue';

  export default {
    name: "Navbar",
    data() {
        return {
            links: [
                {
                    text: "Home",
                    url: "/",
                    hightlighted: true
                },
                {
                    text: "About",
                    url: "/about",
                    hightlighted: false
                },
                {
                    text: "Contact",
                    url: "/contact",
                    hightlighted: false
                },
            ]
        };
    },
    components: {
    Link,
    ThemeSwitcherVue,
    PersonalSection,
    SearchVue
    }
  }
</script>