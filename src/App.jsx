/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ConfigProvider, App as AntApp } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import antdTheme from './theme/antdTheme.js';
import { initialGroups } from './constants/groups.js';
import useDocuments from './hooks/useDocuments.js';

import IntroScreen from './pages/IntroScreen.jsx';
import LoginScreen from './pages/LoginScreen.jsx';
import DashboardScreen from './pages/DashboardScreen.jsx';
import AIScreen from './pages/AIScreen.jsx';
import CommunityScreen from './pages/CommunityScreen.jsx';
import ProfileScreen from './pages/ProfileScreen.jsx';
import TrashScreen from './pages/TrashScreen.jsx';
import MainLayout from './layouts/MainLayout.jsx';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [currentUser, setCurrentUser] = useState('');
  const [deletedDocuments, setDeletedDocuments] = useState([]);

  const { documents, activeDoc, addDocument, removeDocument, selectActiveDoc } = useDocuments();
  const [groups, setGroups] = useState(initialGroups);

  // Authentication protected navigation wrapper
  const handleNavigate = (view) => {
    if (!currentUser && !['landing', 'login', 'register'].includes(view)) {
      setCurrentView('login');
    } else {
      setCurrentView(view);
    }
  };

  // Auth callbacks
  const handleLoginSuccess = (email) => {
    setCurrentUser(email);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser('');
    setCurrentView('landing');
  };

  // Document custom deletion and restoration flows
  const handleRemoveDocument = (docId) => {
    const docToRemove = documents.find((d) => d.id === docId);
    if (docToRemove) {
      removeDocument(docId);
      setDeletedDocuments((prev) => [...prev, docToRemove]);
    }
  };

  const handleRestoreDocument = (doc) => {
    setDeletedDocuments((prev) => prev.filter((d) => d.id !== doc.id));
    addDocument(doc);
  };

  const handlePermanentlyDeleteDocument = (docId) => {
    setDeletedDocuments((prev) => prev.filter((d) => d.id !== docId));
  };

  // Community group actions
  const handleToggleJoinGroup = (groupId) => {
    setGroups((prev) =>
      prev.map((grp) => {
        if (grp.id === groupId) {
          const isCurrentlyJoined = grp.isJoined;
          const rawNum = parseInt(grp.members.replace(/,/g, ''));
          const newNum = isCurrentlyJoined ? rawNum - 1 : rawNum + 1;
          return {
            ...grp,
            isJoined: !isCurrentlyJoined,
            members: `${newNum.toLocaleString('en-US')} thành viên`,
          };
        }
        return grp;
      })
    );
  };

  const handleAddCommunityGroup = (newGroup) => {
    setGroups((prev) => [newGroup, ...prev]);
  };

  // View router configurations
  const storagePercentage = Math.min(100, Math.max(15, documents.length * 12.5));
  const isSidebarVisible = ['dashboard', 'ai', 'community', 'profile', 'trash'].includes(currentView);

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <IntroScreen onNavigate={handleNavigate} />;
      case 'login':
      case 'register':
        return (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            onNavigate={handleNavigate}
            currentView={currentView}
          />
        );
      case 'dashboard':
        return (
          <DashboardScreen
            documents={documents}
            onAddDocument={addDocument}
            onRemoveDocument={handleRemoveDocument}
            onSelectActiveDocument={selectActiveDoc}
            currentUser={currentUser || 'Alex Nguyen'}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        );
      case 'ai':
        return (
          <AIScreen
            documents={documents}
            activeDoc={activeDoc}
            onSelectActiveDoc={selectActiveDoc}
            onNavigate={handleNavigate}
          />
        );
      case 'community':
        return (
          <CommunityScreen
            groups={groups}
            onToggleJoin={handleToggleJoinGroup}
            onAddGroup={handleAddCommunityGroup}
            onNavigate={handleNavigate}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            currentUser={currentUser}
            documentsCount={documents.length}
            storagePercentage={storagePercentage}
          />
        );
      case 'trash':
        return (
          <TrashScreen
            deletedDocs={deletedDocuments}
            onRestoreDoc={handleRestoreDocument}
            onPermanentlyDeleteDoc={handlePermanentlyDeleteDocument}
          />
        );
      default:
        return <IntroScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <StyleProvider layer>
      <ConfigProvider theme={antdTheme}>
        <AntApp>
          <div id="root-portal-view" className="w-full min-h-screen bg-[#f2f6ff] text-[#0b1c30] font-sans">
            {isSidebarVisible ? (
              <MainLayout
                currentView={currentView}
                onNavigate={handleNavigate}
                onLogout={handleLogout}
                currentUser={currentUser}
                storagePercentage={storagePercentage}
                documentsCount={documents.length}
                deletedDocsCount={deletedDocuments.length}
              >
                {renderView()}
              </MainLayout>
            ) : (
              renderView()
            )}
          </div>
        </AntApp>
      </ConfigProvider>
    </StyleProvider>
  );
}
