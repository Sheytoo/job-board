<script>
    import axios from "axios";
    import { navigate } from "svelte-routing";
    import { createEventDispatcher } from "svelte";
    import Cookies from "js-cookie";

    const dispatch = createEventDispatcher();

    let userId = -1;

    axios({
        method: 'get',
        url: 'http://localhost:3000/api/users/me',
        responseType: 'json',
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    })
        .then(function (response) {
            let user = response.data.data;

            userId = user.id;

            document.querySelector('#firstName').value = user.firstName;
            document.querySelector('#lastName').value = user.lastName;
            document.querySelector('#email').value = user.email;
            document.querySelector('#password').value = "";
        })
        .catch(function (response) {
            dispatch('notification', 'Error : ' + response.status + response.message);
        });

    async function handleSubmit(e) {
        let email = e.target.email.value;
        let password = e.target.password.value;
        let firstName = e.target.firstName.value;
        let lastName = e.target.lastName.value;

        let data;

        if (password != "") {
            data = {
                "email": email,
                "firstName": firstName,
                "lastName": lastName,
                "password": password
            }
        } else {
            data = {
                "email": email,
                "firstName": firstName,
                "lastName": lastName,
            }
        }
        try {
            let res1 = await axios.patch(`http://localhost:3000/api/users/` + userId, data, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            });
            Cookies.remove("token");
            dispatch('changeInfo');
            navigate("/login");
        } catch (err) {
            console.log(err);
            if (err.response.data.status === 500) {
                dispatch("notification", "Internal Server Error. Please try again later.");
            } else if (err.response.status === 400) {
                dispatch("notification", err.response.data.message + ". Please check your inputs.");
            }
            console.error(err);
        }
    }
</script>

<div class="bg-gray-100">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[calc(90vh)] lg:py-0">
        <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tacking-tight text-gray-900 md:text-2xl">
                    Change your account details
                </h1>
                <form class="space-y-4 md:space-y-6" method="post" on:submit|preventDefault={handleSubmit}>
                    <div>
                        <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                        <input type="text" name="firstName" id="firstName"
                               class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5"
                               required>
                    </div>
                    <div>
                        <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                        <input type="text" name="lastName" id="lastName"
                               class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5"
                               required>
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                        <input type="email" name="email" id="email"
                               class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5"
                               placeholder="name@company.com" required>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                               class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5"
                        >
                    </div>
                    <button type="submit"
                            class="w-full text-white bg-sky-600 hover:bg-sky-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Modify
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>