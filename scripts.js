const Modal = {
  open() {
    // Abrir Modal
    // Adicionar a class active ao modal
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    // Fechar o modal
    // Remover a class active do modal
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

/* 
    Acima montamos um OBJETO
    e dentro deste OBJETO possuímos duas funcionalidades/propriedades.

    Quando uma FUNÇÃO está dentro de um OBJETO, ela recebe o nome de MÉTODO.


    DOM = Document Object Model (Modelagem do HTML para o JavaScript)

    DOM é o modelo de toda a estrutura HTML passada para o JavaScript
    DOM (document) também é um OBJETO e como todo OBJETO, ele possui propriedades e funcionalidades


    o . vai encadeando uma coisa a outra, ligando os elementos.
*/

const transactions = [
  {
    id: 1,
    description: "Luz",
    amount: -50000,
    date: "23/01/2021",
  },
  {
    id: 2,
    description: "Website",
    amount: 500000,
    date: "23/01/2021",
  },
  {
    id: 3,
    description: "Internet",
    amount: -20000,
    date: "23/01/2021",
  },
];

const Transaction = {
  all: transactions,
  incomes() {
    let income = 0;
    // pegar todas as transações
    // para cada transação,
    Transaction.all.forEach((transaction) => {
      // se ela for maior que zero
      if (transaction.amount > 0) {
        // somar a uma variavel e retornar a variavel
        income += transaction.amount;
      }
    });
    return income;
  },
  expenses() {
    let expense = 0;
    // pegar todas as transações
    // para cada transação,
    Transaction.all.forEach((transaction) => {
      // se ela for menor que zero
      if (transaction.amount < 0) {
        // somar a uma variavel e retornar a variavel
        expense += transaction.amount;
      }
    });
    return expense;
  },
  total() {
    return Transaction.incomes() + Transaction.expenses();
  },
};

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover Transação">
            </td>
        `;

    return html;
  },

  updateBalance() {
    document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );
    document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );
    document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },
};

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100;

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return signal + value;
  },
};

transactions.forEach(function (transaction) {
  DOM.addTransaction(transaction);
});

DOM.updateBalance();

/* Uma função para jogar fora seus elementos internos, necessita do return */
