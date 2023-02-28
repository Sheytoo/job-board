<script>
    import { Link, navigate } from "svelte-routing";
    import { createEventDispatcher } from "svelte";
    import Cookies from "js-cookie";

    const dispatch = createEventDispatcher();

    let profileMenu = false;
    let mobileMenu = false;

    function logout() {
        profileMenu = false;
        Cookies.remove("token");
        dispatch("logout");
        navigate("/");
    }

    export let user;
    export let nbNotifications;
</script>

<nav class="bg-gray-800 px-2 sm:px-4 py-2 w-full sticky shadow-lg z-48 top-0 left-0 ">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <!-- Mobile menu button -->
                <button type="button"
                        class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
                        on:click={() => mobileMenu = !mobileMenu}>
                    <span class="sr-only">Open main menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="block w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                    </svg>
                </button>
            </div>
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <a href="/" class="flex flex-shrink-0 items-center">
                    <img class="block h-8 w-auto lg:hidden" src="/logo.png" alt="Your Company">
                    <img class="hidden h-8 w-auto lg:block" src="/logo.png" alt="Your Company">
                    <h1 class="hidden h-8 w-auto lg:block text-2xl font-semibold ml-3 text-sky-400">JobBoard</h1>
                </a>
                <div class="hidden sm:ml-6 sm:block">
                    <div class="flex space-x-4">
                        <slot></slot>
                    </div>
                </div>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {#if user.firstName}
                    <Link to="/notifications"
                          class="inline-flex relative items-center p-1 text-sm font-medium text-center text-gray-400 hover:text-white rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd"
                                  d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                                  clip-rule="evenodd"/>
                        </svg>
                        {#if nbNotifications > 0}
                            <span class="inline-flex absolute -top-1 -right-1 justify-center items-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full border-2 border-gray-800">
                                {nbNotifications > 9 ? '9+' : nbNotifications}
                            </span>
                        {/if}
                    </Link>

                    <div class="relative ml-3">
                        <div class="{profileMenu ? 'text-white' : 'text-gray-400 hover:text-white'}">
                            <button type="button"
                                    class="flex items-center rounded-full bg-gray-800 text-sm"
                                    on:click={() => profileMenu = !profileMenu}>
                                <span class="sr-only">Open user menu</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     class="w-8 h-8">
                                    <path fill-rule="evenodd"
                                          d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                          clip-rule="evenodd"/>
                                </svg>
                                <span class="px-2 hidden sm:block">
                                    {user.firstName} {user.lastName.slice(0, 1).toUpperCase()}.
                                </span>
                            </button>
                        </div>
                        {#if profileMenu}
                            <div class="absolute z-20 right-0 mt-2 w-56 sm:w-72 origin-top-right rounded-md shadow-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                                <span class="block px-4 py-3 text-sm font-semibold">{user.email}</span>
                                <Link to="/profile"
                                      class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                      on:click={() => profileMenu = false}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         class="w-5 h-5 mr-2">
                                        <path fill-rule="evenodd"
                                              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                              clip-rule="evenodd"/>
                                    </svg>
                                    Your Profile
                                </Link>
                                <Link to="applications"
                                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                    on:click={() => profileMenu = false}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         class="w-5 h-5 mr-2">
                                        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"/>
                                    </svg>
                                    My applications
                                </Link>
                                {#if user.isAdmin }
                                    <Link to="dashboard"
                                          class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                          on:click={() => profileMenu = false}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             class="w-5 h-5 mr-2">
                                            <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"/>
                                        </svg>
                                        Admin Panel
                                    </Link>
                                {/if}
                                <a href="#"
                                   class="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-200 border-t"
                                   on:click|preventDefault={() => logout()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         class="w-5 h-5 mr-2">
                                        <path fill-rule="evenodd"
                                              d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                                              clip-rule="evenodd"/>
                                    </svg>
                                    Sign out
                                </a>
                            </div>
                        {/if}
                    </div>
                {:else}
                    <Link to="/login"
                          class="hidden sm:block text-white bg-sky-500 hover:bg-sky-600 font-bold font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0">
                        Connect
                    </Link>
                {/if}
            </div>
        </div>
    </div>
    <!-- Mobile menu -->
    <div class="sm:hidden">
        {#if mobileMenu}
            <div class="space-y-1 px-2 pt-2 pb-3">
                <slot></slot>
                {#if !user.firstName}
                    <Link to="/login"
                          class="block px-3 py-2 rounded-md text-base text-center bg-sky-500 hover:bg-sky-600 text-gray-100 font-semibold">
                        Connect
                    </Link>
                {/if}
            </div>
        {/if}
    </div>
</nav>