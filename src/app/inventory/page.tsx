"use client";
import { useGetProductsQuery } from '@/state/api';
import Header from '@/app/(components)/Header';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  { 
    field: "price", 
    headerName: "Price", 
    width: 110, 
    type: "number", 
    valueGetter: (value, row) => `$${row.price}`
 },
 { 
  field: "rating", 
  headerName: "Rating", 
  width: 110, 
  type: "number", 
  valueGetter: (value, row) => row.rating ? row.rating : "N/A",
},
{ 
  field: "stockQuantity", 
  headerName: "Stock Quantity", 
  width: 150, 
  type: "number", 
},
];

const Inventory = () => {
  
    const { data: products, isError, isLoading } = useGetProductsQuery();
    if (isLoading) {
      return ( 
      <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
  )
    }    
   if (isError || !products) {
     return (
      <div className="text-center text-red-500 p-4">
      Failed to fetch data
     </div>
     )
   }    
  
    return (
    <div className='flex flex-col'>
      <Header name="Inventory" />
       <DataGrid 
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId} 
        checkboxSelection
        className='bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700'
        />
    </div>
  )
}

export default Inventory;