// Local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`
}

export const wait = () => new Promise(res => setTimeout(res, Math.random() * 800 ));

  // delete user or item
export const deleteItem = ({key}) => {
  return localStorage.removeItem(key)
};

// create a budget
export const createBudget = ({
  name, amount
}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor()
  }
  
  const existingBudgets = fetchData("budgets") ?? []
  return localStorage.setItem("budgets", 
    JSON.stringify([...existingBudgets, newItem]))
}

// create a budget
export const createExpense = ({
  name, amount, budgetId
}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId
  }
  
  const existingExpenses = fetchData("expenses") ?? []
  return localStorage.setItem("expenses", 
    JSON.stringify([...existingExpenses, newItem]))
}

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if expense.id = == budgetID I passed in
    if(expense.budgetId !== budgetId) return acc

    // add the current amount to my total
    return acc += expense.amount
  }, 0)
  return budgetSpent;
}

// formatting currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "EUR"

  })
}

// formatting percentages
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFranctionDigits: 0
  })
}

// format date
export const formatDateToLocaleString = (epoch) =>
new Date(epoch).toLocaleDateString();