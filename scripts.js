document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    const summary = document.getElementById('summary');
    let expenses = [];

    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const description = document.getElementById('expenseDescription').value;
        const amount = parseFloat(document.getElementById('expenseAmount').value);
        const participants = document.getElementById('participantNames').value.split(',').map(name => name.trim());

        const expense = { description, amount, participants };
        expenses.push(expense);

        renderExpenses();
        calculateSummary();
        expenseForm.reset();
    });

    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const expenseItem = document.createElement('div');
            expenseItem.className = 'expense-item';
            expenseItem.innerHTML = `
                <div class="add-items">
                    <strong>${expense.description}</strong><br>
                    Amount: Rs.${expense.amount.toFixed(2)}<br>
                    Participants: ${expense.participants.join(', ')}
                </div>
                <button data-index="${index}" class="delete-btn">Delete</button>
            `;
            expenseList.appendChild(expenseItem);
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                expenses.splice(index, 1);
                renderExpenses();
                calculateSummary();
            });
        });
    }

    function calculateSummary() {
        const totals = {};
        expenses.forEach(expense => {
            const splitAmount = expense.amount / expense.participants.length;
            expense.participants.forEach(participant => {
                if (!totals[participant]) {
                    totals[participant] = 0;
                }
                totals[participant] += splitAmount;
            });
        });

        summary.innerHTML = '<h2>Summary</h2>';
        Object.keys(totals).forEach(participant => {
            summary.innerHTML += `<p>${participant}: Rs.${totals[participant].toFixed(2)}</p>`;
        });
    }
});
