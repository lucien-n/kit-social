export function formatDate(date_value: any): string {
	const date = new Date(date_value);

	const month = date.toLocaleString('default', { month: 'short' });
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();

	const formatted_date = `${month} ${day} ${hours.toString().padStart(2, '0')}h${minutes
		.toString()
		.padStart(2, '0')}`;

	return formatted_date;
}

export const checkUid = (uid: string | undefined) => {
	return uid && uid.length == 36;
};
