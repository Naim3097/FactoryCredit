"use client";

import { useState, useMemo } from "react";
import RevealOnScroll from "./RevealOnScroll";

const MIN_AMOUNT = 1000;
const MAX_AMOUNT = 50000;
const MIN_TENURE = 12;
const MAX_TENURE = 60;
const ANNUAL_RATE = 0.18;

export default function LoanCalculator() {
  const [amount, setAmount] = useState(10000);
  const [tenure, setTenure] = useState(18);

  const { monthlyPayment, totalPayment } = useMemo(() => {
    const tenureYears = tenure / 12;
    const totalInterest = amount * ANNUAL_RATE * tenureYears;
    const total = amount + totalInterest;
    const monthly = total / tenure;
    return {
      monthlyPayment: Math.round(monthly * 100) / 100,
      totalPayment: Math.round(total * 100) / 100,
    };
  }, [amount, tenure]);

  return (
    <section
      id="kalkulator-pinjaman"
      className="bg-gray-50 py-10 sm:py-12 lg:py-16"
      aria-label="Kalkulator pinjaman"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <RevealOnScroll>
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
          Kalkulator Pinjaman
        </p>
        <h2 className="mt-2 text-center text-xl font-bold text-primary-deeper sm:text-2xl md:text-3xl">
          Kira dengan kalkulator kami
        </h2>
        </RevealOnScroll>

        <div className="mt-6 flex flex-col items-center gap-6 sm:mt-8 sm:gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-16">
          {/* Calculator card */}
          <RevealOnScroll delay={100}>
          <div className="w-full rounded-xl bg-white p-5 shadow-lg sm:p-6 lg:max-w-md">
            <h3 className="text-lg font-bold text-primary-deeper sm:text-xl">
              Kalkulator Pinjaman Peribadi
            </h3>

            {/* Loan Amount */}
            <div className="mt-6">
              <label className="text-sm font-bold text-gray-800">
                Jumlah Pinjaman:
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
                <span>RM50,000</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="mt-6">
              <label className="text-sm font-bold text-gray-800">
                Tempoh (dalam bulan):
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
                <span>12 bulan</span>
                <span>60 bulan</span>
              </div>
            </div>
          </div>
          </RevealOnScroll>

          {/* Results */}
          <RevealOnScroll delay={250}>
          <div className="flex flex-col items-center gap-4 sm:gap-5 lg:items-start lg:pt-8">
            <div className="text-center lg:text-left">
              <p className="text-sm font-bold text-gray-800">
                Bayaran Bulanan Anda:
              </p>
              <p className="mt-1 flex items-baseline justify-center gap-2 lg:justify-start">
                <span className="text-sm text-gray-500">RM</span>
                <span className="text-3xl font-bold text-primary-deeper sm:text-4xl">
                  {monthlyPayment.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </p>
            </div>

            <div className="text-center lg:text-left">
              <p className="text-sm font-bold text-gray-800">
                Jumlah keseluruhan yang anda bayar dalam{" "}
                <span className="text-primary">{tenure}</span> bulan
              </p>
              <p className="mt-1 flex items-baseline justify-center gap-2 lg:justify-start">
                <span className="text-sm text-gray-500">RM</span>
                <span className="text-3xl font-bold text-primary-deeper sm:text-4xl">
                  {totalPayment.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </p>
            </div>

            <a
              href="#mohon-sekarang"
              className="mt-4 inline-block rounded-full border-2 border-primary px-10 py-3 text-center text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Mohon Sekarang
            </a>
          </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
