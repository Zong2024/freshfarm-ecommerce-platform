export default function AdminLoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <div className="w-full max-w-sm p-6 bg-background rounded-lg border shadow-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-medium">Username</label>
            <input type="text" id="username" className="border rounded-md px-3 py-2" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input type="password" id="password" className="border rounded-md px-3 py-2" />
          </div>
          <button type="submit" className="bg-primary text-primary-foreground rounded-md px-4 py-2 mt-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
