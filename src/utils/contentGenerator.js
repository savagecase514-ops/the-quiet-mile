/**
 * contentGenerator.js
 * Implements the logic for product information extraction and content generation
 * based on The Quiet Mile Brand Guidelines.
 */

const HOOK_TEMPLATES = [
  "The [product] that [unexpected benefit]",
  "Stop buying [category] until you see this.",
  "I've been using this [product] for [time] and...",
  "This [product] changed how I [activity].",
  "The only [product] you'll ever need.",
  "Why is nobody talking about this [product]?",
  "This [product] costs less than [comparison].",
  "I found the perfect [product] for [use case].",
  "Don't buy [category]. Get this instead.",
  "Three things I love about this [product].",
  "This [product] has no right to be this good.",
  "The [product] that finally got me to [behavior].",
  "This [product] is the definition of [quality].",
  "I replaced my [old product] with this.",
  "The most [adjective] [product] I've ever used."
];

export const extractProductInfo = async (url) => {
  // Mock extraction logic
  // In a real scenario, this would call a backend or use a scraping service
  console.log(`Extracting info from: ${url}`);
  
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Extract domain/name from URL for mock data
  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.split('/');
  const possibleName = pathParts.find(p => p.length > 10) || "Minimalist Gadget";
  const name = possibleName.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return {
    id: Math.random().toString(36).substr(2, 9),
    title: name,
    category: "Workspace",
    description: "A thoughtfully designed tool that balances form and function, perfect for the modern minimalist.",
    benefits: "Durable aluminum construction; ergonomic design; sustainable materials.",
    price: "$45.00",
    image_url: "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?q=80&w=1000&auto=format&fit=crop",
    affiliate_url: url
  };
};

export const generateContent = (product) => {
  const hooks = HOOK_TEMPLATES.map(template => {
    return template
      .replace("[product]", product.title)
      .replace("[category]", product.category)
      .replace("[unexpected benefit]", "actually improves your focus")
      .replace("[time]", "6 months")
      .replace("[activity]", "start my mornings")
      .replace("[comparison]", "a single takeout lunch")
      .replace("[use case]", "daily carry")
      .replace("[behavior]", "drink more water")
      .replace("[quality]", "quiet luxury")
      .replace("[old product]", "clunky old setup")
      .replace("[adjective]", "thoughtfully designed");
  });

  const tiktokCaptions = Array(20).fill(0).map((_, i) => {
    return `Does your ${product.category} setup feel cluttered? \n\nThis ${product.title} was designed to disappear. Matte materials. Precise utility. \n\nIt doesn't shout. It just works. That's the quiet mile.\n\nLink in bio. #TheQuietMile #Minimalist #DeskSetup #${product.category}`;
  });

  const igCaptions = Array(10).fill(0).map((_, i) => {
    return `The definition of intentional design. \n\nWe spent weeks vetting the perfect ${product.title}. The result? A ${product.category} essential that feels as good as it looks.\n\nExplore the collection at the link in our bio. \n\n#QuietLuxury #HomeOffice #DesignInspiration`;
  });

  const pinterestDescriptions = Array(10).fill(0).map((_, i) => {
    return `Minimalist ${product.category} inspiration featuring the ${product.title}. High-quality materials and cinematic aesthetics for a productive workspace. Click to see the full review on The Quiet Mile.`;
  });

  const youtubeShortsTitles = Array(10).fill(0).map((_, i) => {
    return `The ONLY ${product.title} you need for your ${product.category}`;
  });

  const videoConcepts = [
    {
      name: "The Slow Reveal",
      structure: "Hook: The ${product.title} that changed everything. \nVisual: Close-up on texture. \nPayoff: It's made from sustainable wood. \nCTA: Link in bio."
    },
    {
      name: "Problem/Solution",
      structure: "Hook: Stop settling for junk ${product.category} tools. \nVisual: Messy desk vs clean setup. \nPayoff: Precision engineering. \nCTA: TQM bio link."
    }
  ];

  return {
    hooks,
    tiktokCaptions,
    igCaptions,
    pinterestDescriptions,
    youtubeShortsTitles,
    videoConcepts
  };
};
