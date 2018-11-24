export const twoJson = [
  {
    id: 1,
    label: "Maverick Chronograph",
    "short-description": "Blue, 43 mm",
    price: "100 chf",
    sale: false,
    "product-photo": "/images/watch.jpg"
  },
  {
    id: 2,
    label: "Swiss unlimited energy eau de cologne",
    "short-description": "150 ml",
    price: "37 chf",
    sale: true,
    "product-photo": "/images/cologne.jpg"
  },
  {
    id: 3,
    label: "Translucent cap II",
    "short-description": "Navy, one",
    price: "89 chf",
    sale: false,
    "product-photo": "/images/cap.jpg"
  }
];
export function getTwoJson() {
  return twoJson.filter(g => g);
}
