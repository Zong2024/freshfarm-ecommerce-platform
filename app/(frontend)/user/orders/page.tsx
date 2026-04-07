import { CustomPagination } from "@/components/shared/CustomPagination";

import { getOrders } from "@/lib/services/order";

import { OrderList } from "./_components/OrderList";

interface UserOrdersPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function UserOrdersPage({
  searchParams,
}: UserOrdersPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const data = await getOrders(currentPage);
  console.log(data);

  return (
    <div className="min-h-150 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-primary-400 mb-6 text-xl font-bold">訂單查詢</h2>

      <div className="mb-8">
        <OrderList orders={data.orders} />
      </div>

      {data.pagination.total_pages > 1 && (
        <div className="flex justify-center border-t border-gray-50 pt-6">
          <CustomPagination totalPages={data.pagination.total_pages} />
        </div>
      )}
    </div>
  );
}
