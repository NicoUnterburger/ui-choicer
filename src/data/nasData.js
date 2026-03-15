export const nasData = {
  // Desktop Series
  'UNAS-2': {
    name: 'UniFi NAS 2', sku: 'UNAS-2', category: 'desktop', color: '#3B82F6', msrp: 189, status: 'current',
    bays: 2, baySize: '3.5"', maxStorage: '40 TB',
    network: '2.5 GbE', networkPorts: 1, cacheSlots: 0,
    cpu: 'ARM Cortex-A55 (Quad-Core, 1.7 GHz)', ram: '4 GB', ramMax: '4 GB',
    raidSupport: ['RAID 0', 'RAID 1'],
    formFactor: 'Desktop', power: 60,
    features: ['PoE++ Powered', 'SMB', 'NFS'],
    apps: ['UniFi Protect', 'File Sharing', 'Backup'],
    notes: 'PoE++ powered — no AC adapter needed'
  },
  'UNAS-4': {
    name: 'UniFi NAS 4', sku: 'UNAS-4', category: 'desktop', color: '#3B82F6', msrp: 359, status: 'current',
    bays: 4, baySize: '3.5"', maxStorage: '80 TB',
    network: '2.5 GbE', networkPorts: 1, cacheSlots: 2,
    cpu: 'ARM Cortex-A55 (Quad-Core, 1.7 GHz)', ram: '4 GB', ramMax: '4 GB',
    raidSupport: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6', 'RAID 10'],
    formFactor: 'Desktop', power: 90,
    features: ['PoE+++ Powered', 'NVMe Cache', 'SMB', 'NFS'],
    apps: ['UniFi Protect', 'File Sharing', 'Backup'],
    notes: 'PoE+++ powered with NVMe cache support'
  },
  // Rackmount Series
  'UNAS-Pro': {
    name: 'UniFi NAS Pro', sku: 'UNAS-Pro', category: 'legacy', color: '#6B7280', msrp: 469, status: 'legacy',
    bays: 7, baySize: '3.5"/2.5"', maxStorage: '140 TB',
    network: '10G SFP+ + 1 GbE', networkPorts: 2, cacheSlots: 0,
    cpu: 'ARM Cortex-A57 (Quad-Core, 1.7 GHz)', ram: '8 GB', ramMax: '8 GB',
    raidSupport: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6', 'RAID 10'],
    formFactor: '2U Rack', power: 100,
    features: ['10G SFP+', 'Hot-Swap', 'SMB', 'NFS', 'iSCSI'],
    apps: ['UniFi Protect', 'File Sharing', 'Backup'],
    notes: 'Original model — superseded by Pro 4 / Pro 8'
  },
  'UNAS-Pro-4': {
    name: 'UniFi NAS Pro 4', sku: 'UNAS-Pro-4', category: 'rackmount', color: '#8B5CF6', msrp: 469, status: 'current',
    bays: 4, baySize: '3.5"/2.5"', maxStorage: '80 TB',
    network: '2× 10G SFP+ + 1 GbE', networkPorts: 3, cacheSlots: 2,
    cpu: 'ARM Cortex-A57 (Quad-Core, 2.0 GHz)', ram: '8 GB', ramMax: '8 GB',
    raidSupport: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6', 'RAID 10'],
    formFactor: '1U Rack', power: 150,
    features: ['Dual 10G SFP+', 'NVMe Cache', 'Hot-Swap', 'SMB', 'NFS', 'iSCSI'],
    apps: ['UniFi Protect', 'File Sharing', 'Backup', 'VM Storage'],
    notes: '1U rackmount with dual 10G and NVMe cache'
  },
  'UNAS-Pro-8': {
    name: 'UniFi NAS Pro 8', sku: 'UNAS-Pro-8', category: 'rackmount', color: '#8B5CF6', msrp: 749, status: 'current',
    bays: 8, baySize: '3.5"/2.5"', maxStorage: '160 TB',
    network: '2× 10G SFP+ + 10 GbE', networkPorts: 3, cacheSlots: 2,
    cpu: 'ARM Cortex-A57 (Quad-Core, 2.0 GHz)', ram: '16 GB', ramMax: '16 GB',
    raidSupport: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6', 'RAID 10'],
    formFactor: '2U Rack', power: 550,
    features: ['Dual 10G SFP+', '10G RJ45', 'NVMe Cache', 'Redundant PSU', 'Hot-Swap', 'SMB', 'NFS', 'iSCSI'],
    apps: ['UniFi Protect', 'File Sharing', 'Backup', 'VM Storage'],
    notes: 'Redundant PSU (2× 550W) — 2U rackmount'
  },
};
