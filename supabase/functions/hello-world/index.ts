// Follow this setup guide to integrate the Deno language server with your editor:
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';

console.log('Hello from Functions!');

serve(async (req) => {
	if (req.method === 'OPTIONS') {
		return new Response('ok', { headers: corsHeaders });
	}

	const { name } = await req.json();
	const data = {
		message: `Hello ${name}!`
	};

	return new Response(JSON.stringify(data), {
		headers: { ...corsHeaders, 'Content-Type': 'application/json' }
	});
});
