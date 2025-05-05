import React, { ChangeEvent, FormEvent, useState } from 'react';
import Header from '@/app/(components)/Header';
import { v4 } from 'uuid';

type ProductFormData = {
  productId: string;
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type EditProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (formData: ProductFormData) => void;
  onDelete: (productId: string) => void;
  product?: ProductFormData; // Optional product data for editing
};

const EditProductModal = ({
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  product,
}: EditProductModalProps) => {
  const [formData, setFormData] = useState<ProductFormData>(
    product || {
      productId: v4(),
      name: "",
      price: 0,
      stockQuantity: 0,
      rating: 0,
    }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "stockQuantity" || name === "rating" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (product) {
      onUpdate({ ...formData, productId: product.productId }); // Ensure the same product ID is used
    }
    onClose();
  };

  const handleDelete = () => {
    if (product) {
      onDelete(product.productId); // Call the delete function with the product ID
    }
    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles =
    "block text-sm font-medium text-gray-700 text-[1rem] outline-none";
  const inputCssStyles =
    "block w-full p-2 rounded-md text-[1rem] bg-gray-100 hover:bg-gray-200 transition duration-150 outline-none";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-10 border w-[400px] shadow-lg rounded-md bg-white">
        <div className="text-center">
          <Header name={product ? "Edit Product" : "Create New Product"} />
        </div>

        <form onSubmit={handleSubmit} className="mt-5">
          {/* Product Name */}
          <label htmlFor="productName" className={labelCssStyles}>
            Product Name
          </label>
          <div className="inputStyles">
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={formData.name}
              className={inputCssStyles}
              required
            />
          </div>

          {/* Price */}
          <label htmlFor="productPrice" className={labelCssStyles}>
            Price
          </label>
          <div className="inputStyles">
            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              value={formData.price}
              className={inputCssStyles}
              required
            />
          </div>

          {/* Stock Quantity */}
          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Stock Quantity
          </label>
          <div className="inputStyles">
            <input
              type="number"
              name="stockQuantity"
              placeholder="Stock Quantity"
              onChange={handleChange}
              value={formData.stockQuantity}
              className={inputCssStyles}
              required
            />
          </div>

          {/* Rating */}
          <label htmlFor="rating" className={labelCssStyles}>
            Rating
          </label>
          <div className="inputStyles">
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              onChange={handleChange}
              value={formData.rating}
              className={inputCssStyles}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-4">
            {/* Update Button */}
            <button
              type="submit"
              className="px-4 py-2 text-[13px] bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150"
            >
              {product ? "Update" : "Create"}
            </button>

            {/* Delete Button (Only shown when editing a product) */}
            {product && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-150"
              >
                Delete
              </button>
            )}

            {/* Cancel Button */}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-150"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;