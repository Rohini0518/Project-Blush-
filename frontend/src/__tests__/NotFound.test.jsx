// @vitest-environment jsdom
import {describe,expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import NotFound from '@/components/NotFound';

describe("combined notfound check",()=>{
test("notFound component Loading check",()=>{
    render(<NotFound />);
    screen.debug();
   const textElement= screen.getByText("NotFound");
   expect(textElement).toBeInTheDocument();
})

test("does button exist",()=>{
    render(<NotFound/>);
    screen.debug();
    const getbutton=screen.getByRole("button");
    expect(getbutton).toBeInTheDocument();
})
})