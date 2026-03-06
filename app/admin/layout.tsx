export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-muted/40">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a className="flex items-center gap-2 font-semibold" href="/admin">
            <span>FreshFarm Admin</span>
          </a>
        </div>
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4">
          <a
            className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            href="/admin"
          >
            Dashboard
          </a>
          <a
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            href="/admin/products"
          >
            Products
          </a>
          <a
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            href="/admin/orders"
          >
            Orders
          </a>
        </nav>
      </aside>
      <div className="flex flex-col flex-1">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-end">
          <span className="text-sm">Admin User</span>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
