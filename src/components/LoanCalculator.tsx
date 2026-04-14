"use client";

import { useState, useMemo } from "react";

const MIN_AMOUNT = 1000;
const MAX_AMOUNT = 150000;
const MIN_TENURE = 12;
const MAX_TENURE = 40;
const ANNUAL_RATE = 0.18;

export default function LoanCalculator() {
  const [amount, setAmount] = useState(10000);
  const [tenure, setTenure] = useState(18);

  const { monthlyPayment, totalPayment } = useMemo(() => {
    const monthlyRate = ANNUAL_RATE / 12;
    const monthly =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    return {
      monthlyPayment: Math.round(monthly),
      totalPayment: Math.round(monthly * tenure),
    };
  }, [amount, tenure]);

  return (
    <section
      id="kalkulator-pinjaman"
      className="bg-gray-50 py-10 sm:py-12 lg:py-16"
      aria-label="Kalkulator pinjaman"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
          Loan Calculator
        </p>
        <h2 className="mt-2 text-center text-xl font-bold text-primary-deeper sm:text-2xl md:text-3xl">
          Calculate with our calculator
        </h2>

        <div className="mt-6 flex flex-col items-center gap-6 sm:mt-8 sm:gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-16">
          {/* Calculator card */}
          <div className="w-full rounded-xl bg-white p-5 shadow-lg sm:p-6 lg:max-w-md">
            <h3 className="text-lg font-bold text-primary-deeper sm:text-xl">
              Personal Loan Calculator
            </h3>

            {/* Loan Amount */}
            <div className="mt-6">
              <label className="text-sm font-bold text-gray-800">
                Loan Amount:
              </label>
              <div className="mt-2">
                <span className="text-xs text-gray-500">RM</span>
                <p className="text-xl font-bold text-primary-deeper">
                  {amount.toLocaleString()}
                </p>
              </div>
              <input
                type="range"
                min={MIN_AMOUNT}
                max={MAX_AMOUNT}
                step={1000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mt-3 w-full"
                aria-label="Jumlah pinjaman"
                style={{
                  background: `linear-gradient(to right, #0a2e5c ${((amount - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100}%, #e5e7eb ${((amount - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100}%)`,
                }}
              />
              <div className="mt-1 flex justify-between text-xs text-gray-400">
                <span>RM1,000</span>
                <span>RM150,000</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="mt-6">
              <label className="text-sm font-bold text-gray-800">
                Tenure (in months):
              </label>
              <p className="mt-2 text-xl font-bold text-primary-deeper">
                {tenure}
              </p>
              <input
                type="range"
                min={MIN_TENURE}
                max={MAX_TENURE}
                step={1}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="mt-3 w-full"
                aria-label="Tempoh pinjaman dalam bulan"
                style={{
                  background: `linear-gradient(to right, #0a2e5c ${((tenure - MIN_TENURE) / (MAX_TENURE - MIN_TENURE)) * 100}%, #e5e7eb ${((tenure - MIN_TENURE) / (MAX_TENURE - MIN_TENURE)) * 100}%)`,
                }}
              />
              <div className="mt-1 flex justify-between text-xs text-gray-400">
                <span>12 month</span>
                <span>40 month</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col items-center gap-4 sm:gap-5 lg:items-start lg:pt-8">
            <div className="text-center lg:text-left">
              <p className="text-sm font-bold text-gray-800">
                Your Monthly Payment:
              </p>
              <p className="mt-1 flex items-baseline justify-center gap-2 lg:justify-start">
                <span className="text-sm text-gray-500">RM</span>
                <span className="text-3xl font-bold text-primary-deeper sm:text-4xl">
                  {monthlyPayment.toLocaleString()}
                </span>
              </p>
            </div>

            <div className="text-center lg:text-left">
              <p className="text-sm font-bold text-gray-800">
                Total amount you pay in{" "}
                <span className="text-primary">{tenure}</span> months
              </p>
              <p className="mt-1 flex items-baseline justify-center gap-2 lg:justify-start">
                <span className="text-sm text-gray-500">RM</span>
                <span className="text-3xl font-bold text-primary-deeper sm:text-4xl">
                  {totalPayment.toLocaleString()}
                </span>
              </p>
            </div>

            <a
              href="#mohon-sekarang"
              className="mt-4 inline-block rounded-full border-2 border-primary px-10 py-3 text-center text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
