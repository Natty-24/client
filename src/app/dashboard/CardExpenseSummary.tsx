import { ExpenseByCategorySummary, ExpenseSummary, useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingUp } from "lucide-react";
import { Pie, ResponsiveContainer, PieChart, Cell } from "recharts";

type ExpenseSums = {
    [category: string]: number;
}

const colors = ["#00CA9F", "#0088FE", "#FFBB26"];

const CardExpenseSummary = () => {
    const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

    const expenseSummary = dashboardMetrics?.expenseSummary[0];

    const expenseCategoriesSummary = dashboardMetrics?.expenseByCategorySummary || [];

    const expenseSums = expenseCategoriesSummary.reduce(
        (acc: ExpenseSums, item: ExpenseByCategorySummary) => {
            const category = item.category + "Expenses";
            const amount = parseInt(item.amount, 10);
            if (!acc[category]) acc[category] = 0;
            acc[category] += amount;
            return acc;
        },
        {}
    );

    const expenseCategories = Object.entries(expenseSums).map(
        ([name, value]) => ({
            name,
            value,
        })
    );

    const totalExpenses = expenseCategories.reduce(
        (acc, category: { value: number }) => acc + category.value, 0
    );

    const formattedTotalExpenses = totalExpenses.toFixed(2);

    return (
        <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between">
            {isLoading ? (
                // Animated Loader Placeholder
                <div className="p-7">
                    <div className="animate-pulse">
                        {/* Header Placeholder */}
                        <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
                        <div className="h-px bg-gray-200 mb-4"></div>

                        {/* Chart Placeholder */}
                        <div className="flex justify-between">
                            <div className="relative basis-3/5">
                                <div className="h-32 bg-gray-200 rounded-full"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                    <div className="h-6 w-16 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                            <div className="basis-2/5">
                                <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                            </div>
                        </div>

                        {/* Footer Placeholder */}
                        <div className="h-px bg-gray-200 mt-4 mb-4"></div>
                        <div className="flex justify-between">
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                            <div className="h-4 w-12 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Header */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
                            Expense Summary
                        </h2>
                        <hr />
                    </div>

                    {/* Body */}
                    <div className="xl:flex justify-between pr-7">
                        {/* Chart */}
                        <div className="relative basis-3/5">
                            <ResponsiveContainer width="100%" height={140}>
                                <PieChart>
                                    <Pie data={expenseCategories} innerRadius={50} outerRadius={60} fill="#8884d8" dataKey="value" nameKey="name" cx="50%" cy="50%">
                                        {expenseCategories.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={colors[index % colors.length]}
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center basis-2/5">
                                <span className="font-bold text-lg">
                                    ${formattedTotalExpenses}
                                </span>
                            </div>
                        </div>

                        {/* Label */}
                        <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
                            {expenseCategories.map((entry, index) => (
                                <li
                                    key={`legend-${index}`} className="flex items-center text-xs"
                                >
                                    <span
                                        className="mr-2 w-3 h-3 rounded-full"
                                        style={{ backgroundColor: colors[index % colors.length] }}>
                                    </span>
                                    {entry.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Footer */}
                    <div>
                        <hr />
                        {expenseSummary && (
                            <div className="mt-3 flex justify-between items-center px-7 mb-4">
                                <div className="pt-2">
                                    <p className="text-sm">
                                        Average:{" "}
                                        <span className="font-semibold">
                                            ${expenseSummary.totalExpenses.toFixed(2)}
                                        </span>
                                    </p>
                                </div>
                                <span className="flex items-center mt-3">
                                    <TrendingUp className="mr-2 text-gray-500" />
                                    30%
                                </span>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default CardExpenseSummary;