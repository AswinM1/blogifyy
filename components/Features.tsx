import React from 'react';

function Features() {
  const features = [
    {
      title: "Rich Content Editor",
      description: "Write and format articles with images, code snippets, and markdown support.",
    },
    {
      title: "User Engagement",
      description: "Readers can like, comment, and share your blog posts easily.",
    },
    {
      title: "Search and Filter",
      description: "Find articles quickly using tags, categories, and full-text search.",
    },
    {
      title: "Responsive Design",
      description: "Optimized for all devices: desktops, tablets, and smartphones.",
    },
    {
      title: "Author Profiles",
      description: "Showcase author bios, social links, and their published posts.",
    },
    {
      title: "Dashboard",
      description: "View your published blogs..",
    },
  ];

  return (
    <div className="  px-6 md:px-20 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 tracking-tight squared">Blog Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 px-7  ">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 border   shadow-black  w-80 h-80 shadow-[6px_6px_0px_#000] rounded-xl  bg-amber-300 hover:scale-90 transition duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
