import Sidebar from '../components/Sidebar.jsx';

/**
 * Layout wrapper providing sidebar + content area for authenticated pages.
 */
export default function MainLayout({
  currentView,
  onNavigate,
  onLogout,
  currentUser,
  storagePercentage,
  documentsCount,
  deletedDocsCount = 0,
  children,
}) {
  return (
    <div className="w-full min-h-screen bg-[#f2f6ff] text-[#0b1c30] flex flex-row font-sans">
      <Sidebar
        currentView={currentView}
        onNavigate={onNavigate}
        onLogout={onLogout}
        currentUser={currentUser}
        storagePercentage={storagePercentage}
        documentsCount={documentsCount}
        deletedDocsCount={deletedDocsCount}
      />
      <div className="flex-1 flex flex-col min-h-screen ml-64">{children}</div>
    </div>
  );
}
