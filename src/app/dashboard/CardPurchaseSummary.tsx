import { useGetDashboardMetricsQuery } from '@/state/api';
import { TrendingDown, TrendingUp } from 'lucide-react';
import numeral from 'numeral';
import React from 'react';
import { Area, ResponsiveContainer, Tooltip, XAxis, YAxis, AreaChart } from 'recharts';

const CardPurchaseSummary = () => {
    const { data, isLoading } = useGetDashboardMetricsQuery();
    const purchaseData = data?.purchaseSummary || [];

    const lastDataPoint = purchaseData[purchaseData.length - 1] || null;

    return (
        <div className='flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl'>
            {isLoading ? (
                // Animated Loader Placeholder
                <div className="p-7">
                    <div className="animate-pulse">
                        {/* Header Placeholder */}
                        <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
                        <div className="h-px bg-gray-200 mb-4"></div>

                        {/* Body Header Placeholder */}
                        <div className="mb-4 mt-7">
                            <div className="h-4 w-1/4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-8 w-1/2 bg-gray-200 rounded"></div>
                        </div>

                        {/* Chart Placeholder */}
                        <div className="h-20 bg-gray-200 rounded"></div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Header */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
                            Purchase Summary
                        </h2>
                        <hr />
                    </div>

                    {/* Body Header */}
                    <div>
                        <div className="mb-4 mt-7 px-7">
                            <p className="text-xs text-gray-400">Purchased</p>
                            <div className="flex items-center">
                                <p className="text-2xl font-bold">
                                    {lastDataPoint ?
                                        numeral(lastDataPoint.totalPurchased).format("$0.00a")
                                        : "0"
                                    }
                                </p>
                                {lastDataPoint && (
                                    <p className={`text-sm ${lastDataPoint.changePercentage! >= 0 ? "text-gray-500" : "text-green-500"} flex ml-3`}
                                    >
                                        {lastDataPoint.changePercentage! >= 0 ? (
                                            <TrendingUp className='w-5 h-5 mr-1' />
                                        ) : (
                                            <TrendingDown className='w-5 h-5 mr-1' />
                                        )}
                                        {Math.abs(lastDataPoint.changePercentage!)}%
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Chart */}
                        <ResponsiveContainer width="100%" height={200} className="px-7">
                            <AreaChart
                                data={purchaseData}
                                margin={{ top: 0, right: 0, left: -70, bottom: 70 }}
                            >
                                <XAxis
                                    dataKey="date"
                                    tick={false}
                                    axisLine={false}
                                />

                                <YAxis
                                    tickLine={false}
                                    tick={false}
                                    axisLine={false}
                                />

                                <Tooltip
                                    formatter={(value: number) => [
                                        `$${value.toLocaleString("en")}`,
                                    ]}
                                    labelFormatter={(label) => {
                                        const date = new Date(label);
                                        return date.toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        });
                                    }}
                                />

                                <Area
                                    type="linear"
                                    dataKey="totalPurchased"
                                    stroke='#8884d8'
                                    fill='#8884d8'
                                    dot={true}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </div>
    );
};

export default CardPurchaseSummary;