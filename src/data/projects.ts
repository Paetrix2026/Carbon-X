export interface Project {
  id: number;
  name: string;
  location: string;
  type: string;
  available: string;
  pricePerCredit: number;
  description: string;
  farmer: string;
  image: string;
  coords: [number, number];
  verified: string;
}

export const mockProjects: Project[] = [
  {
    id: 1,
    name: "Rajasthan Solar Park Initiative",
    location: "RAJASTHAN, INDIA",
    type: "Solar",
    available: "1.2M CC",
    pricePerCredit: 18.50,
    description: "Large-scale solar infrastructure reducing grid dependency on coal-fired power plants.",
    farmer: "Bhadla Solar Power Ltd",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800",
    coords: [27.37, 72.22],
    verified: "Gold Standard"
  },
  {
    id: 2,
    name: "Maharashtra Soil Health Project",
    location: "MAHARASHTRA, INDIA",
    type: "Soil",
    available: "850K CC",
    pricePerCredit: 22.10,
    description: "Regenerative agriculture practices enhancing soil organic carbon across 5,000 hectares.",
    farmer: "Vidarbha Farmers Collective",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
    coords: [19.75, 75.71],
    verified: "Verra"
  },
  {
    id: 3,
    name: "Western Ghats Agroforestry",
    location: "KARNATAKA, INDIA",
    type: "Forestry",
    available: "420K CC",
    pricePerCredit: 28.40,
    description: "Multi-strata agroforestry systems restoring biodiversity in the Western Ghats buffer zones.",
    farmer: "Coorg Estate Owners Association",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800",
    coords: [12.97, 75.73],
    verified: "Gold Standard"
  },
  {
    id: 4,
    name: "Sundarbans Mangrove Conservation",
    location: "WEST BENGAL, INDIA",
    type: "Blue Carbon",
    available: "1.5M CC",
    pricePerCredit: 32.40,
    description: "Protection and restoration of mangrove ecosystems providing critical coastal defense.",
    farmer: "Sundarbans Eco-Restoration Trust",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800",
    coords: [21.94, 88.85],
    verified: "Verra"
  },
  {
    id: 5,
    name: "Assam Reforestation Initiative",
    location: "ASSAM, INDIA",
    type: "Forestry",
    available: "600K CC",
    pricePerCredit: 15.80,
    description: "Community-led reforestation of degraded forest lands in the Brahmaputra valley.",
    farmer: "Assam Community Forest Council",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800",
    coords: [26.14, 91.73],
    verified: "Gold Standard"
  }
];
