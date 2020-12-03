<script>

import Header from '../components/Header.svelte';

</script>

<svelte:head>
	<title>SmartPizza</title>
	<meta charset="utf-8">

	<link rel="stylesheet" href="./resources/fonts/Montserrat/font.css">
	<link rel="stylesheet" href="./resources/icons/fontawesome-free-5.15.1-web/css/all.css">
</svelte:head>

<main>
	<Header />
</main>

<style>

:global(*) {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	outline: none;
	font-family: "Montserrat";
}

:global(body) {
	margin: 0;
	padding: 0;
	position: absolute;
	width: 100%;
	height: 100%;
}

</style>