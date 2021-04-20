const config = {
  appTitle: "Applocum Interview",
  navLinks: [{ title: "Home", to: "/" }],
  apiUrl: "https://dev-api.alldaydr.com",
  apiEndpoints: {
    signup: "/api/users/sign_up.json",
    login: "/api/users/sign_in.json",
    logout: "/api/users/sign_out.json",
  },

  products: [
    { Name: "Cheese", price: 2.5, Location: "Refrigerated foods", qty: 2 },
    { Name: "Crisps", price: 3, Location: "the Snack isle", qty: 5 },
    { Name: "pizza", price: 4, Location: "Refrigerated foods", qty: 7 },
    { Name: "Chocolate", price: 1.5, Location: "the Snack isle", qty: 8 },
    { Name: "Self-raising flour", price: 1.5, Location: "Home baking", qty: 0 },
    { Name: "Ground almonds", price: 3, Location: "Home baking", qty: 1 },
  ],
};

export default config;
