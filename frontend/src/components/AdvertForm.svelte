<script>
    import { createEventDispatcher, onMount } from "svelte";
    import axios from "axios";
    import Cookies from "js-cookie";

    const dispatch = createEventDispatcher();

    export let data;
    export let creation;

    if (data === undefined) {
        data = {
            title: "",
            description: ""
        };
    }

    function close() {
        dispatch("close");
    }

    function handleSubmit(event) {
        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        dispatch("submit", value);
    }

    let companies = [];
    let users = [];
    let addresses = [];
    onMount(async () => {
        try {
            let resCompany = await axios.get(`http://localhost:3000/api/companies`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });
            let resUser = await axios.get(`http://localhost:3000/api/users`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });
            let resAddress = await axios.get(`http://localhost:3000/api/addresses`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });
            companies = resCompany.data.data;
            users = resUser.data.data;
            addresses = resAddress.data.data;
        } catch (err) {
            console.log(err);
        }
    });
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
                <h3 class="mb-4 text-xl font-medium text-gray-900">{creation ? "Create" : "Edit"} advert</h3>
                <form class="space-y-6" on:submit|preventDefault={handleSubmit}>
                    {#if !creation}
                        <div>
                            <label for="id" class="block mb-2 text-sm font-medium text-gray-900">ID</label>
                            <input type="text" name="id" id="id" value="{data.id}"
                                   class="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   readonly required/>
                        </div>
                    {/if}
                    <div>
                        <label for="company" class="block mb-2 text-sm font-medium text-gray-900">Company</label>
                        <select id="company" name="idCompany"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required>
                            <option value="" disabled selected hidden>Choose a company</option>
                            {#each companies as company}
                                <option value="{company.id}"
                                        selected="{data.idCompany === company.id}">{company.name}</option>
                            {/each}
                        </select>
                    </div>
                    <div>
                        <label for="creator" class="block mb-2 text-sm font-medium text-gray-900">Creator</label>
                        <select id="creator" name="idCreator"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required>
                            <option value="" disabled selected hidden>Choose a user</option>
                            {#each users as user}
                                <option value="{user.id}"
                                        selected="{data.idCreator === user.id}">{user.firstName} {user.lastName}</option>
                            {/each}
                        </select>
                    </div>
                    <div>
                        <label for="title" class="block mb-2 text-sm font-medium text-gray-900">Title</label>
                        <input type="text" name="title" id="title" value="{data.title}"
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               required/>
                    </div>
                    <div>
                        <label for="description"
                               class="block mb-2 text-sm font-medium text-gray-900">Description</label>
                        <textarea id="description" rows="4" name="description"
                                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">{data.description}</textarea>
                    </div>
                    <div>
                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900">Address</label>
                        <select id="address" name="idAddress"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required>
                            <option value="" disabled selected hidden>Choose a address</option>
                            {#each addresses as address}
                                <option value="{address.id}"
                                        selected="{data.idAddress === address.id}">{address.street}, {address.city}
                                    , {address.zip}, {address.country}</option>
                            {/each}
                        </select>
                    </div>
                    <button type="submit"
                            class="w-full text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg text-base px-5 py-2.5 text-center">
                        {creation ? "Create" : "Save"}
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>