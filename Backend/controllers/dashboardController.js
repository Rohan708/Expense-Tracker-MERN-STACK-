const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");
// Dashboard data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObject = new Types.ObjectId(userId);

        // Fetch total income and expenses
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObject } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObject } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        // Get income Transactions in the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        //Get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Get expense transaction in the last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        //Get total expense for last 30 days
        const expenseLast30Days = last30DaysExpenseTransactions.reduce( // Corrected variable name
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // --- CORRECTED "Recent Transactions" LOGIC ---
        // Fetch last 5 income and 5 expense transactions
        const lastIncomes = await Income.find({ userId }).sort({ date: -1 }).limit(5);
        const lastExpenses = await Expense.find({ userId }).sort({ date: -1 }).limit(5);

        // Combine, add type, sort, and slice to get the most recent 5 overall
        const lastTransactions = [...lastIncomes.map(txn => ({ ...txn.toObject(), type: "income" })), // Correctly labeled as "income"
                ...lastExpenses.map(txn => ({ ...txn.toObject(), type: "expense" })) // Added expenses
            ]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by creation date
            .slice(0, 5); // Get the most recent 5 transactions

        //Final response
        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpense: {
                total: expenseLast30Days, // Corrected typo
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};