// Expense Tracker
let expenses = [];

function addExpense() {
    const name = document.getElementById('expense-name').value.trim();
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (name && !isNaN(amount)) {
        expenses.push({ name, amount });
        updateExpenseList();
        // Clear input fields
        document.getElementById('expense-name').value = '';
        document.getElementById('expense-amount').value = '';
    } else {
        alert('Please enter a valid expense name and amount.');
    }
}

function updateExpenseList() {
    const list = document.getElementById('expense-list');
    list.innerHTML = ''; // Clear the list before updating

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.name}: $${expense.amount.toFixed(2)}
            <button onclick="editExpense(${index})">Edit</button>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        list.appendChild(li);
    });
}

function editExpense(index) {
    const newName = prompt('Enter new expense name:', expenses[index].name);
    const newAmount = parseFloat(prompt('Enter new expense amount:', expenses[index].amount));

    if (newName && !isNaN(newAmount)) {
        expenses[index] = { name: newName, amount: newAmount };
        updateExpenseList();
    }
}

function deleteExpense(index) {
    if (confirm('Are you sure you want to delete this expense?')) {
        expenses.splice(index, 1);
        updateExpenseList();
    }
}

// Currency Converter (Real API)
async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    if (isNaN(amount)) {
        alert('Please enter a valid amount.');
        return;
    }

    const apiKey = '6a0ccf874092492ca7b533b9c137e9e8'; // Your CurrencyFreaks API key
    const apiUrl = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}&symbols=${fromCurrency},${toCurrency}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.rates) {
            const fromRate = data.rates[fromCurrency];
            const toRate = data.rates[toCurrency];
            const convertedAmount = (amount / fromRate) * toRate;

            document.getElementById('conversion-result').textContent = 
                `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        } else {
            throw new Error(data.error.message || 'Failed to fetch conversion rates.');
        }
    } catch (error) {
        console.error('Error converting currency:', error);
        alert('Failed to convert currency. Please try again later.');
    }
}

//Budget Planner
let monthlyBudget = 0;

function setBudget() {
    const budget = parseFloat(document.getElementById('monthly-budget').value);

    if (!isNaN(budget)) {
        monthlyBudget = budget;
        updateBudgetDisplay();
    } else {
        alert('Please enter a valid budget.');
    }
}

function updateBudgetDisplay() {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const remainingBudget = monthlyBudget - totalExpenses;

    document.getElementById('total-expenses').textContent = totalExpenses.toFixed(2);
    document.getElementById('remaining-budget').textContent = remainingBudget.toFixed(2);
}

// Call this function whenever expenses are updated
function updateExpenseList() {
    const list = document.getElementById('expense-list');
    list.innerHTML = ''; // Clear the list before updating

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.name}: $${expense.amount.toFixed(2)}
            <button onclick="editExpense(${index})">Edit</button>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        list.appendChild(li);
    });

    updateBudgetDisplay(); // Update budget display when expenses change
}

//Scholarship and job alerts
const alerts = [
    { type: 'Scholarship', title: 'LPU Merit Scholarship', description: 'Apply for the LPU Merit Scholarship 2025.' },
    { type: 'Job', title: 'Part-Time Tutor', description: 'Hiring part-time tutors for LPU students.' },
    { type: 'Scholarship', title: 'International Student Grant', description: 'Grant for international students studying abroad.' }
];

function displayAlerts() {
    const list = document.getElementById('alerts-list');
    list.innerHTML = ''; // Clear the list before updating

    alerts.forEach(alert => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${alert.type}:</strong> ${alert.title} - ${alert.description}
        `;
        list.appendChild(li);
    });
}

// Call this function to display alerts when the page loads
displayAlerts();