import React from "react";

const CategoryIcons = () => {
  const categories = [
    { id: 1, name: "전체", icon: "🔍" },
    { id: 2, name: "추천", icon: "🌟" },
    { id: 3, name: "노션", icon: "📝" },
    { id: 4, name: "PPT", icon: "📊" },
    { id: 5, name: "PDF", icon: "📄" },
  ];

  return (
    <div className="grid grid-cols-5 gap-4 px-6 py-10">
      {categories.map((cat) => (
        <div key={cat.id} className="flex flex-col items-center gap-3 cursor-pointer group">
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 border border-gray-200">
            {cat.icon}
          </div>
          <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">{cat.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryIcons;
