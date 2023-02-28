<script>
    import Tabs from "../components/Tabs.svelte";
    import UsersTable from "../components/UsersTable.svelte";
    import AdvertsTable from "../components/AdvertsTable.svelte";
    import CompaniesTable from "../components/CompaniesTable.svelte";
    import ApplicationsTable from "../components/ApplicationsTable.svelte";
    import AddressesTable from "../components/AddressesTable.svelte";
    import { createEventDispatcher, onMount } from "svelte";
    import axios from "axios";
    import DeleteConfirm from "../components/DeleteConfirm.svelte";
    import UserForm from "../components/UserForm.svelte";
    import AdvertForm from "../components/AdvertForm.svelte";
    import AddressForm from "../components/AddressForm.svelte";
    import CompanyForm from "../components/CompanyForm.svelte";
    import ApplicationForm from "../components/ApplicationForm.svelte";
    import Cookies from "js-cookie";
    import { navigate } from "svelte-routing";

    const dispatch = createEventDispatcher();

    onMount(async () => {
        const token = Cookies.get("token");
        if (!token) {
            navigate("/login");
        } else {
            await loadData();
        }
    });

    let tabs = [
        {
            id: 0,
            name: "Users",
            svg: `<path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z"/>`
        },
        {
            id: 1,
            name: "Adverts",
            svg: `<path d="M16.881 4.346A23.112 23.112 0 018.25 6H7.5a5.25 5.25 0 00-.88 10.427 21.593 21.593 0 001.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.592.772-2.468a17.116 17.116 0 01-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0018 11.25c0-2.413-.393-4.735-1.119-6.904zM18.26 3.74a23.22 23.22 0 011.24 7.51 23.22 23.22 0 01-1.24 7.51c-.055.161-.111.322-.17.482a.75.75 0 101.409.516 24.555 24.555 0 001.415-6.43 2.992 2.992 0 00.836-2.078c0-.806-.319-1.54-.836-2.078a24.65 24.65 0 00-1.415-6.43.75.75 0 10-1.409.516c.059.16.116.321.17.483z"/>`
        },
        {
            id: 2,
            name: "Companies",
            svg: `<path fill-rule="evenodd" d="M3 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5H15v-18a.75.75 0 000-1.5H3zM6.75 19.5v-2.25a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75zM6 6.75A.75.75 0 016.75 6h.75a.75.75 0 010 1.5h-.75A.75.75 0 016 6.75zM6.75 9a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM6 12.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 6a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm-.75 3.75A.75.75 0 0110.5 9h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 12a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM16.5 6.75v15h5.25a.75.75 0 000-1.5H21v-12a.75.75 0 000-1.5h-4.5zm1.5 4.5a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm.75 2.25a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75h-.008zM18 17.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clip-rule="evenodd"/>`
        },
        {
            id: 3,
            name: "Applications",
            svg: `<path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"/>`
        },
        {
            id: 4,
            name: "Addresses",
            svg: `<path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>`
        },
    ];

    let currentTab = 0;

    function tabChange(e) {
        currentTab = e.detail.id;
        currentPage = 1;
        loadData();
    }

    const PAGE_SIZE = 9;
    let data = [];
    let loading = true;
    let deleteModal = { show: false, name: "", idData: null };
    let editModal = { show: false, name: "", creation: false, idData: null };
    let currentPage = 1;

    async function loadData() {
        data = [];
        loading = true;
        try {
            let tabName = tabs[currentTab].name.toLowerCase();
            let url = `http://localhost:3000/api/${tabName}`;
            if (tabName === "adverts") url += `?sortBy=id&sortOrder=asc`;
            let res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            });
            data = res.data.data;
            loading = false;
        } catch (error) {
            console.error(error);
        }
    }

    function paginateData(array, pageNumber) {
        return array.slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE);
    }

    function nextPage() {
        if (currentPage < Math.ceil(data.length / PAGE_SIZE)) {
            currentPage++;
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
        }
    }

    function openDeleteModal(e) {
        deleteModal.show = true;
        deleteModal.name = e.detail.name;
        deleteModal.idData = e.detail.id;
    }

    function openEditModal(e, creation) {
        editModal.name = e.detail.name;
        editModal.show = true;
        if (creation) {
            editModal.creation = true;
            editModal.idData = null;
        } else {
            editModal.creation = false;
            editModal.idData = e.detail.id;
        }
    }

    async function deleteData() {
        try {
            let res = await axios.delete(`http://localhost:3000/api/${tabs[currentTab].name.toLowerCase()}/${deleteModal.idData}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            });
            deleteModal.show = false;
            await loadData();
            dispatch("loadNotifications");
        } catch (error) {
            console.error(error);
        }
    }

    async function submitForm(e, creation) {
        try {
            e.detail.isAdmin = e.detail.isAdmin === "true";
            if (creation) {
                let res = await axios.post(`http://localhost:3000/api/${tabs[currentTab].name.toLowerCase()}`, e.detail, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`
                    }
                });
            } else {
                let res = await axios.patch(`http://localhost:3000/api/${tabs[currentTab].name.toLowerCase()}/${editModal.idData}`, e.detail, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`
                    }
                });
            }
            editModal.show = false;
            await loadData();
            dispatch("loadNotifications");
        } catch (err) {
            if (err.response.data.status === 500) {
                dispatch("alert", "Internal Server Error. Please try again later.");
            } else if (err.response.status === 400) {
                dispatch("alert", err.response.data.message + ". Please check your inputs.");
            }
            console.error(err);
        }
    }
</script>

<div class="lg:flex items-start m-5 mt-8">
    <Tabs tabs={tabs} activeTab={currentTab} on:tabChange={tabChange}/>
    <div class="w-full">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-medium ml-3">{tabs[currentTab].name}</h1>
            <button class="bg-blue-500 hover:bg-blue-600 hover:text-gray-200 font-medium text-gray-100 px-4 py-2 rounded-md mr-3 mb-3 flex flex-nowrap justify-center"
                    on:click|preventDefault={() => openEditModal({ detail: { name: tabs[currentTab].name.toLowerCase() } }, true)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-1">
                    <path fill-rule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                          clip-rule="evenodd"/>
                </svg>
                Create
            </button>
        </div>
        {#if loading}
            <h1 class="text-center font-medium">Loading...</h1>
        {:else}
            <div class="overflow-x-auto shadow-md rounded-lg">
                {#if currentTab === 0}
                    <UsersTable data={paginateData(data, currentPage)} on:openDeleteModal={openDeleteModal}
                                on:openEditModal={(e) => openEditModal(e, false)}/>
                {:else if currentTab === 1}
                    <AdvertsTable data={paginateData(data, currentPage)} on:openDeleteModal={openDeleteModal}
                                  on:openEditModal={(e) => openEditModal(e, false)}/>
                {:else if currentTab === 2}
                    <CompaniesTable data={paginateData(data, currentPage)} on:openDeleteModal={openDeleteModal}
                                    on:openEditModal={(e) => openEditModal(e, false)}/>
                {:else if currentTab === 3}
                    <ApplicationsTable data={paginateData(data, currentPage)} on:openDeleteModal={openDeleteModal}
                                       on:openEditModal={(e) => openEditModal(e, false)}/>
                {:else if currentTab === 4}
                    <AddressesTable data={paginateData(data, currentPage)} on:openDeleteModal={openDeleteModal}
                                    on:openEditModal={(e) => openEditModal(e, false)}/>
                {/if}
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
                <span>Page {currentPage} / {Math.ceil(data.length / PAGE_SIZE)}</span>
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
        {/if}
    </div>
</div>
{#if editModal.show}
    {#if editModal.name === "users"}
        <UserForm creation={editModal.creation} data={data.find(d => d.id === editModal.idData)}
                  on:close={() => editModal.show = false}
                  on:submit={(e) => submitForm(e, editModal.creation)}/>
    {:else if editModal.name === "adverts"}
        <AdvertForm creation={editModal.creation} data={data.find(d => d.id === editModal.idData)}
                    on:close={() => editModal.show = false}
                    on:submit={(e) => submitForm(e, editModal.creation)}/>
    {:else if editModal.name === "companies"}
        <CompanyForm creation={editModal.creation} data={data.find(d => d.id === editModal.idData)}
                     on:close={() => editModal.show = false}
                     on:submit={(e) => submitForm(e, editModal.creation)}/>
    {:else if editModal.name === "applications"}
        <ApplicationForm creation={editModal.creation} data={data.find(d => d.id === editModal.idData)}
                         on:close={() => editModal.show = false}
                         on:submit={(e) => submitForm(e, editModal.creation)}/>
    {:else if editModal.name === "addresses"}
        <AddressForm creation={editModal.creation} data={data.find(d => d.id === editModal.idData)}
                     on:close={() => editModal.show = false}
                     on:submit={(e) => submitForm(e, editModal.creation)}/>
    {/if}
{/if}
{#if deleteModal.show}
    <DeleteConfirm name={deleteModal.name} on:close={() => deleteModal.show = false} on:deleteData={deleteData}/>
{/if}