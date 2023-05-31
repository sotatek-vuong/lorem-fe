<script lang="ts">
	export let slotRoot = '';
</script>

<div class="relative flex items-center {slotRoot}">
	<div class="flex-grow border-t border-border" />
	<slot />
	<div class="flex-grow border-t border-border" />
</div>
