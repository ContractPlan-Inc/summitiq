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

  it('displays the enhanced value proposition', () => {
    render(<Home />);
    const description = screen.getByText(/Your AI co-pilot for every sales call/i);
    expect(description).toBeInTheDocument();
  });

  it('has a Start Free Trial button', () => {
    render(<Home />);
    const buttons = screen.getAllByText(/Start Free Trial/i);
    expect(buttons.length).toBeGreaterThan(0);
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
    const featuresLinks = screen.getAllByText(/Features/i);
    expect(featuresLinks.length).toBeGreaterThan(0);
  });

  it('displays feature cards', () => {
    render(<Home />);
    const transcriptions = screen.getAllByText(/Real-Time Transcription/i);
    const aiCoaching = screen.getAllByText(/AI Coaching/i);
    expect(transcriptions.length).toBeGreaterThan(0);
    expect(aiCoaching.length).toBeGreaterThan(0);
  });

  it('shows social proof numbers', () => {
    render(<Home />);
    const userCount = screen.getByText('2,500+');
    const meetingCount = screen.getByText('150K+');
    const rating = screen.getByText('4.9/5');
    expect(userCount).toBeInTheDocument();
    expect(meetingCount).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
  });

  it('displays testimonials section', () => {
    render(<Home />);
    const testimonialHeading = screen.getByText(/Loved by Sales Teams Everywhere/i);
    expect(testimonialHeading).toBeInTheDocument();
  });

  it('displays FAQ section', () => {
    render(<Home />);
    const faqHeading = screen.getByText(/Frequently Asked Questions/i);
    expect(faqHeading).toBeInTheDocument();
  });

  it('displays pricing section', () => {
    render(<Home />);
    const pricingHeading = screen.getByText(/Simple, Transparent Pricing/i);
    expect(pricingHeading).toBeInTheDocument();
  });

  it('shows Product Hunt banner', () => {
    render(<Home />);
    const phBanner = screen.getByText(/We're live on Product Hunt!/i);
    expect(phBanner).toBeInTheDocument();
  });
});
