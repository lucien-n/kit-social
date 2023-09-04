export function formatDatePrecise(date_value: Date | string | number | undefined): string {
	if (!date_value) return 'No Date';
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

export const formatDate = (date_value: Date | string | number | undefined): string => {
	if (!date_value) return 'No Date';
	const date = new Date(date_value);

	const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
	const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

	const parts = formattedDate.split(' ');
	const day = parts[1];
	const month = parts[0];
	const year = parts[2];

	const finalFormattedDate = `${day} ${month} ${year}`.replace(',', '');

	return finalFormattedDate;
};

export const checkUid = (uid: string | undefined) => {
	return uid && uid.length == 36;
};
