export const switchData = {
  // Aggregation
  'USW-Aggregation': {
    name: 'Aggregation', sku: 'USW-Aggregation', category: 'aggregation',
    color: '#7C3AED', msrp: 299, eur: 289, status: 'current',
    ports: '8x SFP+', portCount: 8, speed: '10G SFP+',
    poe: null, poeBudget: 0, layer: 'L2', sfpPlus: 8, sfp28: 0,
    ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 0,
    features: [], formFactor: '1U Rack', power: 35,
    notes: 'SFP+ only aggregation'
  },
  'USW-Pro-Aggregation': {
    name: 'Hi-Capacity Aggregation', sku: 'USW-Pro-Aggregation', category: 'aggregation',
    color: '#7C3AED', msrp: 399, eur: 389, status: 'current',
    ports: '28x 10G SFP+ + 4x 25G SFP28', portCount: 32, speed: '25G SFP28',
    poe: null, poeBudget: 0, layer: 'L3', sfpPlus: 28, sfp28: 4,
    ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 0,
    features: ['L3', '25G'], formFactor: '1U Rack', power: 100,
    notes: 'High-capacity L3 aggregation'
  },
  'USW-Pro-XG-Aggregation': {
    name: 'Pro XG Aggregation', sku: 'USW-Pro-XG-Aggregation', category: 'aggregation',
    color: '#7C3AED', msrp: 699, eur: 679, status: 'current',
    ports: '32x 25G SFP28', portCount: 32, speed: '25G SFP28',
    poe: null, poeBudget: 0, layer: 'L3', sfpPlus: 0, sfp28: 32,
    ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 0,
    features: ['L3', '25G'], formFactor: '1U Rack', power: 200,
    notes: 'All 25G SFP28 ports'
  },
  'ECS-Aggregation': {
    name: 'Enterprise Campus Aggregation', sku: 'ECS-Aggregation', category: 'aggregation',
    color: '#7C3AED', msrp: 1499, eur: 1459, status: 'new',
    ports: '48x 25G SFP28 + 6x 100G QSFP28', portCount: 54, speed: '100G QSFP28',
    poe: null, poeBudget: 0, layer: 'L3', sfpPlus: 0, sfp28: 48,
    ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 0,
    features: ['L3', '100G', 'HA'], formFactor: '1U Rack', power: 150,
    notes: '100G backbone'
  },

  // Enterprise Campus
  'ECS-24-PoE': {
    name: 'Enterprise Campus 24 PoE', sku: 'ECS-24-PoE', category: 'enterprise',
    color: '#DC2626', msrp: 1299, eur: 1269, status: 'current',
    ports: '24x 2.5G + 2x 25G SFP28', portCount: 26, speed: '2.5G / 25G',
    poe: 'PoE++', poeBudget: 400, layer: 'L3', sfpPlus: 0, sfp28: 2,
    ethernet1g: 0, ethernet2_5g: 24, ethernet10g: 0,
    features: ['L3', 'PoE++', 'HA', 'Etherlighting'], formFactor: '1U Rack', power: 500,
    notes: 'HA + PoE++ for APs'
  },
  'ECS-48-PoE': {
    name: 'Enterprise Campus 48 PoE', sku: 'ECS-48-PoE', category: 'enterprise',
    color: '#DC2626', msrp: 2499, eur: 2449, status: 'current',
    ports: '48x 2.5G + 4x 25G SFP28', portCount: 52, speed: '2.5G / 25G',
    poe: 'PoE++', poeBudget: 720, layer: 'L3', sfpPlus: 0, sfp28: 4,
    ethernet1g: 0, ethernet2_5g: 48, ethernet10g: 0,
    features: ['L3', 'PoE++', 'HA', 'Etherlighting'], formFactor: '1U Rack', power: 900,
    notes: 'HA Campus switch'
  },
  'ECS-24S-PoE': {
    name: 'Enterprise Campus 24S PoE', sku: 'ECS-24S-PoE', category: 'enterprise',
    color: '#DC2626', msrp: 1999, status: 'new',
    ports: '16x 10G + 8x 2.5G + 4x 25G SFP28 + 2x 100G QSFP28', portCount: 30, speed: '10G / 25G / 100G',
    poe: 'PoE+++', poeBudget: 1050, layer: 'L3', sfpPlus: 0, sfp28: 4,
    ethernet1g: 0, ethernet2_5g: 8, ethernet10g: 16,
    features: ['L3', 'PoE+++', 'HA', '10G', '100G'], formFactor: '1U Rack', power: 1200,
    notes: '16x 10G + 8x 2.5G PoE+++ — 100G QSFP28 uplinks'
  },
  'ECS-48S-PoE': {
    name: 'Enterprise Campus 48S PoE', sku: 'ECS-48S-PoE', category: 'enterprise',
    color: '#DC2626', msrp: 3499, status: 'new',
    ports: '16x 10G + 32x 2.5G + 4x 25G SFP28 + 2x 100G QSFP28', portCount: 54, speed: '10G / 25G / 100G',
    poe: 'PoE+++', poeBudget: 2150, layer: 'L3', sfpPlus: 0, sfp28: 4,
    ethernet1g: 0, ethernet2_5g: 32, ethernet10g: 16,
    features: ['L3', 'PoE+++', 'HA', '10G', '100G'], formFactor: '1U Rack', power: 2400,
    notes: '16x 10G + 32x 2.5G PoE+++ — 100G QSFP28 uplinks'
  },
  'USW-Enterprise-48-PoE': {
    name: 'Enterprise 48 PoE', sku: 'USW-Enterprise-48-PoE', category: 'enterprise',
    color: '#DC2626', msrp: 1299, status: 'legacy',
    ports: '48x 2.5G + 4x 10G SFP+', portCount: 52, speed: '2.5G / 10G',
    poe: 'PoE+', poeBudget: 720, layer: 'L3', sfpPlus: 4, sfp28: 0,
    ethernet1g: 0, ethernet2_5g: 48, ethernet10g: 0,
    features: ['L3', 'PoE+'], formFactor: '1U Rack', power: 900,
    notes: 'Gen1 Enterprise'
  },

  // Pro XG Series (NEW)
  'USW-Pro-XG-8-PoE': {
    name: 'Pro XG 8 PoE', sku: 'USW-Pro-XG-8-PoE', category: 'pro-xg',
    color: '#14B8A6', msrp: 499, status: 'new',
    ports: '8x 10G + 2x 10G SFP+', portCount: 10, speed: '10G',
    poe: 'PoE++', poeBudget: 155, layer: 'L3', sfpPlus: 2, sfp28: 0,
    ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 8,
    features: ['L3', 'PoE++', '10G', 'Etherlighting'], formFactor: 'Desktop/Rack', power: 200,
    notes: 'Compact 10G PoE'
  },
  'USW-Pro-XG-10-PoE': {
    name: 'Pro XG 10 PoE', sku: 'USW-Pro-XG-10-PoE', category: 'pro-xg',
    color: '#14B8A6', msrp: 799, status: 'new',
    ports: '10x 10G + 2x 10G SFP+', portCount: 12, speed: '10G',
    poe: 'PoE+++', poeBudget: 400, layer: 'L3', sfpPlus: 2, sfp28: 0,
    ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 10,
    features: ['L3', 'PoE+++', '10G', 'Etherlighting', 'Display'], formFactor: '1U Rack', power: 500,
    notes: '10G PoE+++ with display'
  },
  'USW-Pro-XG-24': {
    name: 'Pro XG 24', sku: 'USW-Pro-XG-24', category: 'pro-xg',
    color: '#14B8A6', msrp: 999, status: 'new',
    ports: '24x 10G + 2x 25G SFP28', portCount: 26, speed: '10G / 25G',
    poe: null, poeBudget: 0, layer: 'L3', sfpPlus: 0, sfp28: 2,
    ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 24,
    features: ['L3', '10G', '25G'], formFactor: '1U Rack', power: 100,
    notes: '24x 10G non-PoE'
  },
  'USW-Pro-XG-24-PoE': {
    name: 'Pro XG 24 PoE', sku: 'USW-Pro-XG-24-PoE', category: 'pro-xg',
    color: '#14B8A6', msrp: 1499, status: 'new',
    ports: '24x 10G + 2x 25G SFP28', portCount: 26, speed: '10G / 25G',
    poe: 'PoE+++', poeBudget: 720, layer: 'L3', sfpPlus: 0, sfp28: 2,
    ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 24,
    features: ['L3', 'PoE+++', '10G', '25G', 'Etherlighting'], formFactor: '1U Rack', power: 900,
    notes: '24x 10G PoE+++'
  },
  'USW-Pro-XG-48': {
    name: 'Pro XG 48', sku: 'USW-Pro-XG-48', category: 'pro-xg',
    color: '#14B8A6', msrp: 1799, status: 'new',
    ports: '48x 10G + 4x 25G SFP28', portCount: 52, speed: '10G / 25G',
    poe: null, poeBudget: 0, layer: 'L3', sfpPlus: 0, sfp28: 4,
    ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 48,
    features: ['L3', '10G', '25G'], formFactor: '1U Rack', power: 150,
    notes: '48x 10G non-PoE'
  },
  'USW-Pro-XG-48-PoE': {
    name: 'Pro XG 48 PoE', sku: 'USW-Pro-XG-48-PoE', category: 'pro-xg',
    color: '#14B8A6', msrp: 2499, status: 'new',
    ports: '48x 10G + 4x 25G SFP28', portCount: 52, speed: '10G / 25G',
    poe: 'PoE+++', poeBudget: 1440, layer: 'L3', sfpPlus: 0, sfp28: 4,
    ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 48,
    features: ['L3', 'PoE+++', '10G', '25G', 'Etherlighting'], formFactor: '1U Rack', power: 1600,
    notes: '48x 10G PoE+++'
  },

  // Pro Max Series
  'USW-Pro-Max-16': {
    name: 'Pro Max 16', sku: 'USW-Pro-Max-16', category: 'pro-max',
    color: '#8B5CF6', msrp: 249, status: 'current',
    ports: '16x 2.5G + 2x 10G SFP+', portCount: 18, speed: '2.5G / 10G',
    poe: null, poeBudget: 0, layer: 'L3', sfpPlus: 2, sfp28: 0,
    ethernet1g: 0, ethernet2_5g: 16, ethernet10g: 0,
    features: ['L3', 'Etherlighting'], formFactor: 'Desktop/Rack', power: 30,
    notes: '2.5G L3 compact'
  },
  'USW-Pro-Max-16-PoE': {
    name: 'Pro Max 16 PoE', sku: 'USW-Pro-Max-16-PoE', category: 'pro-max',
    color: '#8B5CF6', msrp: 399, status: 'current',
    ports: '16x 2.5G + 2x 10G SFP+', portCount: 18, speed: '2.5G / 10G',
    poe: 'PoE++', poeBudget: 180, layer: 'L3', sfpPlus: 2, sfp28: 0,
    ethernet1g: 0, ethernet2_5g: 16, ethernet10g: 0,
    features: ['L3', 'PoE++', 'Etherlighting'], formFactor: 'Desktop/Rack', power: 220,
    notes: '2.5G PoE++ compact'
  },
  'USW-Pro-Max-24': {
    name: 'Pro Max 24', sku: 'USW-Pro-Max-24', category: 'pro-max',
    color: '#8B5CF6', msrp: 349, status: 'current',
    ports: '24x 2.5G + 2x 10G SFP+', portCount: 26, speed: '2.5G / 10G',
    poe: null, poeBudget: 0, layer: 'L3', sfpPlus: 2, sfp28: 0,
    ethernet1g: 0, ethernet2_5g: 24, ethernet10g: 0,
    features: ['L3', 'Etherlighting'], formFactor: '1U Rack', power: 45,
    notes: '24x 2.5G non-PoE'
  },
  'USW-Pro-Max-24-PoE': {
    name: 'Pro Max 24 PoE', sku: 'USW-Pro-Max-24-PoE', category: 'pro-max',
    color: '#8B5CF6', msrp: 599, status: 'current',
    ports: '16x 1G + 8x 2.5G + 2x 10G SFP+', portCount: 26, speed: '2.5G / 10G',
    poe: 'PoE++', poeBudget: 400, layer: 'L3', sfpPlus: 2, sfp28: 0,
    ethernet1g: 16, ethernet2_5g: 8, ethernet10g: 0,
    features: ['L3', 'PoE++', 'Etherlighting'], formFactor: '1U Rack', power: 500,
    notes: 'Mixed 1G/2.5G PoE++'
  },
  'USW-Pro-Max-48': {
    name: 'Pro Max 48', sku: 'USW-Pro-Max-48', category: 'pro-max',
    color: '#8B5CF6', msrp: 599, status: 'current',
    ports: '48x 2.5G + 4x 10G SFP+', portCount: 52, speed: '2.5G / 10G',
    poe: null, poeBudget: 0, layer: 'L3', sfpPlus: 4, sfp28: 0,
    ethernet1g: 0, ethernet2_5g: 48, ethernet10g: 0,
    features: ['L3', 'Etherlighting'], formFactor: '1U Rack', power: 80,
    notes: '48x 2.5G non-PoE'
  },
  'USW-Pro-Max-48-PoE': {
    name: 'Pro Max 48 PoE', sku: 'USW-Pro-Max-48-PoE', category: 'pro-max',
    color: '#8B5CF6', msrp: 999, status: 'current',
    ports: '32x 1G + 16x 2.5G + 4x 10G SFP+', portCount: 52, speed: '2.5G / 10G',
    poe: 'PoE++', poeBudget: 720, layer: 'L3', sfpPlus: 4, sfp28: 0,
    ethernet1g: 32, ethernet2_5g: 16, ethernet10g: 0,
    features: ['L3', 'PoE++', 'Etherlighting'], formFactor: '1U Rack', power: 900,
    notes: 'Mixed 1G/2.5G PoE++'
  },

  // Pro Series (Gen2)
  'USW-Pro-24': {
    name: 'Pro 24', sku: 'USW-Pro-24', category: 'pro',
    color: '#3B82F6', msrp: 299, status: 'current',
    ports: '24x 1G + 2x 10G SFP+', portCount: 26, speed: '1G / 10G',
    poe: null, poeBudget: 0, layer: 'L3', sfpPlus: 2, sfp28: 0,
    ethernet1g: 24, ethernet2_5g: 0, ethernet10g: 0,
    features: ['L3'], formFactor: '1U Rack', power: 30,
    notes: '24x 1G L3'
  },
  'USW-Pro-24-PoE': {
    name: 'Pro 24 PoE', sku: 'USW-Pro-24-PoE', category: 'pro',
    color: '#3B82F6', msrp: 499, status: 'current',
    ports: '24x 1G + 2x 10G SFP+', portCount: 26, speed: '1G / 10G',
    poe: 'PoE+', poeBudget: 400, layer: 'L3', sfpPlus: 2, sfp28: 0,
    ethernet1g: 24, ethernet2_5g: 0, ethernet10g: 0,
    features: ['L3', 'PoE+'], formFactor: '1U Rack', power: 500,
    notes: '24x 1G PoE+'
  },
  'USW-Pro-48': {
    name: 'Pro 48', sku: 'USW-Pro-48', category: 'pro',
    color: '#3B82F6', msrp: 499, status: 'current',
    ports: '48x 1G + 4x 10G SFP+', portCount: 52, speed: '1G / 10G',
    poe: null, poeBudget: 0, layer: 'L3', sfpPlus: 4, sfp28: 0,
    ethernet1g: 48, ethernet2_5g: 0, ethernet10g: 0,
    features: ['L3'], formFactor: '1U Rack', power: 50,
    notes: '48x 1G L3'
  },
  'USW-Pro-48-PoE': {
    name: 'Pro 48 PoE', sku: 'USW-Pro-48-PoE', category: 'pro',
    color: '#3B82F6', msrp: 799, status: 'current',
    ports: '48x 1G + 4x 10G SFP+', portCount: 52, speed: '1G / 10G',
    poe: 'PoE+', poeBudget: 600, layer: 'L3', sfpPlus: 4, sfp28: 0,
    ethernet1g: 48, ethernet2_5g: 0, ethernet10g: 0,
    features: ['L3', 'PoE+'], formFactor: '1U Rack', power: 750,
    notes: '48x 1G PoE+'
  },

  // Standard Series
  'USW-24': {
    name: 'Standard 24', sku: 'USW-24', category: 'standard',
    color: '#6B7280', msrp: 199, status: 'current',
    ports: '24x 1G + 2x 1G SFP', portCount: 26, speed: '1G',
    poe: null, poeBudget: 0, layer: 'L2', sfpPlus: 0, sfp28: 0,
    ethernet1g: 24, ethernet2_5g: 0, ethernet10g: 0,
    features: [], formFactor: '1U Rack', power: 20,
    notes: 'Basic 24-port'
  },
  'USW-24-PoE': {
    name: 'Standard 24 PoE', sku: 'USW-24-PoE', category: 'standard',
    color: '#6B7280', msrp: 349, status: 'current',
    ports: '24x 1G + 2x 1G SFP', portCount: 26, speed: '1G',
    poe: 'PoE+', poeBudget: 95, layer: 'L2', sfpPlus: 0, sfp28: 0,
    ethernet1g: 24, ethernet2_5g: 0, ethernet10g: 0,
    features: ['PoE+', 'Fanless'], formFactor: '1U Rack', power: 130,
    notes: 'Fanless, low PoE budget'
  },
  'USW-48': {
    name: 'Standard 48', sku: 'USW-48', category: 'standard',
    color: '#6B7280', msrp: 349, status: 'current',
    ports: '48x 1G + 4x 1G SFP', portCount: 52, speed: '1G',
    poe: null, poeBudget: 0, layer: 'L2', sfpPlus: 0, sfp28: 0,
    ethernet1g: 48, ethernet2_5g: 0, ethernet10g: 0,
    features: [], formFactor: '1U Rack', power: 35,
    notes: 'Basic 48-port'
  },
  'USW-48-PoE': {
    name: 'Standard 48 PoE', sku: 'USW-48-PoE', category: 'standard',
    color: '#6B7280', msrp: 599, status: 'current',
    ports: '48x 1G + 4x 1G SFP', portCount: 52, speed: '1G',
    poe: 'PoE+', poeBudget: 195, layer: 'L2', sfpPlus: 0, sfp28: 0,
    ethernet1g: 48, ethernet2_5g: 0, ethernet10g: 0,
    features: ['PoE+'], formFactor: '1U Rack', power: 260,
    notes: 'Budget 48-port PoE'
  },

  // Utility / Flex Series
  'USW-Flex-Mini': {
    name: 'Flex Mini', sku: 'USW-Flex-Mini', category: 'utility',
    color: '#059669', msrp: 29, status: 'current',
    ports: '5x 1G', portCount: 5, speed: '1G',
    poe: null, poeBudget: 0, layer: 'L2', sfpPlus: 0, sfp28: 0,
    ethernet1g: 5, ethernet2_5g: 0, ethernet10g: 0,
    features: ['USB-C powered'], formFactor: 'Desktop', power: 5,
    notes: 'Tiny desktop switch'
  },
  'USW-Flex-2.5G-5': {
    name: 'Flex Mini 2.5G', sku: 'USW-Flex-2.5G-5', category: 'utility',
    color: '#059669', msrp: 79, status: 'current',
    ports: '5x 2.5G', portCount: 5, speed: '2.5G',
    poe: null, poeBudget: 0, layer: 'L2', sfpPlus: 0, sfp28: 0,
    ethernet1g: 0, ethernet2_5g: 5, ethernet10g: 0,
    features: ['USB-C powered', 'PoE in'], formFactor: 'Desktop', power: 8,
    notes: '5x 2.5G mini'
  },
  'USW-Flex': {
    name: 'Flex', sku: 'USW-Flex', category: 'utility',
    color: '#059669', msrp: 99, status: 'current',
    ports: '5x 1G', portCount: 5, speed: '1G',
    poe: 'PoE+', poeBudget: 46, layer: 'L2', sfpPlus: 0, sfp28: 0,
    ethernet1g: 5, ethernet2_5g: 0, ethernet10g: 0,
    features: ['PoE+', 'PoE passthrough', 'IP55'], formFactor: 'Compact', power: 60,
    notes: 'PoE-powered outdoor'
  },
  'USW-Flex-XG': {
    name: 'Flex 10 GbE', sku: 'USW-Flex-XG', category: 'utility',
    color: '#059669', msrp: 299, status: 'current',
    ports: '4x 10G', portCount: 4, speed: '10G',
    poe: null, poeBudget: 0, layer: 'L2', sfpPlus: 0, sfp28: 0,
    ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 4,
    features: ['USB-C powered', 'PoE in'], formFactor: 'Compact', power: 15,
    notes: 'Compact 4x 10G'
  },
  'USW-Flex-2.5G-8': {
    name: 'Flex 2.5G', sku: 'USW-Flex-2.5G-8', category: 'utility',
    color: '#059669', msrp: 169, status: 'current',
    ports: '8x 2.5G', portCount: 8, speed: '2.5G',
    poe: null, poeBudget: 0, layer: 'L2', sfpPlus: 0, sfp28: 0,
    ethernet1g: 0, ethernet2_5g: 8, ethernet10g: 0,
    features: ['PoE in'], formFactor: 'Compact', power: 20,
    notes: '8x 2.5G compact'
  },
  'USW-Flex-2.5G-8-PoE': {
    name: 'Flex 2.5G PoE', sku: 'USW-Flex-2.5G-8-PoE', category: 'utility',
    color: '#059669', msrp: 249, status: 'current',
    ports: '8x 2.5G', portCount: 8, speed: '2.5G',
    poe: 'PoE++', poeBudget: 120, layer: 'L2', sfpPlus: 0, sfp28: 0,
    ethernet1g: 0, ethernet2_5g: 8, ethernet10g: 0,
    features: ['PoE++', 'PoE in'], formFactor: 'Compact', power: 150,
    notes: '8x 2.5G PoE++'
  },
  'USW-Lite-8-PoE': {
    name: 'Lite 8 PoE', sku: 'USW-Lite-8-PoE', category: 'utility',
    color: '#059669', msrp: 109, status: 'current',
    ports: '8x 1G', portCount: 8, speed: '1G',
    poe: 'PoE+', poeBudget: 52, layer: 'L2', sfpPlus: 0, sfp28: 0,
    ethernet1g: 8, ethernet2_5g: 0, ethernet10g: 0,
    features: ['PoE+', 'Fanless'], formFactor: 'Desktop', power: 70,
    notes: 'Budget PoE 8-port'
  },
  'USW-Lite-16-PoE': {
    name: 'Lite 16 PoE', sku: 'USW-Lite-16-PoE', category: 'utility',
    color: '#059669', msrp: 179, status: 'current',
    ports: '16x 1G', portCount: 16, speed: '1G',
    poe: 'PoE+', poeBudget: 45, layer: 'L2', sfpPlus: 0, sfp28: 0,
    ethernet1g: 16, ethernet2_5g: 0, ethernet10g: 0,
    features: ['PoE+', 'Fanless'], formFactor: 'Desktop', power: 70,
    notes: 'Budget PoE 16-port'
  },
  'USW-Ultra': {
    name: 'Ultra', sku: 'USW-Ultra', category: 'utility',
    color: '#059669', msrp: 49, status: 'current',
    ports: '8x 1G', portCount: 8, speed: '1G',
    poe: null, poeBudget: 0, layer: 'L2', sfpPlus: 0, sfp28: 0,
    ethernet1g: 8, ethernet2_5g: 0, ethernet10g: 0,
    features: ['Fanless'], formFactor: 'Desktop', power: 10,
    notes: 'Compact 8-port'
  },
  'USW-Ultra-60W': {
    name: 'Ultra 60W', sku: 'USW-Ultra-60W', category: 'utility',
    color: '#059669', msrp: 109, status: 'current',
    ports: '8x 1G', portCount: 8, speed: '1G',
    poe: 'PoE+', poeBudget: 42, layer: 'L2', sfpPlus: 0, sfp28: 0,
    ethernet1g: 8, ethernet2_5g: 0, ethernet10g: 0,
    features: ['PoE+', 'Fanless'], formFactor: 'Desktop', power: 60,
    notes: 'Compact PoE 8-port'
  },
  'USW-Ultra-210W': {
    name: 'Ultra 210W', sku: 'USW-Ultra-210W', category: 'utility',
    color: '#059669', msrp: 179, status: 'current',
    ports: '8x 1G', portCount: 8, speed: '1G',
    poe: 'PoE++', poeBudget: 180, layer: 'L2', sfpPlus: 0, sfp28: 0,
    ethernet1g: 8, ethernet2_5g: 0, ethernet10g: 0,
    features: ['PoE++', 'Fanless'], formFactor: 'Desktop', power: 210,
    notes: 'High-power compact'
  },
  'USW-Industrial': {
    name: 'Industrial', sku: 'USW-Industrial', category: 'utility',
    color: '#059669', msrp: 499, status: 'current',
    ports: '10x 1G', portCount: 10, speed: '1G',
    poe: 'PoE++', poeBudget: 450, layer: 'L2', sfpPlus: 0, sfp28: 0,
    ethernet1g: 10, ethernet2_5g: 0, ethernet10g: 0,
    features: ['PoE++', 'IP55', 'DIN rail', '-40°C'], formFactor: 'Industrial', power: 500,
    notes: 'Extreme environment'
  }
};
