
// Mock API service for CityLore sponsor management
export interface Category {
  id: string;
  name: string;
  description: string;
  city: string;
  cityLogo: string;
  sponsorshipPrice: number;
  currentSponsor?: Sponsor;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
}

export interface SponsorRequest {
  id: string;
  categoryId: string;
  partnerName: string;
  contactEmail: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

// Mock data
const mockCategories: Category[] = [
  {
    id: 'stories',
    name: 'Local Stories',
    description: 'Tales and legends that define our city\'s character',
    city: 'San Francisco',
    cityLogo: '🏙️',
    sponsorshipPrice: 1000,
    currentSponsor: {
      id: 'tech-corp',
      name: 'TechCorp Solutions',
      logo: '🏢',
      website: 'https://techcorp.com',
      description: 'Supporting local storytelling and community engagement'
    }
  },
  {
    id: 'street-art',
    name: 'Street Art',
    description: 'Urban expression and cultural creativity',
    city: 'Austin',
    cityLogo: '🎸',
    sponsorshipPrice: 1000
  },
  {
    id: 'poetry',
    name: 'City Poetry',
    description: 'Verses that capture the soul of our streets',
    city: 'New York',
    cityLogo: '🗽',
    sponsorshipPrice: 1000
  },
  {
    id: 'photography',
    name: 'Urban Photography',
    description: 'Visual stories through the lens',
    city: 'Seattle',
    cityLogo: '🌧️',
    sponsorshipPrice: 1000
  }
];

let mockSponsorRequests: SponsorRequest[] = [
  {
    id: '1',
    categoryId: 'street-art',
    partnerName: 'Local Arts Foundation',
    contactEmail: 'contact@localarts.org',
    message: 'We would love to support street art in Austin!',
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Get all categories
  async getCategories(): Promise<Category[]> {
    await delay(500);
    return mockCategories;
  },

  // Get category by ID
  async getCategory(id: string): Promise<Category | null> {
    await delay(300);
    return mockCategories.find(cat => cat.id === id) || null;
  },

  // Submit sponsor request
  async submitSponsorRequest(request: Omit<SponsorRequest, 'id' | 'status' | 'createdAt'>): Promise<{ success: boolean; requestId: string }> {
    await delay(800);
    
    const newRequest: SponsorRequest = {
      ...request,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    mockSponsorRequests.push(newRequest);
    
    return {
      success: true,
      requestId: newRequest.id
    };
  },

  // Get all sponsor requests (admin)
  async getSponsorRequests(): Promise<SponsorRequest[]> {
    await delay(400);
    return mockSponsorRequests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  // Update sponsor request status
  async updateSponsorRequestStatus(id: string, status: SponsorRequest['status']): Promise<boolean> {
    await delay(300);
    const requestIndex = mockSponsorRequests.findIndex(req => req.id === id);
    if (requestIndex !== -1) {
      mockSponsorRequests[requestIndex].status = status;
      return true;
    }
    return false;
  }
};
