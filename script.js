 

const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategoryInput = document.getElementById('expense-category');
const expenseDateInput = document.getElementById('expense-date');
const expenseIdInput = document.getElementById('expense-id');
const tableBody = document.getElementById('expense-body');  
const totalAmountDisplay = document.getElementById('total-amount');
const cancelButton = document.getElementById('cancel-button');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let editingIndex = -1;

function renderExpenses() {
    tableBody.innerHTML = '';  
    let total = 0;

    expenses.forEach((expense, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${expense.name}</td>
            <td>₹${parseFloat(expense.amount).toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td>
                <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(newRow);

        total += parseFloat(expense.amount);
    });

    totalAmountDisplay.textContent = total.toFixed(2);
}

function addExpense(event) {
    event.preventDefault();  
    const expense = {
        name: expenseNameInput.value,
        amount: expenseAmountInput.value,
        category: expenseCategoryInput.value,
        date: expenseDateInput.value,
    };
    

    if (editingIndex === -1) {
        expenses.push(expense);  
    } else {
        expenses[editingIndex] = expense; 
        editingIndex = -1;  
        cancelButton.classList.add('hidden');  
        expenseIdInput.value = '';  
    }

    localStorage.setItem('expenses', JSON.stringify(expenses));  
    renderExpenses();  
    expenseForm.reset();  
}

function deleteExpense(index) {
    expenses.splice(index, 1);  
    localStorage.setItem('expenses', JSON.stringify(expenses)); 
    renderExpenses();  
}

function editExpense(index) {
    const expense = expenses[index];
    expenseNameInput.value = expense.name;
    expenseAmountInput.value = expense.amount;
    expenseCategoryInput.value = expense.category;
    expenseDateInput.value = expense.date;
    editingIndex = index;  
    cancelButton.classList.remove('hidden'); 
}

cancelButton.addEventListener('click', () => {
    editingIndex = -1; 
    expenseForm.reset();  
    cancelButton.classList.add('hidden');  
});

expenseForm.addEventListener('submit', addExpense);
renderExpenses();
