import React from 'react';
import { news } from '../data/mockData';

const NewsPage = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">Latest News</h1>

            <div className="space-y-6">
                {news.map(item => (
                    <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-all cursor-pointer">
                        <div className="w-full md:w-48 h-32 bg-slate-200 rounded-lg flex-shrink-0" />
                        <div>
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 block">{item.category}</span>
                            <h2 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{item.title}</h2>
                            <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <span className="text-xs text-slate-400 font-medium">{item.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
