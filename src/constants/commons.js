export const STATUS = {
	0: 'Pending',
	1: 'Active',
	2: 'Inactive',
};

export const getStatus = (status) => {
	return STATUS[status];
};
