<script>
    import JobCard from "../components/JobCard.svelte";
    import ApplyModal from "../components/ApplyModal.svelte";
    import Alert from "../components/Alert.svelte";
    import axios from "axios";
    import { onMount } from "svelte";
    import Cookies from "js-cookie";

    let jobOffers = [];
    async function loadOffers() {
        await axios({
            method: 'get',
            url: 'http://localhost:3000/api/adverts',
            responseType: 'json'
        })
            .then(function (response) {
                jobOffers = response.data.data;
                paginatedJobOffers = paginateData(jobOffers, currentPage);
            });
    }

    async function loadMyApplications() {
        if (Cookies.get("token")) {
            try {
                const res = await axios.get(`http://localhost:3000/api/users/me/applications`, {
                    headers : {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    }
                });
                myApplicationsIds = res.data.data.map(application => application.idAdvert);
            } catch (error) {
                console.log(error);
            }
        }
    }

    let myApplicationsIds = [];

    onMount(async () => {
        await loadOffers();
        await loadMyApplications();
    })

    let modalOpened = false
    let applicationId = -1;

    function switchModal(event) {
        modalOpened = !modalOpened;
        applicationId = event.detail;
        loadMyApplications();
    }

    let currentPage = 1;
    let PAGE_SIZE = 12;
    let paginatedJobOffers = paginateData(jobOffers, currentPage);

    function paginateData(array, pageNumber) {
        return array.slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE);
    }

    function nextPage() {
        if (currentPage < Math.ceil(jobOffers.length / PAGE_SIZE)) {
            currentPage++;
            paginatedJobOffers = paginateData(jobOffers, currentPage);
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            paginatedJobOffers = paginateData(jobOffers, currentPage);
        }
    }
</script>

<div class="flex">
    <h2 class="text-xl md:text-2xl font-bold my-7 ml-6">
        Showing {jobOffers.length} Jobs
    </h2>
</div>
<div class="column flex flex-wrap flex-col md:flex-row gap-7 mx-5">
    {#each paginatedJobOffers as jobOffer}
        <JobCard jobOffer={jobOffer} alreadyApplied={myApplicationsIds.includes(jobOffer.id)} on:openModal="{switchModal}"/>
    {/each}
</div>
{#if modalOpened}
    <ApplyModal id={applicationId} on:closeModal="{switchModal}" on:alert/>
{/if}

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
    <span>Page {currentPage} / {Math.ceil(jobOffers.length / PAGE_SIZE)}</span>
    <a href="#"
       class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-800 bg-gray-100 rounded-lg border border-gray-700 hover:bg-gray-800 hover:text-gray-100"
       on:click={nextPage}>
        Next
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
             class="w-5 h-5 ml-2">
            <path fill-rule="evenodd"
                  d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd"/>
        </svg>

    </a>
</div>