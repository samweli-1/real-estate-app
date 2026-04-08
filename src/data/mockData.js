export const properties = [
    {
      id: 1,
      title: "Modern Apartment",
      type: "rent",
      price: 850,
      location: "Kigali, Kimihurura",
      status: "available",
      rooms: 3,
      images: [],
      agentId: 1,
      amenities: ["WiFi", "Parking", "Security"],
      description: "A modern apartment in the heart of Kigali.",
    },
    {
      id: 2,
      title: "Family Villa",
      type: "sale",
      price: 120000,
      location: "Kigali, Nyarutarama",
      status: "sold",
      rooms: 5,
      images: [],
      agentId: 2,
      amenities: ["Garden", "Pool", "Garage"],
      description: "Spacious family villa with beautiful garden.",
    },
    {
      id: 3,
      title: "Studio Flat",
      type: "rent",
      price: 400,
      location: "Kigali, Remera",
      status: "available",
      rooms: 1,
      images: [],
      agentId: 1,
      amenities: ["WiFi", "Security"],
      description: "Compact studio perfect for professionals.",
    },
  ]
  
  export const agents = [
    { id: 1, name: "Alice Uwera", email: "alice@realty.rw", phone: "0788001122", properties: [1, 3] },
    { id: 2, name: "Bob Mugisha", email: "bob@realty.rw", phone: "0788334455", properties: [2] },
  ]
  
  export const inquiries = [
    { id: 1, name: "Jean Paul", email: "jp@gmail.com", propertyId: 1, message: "Is this still available?", status: "pending" },
    { id: 2, name: "Marie Claire", email: "mc@gmail.com", propertyId: 2, message: "What is the final price?", status: "resolved" },
  ]