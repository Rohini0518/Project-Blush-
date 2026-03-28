export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your Email",
    componentType: "input",
    type: "text",
  },
  {
    name: "password",
    label: "password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your Email",
    componentType: "input",
    type: "text",
    autoComplete: "username",
  },
  {
    name: "password",
    label: "password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
    autoComplete: "current-password",
  },
];

export const addAdminProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "newarrivals", label: "New Arrivals" },
      { id: "coordsets", label: "Co-Ord-Sets" },
      { id: "partywear", label: "Partywear" },
      { id: "kurthies", label: "Kurthies" },
      { id: "jeantops", label: "JeanTops" },
    ],
  },
  {
    label: "Size",
    name: "size",
    componentType: "select",
    options: [
      { id: "xs", label: "XS" },
      { id: "small", label: "Small" },
      { id: "medium", label: "Medium" },
      { id: "large", label: "Large" },
      { id: "xl", label: "XL" },
      { id: "xxl", label: "XXL" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderItems = [
  {
    id: "home",
    label: "HOME",
    path: "/shop/home",
  },
  {
    id: "newarrivals",
    label: "NEW ARRIVALS",
    path: "/shop/products/new",
  },
  {
    id: "coordsets",
    label: "CO-ORD SETS",
    path: "/shop/products/co-ord",
  },
  {
    id: "partywear",
    label: "PARTY WEAR",
    path: "/shop/listing",
  },
  {
    id: "kurthies",
    label: "KURTHIES",
    path: "/shop/products/kurthies",
  },
  {
    id: "trendytops",
    label: "TRENDY TOPS",
    path: "/shop/products/tops",
  },
];
