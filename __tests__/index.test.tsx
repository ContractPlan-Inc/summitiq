import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

describe('Home Page', () => {
  it('renders the home page with correct heading', () => {
    render(<Home />);
    const heading = screen.getByText('ContractPlan-Inc');
    expect(heading).toBeInTheDocument();
  });

  it('displays the tagline', () => {
    render(<Home />);
    const tagline = screen.getByText('Your command center for intelligent contract execution.');
    expect(tagline).toBeInTheDocument();
  });

  it('has a link to dashboard', () => {
    render(<Home />);
    const link = screen.getByText('Go to Dashboard');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/dashboard');
  });
});
