import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

describe('SummitIQ Home Page', () => {
  it('renders the SummitIQ branding', () => {
    render(<Home />);
    const branding = screen.getAllByText('SummitIQ');
    expect(branding.length).toBeGreaterThan(0);
  });

  it('displays the main hero heading', () => {
    render(<Home />);
    const heading = screen.getByText(/Turn Every Meeting/i);
    expect(heading).toBeInTheDocument();
  });

  it('displays the value proposition', () => {
    render(<Home />);
    const description = screen.getByText(/The world's most intelligent meeting assistant/i);
    expect(description).toBeInTheDocument();
  });

  it('has a Start Free Trial button', () => {
    render(<Home />);
    const button = screen.getByRole('button', { name: /Start Free Trial/i });
    expect(button).toBeInTheDocument();
  });

  it('shows key statistics', () => {
    render(<Home />);
    const stat1 = screen.getByText('43%');
    const stat2 = screen.getByText('2.3x');
    const stat3 = screen.getByText('31%');
    expect(stat1).toBeInTheDocument();
    expect(stat2).toBeInTheDocument();
    expect(stat3).toBeInTheDocument();
  });

  it('has navigation links', () => {
    render(<Home />);
    const featuresLink = screen.getByRole('link', { name: /Features/i });
    expect(featuresLink).toBeInTheDocument();
  });

  it('displays feature cards', () => {
    render(<Home />);
    const transcriptions = screen.getAllByText(/Real-Time Transcription/i);
    const aiCoaching = screen.getAllByText(/AI Coaching/i);
    expect(transcriptions.length).toBeGreaterThan(0);
    expect(aiCoaching.length).toBeGreaterThan(0);
  });
});
