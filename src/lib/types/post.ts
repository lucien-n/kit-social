export type Post = {
	uid: string;
	content: string;
	created_at: string;
	author_uid: string;
	author?: TProfile;
};
