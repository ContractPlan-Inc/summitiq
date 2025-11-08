import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import { DemoProvider } from '@/contexts/DemoContext';

const renderWithDemoProvider = (component: React.ReactElement) => {
  return render(<DemoProvider>{component}</DemoProvider>);
};

describe('SummitIQ Home Page', () => {
  it('renders the SummitIQ branding', () => {
    renderWithDemoProvider(<Home />);
    const branding = screen.getAllByText('SummitIQ');
    expect(branding.length).toBeGreaterThan(0);
  });

  it('displays the main hero heading', () => {
    renderWithDemoProvider(<Home />);
    const heading = screen.getByText(/Turn Every Meeting/i);
    expect(heading).toBeInTheDocument();
  });

  it('displays the enhanced value proposition', () => {
    renderWithDemoProvider(<Home />);
    const description = screen.getByText(/Your AI co-pilot for every sales call/i);
    expect(description).toBeInTheDocument();
  });

  it('has a Start Free Trial button', () => {
    renderWithDemoProvider(<Home />);
    const buttons = screen.getAllByText(/Start Free Trial/i);
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('shows key statistics', () => {
    renderWithDemoProvider(<Home />);
    const stat1 = screen.getByText('43%');
    const stat2 = screen.getByText('2.3x');
    const stat3 = screen.getByText('31%');
    expect(stat1).toBeInTheDocument();
    expect(stat2).toBeInTheDocument();
    expect(stat3).toBeInTheDocument();
  });

  it('has navigation links', () => {
    renderWithDemoProvider(<Home />);
    const features = screen.getAllByText(/Features/i);
    expect(features.length).toBeGreaterThan(0);
  });

  it('displays feature cards', () => {
    renderWithDemoProvider(<Home />);
    const transcription = screen.getByText(/Live Meeting Transcription/i);
    const aiPanel = screen.getByText(/AI Expert Panel/i);
    expect(transcription).toBeInTheDocument();
    expect(aiPanel).toBeInTheDocument();
  });

  it('shows social proof numbers', () => {
    renderWithDemoProvider(<Home />);
    const userCount = screen.getByText('2,500+');
    const meetingCount = screen.getByText('150K+');
    const rating = screen.getByText('4.9/5');
    expect(userCount).toBeInTheDocument();
    expect(meetingCount).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
  });

  it('displays testimonials section', () => {
    renderWithDemoProvider(<Home />);
    const testimonials = screen.getByText(/increased our close rate by 43%/i);
    expect(testimonials).toBeInTheDocument();
  });

  it('displays FAQ section', () => {
    renderWithDemoProvider(<Home />);
    const faq = screen.getByText(/How does the AI Expert Panel work?/i);
    expect(faq).toBeInTheDocument();
  });

  it('displays pricing section', () => {
    renderWithDemoProvider(<Home />);
    const pricing = screen.getAllByText(/per user\/month/i);
    expect(pricing.length).toBeGreaterThan(0);
  });

  it('shows Product Hunt banner', () => {
    renderWithDemoProvider(<Home />);
    const phBanner = screen.getByText(/We're live on Product Hunt!/i);
    expect(phBanner).toBeInTheDocument();
  });
});
