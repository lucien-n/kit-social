import { PRIVATE_UPSTASH_REDIS_REST_TOKEN } from '$env/static/private';
import { PUBLIC_UPSTASH_REDIS_REST_URL } from '$env/static/public';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis/nodejs';

const redis = new Redis({
	url: PUBLIC_UPSTASH_REDIS_REST_URL,
	token: PRIVATE_UPSTASH_REDIS_REST_TOKEN
});

export const ratelimit = {
	posts: {
		feed: new Ratelimit({
			redis,
			prefix: 'rl:posts:feed',
			limiter: Ratelimit.slidingWindow(10, '10s')
		})
	},
	users: {
		profile: new Ratelimit({
			redis,
			prefix: 'rl:users:profile',
			limiter: Ratelimit.slidingWindow(10, '10s')
		})
	}
};
