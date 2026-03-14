import React, { useState, useMemo } from 'react';

export default function UniFiNetworkPortal() {
  const [activeSection, setActiveSection] = useState('wifi');
  const [selectedAP, setSelectedAP] = useState('U7-Pro');
  const [selectedSwitch, setSelectedSwitch] = useState('USW-Pro-Max-24-PoE');
  const [selectedCamera, setSelectedCamera] = useState('G6-Bullet');
  const [selectedGateway, setSelectedGateway] = useState('UDM-Pro-Max');
  const [selectedNVR, setSelectedNVR] = useState('UNVR-Pro');
  const [selectedNAS, setSelectedNAS] = useState('UNAS-Pro');
  const [selectedBridge, setSelectedBridge] = useState('PBE-5AC-Gen2');
  const [selectedBand, setSelectedBand] = useState('5GHz');
  const [activeTab, setActiveTab] = useState('overview');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [switchCategoryFilter, setSwitchCategoryFilter] = useState('all');
  const [cameraCategoryFilter, setCameraCategoryFilter] = useState('all');
  const [gatewayCategoryFilter, setGatewayCategoryFilter] = useState('all');
  const [nvrCategoryFilter, setNvrCategoryFilter] = useState('all');
  const [nasCategoryFilter, setNasCategoryFilter] = useState('all');
  const [bridgeCategoryFilter, setBridgeCategoryFilter] = useState('all');
  const [showHelp, setShowHelp] = useState(false);
  const [showRadiationModal, setShowRadiationModal] = useState(false);
  const [cart, setCart] = useState([]);

  const toggleCart = (sku, name, msrp, section, color) => {
    setCart(prev => prev.find(i => i.sku === sku)
      ? prev.filter(i => i.sku !== sku)
      : [...prev, { sku, name, msrp, section, color, qty: 1 }]
    );
  };
  const updateCartQty = (sku, delta) => setCart(prev =>
    prev.map(i => i.sku === sku ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0)
  );
  const removeFromCart = (sku) => setCart(prev => prev.filter(i => i.sku !== sku));
  const isInCart = (sku) => cart.some(i => i.sku === sku);

  // Deutsche Preisformatierung
  const formatPrice = (price) => {
    return price.toLocaleString('de-DE') + ' €';
  };

  // Geizhals Link Generator
  const getGeizhalsLink = (sku) => {
    const searchTerm = encodeURIComponent(sku);
    return `https://geizhals.de/?fs=${searchTerm}`;
  };

  // Offizielles Datenblatt Link Generator
  const getDatasheetLink = (sku, type) => {
    const skuLower = sku.toLowerCase();
    const baseUrl = 'https://techspecs.ui.com/unifi';
    
    // Access Points
    if (type === 'ap') {
      // Mapping für APs
      const apMappings = {
        'uap-ac-lite': 'unifi-ap-ac-lite',
        'uap-ac-pro': 'unifi-ap-ac-pro',
        'uap-nanohd': 'uap-nanohd',
        'uap-flexhd': 'uap-flexhd',
        'u6-lite': 'u6-lite',
        'u6-plus': 'u6-plus',
        'u6-lr': 'u6-lr',
        'u6-pro': 'u6-pro',
        'u6-mesh': 'u6-mesh',
        'u6-mesh-pro': 'u6-mesh-pro',
        'u6-iw': 'u6-iw',
        'u6-extender': 'u6-extender',
        'u6-enterprise': 'u6-enterprise',
        'u6-enterprise-iw': 'u6-enterprise-iw',
        'u7-lite': 'u7-lite',
        'u7-lr': 'u7-lr',
        'u7-pro': 'u7-pro',
        'u7-pro-max': 'u7-pro-max',
        'u7-pro-xg': 'u7-pro-xg',
        'u7-pro-xgs': 'u7-pro-xgs',
        'u7-iw': 'u7-iw',
        'u7-pro-wall': 'u7-pro-wall',
        'u7-outdoor': 'u7-outdoor',
        'u7-pro-outdoor': 'u7-pro-outdoor',
        'e7': 'unifi-e7',
        'e7-campus': 'unifi-e7-campus',
        'e7-audience': 'unifi-e7-audience'
      };
      const mapped = apMappings[skuLower] || skuLower;
      return `${baseUrl}/wifi/${mapped}`;
    }
    
    // Switches
    if (type === 'switch') {
      return `${baseUrl}/switching/${skuLower}`;
    }
    
    // Gateways
    if (type === 'gateway') {
      const gwMappings = {
        'ucg-ultra': 'ucg-ultra',
        'ucg-max': 'ucg-max',
        'ux7': 'ux7',
        'ucg-fiber': 'ucg-fiber',
        'udr7': 'udr7',
        'udm-pro': 'udm-pro',
        'udm-se': 'udm-se',
        'udm-pro-max': 'udm-pro-max',
        'efg': 'efg',
        'uxg-enterprise': 'uxg-enterprise',
        'udw': 'udw',
        'udr-5g-max': 'udr-5g-max'
      };
      const mapped = gwMappings[skuLower] || skuLower;
      return `${baseUrl}/cloud-gateways/${mapped}`;
    }
    
    // Cameras
    if (type === 'camera') {
      const camMappings = {
        'uvc-g6-bullet': 'uvc-g6-bullet',
        'uvc-g6-turret': 'uvc-g6-turret',
        'uvc-g6-dome': 'uvc-g6-dome',
        'uvc-g6-ins': 'uvc-g6-instant',
        'uvc-g6-pro-bullet': 'uvc-g6-pro-bullet',
        'uvc-g6-ptz': 'uvc-g6-ptz',
        'uvc-g6-180': 'uvc-g6-180',
        'uvc-g5-bullet': 'uvc-g5-bullet',
        'uvc-g5-turret-ultra': 'uvc-g5-turret-ultra',
        'uvc-g5-dome-ultra': 'uvc-g5-dome-ultra',
        'uvc-g5-flex': 'uvc-g5-flex',
        'uvc-g5-pro': 'uvc-g5-pro',
        'uvc-g5-ptz': 'uvc-g5-ptz',
        'uvc-ai-pro': 'uvc-ai-pro',
        'uvc-ai-bullet': 'uvc-ai-bullet',
        'uvc-ai-turret': 'uvc-ai-turret',
        'uvc-ai-dome': 'uvc-ai-dome',
        'uvc-ai-360': 'uvc-ai-360',
        'uvc-ai-lpr': 'uvc-ai-theta-lpr',
        'uvc-ai-dslr': 'uvc-ai-dslr',
        'uvc-ai-ptz': 'uvc-ai-ptz',
        'uvc-ai-ptz-precision': 'uvc-ai-ptz-precision',
        'uvc-ai-theta': 'uvc-ai-theta',
        'uvc-g4-doorbell-pro': 'uvc-g4-doorbell-pro',
        'uvc-g4-doorbell-pro-poe': 'uvc-g4-doorbell-pro-poe',
        'uvc-doorbell-lite': 'uvc-g4-doorbell'
      };
      const mapped = camMappings[skuLower] || skuLower;
      return `${baseUrl}/cameras/${mapped}`;
    }
    
    return `https://techspecs.ui.com/?search=${encodeURIComponent(sku)}`;
  };

  // ==================== ACCESS POINT DATA ====================
  const apData = {
    // Wi-Fi 5 Legacy
    'AC-Lite': {
      name: 'UAP-AC-Lite', sku: 'UAP-AC-Lite', generation: 'Wi-Fi 5', category: 'flagship',
      color: '#6B7280', msrp: 89, eur: 79, geizhals: 'https://geizhals.de/ubiquiti-unifi-ap-ac-lite-uap-ac-lite-a1325799.html', status: 'legacy',
      radio24: { mimo: '2x2', txPower: 20, gain: 3, maxRate: 300 },
      radio5: { mimo: '2x2', txPower: 20, gain: 3, maxRate: 867 },
      radio6: null, streams: 4, coverage: 115, clients: '250+',
      ethernet: '1 GbE', poe: 'PoE (6.5W)', mount: 'Ceiling/Wall',
      features: [], notes: 'Legacy - consider Wi-Fi 6/7',
      elevation: { '2.4GHz': [0, 2.5, 2.8, 3, 2.8, 2.5, 2, 1.2, 0.3, -2], '5GHz': [0, 2.5, 2.9, 3, 2.7, 2.3, 1.8, 1, 0.1, -3] },
      azimuth: { '2.4GHz': [3, 2.9, 3, 2.9, 3, 2.9, 3, 2.9, 3, 2.9, 3, 2.9], '5GHz': [3, 2.8, 2.9, 2.7, 3, 2.8, 2.9, 2.7, 3, 2.8, 2.9, 2.7] },
      beamwidth: { h: 360, v: 110 }
    },
    'AC-Pro': {
      name: 'UAP-AC-Pro', sku: 'UAP-AC-Pro', generation: 'Wi-Fi 5', category: 'flagship',
      color: '#6B7280', msrp: 149, eur: 139, geizhals: 'https://geizhals.de/ubiquiti-unifi-ap-ac-pro-uap-ac-pro-a1325803.html', status: 'legacy',
      radio24: { mimo: '3x3', txPower: 22, gain: 3, maxRate: 450 },
      radio5: { mimo: '3x3', txPower: 22, gain: 3, maxRate: 1300 },
      radio6: null, streams: 6, coverage: 140, clients: '250+',
      ethernet: '2x 1 GbE', poe: 'PoE (9W)', mount: 'Ceiling/Wall',
      features: [], notes: 'Legacy - consider U7-Pro',
      elevation: { '2.4GHz': [0, 2.5, 2.8, 3, 2.8, 2.5, 2, 1.2, 0.3, -2], '5GHz': [0, 2.6, 2.9, 3, 2.8, 2.4, 1.9, 1.1, 0.2, -2.5] },
      azimuth: { '2.4GHz': [3, 2.9, 3, 2.9, 3, 2.9, 3, 2.9, 3, 2.9, 3, 2.9], '5GHz': [3, 2.8, 2.9, 2.7, 3, 2.8, 2.9, 2.7, 3, 2.8, 2.9, 2.7] },
      beamwidth: { h: 360, v: 110 }
    },
    'nanoHD': {
      name: 'UAP-nanoHD', sku: 'UAP-nanoHD', generation: 'Wi-Fi 5', category: 'flagship',
      color: '#6B7280', msrp: 99, eur: 89, geizhals: 'https://geizhals.de/?fs=UAP-nanoHD', status: 'legacy',
      radio24: { mimo: '2x2', txPower: 23, gain: 2.8, maxRate: 300 },
      radio5: { mimo: '4x4', txPower: 26, gain: 3, maxRate: 1700 },
      radio6: null, streams: 6, coverage: 115, clients: '200+',
      ethernet: '1 GbE', poe: 'PoE (10.5W)', mount: 'Ceiling/Wall',
      features: ['BLE'], notes: 'Compact 4x4 Wi-Fi 5',
      elevation: { '2.4GHz': [0, 2.4, 2.7, 2.8, 2.7, 2.4, 1.9, 1.1, 0.2, -2], '5GHz': [-0.5, 2.5, 2.8, 3, 2.8, 2.4, 1.8, 1, 0, -2.5] },
      azimuth: { '2.4GHz': [2.8, 2.7, 2.8, 2.7, 2.8, 2.7, 2.8, 2.7, 2.8, 2.7, 2.8, 2.7], '5GHz': [3, 2.8, 2.9, 2.7, 3, 2.8, 2.9, 2.7, 3, 2.8, 2.9, 2.7] },
      beamwidth: { h: 360, v: 105 }
    },
    'FlexHD': {
      name: 'UAP-FlexHD', sku: 'UAP-FlexHD', generation: 'Wi-Fi 5', category: 'flagship',
      color: '#6B7280', msrp: 149, eur: 129, geizhals: 'https://geizhals.de/?fs=UAP-FlexHD', status: 'legacy',
      radio24: { mimo: '2x2', txPower: 23, gain: 3, maxRate: 300 },
      radio5: { mimo: '4x4', txPower: 26, gain: 3, maxRate: 1733 },
      radio6: null, streams: 6, coverage: 115, clients: '200+',
      ethernet: '1 GbE', poe: 'PoE (11W)', mount: 'Ceiling/Wall/Tisch',
      features: ['BLE', 'Flex-Mount'], notes: 'Flexible Montage (Decke/Wand/Tisch)',
      elevation: { '2.4GHz': [0, 2.4, 2.7, 3, 2.7, 2.4, 1.9, 1.1, 0.2, -2], '5GHz': [-0.5, 2.5, 2.8, 3, 2.8, 2.4, 1.8, 1, 0, -2.5] },
      azimuth: { '2.4GHz': [3, 2.9, 3, 2.9, 3, 2.9, 3, 2.9, 3, 2.9, 3, 2.9], '5GHz': [3, 2.8, 2.9, 2.7, 3, 2.8, 2.9, 2.7, 3, 2.8, 2.9, 2.7] },
      beamwidth: { h: 360, v: 105 }
    },
    // Wi-Fi 6
    'U6-Lite': {
      name: 'U6-Lite', sku: 'U6-Lite', generation: 'Wi-Fi 6', category: 'flagship',
      color: '#F97316', msrp: 99, eur: 89, geizhals: 'https://geizhals.de/?fs=U6-Lite', status: 'current',
      radio24: { mimo: '2x2', txPower: 20, gain: 3, maxRate: 300 },
      radio5: { mimo: '2x2', txPower: 23, gain: 4, maxRate: 1201 },
      radio6: null, streams: 4, coverage: 115, clients: '300+',
      ethernet: '1 GbE', poe: 'PoE (12W)', mount: 'Ceiling/Wall',
      features: ['BLE'], notes: 'Einstieg Wi-Fi 6',
      elevation: { '2.4GHz': [0, 2.5, 2.8, 3, 2.8, 2.5, 2, 1.2, 0.3, -2], '5GHz': [-0.5, 2.8, 3.5, 4, 3.5, 2.8, 1.8, 0.8, -0.2, -3] },
      azimuth: { '2.4GHz': [3, 2.9, 3, 2.9, 3, 2.9, 3, 2.9, 3, 2.9, 3, 2.9], '5GHz': [4, 3.8, 3.9, 3.7, 4, 3.8, 3.9, 3.7, 4, 3.8, 3.9, 3.7] },
      beamwidth: { h: 360, v: 95 }
    },
    'U6+': {
      name: 'U6-Plus', sku: 'U6-Plus', generation: 'Wi-Fi 6', category: 'flagship',
      color: '#F97316', msrp: 129, eur: 109, geizhals: 'https://geizhals.de/ubiquiti-unifi-6-plus-u6-plus-a2815847.html', status: 'current',
      radio24: { mimo: '2x2', txPower: 23, gain: 3, maxRate: 574 },
      radio5: { mimo: '2x2', txPower: 23, gain: 5.4, maxRate: 2400 },
      radio6: null, streams: 4, coverage: 140, clients: '300+',
      ethernet: '1 GbE', poe: 'PoE (9W)', mount: 'Ceiling/Wall',
      features: ['BLE'], notes: 'Budget Wi-Fi 6',
      elevation: { '2.4GHz': [0, 2.6, 2.9, 3, 2.8, 2.4, 1.9, 1.1, 0.2, -2.5], '5GHz': [-1, 3.5, 4.8, 5.4, 4.9, 4, 2.8, 1.3, -0.3, -4] },
      azimuth: { '2.4GHz': [3, 2.9, 3, 2.9, 3, 2.9, 3, 2.9, 3, 2.9, 3, 2.9], '5GHz': [5.4, 5.2, 5.3, 5.1, 5.4, 5.2, 5.3, 5.1, 5.4, 5.2, 5.3, 5.1] },
      beamwidth: { h: 360, v: 95 }
    },
    'U6-LR': {
      name: 'U6-Long-Range', sku: 'U6-LR', generation: 'Wi-Fi 6', category: 'flagship',
      color: '#F97316', msrp: 179, eur: 169, geizhals: 'https://geizhals.de/ubiquiti-unifi-6-long-range-u6-lr-a2516058.html', status: 'current',
      radio24: { mimo: '4x4', txPower: 26, gain: 4, maxRate: 600 },
      radio5: { mimo: '4x4', txPower: 25, gain: 5.5, maxRate: 2400 },
      radio6: null, streams: 8, coverage: 185, clients: '350+',
      ethernet: '1 GbE', poe: 'PoE+ (16.5W)', mount: 'Ceiling/Wall',
      features: ['BLE', 'IP54'], notes: 'Best coverage Wi-Fi 6',
      elevation: { '2.4GHz': [-0.5, 3, 3.6, 4, 3.6, 3, 2.2, 1.2, 0.1, -3], '5GHz': [-1.5, 3.8, 5, 5.5, 5, 4, 2.8, 1.2, -0.5, -4.5] },
      azimuth: { '2.4GHz': [4, 3.8, 3.9, 3.7, 4, 3.8, 3.9, 3.7, 4, 3.8, 3.9, 3.7], '5GHz': [5.5, 5.3, 5.4, 5.2, 5.5, 5.3, 5.4, 5.2, 5.5, 5.3, 5.4, 5.2] },
      beamwidth: { h: 360, v: 85 }
    },
    'U6-Pro': {
      name: 'U6-Pro', sku: 'U6-Pro', generation: 'Wi-Fi 6', category: 'flagship',
      color: '#F97316', msrp: 159, eur: 149, geizhals: 'https://geizhals.de/ubiquiti-unifi-6-pro-u6-pro-a2590635.html', status: 'current',
      radio24: { mimo: '2x2', txPower: 22, gain: 4, maxRate: 574 },
      radio5: { mimo: '4x4', txPower: 26, gain: 6, maxRate: 4800 },
      radio6: null, streams: 6, coverage: 140, clients: '350+',
      ethernet: '1 GbE', poe: 'PoE+ (13W)', mount: 'Ceiling/Wall',
      features: ['BLE', 'IP54'], notes: 'Reliable Qualcomm chipset',
      elevation: { '2.4GHz': [-0.5, 3, 3.6, 4, 3.6, 3, 2.2, 1.2, 0.1, -3], '5GHz': [-2, 4, 5.5, 6, 5.5, 4.3, 3, 1.3, -0.8, -5] },
      azimuth: { '2.4GHz': [4, 3.8, 3.9, 3.7, 4, 3.8, 3.9, 3.7, 4, 3.8, 3.9, 3.7], '5GHz': [6, 5.8, 5.9, 5.7, 6, 5.8, 5.9, 5.7, 6, 5.8, 5.9, 5.7] },
      beamwidth: { h: 360, v: 80 }
    },
    'U6-Mesh-Pro': {
      name: 'U6-Mesh-Pro', sku: 'U6-Mesh-Pro', generation: 'Wi-Fi 6', category: 'outdoor',
      color: '#F97316', msrp: 199, eur: 189, geizhals: 'https://geizhals.de/?fs=U6-Mesh-Pro', status: 'current',
      radio24: { mimo: '2x2', txPower: 24, gain: 6, maxRate: 573 },
      radio5: { mimo: '4x4', txPower: 27, gain: 8, maxRate: 4804 },
      radio6: null, streams: 6, coverage: 185, clients: '350+',
      ethernet: '1 GbE + Passthrough', poe: 'PoE+ (13W)', mount: 'Pole/Wall',
      features: ['IP65', 'Mesh', 'High-Gain'], notes: 'Outdoor 4x4 mit 8 dBi Antenne',
      elevation: { '2.4GHz': [-1, 4, 5.5, 6, 5.5, 4, 2.5, 0.8, -0.8, -3.5], '5GHz': [-2, 5.5, 7, 8, 7, 5.5, 3.5, 1.2, -1, -5] },
      azimuth: { '2.4GHz': [6, 5.8, 5.9, 5.7, 6, 5.8, 5.9, 5.7, 6, 5.8, 5.9, 5.7], '5GHz': [8, 7.8, 7.9, 7.7, 8, 7.8, 7.9, 7.7, 8, 7.8, 7.9, 7.7] },
      beamwidth: { h: 360, v: 75 }
    },
    'U6-Mesh': {
      name: 'U6-Mesh', sku: 'U6-Mesh', generation: 'Wi-Fi 6', category: 'outdoor',
      color: '#F97316', msrp: 179, eur: 159, geizhals: 'https://geizhals.de/ubiquiti-unifi-6-mesh-u6-mesh-a2590639.html', status: 'current',
      radio24: { mimo: '2x2', txPower: 23, gain: 3, maxRate: 573 },
      radio5: { mimo: '2x2', txPower: 23, gain: 4, maxRate: 1201 },
      radio6: null, streams: 4, coverage: 140, clients: '300+',
      ethernet: '1 GbE', poe: 'PoE (10W)', mount: 'Pole/Wall',
      features: ['IP65'], notes: 'Outdoor mesh',
      elevation: { '2.4GHz': [0, 2.5, 2.8, 3, 2.8, 2.5, 2, 1.2, 0.3, -2], '5GHz': [-0.5, 3, 3.6, 4, 3.6, 3, 2.2, 1.2, 0.1, -3] },
      azimuth: { '2.4GHz': [3, 2.9, 3, 2.9, 3, 2.9, 3, 2.9, 3, 2.9, 3, 2.9], '5GHz': [4, 3.8, 3.9, 3.7, 4, 3.8, 3.9, 3.7, 4, 3.8, 3.9, 3.7] },
      beamwidth: { h: 360, v: 100 }
    },
    'U6-IW': {
      name: 'U6-In-Wall', sku: 'U6-IW', generation: 'Wi-Fi 6', category: 'inwall',
      color: '#F97316', msrp: 99, eur: 99, geizhals: 'https://geizhals.de/ubiquiti-unifi-6-in-wall-u6-iw-a2662285.html', status: 'current',
      radio24: { mimo: '2x2', txPower: 22, gain: 2.5, maxRate: 573 },
      radio5: { mimo: '4x4', txPower: 24, gain: 4, maxRate: 4800 },
      radio6: null, streams: 6, coverage: 100, clients: '300+',
      ethernet: '1 GbE + 4 LAN', poe: 'PoE+ (13.5W)', mount: 'Wall box',
      features: ['BLE', '4 LAN ports'], notes: 'In-wall with switch ports',
      elevation: { '2.4GHz': [2.5, 2.3, 2, 1.5, 0.8, 0, -1, -2, -3, -4], '5GHz': [4, 3.7, 3.2, 2.5, 1.5, 0.3, -1, -2.5, -4, -5] },
      azimuth: { '2.4GHz': [2.5, 2.4, 2.3, 2.2, 2.1, 2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.4], '5GHz': [4, 3.8, 3.5, 3.2, 3, 2.8, 3, 3.2, 3.5, 3.8, 4, 3.8] },
      beamwidth: { h: 180, v: 90 }
    },
    'U6-Extender': {
      name: 'U6-Extender', sku: 'U6-Extender', generation: 'Wi-Fi 6', category: 'inwall',
      color: '#F97316', msrp: 99, eur: 89, geizhals: 'https://geizhals.de/?fs=U6-Extender', status: 'current',
      radio24: { mimo: '2x2', txPower: 20, gain: 2.5, maxRate: 573 },
      radio5: { mimo: '4x4', txPower: 24, gain: 4, maxRate: 4804 },
      radio6: null, streams: 6, coverage: 115, clients: '300+',
      ethernet: '1 GbE', poe: 'AC-Steckdose (15W)',  mount: 'Wall outlet',
      features: ['AC-powered', 'BLE'], notes: 'Steckdosen-AP, kein PoE nötig',
      elevation: { '2.4GHz': [2.5, 2.3, 2, 1.5, 0.8, 0, -1, -2, -3, -4], '5GHz': [4, 3.7, 3.2, 2.5, 1.5, 0.3, -1, -2.5, -4, -5] },
      azimuth: { '2.4GHz': [2.5, 2.4, 2.3, 2.2, 2.1, 2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.4], '5GHz': [4, 3.8, 3.5, 3.2, 3, 2.8, 3, 3.2, 3.5, 3.8, 4, 3.8] },
      beamwidth: { h: 180, v: 90 }
    },
    // Wi-Fi 6E
    'U6-Enterprise': {
      name: 'U6-Enterprise', sku: 'U6-Enterprise', generation: 'Wi-Fi 6E', category: 'flagship',
      color: '#EC4899', msrp: 349, eur: 329, geizhals: 'https://geizhals.de/ubiquiti-unifi-6-enterprise-u6-enterprise-a2662287.html', status: 'current',
      radio24: { mimo: '2x2', txPower: 23, gain: 4, maxRate: 573 },
      radio5: { mimo: '4x4', txPower: 26, gain: 6, maxRate: 4800 },
      radio6: { mimo: '4x4', txPower: 23, gain: 5.5, maxRate: 4800 },
      streams: 10, coverage: 185, clients: '600+',
      ethernet: '2.5 GbE', poe: 'PoE+ (19.5W)', mount: 'Ceiling/Wall',
      features: ['BLE', '6 GHz'], notes: 'First 6 GHz AP',
      elevation: { '2.4GHz': [-0.5, 3, 3.6, 4, 3.6, 3, 2.2, 1.2, 0.1, -3], '5GHz': [-2, 4, 5.5, 6, 5.5, 4.3, 3, 1.3, -0.8, -5], '6GHz': [-2.5, 3.6, 5, 5.5, 5, 3.8, 2.4, 0.6, -1.4, -5.5] },
      azimuth: { '2.4GHz': [4, 3.8, 3.9, 3.7, 4, 3.8, 3.9, 3.7, 4, 3.8, 3.9, 3.7], '5GHz': [6, 5.8, 5.9, 5.7, 6, 5.8, 5.9, 5.7, 6, 5.8, 5.9, 5.7], '6GHz': [5.5, 5.3, 5.4, 5.2, 5.5, 5.3, 5.4, 5.2, 5.5, 5.3, 5.4, 5.2] },
      beamwidth: { h: 360, v: 78 }
    },
    'U6-Enterprise-IW': {
      name: 'U6-Enterprise-IW', sku: 'U6-Enterprise-IW', generation: 'Wi-Fi 6E', category: 'inwall',
      color: '#EC4899', msrp: 299, eur: 279, geizhals: 'https://geizhals.de/?fs=U6-Enterprise-IW', status: 'current',
      radio24: { mimo: '2x2', txPower: 22, gain: 2.5, maxRate: 573 },
      radio5: { mimo: '4x4', txPower: 25, gain: 4, maxRate: 4804 },
      radio6: { mimo: '4x4', txPower: 24, gain: 4, maxRate: 4804 },
      streams: 10, coverage: 115, clients: '600+',
      ethernet: '2.5 GbE + 4x 1G (1x PoE-out)', poe: 'PoE++ (22W)', mount: 'Wall outlet',
      features: ['6 GHz', '4-Port Switch', 'PoE-out'], notes: 'Wi-Fi 6E In-Wall mit eingebautem Switch',
      elevation: { '2.4GHz': [2.5, 2.3, 2, 1.5, 0.8, 0, -1, -2, -3, -4], '5GHz': [4, 3.7, 3.2, 2.5, 1.5, 0.3, -1, -2.5, -4, -5], '6GHz': [4, 3.7, 3.2, 2.5, 1.5, 0.3, -1, -2.5, -4, -5] },
      azimuth: { '2.4GHz': [2.5, 2.4, 2.3, 2.2, 2.1, 2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.4], '5GHz': [4, 3.8, 3.5, 3.2, 3, 2.8, 3, 3.2, 3.5, 3.8, 4, 3.8], '6GHz': [4, 3.8, 3.5, 3.2, 3, 2.8, 3, 3.2, 3.5, 3.8, 4, 3.8] },
      beamwidth: { h: 180, v: 90 }
    },
    // Wi-Fi 7 Flagship
    'U7-Lite': {
      name: 'U7-Lite', sku: 'U7-Lite', generation: 'Wi-Fi 7', category: 'flagship',
      color: '#22C55E', msrp: 99, eur: 99, geizhals: 'https://geizhals.de/ubiquiti-unifi-7-lite-u7-lite-a3136789.html', status: 'current',
      radio24: { mimo: '2x2', txPower: 23, gain: 4, maxRate: 688 },
      radio5: { mimo: '2x2', txPower: 24, gain: 5, maxRate: 4324 },
      radio6: null, streams: 4, coverage: 115, clients: '200+',
      ethernet: '2.5 GbE', poe: 'PoE (13W)', mount: 'Ceiling/Wall',
      features: [], notes: 'Entry Wi-Fi 7 - no 6 GHz',
      elevation: { '2.4GHz': [-0.5, 3, 3.6, 4, 3.6, 3, 2.2, 1.2, 0.1, -3], '5GHz': [-1.5, 3.5, 4.6, 5, 4.6, 3.7, 2.5, 1, -0.6, -4] },
      azimuth: { '2.4GHz': [4, 3.8, 3.9, 3.7, 4, 3.8, 3.9, 3.7, 4, 3.8, 3.9, 3.7], '5GHz': [5, 4.8, 4.9, 4.7, 5, 4.8, 4.9, 4.7, 5, 4.8, 4.9, 4.7] },
      beamwidth: { h: 360, v: 90 }
    },
    'U7-LR': {
      name: 'U7-Long-Range', sku: 'U7-LR', generation: 'Wi-Fi 7', category: 'flagship',
      color: '#22C55E', msrp: 159, eur: 155, geizhals: 'https://geizhals.de/ubiquiti-unifi-7-long-range-u7-lr-a3271234.html', status: 'current',
      radio24: { mimo: '2x2', txPower: 26, gain: 4, maxRate: 688 },
      radio5: { mimo: '3x3', txPower: 27, gain: 6, maxRate: 4324 },
      radio6: null, streams: 5, coverage: 160, clients: '300+',
      ethernet: '2.5 GbE', poe: 'PoE (14W)', mount: 'Ceiling/Wall',
      features: [], notes: 'Extended range - no 6 GHz',
      elevation: { '2.4GHz': [-0.5, 3, 3.6, 4, 3.6, 3, 2.2, 1.2, 0.1, -3], '5GHz': [-2, 4, 5.5, 6, 5.5, 4.3, 3, 1.3, -0.8, -5] },
      azimuth: { '2.4GHz': [4, 3.8, 3.9, 3.7, 4, 3.8, 3.9, 3.7, 4, 3.8, 3.9, 3.7], '5GHz': [6, 5.8, 5.9, 5.7, 6, 5.8, 5.9, 5.7, 6, 5.8, 5.9, 5.7] },
      beamwidth: { h: 360, v: 80 }
    },
    'U7-Pro': {
      name: 'U7-Pro', sku: 'U7-Pro', generation: 'Wi-Fi 7', category: 'flagship',
      color: '#22C55E', msrp: 189, eur: 185, geizhals: 'https://geizhals.de/ubiquiti-unifi-7-pro-u7-pro-a3055892.html', status: 'current',
      radio24: { mimo: '2x2', txPower: 23, gain: 4, maxRate: 688 },
      radio5: { mimo: '2x2', txPower: 26, gain: 6, maxRate: 4324 },
      radio6: { mimo: '2x2', txPower: 23, gain: 5.8, maxRate: 5765 },
      streams: 6, coverage: 140, clients: '300+',
      ethernet: '2.5 GbE', poe: 'PoE+ (21W)', mount: 'Ceiling/Wall',
      features: ['6 GHz'], notes: 'Best value 6 GHz Wi-Fi 7',
      elevation: { '2.4GHz': [-0.5, 3, 3.6, 4, 3.6, 3, 2.2, 1.2, 0.1, -3], '5GHz': [-2, 4, 5.5, 6, 5.5, 4.3, 3, 1.3, -0.8, -5], '6GHz': [-2.5, 3.8, 5.2, 5.8, 5.3, 4, 2.6, 0.8, -1.2, -6] },
      azimuth: { '2.4GHz': [4, 3.8, 3.9, 3.7, 4, 3.8, 3.9, 3.7, 4, 3.8, 3.9, 3.7], '5GHz': [6, 5.8, 5.9, 5.7, 6, 5.8, 5.9, 5.7, 6, 5.8, 5.9, 5.7], '6GHz': [5.8, 5.6, 5.7, 5.5, 5.8, 5.6, 5.7, 5.5, 5.8, 5.6, 5.7, 5.5] },
      beamwidth: { h: 360, v: 75 }
    },
    'U7-Pro-Max': {
      name: 'U7-Pro-Max', sku: 'U7-Pro-Max', generation: 'Wi-Fi 7', category: 'flagship',
      color: '#8B5CF6', msrp: 279, eur: 269, geizhals: 'https://geizhals.de/ubiquiti-unifi-7-pro-max-u7-pro-max-a3136791.html', status: 'current',
      radio24: { mimo: '2x2', txPower: 23, gain: 4, maxRate: 688 },
      radio5: { mimo: '4x4', txPower: 29, gain: 6, maxRate: 8648 },
      radio6: { mimo: '2x2', txPower: 23, gain: 5.9, maxRate: 5765 },
      streams: 8, coverage: 160, clients: '300+',
      ethernet: '2.5 GbE', poe: 'PoE+ (25W)', mount: 'Ceiling/Wall',
      features: ['6 GHz', 'Spectral'], notes: 'Spectral analysis radio',
      elevation: { '2.4GHz': [-0.5, 3, 3.6, 4, 3.6, 3, 2.2, 1.2, 0.1, -3], '5GHz': [-2, 4.2, 5.6, 6, 5.6, 4.5, 3.2, 1.5, -0.6, -4.5], '6GHz': [-2.5, 4, 5.4, 5.9, 5.4, 4.2, 2.8, 1, -1, -5.5] },
      azimuth: { '2.4GHz': [4, 3.9, 4, 3.8, 4, 3.9, 4, 3.8, 4, 3.9, 4, 3.8], '5GHz': [6, 5.9, 6, 5.8, 6, 5.9, 6, 5.8, 6, 5.9, 6, 5.8], '6GHz': [5.9, 5.7, 5.8, 5.6, 5.9, 5.7, 5.8, 5.6, 5.9, 5.7, 5.8, 5.6] },
      beamwidth: { h: 360, v: 72 }
    },
    // Wi-Fi 7 XG (10G Uplink)
    'U7-Pro-XG': {
      name: 'U7-Pro-XG', sku: 'U7-Pro-XG', generation: 'Wi-Fi 7', category: 'flagship',
      color: '#14B8A6', msrp: 199, eur: 195, geizhals: 'https://geizhals.de/ubiquiti-unifi-7-pro-xg-u7-pro-xg-a3320123.html', status: 'new',
      radio24: { mimo: '2x2', txPower: 23, gain: 4, maxRate: 688 },
      radio5: { mimo: '2x2', txPower: 26, gain: 6, maxRate: 4324 },
      radio6: { mimo: '2x2', txPower: 24, gain: 6, maxRate: 5765 },
      streams: 6, coverage: 140, clients: '300+',
      ethernet: '10 GbE', poe: 'PoE+ (22W)', mount: 'Ceiling/Wall',
      features: ['6 GHz', '10G', 'Fanless'], notes: '10G uplink, fanless',
      elevation: { '2.4GHz': [-0.5, 3, 3.6, 4, 3.6, 3, 2.2, 1.2, 0.1, -3], '5GHz': [-2, 4, 5.5, 6, 5.5, 4.3, 3, 1.3, -0.8, -5], '6GHz': [-2, 4, 5.5, 6, 5.5, 4.3, 3, 1.3, -0.8, -5] },
      azimuth: { '2.4GHz': [4, 3.8, 3.9, 3.7, 4, 3.8, 3.9, 3.7, 4, 3.8, 3.9, 3.7], '5GHz': [6, 5.8, 5.9, 5.7, 6, 5.8, 5.9, 5.7, 6, 5.8, 5.9, 5.7], '6GHz': [6, 5.8, 5.9, 5.7, 6, 5.8, 5.9, 5.7, 6, 5.8, 5.9, 5.7] },
      beamwidth: { h: 360, v: 75 }
    },
    'U7-Pro-XGS': {
      name: 'U7-Pro-XGS', sku: 'U7-Pro-XGS', generation: 'Wi-Fi 7', category: 'flagship',
      color: '#14B8A6', msrp: 299, eur: 289, geizhals: 'https://geizhals.de/ubiquiti-unifi-7-pro-xgs-u7-pro-xgs-a3320125.html', status: 'new',
      radio24: { mimo: '2x2', txPower: 23, gain: 4, maxRate: 688 },
      radio5: { mimo: '4x4', txPower: 29, gain: 6, maxRate: 8648 },
      radio6: { mimo: '2x2', txPower: 24, gain: 6, maxRate: 5765 },
      streams: 8, coverage: 160, clients: '500+',
      ethernet: '10 GbE', poe: 'PoE++ (29W)', mount: 'Ceiling/Wall',
      features: ['6 GHz', '10G', 'Spectral', 'Fanless'], notes: 'Best Flagship',
      elevation: { '2.4GHz': [-0.5, 3, 3.6, 4, 3.6, 3, 2.2, 1.2, 0.1, -3], '5GHz': [-2, 4.2, 5.6, 6, 5.6, 4.5, 3.2, 1.5, -0.6, -4.5], '6GHz': [-2, 4.2, 5.6, 6, 5.6, 4.5, 3.2, 1.5, -0.6, -4.5] },
      azimuth: { '2.4GHz': [4, 3.9, 4, 3.8, 4, 3.9, 4, 3.8, 4, 3.9, 4, 3.8], '5GHz': [6, 5.9, 6, 5.8, 6, 5.9, 6, 5.8, 6, 5.9, 6, 5.8], '6GHz': [6, 5.9, 6, 5.8, 6, 5.9, 6, 5.8, 6, 5.9, 6, 5.8] },
      beamwidth: { h: 360, v: 72 }
    },
    // Wi-Fi 7 In-Wall
    'U7-IW': {
      name: 'U7-In-Wall', sku: 'U7-IW', generation: 'Wi-Fi 7', category: 'inwall',
      color: '#22C55E', msrp: 99, eur: 99, geizhals: 'https://geizhals.de/ubiquiti-unifi-7-in-wall-u7-iw-a3271236.html', status: 'current',
      radio24: { mimo: '2x2', txPower: 23, gain: 2.5, maxRate: 688 },
      radio5: { mimo: '2x2', txPower: 24, gain: 4, maxRate: 2882 },
      radio6: null, streams: 4, coverage: 100, clients: '200+',
      ethernet: '2.5 GbE + 2 LAN', poe: 'PoE+ (16W)', mount: 'Wall box',
      features: ['2 LAN ports'], notes: 'Wi-Fi 7 in-wall (no 6 GHz)',
      elevation: { '2.4GHz': [2.5, 2.3, 2, 1.5, 0.8, 0, -1, -2, -3, -4], '5GHz': [4, 3.7, 3.2, 2.5, 1.5, 0.3, -1, -2.5, -4, -5] },
      azimuth: { '2.4GHz': [2.5, 2.4, 2.3, 2.2, 2.1, 2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.4], '5GHz': [4, 3.8, 3.5, 3.2, 3, 2.8, 3, 3.2, 3.5, 3.8, 4, 3.8] },
      beamwidth: { h: 180, v: 90 }
    },
    'U7-Pro-Wall': {
      name: 'U7-Pro-Wall', sku: 'U7-Pro-Wall', generation: 'Wi-Fi 7', category: 'inwall',
      color: '#22C55E', msrp: 179, eur: 175, geizhals: 'https://geizhals.de/ubiquiti-unifi-7-pro-wall-u7-pro-wall-a3271238.html', status: 'current',
      radio24: { mimo: '2x2', txPower: 23, gain: 2.5, maxRate: 688 },
      radio5: { mimo: '2x2', txPower: 24, gain: 4, maxRate: 4324 },
      radio6: { mimo: '2x2', txPower: 23, gain: 4, maxRate: 5765 },
      streams: 6, coverage: 120, clients: '300+',
      ethernet: '2.5 GbE', poe: 'PoE+ (18W)', mount: 'Wall outlet',
      features: ['6 GHz'], notes: 'Wall mount with 6 GHz',
      elevation: { '2.4GHz': [2.5, 2.3, 2, 1.5, 0.8, 0, -1, -2, -3, -4], '5GHz': [4, 3.7, 3.2, 2.5, 1.5, 0.3, -1, -2.5, -4, -5], '6GHz': [4, 3.7, 3.2, 2.5, 1.5, 0.3, -1, -2.5, -4, -5] },
      azimuth: { '2.4GHz': [2.5, 2.4, 2.3, 2.2, 2.1, 2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.4], '5GHz': [4, 3.8, 3.5, 3.2, 3, 2.8, 3, 3.2, 3.5, 3.8, 4, 3.8], '6GHz': [4, 3.8, 3.5, 3.2, 3, 2.8, 3, 3.2, 3.5, 3.8, 4, 3.8] },
      beamwidth: { h: 180, v: 90 }
    },
    // Wi-Fi 7 Outdoor
    'U7-Outdoor': {
      name: 'U7-Outdoor', sku: 'U7-Outdoor', generation: 'Wi-Fi 7', category: 'outdoor',
      color: '#22C55E', msrp: 179, eur: 175, geizhals: 'https://geizhals.de/ubiquiti-unifi-7-outdoor-u7-outdoor-a3136793.html', status: 'current',
      radio24: { mimo: '2x2', txPower: 25, gain: 5, maxRate: 688 },
      radio5: { mimo: '4x4', txPower: 28, gain: 7, maxRate: 5765 },
      radio6: null, streams: 6, coverage: 280, clients: '300+',
      ethernet: '2.5 GbE', poe: 'PoE+ (22W)', mount: 'Pole/Wall',
      features: ['IP66'], notes: 'Outdoor - no 6 GHz',
      elevation: { '2.4GHz': [-1, 3.5, 4.5, 5, 4.5, 3.5, 2.3, 1, -0.5, -3.5], '5GHz': [-2.5, 5, 6.5, 7, 6.5, 5.2, 3.5, 1.5, -1, -5] },
      azimuth: { '2.4GHz': [5, 4.8, 4.9, 4.7, 5, 4.8, 4.9, 4.7, 5, 4.8, 4.9, 4.7], '5GHz': [7, 6.8, 6.9, 6.7, 7, 6.8, 6.9, 6.7, 7, 6.8, 6.9, 6.7] },
      beamwidth: { h: 360, v: 65 }
    },
    'U7-Pro-Outdoor': {
      name: 'U7-Pro-Outdoor', sku: 'U7-Pro-Outdoor', generation: 'Wi-Fi 7', category: 'outdoor',
      color: '#22C55E', msrp: 379, eur: 369, geizhals: 'https://geizhals.de/ubiquiti-unifi-7-pro-outdoor-u7-pro-outdoor-a3271240.html', status: 'current',
      radio24: { mimo: '2x2', txPower: 25, gain: 5, maxRate: 688 },
      radio5: { mimo: '4x4', txPower: 28, gain: 7, maxRate: 5765 },
      radio6: { mimo: '4x4', txPower: 30, gain: 8, maxRate: 11530 },
      streams: 10, coverage: 465, clients: '500+',
      ethernet: '2.5 GbE', poe: 'PoE++ (32W)', mount: 'Pole/Wall',
      features: ['6 GHz', 'AFC', 'IP67'], notes: 'Outdoor 6 GHz + AFC',
      elevation: { '2.4GHz': [-1, 3.5, 4.5, 5, 4.5, 3.5, 2.3, 1, -0.5, -3.5], '5GHz': [-2.5, 5, 6.5, 7, 6.5, 5.2, 3.5, 1.5, -1, -5], '6GHz': [-3, 5.5, 7.3, 8, 7.3, 5.8, 3.8, 1.5, -1.2, -5.5] },
      azimuth: { '2.4GHz': [5, 4.8, 4.9, 4.7, 5, 4.8, 4.9, 4.7, 5, 4.8, 4.9, 4.7], '5GHz': [7, 6.8, 6.9, 6.7, 7, 6.8, 6.9, 6.7, 7, 6.8, 6.9, 6.7], '6GHz': [8, 7.8, 7.9, 7.7, 8, 7.8, 7.9, 7.7, 8, 7.8, 7.9, 7.7] },
      beamwidth: { h: 360, v: 55 }
    },
    // Enterprise E7
    'E7': {
      name: 'E7', sku: 'E7', generation: 'Wi-Fi 7', category: 'enterprise',
      color: '#DC2626', msrp: 499, eur: 489, geizhals: 'https://geizhals.de/ubiquiti-unifi-enterprise-7-e7-a3271242.html', status: 'current',
      radio24: { mimo: '2x2', txPower: 23, gain: 4, maxRate: 688 },
      radio5: { mimo: '4x4', txPower: 30, gain: 6, maxRate: 11530 },
      radio6: { mimo: '4x4', txPower: 30, gain: 6, maxRate: 11530 },
      streams: 10, coverage: 185, clients: '1500+',
      ethernet: '10 GbE + 1 GbE', poe: 'PoE++ (45W)', mount: 'Ceiling/Wall',
      features: ['6 GHz', '10G', 'Spectral', 'Dual Port'], notes: 'Enterprise flagship',
      elevation: { '2.4GHz': [-0.5, 3, 3.6, 4, 3.6, 3, 2.2, 1.2, 0.1, -3], '5GHz': [-2, 4, 5.5, 6, 5.5, 4.3, 3, 1.3, -0.8, -5], '6GHz': [-2, 4, 5.5, 6, 5.5, 4.3, 3, 1.3, -0.8, -5] },
      azimuth: { '2.4GHz': [4, 3.8, 3.9, 3.7, 4, 3.8, 3.9, 3.7, 4, 3.8, 3.9, 3.7], '5GHz': [6, 5.8, 5.9, 5.7, 6, 5.8, 5.9, 5.7, 6, 5.8, 5.9, 5.7], '6GHz': [6, 5.8, 5.9, 5.7, 6, 5.8, 5.9, 5.7, 6, 5.8, 5.9, 5.7] },
      beamwidth: { h: 360, v: 75 }
    },
    'E7-Campus': {
      name: 'E7-Campus', sku: 'E7-Campus', generation: 'Wi-Fi 7', category: 'enterprise',
      color: '#DC2626', msrp: 799, eur: 779, geizhals: 'https://geizhals.de/ubiquiti-unifi-enterprise-7-campus-e7-campus-a3320127.html', status: 'current',
      radio24: { mimo: '2x2', txPower: 25, gain: 9, maxRate: 688 },
      radio5: { mimo: '4x4', txPower: 30, gain: 12, maxRate: 11530 },
      radio6: { mimo: '4x4', txPower: 36, gain: 12, maxRate: 11530 },
      streams: 10, coverage: 465, clients: '1500+',
      ethernet: '10 GbE + 1 GbE', poe: 'PoE++ (50W)', mount: 'Pole/Wall',
      features: ['6 GHz', 'AFC', 'High-Gain', 'IP67'], notes: 'High-gain directional',
      elevation: { '2.4GHz': [-3, 6, 8, 9, 8, 6, 3.5, 0.5, -3, -7], '5GHz': [-5, 8, 11, 12, 11, 8.5, 5, 1, -4, -9], '6GHz': [-5, 8, 11, 12, 11, 8.5, 5, 1, -4, -9] },
      azimuth: { '2.4GHz': [9, 8.5, 8.7, 8.3, 9, 8.5, 8.7, 8.3, 9, 8.5, 8.7, 8.3], '5GHz': [12, 11.5, 11.7, 11.3, 12, 11.5, 11.7, 11.3, 12, 11.5, 11.7, 11.3], '6GHz': [12, 11.5, 11.7, 11.3, 12, 11.5, 11.7, 11.3, 12, 11.5, 11.7, 11.3] },
      beamwidth: { h: 120, v: 45 }
    },
    'E7-Audience': {
      name: 'E7-Audience', sku: 'E7-Audience', generation: 'Wi-Fi 7', category: 'enterprise',
      color: '#DC2626', msrp: 1499, eur: 1459, geizhals: 'https://geizhals.de/ubiquiti-unifi-enterprise-7-audience-e7-audience-a3320129.html', status: 'current',
      radio24: { mimo: '4x4', txPower: 25, gain: 6, maxRate: 1376 },
      radio5: { mimo: '8x8', txPower: 30, gain: 11, maxRate: 23000 },
      radio6: { mimo: '8x8', txPower: 36, gain: 15, maxRate: 23000 },
      streams: 20, coverage: 465, clients: '1500+',
      ethernet: '4x 10 GbE', poe: 'PoE++ (90W)', mount: 'Pole/Truss',
      features: ['6 GHz', 'AFC', 'Stadium', 'IP68'], notes: 'Stadium - 4x 10G',
      elevation: { '2.4GHz': [-2, 4, 5.5, 6, 5.5, 4, 2.5, 0.5, -2, -5], '5GHz': [-4, 7, 10, 11, 10, 7.5, 4.5, 1, -3, -8], '6GHz': [-5, 10, 13.5, 15, 13.5, 10.5, 6, 1.5, -4, -10] },
      azimuth: { '2.4GHz': [6, 5.8, 5.9, 5.7, 6, 5.8, 5.9, 5.7, 6, 5.8, 5.9, 5.7], '5GHz': [11, 10.8, 10.9, 10.7, 11, 10.8, 10.9, 10.7, 11, 10.8, 10.9, 10.7], '6GHz': [15, 14.8, 14.9, 14.7, 15, 14.8, 14.9, 14.7, 15, 14.8, 14.9, 14.7] },
      beamwidth: { h: 360, v: 60 }
    }
  };

  // ==================== SWITCH DATA ====================
  const switchData = {
    // Aggregation
    'USW-Aggregation': {
      name: 'Aggregation', sku: 'USW-Aggregation', category: 'aggregation',
      color: '#7C3AED', msrp: 299, eur: 289, geizhals: 'https://geizhals.de/ubiquiti-unifi-switch-aggregation-usw-aggregation-a2144866.html', status: 'current',
      ports: '8x SFP+', portCount: 8, speed: '10G SFP+',
      poe: null, poeBudget: 0, layer: 'L2', sfpPlus: 8, sfp28: 0,
      ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 0,
      features: [], formFactor: '1U Rack', power: 35,
      notes: 'SFP+ only aggregation'
    },
    'USW-Pro-Aggregation': {
      name: 'Hi-Capacity Aggregation', sku: 'USW-Pro-Aggregation', category: 'aggregation',
      color: '#7C3AED', msrp: 399, eur: 389, geizhals: 'https://geizhals.de/ubiquiti-unifi-switch-pro-aggregation-usw-pro-aggregation-a2516060.html', status: 'current',
      ports: '28x 10G SFP+ + 4x 25G SFP28', portCount: 32, speed: '25G SFP28',
      poe: null, poeBudget: 0, layer: 'L3', sfpPlus: 28, sfp28: 4,
      ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 0,
      features: ['L3', '25G'], formFactor: '1U Rack', power: 100,
      notes: 'High-capacity L3 aggregation'
    },
    'USW-Pro-XG-Aggregation': {
      name: 'Pro XG Aggregation', sku: 'USW-Pro-XG-Aggregation', category: 'aggregation',
      color: '#7C3AED', msrp: 699, eur: 679, geizhals: 'https://geizhals.de/ubiquiti-unifi-switch-pro-xg-aggregation-usw-pro-xg-a3136795.html', status: 'current',
      ports: '32x 25G SFP28', portCount: 32, speed: '25G SFP28',
      poe: null, poeBudget: 0, layer: 'L3', sfpPlus: 0, sfp28: 32,
      ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 0,
      features: ['L3', '25G'], formFactor: '1U Rack', power: 85,
      notes: 'All 25G SFP28 ports'
    },
    'ECS-Aggregation': {
      name: 'Enterprise Campus Aggregation', sku: 'ECS-Aggregation', category: 'aggregation',
      color: '#7C3AED', msrp: 1499, eur: 1459, geizhals: 'https://geizhals.de/ubiquiti-unifi-enterprise-campus-switch-aggregation-a3320131.html', status: 'new',
      ports: '48x 25G SFP28 + 6x 100G QSFP28', portCount: 54, speed: '100G QSFP28',
      poe: null, poeBudget: 0, layer: 'L3', sfpPlus: 0, sfp28: 48,
      ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 0,
      features: ['L3', '100G', 'HA'], formFactor: '1U Rack', power: 150,
      notes: '100G backbone'
    },

    // Enterprise Campus
    'ECS-24-PoE': {
      name: 'Enterprise Campus 24 PoE', sku: 'ECS-24-PoE', category: 'enterprise',
      color: '#DC2626', msrp: 1299, eur: 1269, geizhals: 'https://geizhals.de/ubiquiti-unifi-enterprise-campus-switch-24-poe-a3271244.html', status: 'current',
      ports: '24x 2.5G + 2x 25G SFP28', portCount: 26, speed: '2.5G / 25G',
      poe: 'PoE++', poeBudget: 400, layer: 'L3', sfpPlus: 0, sfp28: 2,
      ethernet1g: 0, ethernet2_5g: 24, ethernet10g: 0,
      features: ['L3', 'PoE++', 'HA', 'Etherlighting'], formFactor: '1U Rack', power: 500,
      notes: 'HA + PoE++ for APs'
    },
    'ECS-48-PoE': {
      name: 'Enterprise Campus 48 PoE', sku: 'ECS-48-PoE', category: 'enterprise',
      color: '#DC2626', msrp: 2499, eur: 2449, geizhals: 'https://geizhals.de/ubiquiti-unifi-enterprise-campus-switch-48-poe-a3271246.html', status: 'current',
      ports: '48x 2.5G + 4x 25G SFP28', portCount: 52, speed: '2.5G / 25G',
      poe: 'PoE++', poeBudget: 720, layer: 'L3', sfpPlus: 0, sfp28: 4,
      ethernet1g: 0, ethernet2_5g: 48, ethernet10g: 0,
      features: ['L3', 'PoE++', 'HA', 'Etherlighting'], formFactor: '1U Rack', power: 900,
      notes: 'HA Campus switch'
    },
    'ECS-24S-PoE': {
      name: 'Enterprise Campus 24S PoE', sku: 'ECS-24S-PoE', category: 'enterprise',
      color: '#DC2626', msrp: 1999, status: 'new',
      ports: '24x 10G + 2x 25G SFP28', portCount: 26, speed: '10G / 25G',
      poe: 'PoE+++', poeBudget: 720, layer: 'L3', sfpPlus: 0, sfp28: 2,
      ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 24,
      features: ['L3', 'PoE+++', 'HA', '10G'], formFactor: '1U Rack', power: 900,
      notes: '10G PoE+++ Campus'
    },
    'ECS-48S-PoE': {
      name: 'Enterprise Campus 48S PoE', sku: 'ECS-48S-PoE', category: 'enterprise',
      color: '#DC2626', msrp: 3499, status: 'new',
      ports: '48x 10G + 4x 25G SFP28', portCount: 52, speed: '10G / 25G',
      poe: 'PoE+++', poeBudget: 1440, layer: 'L3', sfpPlus: 0, sfp28: 4,
      ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 48,
      features: ['L3', 'PoE+++', 'HA', '10G'], formFactor: '1U Rack', power: 1600,
      notes: '48x 10G PoE+++'
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

  // ==================== CAMERA DATA ====================
  const cameraData = {
    // G6 Series (Latest)
    'G6-Bullet': { name: 'G6 Bullet', sku: 'UVC-G6-Bullet', generation: 'G6', category: 'bullet', color: '#22C55E', msrp: 199, status: 'new', resolution: '4K (8MP)', sensor: '1/1.8"', fov: '110°', irRange: 30, connection: 'PoE', audio: '2-way', ai: true, lpr: true, faceId: true, ip: 'IP66', features: ['AI', 'LPR', 'Face ID'], notes: 'Best value 4K outdoor' },
    'G6-Turret': { name: 'G6 Turret', sku: 'UVC-G6-Turret', generation: 'G6', category: 'turret', color: '#22C55E', msrp: 199, status: 'new', resolution: '4K (8MP)', sensor: '1/1.8"', fov: '110°', irRange: 30, connection: 'PoE', audio: '2-way', ai: true, lpr: true, faceId: true, ip: 'IP66', features: ['AI', 'LPR', 'Face ID'], notes: 'Indoor/Outdoor turret' },
    'G6-Dome': { name: 'G6 Dome', sku: 'UVC-G6-Dome', generation: 'G6', category: 'dome', color: '#22C55E', msrp: 279, status: 'new', resolution: '4K (8MP)', sensor: '1/1.8"', fov: '134°', irRange: 30, connection: 'PoE', audio: '2-way', ai: true, lpr: true, faceId: true, ip: 'IP66', features: ['AI', 'LPR', 'Face ID', 'IK10'], notes: 'Vandal-proof dome' },
    'G6-Instant': { name: 'G6 Instant', sku: 'UVC-G6-INS', generation: 'G6', category: 'compact', color: '#22C55E', msrp: 179, status: 'new', resolution: '4K (8MP)', sensor: '1/1.8"', fov: '110°', irRange: 10, connection: 'WiFi', audio: '2-way', ai: true, lpr: false, faceId: true, ip: 'IPX5', features: ['AI', 'WiFi', 'Plug & Play'], notes: 'Wireless 4K - no cable' },
    'G6-Pro-Bullet': { name: 'G6 Pro Bullet', sku: 'UVC-G6-Pro-Bullet', generation: 'G6', category: 'bullet', color: '#8B5CF6', msrp: 479, status: 'new', resolution: '4K (8MP)', sensor: '1/1.2"', fov: '95°', irRange: 40, connection: 'PoE', audio: '2-way', ai: true, lpr: true, faceId: true, ip: 'IP67', features: ['AI', 'LPR', 'Face ID', '2.4x Zoom'], notes: 'Large sensor + optical zoom' },
    'G6-PTZ': { name: 'G6 PTZ', sku: 'UVC-G6-PTZ', generation: 'G6', category: 'ptz', color: '#22C55E', msrp: 399, status: 'new', resolution: '4K (8MP)', sensor: '1/1.8"', fov: '110°', irRange: 30, connection: 'PoE', audio: '2-way', ai: true, lpr: true, faceId: true, ip: 'IP66', features: ['AI', 'LPR', '10x Hybrid Zoom', 'Auto-Track'], notes: '5x optical + 2x digital' },
    'G6-180': { name: 'G6 180', sku: 'UVC-G6-180', generation: 'G6', category: 'panoramic', color: '#22C55E', msrp: 299, status: 'new', resolution: '4K (8MP)', sensor: '1/1.8"', fov: '180°', irRange: 15, connection: 'PoE', audio: '2-way', ai: true, lpr: false, faceId: true, ip: 'IP66', features: ['AI', '180° View', 'Dewarping'], notes: 'Panoramic fisheye' },
    
    // G5 Series
    'G5-Bullet': { name: 'G5 Bullet', sku: 'UVC-G5-Bullet', generation: 'G5', category: 'bullet', color: '#F97316', msrp: 129, resolution: '2K (4MP)', sensor: '1/3"', fov: '84°', irRange: 25, connection: 'PoE', audio: 'Mic', ai: false, lpr: false, faceId: false, ip: 'IP55', features: [], notes: 'Budget outdoor' },
    'G5-Turret-Ultra': { name: 'G5 Turret Ultra', sku: 'UVC-G5-Turret-Ultra', generation: 'G5', category: 'turret', color: '#F97316', msrp: 129, resolution: '2K (4MP)', sensor: '1/3"', fov: '102°', irRange: 25, connection: 'PoE', audio: 'Mic', ai: false, lpr: false, faceId: false, ip: 'IP55', features: [], notes: 'Budget turret' },
    'G5-Dome-Ultra': { name: 'G5 Dome Ultra', sku: 'UVC-G5-Dome-Ultra', generation: 'G5', category: 'dome', color: '#F97316', msrp: 129, resolution: '2K (4MP)', sensor: '1/3"', fov: '102°', irRange: 25, connection: 'PoE', audio: 'Mic', ai: false, lpr: false, faceId: false, ip: 'IP55', features: ['IK04'], notes: 'Budget dome' },
    'G5-Flex': { name: 'G5 Flex', sku: 'UVC-G5-Flex', generation: 'G5', category: 'compact', color: '#F97316', msrp: 129, resolution: '2K (4MP)', sensor: '1/3"', fov: '102°', irRange: 8, connection: 'PoE', audio: 'Mic', ai: false, lpr: false, faceId: false, ip: 'IP55', features: ['Compact'], notes: 'Small versatile' },
    'G5-Pro': { name: 'G5 Pro', sku: 'UVC-G5-Pro', generation: 'G5', category: 'bullet', color: '#F97316', msrp: 379, resolution: '4K (8MP)', sensor: '1/1.8"', fov: '85°', irRange: 25, connection: 'PoE', audio: '2-way', ai: true, lpr: false, faceId: false, ip: 'IP66', features: ['AI', '3x Zoom'], notes: '4K with optical zoom' },
    'G5-PTZ': { name: 'G5 PTZ', sku: 'UVC-G5-PTZ', generation: 'G5', category: 'ptz', color: '#F97316', msrp: 299, resolution: '2K (4MP)', sensor: '1/2.7"', fov: '100°', irRange: 20, connection: 'PoE', audio: '2-way', ai: false, lpr: false, faceId: false, ip: 'IP66', features: ['2x Zoom', 'Floodlight'], notes: 'Budget PTZ with light' },
    
    // AI Series (Premium)
    'AI-Pro': { name: 'AI Pro', sku: 'UVC-AI-Pro', generation: 'AI', category: 'bullet', color: '#DC2626', msrp: 499, resolution: '4K (8MP)', sensor: '1/1.8"', fov: '102°', irRange: 50, connection: 'PoE', audio: '2-way', ai: true, lpr: true, faceId: true, ip: 'IP66', features: ['AI', 'LPR', 'Face ID', 'Floodlight', 'SD Card'], notes: 'Premium AI with light' },
    'AI-Bullet': { name: 'AI Bullet', sku: 'UVC-AI-Bullet', generation: 'AI', category: 'bullet', color: '#DC2626', msrp: 399, resolution: '4K (8MP)', sensor: '1/1.8"', fov: '102°', irRange: 40, connection: 'PoE', audio: '2-way', ai: true, lpr: true, faceId: true, ip: 'IP66', features: ['AI', 'LPR', 'Face ID'], notes: 'AI bullet' },
    'AI-Turret': { name: 'AI Turret', sku: 'UVC-AI-Turret', generation: 'AI', category: 'turret', color: '#DC2626', msrp: 399, resolution: '4K (8MP)', sensor: '1/1.8"', fov: '102°', irRange: 40, connection: 'PoE', audio: '2-way', ai: true, lpr: true, faceId: true, ip: 'IP66', features: ['AI', 'LPR', 'Face ID'], notes: 'AI turret' },
    'AI-Dome': { name: 'AI Dome', sku: 'UVC-AI-Dome', generation: 'AI', category: 'dome', color: '#DC2626', msrp: 499, resolution: '4K (8MP)', sensor: '1/1.8"', fov: '102°', irRange: 40, connection: 'PoE (1 Gbps)', audio: '2-way', ai: true, lpr: true, faceId: true, ip: 'IP66', features: ['AI', 'LPR', 'Face ID', 'SD Card', 'IK10'], notes: 'Premium AI dome' },
    'AI-360': { name: 'AI 360', sku: 'UVC-AI-360', generation: 'AI', category: 'panoramic', color: '#DC2626', msrp: 699, resolution: '4K (8MP)', sensor: '1/1.8"', fov: '360°', irRange: 10, connection: 'PoE', audio: '2-way', ai: true, lpr: false, faceId: true, ip: 'IP65', features: ['AI', '360° View', 'Dewarping'], notes: 'Full fisheye 360°' },
    'AI-LPR': { name: 'AI LPR', sku: 'UVC-AI-LPR', generation: 'AI', category: 'specialty', color: '#DC2626', msrp: 799, resolution: '4K (8MP)', sensor: '1/1.8"', fov: '35°', irRange: 60, connection: 'PoE', audio: 'Mic', ai: true, lpr: true, faceId: false, ip: 'IP66', features: ['AI', 'LPR Optimized', 'Long IR'], notes: 'License plate focus' },
    'AI-DSLR': { name: 'AI DSLR', sku: 'UVC-AI-DSLR', generation: 'AI', category: 'specialty', color: '#DC2626', msrp: 1299, resolution: '4K (8MP)', sensor: 'Micro 4/3', fov: 'Variable', irRange: 30, connection: 'PoE', audio: '2-way', ai: true, lpr: true, faceId: true, ip: 'IP66', features: ['AI', 'Interchangeable Lens', 'Micro 4/3'], notes: 'DSLR quality sensor' },
    'AI-PTZ-Industrial': { name: 'AI PTZ Industrial', sku: 'UVC-AI-PTZ', generation: 'AI', category: 'ptz', color: '#DC2626', msrp: 1299, resolution: '4K (8MP)', sensor: '1/1.8"', fov: '60°', irRange: 100, connection: 'PoE++', audio: '2-way', ai: true, lpr: true, faceId: true, ip: 'IP66', features: ['AI', '22x Zoom', 'Auto-Track'], notes: '22x optical zoom' },
    'AI-PTZ-Precision': { name: 'AI PTZ Precision', sku: 'UVC-AI-PTZ-Precision', generation: 'AI', category: 'ptz', color: '#DC2626', msrp: 1999, status: 'new', resolution: '4K (8MP)', sensor: '1/1.2"', fov: '55°', irRange: 150, connection: 'PoE++', audio: '2-way', ai: true, lpr: true, faceId: true, ip: 'IP67', features: ['AI', '31x Zoom', 'LiDAR', 'Auto-Track'], notes: 'LiDAR autofocus - best PTZ' },
    'AI-Theta': { name: 'AI Theta', sku: 'UVC-AI-Theta', generation: 'AI', category: 'specialty', color: '#DC2626', msrp: 799, resolution: '4K (8MP)', sensor: '1/1.8"', fov: 'Variable', irRange: 15, connection: 'PoE', audio: '2-way', ai: true, lpr: true, faceId: true, ip: 'IP66', features: ['AI', 'Modular', 'Multi-Lens'], notes: 'Modular lens system' },
    
    // Doorbells
    'Doorbell-Pro': { name: 'G4 Doorbell Pro', sku: 'UVC-G4-Doorbell-Pro', generation: 'G4', category: 'doorbell', color: '#3B82F6', msrp: 299, resolution: '5MP', sensor: '1/2.7"', fov: '180°', irRange: 5, connection: 'PoE/WiFi', audio: '2-way', ai: true, lpr: false, faceId: true, ip: 'IPX4', features: ['AI', 'Package Cam', 'LCD Screen'], notes: 'Pro doorbell with screen' },
    'Doorbell-Pro-PoE': { name: 'G4 Doorbell Pro PoE', sku: 'UVC-G4-Doorbell-Pro-PoE', generation: 'G4', category: 'doorbell', color: '#3B82F6', msrp: 349, resolution: '5MP', sensor: '1/2.7"', fov: '180°', irRange: 5, connection: 'PoE', audio: '2-way', ai: true, lpr: false, faceId: true, ip: 'IPX4', features: ['AI', 'Package Cam', 'LCD Screen', 'PoE'], notes: 'PoE version' },
    'Doorbell-Lite': { name: 'Doorbell Lite', sku: 'UVC-Doorbell-Lite', generation: 'G5', category: 'doorbell', color: '#3B82F6', msrp: 99, resolution: 'HD (720p)', sensor: '1/4"', fov: '145°', irRange: 3, connection: 'WiFi', audio: '2-way', ai: false, lpr: false, faceId: false, ip: 'IPX4', features: ['Budget'], notes: 'Budget doorbell' }
  };

  // ==================== GATEWAY DATA ====================
  const gatewayData = {
    // Compact / Desktop
    'UCG-Ultra': { name: 'Cloud Gateway Ultra', sku: 'UCG-Ultra', category: 'compact', color: '#22C55E', msrp: 129, status: 'current',
      ipsSpeed: 1, devices: 30, clients: 300, wan: '2.5 GbE', lan: '4x 1GbE', sfp: null,
      wifi: null, poe: null, storage: null, formFactor: 'Desktop', power: 12,
      features: ['USB-C', 'LCD'], apps: ['Network', 'Protect', 'Talk', 'Access'], notes: 'Budget gateway - full app suite' },
    'UCG-Max': { name: 'Cloud Gateway Max', sku: 'UCG-Max', category: 'compact', color: '#22C55E', msrp: 199, status: 'current',
      ipsSpeed: 2.3, devices: 50, clients: 500, wan: '2.5 GbE', lan: '4x 2.5GbE', sfp: null,
      wifi: null, poe: null, storage: 'NVMe (opt)', formFactor: 'Desktop', power: 20,
      features: ['NVMe Slot', 'Fanless'], apps: ['Network', 'Protect', 'Talk', 'Access'], notes: 'Fanless with NVMe option' },
    'UX7': { name: 'Express 7', sku: 'UX7', category: 'compact', color: '#8B5CF6', msrp: 199, status: 'new',
      ipsSpeed: 2.3, devices: 30, clients: 300, wan: '10G RJ45', lan: '1x 2.5GbE', sfp: null,
      wifi: 'Wi-Fi 7 (6-stream)', poe: null, storage: null, formFactor: 'Desktop', power: 15,
      features: ['Wi-Fi 7', 'Fanless', 'Mesh'], apps: ['Network'], notes: 'Compact Wi-Fi 7 - can be mesh node' },
    'UCG-Fiber': { name: 'Cloud Gateway Fiber', sku: 'UCG-Fiber', category: 'compact', color: '#14B8A6', msrp: 279, status: 'new',
      ipsSpeed: 5, devices: 100, clients: 1000, wan: '2x 10G SFP+', lan: '4x 2.5GbE + 10G RJ45', sfp: '2x 10G SFP+',
      wifi: null, poe: '1x PoE+ (30W)', storage: 'NVMe (opt)', formFactor: 'Desktop', power: 40,
      features: ['10G', 'PoE+', 'NVMe'], apps: ['Network', 'Protect', 'Talk', 'Access'], notes: 'Best compact - 5 Gbps IPS' },
    'UDR7': { name: 'Dream Router 7', sku: 'UDR7', category: 'compact', color: '#8B5CF6', msrp: 279, status: 'new',
      ipsSpeed: 2.3, devices: 50, clients: 300, wan: '10G SFP+', lan: '3x 2.5GbE', sfp: '1x 10G SFP+',
      wifi: 'Wi-Fi 7 (Tri-band)', poe: '1x PoE (15W)', storage: '64GB microSD', formFactor: 'Tower', power: 30,
      features: ['Wi-Fi 7', '10G', 'PoE'], apps: ['Network', 'Protect', 'Talk', 'Access'], notes: 'All-in-one Wi-Fi 7 gateway' },
    
    // Rackmount
    'UDM-Pro': { name: 'Dream Machine Pro', sku: 'UDM-Pro', category: 'rackmount', color: '#3B82F6', msrp: 379, status: 'current',
      ipsSpeed: 3.5, devices: 100, clients: 1000, wan: '10G SFP+ / 1G RJ45', lan: '8x 1GbE', sfp: '1x 10G SFP+',
      wifi: null, poe: null, storage: '1x 3.5" HDD', formFactor: '1U Rack', power: 48,
      features: ['10G SFP+', 'NVR'], apps: ['Network', 'Protect', 'Talk', 'Access'], notes: 'Standard rackmount gateway' },
    'UDM-SE': { name: 'Dream Machine SE', sku: 'UDM-SE', category: 'rackmount', color: '#3B82F6', msrp: 499, status: 'current',
      ipsSpeed: 3.5, devices: 100, clients: 1000, wan: '10G SFP+ / 2.5G RJ45', lan: '8x 1GbE', sfp: '1x 10G SFP+',
      wifi: null, poe: '2x PoE+ (60W)', storage: '1x 3.5" HDD', formFactor: '1U Rack', power: 140,
      features: ['10G SFP+', 'PoE+', 'NVR', '2.5G WAN'], apps: ['Network', 'Protect', 'Talk', 'Access'], notes: 'With PoE+ ports' },
    'UDM-Pro-Max': { name: 'Dream Machine Pro Max', sku: 'UDM-Pro-Max', category: 'rackmount', color: '#8B5CF6', msrp: 599, status: 'current',
      ipsSpeed: 5, devices: 200, clients: 2000, wan: '10G SFP+ / 2.5G RJ45', lan: '8x 1GbE', sfp: '2x 10G SFP+',
      wifi: null, poe: null, storage: '2x 3.5" HDD (RAID)', formFactor: '1U Rack', power: 60,
      features: ['10G SFP+', 'RAID', 'Shadow Mode'], apps: ['Network', 'Protect', 'Talk', 'Access'], notes: 'Best prosumer - Shadow Mode HA' },
    
    // Enterprise
    'EFG': { name: 'Enterprise Fortress Gateway', sku: 'EFG', category: 'enterprise', color: '#DC2626', msrp: 1999, status: 'current',
      ipsSpeed: 12.5, devices: 500, clients: 5000, wan: '2x 25G SFP28', lan: '2x 2.5GbE', sfp: '2x 10G SFP+ + 2x 25G SFP28',
      wifi: null, poe: null, storage: null, formFactor: '1U Rack', power: 200,
      features: ['25G', 'Shadow Mode', 'SSL Inspect', 'Dual PSU'], apps: ['Network'], notes: 'Enterprise flagship - 12.5 Gbps IPS' },
    'UXG-Enterprise': { name: 'UXG Enterprise', sku: 'UXG-Enterprise', category: 'enterprise', color: '#DC2626', msrp: 1999, status: 'current',
      ipsSpeed: 12.5, devices: 500, clients: 5000, wan: '2x 25G SFP28', lan: '2x 2.5GbE', sfp: '2x 10G SFP+ + 2x 25G SFP28',
      wifi: null, poe: null, storage: null, formFactor: '1U Rack', power: 200,
      features: ['25G', 'Shadow Mode', 'SSL Inspect', 'Dual PSU', 'External Controller'], apps: ['Network (external)'], notes: 'Like EFG but external controller' },
    
    // Special
    'UDW': { name: 'Dream Wall', sku: 'UDW', category: 'special', color: '#F97316', msrp: 1299, status: 'current',
      ipsSpeed: 3.5, devices: 100, clients: 1000, wan: '10G SFP+', lan: '12x 1GbE', sfp: '2x 10G SFP+',
      wifi: 'Wi-Fi 6 (4x4)', poe: '8x PoE+ (120W)', storage: '128GB SSD', formFactor: 'Wall-mount', power: 200,
      features: ['Wi-Fi 6', '10G', 'PoE+', 'Touchscreen'], apps: ['Network', 'Protect', 'Talk', 'Access'], notes: 'Wall-mounted all-in-one' },
    'UDR-5G-Max': { name: 'Dream Router 5G Max', sku: 'UDR-5G-Max', category: 'special', color: '#F97316', msrp: 499, status: 'new',
      ipsSpeed: 2.3, devices: 50, clients: 500, wan: '5G Cellular + 2.5G', lan: '4x 2.5GbE', sfp: null,
      wifi: 'Wi-Fi 7 (Tri-band)', poe: '1x PoE (15W)', storage: 'NVMe (opt)', formFactor: 'Tower', power: 35,
      features: ['5G Cellular', 'Wi-Fi 7', 'Dual SIM'], apps: ['Network', 'Protect', 'Talk', 'Access'], notes: '5G cellular failover' }
  };

  // ==================== NVR DATA ====================
  const nvrData = {
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

  // ==================== UNAS DATA ====================
  const nasData = {
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

  // ==================== WIRELESS BRIDGE / PTP DATA ====================
  const bridgeData = {
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

  // AP Filter State
  const [apFilters, setApFilters] = useState({
    searchText: '',
    generation: 'all', // all, Wi-Fi 5, Wi-Fi 6, Wi-Fi 6E, Wi-Fi 7
    has6GHz: 'all', // all, yes, no
    minCoverage: '',
    maxPrice: '',
    minGain: '',
    uplink: 'all', // all, 1G, 2.5G, 10G
    spectral: false
  });

  const updateApFilter = (key, value) => {
    setApFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetApFilters = () => {
    setApFilters({
      searchText: '', generation: 'all', has6GHz: 'all', minCoverage: '',
      maxPrice: '', minGain: '', uplink: 'all', spectral: false
    });
    setCategoryFilter('all');
  };

  // Switch Filter State
  const [switchFilters, setSwitchFilters] = useState({
    minPorts: '',
    maxPorts: '',
    poe: 'all', // all, yes, no, poe+, poe++, poe+++
    minPoeBudget: '',
    layer: 'all', // all, L2, L3
    speed: 'all', // all, 1G, 2.5G, 10G, 25G
    sfpPlus: false,
    sfp28: false,
    etherlighting: false,
    maxPrice: '',
    formFactor: 'all', // all, rack, desktop, compact
    searchText: ''
  });

  const updateFilter = (key, value) => {
    setSwitchFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setSwitchFilters({
      minPorts: '', maxPorts: '', poe: 'all', minPoeBudget: '', layer: 'all',
      speed: 'all', sfpPlus: false, sfp28: false, etherlighting: false,
      maxPrice: '', formFactor: 'all', searchText: ''
    });
    setSwitchCategoryFilter('all');
  };

  // Advanced AP Filtering
  const filteredAPs = useMemo(() => {
    return Object.entries(apData).filter(([k, ap]) => {
      // Category filter
      if (categoryFilter !== 'all' && ap.category !== categoryFilter) return false;
      
      // Text search
      if (apFilters.searchText) {
        const search = apFilters.searchText.toLowerCase();
        if (!ap.name.toLowerCase().includes(search) && 
            !ap.sku.toLowerCase().includes(search) &&
            !ap.generation.toLowerCase().includes(search)) return false;
      }
      
      // Generation
      if (apFilters.generation !== 'all' && ap.generation !== apFilters.generation) return false;
      
      // 6 GHz
      if (apFilters.has6GHz === 'yes' && !ap.radio6) return false;
      if (apFilters.has6GHz === 'no' && ap.radio6) return false;
      
      // Coverage
      if (apFilters.minCoverage && ap.coverage < parseInt(apFilters.minCoverage)) return false;
      
      // Price
      if (apFilters.maxPrice && ap.msrp > parseInt(apFilters.maxPrice)) return false;
      
      // Gain
      if (apFilters.minGain && ap.radio5.gain < parseFloat(apFilters.minGain)) return false;
      
      // Uplink
      if (apFilters.uplink === '1G' && !ap.ethernet.includes('1 GbE') && !ap.ethernet.includes('1G')) return false;
      if (apFilters.uplink === '2.5G' && !ap.ethernet.includes('2.5')) return false;
      if (apFilters.uplink === '10G' && !ap.ethernet.includes('10')) return false;
      
      // Spectral
      if (apFilters.spectral && !ap.features.includes('Spectral')) return false;
      
      return true;
    });
  }, [apData, categoryFilter, apFilters]);

  const activeApFilterCount = useMemo(() => {
    let count = 0;
    if (apFilters.searchText) count++;
    if (apFilters.generation !== 'all') count++;
    if (apFilters.has6GHz !== 'all') count++;
    if (apFilters.minCoverage) count++;
    if (apFilters.maxPrice) count++;
    if (apFilters.minGain) count++;
    if (apFilters.uplink !== 'all') count++;
    if (apFilters.spectral) count++;
    if (categoryFilter !== 'all') count++;
    return count;
  }, [apFilters, categoryFilter]);
  
  // Advanced Switch Filtering
  const filteredSwitches = useMemo(() => {
    return Object.entries(switchData).filter(([k, sw]) => {
      // Category filter
      if (switchCategoryFilter !== 'all' && sw.category !== switchCategoryFilter) return false;
      
      // Text search
      if (switchFilters.searchText) {
        const search = switchFilters.searchText.toLowerCase();
        if (!sw.name.toLowerCase().includes(search) && 
            !sw.sku.toLowerCase().includes(search) &&
            !sw.ports.toLowerCase().includes(search)) return false;
      }
      
      // Port count
      if (switchFilters.minPorts && sw.portCount < parseInt(switchFilters.minPorts)) return false;
      if (switchFilters.maxPorts && sw.portCount > parseInt(switchFilters.maxPorts)) return false;
      
      // PoE filter
      if (switchFilters.poe === 'yes' && !sw.poe) return false;
      if (switchFilters.poe === 'no' && sw.poe) return false;
      if (switchFilters.poe === 'poe+' && sw.poe !== 'PoE+') return false;
      if (switchFilters.poe === 'poe++' && sw.poe !== 'PoE++') return false;
      if (switchFilters.poe === 'poe+++' && sw.poe !== 'PoE+++') return false;
      
      // PoE Budget
      if (switchFilters.minPoeBudget && sw.poeBudget < parseInt(switchFilters.minPoeBudget)) return false;
      
      // Layer
      if (switchFilters.layer !== 'all' && sw.layer !== switchFilters.layer) return false;
      
      // Speed
      if (switchFilters.speed === '1G' && sw.ethernet1g === 0) return false;
      if (switchFilters.speed === '2.5G' && sw.ethernet2_5g === 0) return false;
      if (switchFilters.speed === '10G' && sw.ethernet10g === 0) return false;
      if (switchFilters.speed === '25G' && sw.sfp28 === 0) return false;
      
      // SFP requirements
      if (switchFilters.sfpPlus && sw.sfpPlus === 0) return false;
      if (switchFilters.sfp28 && sw.sfp28 === 0) return false;
      
      // Etherlighting
      if (switchFilters.etherlighting && !sw.features.includes('Etherlighting')) return false;
      
      // Price
      if (switchFilters.maxPrice && sw.msrp > parseInt(switchFilters.maxPrice)) return false;
      
      // Form factor
      if (switchFilters.formFactor === 'rack' && !sw.formFactor.includes('Rack')) return false;
      if (switchFilters.formFactor === 'desktop' && !sw.formFactor.includes('Desktop')) return false;
      if (switchFilters.formFactor === 'compact' && !sw.formFactor.includes('Compact')) return false;
      
      return true;
    });
  }, [switchData, switchCategoryFilter, switchFilters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (switchFilters.minPorts) count++;
    if (switchFilters.maxPorts) count++;
    if (switchFilters.poe !== 'all') count++;
    if (switchFilters.minPoeBudget) count++;
    if (switchFilters.layer !== 'all') count++;
    if (switchFilters.speed !== 'all') count++;
    if (switchFilters.sfpPlus) count++;
    if (switchFilters.sfp28) count++;
    if (switchFilters.etherlighting) count++;
    if (switchFilters.maxPrice) count++;
    if (switchFilters.formFactor !== 'all') count++;
    if (switchFilters.searchText) count++;
    if (switchCategoryFilter !== 'all') count++;
    return count;
  }, [switchFilters, switchCategoryFilter]);

  // Camera Filter State
  const [cameraFilters, setCameraFilters] = useState({
    searchText: '',
    generation: 'all',
    type: 'all',
    minResolution: '',
    maxPrice: '',
    hasAI: 'all',
    hasLPR: false,
    hasFaceId: false,
    connection: 'all',
    ipClass: 'all'
  });

  const updateCameraFilter = (key, value) => {
    setCameraFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetCameraFilters = () => {
    setCameraFilters({
      searchText: '', generation: 'all', type: 'all', minResolution: '',
      maxPrice: '', hasAI: 'all', hasLPR: false, hasFaceId: false, connection: 'all', ipClass: 'all'
    });
    setCameraCategoryFilter('all');
  };

  // Advanced Camera Filtering
  const filteredCameras = useMemo(() => {
    return Object.entries(cameraData).filter(([k, cam]) => {
      if (cameraCategoryFilter !== 'all' && cam.category !== cameraCategoryFilter) return false;
      if (cameraFilters.searchText) {
        const search = cameraFilters.searchText.toLowerCase();
        if (!cam.name.toLowerCase().includes(search) && 
            !cam.sku.toLowerCase().includes(search) &&
            !cam.generation.toLowerCase().includes(search)) return false;
      }
      if (cameraFilters.generation !== 'all' && cam.generation !== cameraFilters.generation) return false;
      if (cameraFilters.hasAI === 'yes' && !cam.ai) return false;
      if (cameraFilters.hasAI === 'no' && cam.ai) return false;
      if (cameraFilters.hasLPR && !cam.lpr) return false;
      if (cameraFilters.hasFaceId && !cam.faceId) return false;
      if (cameraFilters.connection !== 'all' && !cam.connection.includes(cameraFilters.connection)) return false;
      if (cameraFilters.ipClass !== 'all' && cam.ip !== cameraFilters.ipClass) return false;
      if (cameraFilters.maxPrice && cam.msrp > parseInt(cameraFilters.maxPrice)) return false;
      return true;
    });
  }, [cameraData, cameraCategoryFilter, cameraFilters]);

  const activeCameraFilterCount = useMemo(() => {
    let count = 0;
    if (cameraFilters.searchText) count++;
    if (cameraFilters.generation !== 'all') count++;
    if (cameraFilters.hasAI !== 'all') count++;
    if (cameraFilters.hasLPR) count++;
    if (cameraFilters.hasFaceId) count++;
    if (cameraFilters.connection !== 'all') count++;
    if (cameraFilters.ipClass !== 'all') count++;
    if (cameraFilters.maxPrice) count++;
    if (cameraCategoryFilter !== 'all') count++;
    return count;
  }, [cameraFilters, cameraCategoryFilter]);

  // Gateway Filter State
  const [gatewayFilters, setGatewayFilters] = useState({
    searchText: '',
    hasWifi: 'all',
    has10G: false,
    minIPS: '',
    maxPrice: ''
  });

  const updateGatewayFilter = (key, value) => {
    setGatewayFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetGatewayFilters = () => {
    setGatewayFilters({ searchText: '', hasWifi: 'all', has10G: false, minIPS: '', maxPrice: '' });
    setGatewayCategoryFilter('all');
  };

  const filteredGateways = useMemo(() => {
    return Object.entries(gatewayData).filter(([k, gw]) => {
      if (gatewayCategoryFilter !== 'all' && gw.category !== gatewayCategoryFilter) return false;
      if (gatewayFilters.searchText) {
        const search = gatewayFilters.searchText.toLowerCase();
        if (!gw.name.toLowerCase().includes(search) && !gw.sku.toLowerCase().includes(search)) return false;
      }
      if (gatewayFilters.hasWifi === 'yes' && !gw.wifi) return false;
      if (gatewayFilters.hasWifi === 'no' && gw.wifi) return false;
      if (gatewayFilters.has10G && !gw.sfp && !gw.wan.includes('10G')) return false;
      if (gatewayFilters.minIPS && gw.ipsSpeed < parseFloat(gatewayFilters.minIPS)) return false;
      if (gatewayFilters.maxPrice && gw.msrp > parseInt(gatewayFilters.maxPrice)) return false;
      return true;
    });
  }, [gatewayData, gatewayCategoryFilter, gatewayFilters]);

  const activeGatewayFilterCount = useMemo(() => {
    let count = 0;
    if (gatewayFilters.searchText) count++;
    if (gatewayFilters.hasWifi !== 'all') count++;
    if (gatewayFilters.has10G) count++;
    if (gatewayFilters.minIPS) count++;
    if (gatewayFilters.maxPrice) count++;
    if (gatewayCategoryFilter !== 'all') count++;
    return count;
  }, [gatewayFilters, gatewayCategoryFilter]);

  // NVR Filter State
  const [nvrFilters, setNvrFilters] = useState({
    searchText: '',
    minBays: '',
    minCameras: '',
    has10G: false,
    hasRAID: false,
    maxPrice: ''
  });

  const updateNvrFilter = (key, value) => {
    setNvrFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetNvrFilters = () => {
    setNvrFilters({ searchText: '', minBays: '', minCameras: '', has10G: false, hasRAID: false, maxPrice: '' });
    setNvrCategoryFilter('all');
  };

  const filteredNVRs = useMemo(() => {
    return Object.entries(nvrData).filter(([k, nvr]) => {
      if (nvrCategoryFilter !== 'all' && nvr.category !== nvrCategoryFilter) return false;
      if (nvrFilters.searchText) {
        const search = nvrFilters.searchText.toLowerCase();
        if (!nvr.name.toLowerCase().includes(search) && !nvr.sku.toLowerCase().includes(search)) return false;
      }
      if (nvrFilters.minBays && nvr.bays < parseInt(nvrFilters.minBays)) return false;
      if (nvrFilters.minCameras && nvr.cameras < parseInt(nvrFilters.minCameras)) return false;
      if (nvrFilters.has10G && !nvr.network.includes('10G')) return false;
      if (nvrFilters.hasRAID && !nvr.raidSupport) return false;
      if (nvrFilters.maxPrice && nvr.msrp > parseInt(nvrFilters.maxPrice)) return false;
      return true;
    });
  }, [nvrData, nvrCategoryFilter, nvrFilters]);

  const activeNvrFilterCount = useMemo(() => {
    let count = 0;
    if (nvrFilters.searchText) count++;
    if (nvrFilters.minBays) count++;
    if (nvrFilters.minCameras) count++;
    if (nvrFilters.has10G) count++;
    if (nvrFilters.hasRAID) count++;
    if (nvrFilters.maxPrice) count++;
    if (nvrCategoryFilter !== 'all') count++;
    return count;
  }, [nvrFilters, nvrCategoryFilter]);

  // NAS Filter State
  const [nasFilters, setNasFilters] = useState({
    searchText: '',
    minBays: '',
    has10G: false,
    hasNVMeCache: false,
    maxPrice: ''
  });

  const updateNasFilter = (key, value) => {
    setNasFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetNasFilters = () => {
    setNasFilters({ searchText: '', minBays: '', has10G: false, hasNVMeCache: false, maxPrice: '' });
    setNasCategoryFilter('all');
  };

  const filteredNAS = useMemo(() => {
    return Object.entries(nasData).filter(([k, nas]) => {
      if (nasCategoryFilter !== 'all' && nas.category !== nasCategoryFilter) return false;
      if (nasFilters.searchText) {
        const search = nasFilters.searchText.toLowerCase();
        if (!nas.name.toLowerCase().includes(search) && !nas.sku.toLowerCase().includes(search)) return false;
      }
      if (nasFilters.minBays && nas.bays < parseInt(nasFilters.minBays)) return false;
      if (nasFilters.has10G && !nas.network.includes('10G') && !nas.network.includes('25G')) return false;
      if (nasFilters.hasNVMeCache && nas.cacheSlots === 0) return false;
      if (nasFilters.maxPrice && nas.msrp > parseInt(nasFilters.maxPrice)) return false;
      return true;
    });
  }, [nasData, nasCategoryFilter, nasFilters]);

  const activeNasFilterCount = useMemo(() => {
    let count = 0;
    if (nasFilters.searchText) count++;
    if (nasFilters.minBays) count++;
    if (nasFilters.has10G) count++;
    if (nasFilters.hasNVMeCache) count++;
    if (nasFilters.maxPrice) count++;
    if (nasCategoryFilter !== 'all') count++;
    return count;
  }, [nasFilters, nasCategoryFilter]);

  // Bridge/PTP Filter State
  const [bridgeFilters, setBridgeFilters] = useState({
    searchText: '',
    frequency: 'all',
    minRange: '',
    minBandwidth: '',
    has10G: false,
    maxPrice: ''
  });

  const updateBridgeFilter = (key, value) => {
    setBridgeFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetBridgeFilters = () => {
    setBridgeFilters({ searchText: '', frequency: 'all', minRange: '', minBandwidth: '', has10G: false, maxPrice: '' });
    setBridgeCategoryFilter('all');
  };

  const filteredBridges = useMemo(() => {
    return Object.entries(bridgeData).filter(([k, br]) => {
      if (bridgeCategoryFilter !== 'all' && br.category !== bridgeCategoryFilter) return false;
      if (bridgeFilters.searchText) {
        const search = bridgeFilters.searchText.toLowerCase();
        if (!br.name.toLowerCase().includes(search) && !br.sku.toLowerCase().includes(search)) return false;
      }
      if (bridgeFilters.frequency !== 'all' && !br.frequency.includes(bridgeFilters.frequency)) return false;
      if (bridgeFilters.minRange && br.range && br.range < parseInt(bridgeFilters.minRange)) return false;
      if (bridgeFilters.has10G && !br.interface?.includes('10G')) return false;
      if (bridgeFilters.maxPrice && br.msrp > parseInt(bridgeFilters.maxPrice)) return false;
      return true;
    });
  }, [bridgeData, bridgeCategoryFilter, bridgeFilters]);

  const activeBridgeFilterCount = useMemo(() => {
    let count = 0;
    if (bridgeFilters.searchText) count++;
    if (bridgeFilters.frequency !== 'all') count++;
    if (bridgeFilters.minRange) count++;
    if (bridgeFilters.has10G) count++;
    if (bridgeFilters.maxPrice) count++;
    if (bridgeCategoryFilter !== 'all') count++;
    return count;
  }, [bridgeFilters, bridgeCategoryFilter]);

  const ap = apData[selectedAP];
  const sw = switchData[selectedSwitch];
  const cam = cameraData[selectedCamera];
  const gw = gatewayData[selectedGateway];
  const nvr = nvrData[selectedNVR];
  const nas = nasData[selectedNAS];
  const br = bridgeData[selectedBridge];

  const apCategories = { 'all': 'All', 'flagship': 'Flagship', 'inwall': 'In-Wall', 'outdoor': 'Outdoor', 'enterprise': 'Enterprise' };
  const switchCategories = { 'all': 'All', 'aggregation': 'Aggregation', 'enterprise': 'Enterprise Campus', 'pro-xg': 'Pro XG', 'pro-max': 'Pro Max', 'pro': 'Pro', 'standard': 'Standard', 'utility': 'Utility/Flex' };
  const cameraCategories = { 'all': 'All', 'bullet': 'Bullet', 'turret': 'Turret', 'dome': 'Dome', 'compact': 'Compact', 'ptz': 'PTZ', 'panoramic': 'Panoramic', 'doorbell': 'Doorbell', 'specialty': 'Specialty' };
  const gatewayCategories = { 'all': 'All', 'compact': 'Compact/Desktop', 'rackmount': 'Rackmount', 'enterprise': 'Enterprise', 'special': 'Special' };
  const nvrCategories = { 'all': 'All', 'compact': 'Compact', 'rackmount': 'Rackmount', 'enterprise': 'Enterprise', 'ai': 'AI Series' };
  const nasCategories = { 'all': 'All', 'standard': 'Standard', 'pro': 'Pro', 'rackmount': 'Rackmount', 'special': 'Special' };
  const bridgeCategories = { 'all': 'All', 'unifi-ptp': 'UniFi Building', 'ltu-basestation': 'LTU Base Station', 'ltu-client': 'LTU Client', 'airmax-ptp': 'airMAX AC', 'airfiber': 'airFiber', 'gigabeam': 'GigaBeam', 'antenna': 'Antennas' };

  // Polar Plot Component für Strahlungsdiagramme
  const PolarPlot = ({ data, title, type, color, size = 140, onClick }) => {
    const center = size / 2;
    const maxRadius = size / 2 - 20;
    const minGain = -10;
    const maxGain = 15;

    const gainToRadius = (gain) => {
      const normalized = (gain - minGain) / (maxGain - minGain);
      return normalized * maxRadius;
    };

    const generatePath = (values, isAzimuth = false) => {
      const points = values.map((gain, i) => {
        const angle = isAzimuth 
          ? (i * 30 - 90) * (Math.PI / 180)
          : (i * 10 - 90) * (Math.PI / 180);
        const r = gainToRadius(gain);
        return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
      });
      if (isAzimuth) points.push(points[0]);
      return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + (isAzimuth ? ' Z' : '');
    };

    const gridCircles = [0, 5, 10].map(gain => ({ radius: gainToRadius(gain), label: `${gain}` }));

    return (
      <div className={`flex flex-col items-center ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`} onClick={onClick}>
        <h4 className="text-xs font-semibold mb-0.5 text-gray-400">{title}</h4>
        <svg width={size} height={size} className="bg-gray-800 rounded-lg">
          {gridCircles.map((circle, i) => (
            <g key={i}>
              <circle cx={center} cy={center} r={circle.radius} fill="none" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />
              <text x={center + 3} y={center - circle.radius + 8} fill="#6B7280" fontSize="8">{circle.label}</text>
            </g>
          ))}
          <path d={generatePath(data, type === 'azimuth')} fill={`${color}33`} stroke={color} strokeWidth="2" />
          <circle cx={center} cy={center} r="3" fill={color} />
        </svg>
        {onClick && <span className="text-xs text-gray-500 mt-0.5">🔍 Klick zum Vergrößern</span>}
      </div>
    );
  };

  // Large Polar Plot for Modal
  const LargePolarPlot = ({ data, title, type, color, size = 280 }) => {
    const center = size / 2;
    const maxRadius = size / 2 - 35;
    const minGain = -10;
    const maxGain = 15;

    const gainToRadius = (gain) => {
      const normalized = (gain - minGain) / (maxGain - minGain);
      return normalized * maxRadius;
    };

    const generatePath = (values, isAzimuth = false) => {
      const points = values.map((gain, i) => {
        const angle = isAzimuth 
          ? (i * 30 - 90) * (Math.PI / 180)
          : (i * 10 - 90) * (Math.PI / 180);
        const r = gainToRadius(gain);
        return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
      });
      if (isAzimuth) points.push(points[0]);
      return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + (isAzimuth ? ' Z' : '');
    };

    const gridCircles = [-5, 0, 5, 10, 15].map(gain => ({ radius: gainToRadius(gain), label: `${gain} dBi` }));
    const angleLabels = type === 'azimuth' 
      ? [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => ({ angle: a, label: `${a}°` }))
      : [0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map(a => ({ angle: a * 10 - 90, label: `${a * 10}°` }));

    return (
      <div className="flex flex-col items-center">
        <h4 className="text-sm font-semibold mb-2" style={{ color }}>{title}</h4>
        <svg width={size} height={size} className="bg-gray-900 rounded-xl">
          {/* Grid circles */}
          {gridCircles.map((circle, i) => (
            <g key={i}>
              <circle cx={center} cy={center} r={circle.radius} fill="none" stroke="#374151" strokeWidth="1" strokeDasharray={i === 2 ? "none" : "3,3"} />
              <text x={center + 5} y={center - circle.radius + 12} fill="#9CA3AF" fontSize="10">{circle.label}</text>
            </g>
          ))}
          {/* Angle lines */}
          {type === 'azimuth' && [0, 45, 90, 135].map(angle => {
            const rad = (angle - 90) * Math.PI / 180;
            const r = maxRadius + 10;
            return (
              <line key={angle} x1={center} y1={center} 
                x2={center + r * Math.cos(rad)} y2={center + r * Math.sin(rad)}
                stroke="#4B5563" strokeWidth="1" strokeDasharray="2,4" />
            );
          })}
          {/* Data path */}
          <path d={generatePath(data, type === 'azimuth')} fill={`${color}40`} stroke={color} strokeWidth="3" />
          {/* Center point */}
          <circle cx={center} cy={center} r="5" fill={color} />
          <text x={center} y={center + 4} textAnchor="middle" fill="white" fontSize="8">AP</text>
        </svg>
        <div className="text-xs text-gray-400 mt-2 text-center max-w-xs">
          {type === 'elevation' 
            ? '↑ Vertikalschnitt: 0° = unter AP, 90° = Horizont' 
            : '↻ Horizontalschnitt: 360° Rundum-Abstrahlung'}
        </div>
      </div>
    );
  };

  const FeatureBadge = ({ feature }) => {
    const colors = {
      '6 GHz': 'bg-purple-600', '10G': 'bg-teal-600', 'Spectral': 'bg-yellow-600',
      'Fanless': 'bg-blue-600', 'AFC': 'bg-pink-600', 'PoE+': 'bg-orange-500',
      'PoE++': 'bg-orange-600', 'PoE+++': 'bg-red-600', 'L3': 'bg-indigo-600',
      'HA': 'bg-green-600', 'Etherlighting': 'bg-cyan-600', '25G': 'bg-violet-600',
      '100G': 'bg-rose-600', 'IP65': 'bg-sky-600', 'IP66': 'bg-sky-600',
      'IP67': 'bg-sky-700', 'IP68': 'bg-sky-800', 'Stadium': 'bg-amber-600',
      'AI': 'bg-red-500', 'LPR': 'bg-amber-600', 'Face ID': 'bg-pink-500',
      'WiFi': 'bg-cyan-500', 'Shadow Mode': 'bg-green-600', 'SSL Inspect': 'bg-red-600',
      'Dual PSU': 'bg-orange-500', 'NVMe': 'bg-violet-600', 'NVMe Slot': 'bg-violet-500',
      'RAID': 'bg-green-600', 'Wi-Fi 7': 'bg-purple-600', 'Mesh': 'bg-cyan-500',
      'USB-C': 'bg-gray-600', 'LCD': 'bg-gray-600', 'Touchscreen': 'bg-violet-500',
      '5G Cellular': 'bg-red-500', 'Dual SIM': 'bg-orange-500', 'External Controller': 'bg-indigo-500',
      '10G SFP+': 'bg-teal-600', 'Dual 10G': 'bg-teal-700', 'Dual 10G SFP+': 'bg-teal-700',
      'Dual 25G SFP28': 'bg-violet-700', '7 Bays': 'bg-indigo-500', '16 Bays': 'bg-indigo-600',
      'Hot-Swap': 'bg-amber-600', 'Redundant PSU': 'bg-orange-600', 'AI Processing': 'bg-red-500',
      'Local AI': 'bg-red-400', 'NVMe Cache': 'bg-violet-500', 'ECC Option': 'bg-blue-500',
      'ECC RAM': 'bg-blue-600', 'SMB': 'bg-gray-500', 'NFS': 'bg-gray-500', 'iSCSI': 'bg-gray-500',
      'AFP': 'bg-gray-500', 'Low Power': 'bg-green-500', 'Silent': 'bg-green-400', 
      'Auto Backup': 'bg-blue-500', 'Compact': 'bg-gray-500',
      // Richtfunk Features
      '60 GHz': 'bg-purple-600', '24 GHz': 'bg-pink-600', '5 GHz': 'bg-blue-500',
      'LTU': 'bg-green-600', 'airMAX AC': 'bg-orange-500', 'GPS Sync': 'bg-cyan-600',
      'PTMP': 'bg-indigo-500', 'PTP/PTMP Client': 'bg-indigo-400', 'Ext. Antenna': 'bg-gray-500',
      'Zero-config Pairing': 'bg-blue-500', 'Magnetic Mount': 'bg-gray-500',
      '802.11ay': 'bg-purple-500', '802.11ad': 'bg-purple-400', 'Channel Bonding': 'bg-teal-500',
      'MIMO': 'bg-blue-600', 'Full Duplex': 'bg-green-600', 'Licensed Light': 'bg-amber-500',
      '2 Gbps': 'bg-teal-600', 'MIMO 4x4': 'bg-blue-700', '1 Gbps': 'bg-teal-500',
      'Long Range': 'bg-cyan-600', '5 GHz Backup': 'bg-blue-400', 'Auto-Failover': 'bg-green-500',
      'Budget': 'bg-gray-500', 'Sector': 'bg-indigo-400', 'Dual Port': 'bg-gray-500',
      '25 dBi Dish': 'bg-amber-500', '27 dBi Dish': 'bg-amber-600', '29 dBi Dish': 'bg-amber-700',
      '500mm Dish': 'bg-gray-500', '620mm Dish': 'bg-gray-600', 'Budget Client': 'bg-gray-400',
      '24 dBi': 'bg-amber-500', '26 dBi': 'bg-amber-600', '18 dBi': 'bg-amber-400',
      '34 dBi': 'bg-amber-700', '30 dBi': 'bg-amber-600', 'Slant 45°': 'bg-gray-500', 'Dish': 'bg-gray-500',
      'Extended Range': 'bg-cyan-500'
    };
    return <span className={`px-1.5 py-0.5 rounded text-xs ${colors[feature] || 'bg-gray-600'}`}>{feature}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-sm">UI</div>
            <span className="font-semibold">ui-choicer</span>
          </div>
          <a href="https://github.com/NicoUnterburger/ui-choicer" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex gap-1">
          {[
            { id: 'gateways', label: 'Gateways', count: Object.keys(gatewayData).length },
            { id: 'switching', label: 'Switches', count: Object.keys(switchData).length },
            { id: 'wifi', label: 'Access Points', count: Object.keys(apData).length },
            { id: 'bridges', label: 'PTP Links', count: Object.keys(bridgeData).length },
            { id: 'cameras', label: 'Cameras', count: Object.keys(cameraData).length },
            { id: 'nvr', label: 'NVR', count: Object.keys(nvrData).length },
            { id: 'nas', label: 'UNAS', count: Object.keys(nasData).length },
            { id: 'cart', label: '🛒 Saved', count: cart.reduce((s, i) => s + i.qty, 0) || null },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveSection(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeSection === tab.id 
                  ? 'text-blue-400 border-blue-400' 
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}>
              {tab.label} <span className="text-gray-500 ml-1">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 max-w-7xl mx-auto">
        {/* ==================== WIFI SECTION ==================== */}
        {activeSection === 'wifi' && (
          <>
            {/* Search & Filters */}
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Search access points..."
                  value={apFilters.searchText}
                  onChange={(e) => updateApFilter('searchText', e.target.value)}
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
                <button onClick={resetApFilters}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${activeApFilterCount > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}>
                  Reset {activeApFilterCount > 0 && `(${activeApFilterCount})`}
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                <select value={apFilters.generation} onChange={(e) => updateApFilter('generation', e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm">
                  <option value="all">All Generations</option>
                  <option value="Wi-Fi 5">Wi-Fi 5</option>
                  <option value="Wi-Fi 6">Wi-Fi 6</option>
                  <option value="Wi-Fi 6E">Wi-Fi 6E</option>
                  <option value="Wi-Fi 7">Wi-Fi 7</option>
                </select>
                <select value={apFilters.has6GHz} onChange={(e) => updateApFilter('has6GHz', e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm">
                  <option value="all">6 GHz: All</option>
                  <option value="yes">With 6 GHz</option>
                  <option value="no">Without 6 GHz</option>
                </select>
                <input type="number" placeholder="Min m²" value={apFilters.minCoverage} onChange={(e) => updateApFilter('minCoverage', e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm" />
                <input type="number" placeholder="Max €" value={apFilters.maxPrice} onChange={(e) => updateApFilter('maxPrice', e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm" />
                <input type="number" step="0.5" placeholder="Min dBi" value={apFilters.minGain} onChange={(e) => updateApFilter('minGain', e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm" />
                <select value={apFilters.uplink} onChange={(e) => updateApFilter('uplink', e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm">
                  <option value="all">All Uplinks</option>
                  <option value="1G">1 GbE</option>
                  <option value="2.5G">2.5 GbE</option>
                  <option value="10G">10 GbE</option>
                </select>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={apFilters.spectral} onChange={(e) => updateApFilter('spectral', e.target.checked)}
                    className="rounded bg-gray-700 border-gray-600" />
                  Spectral
                </label>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-1 mb-2">
              {Object.entries(apCategories).map(([k, v]) => (
                <button key={k} onClick={() => setCategoryFilter(k)}
                  className={`px-2 py-0.5 rounded text-xs font-medium ${categoryFilter === k ? 'bg-blue-600' : 'bg-gray-700'}`}>{v}</button>
              ))}
            </div>
            <div className="text-center text-sm text-gray-400 mb-2">
              {filteredAPs.length} of {Object.keys(apData).length} Access Points
            </div>

            {/* AP Buttons */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {filteredAPs.map(([k, d]) => (
                <button key={k} onClick={() => setSelectedAP(k)}
                  className={`px-2 py-1 rounded text-xs font-medium ${selectedAP === k ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                  {d.status === 'new' && '● '}{k}
                </button>
              ))}
            </div>

            {/* AP Detail Card */}
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-white">{ap.name}</h2>
                    {ap.status === 'new' && <span className="bg-green-600 text-xs px-2 py-0.5 rounded">NEW</span>}
                    {ap.status === 'legacy' && <span className="bg-gray-600 text-xs px-2 py-0.5 rounded">LEGACY</span>}
                  </div>
                  <div className="text-gray-400 text-sm mb-2">{ap.sku} • {ap.generation}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl font-bold text-green-400">~{formatPrice(ap.msrp)}</span>
                    <a href={getDatasheetLink(ap.sku, 'ap')} target="_blank" rel="noopener noreferrer" 
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs">Specs</a>
                    <a href={getGeizhalsLink(ap.sku)} target="_blank" rel="noopener noreferrer"
                      className="bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded text-xs">Geizhals</a>
                    <button onClick={() => toggleCart(ap.sku, ap.name, ap.msrp, 'Access Point', ap.color)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${isInCart(ap.sku) ? 'bg-green-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-500'}`}>
                      {isInCart(ap.sku) ? '✓ Saved' : '+ Save'}
                    </button>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {ap.features.map(f => <FeatureBadge key={f} feature={f} />)}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="bg-gray-700 rounded p-3">
                    <div className="text-gray-400 text-xs">Coverage</div>
                    <div className="text-white font-bold text-lg">{ap.coverage}m²</div>
                  </div>
                  <div className="bg-gray-700 rounded p-3">
                    <div className="text-gray-400 text-xs">Streams</div>
                    <div className="text-white font-bold text-lg">{ap.streams}x</div>
                  </div>
                  <div className="bg-gray-700 rounded p-3">
                    <div className="text-gray-400 text-xs">Clients</div>
                    <div className="text-white font-bold text-lg">{ap.clients}</div>
                  </div>
                  <div className="bg-gray-700 rounded p-3">
                    <div className="text-gray-400 text-xs">Uplink</div>
                    <div className="text-white font-bold">{ap.ethernet}</div>
                  </div>
                </div>
              </div>

              {/* Radio Details */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-700/50 rounded p-3">
                  <h4 className="text-orange-400 font-medium text-sm mb-2">2.4 GHz</h4>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between"><span className="text-gray-400">MIMO</span><span>{ap.radio24.mimo}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">TX</span><span>{ap.radio24.txPower} dBm</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Gain</span><span className="text-yellow-400">{ap.radio24.gain} dBi</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Max</span><span>{ap.radio24.maxRate} Mbps</span></div>
                  </div>
                </div>
                <div className="bg-gray-700/50 rounded p-3">
                  <h4 className="text-blue-400 font-medium text-sm mb-2">5 GHz</h4>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between"><span className="text-gray-400">MIMO</span><span>{ap.radio5.mimo}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">TX</span><span>{ap.radio5.txPower} dBm</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Gain</span><span className="text-yellow-400">{ap.radio5.gain} dBi</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Max</span><span>{ap.radio5.maxRate} Mbps</span></div>
                  </div>
                </div>
                {ap.radio6 ? (
                  <div className="bg-gray-700/50 rounded p-3 border border-purple-500/50">
                    <h4 className="text-purple-400 font-medium text-sm mb-2">6 GHz ✓</h4>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between"><span className="text-gray-400">MIMO</span><span>{ap.radio6.mimo}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">TX</span><span>{ap.radio6.txPower} dBm</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Gain</span><span className="text-yellow-400">{ap.radio6.gain} dBi</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Max</span><span>{ap.radio6.maxRate} Mbps</span></div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-700/50 rounded p-3 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">No 6 GHz</span>
                  </div>
                )}
              </div>

              {/* Radiation Patterns */}
              {ap.elevation && (
                <div className="mt-4">
                  <h4 className="text-sm text-gray-400 mb-2">Radiation Patterns (click to enlarge)</h4>
                  <div className="flex flex-wrap justify-center gap-3 cursor-pointer" onClick={() => setShowRadiationModal(true)}>
                    {/* 2.4 GHz */}
                    <div className="flex gap-2">
                      <PolarPlot data={ap.elevation['2.4GHz']} title="2.4G Elev" type="elevation" color="#F97316" size={100} />
                      <PolarPlot data={ap.azimuth['2.4GHz']} title="2.4G Azim" type="azimuth" color="#F97316" size={100} />
                    </div>
                    {/* 5 GHz */}
                    <div className="flex gap-2">
                      <PolarPlot data={ap.elevation['5GHz']} title="5G Elev" type="elevation" color="#3B82F6" size={100} />
                      <PolarPlot data={ap.azimuth['5GHz']} title="5G Azim" type="azimuth" color="#3B82F6" size={100} />
                    </div>
                    {/* 6 GHz (wenn vorhanden) */}
                    {ap.elevation['6GHz'] && (
                      <div className="flex gap-2">
                        <PolarPlot data={ap.elevation['6GHz']} title="6G Elev" type="elevation" color="#A855F7" size={100} />
                        <PolarPlot data={ap.azimuth['6GHz']} title="6G Azim" type="azimuth" color="#A855F7" size={100} />
                      </div>
                    )}
                  </div>
                  {ap.beamwidth && (
                    <div className="text-center text-xs text-gray-500 mt-1">
                      Beamwidth: H {ap.beamwidth.h}° / V {ap.beamwidth.v}° • <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => setShowRadiationModal(true)}>🔍 Vergrößern</span>
                    </div>
                  )}
                </div>
              )}

              {/* Radiation Pattern Modal */}
              {showRadiationModal && ap.elevation && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowRadiationModal(false)}>
                  <div className="bg-gray-900 rounded-2xl p-4 max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold" style={{ color: ap.color }}>📡 {ap.name} - Radiation Patterns</h3>
                      <button onClick={() => setShowRadiationModal(false)} className="text-2xl hover:text-red-400">✕</button>
                    </div>
                    
                    {/* Band selector tabs */}
                    <div className="flex justify-center gap-2 mb-4">
                      {['2.4GHz', '5GHz', ...(ap.elevation['6GHz'] ? ['6GHz'] : [])].map(band => (
                        <button key={band} onClick={() => setSelectedBand(band)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedBand === band 
                            ? band === '2.4GHz' ? 'bg-orange-600' : band === '5GHz' ? 'bg-blue-600' : 'bg-purple-600'
                            : 'bg-gray-700 hover:bg-gray-600'}`}>
                          {band}
                        </button>
                      ))}
                    </div>

                    {/* Large diagrams */}
                    <div className="flex flex-wrap justify-center gap-6">
                      <LargePolarPlot 
                        data={ap.elevation[selectedBand]} 
                        title={`${selectedBand} Elevation (Vertical)`}
                        type="elevation" 
                        color={selectedBand === '2.4GHz' ? '#F97316' : selectedBand === '5GHz' ? '#3B82F6' : '#A855F7'} 
                        size={280} 
                      />
                      <LargePolarPlot 
                        data={ap.azimuth[selectedBand]} 
                        title={`${selectedBand} Azimuth (Horizontal)`}
                        type="azimuth" 
                        color={selectedBand === '2.4GHz' ? '#F97316' : selectedBand === '5GHz' ? '#3B82F6' : '#A855F7'} 
                        size={280} 
                      />
                    </div>

                    {/* Legend and info */}
                    <div className="mt-4 bg-gray-800 rounded-lg p-3">
                      <h4 className="font-semibold mb-2">📖 Legend</h4>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <h5 className="text-blue-400 font-medium">Elevation (Vertical)</h5>
                          <ul className="text-gray-400 text-xs space-y-1">
                            <li>• Side view of the radiation pattern</li>
                            <li>• 0° = directly below the AP</li>
                            <li>• 90° = horizontal plane</li>
                            <li>• Important for ceiling height &amp; vertical coverage</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-green-400 font-medium">Azimuth (Horizontal)</h5>
                          <ul className="text-gray-400 text-xs space-y-1">
                            <li>• Top-down view of the radiation pattern</li>
                            <li>• 360° omnidirectional radiation</li>
                            <li>• Shows uniformity of coverage</li>
                            <li>• Ideal: uniform circle</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-gray-500">
                        <strong>Beamwidth:</strong> H {ap.beamwidth?.h}° | V {ap.beamwidth?.v}° •
                        <strong className="ml-2">Max Gain:</strong> 2.4G {ap.radio24.gain} dBi | 5G {ap.radio5.gain} dBi {ap.radio6 && `| 6G ${ap.radio6.gain} dBi`}
                      </div>
                    </div>

                    <button onClick={() => setShowRadiationModal(false)} 
                      className="mt-4 w-full bg-gray-700 hover:bg-gray-600 py-2 rounded-lg font-medium">
                      Close
                    </button>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="flex flex-wrap gap-3 mt-3 text-xs">
                <div><span className="text-gray-400">PoE:</span> <span className="font-medium">{ap.poe}</span></div>
                <div><span className="text-gray-400">Mount:</span> <span className="font-medium">{ap.mount}</span></div>
                {ap.notes && <div className="text-yellow-400">💡 {ap.notes}</div>}
              </div>
            </div>

            {/* AP Comparison Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <h3 className="bg-gray-700 px-3 py-1.5 font-semibold text-sm">Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="p-1 text-left">Model</th>
                      <th className="p-1">Gen</th>
                      <th className="p-1">Price</th>
                      <th className="p-1">m²</th>
                      <th className="p-1">5G Gain</th>
                      <th className="p-1">6 GHz</th>
                      <th className="p-1">Uplink</th>
                      <th className="p-1">PoE</th>
                      <th className="p-1">📋</th>
                      <th className="p-1">🛒</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAPs.map(([k, d]) => (
                      <tr key={k} className={`border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${selectedAP === k ? 'bg-gray-700' : ''}`} onClick={() => setSelectedAP(k)}>
                        <td className="p-1 font-semibold" style={{ color: d.color }}>{d.status === 'new' && '★ '}{d.name}</td>
                        <td className="p-1 text-center">{d.generation.replace('Wi-Fi ', '')}</td>
                        <td className="p-1 text-center text-green-400">{formatPrice(d.msrp)}</td>
                        <td className="p-1 text-center">{d.coverage}</td>
                        <td className="p-1 text-center text-yellow-400">{d.radio5.gain}</td>
                        <td className="p-1 text-center">{d.radio6 ? '✓' : '-'}</td>
                        <td className="p-1 text-center">{d.ethernet}</td>
                        <td className="p-1 text-center">{d.poe.replace(/\s*\([^)]*\)/, '')}</td>
                        <td className="p-1 text-center"><a href={getDatasheetLink(d.sku, 'ap')} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-blue-400 hover:text-blue-300">→</a></td>
                        <td className="p-1 text-center"><a href={getGeizhalsLink(d.sku)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-orange-400 hover:text-orange-300">→</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ==================== SWITCH SECTION ==================== */}
        {activeSection === 'switching' && (
          <>
            {/* Search Bar */}
            <div className="bg-gray-800 rounded-lg p-3 mb-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="🔍 Search switches (name, SKU, ports...)"
                    value={switchFilters.searchText}
                    onChange={(e) => updateFilter('searchText', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                  {switchFilters.searchText && (
                    <button onClick={() => updateFilter('searchText', '')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">✕</button>
                  )}
                </div>
                <button
                  onClick={resetFilters}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeFilterCount > 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700'}`}
                >
                  ↺ Reset {activeFilterCount > 0 && `(${activeFilterCount})`}
                </button>
              </div>

              {/* Filter Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {/* Ports */}
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Ports (min-max)</label>
                  <div className="flex gap-1">
                    <input type="number" placeholder="Min" value={switchFilters.minPorts} onChange={(e) => updateFilter('minPorts', e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs" />
                    <input type="number" placeholder="Max" value={switchFilters.maxPorts} onChange={(e) => updateFilter('maxPorts', e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs" />
                  </div>
                </div>

                {/* PoE */}
                <div>
                  <label className="text-xs text-gray-400 block mb-1">PoE</label>
                  <select value={switchFilters.poe} onChange={(e) => updateFilter('poe', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs">
                    <option value="all">All</option>
                    <option value="yes">With PoE</option>
                    <option value="no">Without PoE</option>
                    <option value="poe+">PoE+ (30W)</option>
                    <option value="poe++">PoE++ (60W)</option>
                    <option value="poe+++">PoE+++ (90W)</option>
                  </select>
                </div>

                {/* PoE Budget */}
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Min PoE Budget (W)</label>
                  <input type="number" placeholder="e.g. 400" value={switchFilters.minPoeBudget} onChange={(e) => updateFilter('minPoeBudget', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs" />
                </div>

                {/* Layer */}
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Layer</label>
                  <select value={switchFilters.layer} onChange={(e) => updateFilter('layer', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs">
                    <option value="all">All</option>
                    <option value="L2">Layer 2</option>
                    <option value="L3">Layer 3</option>
                  </select>
                </div>

                {/* Speed */}
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Port Speed</label>
                  <select value={switchFilters.speed} onChange={(e) => updateFilter('speed', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs">
                    <option value="all">All</option>
                    <option value="1G">1 GbE</option>
                    <option value="2.5G">2.5 GbE</option>
                    <option value="10G">10 GbE</option>
                    <option value="25G">25G SFP28</option>
                  </select>
                </div>

                {/* Max Price */}
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Max Price ($)</label>
                  <input type="number" placeholder="e.g. 500" value={switchFilters.maxPrice} onChange={(e) => updateFilter('maxPrice', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs" />
                </div>

                {/* Form Factor */}
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Form Factor</label>
                  <select value={switchFilters.formFactor} onChange={(e) => updateFilter('formFactor', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs">
                    <option value="all">All</option>
                    <option value="rack">Rackmount (1U)</option>
                    <option value="desktop">Desktop</option>
                    <option value="compact">Compact</option>
                  </select>
                </div>

                {/* Checkboxes */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400">Features</label>
                  <div className="flex flex-wrap gap-2">
                    <label className="flex items-center gap-1 text-xs cursor-pointer">
                      <input type="checkbox" checked={switchFilters.sfpPlus} onChange={(e) => updateFilter('sfpPlus', e.target.checked)}
                        className="rounded bg-gray-700 border-gray-600" />
                      <span>SFP+</span>
                    </label>
                    <label className="flex items-center gap-1 text-xs cursor-pointer">
                      <input type="checkbox" checked={switchFilters.sfp28} onChange={(e) => updateFilter('sfp28', e.target.checked)}
                        className="rounded bg-gray-700 border-gray-600" />
                      <span>SFP28</span>
                    </label>
                    <label className="flex items-center gap-1 text-xs cursor-pointer">
                      <input type="checkbox" checked={switchFilters.etherlighting} onChange={(e) => updateFilter('etherlighting', e.target.checked)}
                        className="rounded bg-gray-700 border-gray-600" />
                      <span>Etherlighting</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-1 mb-2">
              {Object.entries(switchCategories).map(([k, v]) => (
                <button key={k} onClick={() => setSwitchCategoryFilter(k)}
                  className={`px-2 py-0.5 rounded text-xs font-medium ${switchCategoryFilter === k ? 'bg-blue-600' : 'bg-gray-700'}`}>{v}</button>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-center text-sm text-gray-400 mb-2">
              {filteredSwitches.length} of {Object.keys(switchData).length} Switches
              {activeFilterCount > 0 && <span className="text-blue-400 ml-2">({activeFilterCount} filter(s) active)</span>}
            </div>

            {/* Switch Grid */}
            <div className="flex flex-wrap justify-center gap-1 mb-2 max-h-24 overflow-y-auto">
              {filteredSwitches.map(([k, d]) => (
                <button key={k} onClick={() => setSelectedSwitch(k)}
                  className={`px-1.5 py-0.5 rounded text-xs font-medium transition-all flex items-center gap-0.5 ${selectedSwitch === k ? 'text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  style={selectedSwitch === k ? { backgroundColor: d.color } : {}}>
                  {d.status === 'new' && <span className="text-yellow-300">★</span>}
                  {d.name}
                </button>
              ))}
            </div>

            {/* Switch Detail Card */}
            <div className="bg-gray-800 rounded-lg p-3 mb-2">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold" style={{ color: sw.color }}>{sw.name}</h2>
                    {sw.status === 'new' && <span className="bg-yellow-500 text-black text-xs px-1 rounded">NEU</span>}
                    {sw.status === 'legacy' && <span className="bg-gray-600 text-xs px-1 rounded">VINTAGE</span>}
                    <a href={getDatasheetLink(sw.sku, 'switch')} target="_blank" rel="noopener noreferrer" 
                      className="bg-blue-600 hover:bg-blue-500 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      📋 Datenblatt
                    </a>
                    <a href={getGeizhalsLink(sw.sku)} target="_blank" rel="noopener noreferrer"
                      className="bg-orange-600 hover:bg-orange-500 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      🛒 Geizhals
                    </a>
                    <button onClick={() => toggleCart(sw.sku, sw.name, sw.msrp, 'Switch', sw.color)}
                      className={`px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1 transition-colors ${isInCart(sw.sku) ? 'bg-green-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-500'}`}>
                      {isInCart(sw.sku) ? '✓ Saved' : '+ Save'}
                    </button>
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{sw.sku}</div>
                  <div className="flex gap-1 flex-wrap mt-1">
                    <span className="bg-green-700 px-1.5 py-0.5 rounded text-xs font-bold">~{formatPrice(sw.msrp)}</span>
                    {sw.features.map(f => <FeatureBadge key={f} feature={f} />)}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 text-center text-xs">
                  <div><div className="text-gray-500">Ports</div><div className="font-bold text-lg">{sw.portCount}</div></div>
                  <div><div className="text-gray-500">Speed</div><div className="font-bold">{sw.speed}</div></div>
                  <div><div className="text-gray-500">Layer</div><div className="font-bold">{sw.layer}</div></div>
                  <div><div className="text-gray-500">PoE Budget</div><div className="font-bold text-orange-400">{sw.poeBudget > 0 ? `${sw.poeBudget}W` : '-'}</div></div>
                </div>
              </div>

              {/* Port Details */}
              <div className="bg-gray-700/50 rounded p-2 mt-3">
                <h4 className="text-xs font-semibold mb-2">Port-Konfiguration</h4>
                <div className="text-xs text-gray-300">{sw.ports}</div>
                <div className="grid grid-cols-6 gap-2 mt-2">
                  {sw.ethernet1g > 0 && <div className="bg-gray-600 rounded p-1.5 text-center"><div className="text-lg font-bold">{sw.ethernet1g}</div><div className="text-xs text-gray-400">1G</div></div>}
                  {sw.ethernet2_5g > 0 && <div className="bg-blue-900 rounded p-1.5 text-center"><div className="text-lg font-bold">{sw.ethernet2_5g}</div><div className="text-xs text-gray-400">2.5G</div></div>}
                  {sw.ethernet10g > 0 && <div className="bg-teal-900 rounded p-1.5 text-center"><div className="text-lg font-bold">{sw.ethernet10g}</div><div className="text-xs text-gray-400">10G</div></div>}
                  {sw.sfpPlus > 0 && <div className="bg-purple-900 rounded p-1.5 text-center"><div className="text-lg font-bold">{sw.sfpPlus}</div><div className="text-xs text-gray-400">SFP+</div></div>}
                  {sw.sfp28 > 0 && <div className="bg-pink-900 rounded p-1.5 text-center"><div className="text-lg font-bold">{sw.sfp28}</div><div className="text-xs text-gray-400">SFP28</div></div>}
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex flex-wrap gap-3 mt-3 text-xs">
                <div><span className="text-gray-400">PoE:</span> <span className="font-medium">{sw.poe || 'Kein PoE'}</span></div>
                <div><span className="text-gray-400">Form:</span> <span className="font-medium">{sw.formFactor}</span></div>
                <div><span className="text-gray-400">Max Power:</span> <span className="font-medium">{sw.power}W</span></div>
                {sw.notes && <div className="text-yellow-400">💡 {sw.notes}</div>}
              </div>
            </div>

            {/* Switch Comparison Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <h3 className="bg-gray-700 px-3 py-1.5 font-semibold text-sm">Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="p-1 text-left">Model</th>
                      <th className="p-1">Ports</th>
                      <th className="p-1 text-gray-400">1G</th>
                      <th className="p-1 text-blue-400">2.5G</th>
                      <th className="p-1 text-teal-400">10G</th>
                      <th className="p-1 text-purple-400">SFP+</th>
                      <th className="p-1 text-yellow-400">SFP28</th>
                      <th className="p-1">Price</th>
                      <th className="p-1">PoE</th>
                      <th className="p-1">Budget</th>
                      <th className="p-1">Layer</th>
                      <th className="p-1">📋</th>
                      <th className="p-1">🛒</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSwitches.map(([k, d]) => (
                      <tr key={k} className={`border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${selectedSwitch === k ? 'bg-gray-700' : ''}`} onClick={() => setSelectedSwitch(k)}>
                        <td className="p-1 font-semibold" style={{ color: d.color }}>{d.status === 'new' && '★ '}{d.name}</td>
                        <td className="p-1 text-center">{d.portCount}</td>
                        <td className="p-1 text-center text-gray-400">{d.ethernet1g > 0 ? d.ethernet1g : '-'}</td>
                        <td className="p-1 text-center text-blue-400">{d.ethernet2_5g > 0 ? d.ethernet2_5g : '-'}</td>
                        <td className="p-1 text-center text-teal-400">{d.ethernet10g > 0 ? d.ethernet10g : '-'}</td>
                        <td className="p-1 text-center text-purple-400">{d.sfpPlus > 0 ? d.sfpPlus : '-'}</td>
                        <td className="p-1 text-center text-yellow-400">{d.sfp28 > 0 ? d.sfp28 : '-'}</td>
                        <td className="p-1 text-center text-green-400">{formatPrice(d.msrp)}</td>
                        <td className="p-1 text-center">{d.poe || '-'}</td>
                        <td className="p-1 text-center text-orange-400">{d.poeBudget > 0 ? d.poeBudget : '-'}</td>
                        <td className="p-1 text-center">{d.layer}</td>
                        <td className="p-1 text-center"><a href={getDatasheetLink(d.sku, 'switch')} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-blue-400 hover:text-blue-300">→</a></td>
                        <td className="p-1 text-center"><a href={getGeizhalsLink(d.sku)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-orange-400 hover:text-orange-300">→</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Recommendations */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
              <div className="bg-gray-800 rounded p-2 border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 text-xs">Budget PoE</h4>
                <p className="text-xs text-gray-300">USW-Lite-8-PoE ~109 €</p>
              </div>
              <div className="bg-gray-800 rounded p-2 border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-400 text-xs">Best Value L3</h4>
                <p className="text-xs text-gray-300">Pro Max 24 PoE ~599 €</p>
              </div>
              <div className="bg-gray-800 rounded p-2 border-l-4 border-teal-500">
                <h4 className="font-semibold text-teal-400 text-xs">10G Network</h4>
                <p className="text-xs text-gray-300">Pro XG 8 PoE ~499 €</p>
              </div>
              <div className="bg-gray-800 rounded p-2 border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 text-xs">Enterprise HA</h4>
                <p className="text-xs text-gray-300">ECS-24-PoE ~1.299 €</p>
              </div>
            </div>
          </>
        )}

        {/* ==================== GATEWAY SECTION ==================== */}
        {activeSection === 'gateways' && (
          <>
            {/* Search Bar */}
            <div className="bg-gray-800 rounded-lg p-3 mb-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="🔍 Search gateways (name, SKU...)"
                    value={gatewayFilters.searchText}
                    onChange={(e) => updateGatewayFilter('searchText', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                  />
                  {gatewayFilters.searchText && (
                    <button onClick={() => updateGatewayFilter('searchText', '')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">✕</button>
                  )}
                </div>
                <button
                  onClick={resetGatewayFilters}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeGatewayFilterCount > 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700'}`}
                >
                  ↺ Reset {activeGatewayFilterCount > 0 && `(${activeGatewayFilterCount})`}
                </button>
              </div>

              {/* Filter Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Built-in Wi-Fi</label>
                  <select value={gatewayFilters.hasWifi} onChange={(e) => updateGatewayFilter('hasWifi', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs">
                    <option value="all">All</option>
                    <option value="yes">With Wi-Fi</option>
                    <option value="no">Without Wi-Fi</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Min IPS (Gbps)</label>
                  <input type="number" step="0.5" placeholder="e.g. 3" value={gatewayFilters.minIPS} onChange={(e) => updateGatewayFilter('minIPS', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Max Price (€)</label>
                  <input type="number" placeholder="e.g. 500" value={gatewayFilters.maxPrice} onChange={(e) => updateGatewayFilter('maxPrice', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs" />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-1 text-xs cursor-pointer">
                    <input type="checkbox" checked={gatewayFilters.has10G} onChange={(e) => updateGatewayFilter('has10G', e.target.checked)}
                      className="rounded bg-gray-700 border-gray-600" />
                    <span>10G+ Ports</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-1 mb-2">
              {Object.entries(gatewayCategories).map(([k, v]) => (
                <button key={k} onClick={() => setGatewayCategoryFilter(k)}
                  className={`px-2 py-0.5 rounded text-xs font-medium ${gatewayCategoryFilter === k ? 'bg-purple-600' : 'bg-gray-700'}`}>{v}</button>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-center text-sm text-gray-400 mb-2">
              {filteredGateways.length} of {Object.keys(gatewayData).length} Gateways
              {activeGatewayFilterCount > 0 && <span className="text-purple-400 ml-2">({activeGatewayFilterCount} filter(s) active)</span>}
            </div>

            {/* Gateway Grid */}
            <div className="flex flex-wrap justify-center gap-1 mb-2 max-h-24 overflow-y-auto">
              {filteredGateways.map(([k, d]) => (
                <button key={k} onClick={() => setSelectedGateway(k)}
                  className={`px-1.5 py-0.5 rounded text-xs font-medium transition-all flex items-center gap-0.5 ${selectedGateway === k ? 'text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  style={selectedGateway === k ? { backgroundColor: d.color } : {}}>
                  {d.status === 'new' && <span className="text-yellow-300">★</span>}
                  {d.name}
                </button>
              ))}
            </div>

            {/* Gateway Detail Card */}
            <div className="bg-gray-800 rounded-lg p-3 mb-2">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold" style={{ color: gw.color }}>{gw.name}</h2>
                    {gw.status === 'new' && <span className="bg-yellow-500 text-black text-xs px-1 rounded">NEU</span>}
                    <a href={getDatasheetLink(gw.sku, 'gateway')} target="_blank" rel="noopener noreferrer" 
                      className="bg-blue-600 hover:bg-blue-500 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      📋 Datenblatt
                    </a>
                    <a href={getGeizhalsLink(gw.sku)} target="_blank" rel="noopener noreferrer"
                      className="bg-orange-600 hover:bg-orange-500 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      🛒 Geizhals
                    </a>
                    <button onClick={() => toggleCart(gw.sku, gw.name, gw.msrp, 'Gateway', gw.color)}
                      className={`px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1 transition-colors ${isInCart(gw.sku) ? 'bg-green-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-500'}`}>
                      {isInCart(gw.sku) ? '✓ Saved' : '+ Save'}
                    </button>
                  </div>
                  <div className="text-xs text-gray-400">{gw.sku}</div>
                  <div className="flex gap-1 flex-wrap mt-1">
                    <span className="bg-green-700 px-1.5 py-0.5 rounded text-xs font-bold">~{formatPrice(gw.msrp)}</span>
                    {gw.wifi && <span className="bg-purple-600 px-1.5 py-0.5 rounded text-xs">{gw.wifi}</span>}
                    {gw.features.map(f => <FeatureBadge key={f} feature={f} />)}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 text-center text-xs">
                  <div><div className="text-gray-500">IPS Speed</div><div className="font-bold text-lg text-cyan-400">{gw.ipsSpeed} Gbps</div></div>
                  <div><div className="text-gray-500">Devices</div><div className="font-bold text-lg">{gw.devices}+</div></div>
                  <div><div className="text-gray-500">Clients</div><div className="font-bold">{gw.clients}+</div></div>
                  <div><div className="text-gray-500">Form</div><div className="font-bold">{gw.formFactor}</div></div>
                </div>
              </div>

              {/* Gateway Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-blue-400 mb-1">WAN Ports</h4>
                  <div className="text-xs">{gw.wan}</div>
                </div>
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-green-400 mb-1">LAN Ports</h4>
                  <div className="text-xs">{gw.lan}</div>
                </div>
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-purple-400 mb-1">SFP/SFP+</h4>
                  <div className="text-xs">{gw.sfp || '-'}</div>
                </div>
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-orange-400 mb-1">PoE / Storage</h4>
                  <div className="text-xs">{gw.poe || '-'} / {gw.storage || '-'}</div>
                </div>
              </div>

              {/* Apps */}
              <div className="mt-3 text-xs">
                <span className="text-gray-400">UniFi Apps:</span> {gw.apps.map(app => (
                  <span key={app} className="ml-1 bg-gray-700 px-1.5 py-0.5 rounded">{app}</span>
                ))}
              </div>

              {gw.notes && <div className="text-yellow-400 text-xs mt-2">💡 {gw.notes}</div>}
            </div>

            {/* Gateway Comparison Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <h3 className="bg-gray-700 px-3 py-1.5 font-semibold text-sm">Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="p-1 text-left">Model</th>
                      <th className="p-1">Price</th>
                      <th className="p-1">IPS</th>
                      <th className="p-1">Devices</th>
                      <th className="p-1">Wi-Fi</th>
                      <th className="p-1">10G+</th>
                      <th className="p-1">PoE</th>
                      <th className="p-1">Form</th>
                      <th className="p-1">📋</th>
                      <th className="p-1">🛒</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGateways.map(([k, g]) => (
                      <tr key={k} className={`border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${selectedGateway === k ? 'bg-gray-700' : ''}`} onClick={() => setSelectedGateway(k)}>
                        <td className="p-1 font-semibold" style={{ color: g.color }}>{g.status === 'new' && '★ '}{g.name}</td>
                        <td className="p-1 text-center text-green-400">{formatPrice(g.msrp)}</td>
                        <td className="p-1 text-center text-cyan-400">{g.ipsSpeed}</td>
                        <td className="p-1 text-center">{g.devices}+</td>
                        <td className="p-1 text-center">{g.wifi ? '✓' : '-'}</td>
                        <td className="p-1 text-center">{g.sfp ? '✓' : '-'}</td>
                        <td className="p-1 text-center">{g.poe ? '✓' : '-'}</td>
                        <td className="p-1 text-center">{g.formFactor}</td>
                        <td className="p-1 text-center"><a href={getDatasheetLink(g.sku, 'gateway')} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-blue-400 hover:text-blue-300">→</a></td>
                        <td className="p-1 text-center"><a href={getGeizhalsLink(g.sku)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-orange-400 hover:text-orange-300">→</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Gateway Recommendations */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
              <div className="bg-gray-800 rounded p-2 border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 text-xs">Budget</h4>
                <p className="text-xs text-gray-300">UCG-Ultra ~129 €</p>
              </div>
              <div className="bg-gray-800 rounded p-2 border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-400 text-xs">Wi-Fi 7 All-in-One</h4>
                <p className="text-xs text-gray-300">UDR7 ~279 €</p>
              </div>
              <div className="bg-gray-800 rounded p-2 border-l-4 border-cyan-500">
                <h4 className="font-semibold text-cyan-400 text-xs">Best Compact 10G</h4>
                <p className="text-xs text-gray-300">UCG-Fiber ~279 €</p>
              </div>
              <div className="bg-gray-800 rounded p-2 border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 text-xs">Enterprise</h4>
                <p className="text-xs text-gray-300">EFG ~1.999 €</p>
              </div>
            </div>
          </>
        )}

        {/* ==================== CAMERA SECTION ==================== */}
        {activeSection === 'cameras' && (
          <>
            {/* Search Bar */}
            <div className="bg-gray-800 rounded-lg p-3 mb-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="🔍 Search cameras (name, SKU, generation...)"
                    value={cameraFilters.searchText}
                    onChange={(e) => updateCameraFilter('searchText', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                  />
                  {cameraFilters.searchText && (
                    <button onClick={() => updateCameraFilter('searchText', '')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">✕</button>
                  )}
                </div>
                <button
                  onClick={resetCameraFilters}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeCameraFilterCount > 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700'}`}
                >
                  ↺ Reset {activeCameraFilterCount > 0 && `(${activeCameraFilterCount})`}
                </button>
              </div>

              {/* Filter Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {/* Generation */}
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Generation</label>
                  <select value={cameraFilters.generation} onChange={(e) => updateCameraFilter('generation', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs">
                    <option value="all">All</option>
                    <option value="G6">G6 (New)</option>
                    <option value="G5">G5</option>
                    <option value="AI">AI Series</option>
                    <option value="G4">G4</option>
                  </select>
                </div>

                {/* AI */}
                <div>
                  <label className="text-xs text-gray-400 block mb-1">AI Features</label>
                  <select value={cameraFilters.hasAI} onChange={(e) => updateCameraFilter('hasAI', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs">
                    <option value="all">All</option>
                    <option value="yes">With AI</option>
                    <option value="no">Without AI</option>
                  </select>
                </div>

                {/* Connection */}
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Connection</label>
                  <select value={cameraFilters.connection} onChange={(e) => updateCameraFilter('connection', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs">
                    <option value="all">All</option>
                    <option value="PoE">PoE</option>
                    <option value="WiFi">WiFi</option>
                    <option value="PoE++">PoE++</option>
                  </select>
                </div>

                {/* IP Schutzklasse */}
                <div>
                  <label className="text-xs text-gray-400 block mb-1">IP Rating</label>
                  <select value={cameraFilters.ipClass} onChange={(e) => updateCameraFilter('ipClass', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs">
                    <option value="all">All</option>
                    <option value="IPX4">IPX4 (Splash proof)</option>
                    <option value="IPX5">IPX5 (Water jet)</option>
                    <option value="IP55">IP55 (Dust + jet)</option>
                    <option value="IP65">IP65 (Dustproof + jet)</option>
                    <option value="IP66">IP66 (Dustproof + heavy rain)</option>
                    <option value="IP67">IP67 (Dustproof + submersible)</option>
                  </select>
                </div>

                {/* Max Price */}
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Max Price ($)</label>
                  <input type="number" placeholder="e.g. 500" value={cameraFilters.maxPrice} onChange={(e) => updateCameraFilter('maxPrice', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs" />
                </div>

                {/* Checkboxes */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400">Features</label>
                  <div className="flex flex-wrap gap-2">
                    <label className="flex items-center gap-1 text-xs cursor-pointer">
                      <input type="checkbox" checked={cameraFilters.hasLPR} onChange={(e) => updateCameraFilter('hasLPR', e.target.checked)}
                        className="rounded bg-gray-700 border-gray-600" />
                      <span>LPR</span>
                    </label>
                    <label className="flex items-center gap-1 text-xs cursor-pointer">
                      <input type="checkbox" checked={cameraFilters.hasFaceId} onChange={(e) => updateCameraFilter('hasFaceId', e.target.checked)}
                        className="rounded bg-gray-700 border-gray-600" />
                      <span>Face ID</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-1 mb-2">
              {Object.entries(cameraCategories).map(([k, v]) => (
                <button key={k} onClick={() => setCameraCategoryFilter(k)}
                  className={`px-2 py-0.5 rounded text-xs font-medium ${cameraCategoryFilter === k ? 'bg-red-600' : 'bg-gray-700'}`}>{v}</button>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-center text-sm text-gray-400 mb-2">
              {filteredCameras.length} of {Object.keys(cameraData).length} Cameras
              {activeCameraFilterCount > 0 && <span className="text-red-400 ml-2">({activeCameraFilterCount} filter(s) active)</span>}
            </div>

            {/* Camera Grid */}
            <div className="flex flex-wrap justify-center gap-1 mb-2 max-h-24 overflow-y-auto">
              {filteredCameras.map(([k, d]) => (
                <button key={k} onClick={() => setSelectedCamera(k)}
                  className={`px-1.5 py-0.5 rounded text-xs font-medium transition-all flex items-center gap-0.5 ${selectedCamera === k ? 'text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  style={selectedCamera === k ? { backgroundColor: d.color } : {}}>
                  {d.status === 'new' && <span className="text-yellow-300">★</span>}
                  {d.name}
                </button>
              ))}
            </div>

            {/* Camera Detail Card */}
            <div className="bg-gray-800 rounded-lg p-3 mb-2">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold" style={{ color: cam.color }}>{cam.name}</h2>
                    {cam.status === 'new' && <span className="bg-yellow-500 text-black text-xs px-1 rounded">NEU</span>}
                    <a href={getDatasheetLink(cam.sku, 'camera')} target="_blank" rel="noopener noreferrer" 
                      className="bg-blue-600 hover:bg-blue-500 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      📋 Datenblatt
                    </a>
                    <a href={getGeizhalsLink(cam.sku)} target="_blank" rel="noopener noreferrer"
                      className="bg-orange-600 hover:bg-orange-500 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      🛒 Geizhals
                    </a>
                    <button onClick={() => toggleCart(cam.sku, cam.name, cam.msrp, 'Camera', cam.color)}
                      className={`px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1 transition-colors ${isInCart(cam.sku) ? 'bg-green-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-500'}`}>
                      {isInCart(cam.sku) ? '✓ Saved' : '+ Save'}
                    </button>
                  </div>
                  <div className="text-xs text-gray-400">{cam.sku}</div>
                  <div className="flex gap-1 flex-wrap mt-1">
                    <span className="bg-gray-700 px-1.5 py-0.5 rounded text-xs">{cam.generation}</span>
                    <span className="bg-green-700 px-1.5 py-0.5 rounded text-xs font-bold">~{formatPrice(cam.msrp)}</span>
                    {cam.features.map(f => <FeatureBadge key={f} feature={f} />)}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 text-center text-xs">
                  <div><div className="text-gray-500">Resolution</div><div className="font-bold">{cam.resolution}</div></div>
                  <div><div className="text-gray-500">Sensor</div><div className="font-bold">{cam.sensor}</div></div>
                  <div><div className="text-gray-500">FoV</div><div className="font-bold">{cam.fov}</div></div>
                  <div><div className="text-gray-500">IR Range</div><div className="font-bold">{cam.irRange}m</div></div>
                </div>
              </div>

              {/* Camera Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-blue-400 mb-1">Connection</h4>
                  <div className="text-xs">{cam.connection}</div>
                </div>
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-purple-400 mb-1">Audio</h4>
                  <div className="text-xs">{cam.audio}</div>
                </div>
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-cyan-400 mb-1">IP Rating</h4>
                  <div className="text-xs">{cam.ip}</div>
                </div>
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-yellow-400 mb-1">AI Features</h4>
                  <div className="text-xs flex gap-2">
                    <span className={cam.ai ? 'text-green-400' : 'text-gray-500'}>AI {cam.ai ? '✓' : '✗'}</span>
                    <span className={cam.lpr ? 'text-amber-400' : 'text-gray-500'}>LPR {cam.lpr ? '✓' : '✗'}</span>
                    <span className={cam.faceId ? 'text-pink-400' : 'text-gray-500'}>Face {cam.faceId ? '✓' : '✗'}</span>
                  </div>
                </div>
              </div>

              {cam.notes && <div className="text-yellow-400 text-xs mt-2">💡 {cam.notes}</div>}
            </div>

            {/* Camera Comparison Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <h3 className="bg-gray-700 px-3 py-1.5 font-semibold text-sm">Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="p-1 text-left">Model</th>
                      <th className="p-1">Gen</th>
                      <th className="p-1">Price</th>
                      <th className="p-1">Resolution</th>
                      <th className="p-1">FoV</th>
                      <th className="p-1">IR</th>
                      <th className="p-1">AI</th>
                      <th className="p-1">LPR</th>
                      <th className="p-1">📋</th>
                      <th className="p-1">🛒</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCameras.map(([k, c]) => (
                      <tr key={k} className={`border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${selectedCamera === k ? 'bg-gray-700' : ''}`} onClick={() => setSelectedCamera(k)}>
                        <td className="p-1 font-semibold" style={{ color: c.color }}>{c.status === 'new' && '★ '}{c.name}</td>
                        <td className="p-1 text-center">{c.generation}</td>
                        <td className="p-1 text-center text-green-400">{formatPrice(c.msrp)}</td>
                        <td className="p-1 text-center">{c.resolution}</td>
                        <td className="p-1 text-center">{c.fov}</td>
                        <td className="p-1 text-center">{c.irRange}m</td>
                        <td className="p-1 text-center">{c.ai ? '✓' : '-'}</td>
                        <td className="p-1 text-center">{c.lpr ? '✓' : '-'}</td>
                        <td className="p-1 text-center"><a href={getDatasheetLink(c.sku, 'camera')} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-blue-400 hover:text-blue-300">→</a></td>
                        <td className="p-1 text-center"><a href={getGeizhalsLink(c.sku)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-orange-400 hover:text-orange-300">→</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Camera Recommendations */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
              <div className="bg-gray-800 rounded p-2 border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 text-xs">Best Value 4K</h4>
                <p className="text-xs text-gray-300">G6 Bullet ~199 €</p>
              </div>
              <div className="bg-gray-800 rounded p-2 border-l-4 border-cyan-500">
                <h4 className="font-semibold text-cyan-400 text-xs">WiFi / Wireless</h4>
                <p className="text-xs text-gray-300">G6 Instant ~179 €</p>
              </div>
              <div className="bg-gray-800 rounded p-2 border-l-4 border-amber-500">
                <h4 className="font-semibold text-amber-400 text-xs">License Plate</h4>
                <p className="text-xs text-gray-300">AI LPR ~799 €</p>
              </div>
              <div className="bg-gray-800 rounded p-2 border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 text-xs">PTZ Premium</h4>
                <p className="text-xs text-gray-300">AI PTZ Precision ~1.999 €</p>
              </div>
            </div>
          </>
        )}

        {/* ==================== NVR SECTION ==================== */}
        {activeSection === 'nvr' && (
          <>
            {/* Search Bar */}
            <div className="bg-gray-800 rounded-lg p-3 mb-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="🔍 Search NVRs (name, SKU...)"
                    value={nvrFilters.searchText}
                    onChange={(e) => updateNvrFilter('searchText', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                  {nvrFilters.searchText && (
                    <button onClick={() => updateNvrFilter('searchText', '')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">✕</button>
                  )}
                </div>
                <button
                  onClick={resetNvrFilters}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeNvrFilterCount > 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700'}`}
                >
                  ↺ Reset {activeNvrFilterCount > 0 && `(${activeNvrFilterCount})`}
                </button>
              </div>

              {/* Filter Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Min Bays</label>
                  <input type="number" placeholder="e.g. 4" value={nvrFilters.minBays} onChange={(e) => updateNvrFilter('minBays', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Min Cameras</label>
                  <input type="number" placeholder="e.g. 30" value={nvrFilters.minCameras} onChange={(e) => updateNvrFilter('minCameras', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Max Price (€)</label>
                  <input type="number" placeholder="e.g. 1000" value={nvrFilters.maxPrice} onChange={(e) => updateNvrFilter('maxPrice', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400">Features</label>
                  <div className="flex flex-wrap gap-2">
                    <label className="flex items-center gap-1 text-xs cursor-pointer">
                      <input type="checkbox" checked={nvrFilters.has10G} onChange={(e) => updateNvrFilter('has10G', e.target.checked)}
                        className="rounded bg-gray-700 border-gray-600" />
                      <span>10G</span>
                    </label>
                    <label className="flex items-center gap-1 text-xs cursor-pointer">
                      <input type="checkbox" checked={nvrFilters.hasRAID} onChange={(e) => updateNvrFilter('hasRAID', e.target.checked)}
                        className="rounded bg-gray-700 border-gray-600" />
                      <span>RAID</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-1 mb-2">
              {Object.entries(nvrCategories).map(([k, v]) => (
                <button key={k} onClick={() => setNvrCategoryFilter(k)}
                  className={`px-2 py-0.5 rounded text-xs font-medium ${nvrCategoryFilter === k ? 'bg-blue-600' : 'bg-gray-700'}`}>{v}</button>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-center text-sm text-gray-400 mb-2">
              {filteredNVRs.length} of {Object.keys(nvrData).length} NVRs
              {activeNvrFilterCount > 0 && <span className="text-blue-400 ml-2">({activeNvrFilterCount} filter(s) active)</span>}
            </div>

            {/* NVR Grid */}
            <div className="flex flex-wrap justify-center gap-1 mb-2 max-h-24 overflow-y-auto">
              {filteredNVRs.map(([k, d]) => (
                <button key={k} onClick={() => setSelectedNVR(k)}
                  className={`px-1.5 py-0.5 rounded text-xs font-medium transition-all flex items-center gap-0.5 ${selectedNVR === k ? 'text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  style={selectedNVR === k ? { backgroundColor: d.color } : {}}>
                  {d.status === 'new' && <span className="text-yellow-300">★</span>}
                  {d.name}
                </button>
              ))}
            </div>

            {/* NVR Detail Card */}
            <div className="bg-gray-800 rounded-lg p-3 mb-2">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold" style={{ color: nvr.color }}>{nvr.name}</h2>
                    {nvr.status === 'new' && <span className="bg-yellow-500 text-black text-xs px-1 rounded">NEU</span>}
                    <a href={getGeizhalsLink(nvr.sku)} target="_blank" rel="noopener noreferrer"
                      className="bg-orange-600 hover:bg-orange-500 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      🛒 Geizhals
                    </a>
                    <button onClick={() => toggleCart(nvr.sku, nvr.name, nvr.msrp, 'NVR', nvr.color)}
                      className={`px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1 transition-colors ${isInCart(nvr.sku) ? 'bg-green-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-500'}`}>
                      {isInCart(nvr.sku) ? '✓ Saved' : '+ Save'}
                    </button>
                  </div>
                  <div className="text-xs text-gray-400">{nvr.sku}</div>
                  <div className="flex gap-1 flex-wrap mt-1">
                    <span className="bg-green-700 px-1.5 py-0.5 rounded text-xs font-bold">~{formatPrice(nvr.msrp)}</span>
                    {nvr.features.map(f => <FeatureBadge key={f} feature={f} />)}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 text-center text-xs">
                  <div><div className="text-gray-500">Bays</div><div className="font-bold text-lg text-blue-400">{nvr.bays}x</div></div>
                  <div><div className="text-gray-500">Max Storage</div><div className="font-bold">{nvr.maxStorage}</div></div>
                  <div><div className="text-gray-500">Cameras</div><div className="font-bold text-lg">{nvr.cameras}</div></div>
                  <div><div className="text-gray-500">Streams</div><div className="font-bold">{nvr.streams}</div></div>
                </div>
              </div>

              {/* NVR Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-blue-400 mb-1">Network</h4>
                  <div className="text-xs">{nvr.network}</div>
                </div>
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-green-400 mb-1">Bay Size</h4>
                  <div className="text-xs">{nvr.baySize}</div>
                </div>
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-purple-400 mb-1">RAID Support</h4>
                  <div className="text-xs">{nvr.raidSupport ? '✓ Ja' : '✗ Nein'}</div>
                </div>
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-orange-400 mb-1">Form / Power</h4>
                  <div className="text-xs">{nvr.formFactor} / {nvr.power}W</div>
                </div>
              </div>

              {nvr.notes && <div className="text-yellow-400 text-xs mt-2">💡 {nvr.notes}</div>}
            </div>

            {/* NVR Comparison Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <h3 className="bg-gray-700 px-3 py-1.5 font-semibold text-sm">Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="p-1 text-left">Model</th>
                      <th className="p-1">Price</th>
                      <th className="p-1">Bays</th>
                      <th className="p-1">Max TB</th>
                      <th className="p-1">Cameras</th>
                      <th className="p-1">Streams</th>
                      <th className="p-1">Network</th>
                      <th className="p-1">RAID</th>
                      <th className="p-1">🛒</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNVRs.map(([k, n]) => (
                      <tr key={k} className={`border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${selectedNVR === k ? 'bg-gray-700' : ''}`} onClick={() => setSelectedNVR(k)}>
                        <td className="p-1 font-semibold" style={{ color: n.color }}>{n.status === 'new' && '★ '}{n.name}</td>
                        <td className="p-1 text-center text-green-400">{formatPrice(n.msrp)}</td>
                        <td className="p-1 text-center text-blue-400">{n.bays}</td>
                        <td className="p-1 text-center">{n.maxStorage}</td>
                        <td className="p-1 text-center">{n.cameras}</td>
                        <td className="p-1 text-center">{n.streams}</td>
                        <td className="p-1 text-center">{n.network}</td>
                        <td className="p-1 text-center">{n.raidSupport ? '✓' : '-'}</td>
                        <td className="p-1 text-center"><a href={getGeizhalsLink(n.sku)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-orange-400 hover:text-orange-300">→</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* NVR Recommendations */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
              <div className="bg-gray-800 rounded p-2 border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-400 text-xs">Einsteiger</h4>
                <p className="text-xs text-gray-300">UNVR ~319 €</p>
              </div>
              <div className="bg-gray-800 rounded p-2 border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-400 text-xs">Best Value</h4>
                <p className="text-xs text-gray-300">UNVR-Pro ~499 €</p>
              </div>
              <div className="bg-gray-800 rounded p-2 border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 text-xs">Mit AI</h4>
                <p className="text-xs text-gray-300">AI-NVR ~999 €</p>
              </div>
              <div className="bg-gray-800 rounded p-2 border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 text-xs">Enterprise</h4>
                <p className="text-xs text-gray-300">UNVR-Enterprise ~2.499 €</p>
              </div>
            </div>
          </>
        )}

        {/* ==================== NAS SECTION ==================== */}
        {activeSection === 'nas' && (
          <>
            {/* Search Bar */}
            <div className="bg-gray-800 rounded-lg p-3 mb-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="🔍 Search NAS (name, SKU...)"
                    value={nasFilters.searchText}
                    onChange={(e) => updateNasFilter('searchText', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
                  />
                  {nasFilters.searchText && (
                    <button onClick={() => updateNasFilter('searchText', '')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">✕</button>
                  )}
                </div>
                <button
                  onClick={resetNasFilters}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeNasFilterCount > 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700'}`}
                >
                  ↺ Reset {activeNasFilterCount > 0 && `(${activeNasFilterCount})`}
                </button>
              </div>

              {/* Filter Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Min Bays</label>
                  <input type="number" placeholder="e.g. 4" value={nasFilters.minBays} onChange={(e) => updateNasFilter('minBays', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Max Price (€)</label>
                  <input type="number" placeholder="e.g. 1500" value={nasFilters.maxPrice} onChange={(e) => updateNasFilter('maxPrice', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400">Features</label>
                  <div className="flex flex-wrap gap-2">
                    <label className="flex items-center gap-1 text-xs cursor-pointer">
                      <input type="checkbox" checked={nasFilters.has10G} onChange={(e) => updateNasFilter('has10G', e.target.checked)}
                        className="rounded bg-gray-700 border-gray-600" />
                      <span>10G+</span>
                    </label>
                    <label className="flex items-center gap-1 text-xs cursor-pointer">
                      <input type="checkbox" checked={nasFilters.hasNVMeCache} onChange={(e) => updateNasFilter('hasNVMeCache', e.target.checked)}
                        className="rounded bg-gray-700 border-gray-600" />
                      <span>NVMe Cache</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-1 mb-2">
              {Object.entries(nasCategories).map(([k, v]) => (
                <button key={k} onClick={() => setNasCategoryFilter(k)}
                  className={`px-2 py-0.5 rounded text-xs font-medium ${nasCategoryFilter === k ? 'bg-violet-600' : 'bg-gray-700'}`}>{v}</button>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-center text-sm text-gray-400 mb-2">
              {filteredNAS.length} of {Object.keys(nasData).length} NAS
              {activeNasFilterCount > 0 && <span className="text-violet-400 ml-2">({activeNasFilterCount} filter(s) active)</span>}
            </div>

            {/* NAS Grid */}
            <div className="flex flex-wrap justify-center gap-1 mb-2 max-h-24 overflow-y-auto">
              {filteredNAS.map(([k, d]) => (
                <button key={k} onClick={() => setSelectedNAS(k)}
                  className={`px-1.5 py-0.5 rounded text-xs font-medium transition-all flex items-center gap-0.5 ${selectedNAS === k ? 'text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  style={selectedNAS === k ? { backgroundColor: d.color } : {}}>
                  {d.status === 'new' && <span className="text-yellow-300">★</span>}
                  {d.name}
                </button>
              ))}
            </div>

            {/* NAS Detail Card */}
            <div className="bg-gray-800 rounded-lg p-3 mb-2">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold" style={{ color: nas.color }}>{nas.name}</h2>
                    {nas.status === 'new' && <span className="bg-yellow-500 text-black text-xs px-1 rounded">NEU</span>}
                    <a href={getGeizhalsLink(nas.sku)} target="_blank" rel="noopener noreferrer"
                      className="bg-orange-600 hover:bg-orange-500 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      🛒 Geizhals
                    </a>
                    <button onClick={() => toggleCart(nas.sku, nas.name, nas.msrp, 'NAS', nas.color)}
                      className={`px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1 transition-colors ${isInCart(nas.sku) ? 'bg-green-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-500'}`}>
                      {isInCart(nas.sku) ? '✓ Saved' : '+ Save'}
                    </button>
                  </div>
                  <div className="text-xs text-gray-400">{nas.sku}</div>
                  <div className="flex gap-1 flex-wrap mt-1">
                    <span className="bg-green-700 px-1.5 py-0.5 rounded text-xs font-bold">~{formatPrice(nas.msrp)}</span>
                    {nas.features.map(f => <FeatureBadge key={f} feature={f} />)}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 text-center text-xs">
                  <div><div className="text-gray-500">Bays</div><div className="font-bold text-lg text-violet-400">{nas.bays}x</div></div>
                  <div><div className="text-gray-500">Max Storage</div><div className="font-bold">{nas.maxStorage}</div></div>
                  <div><div className="text-gray-500">Network</div><div className="font-bold">{nas.network}</div></div>
                  <div><div className="text-gray-500">NVMe Slots</div><div className="font-bold">{nas.cacheSlots || '-'}</div></div>
                </div>
              </div>

              {/* NAS Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-blue-400 mb-1">CPU</h4>
                  <div className="text-xs">{nas.cpu}</div>
                </div>
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-green-400 mb-1">RAM</h4>
                  <div className="text-xs">{nas.ram} (max {nas.ramMax})</div>
                </div>
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-purple-400 mb-1">RAID Support</h4>
                  <div className="text-xs">{nas.raidSupport.slice(0, 3).join(', ')}{nas.raidSupport.length > 3 && '...'}</div>
                </div>
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-orange-400 mb-1">Form / Power</h4>
                  <div className="text-xs">{nas.formFactor} / {nas.power}W</div>
                </div>
              </div>

              {/* Apps */}
              <div className="mt-3 text-xs">
                <span className="text-gray-400">UniFi Apps:</span> {nas.apps.map(app => (
                  <span key={app} className="ml-1 bg-gray-700 px-1.5 py-0.5 rounded">{app}</span>
                ))}
              </div>

              {nas.notes && <div className="text-yellow-400 text-xs mt-2">💡 {nas.notes}</div>}
            </div>

            {/* NAS Comparison Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <h3 className="bg-gray-700 px-3 py-1.5 font-semibold text-sm">Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="p-1 text-left">Model</th>
                      <th className="p-1">Price</th>
                      <th className="p-1">Bays</th>
                      <th className="p-1">Max TB</th>
                      <th className="p-1">Network</th>
                      <th className="p-1">CPU</th>
                      <th className="p-1">RAM</th>
                      <th className="p-1">Cache</th>
                      <th className="p-1">🛒</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNAS.map(([k, n]) => (
                      <tr key={k} className={`border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${selectedNAS === k ? 'bg-gray-700' : ''}`} onClick={() => setSelectedNAS(k)}>
                        <td className="p-1 font-semibold" style={{ color: n.color }}>{n.status === 'new' && '★ '}{n.name}</td>
                        <td className="p-1 text-center text-green-400">{formatPrice(n.msrp)}</td>
                        <td className="p-1 text-center text-violet-400">{n.bays}</td>
                        <td className="p-1 text-center">{n.maxStorage}</td>
                        <td className="p-1 text-center">{n.network}</td>
                        <td className="p-1 text-center">{n.cpu}</td>
                        <td className="p-1 text-center">{n.ram}</td>
                        <td className="p-1 text-center">{n.cacheSlots > 0 ? `${n.cacheSlots}x` : '-'}</td>
                        <td className="p-1 text-center"><a href={getGeizhalsLink(n.sku)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-orange-400 hover:text-orange-300">→</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* NAS Recommendations */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
              <div className="bg-gray-800 rounded p-2 border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-400 text-xs">Einsteiger</h4>
                <p className="text-xs text-gray-300">UNAS ~449 €</p>
              </div>
              <div className="bg-gray-800 rounded p-2 border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-400 text-xs">Best Value</h4>
                <p className="text-xs text-gray-300">UNAS-Pro ~999 €</p>
              </div>
              <div className="bg-gray-800 rounded p-2 border-l-4 border-teal-500">
                <h4 className="font-semibold text-teal-400 text-xs">Rackmount</h4>
                <p className="text-xs text-gray-300">UNAS-Rack ~1.299 €</p>
              </div>
              <div className="bg-gray-800 rounded p-2 border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-400 text-xs">Backup</h4>
                <p className="text-xs text-gray-300">UNAS-Backup ~699 €</p>
              </div>
            </div>
          </>
        )}

        {/* ==================== RICHTFUNK / PTP SECTION ==================== */}
        {activeSection === 'bridges' && (
          <>
            {/* Search Bar */}
            <div className="bg-gray-800 rounded-lg p-3 mb-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="🔍 Search PTP links (name, SKU...)"
                    value={bridgeFilters.searchText}
                    onChange={(e) => updateBridgeFilter('searchText', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
                  />
                  {bridgeFilters.searchText && (
                    <button onClick={() => updateBridgeFilter('searchText', '')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">✕</button>
                  )}
                </div>
                <button
                  onClick={resetBridgeFilters}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeBridgeFilterCount > 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700'}`}
                >
                  ↺ Reset {activeBridgeFilterCount > 0 && `(${activeBridgeFilterCount})`}
                </button>
              </div>

              {/* Filter Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Frequency</label>
                  <select value={bridgeFilters.frequency} onChange={(e) => updateBridgeFilter('frequency', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs">
                    <option value="all">All</option>
                    <option value="5 GHz">5 GHz</option>
                    <option value="24 GHz">24 GHz</option>
                    <option value="60 GHz">60 GHz</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Min Range (km)</label>
                  <input type="number" placeholder="e.g. 10" value={bridgeFilters.minRange} onChange={(e) => updateBridgeFilter('minRange', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Max Price (€)</label>
                  <input type="number" placeholder="e.g. 500" value={bridgeFilters.maxPrice} onChange={(e) => updateBridgeFilter('maxPrice', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400">Features</label>
                  <div className="flex flex-wrap gap-2">
                    <label className="flex items-center gap-1 text-xs cursor-pointer">
                      <input type="checkbox" checked={bridgeFilters.has10G} onChange={(e) => updateBridgeFilter('has10G', e.target.checked)}
                        className="rounded bg-gray-700 border-gray-600" />
                      <span>10G SFP+</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-1 mb-2">
              {Object.entries(bridgeCategories).map(([k, v]) => (
                <button key={k} onClick={() => setBridgeCategoryFilter(k)}
                  className={`px-2 py-0.5 rounded text-xs font-medium ${bridgeCategoryFilter === k ? 'bg-cyan-600' : 'bg-gray-700'}`}>{v}</button>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-center text-sm text-gray-400 mb-2">
              {filteredBridges.length} of {Object.keys(bridgeData).length} PTP Links
              {activeBridgeFilterCount > 0 && <span className="text-cyan-400 ml-2">({activeBridgeFilterCount} filter(s) active)</span>}
            </div>

            {/* Bridge Grid */}
            <div className="flex flex-wrap justify-center gap-1 mb-2 max-h-28 overflow-y-auto">
              {filteredBridges.map(([k, d]) => (
                <button key={k} onClick={() => setSelectedBridge(k)}
                  className={`px-1.5 py-0.5 rounded text-xs font-medium transition-all flex items-center gap-0.5 ${selectedBridge === k ? 'text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  style={selectedBridge === k ? { backgroundColor: d.color } : {}}>
                  {d.status === 'new' && <span className="text-yellow-300">★</span>}
                  {d.name}
                </button>
              ))}
            </div>

            {/* Bridge Detail Card */}
            <div className="bg-gray-800 rounded-lg p-3 mb-2">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold" style={{ color: br.color }}>{br.name}</h2>
                    {br.status === 'new' && <span className="bg-yellow-500 text-black text-xs px-1 rounded">NEW</span>}
                    <a href={getGeizhalsLink(br.sku)} target="_blank" rel="noopener noreferrer"
                      className="bg-orange-600 hover:bg-orange-500 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      🛒 Geizhals
                    </a>
                    <button onClick={() => toggleCart(br.sku, br.name, br.msrp, 'PTP Link', br.color)}
                      className={`px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1 transition-colors ${isInCart(br.sku) ? 'bg-green-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-500'}`}>
                      {isInCart(br.sku) ? '✓ Saved' : '+ Save'}
                    </button>
                  </div>
                  <div className="text-xs text-gray-400">{br.sku}</div>
                  <div className="flex gap-1 flex-wrap mt-1">
                    <span className="bg-green-700 px-1.5 py-0.5 rounded text-xs font-bold">~{formatPrice(br.msrp)}</span>
                    {br.features.map(f => <FeatureBadge key={f} feature={f} />)}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 text-center text-xs">
                  <div><div className="text-gray-500">Frequency</div><div className="font-bold text-lg text-cyan-400">{br.frequency}</div></div>
                  <div><div className="text-gray-500">Range</div><div className="font-bold text-lg">{br.range ? `${br.range} ${br.rangeUnit}` : '-'}</div></div>
                  <div><div className="text-gray-500">Bandwidth</div><div className="font-bold">{br.bandwidth || '-'}</div></div>
                  <div><div className="text-gray-500">Gain</div><div className="font-bold text-amber-400">{br.antennaGain ? `${br.antennaGain} dBi` : '-'}</div></div>
                </div>
              </div>

              {/* Bridge Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-blue-400 mb-1">Interface</h4>
                  <div className="text-xs">{br.interface || '-'}</div>
                </div>
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-green-400 mb-1">PoE</h4>
                  <div className="text-xs">{br.poe || '-'}</div>
                </div>
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-purple-400 mb-1">MIMO / Modulation</h4>
                  <div className="text-xs">{br.mimo || '-'} / {br.modulation || '-'}</div>
                </div>
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-orange-400 mb-1">Beamwidth / IP</h4>
                  <div className="text-xs">{br.beamwidth ? `${br.beamwidth}°` : '-'} / {br.weatherproof || '-'}</div>
                </div>
              </div>

              {/* Additional specs */}
              {(br.channelWidth || br.txPower) && (
                <div className="flex flex-wrap gap-3 mt-2 text-xs">
                  {br.channelWidth && <div><span className="text-gray-400">Channel:</span> <span className="font-medium">{br.channelWidth}</span></div>}
                  {br.txPower && <div><span className="text-gray-400">TX Power:</span> <span className="font-medium">{br.txPower} dBm</span></div>}
                </div>
              )}

              {/* Strahlungsdiagramme für Richtfunk */}
              {br.elevation && br.azimuth && (
                <div className="mt-4 p-3 bg-gray-700/30 rounded-lg border border-cyan-500/30">
                  <h4 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                    📡 Radiation Patterns
                    <span className="text-xs font-normal text-gray-400">
                      Beamwidth: {br.beamwidthH}° H / {br.beamwidthV}° V
                    </span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Elevation Pattern - Seitenansicht */}
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-gray-400 mb-2">Elevation (Vertical cut)</div>
                      <svg viewBox="0 0 200 120" className="w-full max-w-xs" style={{ background: 'transparent' }}>
                        {/* Grid lines */}
                        <line x1="100" y1="10" x2="100" y2="110" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />
                        <line x1="20" y1="60" x2="180" y2="60" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />
                        
                        {/* Antenna symbol */}
                        <rect x="95" y="55" width="10" height="10" fill={br.color} rx="2" />
                        <line x1="100" y1="45" x2="100" y2="55" stroke={br.color} strokeWidth="2" />
                        
                        {/* Beam pattern - gerichtete Keule nach rechts */}
                        <path
                          d={`M 105 60 
                              Q 140 ${60 - br.beamwidthV * 1.5} 175 ${60 - br.beamwidthV * 0.3}
                              Q 180 60 175 ${60 + br.beamwidthV * 0.3}
                              Q 140 ${60 + br.beamwidthV * 1.5} 105 60 Z`}
                          fill={`${br.color}40`}
                          stroke={br.color}
                          strokeWidth="2"
                        />
                        
                        {/* Main lobe direction arrow */}
                        <line x1="110" y1="60" x2="170" y2="60" stroke={br.color} strokeWidth="1" markerEnd="url(#arrowhead)" />
                        <defs>
                          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 Z" fill={br.color} />
                          </marker>
                        </defs>
                        
                        {/* Labels */}
                        <text x="100" y="118" textAnchor="middle" fill="#9CA3AF" fontSize="8">← Back | Main beam direction →</text>
                        <text x="178" y="64" textAnchor="start" fill={br.color} fontSize="9" fontWeight="bold">{br.antennaGain} dBi</text>
                        
                        {/* Beamwidth indicator */}
                        <path d={`M 130 ${60 - br.beamwidthV * 1.2} A 30 30 0 0 1 130 ${60 + br.beamwidthV * 1.2}`} 
                              fill="none" stroke="#6B7280" strokeWidth="1" strokeDasharray="2,2" />
                        <text x="135" y="45" fill="#9CA3AF" fontSize="7">{br.beamwidthV}°</text>
                      </svg>
                    </div>
                    
                    {/* Azimuth Pattern - Draufsicht */}
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-gray-400 mb-2">Azimuth (Horizontal cut)</div>
                      <svg viewBox="0 0 200 120" className="w-full max-w-xs" style={{ background: 'transparent' }}>
                        {/* Grid lines */}
                        <line x1="100" y1="10" x2="100" y2="110" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />
                        <line x1="20" y1="60" x2="180" y2="60" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />
                        
                        {/* Antenna symbol (top view) */}
                        <circle cx="100" cy="60" r="8" fill={br.color} />
                        <text x="100" y="63" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">ANT</text>
                        
                        {/* Beam pattern - Sector oder Pencil je nach Beamwidth */}
                        {br.beamwidthH <= 15 ? (
                          // Pencil beam für enge Antennen
                          <path
                            d={`M 108 60 
                                Q 145 ${60 - br.beamwidthH * 1.2} 175 ${60 - br.beamwidthH * 0.2}
                                Q 180 60 175 ${60 + br.beamwidthH * 0.2}
                                Q 145 ${60 + br.beamwidthH * 1.2} 108 60 Z`}
                            fill={`${br.color}40`}
                            stroke={br.color}
                            strokeWidth="2"
                          />
                        ) : (
                          // Sector beam für breite Antennen (NanoStation etc.)
                          <path
                            d={`M 108 60 
                                L ${100 + 70 * Math.cos(-br.beamwidthH/2 * Math.PI/180)} ${60 - 70 * Math.sin(br.beamwidthH/2 * Math.PI/180)}
                                A 70 70 0 0 1 ${100 + 70 * Math.cos(br.beamwidthH/2 * Math.PI/180)} ${60 + 70 * Math.sin(br.beamwidthH/2 * Math.PI/180)}
                                Z`}
                            fill={`${br.color}40`}
                            stroke={br.color}
                            strokeWidth="2"
                          />
                        )}
                        
                        {/* Direction indicator */}
                        <text x="178" y="64" textAnchor="start" fill={br.color} fontSize="9" fontWeight="bold">{br.beamwidthH}°</text>
                        <text x="100" y="118" textAnchor="middle" fill="#9CA3AF" fontSize="8">Top-down view</text>

                        {/* Compass points */}
                        <text x="100" y="8" textAnchor="middle" fill="#6B7280" fontSize="7">N</text>
                        <text x="190" y="63" textAnchor="middle" fill="#6B7280" fontSize="7">E</text>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Beam characteristics */}
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="bg-gray-700/50 rounded p-1.5 text-center">
                      <div className="text-gray-400">H-Beamwidth</div>
                      <div className="font-bold text-cyan-400">{br.beamwidthH}°</div>
                    </div>
                    <div className="bg-gray-700/50 rounded p-1.5 text-center">
                      <div className="text-gray-400">V-Beamwidth</div>
                      <div className="font-bold text-cyan-400">{br.beamwidthV}°</div>
                    </div>
                    <div className="bg-gray-700/50 rounded p-1.5 text-center">
                      <div className="text-gray-400">Antenna Gain</div>
                      <div className="font-bold text-amber-400">{br.antennaGain} dBi</div>
                    </div>
                    <div className="bg-gray-700/50 rounded p-1.5 text-center">
                      <div className="text-gray-400">Typ</div>
                      <div className="font-bold">{br.beamwidthH > 20 ? 'Sector' : br.beamwidthH <= 5 ? 'Pencil' : 'Dish'}</div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Hinweis für Geräte ohne integrierte Antenne */}
              {!br.elevation && br.category !== 'antenna' && (
                <div className="mt-3 p-2 bg-gray-700/30 rounded border border-gray-600 text-xs text-gray-400">
                  ⚠️ This device requires an external antenna. The radiation pattern depends on the antenna used.
                </div>
              )}

              {br.notes && <div className="text-yellow-400 text-xs mt-2">💡 {br.notes}</div>}
            </div>

            {/* Bridge Comparison Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <h3 className="bg-gray-700 px-3 py-1.5 font-semibold text-sm">Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="p-1 text-left">Model</th>
                      <th className="p-1">Price</th>
                      <th className="p-1">Freq</th>
                      <th className="p-1">Range</th>
                      <th className="p-1">Speed</th>
                      <th className="p-1">Gain</th>
                      <th className="p-1">Interface</th>
                      <th className="p-1">🛒</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBridges.map(([k, b]) => (
                      <tr key={k} className={`border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${selectedBridge === k ? 'bg-gray-700' : ''}`} onClick={() => setSelectedBridge(k)}>
                        <td className="p-1 font-semibold" style={{ color: b.color }}>{b.status === 'new' && '★ '}{b.name}</td>
                        <td className="p-1 text-center text-green-400">{formatPrice(b.msrp)}</td>
                        <td className="p-1 text-center text-cyan-400">{b.frequency}</td>
                        <td className="p-1 text-center">{b.range ? `${b.range} ${b.rangeUnit}` : '-'}</td>
                        <td className="p-1 text-center">{b.bandwidth || '-'}</td>
                        <td className="p-1 text-center text-amber-400">{b.antennaGain || '-'}</td>
                        <td className="p-1 text-center">{b.interface || '-'}</td>
                        <td className="p-1 text-center"><a href={getGeizhalsLink(b.sku)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-orange-400 hover:text-orange-300">→</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bridge Recommendations */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
              <div className="bg-gray-800 rounded p-2 border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-400 text-xs">Building-to-Building</h4>
                <p className="text-xs text-gray-300">UBB ~499 € (60 GHz)</p>
              </div>
              <div className="bg-gray-800 rounded p-2 border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-400 text-xs">Budget PTP</h4>
                <p className="text-xs text-gray-300">NanoBeam 5AC ~79 €</p>
              </div>
              <div className="bg-gray-800 rounded p-2 border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 text-xs">Long Range</h4>
                <p className="text-xs text-gray-300">PowerBeam 620 ~229 €</p>
              </div>
              <div className="bg-gray-800 rounded p-2 border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 text-xs">High Capacity</h4>
                <p className="text-xs text-gray-300">airFiber 24 ~1.499 €</p>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-gray-800 rounded-lg p-3 mt-3 border border-gray-700">
              <h4 className="font-semibold text-sm mb-2">📡 PTP Overview</h4>
              <div className="grid md:grid-cols-3 gap-3 text-xs">
                <div>
                  <h5 className="text-purple-400 font-medium">60 GHz (V-Band)</h5>
                  <ul className="text-gray-400 space-y-0.5">
                    <li>• Very high throughput (up to 10 Gbps)</li>
                    <li>• Short distance (≤1.5 km)</li>
                    <li>• Rain-sensitive</li>
                    <li>• UBB, GigaBeam, AF60</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-pink-400 font-medium">24 GHz</h5>
                  <ul className="text-gray-400 space-y-0.5">
                    <li>• High throughput (1-2 Gbps)</li>
                    <li>• Medium distance (≤20 km)</li>
                    <li>• Licensed Light (registration required)</li>
                    <li>• airFiber 24/24HD</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-blue-400 font-medium">5 GHz</h5>
                  <ul className="text-gray-400 space-y-0.5">
                    <li>• Medium throughput (≤1 Gbps)</li>
                    <li>• Long distance (≤100 km)</li>
                    <li>• License-free (DE: DFS applies)</li>
                    <li>• airMAX AC, LTU, airFiber 5X</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Cart / Merkliste */}
        {activeSection === 'cart' && (
          <>
            <h2 className="text-xl font-bold mb-4">🛒 Saved Items</h2>
            {cart.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400">
                <div className="text-4xl mb-3">🛒</div>
                <div className="text-lg font-medium mb-1">Your saved list is empty</div>
                <div className="text-sm">Click <span className="bg-gray-600 px-1.5 py-0.5 rounded text-xs font-bold">+ Save</span> on any product to add it.</div>
              </div>
            ) : (
              <>
                {['Gateway', 'Switch', 'Access Point', 'PTP Link', 'Camera', 'NVR', 'NAS'].map(section => {
                  const items = cart.filter(i => i.section === section);
                  if (items.length === 0) return null;
                  return (
                    <div key={section} className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">{section}</h3>
                      <div className="bg-gray-800 rounded-lg overflow-hidden">
                        {items.map((item, idx) => (
                          <div key={item.sku} className={`flex items-center gap-3 px-3 py-2.5 ${idx < items.length - 1 ? 'border-b border-gray-700' : ''}`}>
                            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm truncate">{item.name}</div>
                              <div className="text-xs text-gray-400">{item.sku}</div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button onClick={() => updateCartQty(item.sku, -1)}
                                className="w-6 h-6 bg-gray-700 hover:bg-gray-600 rounded text-xs font-bold flex items-center justify-center">−</button>
                              <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                              <button onClick={() => updateCartQty(item.sku, 1)}
                                className="w-6 h-6 bg-gray-700 hover:bg-gray-600 rounded text-xs font-bold flex items-center justify-center">+</button>
                            </div>
                            <div className="text-sm font-bold text-green-400 w-20 text-right">
                              {formatPrice(item.msrp * item.qty)}
                            </div>
                            <button onClick={() => removeFromCart(item.sku)}
                              className="w-6 h-6 bg-gray-700 hover:bg-red-700 rounded text-xs flex items-center justify-center text-gray-400 hover:text-white transition-colors">✕</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-between mt-2">
                  <button onClick={() => setCart([])}
                    className="px-3 py-1.5 bg-red-800 hover:bg-red-700 rounded text-xs font-medium transition-colors">
                    Remove all
                  </button>
                  <div className="text-right">
                    <div className="text-xs text-gray-400 mb-0.5">{cart.reduce((s, i) => s + i.qty, 0)} items · Estimated total (MSRP)</div>
                    <div className="text-xl font-bold text-green-400">
                      {formatPrice(cart.reduce((s, i) => s + i.msrp * i.qty, 0))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-700 text-center text-xs text-gray-500">
          ui-choicer • {Object.keys(apData).length} APs • {Object.keys(switchData).length} Switches • {Object.keys(gatewayData).length} Gateways • {Object.keys(cameraData).length} Cameras • {Object.keys(nvrData).length} NVRs • {Object.keys(nasData).length} NAS • {Object.keys(bridgeData).length} PTP Links • Prices ~MSRP in €
        </div>
      </div>
    </div>
  );
}
