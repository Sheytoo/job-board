<script>
    import axios from "axios";
    import { Link, navigate } from "svelte-routing";
    import Cookies from "js-cookie";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    async function handleSubmit(e) {
        let email = e.target.email.value;
        let password = e.target.password.value;

        try {
            let res = await axios.post("http://localhost:3000/api/users/login", {
                email,
                password
            });
            Cookies.set("token", res.data.data.token, { expires: 3/24, sameSite: "strict" });
            dispatch("login");
            axios({
                method: 'get',
                url: 'http://localhost:3000/api/users/me',
                responseType: 'json',
                headers: {
                            Authorization: `Bearer ${Cookies.get("token")}`
                        }
            })
            .then(function (response) {
                if (response.data.data.isAdmin) navigate("/dashboard");
                else navigate("/jobs");
            });
        } catch (err) {
            if (err.response.status === 404 || err.response.status === 400) {
                dispatch("alert", err.response.data.message);
            }
            console.log(err);
        }
    }
</script>

<div class="bg-gray-100">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[calc(90vh)] lg:py-0">
        <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tacking-tight text-gray-900 md:text-2xl">
                    Sign in to your account
                </h1>
                <form class="space-y-4 md:space-y-6" method="post" on:submit|preventDefault={handleSubmit}>
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
                               required>
                    </div>
                    <button type="submit"
                            class="w-full text-white bg-sky-600 hover:bg-sky-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Sign in
                    </button>
                    <p class="text-sm font-light text-gray-500">
                        Don’t have an account yet?
                        <Link to="/register" class="font-medium text-sky-600 hover:underline">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</div>