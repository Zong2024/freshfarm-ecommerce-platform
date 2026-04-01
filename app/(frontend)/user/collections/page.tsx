export default function UserCollectionsPage() {
  return (
    <div className="min-h-100 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-primary-400 mb-6 text-xl font-bold">我的收藏清單</h2>
      <div className="flex flex-col items-center justify-center text-gray-500">
        <p className="text-lg">目前尚無收藏商品</p>
        <p className="mt-2">去產品頁面逛逛吧！</p>
      </div>
    </div>
  );
}
