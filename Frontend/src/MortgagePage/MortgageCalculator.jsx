import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { handleError } from '../utils';

const MortgageCalculator = () => {
    const [searchParams] = useSearchParams();
    const propertyPrice = searchParams.get('price');
    const [principal, setPrincipal] = useState(propertyPrice || '');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);

    const calculatePayment = () => {
        const P = parseFloat(principal);
        const r = parseFloat(interestRate) / 100 / 12;
        const n = parseInt(loanTerm) * 12;

        if (P && r && n) {
            const M = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            setMonthlyPayment(M.toFixed(2));
        } else {
            handleError('Please enter valid inputs');
        }
    };

    const clearInputs = () => {
        setInterestRate('');
        setLoanTerm('');
        setMonthlyPayment(null);
    };

    return (
        <div className='w-[80%] h-[70vh] flex mx-auto mt-[4rem] rounded-2xl shadow-2xl overflow-hidden items-center'>
            <div className=''>
                <img src="/mortgage.png" alt="laddoo" />
            </div>

            <div className="h-[70vh] w-[50%] pt-[60px] bg-white mx-auto">
                <h2 className="text-[#4A73A1] text-2xl font-bold mb-4">Mortgage Calculator</h2>
                <div className="mb-4">
                    <label className="block mb-1">Loan Amount (Principal)</label>
                    <input
                        type="number"
                        className="w-[450px] bg-[#4a73a12d] border-2 border-[#4A73A1] outline-none px-3 py-2 rounded"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Annual Interest Rate (%)</label>
                    <input
                        type="number"
                        className="w-[450px] bg-[#4a73a12d] border-2 border-[#4A73A1] outline-none px-3 py-2 rounded"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Loan Term (Years)</label>
                    <input
                        type="number"
                        className="w-[450px] bg-[#4a73a12d] border-2 border-[#4A73A1] outline-none px-3 py-2 rounded"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={calculatePayment}
                        className="px-4 py-2 bg-[#4A73A1] active:bg-indigo-700 text-white rounded"
                    >
                        Calculate
                    </button>
                    <button
                        onClick={clearInputs}
                        className="px-4 py-2 bg-gray-500 active:bg-gray-700 text-white rounded"
                    >
                        Clear
                    </button>
                </div>
                {monthlyPayment && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Monthly Payment</h3>
                        <p className="text-xl font-bold">${monthlyPayment}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MortgageCalculator;
