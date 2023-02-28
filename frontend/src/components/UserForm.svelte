<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let data;
    export let creation;

    if (data === undefined) {
        data = {
            email: "",
            firstName: "",
            lastName: "",
            isAdmin: false,
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
                <h3 class="mb-4 text-xl font-medium text-gray-900">{creation ? "Create" : "Edit"} user</h3>
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
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input type="email" name="email" id="email" value="{data.email}"
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               required/>
                    </div>
                    {#if creation}
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" name="password" id="password" value=""
                                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                    {/if}
                    <div>
                        <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                        <input type="text" name="firstName" id="firstName" value="{data.firstName}"
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               required/>
                    </div>
                    <div>
                        <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                        <input type="text" name="lastName" id="lastName" value="{data.lastName}"
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               required/>
                    </div>
                    <div>
                        <label for="admin_radio" class="block mb-2 text-sm font-medium text-gray-900">Is Admin?</label>
                        <div id="admin_radio" class="flex">
                            <div class="flex items-center mr-4">
                                <input id="yes_admin" type="radio" value="true" name="isAdmin"
                                       class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                       checked={data.isAdmin}>
                                <label for="yes_admin" class="ml-2 text-sm font-medium text-gray-900">Yes</label>
                            </div>
                            <div class="flex items-center mr-4">
                                <input id="no_admin" type="radio" value="false" name="isAdmin"
                                       class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                       checked={!data.isAdmin}>
                                <label for="no_admin" class="ml-2 text-sm font-medium text-gray-900">No</label>
                            </div>
                        </div>
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