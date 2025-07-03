export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-lg min-h-screen bg-white border border-gray-200">
        <main>{children}</main>
        <div id="portal" />
      </div>
    </div>
  );
}
