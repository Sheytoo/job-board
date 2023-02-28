<script>
    import { createEventDispatcher } from "svelte";

    export let data;


    const dispatch = createEventDispatcher();

    function openConfirmModal(id) {
        dispatch("openConfirmModal", id);
    }

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
        <tr class="border-b hover:cursor-pointer {application.status === 'CANCELED' ? 'text-gray-400 bg-gray-100' : 'bg-white hover:bg-gray-50'}"
            on:click={() => handleClick(application)}>
            <td class="py-4 px-6"
                title="{application.advert.title} - {application.advert.company.name}">{application.advert.title}</td>
            <td class="py-4 px-6">{application.email}</td>
            <td class="py-4 px-6">{application.firstName}</td>
            <td class="py-4 px-6">{application.lastName}</td>
            <td class="py-4 px-6"
                title={application.message}>{application.message.length > 50 ? application.message.substring(0, 50) + '...' : application.message}</td>
            <td class="py-4 px-6">
                {#if application.status === 'PENDING'}
                    <span class="bg-yellow-200 text-gray-600 py-1 px-3 rounded-full text-xs">Pending</span>
                {:else if application.status === 'ACCEPTED'}
                    <span class="bg-green-200 text-green-800 py-1 px-3 rounded-full text-xs">Accepted</span>
                {:else if application.status === 'REJECTED'}
                    <span class="bg-red-200 text-red-800 py-1 px-3 rounded-full text-xs">Rejected</span>
                {:else if application.status === 'CANCELED'}
                    <span class="bg-gray-200 text-gray-400 py-1 px-3 rounded-full text-xs">Canceled</span>
                {/if}
            </td>
            <td class="py-4 px-6">{new Date(application.creationDate).toLocaleString()}</td>

            <td class="flex py-4 px-6 text-right space-x-1.5">
                {#if application.status === 'PENDING'}
                    <button class="text-red-500 transform hover:text-red-600 hover:scale-110" title="Cancel"
                            on:click|stopPropagation
                            on:click|preventDefault={() => openConfirmModal(application.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"/>
                        </svg>
                    </button>
                {/if}
            </td>
        </tr>
    {/each}
    </tbody>
</table>