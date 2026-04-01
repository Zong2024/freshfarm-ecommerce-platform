export default function UserProfilePage() {
  return (
    <div className="min-h-100 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-primary-400 mb-6 text-xl font-bold">個人帳戶設定</h2>
      <div className="space-y-6">
        <p className="text-gray-500">
          此頁面將包含您的個人資料、聯絡資訊以及密碼修改功能。
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              姓名
            </label>
            <input
              type="text"
              defaultValue="陳小農"
              className="focus:ring-primary-300 w-full rounded-md border border-gray-200 px-4 py-2 focus:ring-2 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              電話
            </label>
            <input
              type="text"
              defaultValue="0912345678"
              className="focus:ring-primary-300 w-full rounded-md border border-gray-200 px-4 py-2 focus:ring-2 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
