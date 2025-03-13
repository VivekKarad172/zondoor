
import { ReactNode } from 'react';

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
  image: string;
}

export interface Material {
  id: string;
  title: string;
  description: string;
  image: string;
}

// These objects will be populated with JSX elements when imported
// The icon fields will be populated in the Process.tsx component
export const processSteps: Omit<ProcessStep, 'icon'>[] = [
  {
    number: "01",
    title: "Material Selection",
    description: "We use 5mm sheets with a smooth surface for the best film application. Any low-quality materials are rejected to ensure customers receive only the highest quality doors.",
    image: "/lovable-uploads/2c463714-b7b4-4e2f-b451-9d128a134df8.png"
  },
  {
    number: "02",
    title: "Film Application",
    description: "The PVC decorative film is carefully applied as per customer demand, ensuring strong bonding and accuracy.",
    image: "/lovable-uploads/5da71123-a8fa-4434-b635-e7459ed52958.png"
  },
  {
    number: "03",
    title: "Embossing Process",
    description: "The door design is embossed using the latest technology machines, ensuring perfect details.",
    image: "/lovable-uploads/04d37422-1c78-46f5-b01d-c357288a66dd.png"
  },
  {
    number: "04",
    title: "Framing",
    description: "The door frame includes PVC, M.S. pipe, and a rigid PVC sheet, cut to customer-specified sizes for a strong and durable structure.",
    image: "/lovable-uploads/b16e8deb-56f8-4d41-ae28-556a876aff31.png"
  },
  {
    number: "05",
    title: "Trimming",
    description: "After pressing, the doors undergo precise trimming and final touch-ups for a perfect finish.",
    image: "/lovable-uploads/049084c0-6b88-404a-b927-a76917427ca1.png"
  },
  {
    number: "06",
    title: "Quality Inspection & Packaging",
    description: "Every door is thoroughly checked before packaging, ensuring top-tier quality and protection during delivery.",
    image: "/lovable-uploads/17784498-bca2-4a4d-9dad-afda6fbd7308.png"
  }
];

export const processMaterials: Material[] = [
  {
    id: "pvc",
    title: "PVC Foam Board",
    description: "5mm thickness for door panels, 18mm width and 20mm thickness for framing",
    image: "/lovable-uploads/c9565cf2-322b-42b1-99bd-bbad8bfa8263.png"
  },
  {
    id: "film",
    title: "Decorative Film",
    description: "Premium 0.15mm PVC film available in 10 distinctive colors and finishes",
    image: "/lovable-uploads/75b2a0cb-8b53-4f2e-a82d-b10dded0e479.png"
  },
  {
    id: "structure",
    title: "Internal Structure",
    description: "20x20mm MS pipe framework with PVC rigid sheet fillers for strength and stability",
    image: "/lovable-uploads/8416ee93-b407-4d4d-a95a-e088714269cf.png"
  }
];
