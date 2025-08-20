import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router, Route, Switch } from 'wouter';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import CommunityPage from '@/pages/CommunityPage';
import ThreadPage from '@/pages/ThreadPage';
import CreatePostPage from '@/pages/CreatePostPage';
import ProfilePage from '@/pages/ProfilePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Router>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/community/:communityId" component={CommunityPage} />
            <Route path="/thread/:threadId" component={ThreadPage} />
            <Route path="/create-post" component={CreatePostPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600">Page not found</p>
                </div>
              </div>
            </Route>
          </Switch>
        </Router>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;