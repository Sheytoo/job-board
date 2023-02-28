<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let tabs;
    export let activeTab;
</script>

<aside class="w-1/5 hidden lg:block">
    <div class="overflow-y-auto h-full py-4 px-3 mr-5 bg-white rounded-md shadow">
        <h2 class="text-xl font-semibold mb-5">Admin Dashboard</h2>
        <ul class="space-y-2">
            {#each tabs as tab}
                <li>
                    <a href=""
                       class="flex items-center p-2 text-base font-normal rounded-lg {activeTab === tab.id ? 'bg-gray-800 text-gray-100' : 'text-gray-600 hover:bg-gray-300 hover:text-gray-900'} transition-colors duration-200"
                       on:click|preventDefault={() => dispatch('tabChange', tab)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             class="w-5 h-5 {activeTab === tab.id ? 'text-gray-100' : ''} group-hover:text-gray-900">
                            {@html tab.svg}
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap {activeTab === tab.id ? 'font-semibold' : ''}">{tab.name}</span>
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</aside>
<div class="block lg:hidden">
    <select class="w-fit p-2 text-base font-normal rounded-lg text-gray-600 bg-white border border-gray-300"
            on:change={(e) => dispatch('tabChange', tabs[e.target.selectedIndex])}>
        {#each tabs as tab}
            <option value={tab.id} selected={activeTab === tab.id}>{tab.name}</option>
        {/each}
    </select>
</div>