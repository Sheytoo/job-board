<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import countries from "../countries";

    export let jobOffer;
    export let alreadyApplied;


    const dispatch = createEventDispatcher();

    let isExpanded = false;

    function switchExpanded() {
        isExpanded = !isExpanded;
    }

    let countryCode;
    countries.forEach(country => {
        if (country.name === jobOffer.address.country) {
            countryCode = country.code;
        }
    });
</script>

<div class="rounded-xl bg-white w-full h-full md:w-1/3 lg:w-1/4 grow p-4 transition-all duration-300 ease-in-out">
    <img class="rounded-xl w-16 h-16" src="{jobOffer.company.logoUrl}" alt="{jobOffer.company.name} Logo"/>
    <h1 class="font-semibold mt-4 mb-1 text-xl">{jobOffer.title}</h1>
    <div class="flex flex-row text-sm text-blue-500 mb-4">
        <span class="mr-4">{jobOffer.company.name}</span>
        <span class="flex flex-row">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-1">
                <path fill-rule="evenodd"
                      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                      clip-rule="evenodd"/>
            </svg>
            <span>{jobOffer.address.city}, {countryCode}</span>
        </span>
    </div>
    <p class="text-gray-500 description-1 {isExpanded ? '':'truncate'}">
        {jobOffer.description}
    </p>
    <button class="mt-2 mb-1 text-sm text-gray-400 hover:text-blue-600 transition duration-200 ease-in-out"
            on:click={switchExpanded}>
        {isExpanded ? "Show less" : "Show more"}
    </button>
    {#if alreadyApplied}
        <button class="mt-8 mb-1 bg-gray-300 text-gray-400 font-medium rounded-xl px-7 py-2 float-right" disabled>
            Already applied
        </button>
    {:else}
        <button class="mt-8 mb-1 bg-blue-600 text-white font-medium rounded-xl px-7 py-2 hover:bg-blue-700 hover:shadow-lg transition duration-200 ease-in-out float-right"
                on:click="{() => dispatch('openModal', jobOffer.id)}">
            Apply Now
        </button>
    {/if}
</div>