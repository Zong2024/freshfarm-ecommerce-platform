export default function UserOrdersPage() {
  return (
    <div className="min-h-150 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-primary-400 mb-6 text-xl font-bold">訂單查詢</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-sm">
              <th className="px-6 py-4 font-bold text-gray-700">訂單編號</th>
              <th className="px-6 py-4 font-bold text-gray-700">訂購日期</th>
              <th className="px-6 py-4 font-bold text-gray-700">付款狀態</th>
              <th className="px-6 py-4 font-bold text-gray-700">訂單總額</th>
              <th className="px-6 py-4 font-bold text-gray-700">詳細內容</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-gray-50 transition-colors hover:bg-gray-50">
              <td className="px-6 py-4">#ORD-20260401-001</td>
              <td className="px-6 py-4 text-xs text-gray-500">2026/04/01</td>
              <td className="px-6 py-4">
                <span className="bg-primary-100 text-primary-400 rounded-full px-3 py-1 text-xs font-bold">
                  已付款
                </span>
              </td>
              <td className="px-6 py-4 font-bold">NT$ 1,200</td>
              <td className="px-6 py-4">
                <button className="text-primary-400 font-bold transition-all hover:underline">
                  查看詳情
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
