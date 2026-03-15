export const bridgeData = {
  // ==================== UniFi Building-to-Building ====================
  'UBB': {
    name: 'UniFi Building Bridge', sku: 'UBB', category: 'unifi-ptp', color: '#3B82F6', msrp: 499, status: 'current',
    frequency: '60 GHz', bandwidth: '5+ Gbps', range: 500, rangeUnit: 'm',
    antennaGain: 38, beamwidth: 4, modulation: '802.11ad',
    interface: '10G SFP+', poe: 'PoE++ (60W)', weatherproof: 'IP67',
    mimo: null, channelWidth: '2160 MHz', txPower: 40,
    features: ['60 GHz', '10G SFP+', 'Zero-config Pairing', 'Magnetic Mount'],
    notes: '60 GHz - perfekt für kurze Distanzen zwischen Gebäuden',
    // Sehr enger Beam (4°) - typisch für 60 GHz Pencil Beam
    elevation: [-15, 5, 25, 36, 38, 36, 25, 5, -15, -30],
    azimuth: [38, 36, 25, 5, -15, -30, -15, 5, 25, 36, 38, 36],
    beamwidthH: 4, beamwidthV: 4
  },
  'UBB-XG': {
    name: 'UniFi Building Bridge XG', sku: 'UBB-XG', category: 'unifi-ptp', color: '#8B5CF6', msrp: 1499, status: 'current',
    frequency: '60 GHz', bandwidth: '10+ Gbps', range: 500, rangeUnit: 'm',
    antennaGain: 45, beamwidth: 2.5, modulation: '802.11ay',
    interface: '10G SFP+', poe: 'PoE++ (60W)', weatherproof: 'IP67',
    mimo: '4x4', channelWidth: '8640 MHz', txPower: 40,
    features: ['60 GHz', '10G SFP+', '802.11ay', 'Channel Bonding', 'MIMO'],
    notes: '60 GHz 802.11ay - bis zu 10 Gbps Full Duplex',
    // Noch engerer Beam (2.5°) mit höherem Gain
    elevation: [-20, 0, 28, 42, 45, 42, 28, 0, -20, -35],
    azimuth: [45, 42, 28, 0, -20, -35, -20, 0, 28, 42, 45, 42],
    beamwidthH: 2.5, beamwidthV: 2.5
  },

  // ==================== LTU (Long-Term-Use) - Lizenzfrei ====================
  'LTU-Rocket': {
    name: 'LTU Rocket', sku: 'LTU-Rocket', category: 'ltu-basestation', color: '#22C55E', msrp: 299, status: 'current',
    frequency: '5 GHz', bandwidth: '600+ Mbps', range: 30, rangeUnit: 'km',
    antennaGain: null, beamwidth: null, modulation: 'LTU',
    interface: '1 GbE + 1 GbE', poe: 'PoE+ (24W)', weatherproof: 'IP67',
    mimo: '2x2', channelWidth: '20/40/50 MHz', txPower: 29,
    features: ['LTU', 'GPS Sync', 'PTMP', 'Ext. Antenna'],
    notes: 'Base station for external antennas (RocketDish compatible)',
    elevation: null, azimuth: null, beamwidthH: null, beamwidthV: null
  },
  'LTU-Pro': {
    name: 'LTU Pro', sku: 'LTU-Pro', category: 'ltu-client', color: '#22C55E', msrp: 199, status: 'current',
    frequency: '5 GHz', bandwidth: '600+ Mbps', range: 25, rangeUnit: 'km',
    antennaGain: 24, beamwidth: 6, modulation: 'LTU',
    interface: '1 GbE', poe: 'PoE (12W)', weatherproof: 'IP67',
    mimo: '2x2', channelWidth: '20/40/50 MHz', txPower: 29,
    features: ['LTU', '24 dBi', 'PTP/PTMP Client'],
    notes: 'Leistungsstarker LTU Client mit 24 dBi',
    // 24 dBi Dish - relativ eng (6°)
    elevation: [-10, 8, 18, 22, 24, 22, 18, 8, -10, -25],
    azimuth: [24, 22, 18, 8, -10, -25, -10, 8, 18, 22, 24, 22],
    beamwidthH: 6, beamwidthV: 6
  },
  'LTU-Lite': {
    name: 'LTU Lite', sku: 'LTU-Lite', category: 'ltu-client', color: '#22C55E', msrp: 99, status: 'current',
    frequency: '5 GHz', bandwidth: '300+ Mbps', range: 15, rangeUnit: 'km',
    antennaGain: 18, beamwidth: 12, modulation: 'LTU',
    interface: '1 GbE', poe: 'PoE (7W)', weatherproof: 'IP65',
    mimo: '2x2', channelWidth: '20/40 MHz', txPower: 26,
    features: ['LTU', '18 dBi', 'Budget Client'],
    notes: 'Budget LTU Client',
    // 18 dBi - breiter Beam (12°)
    elevation: [-5, 6, 12, 16, 18, 16, 12, 6, -5, -18],
    azimuth: [18, 17, 14, 8, 0, -12, 0, 8, 14, 17, 18, 17],
    beamwidthH: 12, beamwidthV: 12
  },
  'LTU-LR': {
    name: 'LTU Long-Range', sku: 'LTU-LR', category: 'ltu-client', color: '#22C55E', msrp: 249, status: 'current',
    frequency: '5 GHz', bandwidth: '600+ Mbps', range: 30, rangeUnit: 'km',
    antennaGain: 26, beamwidth: 5, modulation: 'LTU',
    interface: '1 GbE', poe: 'PoE (12W)', weatherproof: 'IP67',
    mimo: '2x2', channelWidth: '20/40/50 MHz', txPower: 29,
    features: ['LTU', '26 dBi', 'Long Range'],
    notes: 'Maximum range with 26 dBi',
    // 26 dBi - sehr enger Beam (5°)
    elevation: [-12, 6, 18, 24, 26, 24, 18, 6, -12, -28],
    azimuth: [26, 24, 18, 6, -12, -28, -12, 6, 18, 24, 26, 24],
    beamwidthH: 5, beamwidthV: 5
  },

  // ==================== airMAX AC - Klassiker ====================
  'PBE-5AC-Gen2': {
    name: 'PowerBeam 5AC Gen2', sku: 'PBE-5AC-Gen2', category: 'airmax-ptp', color: '#F97316', msrp: 109, status: 'current',
    frequency: '5 GHz', bandwidth: '450+ Mbps', range: 25, rangeUnit: 'km',
    antennaGain: 25, beamwidth: 8, modulation: 'airMAX AC',
    interface: '1 GbE', poe: 'PoE (8W)', weatherproof: 'IP66',
    mimo: '2x2', channelWidth: '20/40/80 MHz', txPower: 25,
    features: ['airMAX AC', '25 dBi Dish', 'Compact'],
    notes: 'Klassiker für mittlere Distanzen',
    // 25 dBi Dish - 8° Beam
    elevation: [-8, 7, 17, 23, 25, 23, 17, 7, -8, -22],
    azimuth: [25, 23, 18, 9, -5, -18, -5, 9, 18, 23, 25, 23],
    beamwidthH: 8, beamwidthV: 8
  },
  'PBE-5AC-500': {
    name: 'PowerBeam 5AC 500', sku: 'PBE-5AC-500', category: 'airmax-ptp', color: '#F97316', msrp: 179, status: 'current',
    frequency: '5 GHz', bandwidth: '450+ Mbps', range: 30, rangeUnit: 'km',
    antennaGain: 27, beamwidth: 7, modulation: 'airMAX AC',
    interface: '1 GbE', poe: 'PoE+ (15W)', weatherproof: 'IP66',
    mimo: '2x2', channelWidth: '20/40/80 MHz', txPower: 26,
    features: ['airMAX AC', '27 dBi Dish', '500mm Dish'],
    notes: '500mm Schüssel für mehr Gain',
    // 27 dBi - 500mm Dish - 7° Beam
    elevation: [-10, 8, 19, 25, 27, 25, 19, 8, -10, -24],
    azimuth: [27, 25, 20, 10, -6, -20, -6, 10, 20, 25, 27, 25],
    beamwidthH: 7, beamwidthV: 7
  },
  'PBE-5AC-620': {
    name: 'PowerBeam 5AC 620', sku: 'PBE-5AC-620', category: 'airmax-ptp', color: '#F97316', msrp: 229, status: 'current',
    frequency: '5 GHz', bandwidth: '450+ Mbps', range: 50, rangeUnit: 'km',
    antennaGain: 29, beamwidth: 5, modulation: 'airMAX AC',
    interface: '1 GbE', poe: 'PoE+ (15W)', weatherproof: 'IP66',
    mimo: '2x2', channelWidth: '20/40/80 MHz', txPower: 27,
    features: ['airMAX AC', '29 dBi Dish', '620mm Dish', 'Long Range'],
    notes: 'Large 620mm dish - max range',
    // 29 dBi - 620mm Dish - sehr enger 5° Beam
    elevation: [-14, 6, 20, 27, 29, 27, 20, 6, -14, -28],
    azimuth: [29, 27, 21, 8, -10, -25, -10, 8, 21, 27, 29, 27],
    beamwidthH: 5, beamwidthV: 5
  },
  'NBE-5AC-Gen2': {
    name: 'NanoBeam 5AC Gen2', sku: 'NBE-5AC-Gen2', category: 'airmax-ptp', color: '#F97316', msrp: 79, status: 'current',
    frequency: '5 GHz', bandwidth: '450+ Mbps', range: 15, rangeUnit: 'km',
    antennaGain: 19, beamwidth: 10, modulation: 'airMAX AC',
    interface: '1 GbE', poe: 'PoE (8W)', weatherproof: 'IP66',
    mimo: '2x2', channelWidth: '20/40/80 MHz', txPower: 25,
    features: ['airMAX AC', 'Compact', 'Budget'],
    notes: 'Compact & affordable',
    // 19 dBi - breiterer Beam (10°)
    elevation: [-4, 6, 13, 17, 19, 17, 13, 6, -4, -16],
    azimuth: [19, 18, 15, 9, 2, -10, 2, 9, 15, 18, 19, 18],
    beamwidthH: 10, beamwidthV: 10
  },
  'NS-5AC': {
    name: 'NanoStation 5AC', sku: 'NS-5AC', category: 'airmax-ptp', color: '#F97316', msrp: 99, status: 'current',
    frequency: '5 GHz', bandwidth: '450+ Mbps', range: 15, rangeUnit: 'km',
    antennaGain: 16, beamwidth: 45, modulation: 'airMAX AC',
    interface: '2x 1 GbE', poe: 'PoE (10W)', weatherproof: 'IP65',
    mimo: '2x2', channelWidth: '20/40/80 MHz', txPower: 25,
    features: ['airMAX AC', 'Sector', 'Dual Port'],
    notes: 'Sector-Antenne für PTMP',
    // Sector Antenne - breiter H-Beam (45°), schmaler V-Beam (15°)
    elevation: [-2, 5, 11, 14, 16, 14, 11, 5, -2, -12],
    azimuth: [16, 15, 14, 13, 11, 8, 11, 13, 14, 15, 16, 15],
    beamwidthH: 45, beamwidthV: 15
  },
  'NS-5ACL': {
    name: 'NanoStation 5AC Loco', sku: 'NS-5ACL', category: 'airmax-ptp', color: '#F97316', msrp: 59, status: 'current',
    frequency: '5 GHz', bandwidth: '450+ Mbps', range: 10, rangeUnit: 'km',
    antennaGain: 13, beamwidth: 55, modulation: 'airMAX AC',
    interface: '1 GbE', poe: 'PoE (8W)', weatherproof: 'IP65',
    mimo: '2x2', channelWidth: '20/40/80 MHz', txPower: 24,
    features: ['airMAX AC', 'Compact', 'Budget'],
    notes: 'Budget NanoStation',
    // Breiterer Sector (55°)
    elevation: [-1, 4, 9, 12, 13, 12, 9, 4, -1, -10],
    azimuth: [13, 12, 12, 11, 10, 8, 10, 11, 12, 12, 13, 12],
    beamwidthH: 55, beamwidthV: 18
  },

  // ==================== airFiber - High Capacity ====================
  'AF24': {
    name: 'airFiber 24', sku: 'AF24', category: 'airfiber', color: '#DC2626', msrp: 1499, status: 'current',
    frequency: '24 GHz', bandwidth: '1.4 Gbps', range: 13, rangeUnit: 'km',
    antennaGain: 33, beamwidth: 3, modulation: 'xRT',
    interface: '1 GbE', poe: '48V (40W)', weatherproof: 'IP67',
    mimo: '2x2', channelWidth: '100 MHz', txPower: 20,
    features: ['24 GHz', 'Full Duplex', 'Licensed Light'],
    notes: '24 GHz - 1.4 Gbps Full Duplex',
    // 33 dBi - sehr enger 3° Pencil Beam
    elevation: [-18, 2, 22, 31, 33, 31, 22, 2, -18, -35],
    azimuth: [33, 31, 22, 2, -18, -35, -18, 2, 22, 31, 33, 31],
    beamwidthH: 3, beamwidthV: 3
  },
  'AF24-HD': {
    name: 'airFiber 24 HD', sku: 'AF24-HD', category: 'airfiber', color: '#DC2626', msrp: 2999, status: 'current',
    frequency: '24 GHz', bandwidth: '2 Gbps', range: 20, rangeUnit: 'km',
    antennaGain: 40, beamwidth: 1.5, modulation: 'xRT',
    interface: '1 GbE', poe: '48V (50W)', weatherproof: 'IP67',
    mimo: '4x4', channelWidth: '100 MHz', txPower: 22,
    features: ['24 GHz', 'Full Duplex', '2 Gbps', 'MIMO 4x4'],
    notes: '24 GHz High Density - 2 Gbps',
    // 40 dBi - extrem enger 1.5° Beam
    elevation: [-25, -5, 25, 38, 40, 38, 25, -5, -25, -40],
    azimuth: [40, 38, 25, -5, -25, -40, -25, -5, 25, 38, 40, 38],
    beamwidthH: 1.5, beamwidthV: 1.5
  },
  'AF5XHD': {
    name: 'airFiber 5XHD', sku: 'AF5XHD', category: 'airfiber', color: '#DC2626', msrp: 499, status: 'current',
    frequency: '5 GHz', bandwidth: '1 Gbps', range: 100, rangeUnit: 'km',
    antennaGain: null, beamwidth: null, modulation: 'xRT',
    interface: '1 GbE', poe: 'PoE+ (20W)', weatherproof: 'IP67',
    mimo: '2x2', channelWidth: '10-100 MHz', txPower: 29,
    features: ['5 GHz', '1 Gbps', 'Ext. Antenna', 'Long Range'],
    notes: 'Benötigt externe Antenne (AF-5G Slant)',
    elevation: null, azimuth: null, beamwidthH: null, beamwidthV: null
  },
  'AF60-XR': {
    name: 'airFiber 60 XR', sku: 'AF60-XR', category: 'airfiber', color: '#DC2626', msrp: 999, status: 'new',
    frequency: '60 GHz + 5 GHz', bandwidth: '2.7 Gbps', range: 15, rangeUnit: 'km',
    antennaGain: 38, beamwidth: 3, modulation: '802.11ay',
    interface: '1 GbE + 10G SFP+', poe: 'PoE++ (50W)', weatherproof: 'IP67',
    mimo: '4x4', channelWidth: '2160 MHz', txPower: 40,
    features: ['60 GHz', '5 GHz Backup', '10G SFP+', 'Auto-Failover'],
    notes: '60 GHz mit 5 GHz Backup bei Regen',
    // 38 dBi @ 60 GHz - 3° Beam
    elevation: [-15, 5, 25, 36, 38, 36, 25, 5, -15, -30],
    azimuth: [38, 36, 25, 5, -15, -30, -15, 5, 25, 36, 38, 36],
    beamwidthH: 3, beamwidthV: 3
  },
  'AF60-LR': {
    name: 'airFiber 60 LR', sku: 'AF60-LR', category: 'airfiber', color: '#DC2626', msrp: 199, status: 'current',
    frequency: '60 GHz', bandwidth: '1.8 Gbps', range: 12, rangeUnit: 'km',
    antennaGain: 38, beamwidth: 3, modulation: '802.11ad',
    interface: '1 GbE', poe: 'PoE+ (15W)', weatherproof: 'IP66',
    mimo: null, channelWidth: '2160 MHz', txPower: 40,
    features: ['60 GHz', 'Compact', 'Budget'],
    notes: 'Budget 60 GHz Link',
    // 38 dBi - 3° Beam
    elevation: [-15, 5, 25, 36, 38, 36, 25, 5, -15, -30],
    azimuth: [38, 36, 25, 5, -15, -30, -15, 5, 25, 36, 38, 36],
    beamwidthH: 3, beamwidthV: 3
  },

  // ==================== GigaBeam - 60 GHz ====================
  'GBE': {
    name: 'GigaBeam', sku: 'GBE', category: 'gigabeam', color: '#14B8A6', msrp: 179, status: 'current',
    frequency: '60 GHz', bandwidth: '1+ Gbps', range: 500, rangeUnit: 'm',
    antennaGain: 35, beamwidth: 5, modulation: '802.11ad',
    interface: '1 GbE', poe: 'PoE (10W)', weatherproof: 'IP66',
    mimo: null, channelWidth: '2160 MHz', txPower: 40,
    features: ['60 GHz', 'Compact', 'Low Power'],
    notes: 'Compact 60 GHz link',
    // 35 dBi - 5° Beam
    elevation: [-12, 6, 22, 33, 35, 33, 22, 6, -12, -28],
    azimuth: [35, 33, 24, 8, -10, -25, -10, 8, 24, 33, 35, 33],
    beamwidthH: 5, beamwidthV: 5
  },
  'GBE-Plus': {
    name: 'GigaBeam Plus', sku: 'GBE-Plus', category: 'gigabeam', color: '#14B8A6', msrp: 249, status: 'current',
    frequency: '60 GHz', bandwidth: '2+ Gbps', range: 1.5, rangeUnit: 'km',
    antennaGain: 38, beamwidth: 3, modulation: '802.11ad',
    interface: '1 GbE', poe: 'PoE+ (15W)', weatherproof: 'IP66',
    mimo: null, channelWidth: '2160 MHz', txPower: 40,
    features: ['60 GHz', 'Extended Range', '2 Gbps'],
    notes: 'More range than GigaBeam',
    // 38 dBi - 3° Beam
    elevation: [-15, 5, 25, 36, 38, 36, 25, 5, -15, -30],
    azimuth: [38, 36, 25, 5, -15, -30, -15, 5, 25, 36, 38, 36],
    beamwidthH: 3, beamwidthV: 3
  },

  // ==================== UISP Antennen (Zubehör) ====================
  'AF-5G34-S45': {
    name: 'airFiber Slant 45', sku: 'AF-5G34-S45', category: 'antenna', color: '#6B7280', msrp: 199, status: 'current',
    frequency: '5 GHz', bandwidth: null, range: null, rangeUnit: null,
    antennaGain: 34, beamwidth: 3, modulation: null,
    interface: '2x RP-SMA', poe: null, weatherproof: 'IP67',
    mimo: '2x2', channelWidth: null, txPower: null,
    features: ['34 dBi', 'Slant 45°', 'Dish'],
    notes: 'Antenne für AF5XHD / Rocket',
    // 34 dBi Dish - 3° Beam
    elevation: [-16, 4, 23, 32, 34, 32, 23, 4, -16, -32],
    azimuth: [34, 32, 23, 4, -16, -32, -16, 4, 23, 32, 34, 32],
    beamwidthH: 3, beamwidthV: 3
  },
  'RD-5G30': {
    name: 'RocketDish 5G-30', sku: 'RD-5G30', category: 'antenna', color: '#6B7280', msrp: 99, status: 'current',
    frequency: '5 GHz', bandwidth: null, range: null, rangeUnit: null,
    antennaGain: 30, beamwidth: 5, modulation: null,
    interface: '2x RP-SMA', poe: null, weatherproof: 'IP67',
    mimo: '2x2', channelWidth: null, txPower: null,
    features: ['30 dBi', 'Dish'],
    notes: '60cm Dish für Rocket/LTU',
    // 30 dBi - 5° Beam
    elevation: [-12, 6, 20, 28, 30, 28, 20, 6, -12, -26],
    azimuth: [30, 28, 21, 8, -8, -22, -8, 8, 21, 28, 30, 28],
    beamwidthH: 5, beamwidthV: 5
  },
  'RD-5G34': {
    name: 'RocketDish 5G-34', sku: 'RD-5G34', category: 'antenna', color: '#6B7280', msrp: 179, status: 'current',
    frequency: '5 GHz', bandwidth: null, range: null, rangeUnit: null,
    antennaGain: 34, beamwidth: 3, modulation: null,
    interface: '2x RP-SMA', poe: null, weatherproof: 'IP67',
    mimo: '2x2', channelWidth: null, txPower: null,
    features: ['34 dBi', 'Dish', 'Long Range'],
    notes: '90cm dish for maximum range',
    // 34 dBi - 3° Beam
    elevation: [-16, 4, 23, 32, 34, 32, 23, 4, -16, -32],
    azimuth: [34, 32, 23, 4, -16, -32, -16, 4, 23, 32, 34, 32],
    beamwidthH: 3, beamwidthV: 3
  }
};
