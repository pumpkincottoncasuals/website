'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/store-context';
import { X, Ruler } from 'lucide-react';

const SIZE_TABLE = [
  { age: '0-3 Months', heightCm: '55-61', chestIn: '16.5', waistIn: '17', weightKg: '3.5 - 5.5' },
  { age: '3-6 Months', heightCm: '61-67', chestIn: '17.5', waistIn: '18', weightKg: '5.5 - 7.5' },
  { age: '6-12 Months', heightCm: '67-76', chestIn: '18.5', waistIn: '19', weightKg: '7.5 - 9.5' },
  { age: '1-2 Years', heightCm: '76-86', chestIn: '20', waistIn: '20', weightKg: '10 - 12' },
  { age: '2-3 Years', heightCm: '86-94', chestIn: '21', waistIn: '20.5', weightKg: '12 - 14' },
  { age: '3-4 Years', heightCm: '94-102', chestIn: '22', waistIn: '21', weightKg: '14 - 16' },
  { age: '4-5 Years', heightCm: '102-109', chestIn: '23', waistIn: '21.5', weightKg: '16 - 19' },
  { age: '5-6 Years', heightCm: '109-116', chestIn: '24', waistIn: '22', weightKg: '19 - 22' },
  { age: '7-8 Years', heightCm: '122-128', chestIn: '26', waistIn: '23.5', weightKg: '23 - 27' },
  { age: '9-10 Years', heightCm: '134-140', chestIn: '28', waistIn: '25', weightKg: '28 - 34' },
  { age: '11-12 Years', heightCm: '146-152', chestIn: '30', waistIn: '26.5', weightKg: '35 - 42' },
  { age: '13-14 Years', heightCm: '158-164', chestIn: '32', waistIn: '28', weightKg: '43 - 50' },
];

export function SizeGuideModal() {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-md bg-white p-6 shadow-xl border border-[#DADADA] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#F5F5F5] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Ruler className="h-5 w-5 text-[#6FC341]" />
            <h3 className="text-base font-semibold text-[#212121]">Pumkin Cotton Casuals — Size Guide</h3>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="rounded-full p-1 text-[#757575] hover:bg-[#F8F8F8] hover:text-[#212121]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-[#575757]">
            All measurements correspond to child body measurements. Pumkin garments are cut with relaxed ease for play comfort.
          </p>
          <div className="flex rounded-xs border border-[#E0E0E0] p-0.5 text-xs">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 rounded-xs font-medium ${
                unit === 'inches' ? 'bg-[#363636] text-white' : 'text-[#575757]'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-xs font-medium ${
                unit === 'cm' ? 'bg-[#363636] text-white' : 'text-[#575757]'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border border-[#E0E0E0] rounded-xs mb-4">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F8F8] text-[#363636] font-semibold border-b border-[#E0E0E0]">
              <tr>
                <th className="p-2.5">Standard Size</th>
                <th className="p-2.5">Child Height</th>
                <th className="p-2.5">Chest</th>
                <th className="p-2.5">Waist</th>
                <th className="p-2.5">Avg Weight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F5] text-[#575757]">
              {SIZE_TABLE.map((row) => (
                <tr key={row.age} className="hover:bg-[#FDFDFD]">
                  <td className="p-2.5 font-medium text-[#212121]">{row.age}</td>
                  <td className="p-2.5">{row.heightCm} cm</td>
                  <td className="p-2.5">
                    {unit === 'inches'
                      ? `${row.chestIn}"`
                      : `${Math.round(parseFloat(row.chestIn) * 2.54)} cm`}
                  </td>
                  <td className="p-2.5">
                    {unit === 'inches'
                      ? `${row.waistIn}"`
                      : `${Math.round(parseFloat(row.waistIn) * 2.54)} cm`}
                  </td>
                  <td className="p-2.5 text-[#208833] font-medium">{row.weightKg} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xs bg-[#F8F8F8] p-3 text-xs text-[#575757]">
          <span className="font-semibold text-[#363636] block mb-1">💡 Quick Sizing Tip for Parents:</span>
          If your child is in between sizes or on the taller side, we recommend sizing up. Pure combed cotton garments allow healthy airflow and easy growth adjustments.
        </div>
      </div>
    </div>
  );
}

