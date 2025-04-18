type RowObj = {
	id: string;
	profile: string;
	name: string;
	username: string;
	userType: 'admin' | 'user';
	status: string;
	createdAt: string;
  };
  
  const userManagementData: RowObj[] = [
	{
	  id: '13234',
	  profile: 'JT',
	  name: 'Jan Tan',
	  username: 'jantan',
	  userType: 'admin',
	  status: 'Active',
	  createdAt: '2022-01-01'
	},
	{
	  id: '24353',
	  profile: 'EA',
	  name: 'Enan Azu',
	  username: 'enanazu',
	  userType: 'user',
	  status: 'Inactive',
	  createdAt: '2021-12-15'
	},
	{
	  id: '35332',
	  profile: 'KB',
	  name: 'Klent Ber',
	  username: 'klentber',
	  userType: 'user',
	  status: 'Error',
	  createdAt: '2021-12-15'
	}
  ];
  
  export default userManagementData;
  