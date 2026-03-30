export default function AdminLoginPage() {
  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center">
      <div className="bg-background w-full max-w-sm rounded-lg border p-6 shadow-sm">
        <h1 className="mb-4 text-center text-2xl font-bold">管理員登入</h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="rounded-md border px-3 py-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="rounded-md border px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-primary-foreground mt-2 rounded-md px-4 py-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
