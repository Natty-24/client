import { useGetDashboardMetricsQuery } from '@/state/api';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Rating from '../(components)/Rating';

const CardPopularProducts = () => {
    const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

    return (
        <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-4 flex flex-col">
            {isLoading ? (
                // Animated Loader Placeholder
                <div className="p-7 flex-1">
                    <div className="animate-pulse">
                        {/* Header Placeholder */}
                        <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
                        <div className="h-px bg-gray-200 mb-4"></div>

                        {/* Product List Placeholder */}
                        {[1, 2, 3].map((index) => (
                            <div key={index} className="flex items-center justify-between gap-3 px-5 py-7 border-b">
                                {/* Image Placeholder */}
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-200 rounded-md"></div>

                                    {/* Product Details Placeholder */}
                                    <div className="flex flex-col justify-between gap-1">
                                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                        <div className="h-3 w-24 bg-gray-200 rounded"></div>
                                    </div>
                                </div>

                                {/* Sold Count Placeholder */}
                                <div className="h-3 w-16 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <div className="px-7 pt-5 pb-2">
                        <h3 className='text-lg font-semibold'>Popular Products</h3>
                        <hr className="mt-2" />
                    </div>
                    <div className="overflow-auto flex-1">
                        {dashboardMetrics?.popularProducts.map((product) => (
                            <div
                                key={product.productId}
                                className="flex items-center justify-between gap-3 px-5 py-4 hover:bg-gray-50 transition-colors border-b"
                            >
                                <div className="flex items-center gap-3">
                                    {product.image ? (
                                        <div className="relative w-12 h-12 rounded-md overflow-hidden">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                                            <ShoppingBag className="w-5 h-5 text-gray-400" />
                                        </div>
                                    )}

                                    <div className="flex flex-col justify-between gap-1">
                                        <div className="font-bold text-gray-700 line-clamp-1">{product.name}</div>
                                        <div className="flex text-sm items-center">
                                            <span className="font-bold text-blue-500 text-xs">${product.price.toFixed(2)}</span>
                                            <span className="mx-2 text-gray-300">|</span>
                                            <Rating rating={product.rating || 0} />
                                        </div>
                                    </div>
                                </div>

                                <div className="text-xs flex items-center">
                                    <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2 hover:bg-blue-200 transition-colors">
                                        <ShoppingBag className='w-4 h-4' />
                                    </button>
                                    <span className="text-gray-500">
                                        {product.stockQuantity >= 1000 
                                            ? `${(product.stockQuantity / 1000).toFixed(1)}k` 
                                            : product.stockQuantity} Sold
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CardPopularProducts;