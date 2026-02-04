
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Jan', val: 400 },
  { name: 'Feb', val: 700 },
  { name: 'Mar', val: 1200 },
  { name: 'Apr', val: 900 },
];

const DashboardPreview: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      className="absolute -top-40 left-0 w-64 h-40 bg-slate-900/90 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl p-4 z-50 pointer-events-none"
    >
      <h4 className="text-white text-xs font-bold mb-2 uppercase tracking-widest">Revenue Forecast</h4>
      <div className="w-full h-24">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <Bar dataKey="val" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <XAxis dataKey="name" hide />
            <YAxis hide />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between mt-2">
        <div className="text-[10px] text-slate-400">Target: $2.4M</div>
        <div className="text-[10px] text-green-400 font-bold">+18.5%</div>
      </div>
    </motion.div>
  );
};

export default DashboardPreview;
