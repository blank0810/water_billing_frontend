type RowObj = {
	id: string;
	name: string;
	billMonth: string;
	status: string;
	rateName: string;
	rateCharge: string;
	rate: string;
	vat: string;
  };
  
  const rateManagementData: RowObj[] = [
	{
	  id: '1001',
	  name: 'Jan Tan',
	  billMonth: 'April 2025',
	  status: 'Paid',
	  rateName: 'Residential Rate',
	  rateCharge: 'Php 500',
	  rate: 'Php 12.50/cu.m',
	  vat: '12%'
	},
	{
	  id: '1002',
	  name: 'Enan Azu',
	  billMonth: 'April 2025',
	  status: 'Unpaid',
	  rateName: 'Commercial Rate',
	  rateCharge: 'Php 1000',
	  rate: 'Php 20.00/cu.m',
	  vat: '12%'
	},
	{
	  id: '1003',
	  name: 'Klent Ber',
	  billMonth: 'March 2025',
	  status: 'Pending',
	  rateName: 'Industrial Rate',
	  rateCharge: 'Php 1500',
	  rate: 'Php 25.00/cu.m',
	  vat: '12%'
	}
  ];
  
  export default rateManagementData;
  