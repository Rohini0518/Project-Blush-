// testing add to cart

import ShopProductCard from "@/pages/shooping-view/ShopProductCard";
import { render, screen } from "@testing-library/react";
import useCart from "../hooks/useCart";
import userEvent from "@testing-library/user-event";

vi.mock("../hooks/useCart");
vi.mock("@/pages/shooping-view/ShopProductDetails", () => ({
  default: () => null,
}));

//: Figure out what your component actually needs to run
//Look at ShopProductCard's function signature and its first few lines:
//before writing a single render() call, ask yourself: "What does this component pull in from outside itself?" Those are your mocking candidates. Here that's:
// product prop → you just pass a fake object, no mocking needed.
// useCart hook → needs mocking.
// ShopProductDetails (child component) → worth thinking about too (see Step 3).

const mockProduct = {
  _id: "prod123",
  image: "test.jpg",
  title: "Test Shirt",
  price: 1000,
  salePrice: 800,
  sizes: ["S", "M"],
};

const mockAddCartItem = vi.fn();
const mockIncreaseCart = vi.fn();
const mockDecreaseCart = vi.fn();
const mockHandleDeleteCartItem = vi.fn();

beforeEach(() => {
  vi.mocked(useCart).mockReturnValue({
    cartItems: [],
    addCartItem: mockAddCartItem,
    increaseCart: mockIncreaseCart,
    decreaseCart: mockDecreaseCart,
    handleDeleteCartItem: mockHandleDeleteCartItem,
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

test("it should load product card ", async () => {
  const user = userEvent.setup();
  render(<ShopProductCard product={mockProduct} />);
screen.debug();
  const addButton = screen.getByRole("button", { name: /add to cart/i });
  await user.click(addButton);
  expect(mockAddCartItem).toHaveBeenCalledTimes(1);
  console.log(mockAddCartItem.mock);
  console.log(mockAddCartItem.mock.calls);
  expect(mockAddCartItem).toHaveBeenCalledWith("prod123", 1);
});
