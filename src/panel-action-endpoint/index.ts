import { defineEndpoint } from "@directus/extensions-sdk";
import express from "express";

export default defineEndpoint((router) => {
	router.use(express.json());

	router.get("/", (_req, res) => res.send("Hello from Panel Action!"));

	router.post("/", async (req, res) => {
		const {
		label,
		mode,
		link_url,
		request_url,
		method,
		headers,
		} = req.body as {
			label?: string;
			mode?: string;
			link_url?: string;
			open_in_new_tab?: boolean;
			request_url?: string;
			method?: string;
			headers?: Record<string, string>;
		};

		const url = request_url || link_url;

		if (!url) {
			return res.status(400).send("Missing link_url or request_url");
		}

		const result = await fetch(url, {
			method,
			headers,
		});

		const success = result.ok;

		res.send({ success });
	});
});
