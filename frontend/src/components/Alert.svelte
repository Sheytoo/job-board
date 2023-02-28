<script>
    import { createEventDispatcher, onMount } from 'svelte';

    const dispatch = createEventDispatcher();

    export let message;

    let closed = false;

    function close() {
        if (document.querySelector('#alert')) {
            document.querySelector('#alert').animate([
                { opacity: 1 },
                { opacity: 0 }
            ], {
                duration: 250,
                easing: 'ease-in-out'
            }).onfinish = () => {
                closed = true;
                dispatch('alert');
            }
        }
    }

    onMount(() => {
        document.querySelector('#alert').animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: 250,
            easing: 'ease-in-out'
        }).onfinish = () => {
            setTimeout(() => {
                close();
            }, 3000);
        }
    });

</script>


<div id="alert"
     class="flex absolute items-center right-0 bottom-0 p-4 mb-4 mr-4 w-full max-w-xs text-gray-500 bg-red-100 rounded-lg shadow z-50"
     role="alert">
    <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-200 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clip-rule="evenodd"/>
        </svg>
    </div>
    <div class="ml-3 text-sm font-normal text-red-500">{message}</div>
    <button type="button"
            class="ml-auto -mx-1.5 -my-1.5 text-red-500 hover:text-red-700 rounded-lg p-1.5 hover:bg-red-200 inline-flex h-8 w-8"
            on:click={close}>
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
             xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
        </svg>
    </button>
</div>

