<script>
    import { createEventDispatcher } from "svelte";

    export let data;

    const dispatch = createEventDispatcher();

    function handleClickStatus(id, status) {
        dispatch("updateStatus", { id: id, status: status });
    }

    function handleClick(data) {
        dispatch("openInfo", data);
    }
</script>

<table class="w-full text-sm text-left text-gray-500">
    <thead class="text-xs uppercase bg-gray-700 text-gray-400">
    <tr>
        <th scope="col" class="py-3 px-6">Advert</th>
        <th scope="col" class="py-3 px-6">Email</th>
        <th scope="col" class="py-3 px-6">First Name</th>
        <th scope="col" class="py-3 px-6">Last Name</th>
        <th scope="col" class="py-3 px-6">Message</th>
        <th scope="col" class="py-3 px-6">Status</th>
        <th scope="col" class="py-3 px-6">Created At</th>
        <th scope="col" class="py-3 px-6"></th>
    </tr>
    </thead>
    <tbody>
    {#each data as application}
        <tr class="border-b hover:cursor-pointer {application.status === 'CANCELED' ? 'text-gray-400 bg-gray-100' : 'bg-white hover:bg-gray-50'}" on:click={() => handleClick(application)}>
            <td class="py-4 px-6"
                title="{application.advert.title} - {application.advert.company.name}">{application.advert.title}</td>
            <td class="py-4 px-6">{application.email}</td>
            <td class="py-4 px-6">{application.firstName}</td>
            <td class="py-4 px-6">{application.lastName}</td>
            <td class="py-4 px-6"
                title={application.message}>{application.message.length > 50 ? application.message.substring(0, 50) + '...' : application.message}</td>
            <td class="py-4 px-6">
                {#if application.status === 'PENDING'}
                    <span class="bg-yellow-200 text-yellow-800 py-1 px-3 rounded-full text-xs">Pending</span>
                {:else if application.status === 'ACCEPTED'}
                    <span class="bg-green-200 text-green-800 py-1 px-3 rounded-full text-xs">Accepted</span>
                {:else if application.status === 'REJECTED'}
                    <span class="bg-red-200 text-red-800 py-1 px-3 rounded-full text-xs">Rejected</span>
                {:else if application.status === 'CANCELED'}
                    <span class="bg-gray-200 text-gray-400 py-1 px-3 rounded-full text-xs">Canceled</span>
                {/if}
            </td>
            <td class="py-4 px-6">{new Date(application.creationDate).toLocaleString()}</td>
            {#if application.status === 'CANCELED'}
                <td class="py-4 px-6"></td>
            {:else}
                <td class="flex py-4 px-6 text-right space-x-1.5 z-50">
                    <div class="inline-flex rounded-md shadow-sm" role="group">
                        <button type="button"
                                class="py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-l-lg border-t border-b border-l border-gray-900 {application.status === 'ACCEPTED' ? 'border-green-600 text-green-600 bg-green-50 border-r' : 'hover:bg-gray-300'} {application.status === 'REJECTED' ? '' : 'border-r'}"
                                on:click|stopPropagation={() => handleClickStatus(application.id, 'ACCEPTED')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 class="w-5 h-5">
                                <path fill-rule="evenodd"
                                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </button>
                        <button type="button"
                                class="py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-r-md border-r border-t border-b border-gray-900 {application.status === 'REJECTED' ? 'border-red-600 text-red-600 bg-red-50 border-l' : 'hover:bg-gray-300'}"
                                on:click|stopPropagation={() => handleClickStatus(application.id, 'REJECTED')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 class="w-5 h-5">
                                <path fill-rule="evenodd"
                                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                </td>
            {/if}
        </tr>
    {/each}
    </tbody>
</table>