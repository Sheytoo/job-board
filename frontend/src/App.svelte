<script>
    import { Route, Router } from "svelte-routing";
    import Home from "./routes/Home.svelte";
    import Jobs from "./routes/Jobs.svelte";
    import Navbar from "./components/Navbar.svelte";
    import NavLink from "./components/NavLink.svelte";
    import AdminPanel from "./routes/AdminPanel.svelte";
    import { beforeUpdate, onMount } from "svelte";
    import axios from "axios";
    import Login from "./routes/Login.svelte";
    import Profile from "./routes/Profile.svelte";
    import Application from "./routes/Application.svelte";
    import Register from "./routes/Register.svelte";
    import Alert from "./components/Alert.svelte";
    import Cookies from "js-cookie";
    import Notifications from "./routes/Notifications.svelte";

    export let url = "";

    let user = {};

    async function loadUser() {
        user = {};
        if (Cookies.get("token")) {
            try {
                const res = await axios.get(`http://localhost:3000/api/users/me`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                });
                user = res.data.data;
                await loadNotifications();
            } catch (err) {
                console.log(err);
            }
        }
    }

    let nbNotifications = 0;
    let notifications = [];

    async function loadNotifications() {
        nbNotifications = 0;
        if (Cookies.get("token")) {
            try {
                const res = await axios.get(`http://localhost:3000/api/applications/adverts/creator/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                });
                notifications = res.data.data;
                notifications.forEach((element) => {
                    if (element.status === "PENDING") {
                        nbNotifications++;
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    }

    async function updateStatus(info) {
        let id = info.detail.id;
        let status = info.detail.status;
        if (Cookies.get("token")) {
            try {
                let res = await axios.patch(`http://localhost:3000/api/applications/${id}`, {
                    status: status
                }, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                });
                notifications = notifications.map((notification) => {
                    if (notification.id === id) {
                        notification.status = status;
                    }
                    return notification;
                });
                await loadNotifications();
            } catch (err) {
                console.log(err);
            }
        }
    }

    async function loadMyApplications() {
        nbNotifications = 0;
        if (Cookies.get("token")) {
            try {
                const res = await axios.get(`http://localhost:3000/api/applications/users/me/applications`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                });
                notifications = res.data.data;
                notifications.forEach((element) => {
                    if (element.status === "PENDING") {
                        nbNotifications++;
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    }

    async function updateMyApplications(info) {
        let id = info.detail.id;
        let status = info.detail.status;
        if (Cookies.get("token")) {
            try {
                let res = await axios.patch(`http://localhost:3000/api/applications/${id}`, {
                    status: status
                }, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                });
                notifications = notifications.map((notification) => {
                    if (notification.id === id) {
                        notification.status = status;
                    }
                    return notification;
                });
                await loadNotifications();
            } catch (err) {
                console.log(err);
            }
        }
    }

    let adverts = [];
    onMount(async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/adverts");
            adverts = res.data.data;
        } catch (e) {
            console.log(e);
        }
        await loadUser();
        await loadNotifications();
    });

    let notifying = false;
    let notificationMessage = "";

    function notify(event) {
        notificationMessage = event.detail;
        notifying = true;
    }

    function notificationClose(event) {
        notifying = false;
    }
</script>

<Router url="{url}">
    <Navbar user={user} nbNotifications={nbNotifications} on:logout={loadUser}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/jobs">Job Offers</NavLink>
    </Navbar>
    {#if notifying}
        <Alert message={notificationMessage} on:alert="{notificationClose}"/>
    {/if}
    <main>
        <Route path="/notifications">
            <Notifications notifications={notifications} on:updateStatus={updateStatus}/>
        </Route>
        <Route path="/applications">
            <Application on:updateStatus={updateMyApplications}/>
        </Route>
        <Route path="/login">
            <Login on:alert="{notify}" on:login={loadUser}/>
        </Route>
        <Route path="/profile">
            <Profile on:alert="{notify}" on:changeInfo={loadUser}/>
        </Route>
        <Route path="/register">
            <Register on:alert="{notify}" on:login={loadUser}/>
        </Route>
        <Route path="/dashboard">
            <AdminPanel on:alert="{notify}" on:loadNotifications={loadNotifications}/>
        </Route>
        <Route path="/jobs">
            <Jobs on:alert="{notify}"/>
        </Route>
        <Route path="/">
            <Home on:notification={notify}/>
        </Route>
    </main>
</Router>

<style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @layer base {
        body {
            @apply bg-gray-100;
        }
        button, Link, a, input, textarea, tr {
            @apply transition duration-200 ease-in-out
        }
    }
</style>