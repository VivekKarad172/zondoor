
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  author: string;
  category: string;
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Advantage of PVC Embossed Doors Over Traditional Wooden Doors",
    excerpt: "Discover why PVC embossed doors are becoming the preferred choice for modern homes and businesses compared to traditional wooden doors.",
    content: `
      <p>In recent years, PVC embossed doors have gained significant popularity in both residential and commercial settings. Let's explore why these modern alternatives are often preferred over traditional wooden doors.</p>
      
      <h3>Durability and Longevity</h3>
      <p>Unlike wooden doors that can warp, rot, or get damaged by termites, PVC doors are highly resistant to environmental factors. They don't crack, peel, or fade easily, ensuring a longer lifespan with minimal maintenance.</p>
      
      <h3>Cost-Effective</h3>
      <p>While the initial investment might be comparable, PVC doors prove more economical in the long run due to their durability and low maintenance requirements.</p>
      
      <h3>Versatile Design Options</h3>
      <p>Z-ON DOOR offers a wide range of designs, colors, and textures, allowing customers to choose doors that match their interior décor perfectly.</p>
      
      <h3>Eco-Friendly Option</h3>
      <p>By choosing PVC doors, you're indirectly contributing to forest conservation as they reduce the demand for wood, making them an environmentally responsible choice.</p>
      
      <h3>Weather Resistance</h3>
      <p>PVC doors are excellent at withstanding harsh weather conditions. They don't absorb moisture, making them ideal for bathrooms, kitchens, and other areas exposed to humidity.</p>
      
      <p>Ready to upgrade your space with premium PVC embossed doors? Contact Z-ON DOOR today for a consultation.</p>
    `,
    date: "2023-11-15",
    image: "/lovable-uploads/d6ecdb63-a48c-4023-9661-21a657af870e.png",
    author: "Z-ON DOOR Team",
    category: "product",
    readTime: 5
  },
  {
    id: 2,
    title: "How to Choose the Perfect Door Design for Your Home",
    excerpt: "A comprehensive guide to selecting the right door design that complements your home's architecture and interior décor.",
    content: `
      <p>Selecting the right door design is crucial as it contributes significantly to your home's aesthetic appeal and functionality. Here's a guide to help you make the perfect choice:</p>
      
      <h3>Consider Your Home's Architecture</h3>
      <p>The door should complement your home's architectural style. For instance, modern homes pair well with sleek, minimalist door designs, while traditional homes might benefit from classic patterns.</p>
      
      <h3>Think About Functionality</h3>
      <p>Consider where the door will be installed. Bathroom doors might require different features compared to bedroom or main entrance doors.</p>
      
      <h3>Color Coordination</h3>
      <p>The door's color should harmonize with your interior and exterior color schemes. Neutral tones offer versatility, while bold colors can make a statement.</p>
      
      <h3>Material Matters</h3>
      <p>PVC embossed doors offer durability, easy maintenance, and a wide range of design options, making them suitable for various settings.</p>
      
      <h3>Budget Considerations</h3>
      <p>Set a realistic budget. While quality should be a priority, there are excellent options available at various price points.</p>
      
      <p>At Z-ON DOOR, we offer personalized consultations to help you find the perfect door design for your specific needs. Contact us today!</p>
    `,
    date: "2023-12-05",
    image: "/lovable-uploads/ac445c52-9c9c-4a4b-bb03-dba4483c9fd1.png",
    author: "Interior Design Expert",
    category: "design",
    readTime: 7
  },
  {
    id: 3,
    title: "Maintenance Tips for PVC Embossed Doors",
    excerpt: "Learn how to properly maintain your PVC embossed doors to ensure they remain beautiful and functional for years to come.",
    content: `
      <p>PVC embossed doors are known for their low maintenance requirements, but a little care can go a long way in preserving their beauty and extending their lifespan.</p>
      
      <h3>Regular Cleaning</h3>
      <p>Wipe the doors with a soft, damp cloth at least once a week to remove dust and prevent buildup. For more thorough cleaning, use mild soap and water solution.</p>
      
      <h3>Avoid Harsh Chemicals</h3>
      <p>Steer clear of abrasive cleaners, solvents, or bleach as they can damage the door's surface and affect its appearance.</p>
      
      <h3>Handle With Care</h3>
      <p>Avoid slamming the doors or hanging heavy items on them, as this can stress the hinges and potentially damage the door structure.</p>
      
      <h3>Address Issues Promptly</h3>
      <p>If you notice any loose hinges, squeaking, or other issues, address them promptly to prevent further damage.</p>
      
      <h3>Periodic Inspection</h3>
      <p>Regularly check for any signs of wear or damage, especially around the edges and hinges.</p>
      
      <p>With these simple maintenance tips, your Z-ON DOOR PVC embossed doors will continue to enhance your space for many years.</p>
    `,
    date: "2024-01-10",
    image: "/lovable-uploads/b3e205a9-276d-4260-ad24-c55cd2df0659.png",
    author: "Maintenance Specialist",
    category: "maintenance",
    readTime: 4
  }
];
