import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function HistoryTracker() {
  const [myHistory, setMyHistory] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    setMyHistory(prev => {
      const newHistory = [...prev, window.location.href];
      console.log('myHistory :\n', newHistory.join('\n'));
      return newHistory;
    });
  }, [location]);

  return null;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-lg min-h-screen bg-white">
        <main>
          <HistoryTracker />
          {children}
        </main>
        <div id="portal" />
      </div>
    </div>
  );
}
