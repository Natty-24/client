"use client";
import { useGetUsersQuery } from '@/state/api';
import Header from '@/app/(components)/Header';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
];

const Users = () => {
  
    const { data: users, isError, isLoading } = useGetUsersQuery();
    if (isLoading) {
      return ( 
        <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    )
    }    
   if (isError || !users) {
     return (
      <div className="text-center text-red-500 p-4">
      Failed to fetch data
     </div>
     )
   }    
  
    return (
    <div className='flex flex-col'>
      <Header name="Users" />
       <DataGrid 
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId} 
        checkboxSelection
        className='bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700'
        />
    </div>
  )
}

export default Users;