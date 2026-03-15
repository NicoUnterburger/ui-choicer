export const nvrData = {
  // Compact
  'UNVR-Instant': {
    name: 'NVR Instant', sku: 'UNVR-Instant', category: 'compact', color: '#22C55E', msrp: 189, status: 'current',
    bays: 1, baySize: '3.5"', maxStorage: '8 TB', cameras: 6, streams: 15,
    network: '1 GbE (+ 6× PoE)', raidSupport: false, formFactor: 'Desktop', power: 30,
    features: ['6-Port PoE', 'ViewPort', 'Compact'], notes: 'All-in-one with integrated 6-port PoE switch'
  },
  // Standard Rackmount
  'UNVR': {
    name: 'NVR', sku: 'UNVR', category: 'rackmount', color: '#3B82F6', msrp: 279, status: 'current',
    bays: 4, baySize: '3.5"/2.5"', maxStorage: '80 TB', cameras: 18, streams: 60,
    network: '10G SFP+ + 1 GbE', raidSupport: true, formFactor: '1U Rack', power: 100,
    features: ['10G SFP+', 'RAID', 'DC Backup'], notes: '18×4K or 60×FHD cameras'
  },
  'UNVR-Pro': {
    name: 'NVR Pro', sku: 'UNVR-Pro', category: 'rackmount', color: '#8B5CF6', msrp: 469, status: 'current',
    bays: 7, baySize: '3.5"/2.5"', maxStorage: '168 TB', cameras: 24, streams: 70,
    network: '10G SFP+ + 1 GbE', raidSupport: true, formFactor: '2U Rack', power: 100,
    features: ['10G SFP+', 'RAID 1/5/10', '7 Bays', 'Touchscreen'], notes: '24×4K or 70×FHD cameras'
  },
  // Enterprise
  'ENVR': {
    name: 'Enterprise NVR', sku: 'ENVR', category: 'enterprise', color: '#DC2626', msrp: 1899, status: 'current',
    bays: 16, baySize: '3.5"/2.5"', maxStorage: '368 TB', cameras: 70, streams: 210,
    network: '2× 10G SFP+ + 10 GbE', raidSupport: true, formFactor: '3U Rack', power: 410,
    features: ['Dual 10G SFP+', '10G RJ45', 'RAID', '16 Bays', 'Hot-Swap', 'Redundant PSU'], notes: '70×4K or 210×FHD cameras — redundant 550W PSU'
  },
};
