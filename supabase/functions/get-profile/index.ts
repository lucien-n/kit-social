import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { checkUid } from '../_shared/utils.ts';
import * as postgres from 'https://deno.land/x/postgres@v0.14.2/mod.ts';

const databaseUrl = Deno.env.get('SUPABASE_DB_URL')!;
const pool = new postgres.Pool(databaseUrl, 3, true);

serve(async (req) => {
	if (req.method === 'OPTIONS') {
		return new Response('ok', { headers: corsHeaders });
	}

	const { uid } = await req.json();

	if (!checkUid(uid))
		return new Response(JSON.stringify({ error: 'Please provide a valid uid' }), {
			headers: { 'Content-Type': 'application/json' },
			status: 422
		});
});
