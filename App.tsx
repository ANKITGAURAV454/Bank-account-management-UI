import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LandingPage } from './components/landing/LandingPage';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { AccountManagement } from './components/accounts/AccountManagement';
import { Transactions } from './components/transactions/Transactions';
import { Deposits } from './components/deposits/Deposits';
import { Loans } from './components/loans/Loans';
import { AdminPanel } from './components/admin/AdminPanel';
import { Toaster } from './components/ui/sonner';
import './styles/globals.css';
import './styles/App.css';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [view, setView] = useState<'landing' | 'signin' | 'signup'>('landing');
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!isAuthenticated) {
    if (view === 'landing') {
      return (
        <LandingPage 
          onSignIn={() => setView('signin')}
          onSignUp={() => setView('signup')}
        />
      );
    }
    
    return (
      <>
        {view === 'signin' ? (
          <SignIn onSwitchToSignUp={() => setView('signup')} />
        ) : (
          <SignUp onSwitchToSignIn={() => setView('signin')} />
        )}
      </>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'accounts':
        return <AccountManagement />;
      case 'transactions':
        return <Transactions />;
      case 'deposits':
        return <Deposits />;
      case 'loans':
        return <Loans />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="app-main">
        {renderPage()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster />
    </AuthProvider>
  );
}
