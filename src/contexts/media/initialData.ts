
import { MediaItem, MediaFolder } from "@/components/media/types";

// Initial dummy data
export const initialMediaItems: MediaItem[] = [
  {
    id: "1",
    url: "/lovable-uploads/c9565cf2-322b-42b1-99bd-bbad8bfa8263.png",
    name: "Door Design Classic",
    type: "image",
    size: 245000,
    createdAt: new Date().toISOString(),
    tags: ["door", "design", "product"],
    description: "Classic door design showcase"
  },
  {
    id: "2",
    url: "/lovable-uploads/75b2a0cb-8b53-4f2e-a82d-b10dded0e479.png",
    name: "Embossed Door",
    type: "image",
    size: 325000,
    createdAt: new Date().toISOString(),
    tags: ["door", "embossed", "product"],
    description: "3D embossed door design"
  },
  {
    id: "3",
    url: "/lovable-uploads/8416ee93-b407-4d4d-a95a-e088714269cf.png",
    name: "Z-ON Brand",
    type: "image",
    size: 185000,
    createdAt: new Date().toISOString(),
    tags: ["brand", "logo"],
    description: "Z-ON DOOR branding image"
  }
];

export const initialFolders: MediaFolder[] = [
  {
    id: "products",
    name: "Products",
    items: [],
  },
  {
    id: "blog",
    name: "Blog Images",
    items: [],
  }
];
