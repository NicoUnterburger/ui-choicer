export const nvrData = {
  // Compact NVRs
  'UNVR': {
    name: 'UniFi NVR', sku: 'UNVR', category: 'compact', color: '#3B82F6', msrp: 319, status: 'current',
    bays: 1, baySize: '2.5"/3.5"', maxStorage: '8 TB', cameras: 15, streams: 30,
    network: '1 GbE', raidSupport: false, formFactor: 'Desktop', power: 24,
    features: ['Compact'], notes: 'Entry-level standalone NVR'
  },
  // Standard Rackmount
  'UNVR-Pro': {
    name: 'UniFi NVR Pro', sku: 'UNVR-Pro', category: 'rackmount', color: '#8B5CF6', msrp: 499, status: 'current',
    bays: 7, baySize: '3.5"', maxStorage: '140 TB', cameras: 60, streams: 120,
    network: '10G SFP+', raidSupport: true, formFactor: '1U Rack', power: 100,
    features: ['10G SFP+', 'RAID', '7 Bays'], notes: 'Best value - 7 bays + 10G'
  },
  // Enterprise
  'UNVR-Enterprise': {
    name: 'NVR Enterprise', sku: 'UNVR-Enterprise', category: 'enterprise', color: '#DC2626', msrp: 2499, status: 'current',
    bays: 16, baySize: '3.5"', maxStorage: '368 TB', cameras: 200, streams: 400,
    network: '2x 10G SFP+', raidSupport: true, formFactor: '3U Rack', power: 500,
    features: ['Dual 10G', 'RAID', '16 Bays', 'Hot-Swap', 'Redundant PSU'], notes: 'Large deployments - 16 hot-swap bays'
  },
  // AI Series
  'AI-NVR': {
    name: 'AI NVR', sku: 'AI-NVR', category: 'ai', color: '#22C55E', msrp: 999, status: 'new',
    bays: 4, baySize: '3.5"', maxStorage: '80 TB', cameras: 50, streams: 100,
    network: '2.5 GbE', raidSupport: true, formFactor: 'Desktop', power: 80,
    features: ['AI Processing', 'RAID', 'Local AI'], notes: 'Local AI processing - no cloud required'
  },
  'AI-NVR-Pro': {
    name: 'AI NVR Pro', sku: 'AI-NVR-Pro', category: 'ai', color: '#22C55E', msrp: 1499, status: 'new',
    bays: 7, baySize: '3.5"', maxStorage: '140 TB', cameras: 100, streams: 200,
    network: '10G SFP+', raidSupport: true, formFactor: '1U Rack', power: 150,
    features: ['AI Processing', '10G SFP+', 'RAID', 'Local AI'], notes: 'Rackmount AI NVR with 10G'
  }
};
