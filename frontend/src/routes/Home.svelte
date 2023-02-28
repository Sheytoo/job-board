<script>
    import { navigate } from "svelte-routing";
</script>

<div class="m-5 md:m-10 lg:mx-24">
    <div class="w-full h-[calc(50vh)] bg-[url('/hero-image.jpg')] rounded-3xl bg-blend-darken bg-cover bg-center flex justify-center items-center">
        <div class="flex flex-col justify-center items-center">
            <h1 class="text-center mx-1 text-3xl md:text-5xl lg:text-6xl text-white font-bold drop-shadow">Take control
                of your</h1>
            <h1 class="text-center mt-3 text-3xl md:text-5xl lg:text-6xl text-blue-200 font-bold drop-shadow">
                professional life</h1>
            <p class="text-center mx-10 lg:mx-80 mt-8 text-base md:text-md text-blue-100 font-medium drop-shadow">
                Lorem ipsum dolor sit amet. Ea reiciendis soluta rem inventore sunt rem fuga perferendis eum molestiae
                fuga. Non aspernatur minus est dolor cumque qui dolores consequatur aut expedita illo quo dolores totam.
            </p>
            <button class="mt-8 bg-blue-100 text-blue-500 font-semibold py-3 px-8 rounded-xl drop-shadow hover:bg-blue-200 hover:text-blue-600"
                    on:click={() => navigate('/jobs')}>
                Get Started
            </button>
        </div>
    </div>
</div>
<div class="m-5 md:m-10 lg:mx-24 flex flex-wrap lg:flex-nowrap gap-7">
    <figure class="w-full lg:w-1/2 md:flex bg-gradient-to-b md:bg-gradient-to-r from-blue-200 to-gray-100 rounded-xl p-8 md:p-0">
        <img class="w-24 h-24 md:w-48 md:h-auto rounded-full md:rounded-none mx-auto object-cover object-top"
             src="/images/elon.jpg" alt="" width="384" height="512">
        <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
            <blockquote>
                <p class="text-lg font-medium">
                    “This is a great platform to find a job. I found my current job through this platform and I am very
                    happy with it. I would recommend this to anyone looking for a job.”
                </p>
            </blockquote>
            <figcaption class="font-medium">
                <div class="text-blue-500">
                    Elon Musk
                </div>
                <div class="text-slate-700">
                    Goat of the century
                </div>
            </figcaption>
        </div>
    </figure>
    <figure class="w-full lg:w-1/2 md:flex bg-white rounded-xl p-8 md:p-0 bg-gradient-to-b md:bg-gradient-to-r from-blue-200 to-gray-100">
        <img class="w-24 h-24 md:w-48 md:h-auto rounded-full md:rounded-none mx-auto object-cover object-top"
             src="/images/women_rand.jpg" alt="" width="384" height="512">
        <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
            <blockquote>
                <p class="text-lg font-medium">
                    “An amazing platform to find a job. My friend recommended this to me and I am very happy with it. A
                    very helpful platform.”
                </p>
            </blockquote>
            <figcaption class="font-medium">
                <div class="text-blue-500">
                    Sara Croche
                </div>
                <div class="text-slate-700">
                    A random women
                </div>
            </figcaption>
        </div>
    </figure>
</div>