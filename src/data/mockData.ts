
export const mockTransactions = [
  {
    id: "t1",
    title: "Grocery Shopping",
    amount: -120.50,
    date: "2025-04-28",
    category: "food",
  },
  {
    id: "t2",
    title: "Salary",
    amount: 2500.00,
    date: "2025-04-25",
    category: "other",
  },
  {
    id: "t3",
    title: "Gas Station",
    amount: -45.00,
    date: "2025-04-24",
    category: "transport",
  },
  {
    id: "t4",
    title: "Online Shopping",
    amount: -89.99,
    date: "2025-04-23",
    category: "shopping",
  },
  {
    id: "t5",
    title: "Movie Night",
    amount: -35.50,
    date: "2025-04-21",
    category: "entertainment",
  },
  {
    id: "t6",
    title: "Pharmacy",
    amount: -28.75,
    date: "2025-04-20",
    category: "health",
  },
];

export const mockBudgets = [
  {
    id: "b1",
    title: "Monthly Essentials",
    spent: 450,
    limit: 600,
    color: "#FEC6A1",
    categories: ["Groceries", "Bills", "Transport"],
  },
  {
    id: "b2",
    title: "Fun & Entertainment",
    spent: 120,
    limit: 200,
    color: "#E5DEFF",
    categories: ["Movies", "Games", "Dining Out"],
  },
  {
    id: "b3",
    title: "Shopping",
    spent: 240,
    limit: 300,
    color: "#D3E4FD",
    categories: ["Clothes", "Electronics", "Home"],
  },
  {
    id: "b4",
    title: "Health",
    spent: 75,
    limit: 150,
    color: "#F2FCE2",
    categories: ["Gym", "Medicine", "Self-care"],
  },
];

export const mockChartData = [
  { name: "Food", value: 320, color: "#FEC6A1" },
  { name: "Transport", value: 150, color: "#D3E4FD" },
  { name: "Entertainment", value: 230, color: "#E5DEFF" },
  { name: "Shopping", value: 280, color: "#FFDEE2" },
  { name: "Health", value: 120, color: "#F2FCE2" },
  { name: "Other", value: 100, color: "#F1F0FB" },
];

export const getIncome = () => 
  mockTransactions
    .filter(tx => tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);

export const getExpenses = () =>
  Math.abs(mockTransactions
    .filter(tx => tx.amount < 0)
    .reduce((sum, tx) => sum + tx.amount, 0));

export const getBalance = () =>
  mockTransactions.reduce((sum, tx) => sum + tx.amount, 0);
