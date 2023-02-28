<script>
    import { Link } from "svelte-routing";

    export let to = "";
    let classBase = "block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"

    function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
        const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;
        if (isActive) {
            return { class: "bg-gray-900 text-white" + " " + classBase };
        }
        return { class: "text-gray-300 hover:bg-gray-700 hover:text-white" + " " + classBase };
    }
</script>

<Link to="{to}" getProps="{getProps}">
    <slot/>
</Link>