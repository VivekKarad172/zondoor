
export interface DoorImage {
  src: string;
  alt: string;
}

export interface HeroProps {
  doorImages?: DoorImage[];
  specifications?: string[];
}
