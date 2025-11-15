<template>
	<div class="panel-button-wrapper">

		<!-- LINK MODE -->
		<VButton
		    v-if="mode === 'link'"
		    :href="link_url"
            :fullWidth="true"
            :secondary="true"
            :target="open_in_new_tab ? '_blank' : '_self'"
        >
            <span v-if="loading">Sending…</span>
			<span v-else>{{ label || "Click" }}</span>
        </VButton>

		<!-- BUTTON MODE -->
		<VButton
		v-else-if="mode === 'button'"
    		:disabled="loading"
            :loading="loading"
            :fullWidth="true"
    		@click="triggerRequest"
    	>
            <span v-if="loading">Sending…</span>
			<span v-else>{{ label || "Click" }}</span>
        </VButton>

		<!-- SUCCESS -->
		<div v-if="response" class="result success">
			<!-- <strong>Response:</strong> -->
			<pre>{{ response }}</pre>
		</div>

		<!-- ERROR -->
		<div v-if="error" class="result error">
			<!-- <strong>Error:</strong> -->
			{{ error }}
		</div>

	</div>
</template>

<script lang="ts" setup>
import { useApi } from "@directus/extensions-sdk";
import { ref, withDefaults } from "vue";

//
// Props from Directus panel options
//
const props = withDefaults(
	defineProps<{
		label?: string;
		mode?: "button" | "link";
		link_url?: string;
		open_in_new_tab?: boolean;

		// Button-only request fields
		request_url?: string;
		method?: string;
		headers?: Record<string, string>;
	}>(),
	{
		label: "Click",
		mode: "button",
		link_url: "",
		open_in_new_tab: false,
		request_url: "",
		method: "GET",
		headers: {} as Record<string, string>,
	},
);

//
// Directus authenticated API client
//
const api = useApi();

// const { useAuthStore } = useStores();
// const auth = useAuthStore();

// const token = auth.token;

//
// Local reactive state
//
const loading = ref(false);
const response = ref<unknown | null>(null);
const error = ref<string | null>(null);

//
// HTTP request handler
//
async function triggerRequest() {
	if (!props.request_url) {
		error.value = "No request URL specified";
		return;
	}

	loading.value = true;
	response.value = null;
	error.value = null;

	try {
		const result = await api.post("panel-action-endpoint",  {
				label: props.label,
				mode: props.mode,
				link_url: props.link_url,
				open_in_new_tab: props.open_in_new_tab,
				request_url: props.request_url,
				method: props.method,
				headers: props.headers,
			},
		);

		if (!result.data.success) {
			throw new Error("Request failed");
		}

		// response.value = result;
		response.value = "Success";
	} catch (e: any) {
		console.error(e);
		error.value = e?.message ?? "Request failed";
	} finally {
		loading.value = false;
	}
}
</script>

<style scoped>
.panel-button-wrapper {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

/* Directus-style button */
.directus-button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	height: 36px;
	padding: 0 14px;
	font-size: 14px;
	border-radius: 6px;
	border: none;
	background: var(--primary);
	color: white;
	cursor: pointer;
	text-decoration: none;
}

.directus-button:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.result {
	padding: 10px;
	border-radius: 6px;
	font-size: 13px;
	white-space: pre-wrap;
}

.result.success {
	background: rgba(0, 200, 0, 0.1);
	color: var(--success);
	border: 1px solid var(--success);
}

.result.error {
	background: rgba(255, 0, 0, 0.1);
	color: var(--danger);
	border: 1px solid var(--danger);
}
</style>
