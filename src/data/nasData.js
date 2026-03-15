export const nasData = {
  // Standard Series
  'UNAS': {
    name: 'UniFi NAS', sku: 'UNAS', category: 'standard', color: '#3B82F6', msrp: 449, status: 'current',
    bays: 4, baySize: '3.5"/2.5"', maxStorage: '80 TB',
    network: '2.5 GbE', networkPorts: 1, cacheSlots: 0,
    cpu: 'Intel N100', ram: '8 GB DDR5', ramMax: '16 GB',
    raidSupport: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6', 'RAID 10'],
    formFactor: 'Desktop Tower', power: 65,
    features: ['SMB', 'NFS', 'AFP', 'iSCSI'],
    apps: ['UniFi Protect', 'File Sharing', 'Backup'],
    notes: 'Entry-level 4-bay NAS'
  },
  'UNAS-Pro': {
    name: 'UniFi NAS Pro', sku: 'UNAS-Pro', category: 'pro', color: '#8B5CF6', msrp: 999, status: 'current',
    bays: 8, baySize: '3.5"/2.5"', maxStorage: '184 TB',
    network: '10G SFP+', networkPorts: 2, cacheSlots: 2,
    cpu: 'Intel Core i3', ram: '16 GB DDR5', ramMax: '64 GB',
    raidSupport: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6', 'RAID 10', 'RAIDZ'],
    formFactor: 'Desktop Tower', power: 120,
    features: ['10G SFP+', 'NVMe Cache', 'ECC Option', 'SMB', 'NFS', 'iSCSI'],
    apps: ['UniFi Protect', 'File Sharing', 'Backup', 'VM Storage'],
    notes: 'Best value - 8 bays + 10G + NVMe cache'
  },
  'UNAS-Pro-Max': {
    name: 'UniFi NAS Pro Max', sku: 'UNAS-Pro-Max', category: 'pro', color: '#8B5CF6', msrp: 1499, status: 'new',
    bays: 12, baySize: '3.5"/2.5"', maxStorage: '276 TB',
    network: '10G SFP+', networkPorts: 2, cacheSlots: 2,
    cpu: 'Intel Core i5', ram: '32 GB DDR5', ramMax: '128 GB',
    raidSupport: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6', 'RAID 10', 'RAIDZ', 'RAIDZ2'],
    formFactor: 'Desktop Tower', power: 180,
    features: ['Dual 10G SFP+', 'NVMe Cache', 'ECC RAM', 'SMB', 'NFS', 'iSCSI', 'Hot-Swap'],
    apps: ['UniFi Protect', 'File Sharing', 'Backup', 'VM Storage', 'Surveillance'],
    notes: '12-bay powerhouse with dual 10G'
  },
  // Rackmount Series
  'UNAS-Rack': {
    name: 'UniFi NAS Rack', sku: 'UNAS-Rack', category: 'rackmount', color: '#14B8A6', msrp: 1299, status: 'current',
    bays: 8, baySize: '3.5"', maxStorage: '184 TB',
    network: '10G SFP+', networkPorts: 2, cacheSlots: 2,
    cpu: 'Intel Core i3', ram: '16 GB DDR5', ramMax: '64 GB',
    raidSupport: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6', 'RAID 10', 'RAIDZ'],
    formFactor: '2U Rack', power: 150,
    features: ['10G SFP+', 'NVMe Cache', 'Hot-Swap', 'SMB', 'NFS', 'iSCSI'],
    apps: ['UniFi Protect', 'File Sharing', 'Backup', 'VM Storage'],
    notes: '8-bay rackmount with hot-swap'
  },
  'UNAS-Rack-Pro': {
    name: 'UniFi NAS Rack Pro', sku: 'UNAS-Rack-Pro', category: 'rackmount', color: '#14B8A6', msrp: 2499, status: 'new',
    bays: 16, baySize: '3.5"', maxStorage: '368 TB',
    network: '25G SFP28', networkPorts: 2, cacheSlots: 4,
    cpu: 'Intel Xeon', ram: '32 GB ECC DDR5', ramMax: '256 GB',
    raidSupport: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6', 'RAID 10', 'RAIDZ', 'RAIDZ2', 'RAIDZ3'],
    formFactor: '3U Rack', power: 350,
    features: ['Dual 25G SFP28', 'NVMe Cache', 'ECC RAM', 'Hot-Swap', 'Redundant PSU'],
    apps: ['UniFi Protect', 'File Sharing', 'Backup', 'VM Storage', 'Enterprise'],
    notes: 'Enterprise - 16 bays + 25G + Xeon'
  },
  // Special
  'UNAS-Backup': {
    name: 'UniFi NAS Backup', sku: 'UNAS-Backup', category: 'special', color: '#F97316', msrp: 699, status: 'new',
    bays: 2, baySize: '3.5"/2.5"', maxStorage: '40 TB',
    network: '2.5 GbE', networkPorts: 1, cacheSlots: 0,
    cpu: 'ARM Cortex-A76', ram: '4 GB DDR4', ramMax: '4 GB',
    raidSupport: ['RAID 0', 'RAID 1'],
    formFactor: 'Compact Desktop', power: 25,
    features: ['Low Power', 'Silent', 'Auto Backup'],
    apps: ['Time Machine', 'Backup', 'File Sharing'],
    notes: 'Silent backup appliance - 25W'
  }
};
