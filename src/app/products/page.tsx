"use client"

import { Product, useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "@/app/(components)/Header";
import Rating  from "@/app/(components)/Rating";
import CreateProductModal from "./CreateProductModal"

type ProductFormData = {
    name: string;
    price: number;
    stockQuantity: number;
    rating: number;
}

const Products = () => {
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ isModalOpen, setIsModalOpen ] = useState(false);

    const { data: products, isLoading, isError } = useGetProductsQuery(searchTerm);

    const [ createProduct ] = useCreateProductMutation();
    const handleCreateProduct = async (productData: ProductFormData) => {
        await createProduct(productData);
    }

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
       );
     }    
    
    return (
        <div className="mx-auto pb-5 w-full">
         
         {/* Search Bar */}
         <div className="mb-6">
            <div className="flex items-center border-2 hover:border-gray-300 rounded-[30px] transition duration-150">
                <SearchIcon className="w-7 h-7 text-gray-500 m-2" />
                <input className="w-full pl-4 py-3 bg-white focus:bg-gray-100 outline-none rounded-[30px] transition duration-150" placeholder="Search Products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value )}/>
            </div>
         </div>
                                   {/* Header   */}
          
        <div className="flex justify-between mb-6">
            <Header name="Products"/>
            <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-3 px-4 text-[1.1rem] rounded-[30px] transition duration-200 active:bg-blue-500 "
            onClick={() => setIsModalOpen(true)}>
                <PlusCircleIcon className="w-6 h-6 mr-2 !text-gray-200" /> Create Product
            </button>
        </div>

                                   {/* Body */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
          {isLoading ? ( <div>Loading</div>) : (
            products?.map((product) => (
                <div key={product.productId} className="border shadow rounded-md p-4 max-w-full w-full mx-auto">
                    <div 
                    className="flex flex-col items-center
                    ">
                        <span className="w-[60px] h-[60px] rounded-[50%] bg-gray-200"></span>
                        <h3 className="text-lg text-gray-900 font-semibold">
                            {product.name}
                        </h3>
                        <p className="text-gray-800">${product.price.toFixed(2)}</p>
                        <div className="text-sm text-gray-600 mt-1">
                            Stock: {product.stockQuantity}
                        </div>
                        {product.rating && (
                            <div className="flex items-center mt-2">
                                <Rating rating={product.rating} />
                            </div>
                        )}
                    </div>
                </div>
            ))
          )}    
        </div>          

                         {/*Modal*/}
          <CreateProductModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCreate={handleCreateProduct}
          />             
        </div>
    );
};

export default Products;