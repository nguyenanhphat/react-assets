import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { PrivateRoute } from 'components/atoms';
import MyLoading from 'components/atoms/loading';
import { PrivateLayout } from 'components/templates';
import renderRoutes from 'routers/render';
import userManager from 'services/user-service';
import AuthProvider from 'utils/auth-provider';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient();

function App() {
  const showComponentLoading = () => {
    return (
      <MyLoading
        icon={
          <LoadingOutlined twoToneColor="#52c41a" style={{ fontSize: 24 }} />
        }
        title="Loading..."
      />
    );
  };
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider userManager={userManager}>
        <Router>
          <Suspense fallback={showComponentLoading()}>
            <Switch>
              {renderRoutes()}
              <PrivateRoute>
                <PrivateLayout />
              </PrivateRoute>
            </Switch>
          </Suspense>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}
export default App;
