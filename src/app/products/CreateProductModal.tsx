import React, { ChangeEvent, FormEvent, useState } from 'react'
import { v4 } from "uuid";
import Header from '@/app/(components)/Header';

type ProductFormData = {
    name: string;
    price: number;
    stockQuantity: number;
    rating: number;
}

type CreateProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (formData: ProductFormData) => void;
}

const CreateProductModal = ({ isOpen, onClose, onCreate }: CreateProductModalProps) => {
    const [formData, setFormData] = useState({
        productId: v4(),
        name: "",
        price: 0,
        stockQuantity: 0,
        rating: 0,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "price" || name === "stockQuantity" || name === "rating" ? parseFloat(value) : value,
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onCreate(formData);
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm'>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                    <h2 className="text-2xl font-bold text-white text-center">Create New Product</h2>
                </div>
                
                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Product Name */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter product name"
                            onChange={handleChange}
                            value={formData.name}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            required
                        />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            onChange={handleChange}
                            value={formData.price}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            required
                        />
                    </div>

                    {/* Stock Quantity */}
                    <div className="space-y-2">
                        <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">
                            Stock Quantity
                        </label>
                        <input
                            type="number"
                            id="stockQuantity"
                            name="stockQuantity"
                            placeholder="0"
                            min="0"
                            onChange={handleChange}
                            value={formData.stockQuantity}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            required
                        />
                    </div>

                    {/* Rating */}
                    <div className="space-y-2">
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                            Rating (0-5)
                        </label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            placeholder="0"
                            min="0"
                            max="5"
                            step="0.1"
                            onChange={handleChange}
                            value={formData.rating}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            required
                        />
                    </div>

                    {/* Modal Footer */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition focus:ring-4 focus:ring-blue-200"
                        >
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProductModal;