<script lang="ts">
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '../theme.postcss'
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar, AppRail, AppRailTile, Modal } from '@skeletonlabs/skeleton';
	import hljs from 'highlight.js';
	// import 'highlight.js/styles/github-dark.css';
	import 'highlight.js/styles/nord.css';
	// import 'highlight.js/styles/atom-one-dark.css';
	// import 'highlight.js/styles/vs2015.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import { base } from '$app/paths'
	import logo from '$lib/images/amber-logo.png'
	import scrt from '$lib/images/scrt.svg'
	import Wallet from '$lib/Wallet.svelte';
	import { amberBalance, scrtBalance, isAccountAvailable } from '$lib/stores'
	import { writable, type Writable } from 'svelte/store';
	import { chains } from '$lib/config';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { popup, storePopup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { Drawer, drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import amber_nugget from '$lib/images/stickers/ambernugget-half.webp'

	storeHighlightJs.set(hljs);
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	let popupSettings: PopupSettings = {
		// Set the event as: click | hover | hover-click
		event: 'hover',
		placement: 'right-start',
		// Provide a matching 'data-popup' value.
		target: 'examplePopup'
	};

	const drawerSettings: DrawerSettings = {
		id: 'side-menu',
		width: 'w-[90%]',
		padding: 'pt-4 pb-6',
		rounded: 'rounded-r-xl',
	};

	const alert: ModalSettings = {
		type: 'alert',
		title: 'Attention',
		body: 'You need at least 1 AMBER to use this app.',
		image: amber_nugget,
		buttonTextCancel: 'OK'
	};
	
	const storeValue: Writable<number> = writable(1);
	$: poor = !(Number($amberBalance as any) > 1)

	function debug() {
		
	}

</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<Drawer>
	{#if $drawerStore.id === 'side-menu'}
		<!-- TODO reduce code duplication of these images -->
		<!-- Close menu button -->
		<div on:click={()=>drawerStore.close()} class="absolute btn z-[999]">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-primary-500">
				<path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
			</svg>
		</div>
		<!-- Menu -->
		<div on:click={()=>drawerStore.close()} class:pointer-events-none={poor} class="card h-full mx-auto flex flex-col justify-center items-center">
			{#if poor}
			<strong class="-translate-y-10 text-center text-lg text-tertiary-500">Connect wallet with 1 AMBER</strong>
			{/if}
			<!-- Menu Items -->
			<div class:opacity-25={poor} class="flex op flex-col space-y-4 justify-center items-center">
				<a href="{base}/" class="btn">
					<div class="flex items-center space-x-4">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
							<path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
							<path fill-rule="evenodd" d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z" clip-rule="evenodd" />
						</svg>
						<h2 class="font-bold">Home</h2>
					</div>
				</a>
				<a href="{base}/wallet" class="btn">
					<div class="flex items-center space-x-4">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
							<path d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z" />
						</svg>
						<h2 class="font-bold">Wallet</h2>
					</div>
				</a>
				<a href="{base}/keys" class="btn">
					<div class="flex items-center space-x-4">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
							<path fill-rule="evenodd" d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z" clip-rule="evenodd" />
						</svg>
						<h2 class="font-bold">Keys</h2>
					</div>
				</a>
				<a href="{base}/" class="btn">
					<div class="flex items-center space-x-4">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
						<path d="M5.507 4.048A3 3 0 017.785 3h8.43a3 3 0 012.278 1.048l1.722 2.008A4.533 4.533 0 0019.5 6h-15c-.243 0-.482.02-.715.056l1.722-2.008z" />
						<path fill-rule="evenodd" d="M1.5 10.5a3 3 0 013-3h15a3 3 0 110 6h-15a3 3 0 01-3-3zm15 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm2.25.75a.75.75 0 100-1.5.75.75 0 000 1.5zM4.5 15a3 3 0 100 6h15a3 3 0 100-6h-15zm11.25 3.75a.75.75 0 100-1.5.75.75 0 000 1.5zM19.5 18a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" clip-rule="evenodd" />
					</svg>
					<h2 class="font-bold">Stake</h2>
				</div>
				</a>
				<a href="{base}/secret" class="btn">
					<div class="flex items-center space-x-4">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
							<path fill-rule="evenodd" d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clip-rule="evenodd" />
						</svg>
						<h2 class="font-bold">Query</h2>
					</div>
				</a>
			</div>
		</div>
	{:else if $drawerStore.id === 'alert'}
		<!-- (show 'example-2' contents) -->
		<div class="flex mx-auto justify-center items-center ">
			<h2>Not enough AMBER</h2>
		</div>
	{:else}
		<!-- (fallback contents) -->
	{/if}
</Drawer>

<!-- App Shell -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<AppShell regionPage="bg-secret-swirl bg-cover bg-center">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar slotTrail="!space-x-0 md:!space-x-4">
			<svelte:fragment slot="lead">
				<!-- Mobile menu button -->
					<div class="sm:hidden btn btn-sm" on:click={()=>drawerStore.open(drawerSettings)}>
					<!-- TODO - import svg instead of raw -->
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 sm:hidden text-primary-500">
							<path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
						</svg>
					</div>
				<a
					class="btn pl-0 pr-2 py-0"
					href="https://www.amberdao.io"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img class="h-12 hidden sm:block" src={logo} alt="AmberDAO" />
				</a>
				<button on:click={debug}>
					<strong class="text-xl uppercase">AmberDAO</strong>
				</button>

			</svelte:fragment>
			{#if $isAccountAvailable == true}
				<div class="card variant-ghost-primary p-2 text-center max-w-xs hidden md:inline-flex">
					<p class="font-bold"> You have {$amberBalance} AMBER </p>
				</div>
			{/if}
			<svelte:fragment slot="trail">
				<Wallet/>
				<div class="hidden sm:inline-flex space-x-4">
					<a
						class="btn btn-sm variant-ghost-surface"
						href="https://discord.gg/VeCAWCAktq"
						target="_blank"
						rel="noreferrer"
					>
						Discord
					</a>
					<a
						class="btn btn-sm variant-ghost-surface"
						href="https://twitter.com/AmberDAO_"
						target="_blank"
						rel="noreferrer"
					>
						Twitter
					</a>
					<a
						class="btn btn-sm variant-ghost-surface"
						href="https://github.com/kent-3/amber"
						target="_blank"
						rel="noreferrer"
					>
						GitHub
					</a>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		
		<!-- Hidden below Tailwind's large breakpoint -->
		<div id="sidebar-left" class="hidden sm:block" >
			{#if poor}
				<div on:click={()=> modalStore.trigger(alert)} class="absolute inset-0 w-20 h-[100%] bg-surface-900 bg-opacity-75 hover:bg-error-900 hover:bg-opacity-75"></div>
			{/if}
			<AppRail selected={storeValue} active="bg-secondary-800" hover="hover:bg-secondary-700">
				<svelte:fragment slot="lead">
					<AppRailTile tag="a" href="{base}/" label="Home" title="Home" value={1}>
						<!-- 🏠 -->
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
							<path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
							<path fill-rule="evenodd" d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z" clip-rule="evenodd" />
						</svg>
					</AppRailTile>
				</svelte:fragment>
				<AppRailTile tag="a" href="{base}/wallet" label="Wallet" title="Wallet" value={2}>
					<!-- 📁 -->
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
						<path d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z" />
					</svg>
				</AppRailTile>
				<AppRailTile tag="a" href="{base}/keys" label="Keys" title="Viewing Keys" value={3}>
					<!-- 🔑 -->
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
						<path fill-rule="evenodd" d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z" clip-rule="evenodd" />
					</svg>
				</AppRailTile>
				<AppRailTile label="Stake" title="coming soon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
						<path d="M5.507 4.048A3 3 0 017.785 3h8.43a3 3 0 012.278 1.048l1.722 2.008A4.533 4.533 0 0019.5 6h-15c-.243 0-.482.02-.715.056l1.722-2.008z" />
						<path fill-rule="evenodd" d="M1.5 10.5a3 3 0 013-3h15a3 3 0 110 6h-15a3 3 0 01-3-3zm15 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm2.25.75a.75.75 0 100-1.5.75.75 0 000 1.5zM4.5 15a3 3 0 100 6h15a3 3 0 100-6h-15zm11.25 3.75a.75.75 0 100-1.5.75.75 0 000 1.5zM19.5 18a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" clip-rule="evenodd" />
					</svg>
				</AppRailTile>
				<svelte:fragment slot="trail">
					<AppRailTile tag="a" href="{base}/secret" label="Query" value={5}>
						<!-- 🤫 -->
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
							<path fill-rule="evenodd" d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clip-rule="evenodd" />
						</svg>
						<!-- <svg
							width="24"
							height="24"
							viewBox="0 0 59 59"
							fill="none"
							stroke="currentColor"
							stroke-miterlimit="10"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								in:draw={{ duration: 1000 }}
								d="M29.5 57C44.6878 57 57 44.6878 57 29.5C57 14.3122 44.6878 2 29.5 2C14.3122 2 2 14.3122 2 29.5C2 44.6878 14.3122 57 29.5 57Z"
								stroke-width="3"
							/>
							<path
								d="M20.3672 18.8621L26.0882 15.8511L24.5827 22.1743L35.1214 28.3094L40.8425 33.6164L40.2403 40.2408L36.0248 42.3485L35.1214 36.3264L24.2816 30.3042L19.4639 24.5832L20.3672 18.8621Z"
							/>
							<path
								in:draw={{ duration: 1000 }}
								d="M28.9569 44.8452C31.7683 44.9192 36.2073 43.4395 36.2813 40.1102C36.5772 30.6403 19.0431 33.3777 19.413 22.4281C19.561 17.4712 25.5536 14.2899 30.5105 14.5119"
								stroke-width="3"
							/>
							<path
								in:draw={{ duration: 1000 }}
								d="M41.2382 19.8387C38.7227 16.8794 35.8374 14.8078 31.6203 14.5119C28.8089 14.29 24.8138 15.6217 24.5179 18.9509C23.704 28.2729 42.126 26.5712 41.1642 37.5208C40.7203 42.4777 34.1357 44.9932 28.9569 44.8452C24.7398 44.6972 21.1146 42.7737 18.1553 39.5184"
								stroke-width="3"
							/>
						</svg> -->
					</AppRailTile>
				</svelte:fragment>
			</AppRail>
		</div>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<svelte:fragment slot="pageFooter">
		<div class="container ml-auto p-1 flex justify-end items-center">
			<code> connected to <a 
					href="https://secret.express"
					target="_blank"
					rel="noopener noreferrer"
					>{chains['Secret Network'].lcd}
				</a>
			</code>
		</div>
	</svelte:fragment>
	<Modal width=""/>
</AppShell>
