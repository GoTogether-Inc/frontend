export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen h-full bg-gray-50 overflow-auto">
      <div className="relative mx-auto w-full max-w-lg bg-white">
        <main className="flex-grow">{children}</main>
        <div id="portal" />
      </div>
    </div>
  );
}
