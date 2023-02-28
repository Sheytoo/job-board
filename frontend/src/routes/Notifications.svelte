<script>
    import NotificationTable from "../components/NotificationTable.svelte";
    import NotificationInfo from "../components/NotificationInfo.svelte";

    export let notifications;

    let infoModal = false;
    let infoData = {};
    let PAGE_SIZE = 5;
    let currentPage = 1;

    function paginate(array, page_size, page_number) {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }

    function nextPage() {
        if (currentPage < Math.ceil(notifications.length / PAGE_SIZE)) {
            currentPage++;
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
        }
    }

    function openInfoModal(e) {
        infoModal = true;
        infoData = e.detail;
    }
</script>

<div class="mx-4 mt-10 md:mx-10 lg:mx-20">
    <h1 class="text-xl sm:text-2xl font-bold my-5">Applications of your job offers</h1>
    {#if notifications.length > 0}
        <div class="overflow-x-auto shadow-md rounded-lg">
            <NotificationTable data={paginate(notifications, PAGE_SIZE, currentPage)} on:updateStatus
                               on:openInfo={openInfoModal}/>
        </div>
        <div class="flex flex-row flex-nowrap space-x-3 justify-center items-center mt-5">
            <button type="button"
                    class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-800 bg-gray-100 rounded-lg border border-gray-700 hover:bg-gray-800 hover:text-gray-100"
                    on:click={prevPage}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                     class="w-5 h-5 mr-2">
                    <path fill-rule="evenodd"
                          d="M20.25 12a.75.75 0 01-.75.75H6.31l5.47 5.47a.75.75 0 11-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06l6.75-6.75a.75.75 0 111.06 1.06l-5.47 5.47H19.5a.75.75 0 01.75.75z"
                          clip-rule="evenodd"/>
                </svg>
                Previous
            </button>
            <span>Page {currentPage} / {Math.ceil(notifications.length / PAGE_SIZE)}</span>
            <button type="button"
                    class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-800 bg-gray-100 rounded-lg border border-gray-700 hover:bg-gray-800 hover:text-gray-100"
                    on:click={nextPage}>
                Next
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                     class="w-5 h-5 ml-2">
                    <path fill-rule="evenodd"
                          d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
                          clip-rule="evenodd"/>
                </svg>
            </button>
        </div>
    {:else}
        <div class="flex flex-col justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/>
            </svg>
            <p class="text-center">You have no notifications.</p>
        </div>
    {/if}
</div>
{#if infoModal}
    <NotificationInfo data={infoData} on:close={() => infoModal = false}/>
{/if}