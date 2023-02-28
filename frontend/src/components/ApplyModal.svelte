<script>
    import { createEventDispatcher } from 'svelte';
    import axios from "axios";
    import Cookies from "js-cookie";
    import { navigate } from "svelte-routing";

    export let id;

    const dispatch = createEventDispatcher();

    if (Cookies.get("token")) {
        axios({
            method: 'get',
            url: 'http://localhost:3000/api/users/me',
            responseType: 'json',
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
            .then(function (response) {
                let user = response.data.data;

                document.querySelector('#first_name').value = user.firstName;
                document.querySelector('#last_name').value = user.lastName;
                document.querySelector('#email').value = user.email;
                document.querySelector('#first_name').disabled = true;
                document.querySelector('#last_name').disabled = true;
                document.querySelector('#email').disabled = true;
            })
            .catch(function (response) {
                dispatch('notification', 'Error : ' + response.status + response.message);
            });
    }


    function apply(event) {
        let jobOffers = [];
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/applications',
            responseType: 'json',
            data: {
                "idAdvert": id,
                "firstName": event.target[0].value,
                "lastName": event.target[1].value,
                "email": event.target[2].value,
                "message": event.target[3].value,
            }
        })
            .then(function (response) {
                jobOffers = response.data.data;
                dispatch('closeModal', '-1');
            })
            .catch(function (error) {
                dispatch("alert", error.response.data.message + ".");
            });
    }
</script>


<div id="input-popup"
     class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-49 md:inset-0 h-modal md:h-full justify-center items-center flex bg-black bg-opacity-50">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div class="relative bg-white rounded-lg shadow">
            <button type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    on:click="{() => dispatch('closeModal','-1')}">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="py-9 px-6 lg:px-8">
                <h3 id="title-popup" class="mb-4 text-xl font-medium text-gray-900">Apply</h3>
                <form id="modify-form" class="space-y-6" on:submit|preventDefault={apply}>
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">First
                            Name</label>
                        <input type="text" name="first_name" id="first_name"
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               required/>
                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">Last
                            Name</label>
                        <input type="text" name="last_name" id="last_name"
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               required/>
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input type="email" name="email" id="email"
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               required/>
                    </div>
                    <div>
                        <label for="message"
                               class="block mb-2 text-sm font-medium text-gray-900">Message</label>
                        <textarea id="message" rows="4" name="message"
                                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>
                    </div>
                    <button type="submit"
                            class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            id="submit-btn">
                        Save
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>