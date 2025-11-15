import { definePanel } from "@directus/extensions-sdk";
import PanelComponent from "./panel.vue";

export default definePanel({
	id: "panel-action-button",
	name: "Panel Action Button",
	icon: "touch_app",
	description: "Adaptable button or link panel",
	component: PanelComponent,

	options: [
		//
		// Shared fields
		//
		{
			field: "label",
			name: "Label",
			type: "string",
			schema: { default_value: "" },
			meta: {
				interface: "input",
				width: "full",
			},
		},

		//
		// Type switch
		//
		{
			field: "mode",
			name: "Mode",
			type: "string",
			schema: { default_value: "button" },
			meta: {
				interface: "select-dropdown",
				width: "half",
				options: {
					choices: [
						{ text: "Button (HTTP Request)", value: "button" },
						{ text: "Link", value: "link" },
					],
				},
			},
		},

		//
		// Link options
		//
		{
			field: "link_url",
			name: "Link URL",
			type: "string",
			meta: {
				interface: "input",
				width: "full",
				conditions: [
					{
						rule: { mode: { _eq: "link" } },
						hidden: false,
					},
					{
						rule: { mode: { _neq: "link" } },
						hidden: true,
					},
				],
			},
		},
		{
			field: "open_in_new_tab",
			name: "Open in New Tab",
			type: "boolean",
			meta: {
				interface: "boolean",
				width: "full",
				conditions: [
					{
						rule: { mode: { _eq: "link" } },
						hidden: false,
					},
					{
						rule: { mode: { _neq: "link" } },
						hidden: true,
					},
				],
			},
		},

		//
		// Button-only: Request URL
		//
		{
			field: "request_url",
			name: "Request URL",
			type: "string",
			meta: {
				interface: "input",
				width: "full",
				conditions: [
					{
						rule: { mode: { _eq: "button" } },
						hidden: false,
					},
					{
						rule: { mode: { _neq: "button" } },
						hidden: true,
					},
				],
			},
		},

		//
		// Button-only: HTTP method
		//
		{
			field: "method",
			name: "HTTP Method",
			type: "string",
			schema: { default_value: "GET" },
			meta: {
				interface: "select-dropdown",
				width: "half",
				options: {
					choices: [
						{ text: "GET", value: "GET" },
						{ text: "POST", value: "POST" },
						{ text: "PUT", value: "PUT" },
						{ text: "PATCH", value: "PATCH" },
						{ text: "DELETE", value: "DELETE" },
					],
				},
				conditions: [
					{
						rule: { mode: { _eq: "button" } },
						hidden: false,
					},
					{
						rule: { mode: { _neq: "button" } },
						hidden: true,
					},
				],
			},
		},

		//
		// Button-only: Headers (JSON key/value list)
		//
		{
			field: "headers",
			name: "Request Headers",
			type: "json",
			meta: {
				interface: "key-value",
				width: "full",
				// placeholder: "Authorization → Bearer ...",
				conditions: [
					{
						rule: { mode: { _eq: "button" } },
						hidden: false,
					},
					{
						rule: { mode: { _neq: "button" } },
						hidden: true,
					},
				],
			},
		},
	],

	minWidth: 12,
	minHeight: 6,
});
