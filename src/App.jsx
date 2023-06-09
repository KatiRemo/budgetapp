import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Root, { rootLoader } from './routes/root';
// import Team, { teamLoader } from './routes/team';

// routes
import Dashboard, { dashboardAction, dashboardLoader } from './pages/Dashboard';
import Error from './pages/Error'
import BudgetPage, { budgetAction, budgetLoader } from './pages/BudgetPage';
import ExpensesPage, { expensesAction, expensesLoader } from './pages/ExpensesPage';

// actions
import { logoutAction } from './actions/logout';
import { deleteBudget } from './actions/deleteBudget';

//layouts 
import Main, { mainLoader } from './layouts/Main';

// toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          }
        ]
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  },
]);


function App() {
  return <div className="App">
    <RouterProvider router={router} />
    <ToastContainer />
  </div>;
}

export default App;
