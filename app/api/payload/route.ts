// Placeholder route for Payload API.
// To enable Payload you must:
// 1) Install payload and a database driver (e.g. `npm install payload mongodb`).
// 2) Set `MONGODB_URI` and `PAYLOAD_SECRET` in your environment.
// 3) Optionally replace this file with a proper Payload middleware handler.
//
// For now this file returns 404 so the app continues to build until you opt-in.

export async function GET() {
	return new Response(JSON.stringify({ error: 'Payload not enabled' }), {
		status: 404,
		headers: { 'Content-Type': 'application/json' },
	});
}

export async function POST() {
	return new Response(JSON.stringify({ error: 'Payload not enabled' }), {
		status: 404,
		headers: { 'Content-Type': 'application/json' },
	});
}

