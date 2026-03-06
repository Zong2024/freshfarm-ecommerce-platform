export default function CartPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="flex flex-col gap-4">
        {/* Cart items will be rendered here */}
        <p className="text-muted-foreground">Your cart is empty.</p>
      </div>
    </div>
  );
}
