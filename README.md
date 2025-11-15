# Directus Panel Action Extension

This is a Directus dashboard panel extension that provides a configurable button or link.

## Features

- **Two Modes**: Can be configured to act as a simple hyperlink or as a button that sends an HTTP request.
- **Customizable**: You can set the label, URL, and other options for both modes.
- **HTTP Requests**: In button mode, you can configure the HTTP method, URL, and headers for the request. The request is sent from the Directus server.
- **Link**: In link mode, you can configure the URL and whether it opens in a new tab.

## Installation

1.  Copy the `panel-action` folder to your Directus `extensions` directory.
2.  Restart your Directus instance.
3.  The "Panel Action Button" will be available to add to your dashboards.

## Configuration

When you add the "Panel Action Button" to a dashboard, you will be presented with the following options:

### General
- **Label**: The text displayed on the button or link.

### Mode
- **Button (HTTP Request)**: The panel will be a button that sends an HTTP request.
- **Link**: The panel will be a simple hyperlink.

### Link Options (only available in "Link" mode)
- **Link URL**: The URL to navigate to.
- **Open in New Tab**: If enabled, the link will open in a new browser tab.

### Button Options (only available in "Button" mode)
- **Request URL**: The URL to send the HTTP request to.
- **HTTP Method**: The HTTP method to use for the request (GET, POST, PUT, PATCH, DELETE).
- **Request Headers**: Any custom headers to include in the request.
