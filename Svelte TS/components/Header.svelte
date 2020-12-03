<script>

import Logo from './Logo.svelte';
import SearchArea from './SearchArea.svelte';

</script>

<div class="header">
    <Logo />
    <SearchArea />
</div>

<style>

.header {
    width: 100%;
    height: 60px;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    font-size: 18px;
    color: #ffffff;
    background-color: #ff5151;
    box-shadow: 0px 0px 6px 0px #2b2b2b;
}

</style>