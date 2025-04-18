type RowObj = {
	id: string;
	profile: string;
	name: string;
	address: string;
	contact: string;
	status: string;
	createdAt: string;
  };
  
  const userManagementData: RowObj[] = [
	{
	  id: '13234',
	  profile: 'JT',
	  name: 'JanTan',
	  address: 'Tubigan',
	  contact: '+1234567890',
	  status: 'Active',
	  createdAt: '2022-01-01',
	},
	{
	  id: '24353',
	  profile: 'EA',
	  name: 'EnanAzu',
	  address: 'Tubigan',
	  contact: '+0987654321',
	  status: 'Inactive',
	  createdAt: '2021-12-15',
	},
	{
		id: '35332',
		profile: 'KB',
		name: 'KlentBer',
		address: 'Tubigan',
		contact: '+0987654321',
		status: 'Error',
		createdAt: '2021-12-15',
	  },
	// Add more rows as needed
  ];
  
  export default userManagementData;
  