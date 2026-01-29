const mongoose =  require ("mongoose");

const ExpenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    icon: { type: String},
    category: { type: String,  requireed: true},// Example: Food, Rent Groceries
    amount: { type: Number,required: true},
    date: { type: Date,default: Date.now},
}, { timesStamps: true });

module.exports = mongoose.model("Expense", ExpenseSchema);