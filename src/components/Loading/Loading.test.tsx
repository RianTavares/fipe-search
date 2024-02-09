import { render, screen } from '@testing-library/react';
import Loader from './Loading';

describe('Loader Component', () => {
  it('renders correctly', () => {
    render(<Loader />);

    const loaderElement = screen.getByTestId('loader-container');
    expect(loaderElement).toBeInTheDocument();
  });
});
