<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import Wallet from '$lib/components/Wallet.svelte';
	import { chains } from '$lib/config';
	import { amberBalance, readOnlyClient } from '$lib/stores';
	import { testToasts } from '$lib/tests/tests-ui';

	import { AppShell, AppBar, AppRail, AppRailAnchor, Modal } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { storePopup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { Drawer, drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { Toast } from '@skeletonlabs/skeleton';
	// TODO idea - have a way to see dismissed toasts (keep a log of ~12 toasts)
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	// imports for code block highlighting
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/nord.css';

	// image assets
	import logo from '$lib/images/amber-logo.png';
	import { getSupply } from '$lib/temp';
	// import scrt from '$lib/images/scrt.svg'
	// import amber_pope from '$lib/images/stickers/amber-pope.webp';
	// import amber_dealer from '$lib/images/stickers/amberdealer.webp';

	storeHighlightJs.set(hljs);
	storePopup.set({
		computePosition,
		autoUpdate,
		flip,
		shift,
		offset,
		arrow,
	});

	let popupSettings: PopupSettings = {
		event: 'hover',
		placement: 'right-start',
		// Provide a matching 'data-popup' value.
		target: 'examplePopup',
	};

	const drawerSettings: DrawerSettings = {
		id: 'side-menu',
		width: 'w-[90%] max-w-sm',
		rounded: 'rounded-r-xl',
		bgDrawer: 'bg-surface-50 dark:bg-[#28292a]',
		duration: 300,
	};

	const alert: ModalSettings = {
		type: 'alert',
		title: 'Attention',
		body: 'You need at least 1 AMBER to use this app.',
		// image: randomSticker(),
		buttonTextCancel: 'OK',
		modalClasses: '!w-modal-slim',
		backdropClasses: '',
	};

	// uncomment for testing
	// $: poor = false;
	$: poor = !(Number($amberBalance as any) > 1);

	async function debug() {
		// testBatchQuery();
		// testToasts();
		// testModal();
		// const supply = await getSupply($readOnlyClient);
		// console.log(supply);
		console.log($page.url.pathname);
	}

	// function randomSticker(): string | undefined {
	// 	const imageUrls = [amber_pope, amber_dealer];
	// 	const i = Math.floor(Math.random() * imageUrls.length);

	// 	return imageUrls[i];
	// }
</script>

<Toast
	duration={400}
	width="w-80 sm:w-[22rem] sm:min-w-96"
	position="br"
	background="variant-glass-secondary"
	buttonDismiss="btn-icon btn-icon-sm variant-glass"
	buttonAction="btn btm-sm variant-filled"
	max={6}
/>
<Modal
	duration={150}
	regionBody="max-h-[440px]"
	regionBackdrop="bg-surface-backdrop-token backdrop-blur-[2px]"
	width="w-modal"
/>
<div class="absolute bottom-4 left-4 z-[39] sm:hidden">
	<LightSwitch height="h-6" />
</div>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<Drawer bgBackdrop="bg-surface-backdrop-token">
	{#if $drawerStore.id === 'side-menu'}
		<!-- TODO reduce code duplication of these images -->
		<!-- Close menu button -->
		<div on:click={() => drawerStore.close()} class="btn absolute z-[999] pt-4">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="h-10 w-10 text-primary-600 dark:text-primary-500"
			>
				<path
					fill-rule="evenodd"
					d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
					clip-rule="evenodd"
				/>
			</svg>
		</div>
		<!-- Menu -->
		<div
			on:click={() => drawerStore.close()}
			class:pointer-events-none={poor}
			class="mx-auto flex h-full flex-col items-center justify-center"
		>
			{#if poor}
				<p
					class="-translate-y-12 text-center text-lg font-bold text-tertiary-700 dark:text-tertiary-600"
				>
					Connect a wallet <br /> with 1 AMBER
				</p>
			{/if}
			<!-- Menu Items -->
			<div
				class:opacity-25={poor}
				class="flex flex-col items-center justify-between space-y-4 font-bold fill-token"
			>
				<a href="{base}/" class="btn">
					<div class="flex w-32 items-center justify-start gap-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="h-10 w-10"
						>
							<path
								d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z"
							/>
							<path
								fill-rule="evenodd"
								d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z"
								clip-rule="evenodd"
							/>
						</svg>
						<h2 class="text-xl">Home</h2>
					</div>
				</a>
				<!-- <a href="{base}/wallet" class="btn">
					<div class="flex w-32 items-center justify-start gap-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="h-10 w-10"
						>
							<path
								d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z"
							/>
						</svg>
						<h2 class="text-xl">Wallet</h2>
					</div>
				</a> -->
				<!-- <a href="{base}/keys" class="btn">
					<div class="flex gap-4 items-center justify-start w-32">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							class="w-10 h-10"
							viewBox="0 96 960 960"
							><path
								d="M120 936v-60h120v60H120Zm0-170v-60h320v60H120Zm0-160v-60h720v60H120Zm0-160v-60h320v60H120Zm0-170v-60h120v60H120Zm200 660v-60h120v60H320Zm0-660v-60h120v60H320Zm205 660v-60h115v60H525Zm0-170v-60h315v60H525Zm-5-320v-60h320v60H520Zm0-170v-60h120v60H520Zm200 660v-60h120v60H720Zm0-660v-60h120v60H720Z"
							/></svg
						>
						<h2 class="text-xl">Keys</h2>
					</div>
				</a> -->
				<!-- <a href="{base}/" class="btn">
					<div class="flex gap-4 items-center justify-start w-32">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="w-10 h-10"
						>
							<path
								d="M5.507 4.048A3 3 0 017.785 3h8.43a3 3 0 012.278 1.048l1.722 2.008A4.533 4.533 0 0019.5 6h-15c-.243 0-.482.02-.715.056l1.722-2.008z"
							/>
							<path
								fill-rule="evenodd"
								d="M1.5 10.5a3 3 0 013-3h15a3 3 0 110 6h-15a3 3 0 01-3-3zm15 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm2.25.75a.75.75 0 100-1.5.75.75 0 000 1.5zM4.5 15a3 3 0 100 6h15a3 3 0 100-6h-15zm11.25 3.75a.75.75 0 100-1.5.75.75 0 000 1.5zM19.5 18a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
								clip-rule="evenodd"
							/>
						</svg>
						<h2 class="text-xl">Stake</h2>
					</div>
				</a> -->
				<a href="{base}/query" class="btn">
					<div class="flex w-32 items-center justify-start gap-4">
						<svg
							class="h-10 w-10 fill-none stroke-surface-800 dark:stroke-surface-200"
							viewBox="0 0 59 59"
							stroke-miterlimit="10"
							stroke-width="3"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M29.5 57C44.6878 57 57 44.6878 57 29.5C57 14.3122 44.6878 2 29.5 2C14.3122 2 2 14.3122 2 29.5C2 44.6878 14.3122 57 29.5 57Z"
								stroke-width="4"
							/>
							<path
								d="M20.3672 18.8621L26.0882 15.8511L24.5827 22.1743L35.1214 28.3094L40.8425 33.6164L40.2403 40.2408L36.0248 42.3485L35.1214 36.3264L24.2816 30.3042L19.4639 24.5832L20.3672 18.8621Z"
							/>
							<path
								d="M28.9569 44.8452C31.7683 44.9192 36.2073 43.4395 36.2813 40.1102C36.5772 30.6403 19.0431 33.3777 19.413 22.4281C19.561 17.4712 25.5536 14.2899 30.5105 14.5119"
							/>
							<path
								d="M41.2382 19.8387C38.7227 16.8794 35.8374 14.8078 31.6203 14.5119C28.8089 14.29 24.8138 15.6217 24.5179 18.9509C23.704 28.2729 42.126 26.5712 41.1642 37.5208C40.7203 42.4777 34.1357 44.9932 28.9569 44.8452C24.7398 44.6972 21.1146 42.7737 18.1553 39.5184"
							/>
						</svg>
						<h2 class="text-xl">Query</h2>
					</div>
				</a>
				<!-- <a href={poor ? '/' : base + '/tx'} class="btn">
					<div class="flex w-32 items-center justify-start gap-4">
						<svg
							class="h-10 w-10 fill-none stroke-surface-800 dark:stroke-surface-200"
							viewBox="0 0 59 59"
							stroke-miterlimit="10"
							stroke-width="3"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M29.5 57C44.6878 57 57 44.6878 57 29.5C57 14.3122 44.6878 2 29.5 2C14.3122 2 2 14.3122 2 29.5C2 44.6878 14.3122 57 29.5 57Z"
								stroke-width="4"
							/>
							<path
								d="M20.3672 18.8621L26.0882 15.8511L24.5827 22.1743L35.1214 28.3094L40.8425 33.6164L40.2403 40.2408L36.0248 42.3485L35.1214 36.3264L24.2816 30.3042L19.4639 24.5832L20.3672 18.8621Z"
							/>
							<path
								d="M28.9569 44.8452C31.7683 44.9192 36.2073 43.4395 36.2813 40.1102C36.5772 30.6403 19.0431 33.3777 19.413 22.4281C19.561 17.4712 25.5536 14.2899 30.5105 14.5119"
							/>
							<path
								d="M41.2382 19.8387C38.7227 16.8794 35.8374 14.8078 31.6203 14.5119C28.8089 14.29 24.8138 15.6217 24.5179 18.9509C23.704 28.2729 42.126 26.5712 41.1642 37.5208C40.7203 42.4777 34.1357 44.9932 28.9569 44.8452C24.7398 44.6972 21.1146 42.7737 18.1553 39.5184"
							/>
						</svg>
						<h2 class="text-xl">Tx</h2>
					</div>
				</a> -->
				<a href="{base}/debug" class="btn">
					<div class="flex w-32 items-center justify-start gap-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="h-10 w-10"
						>
							<path
								fill-rule="evenodd"
								d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
								clip-rule="evenodd"
							/>
						</svg>
						<h2 class="text-xl">Debug</h2>
					</div>
				</a>
			</div>
		</div>
	{:else if $drawerStore.id === 'alert'}
		<!-- (show 'example-1' contents) -->
		<div class="mx-auto flex items-center justify-center">
			<h2>Not enough AMBER</h2>
		</div>
	{:else}
		<!-- (fallback contents) -->
	{/if}
</Drawer>

<!-- Full page background -->
<!-- <div class="absolute inset-0 z-[-1] bg-secret-swirl-light dark:bg-secret-swirl bg-cover bg-top"/> -->

<!-- App Shell -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<AppShell
	regionPage="bg-spotlights-light dark:bg-spotlights-dark"
	slotSidebarLeft="z-[9] shadow-right-lg bg-surface-100-800-token"
	slotPageFooter="z-[10] mt-10 md:mt-6"
>
	<!--add this for amber background slotHeader="bg-amber-logo bg-[size:120%] bg-no-repeat bg-center" -->
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar slotTrail="!space-x-0 md:!space-x-4" shadow="shadow-lg">
			<svelte:fragment slot="lead">
				<!-- Mobile menu button -->
				<div
					class="btn btn-sm pl-1 pr-2 md:hidden"
					on:click={() => drawerStore.open(drawerSettings)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="h-8 w-8 text-primary-600 dark:text-primary-500"
					>
						<path
							fill-rule="evenodd"
							d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<a
					class="btn py-0 pl-0 pr-2"
					href="https://amber.money"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img class="hidden h-8 pr-2 hover:scale-110 md:block" src={logo} alt="AmberDAO" />
				</a>
				<button on:click={debug}>
					<strong class="font-['Fira_Sans'] text-xl uppercase text-surface-900-50-token"
						>Amber</strong
					>
				</button>
			</svelte:fragment>
			<svelte:fragment>
				<!-- <div class="hidden font-medium sm:inline-flex space-x-4">
					<a
						class="btn btn-sm ring-1 ring-secondary-500/5 variant-glass-secondary"
						href="https://discord.gg/VeCAWCAktq"
						target="_blank"
						rel="noreferrer"
					>
						Discord
					</a>
					<a
						class="btn btn-sm ring-1 ring-secondary-500/5 variant-glass-secondary"
						href="https://twitter.com/AmberDAO_"
						target="_blank"
						rel="noreferrer"
					>
						Twitter
					</a>
					<a
						class="btn btn-sm ring-1 ring-secondary-500/5 variant-glass-secondary"
						href="https://github.com/kent-3/amber"
						target="_blank"
						rel="noreferrer"
					>
						GitHub
					</a>
				</div> -->
				{#if $amberBalance !== '🤫'}
					<div
						class="variant-ghost-primary hidden max-w-xs rounded-xl px-4 py-2 text-center md:inline-flex"
					>
						<p class="text-sm font-bold">
							You have {$amberBalance} AMBER
						</p>
					</div>
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<Wallet />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- <svelte:fragment slot="sidebarLeft">
		<div id="sidebar-left" class="hidden md:block">
			{#if poor}
				<div
					on:click={() => modalStore.trigger(alert)}
					class="absolute inset-0 z-[888] h-full w-[5rem] translate-y-[70px] opacity-50 hover:bg-error-400 dark:hover:bg-error-800"
				/>
			{/if}
			<AppRail
				regionTrail="justify-end"
				active="variant-glass-secondary text-black dark:text-dark-token"
				hover="hover:bg-secondary-hover-token ease-standard transition-colors duration-300"
			>
				<svelte:fragment slot="lead">
					<AppRailAnchor
						href={poor ? '' : base + '/'}
						title="Home"
						selected={$page.url.pathname === '/'}
						regionlead="flex justify-center"
					>
						<svelte:fragment slot="lead">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="h-6 w-6"
							>
								<path
									d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z"
								/>
								<path
									fill-rule="evenodd"
									d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z"
									clip-rule="evenodd"
								/>
							</svg>
						</svelte:fragment>
						Home
					</AppRailAnchor>
				</svelte:fragment>
				<AppRailAnchor
					href={poor ? '' : base + '/wallet'}
					title="Wallet"
					selected={$page.url.pathname === '/wallet'}
					regionlead="flex justify-center"
				>
					<svelte:fragment slot="lead">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="h-6 w-6"
						>
							<path
								d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z"
							/>
						</svg>
					</svelte:fragment>
					Wallet
				</AppRailAnchor>
				<AppRailAnchor
					href={poor ? '' : base + '/query'}
					title="Queries"
					selected={$page.url.pathname === '/query'}
					regionLead="flex justify-center"
				>
					<svelte:fragment slot="lead">
						<svg
							class="h-6 w-6 fill-none stroke-surface-800 dark:stroke-surface-200"
							viewBox="0 0 59 59"
							stroke-miterlimit="10"
							stroke-width="3"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M29.5 57C44.6878 57 57 44.6878 57 29.5C57 14.3122 44.6878 2 29.5 2C14.3122 2 2 14.3122 2 29.5C2 44.6878 14.3122 57 29.5 57Z"
								stroke-width="4"
							/>
							<path
								d="M20.3672 18.8621L26.0882 15.8511L24.5827 22.1743L35.1214 28.3094L40.8425 33.6164L40.2403 40.2408L36.0248 42.3485L35.1214 36.3264L24.2816 30.3042L19.4639 24.5832L20.3672 18.8621Z"
							/>
							<path
								d="M28.9569 44.8452C31.7683 44.9192 36.2073 43.4395 36.2813 40.1102C36.5772 30.6403 19.0431 33.3777 19.413 22.4281C19.561 17.4712 25.5536 14.2899 30.5105 14.5119"
							/>
							<path
								d="M41.2382 19.8387C38.7227 16.8794 35.8374 14.8078 31.6203 14.5119C28.8089 14.29 24.8138 15.6217 24.5179 18.9509C23.704 28.2729 42.126 26.5712 41.1642 37.5208C40.7203 42.4777 34.1357 44.9932 28.9569 44.8452C24.7398 44.6972 21.1146 42.7737 18.1553 39.5184"
							/>
						</svg>
					</svelte:fragment>
					Queries
				</AppRailAnchor>
				<AppRailAnchor
					href={poor ? '' : base + '/tx'}
					title="Transactions"
					selected={$page.url.pathname === '/tx'}
					regionLead="flex justify-center"
				>
					<svelte:fragment slot="lead">
						<svg
							class="h-6 w-6 fill-none stroke-surface-800 dark:stroke-surface-200"
							viewBox="0 0 59 59"
							stroke-miterlimit="10"
							stroke-width="3"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M29.5 57C44.6878 57 57 44.6878 57 29.5C57 14.3122 44.6878 2 29.5 2C14.3122 2 2 14.3122 2 29.5C2 44.6878 14.3122 57 29.5 57Z"
								stroke-width="4"
							/>
							<path
								d="M20.3672 18.8621L26.0882 15.8511L24.5827 22.1743L35.1214 28.3094L40.8425 33.6164L40.2403 40.2408L36.0248 42.3485L35.1214 36.3264L24.2816 30.3042L19.4639 24.5832L20.3672 18.8621Z"
							/>
							<path
								d="M28.9569 44.8452C31.7683 44.9192 36.2073 43.4395 36.2813 40.1102C36.5772 30.6403 19.0431 33.3777 19.413 22.4281C19.561 17.4712 25.5536 14.2899 30.5105 14.5119"
							/>
							<path
								d="M41.2382 19.8387C38.7227 16.8794 35.8374 14.8078 31.6203 14.5119C28.8089 14.29 24.8138 15.6217 24.5179 18.9509C23.704 28.2729 42.126 26.5712 41.1642 37.5208C40.7203 42.4777 34.1357 44.9932 28.9569 44.8452C24.7398 44.6972 21.1146 42.7737 18.1553 39.5184"
							/>
						</svg>
					</svelte:fragment>
					TXs
				</AppRailAnchor>
				<AppRailAnchor
					href={poor ? '' : base + '/debug'}
					title="Debug"
					selected={$page.url.pathname === '/debug'}
					regionLead="flex justify-center"
				>
					<svelte:fragment slot="lead">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="h-6 w-6"
						>
							<path
								fill-rule="evenodd"
								d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
								clip-rule="evenodd"
							/>
						</svg>
					</svelte:fragment>
					Debug
				</AppRailAnchor>
				<svelte:fragment slot="trail">
					<div class="flex h-12 items-center justify-center">
						<LightSwitch height="h-6" />
					</div>
				</svelte:fragment>
			</AppRail>
		</div>
	</svelte:fragment> -->
	<!-- {#if poor && $page.url.pathname !== '/'}
		<div class="flex h-full w-full items-center justify-center">You're not supposed to be here</div>
	{:else} -->
	<!-- Page Route Content -->
	<slot />
	<!-- {/if} -->
	<svelte:fragment slot="pageFooter">
		<div class="container absolute bottom-0 right-1 flex items-center justify-end p-1">
			<code
				class="unstyled whitespace-nowrap rounded bg-secondary-50/80 px-1 py-0.5 font-mono text-xs text-token dark:bg-primary-500/30 dark:text-primary-400"
			>
				connected to
				<a
					href="https://lcd.mainnet.secretsaturn.net"
					target="_blank"
					rel="noopener noreferrer"
					class="unstyled text-secondary-800 underline saturate-200 dark:text-primary-500"
				>
					<!-- {chains['Secret Network'].lcd} -->
					lcd.mainnet.secretsaturn.net
				</a>
			</code>
		</div>
	</svelte:fragment>
</AppShell>
