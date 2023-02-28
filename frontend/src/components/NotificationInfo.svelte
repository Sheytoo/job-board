<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function close() {
        dispatch("close");
    }

    export let data;
</script>

<div class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-49 md:inset-0 h-modal md:h-full justify-center items-center flex bg-black bg-opacity-50">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div class="relative bg-white rounded-lg shadow">
            <button type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    on:click|preventDefault={close}>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="py-9 px-6 lg:px-8">
                <h3 class="mb-4 text-xl font-medium text-gray-900">Application information</h3>
                <div class="space-y-6">
                    <div>
                        <span class="block mb-2 text-sm font-medium text-gray-900">Advert</span>
                        <span class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                            {data.advert.title} - {data.advert.company.name}
                        </span>
                    </div>
                    <div>
                        <span class="block mb-2 text-sm font-medium text-gray-900">Email</span>
                        <span class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                            {data.email}
                        </span>
                    </div>
                    <div>
                        <span class="block mb-2 text-sm font-medium text-gray-900">First Name</span>
                        <span class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                            {data.firstName}
                        </span>
                    </div>
                    <div>
                        <span class="block mb-2 text-sm font-medium text-gray-900">Last Name</span>
                        <span class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                            {data.lastName}
                        </span>
                    </div>
                    <div>
                        <span class="block mb-2 text-sm font-medium text-gray-900">Message</span>
                        <textarea
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                rows="4" disabled>{data.message}</textarea>
                    </div>
                    <div>
                        <span class="block mb-2 text-sm font-medium text-gray-900">Status</span>
                        {#if data.status === 'PENDING'}
                            <span class="bg-yellow-200 text-yellow-800 py-1 px-3 rounded-full text-xs">Pending</span>
                        {:else if data.status === 'ACCEPTED'}
                            <span class="bg-green-200 text-green-800 py-1 px-3 rounded-full text-xs">Accepted</span>
                        {:else if data.status === 'REJECTED'}
                            <span class="bg-red-200 text-red-800 py-1 px-3 rounded-full text-xs">Rejected</span>
                        {:else if data.status === 'CANCELED'}
                            <span class="bg-gray-200 text-gray-600 py-1 px-3 rounded-full text-xs">Canceled</span>
                        {/if}
                    </div>
                    <div>
                        <span class="block mb-2 text-sm font-medium text-gray-900">Created At</span>
                        <span class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                            {new Date(data.creationDate).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>