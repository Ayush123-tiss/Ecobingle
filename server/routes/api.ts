import express from 'express';

const router = express.Router();

// Mock data
const mockThreads = [
  {
    id: '1',
    title: 'Solar Panel Installation Guide for Beginners',
    content: 'I recently installed solar panels on my home and wanted to share my experience and tips for anyone considering making the switch to renewable energy...',
    author: 'SolarEnthusiast',
    community: 'renewable-energy',
    votes: 42,
    comments: 18,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    tags: ['solar', 'diy', 'renewable-energy']
  },
  {
    id: '2',
    title: 'Zero Waste Kitchen: My 6-Month Journey',
    content: 'Six months ago, I committed to creating a zero-waste kitchen. Here are the biggest challenges I faced and the solutions that worked...',
    author: 'EcoChef',
    community: 'sustainable-living',
    votes: 38,
    comments: 24,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    tags: ['zero-waste', 'kitchen', 'lifestyle']
  },
  {
    id: '3',
    title: 'Climate Action: What Can We Do at the Local Level?',
    content: 'While global climate action is crucial, there are many impactful things we can do in our local communities. Let\'s discuss practical strategies...',
    author: 'ClimateActivist',
    community: 'climate-action',
    votes: 56,
    comments: 31,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    tags: ['climate', 'community', 'action']
  },
  {
    id: '4',
    title: 'Electric Vehicle Charging Infrastructure: Current State and Future',
    content: 'As EV adoption grows, charging infrastructure becomes increasingly important. Here\'s an analysis of where we are and where we\'re heading...',
    author: 'EVExpert',
    community: 'green-tech',
    votes: 29,
    comments: 15,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    tags: ['electric-vehicles', 'infrastructure', 'technology']
  },
  {
    id: '5',
    title: 'Composting in Small Spaces: Urban Solutions',
    content: 'Living in an apartment doesn\'t mean you can\'t compost! Here are several methods I\'ve tried for composting in small urban spaces...',
    author: 'UrbanGardener',
    community: 'sustainable-living',
    votes: 33,
    comments: 12,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    tags: ['composting', 'urban', 'apartment-living']
  }
];

const mockCommunities = [
  {
    id: 'renewable-energy',
    name: 'Renewable Energy',
    description: 'Discussions about solar, wind, hydro, and other renewable energy sources',
    members: 15420,
    icon: '☀️',
    color: '#f59e0b'
  },
  {
    id: 'sustainable-living',
    name: 'Sustainable Living',
    description: 'Tips and experiences for living a more sustainable lifestyle',
    members: 23150,
    icon: '🌱',
    color: '#10b981'
  },
  {
    id: 'climate-action',
    name: 'Climate Action',
    description: 'Organizing and discussing climate action initiatives',
    members: 18750,
    icon: '🌍',
    color: '#3b82f6'
  },
  {
    id: 'green-tech',
    name: 'Green Technology',
    description: 'Latest developments in environmentally friendly technology',
    members: 12300,
    icon: '⚡',
    color: '#8b5cf6'
  },
  {
    id: 'eco-transport',
    name: 'Eco Transport',
    description: 'Electric vehicles, public transport, and sustainable mobility',
    members: 9800,
    icon: '🚲',
    color: '#06b6d4'
  },
  {
    id: 'conservation',
    name: 'Conservation',
    description: 'Wildlife conservation and habitat protection discussions',
    members: 14200,
    icon: '🦋',
    color: '#84cc16'
  }
];

// Routes
router.get('/threads', (req, res) => {
  res.json(mockThreads);
});

router.get('/communities', (req, res) => {
  res.json(mockCommunities);
});

router.get('/threads/:id', (req, res) => {
  const thread = mockThreads.find(t => t.id === req.params.id);
  if (!thread) {
    return res.status(404).json({ error: 'Thread not found' });
  }
  res.json(thread);
});

router.get('/communities/:id', (req, res) => {
  const community = mockCommunities.find(c => c.id === req.params.id);
  if (!community) {
    return res.status(404).json({ error: 'Community not found' });
  }
  res.json(community);
});

export default router;