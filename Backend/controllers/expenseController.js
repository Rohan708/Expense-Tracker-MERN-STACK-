const User = require("../models/Users");
const xlsx = require('xlsx');
const Expense = require("../models/Expense");

//Add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category, // Corrected from 'source'
            amount,
            date: new Date(date)
        });

        await newExpense.save(); // Corrected from 'newIncome'
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//get Expense
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

//Delete Expense Source
exports.deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const userId = req.user.id;

        // Security Fix: Ensures user can only delete their own expenses
        const expense = await Expense.findOneAndDelete({ _id: expenseId, userId: userId });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found or user not authorized" });
        }

        res.status(200).json({ message: "Expense deleted successfully" }); // Corrected spelling
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

//Download Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 }); // Corrected variable name

        const data = expenses.map((item) => ({
            Category: item.category, // Corrected property name
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0],
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expenses");

        // Create file in memory and send directly
        const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });
        res.setHeader("Content-Disposition", "attachment; filename=expense_details.xlsx");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.status(200).send(buffer);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};