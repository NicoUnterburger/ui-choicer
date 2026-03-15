import React, { useState, useMemo } from 'react';
import { apData } from './data/apData.js';
import { switchData } from './data/switchData.js';
import { cameraData } from './data/cameraData.js';
import { gatewayData } from './data/gatewayData.js';
import { nvrData } from './data/nvrData.js';
import { nasData } from './data/nasData.js';
import { bridgeData } from './data/bridgeData.js';
import { apCategories, switchCategories, cameraCategories, gatewayCategories, nvrCategories, nasCategories, bridgeCategories } from './data/categories.js';
import { translations } from './data/translations.js';

function compareEntries([, a], [, b], col, dir, getter) {
  const av = getter(a, col);
  const bv = getter(b, col);
  if (av == null) return 1;
  if (bv == null) return -1;
  const cmp = typeof av === 'number' && typeof bv === 'number'
    ? av - bv
    : String(av).localeCompare(String(bv), undefined, { numeric: true });
  return dir === 'asc' ? cmp : -cmp;
}

export default function UniFiNetworkPortal() {
  const [activeSection, setActiveSection] = useState('gateways');
  const [selectedAP, setSelectedAP] = useState('U7-Pro');
  const [selectedSwitch, setSelectedSwitch] = useState('USW-Pro-Max-24-PoE');
  const [selectedCamera, setSelectedCamera] = useState('G6-Bullet');
  const [selectedGateway, setSelectedGateway] = useState('UDM-Pro-Max');
  const [selectedNVR, setSelectedNVR] = useState('UNVR-Pro');
  const [selectedNAS, setSelectedNAS] = useState('UNAS-Pro-8');
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
  const [lang, setLang] = useState(() => localStorage.getItem('ui-choicer-lang') || 'en');

  const setLangPersist = (l) => { setLang(l); localStorage.setItem('ui-choicer-lang', l); };

  const T = translations[lang];

  const [apSort,     setApSort]     = useState({ col: null, dir: 'asc' });
  const [switchSort, setSwitchSort] = useState({ col: null, dir: 'asc' });
  const [gwSort,     setGwSort]     = useState({ col: null, dir: 'asc' });
  const [camSort,    setCamSort]    = useState({ col: null, dir: 'asc' });
  const [nvrSort,    setNvrSort]    = useState({ col: null, dir: 'asc' });
  const [nasSort,    setNasSort]    = useState({ col: null, dir: 'asc' });
  const [bridgeSort, setBridgeSort] = useState({ col: null, dir: 'asc' });

  const handleSort = (setter) => (col) =>
    setter(prev => ({ col, dir: prev.col === col && prev.dir === 'asc' ? 'desc' : 'asc' }));

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
        'e7-audience': 'e7-audience-us',
        'e7-campus': 'e7-campus-us'
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
      const mapped = skuLower;
      return `${baseUrl}/cloud-gateways/${mapped}`;
    }
    
    // Cameras
    if (type === 'camera') {
      const camMappings = {
        'uvc-ai-lpr': 'uvc-ai-theta-lpr',
        'uvc-doorbell-lite': 'uvc-g4-doorbell',
      };
      const mapped = camMappings[skuLower] || skuLower;
      return `${baseUrl}/cameras-nvrs/${mapped}`;
    }
    
    // NVR
    if (type === 'nvr') {
     const nvrMappings = {
        'unvr-enterprise': 'envr'
      };
      const mapped = nvrMappings[skuLower] || skuLower;
      return `${baseUrl}/cameras-nvrs/${mapped}`;
    }

    // NAS
    if (type === 'nas') {
      return `${baseUrl}/integrations/${skuLower}`;
    }

    return `https://techspecs.ui.com/?search=${encodeURIComponent(sku)}`;
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
    const apGetter = (d, col) => {
      if (col === 'gain5')  return d.radio5?.gain ?? -1;
      if (col === 'radio6') return d.radio6 ? 1 : 0;
      return d[col] ?? null;
    };
    const filtered = Object.entries(apData).filter(([k, ap]) => {
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
    if (!apSort.col) return filtered;
    return [...filtered].sort((a, b) => compareEntries(a, b, apSort.col, apSort.dir, apGetter));
  }, [apData, categoryFilter, apFilters, apSort]);

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
    const swGetter = (d, col) => d[col] ?? null;
    const filtered = Object.entries(switchData).filter(([k, sw]) => {
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
      if (switchFilters.poe === 'poe+' && !['PoE+', 'PoE++', 'PoE+++'].includes(sw.poe)) return false;
      if (switchFilters.poe === 'poe++' && !['PoE++', 'PoE+++'].includes(sw.poe)) return false;
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
    if (!switchSort.col) return filtered;
    return [...filtered].sort((a, b) => compareEntries(a, b, switchSort.col, switchSort.dir, swGetter));
  }, [switchData, switchCategoryFilter, switchFilters, switchSort]);

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
    const camGetter = (d, col) => d[col] ?? null;
    const filtered = Object.entries(cameraData).filter(([k, cam]) => {
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
    if (!camSort.col) return filtered;
    return [...filtered].sort((a, b) => compareEntries(a, b, camSort.col, camSort.dir, camGetter));
  }, [cameraData, cameraCategoryFilter, cameraFilters, camSort]);

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
    const gwGetter = (d, col) => d[col] ?? null;
    const filtered = Object.entries(gatewayData).filter(([k, gw]) => {
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
    if (!gwSort.col) return filtered;
    return [...filtered].sort((a, b) => compareEntries(a, b, gwSort.col, gwSort.dir, gwGetter));
  }, [gatewayData, gatewayCategoryFilter, gatewayFilters, gwSort]);

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
    const nvrGetter = (d, col) => d[col] ?? null;
    const filtered = Object.entries(nvrData).filter(([k, nvr]) => {
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
    if (!nvrSort.col) return filtered;
    return [...filtered].sort((a, b) => compareEntries(a, b, nvrSort.col, nvrSort.dir, nvrGetter));
  }, [nvrData, nvrCategoryFilter, nvrFilters, nvrSort]);

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
    const nasGetter = (d, col) => d[col] ?? null;
    const filtered = Object.entries(nasData).filter(([k, nas]) => {
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
    if (!nasSort.col) return filtered;
    return [...filtered].sort((a, b) => compareEntries(a, b, nasSort.col, nasSort.dir, nasGetter));
  }, [nasData, nasCategoryFilter, nasFilters, nasSort]);

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
    const brGetter = (d, col) => d[col] ?? null;
    const filtered = Object.entries(bridgeData).filter(([k, br]) => {
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
    if (!bridgeSort.col) return filtered;
    return [...filtered].sort((a, b) => compareEntries(a, b, bridgeSort.col, bridgeSort.dir, brGetter));
  }, [bridgeData, bridgeCategoryFilter, bridgeFilters, bridgeSort]);

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
          <div className="flex items-center gap-2">
            <a href="https://github.com/NicoUnterburger/ui-choicer" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors">
              // Github icon
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
            <div className="flex gap-1">
              <button onClick={() => setLangPersist('en')}
                className={`px-2 py-0.5 rounded text-sm transition-colors ${lang === 'en' ? 'bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                title="English">🇬🇧</button>
              <button onClick={() => setLangPersist('de')}
                className={`px-2 py-0.5 rounded text-sm transition-colors ${lang === 'de' ? 'bg-gray-500' : 'bg-gray-700 hover:bg-gray-600'}`}
                title="Deutsch">🇩🇪</button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex items-center">
          <div className="flex gap-1 flex-1">
            {[
              { id: 'gateways', label: T.nav_gateways, count: Object.keys(gatewayData).length },
              { id: 'switching', label: T.nav_switches, count: Object.keys(switchData).length },
              { id: 'wifi', label: T.nav_aps, count: Object.keys(apData).length },
              { id: 'bridges', label: T.nav_ptplinks, count: Object.keys(bridgeData).length },
              { id: 'cameras', label: T.nav_cameras, count: Object.keys(cameraData).length },
              { id: 'nvr', label: T.nav_nvr, count: Object.keys(nvrData).length },
              { id: 'nas', label: T.nav_unas, count: Object.keys(nasData).length },
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
          {/* Cart — far right, emoji only */}
          {(() => {
            const cartCount = cart.reduce((s, i) => s + i.qty, 0);
            return (
              <button onClick={() => setActiveSection('cart')}
                className={`relative px-3 py-3 text-lg border-b-2 transition-colors flex-shrink-0 ${
                  activeSection === 'cart'
                    ? 'text-blue-400 border-blue-400'
                    : 'text-gray-400 border-transparent hover:text-gray-200'
                }`}>
                🛒
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-0.5 bg-blue-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </button>
            );
          })()}
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
                  placeholder={T.search_ap}
                  value={apFilters.searchText}
                  onChange={(e) => updateApFilter('searchText', e.target.value)}
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
                <button onClick={resetApFilters}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${activeApFilterCount > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}>
                  {T.results_reset} {activeApFilterCount > 0 && `(${activeApFilterCount})`}
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                <select value={apFilters.generation} onChange={(e) => updateApFilter('generation', e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm">
                  <option value="all">{T.filter_allgen}</option>
                  <option value="Wi-Fi 5">Wi-Fi 5</option>
                  <option value="Wi-Fi 6">Wi-Fi 6</option>
                  <option value="Wi-Fi 6E">Wi-Fi 6E</option>
                  <option value="Wi-Fi 7">Wi-Fi 7</option>
                </select>
                <select value={apFilters.has6GHz} onChange={(e) => updateApFilter('has6GHz', e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm">
                  <option value="all">{T.filter_all} 6 GHz</option>
                  <option value="yes">{T.filter_withsixghz}</option>
                  <option value="no">{T.filter_withoutsixghz}</option>
                </select>
                <input type="number" placeholder={T.filter_minm2} value={apFilters.minCoverage} onChange={(e) => updateApFilter('minCoverage', e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm" />
                <input type="number" placeholder={T.filter_maxprice} value={apFilters.maxPrice} onChange={(e) => updateApFilter('maxPrice', e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm" />
                <input type="number" step="0.5" placeholder={T.filter_mingain} value={apFilters.minGain} onChange={(e) => updateApFilter('minGain', e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm" />
                <select value={apFilters.uplink} onChange={(e) => updateApFilter('uplink', e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm">
                  <option value="all">{T.filter_alluplinks}</option>
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
              {filteredAPs.length} {T.results_of} {Object.keys(apData).length} Access Points
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
            <div className="bg-gray-800 rounded-lg p-3 mb-2">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold" style={{ color: ap.color }}>{ap.name}</h2>
                    {ap.status === 'new' && <span className="bg-yellow-500 text-black text-xs px-1 rounded">{T.status_new}</span>}
                    {ap.status === 'legacy' && <span className="bg-gray-600 text-xs px-1 rounded">{T.status_legacy}</span>}
                    <a href={getDatasheetLink(ap.sku, 'ap')} target="_blank" rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-500 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      {T.btn_specs}
                    </a>
                    <a href={getGeizhalsLink(ap.sku)} target="_blank" rel="noopener noreferrer"
                      className="bg-orange-600 hover:bg-orange-500 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      🛒 Geizhals
                    </a>
                    <button onClick={() => toggleCart(ap.sku, ap.name, ap.msrp, 'Access Point', ap.color)}
                      className={`px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1 transition-colors ${isInCart(ap.sku) ? 'bg-green-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-500'}`}>
                      {isInCart(ap.sku) ? T.btn_saved : T.btn_save}
                    </button>
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{ap.sku} • {ap.generation}</div>
                  <div className="flex gap-1 flex-wrap mt-1">
                    <span className="bg-green-700 px-1.5 py-0.5 rounded text-xs font-bold">~{formatPrice(ap.msrp)}</span>
                    {ap.features.map(f => <FeatureBadge key={f} feature={f} />)}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 text-center text-xs">
                  <div><div className="text-gray-500">{T.card_coverage}</div><div className="font-bold text-sm">{ap.coverage}m²</div></div>
                  <div><div className="text-gray-500">{T.card_streams}</div><div className="font-bold text-sm">{ap.streams}x</div></div>
                  <div><div className="text-gray-500">{T.card_clients}</div><div className="font-bold text-sm">{ap.clients}</div></div>
                  <div><div className="text-gray-500">{T.card_uplink}</div><div className="font-bold text-sm">{ap.ethernet}</div></div>
                </div>
              </div>

              {/* Radio Details */}
              <div className="grid grid-cols-3 gap-3">
                {ap.radio24 ? (
                <div className="bg-gray-700/50 rounded p-3">
                  <h4 className="text-orange-400 font-medium text-sm mb-2">2.4 GHz</h4>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between"><span className="text-gray-400">MIMO</span><span>{ap.radio24.mimo}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">TX</span><span>{ap.radio24.txPower} dBm</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Gain</span><span className="text-yellow-400">{ap.radio24.gain} dBi</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Max</span><span>{ap.radio24.maxRate} Mbps</span></div>
                  </div>
                </div>
                ) : (
                <div className="bg-gray-700/30 rounded p-3 flex items-center justify-center">
                  <span className="text-xs text-gray-600">No 2.4 GHz</span>
                </div>
                )}
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
                <div className="mt-4 p-3 bg-gray-700/30 rounded-lg border border-blue-500/30">
                  <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                    {T.rad_title}
                    <span className="text-xs font-normal text-gray-400">{T.rad_bw} {ap.beamwidth?.h}° H / {ap.beamwidth?.v}° V</span>
                  </h4>
                  {/* Band selector */}
                  <div className="flex gap-2 mb-3">
                    {[...(ap.elevation['2.4GHz'] ? ['2.4GHz'] : []), '5GHz', ...(ap.elevation['6GHz'] ? ['6GHz'] : [])].map(band => (
                      <button key={band} onClick={() => setSelectedBand(band)}
                        className={`px-3 py-1 rounded text-xs font-medium transition-all ${selectedBand === band
                          ? band === '2.4GHz' ? 'bg-orange-600' : band === '5GHz' ? 'bg-blue-600' : 'bg-purple-600'
                          : 'bg-gray-700 hover:bg-gray-600'}`}>
                        {band}
                      </button>
                    ))}
                  </div>
                  {(() => {
                    const bandColor = selectedBand === '2.4GHz' ? '#F97316' : selectedBand === '5GHz' ? '#3B82F6' : '#A855F7';
                    const bandGain = selectedBand === '2.4GHz' ? ap.radio24?.gain : selectedBand === '5GHz' ? ap.radio5.gain : ap.radio6?.gain;
                    const lobeH = 88;
                    const lobeW = Math.min(72, (ap.beamwidth?.v || 75) * 0.92);
                    const vHalf = (ap.beamwidth?.v || 75) * 0.9;
                    return (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Elevation — side view, ceiling mount */}
                        <div className="flex flex-col items-center">
                          <div className="text-xs text-gray-400 mb-2">{T.rad_elev_ceil}</div>
                          <svg viewBox="0 0 200 120" className="w-full max-w-xs" style={{ background: 'transparent' }}>
                            <line x1="20" y1="14" x2="180" y2="14" stroke="#4B5563" strokeWidth="1" strokeDasharray="3,3" />
                            <text x="22" y="12" fill="#6B7280" fontSize="7">{T.rad_ceiling}</text>
                            <rect x="94" y="16" width="12" height="6" fill={bandColor} rx="1" />
                            <text x="100" y="21" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">AP</text>
                            <path
                              d={`M 100 22 Q ${100 - lobeW * 0.9} ${22 + lobeH * 0.5} ${100 - lobeW * 0.82} ${22 + lobeH} Q 100 ${22 + lobeH + 6} ${100 + lobeW * 0.82} ${22 + lobeH} Q ${100 + lobeW * 0.9} ${22 + lobeH * 0.5} 100 22 Z`}
                              fill={`${bandColor}40`} stroke={bandColor} strokeWidth="1.5"
                            />
                            <text x={Math.min(193, 100 + lobeW * 0.82 + 3)} y={22 + lobeH} textAnchor="start" fill={bandColor} fontSize="9" fontWeight="bold">{bandGain} dBi</text>
                            <text x="100" y="118" textAnchor="middle" fill="#9CA3AF" fontSize="7">{T.rad_floor}</text>
                          </svg>
                        </div>
                        {/* Elevation — standard horizontal side view */}
                        <div className="flex flex-col items-center">
                          <div className="text-xs text-gray-400 mb-2">{T.rad_elev_side}</div>
                          <svg viewBox="0 0 200 120" className="w-full max-w-xs" style={{ background: 'transparent' }}>
                            <line x1="10" y1="60" x2="190" y2="60" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />
                            <line x1="100" y1="10" x2="100" y2="110" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />
                            <rect x="93" y="55" width="10" height="10" fill={bandColor} rx="1" />
                            <text x="98" y="62" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">AP</text>
                            <path
                              d={`M 105 60 Q 140 ${60 - vHalf * 1.4} 172 ${60 - vHalf * 0.28} Q 178 60 172 ${60 + vHalf * 0.28} Q 140 ${60 + vHalf * 1.4} 105 60 Z`}
                              fill={`${bandColor}40`} stroke={bandColor} strokeWidth="1.5"
                            />
                            <text x="173" y={60 - vHalf * 0.28 - 2} textAnchor="start" fill={bandColor} fontSize="9" fontWeight="bold">{bandGain} dBi</text>
                            <text x="100" y="118" textAnchor="middle" fill="#9CA3AF" fontSize="7">{T.rad_backfwd}</text>
                          </svg>
                        </div>
                        {/* Azimuth — top-down view */}
                        <div className="flex flex-col items-center">
                          <div className="text-xs text-gray-400 mb-2">{T.rad_azimuth}</div>
                          <svg viewBox="0 0 200 120" className="w-full max-w-xs" style={{ background: 'transparent' }}>
                            <line x1="100" y1="10" x2="100" y2="110" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />
                            <line x1="20" y1="60" x2="180" y2="60" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />
                            {ap.beamwidth?.h === 360 ? (
                              <>
                                <circle cx="100" cy="60" r="50" fill={`${bandColor}40`} stroke={bandColor} strokeWidth="1.5" />
                                <text x="100" y="118" textAnchor="middle" fill="#9CA3AF" fontSize="7">{T.rad_omnitext}</text>
                              </>
                            ) : (
                              <>
                                {(() => {
                                  const halfAngle = ((ap.beamwidth?.h || 90) / 2) * Math.PI / 180;
                                  const r = 52;
                                  const x1 = 100 + r * Math.sin(-halfAngle);
                                  const y1 = 60 - r * Math.cos(-halfAngle);
                                  const x2 = 100 + r * Math.sin(halfAngle);
                                  const y2 = 60 - r * Math.cos(halfAngle);
                                  const largeArc = (ap.beamwidth?.h || 90) > 180 ? 1 : 0;
                                  return (
                                    <path d={`M 100 60 L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                                      fill={`${bandColor}40`} stroke={bandColor} strokeWidth="1.5" />
                                  );
                                })()}
                                <text x="100" y="118" textAnchor="middle" fill="#9CA3AF" fontSize="7">{ap.beamwidth?.h}° {T.rad_directional}</text>
                              </>
                            )}
                            <circle cx="100" cy="60" r="4" fill={bandColor} />
                          </svg>
                        </div>
                      </div>
                    );
                  })()}
                  {/* Stats grid */}
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="bg-gray-700/50 rounded p-1.5 text-center">
                      <div className="text-gray-400">{T.rad_hbw}</div>
                      <div className="font-bold text-blue-400">{ap.beamwidth?.h}°</div>
                    </div>
                    <div className="bg-gray-700/50 rounded p-1.5 text-center">
                      <div className="text-gray-400">{T.rad_vbw}</div>
                      <div className="font-bold text-blue-400">{ap.beamwidth?.v}°</div>
                    </div>
                    <div className="bg-gray-700/50 rounded p-1.5 text-center">
                      <div className="text-gray-400">{selectedBand} {T.rad_gainlabel}</div>
                      <div className="font-bold text-amber-400">{selectedBand === '2.4GHz' ? ap.radio24?.gain : selectedBand === '5GHz' ? ap.radio5.gain : ap.radio6?.gain} dBi</div>
                    </div>
                    <div className="bg-gray-700/50 rounded p-1.5 text-center">
                      <div className="text-gray-400">{T.rad_type}</div>
                      <div className="font-bold">{ap.beamwidth?.h === 360 ? T.rad_omni : T.rad_directional}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="flex flex-wrap gap-3 mt-3 text-xs">
                <div><span className="text-gray-400">{T.card_poelabel}</span> <span className="font-medium">{ap.poe}</span></div>
                <div><span className="text-gray-400">{T.card_mountlabel}</span> <span className="font-medium">{ap.mount}</span></div>
                {ap.notes && <div className="text-yellow-400">💡 {ap.notes}</div>}
              </div>
            </div>

            {/* AP Comparison Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <h3 className="bg-gray-700 px-3 py-1.5 font-semibold text-sm">{T.tbl_comparison}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-700">
                    {(() => {
                      const S = (col, label, cls='') => {
                        const active = apSort.col === col;
                        return <th onClick={() => handleSort(setApSort)(col)} className={`p-1 cursor-pointer select-none hover:text-white ${cls}`}>{label}{active ? (apSort.dir === 'asc' ? ' ▲' : ' ▼') : ''}</th>;
                      };
                      return (<tr>
                        {S('name', T.tbl_model, 'text-left')}
                        {S('generation', 'Gen')}
                        {S('coverage', 'm²')}
                        {S('streams', 'Streams')}
                        {S('gain5', '5G Gain')}
                        {S('radio6', '6 GHz')}
                        <th className="p-1">IP</th>
                        <th className="p-1">BLE</th>
                        {S('mount', T.card_mountlabel.replace(':', ''))}
                        <th className="p-1">Uplink</th>
                        {S('poe', 'PoE')}
                        {S('msrp', T.tbl_price)}
                        <th className="p-1">📋</th>
                        <th className="p-1">🛒</th>
                      </tr>);
                    })()}
                  </thead>
                  <tbody>
                    {filteredAPs.map(([k, d]) => (
                      <tr key={k} className={`border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${selectedAP === k ? 'bg-gray-700' : ''}`} onClick={() => setSelectedAP(k)}>
                        <td className="p-1 font-semibold" style={{ color: d.color }}>{d.status === 'new' && '★ '}{d.name}</td>
                        <td className="p-1 text-center">{d.generation.replace('Wi-Fi ', '')}</td>
                        <td className="p-1 text-center">{d.coverage}</td>
                        <td className="p-1 text-center text-purple-400">{d.streams}</td>
                        <td className="p-1 text-center text-yellow-400">{d.radio5.gain}</td>
                        <td className="p-1 text-center">{d.radio6 ? '✓' : '-'}</td>
                        <td className="p-1 text-center text-sky-400">{d.features.find(f => f.startsWith('IP')) || '-'}</td>
                        <td className="p-1 text-center">{d.features.includes('BLE') ? '✓' : '-'}</td>
                        <td className="p-1 text-center text-gray-300">{d.mount}</td>
                        <td className="p-1 text-center">{d.ethernet}</td>
                        <td className="p-1 text-center">{d.poe.replace(/\s*\([^)]*\)/, '')}</td>
                        <td className="p-1 text-center text-green-400">{formatPrice(d.msrp)}</td>
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
                    placeholder={T.search_sw}
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
                  {T.results_reset} {activeFilterCount > 0 && `(${activeFilterCount})`}
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
                    <option value="all">{T.filter_all}</option>
                    <option value="yes">{T.filter_withpoe}</option>
                    <option value="no">{T.filter_withoutpoe}</option>
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
                    <option value="all">{T.filter_alllayer}</option>
                    <option value="L2">Layer 2</option>
                    <option value="L3">Layer 3</option>
                  </select>
                </div>

                {/* Speed */}
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Port Speed</label>
                  <select value={switchFilters.speed} onChange={(e) => updateFilter('speed', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs">
                    <option value="all">{T.filter_allspeed}</option>
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
                    <option value="all">{T.filter_allff}</option>
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
              {filteredSwitches.length} {T.results_of} {Object.keys(switchData).length} Switches
              {activeFilterCount > 0 && <span className="text-blue-400 ml-2">({activeFilterCount} {T.results_filters})</span>}
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
                    {sw.status === 'new' && <span className="bg-yellow-500 text-black text-xs px-1 rounded">{T.status_new}</span>}
                    {sw.status === 'legacy' && <span className="bg-gray-600 text-xs px-1 rounded">{T.status_legacy}</span>}
                    <a href={getDatasheetLink(sw.sku, 'switch')} target="_blank" rel="noopener noreferrer" 
                      className="bg-blue-600 hover:bg-blue-500 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      {T.btn_specs}
                    </a>
                    <a href={getGeizhalsLink(sw.sku)} target="_blank" rel="noopener noreferrer"
                      className="bg-orange-600 hover:bg-orange-500 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      🛒 Geizhals
                    </a>
                    <button onClick={() => toggleCart(sw.sku, sw.name, sw.msrp, 'Switch', sw.color)}
                      className={`px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1 transition-colors ${isInCart(sw.sku) ? 'bg-green-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-500'}`}>
                      {isInCart(sw.sku) ? T.btn_saved : T.btn_save}
                    </button>
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{sw.sku}</div>
                  <div className="flex gap-1 flex-wrap mt-1">
                    <span className="bg-green-700 px-1.5 py-0.5 rounded text-xs font-bold">~{formatPrice(sw.msrp)}</span>
                    {sw.features.map(f => <FeatureBadge key={f} feature={f} />)}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 text-center text-xs">
                  <div><div className="text-gray-500">Ports</div><div className="font-bold text-sm">{sw.portCount}</div></div>
                  <div><div className="text-gray-500">Speed</div><div className="font-bold text-sm">{sw.speed}</div></div>
                  <div><div className="text-gray-500">Layer</div><div className="font-bold text-sm">{sw.layer}</div></div>
                  <div><div className="text-gray-500">PoE Budget</div><div className="font-bold text-sm text-orange-400">{sw.poeBudget > 0 ? `${sw.poeBudget}W` : '-'}</div></div>
                </div>
              </div>

              {/* Port Details */}
              <div className="bg-gray-700/50 rounded p-2 mt-3">
                <h4 className="text-xs font-semibold mb-2">{T.tbl_portconfig}</h4>
                <div className="text-xs text-gray-300">{sw.ports}</div>
                <div className="grid grid-cols-6 gap-2 mt-2">
                  {sw.ethernet1g > 0 && <div className="bg-gray-600 rounded p-1.5 text-center"><div className="text-lg font-bold">{sw.ethernet1g}</div><div className="text-xs text-gray-400">1G</div></div>}
                  {sw.ethernet2_5g > 0 && <div className="bg-blue-900 rounded p-1.5 text-center"><div className="text-lg font-bold">{sw.ethernet2_5g}</div><div className="text-xs text-gray-400">2.5G</div></div>}
                  {sw.ethernet10g > 0 && <div className="bg-teal-900 rounded p-1.5 text-center"><div className="text-lg font-bold">{sw.ethernet10g}</div><div className="text-xs text-gray-400">10G</div></div>}
                  {sw.sfpPlus > 0 && <div className="bg-purple-900 rounded p-1.5 text-center"><div className="text-lg font-bold">{sw.sfpPlus}</div><div className="text-xs text-gray-400">SFP+</div></div>}
                  {sw.sfp28 > 0 && <div className="bg-pink-900 rounded p-1.5 text-center"><div className="text-lg font-bold">{sw.sfp28}</div><div className="text-xs text-gray-400">SFP28</div></div>}
                  {sw.qsfp28 > 0 && <div className="bg-rose-900 rounded p-1.5 text-center"><div className="text-lg font-bold">{sw.qsfp28}</div><div className="text-xs text-gray-400">QSFP28</div></div>}
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex flex-wrap gap-3 mt-3 text-xs">
                <div><span className="text-gray-400">{T.card_poelabel}</span> <span className="font-medium">{sw.poe || T.misc_nopoe}</span></div>
                <div><span className="text-gray-400">{T.card_formlabel}</span> <span className="font-medium">{sw.formFactor}</span></div>
                <div><span className="text-gray-400">{T.card_maxpower}</span> <span className="font-medium">{sw.power}W</span></div>
                {sw.notes && <div className="text-yellow-400">💡 {sw.notes}</div>}
              </div>
            </div>

            {/* Switch Comparison Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <h3 className="bg-gray-700 px-3 py-1.5 font-semibold text-sm">{T.tbl_comparison}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-700">
                    {(() => {
                      const S = (col, label, cls='') => {
                        const active = switchSort.col === col;
                        return <th onClick={() => handleSort(setSwitchSort)(col)} className={`p-1 cursor-pointer select-none hover:text-white ${cls}`}>{label}{active ? (switchSort.dir === 'asc' ? ' ▲' : ' ▼') : ''}</th>;
                      };
                      return (<tr>
                        {S('name', T.tbl_model, 'text-left')}
                        {S('portCount', 'Ports')}
                        {S('ethernet1g', '1G', 'text-gray-400')}
                        {S('ethernet2_5g', '2.5G', 'text-blue-400')}
                        {S('ethernet10g', '10G', 'text-teal-400')}
                        {S('sfpPlus', 'SFP+', 'text-purple-400')}
                        {S('sfp28', 'SFP28', 'text-yellow-400')}
                        {S('qsfp28', 'QSFP28', 'text-rose-400')}
                        {S('poe', 'PoE')}
                        {S('poeBudget', 'Budget')}
                        {S('layer', 'Layer')}
                        {S('msrp', T.tbl_price)}
                        <th className="p-1">📋</th>
                        <th className="p-1">🛒</th>
                      </tr>);
                    })()}
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
                        <td className="p-1 text-center text-rose-400">{d.qsfp28 > 0 ? d.qsfp28 : '-'}</td>
                        <td className="p-1 text-center">{d.poe || '-'}</td>
                        <td className="p-1 text-center text-orange-400">{d.poeBudget > 0 ? d.poeBudget : '-'}</td>
                        <td className="p-1 text-center">{d.layer}</td>
                        <td className="p-1 text-center text-green-400">{formatPrice(d.msrp)}</td>
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
                    placeholder={T.search_gw}
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
                  {T.results_reset} {activeGatewayFilterCount > 0 && `(${activeGatewayFilterCount})`}
                </button>
              </div>

              {/* Filter Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Built-in Wi-Fi</label>
                  <select value={gatewayFilters.hasWifi} onChange={(e) => updateGatewayFilter('hasWifi', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs">
                    <option value="all">{T.filter_all}</option>
                    <option value="yes">{T.filter_withwifi}</option>
                    <option value="no">{T.filter_withoutwifi}</option>
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
              {filteredGateways.length} {T.results_of} {Object.keys(gatewayData).length} Gateways
              {activeGatewayFilterCount > 0 && <span className="text-purple-400 ml-2">({activeGatewayFilterCount} {T.results_filters})</span>}
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
                    {gw.status === 'new' && <span className="bg-yellow-500 text-black text-xs px-1 rounded">{T.status_new}</span>}
                    <a href={getDatasheetLink(gw.sku, 'gateway')} target="_blank" rel="noopener noreferrer" 
                      className="bg-blue-600 hover:bg-blue-500 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      {T.btn_specs}
                    </a>
                    <a href={getGeizhalsLink(gw.sku)} target="_blank" rel="noopener noreferrer"
                      className="bg-orange-600 hover:bg-orange-500 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      🛒 Geizhals
                    </a>
                    <button onClick={() => toggleCart(gw.sku, gw.name, gw.msrp, 'Gateway', gw.color)}
                      className={`px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1 transition-colors ${isInCart(gw.sku) ? 'bg-green-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-500'}`}>
                      {isInCart(gw.sku) ? T.btn_saved : T.btn_save}
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
                  <div><div className="text-gray-500">{T.card_ipsspeed}</div><div className="font-bold text-sm text-cyan-400">{gw.ipsSpeed} Gbps</div></div>
                  <div><div className="text-gray-500">{T.card_devices}</div><div className="font-bold text-sm">{gw.devices}+</div></div>
                  <div><div className="text-gray-500">{T.card_clients}</div><div className="font-bold text-sm">{gw.clients}+</div></div>
                  <div><div className="text-gray-500">{T.card_formlabel}</div><div className="font-bold text-sm">{gw.formFactor}</div></div>
                </div>
              </div>

              {/* Gateway Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-blue-400 mb-1">{T.card_wanports}</h4>
                  <div className="text-xs">{gw.wan}</div>
                </div>
                <div className="bg-gray-700/50 rounded p-2">
                  <h4 className="text-xs font-semibold text-green-400 mb-1">{T.card_lanports}</h4>
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
                <span className="text-gray-400">{T.card_uniapps}</span> {gw.apps.map(app => (
                  <span key={app} className="ml-1 bg-gray-700 px-1.5 py-0.5 rounded">{app}</span>
                ))}
              </div>

              {gw.notes && <div className="text-yellow-400 text-xs mt-2">💡 {gw.notes}</div>}
            </div>

            {/* Gateway Comparison Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <h3 className="bg-gray-700 px-3 py-1.5 font-semibold text-sm">{T.tbl_comparison}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-700">
                    {(() => {
                      const S = (col, label, cls='') => {
                        const active = gwSort.col === col;
                        return <th onClick={() => handleSort(setGwSort)(col)} className={`p-1 cursor-pointer select-none hover:text-white ${cls}`}>{label}{active ? (gwSort.dir === 'asc' ? ' ▲' : ' ▼') : ''}</th>;
                      };
                      return (<tr>
                        {S('name', T.tbl_model, 'text-left')}
                        {S('ipsSpeed', 'IPS')}
                        {S('clients', 'Clients')}
                        {S('wan', 'WAN')}
                        {S('lan', 'LAN')}
                        {S('sfp', 'SFP')}
                        {S('wifi', 'Wi-Fi')}
                        {S('poe', 'PoE')}
                        {S('formFactor', 'Form')}
                        {S('msrp', T.tbl_price)}
                        <th className="p-1">📋</th>
                        <th className="p-1">🛒</th>
                      </tr>);
                    })()}
                  </thead>
                  <tbody>
                    {filteredGateways.map(([k, g]) => (
                      <tr key={k} className={`border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${selectedGateway === k ? 'bg-gray-700' : ''}`} onClick={() => setSelectedGateway(k)}>
                        <td className="p-1 font-semibold" style={{ color: g.color }}>{g.status === 'new' && '★ '}{g.name}</td>
                        <td className="p-1 text-center text-cyan-400">{g.ipsSpeed}</td>
                        <td className="p-1 text-center">{g.clients}</td>
                        <td className="p-1 text-center text-xs">{g.wan}</td>
                        <td className="p-1 text-center text-xs">{g.lan}</td>
                        <td className="p-1 text-center text-amber-400">{g.sfp || '-'}</td>
                        <td className="p-1 text-center">{g.wifi ? '✓' : '-'}</td>
                        <td className="p-1 text-center">{g.poe ? '✓' : '-'}</td>
                        <td className="p-1 text-center">{g.formFactor}</td>
                        <td className="p-1 text-center text-green-400">{formatPrice(g.msrp)}</td>
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
                    placeholder={T.search_cam}
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
                  {T.results_reset} {activeCameraFilterCount > 0 && `(${activeCameraFilterCount})`}
                </button>
              </div>

              {/* Filter Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {/* Generation */}
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Generation</label>
                  <select value={cameraFilters.generation} onChange={(e) => updateCameraFilter('generation', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs">
                    <option value="all">{T.filter_allgen_cam}</option>
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
                    <option value="all">{T.filter_allai}</option>
                    <option value="yes">{T.filter_withai}</option>
                    <option value="no">{T.filter_withoutai}</option>
                  </select>
                </div>

                {/* Connection */}
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Connection</label>
                  <select value={cameraFilters.connection} onChange={(e) => updateCameraFilter('connection', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs">
                    <option value="all">{T.filter_allconn}</option>
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
                    <option value="all">{T.filter_allip}</option>
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
              {filteredCameras.length} {T.results_of} {Object.keys(cameraData).length} Cameras
              {activeCameraFilterCount > 0 && <span className="text-red-400 ml-2">({activeCameraFilterCount} {T.results_filters})</span>}
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
                    {cam.status === 'new' && <span className="bg-yellow-500 text-black text-xs px-1 rounded">{T.status_new}</span>}
                    <a href={getDatasheetLink(cam.sku, 'camera')} target="_blank" rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-500 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      {T.btn_specs}
                    </a>
                    <a href={getGeizhalsLink(cam.sku)} target="_blank" rel="noopener noreferrer"
                      className="bg-orange-600 hover:bg-orange-500 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      🛒 Geizhals
                    </a>
                    <button onClick={() => toggleCart(cam.sku, cam.name, cam.msrp, 'Camera', cam.color)}
                      className={`px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1 transition-colors ${isInCart(cam.sku) ? 'bg-green-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-500'}`}>
                      {isInCart(cam.sku) ? T.btn_saved : T.btn_save}
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
                  <div><div className="text-gray-500">Resolution</div><div className="font-bold text-sm">{cam.resolution}</div></div>
                  <div><div className="text-gray-500">Sensor</div><div className="font-bold text-sm">{cam.sensor}</div></div>
                  <div><div className="text-gray-500">FoV</div><div className="font-bold text-sm">{cam.fov}</div></div>
                  <div><div className="text-gray-500">IR Range</div><div className="font-bold text-sm">{cam.irRange}m</div></div>
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
              <h3 className="bg-gray-700 px-3 py-1.5 font-semibold text-sm">{T.tbl_comparison}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-700">
                    {(() => {
                      const S = (col, label, cls='') => {
                        const active = camSort.col === col;
                        return <th onClick={() => handleSort(setCamSort)(col)} className={`p-1 cursor-pointer select-none hover:text-white ${cls}`}>{label}{active ? (camSort.dir === 'asc' ? ' ▲' : ' ▼') : ''}</th>;
                      };
                      return (<tr>
                        {S('name', T.tbl_model, 'text-left')}
                        {S('generation', 'Gen')}
                        {S('resolution', 'Resolution')}
                        {S('fov', 'FoV')}
                        {S('irRange', 'IR')}
                        {S('ip', 'IP')}
                        <th className="p-1">Audio</th>
                        <th className="p-1">AI</th>
                        <th className="p-1">LPR</th>
                        {S('msrp', T.tbl_price)}
                        <th className="p-1">📋</th>
                        <th className="p-1">🛒</th>
                      </tr>);
                    })()}
                  </thead>
                  <tbody>
                    {filteredCameras.map(([k, c]) => (
                      <tr key={k} className={`border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${selectedCamera === k ? 'bg-gray-700' : ''}`} onClick={() => setSelectedCamera(k)}>
                        <td className="p-1 font-semibold" style={{ color: c.color }}>{c.status === 'new' && '★ '}{c.name}</td>
                        <td className="p-1 text-center">{c.generation}</td>
                        <td className="p-1 text-center">{c.resolution}</td>
                        <td className="p-1 text-center">{c.fov}</td>
                        <td className="p-1 text-center">{c.irRange}m</td>
                        <td className="p-1 text-center text-sky-400">{c.ip || '-'}</td>
                        <td className="p-1 text-center">{c.audio || '-'}</td>
                        <td className="p-1 text-center">{c.ai ? '✓' : '-'}</td>
                        <td className="p-1 text-center">{c.lpr ? '✓' : '-'}</td>
                        <td className="p-1 text-center text-green-400">{formatPrice(c.msrp)}</td>
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
                    placeholder={T.search_nvr}
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
                  {T.results_reset} {activeNvrFilterCount > 0 && `(${activeNvrFilterCount})`}
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
              {filteredNVRs.length} {T.results_of} {Object.keys(nvrData).length} NVRs
              {activeNvrFilterCount > 0 && <span className="text-blue-400 ml-2">({activeNvrFilterCount} {T.results_filters})</span>}
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
                    {nvr.status === 'new' && <span className="bg-yellow-500 text-black text-xs px-1 rounded">{T.status_new}</span>}
                    <a href={getGeizhalsLink(nvr.sku)} target="_blank" rel="noopener noreferrer"
                      className="bg-orange-600 hover:bg-orange-500 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      🛒 Geizhals
                    </a>
                    <a href={getDatasheetLink(nvr.sku, 'nvr')} target="_blank" rel="noopener noreferrer"
                      className="bg-blue-700 hover:bg-blue-600 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      {T.btn_specs}
                    </a>
                    <button onClick={() => toggleCart(nvr.sku, nvr.name, nvr.msrp, 'NVR', nvr.color)}
                      className={`px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1 transition-colors ${isInCart(nvr.sku) ? 'bg-green-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-500'}`}>
                      {isInCart(nvr.sku) ? T.btn_saved : T.btn_save}
                    </button>
                  </div>
                  <div className="text-xs text-gray-400">{nvr.sku}</div>
                  <div className="flex gap-1 flex-wrap mt-1">
                    <span className="bg-green-700 px-1.5 py-0.5 rounded text-xs font-bold">~{formatPrice(nvr.msrp)}</span>
                    {nvr.features.map(f => <FeatureBadge key={f} feature={f} />)}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 text-center text-xs">
                  <div><div className="text-gray-500">Bays</div><div className="font-bold text-sm text-blue-400">{nvr.bays}x</div></div>
                  <div><div className="text-gray-500">Max Storage</div><div className="font-bold text-sm">{nvr.maxStorage}</div></div>
                  <div><div className="text-gray-500">Cameras</div><div className="font-bold text-sm">{nvr.cameras}</div></div>
                  <div><div className="text-gray-500">Streams</div><div className="font-bold text-sm">{nvr.streams}</div></div>
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
              <h3 className="bg-gray-700 px-3 py-1.5 font-semibold text-sm">{T.tbl_comparison}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-700">
                    {(() => {
                      const S = (col, label, cls='') => {
                        const active = nvrSort.col === col;
                        return <th onClick={() => handleSort(setNvrSort)(col)} className={`p-1 cursor-pointer select-none hover:text-white ${cls}`}>{label}{active ? (nvrSort.dir === 'asc' ? ' ▲' : ' ▼') : ''}</th>;
                      };
                      return (<tr>
                        {S('name', T.tbl_model, 'text-left')}
                        {S('bays', 'Bays')}
                        {S('maxStorage', 'Max TB')}
                        {S('cameras', 'Cameras')}
                        {S('streams', 'Streams')}
                        <th className="p-1">Network</th>
                        <th className="p-1">RAID</th>
                        {S('msrp', T.tbl_price)}
                        <th className="p-1">🛒</th>
                      </tr>);
                    })()}
                  </thead>
                  <tbody>
                    {filteredNVRs.map(([k, n]) => (
                      <tr key={k} className={`border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${selectedNVR === k ? 'bg-gray-700' : ''}`} onClick={() => setSelectedNVR(k)}>
                        <td className="p-1 font-semibold" style={{ color: n.color }}>{n.status === 'new' && '★ '}{n.name}</td>
                        <td className="p-1 text-center text-blue-400">{n.bays}</td>
                        <td className="p-1 text-center">{n.maxStorage}</td>
                        <td className="p-1 text-center">{n.cameras}</td>
                        <td className="p-1 text-center">{n.streams}</td>
                        <td className="p-1 text-center">{n.network}</td>
                        <td className="p-1 text-center">{n.raidSupport ? '✓' : '-'}</td>
                        <td className="p-1 text-center text-green-400">{formatPrice(n.msrp)}</td>
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
                <h4 className="font-semibold text-green-400 text-xs">For small users</h4>
                <p className="text-xs text-gray-300">use youre gatway</p>
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
                    placeholder={T.search_nas}
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
                  {T.results_reset} {activeNasFilterCount > 0 && `(${activeNasFilterCount})`}
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
              {filteredNAS.length} {T.results_of} {Object.keys(nasData).length} NAS
              {activeNasFilterCount > 0 && <span className="text-violet-400 ml-2">({activeNasFilterCount} {T.results_filters})</span>}
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
                    {nas.status === 'new' && <span className="bg-yellow-500 text-black text-xs px-1 rounded">{T.status_new}</span>}
                    {nas.status === 'legacy' && <span className="bg-gray-600 text-gray-300 text-xs px-1 rounded">{T.status_legacy}</span>}
                    <a href={getGeizhalsLink(nas.sku)} target="_blank" rel="noopener noreferrer"
                      className="bg-orange-600 hover:bg-orange-500 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      🛒 Geizhals
                    </a>
                    <a href={getDatasheetLink(nas.sku, 'nas')} target="_blank" rel="noopener noreferrer"
                      className="bg-blue-700 hover:bg-blue-600 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      {T.btn_specs}
                    </a>
                    <button onClick={() => toggleCart(nas.sku, nas.name, nas.msrp, 'NAS', nas.color)}
                      className={`px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1 transition-colors ${isInCart(nas.sku) ? 'bg-green-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-500'}`}>
                      {isInCart(nas.sku) ? T.btn_saved : T.btn_save}
                    </button>
                  </div>
                  <div className="text-xs text-gray-400">{nas.sku}</div>
                  <div className="flex gap-1 flex-wrap mt-1">
                    <span className="bg-green-700 px-1.5 py-0.5 rounded text-xs font-bold">~{formatPrice(nas.msrp)}</span>
                    {nas.features.map(f => <FeatureBadge key={f} feature={f} />)}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 text-center text-xs">
                  <div><div className="text-gray-500">Bays</div><div className="font-bold text-sm text-violet-400">{nas.bays}x</div></div>
                  <div><div className="text-gray-500">Max Storage</div><div className="font-bold text-sm">{nas.maxStorage}</div></div>
                  <div><div className="text-gray-500">Network</div><div className="font-bold text-sm">{nas.network}</div></div>
                  <div><div className="text-gray-500">NVMe Slots</div><div className="font-bold text-sm">{nas.cacheSlots || '-'}</div></div>
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
              <h3 className="bg-gray-700 px-3 py-1.5 font-semibold text-sm">{T.tbl_comparison}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-700">
                    {(() => {
                      const S = (col, label, cls='') => {
                        const active = nasSort.col === col;
                        return <th onClick={() => handleSort(setNasSort)(col)} className={`p-1 cursor-pointer select-none hover:text-white ${cls}`}>{label}{active ? (nasSort.dir === 'asc' ? ' ▲' : ' ▼') : ''}</th>;
                      };
                      return (<tr>
                        {S('name', T.tbl_model, 'text-left')}
                        {S('bays', 'Bays')}
                        {S('maxStorage', 'Max TB')}
                        {S('network', 'Network')}
                        <th className="p-1">CPU</th>
                        {S('ram', 'RAM')}
                        {S('cacheSlots', 'Cache')}
                        {S('msrp', T.tbl_price)}
                        <th className="p-1">🛒</th>
                      </tr>);
                    })()}
                  </thead>
                  <tbody>
                    {filteredNAS.map(([k, n]) => (
                      <tr key={k} className={`border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${selectedNAS === k ? 'bg-gray-700' : ''}`} onClick={() => setSelectedNAS(k)}>
                        <td className="p-1 font-semibold" style={{ color: n.color }}>{n.status === 'new' && '★ '}{n.name}</td>
                        <td className="p-1 text-center text-violet-400">{n.bays}</td>
                        <td className="p-1 text-center">{n.maxStorage}</td>
                        <td className="p-1 text-center">{n.network}</td>
                        <td className="p-1 text-center">{n.cpu}</td>
                        <td className="p-1 text-center">{n.ram}</td>
                        <td className="p-1 text-center">{n.cacheSlots > 0 ? `${n.cacheSlots}x` : '-'}</td>
                        <td className="p-1 text-center text-green-400">{formatPrice(n.msrp)}</td>
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
                    placeholder={T.search_br}
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
                  {T.results_reset} {activeBridgeFilterCount > 0 && `(${activeBridgeFilterCount})`}
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
              {filteredBridges.length} {T.results_of} {Object.keys(bridgeData).length} PTP Links
              {activeBridgeFilterCount > 0 && <span className="text-cyan-400 ml-2">({activeBridgeFilterCount} {T.results_filters})</span>}
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
                    {br.status === 'new' && <span className="bg-yellow-500 text-black text-xs px-1 rounded">{T.status_new}</span>}
                    <a href={getGeizhalsLink(br.sku)} target="_blank" rel="noopener noreferrer"
                      className="bg-orange-600 hover:bg-orange-500 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      🛒 Geizhals
                    </a>
                    <button onClick={() => toggleCart(br.sku, br.name, br.msrp, 'PTP Link', br.color)}
                      className={`px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1 transition-colors ${isInCart(br.sku) ? 'bg-green-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-500'}`}>
                      {isInCart(br.sku) ? T.btn_saved : T.btn_save}
                    </button>
                  </div>
                  <div className="text-xs text-gray-400">{br.sku}</div>
                  <div className="flex gap-1 flex-wrap mt-1">
                    <span className="bg-green-700 px-1.5 py-0.5 rounded text-xs font-bold">~{formatPrice(br.msrp)}</span>
                    {br.features.map(f => <FeatureBadge key={f} feature={f} />)}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 text-center text-xs">
                  <div><div className="text-gray-500">Frequency</div><div className="font-bold text-sm text-cyan-400">{br.frequency}</div></div>
                  <div><div className="text-gray-500">Range</div><div className="font-bold text-sm">{br.range ? `${br.range} ${br.rangeUnit}` : '-'}</div></div>
                  <div><div className="text-gray-500">Bandwidth</div><div className="font-bold text-sm">{br.bandwidth || '-'}</div></div>
                  <div><div className="text-gray-500">Gain</div><div className="font-bold text-sm text-amber-400">{br.antennaGain ? `${br.antennaGain} dBi` : '-'}</div></div>
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
                    {T.rad_title}
                    <span className="text-xs font-normal text-gray-400">
                      {T.rad_bw} {br.beamwidthH}° H / {br.beamwidthV}° V
                    </span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Elevation Pattern - Seitenansicht */}
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-gray-400 mb-2">{T.rad_elev_vert}</div>
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
                        <text x="100" y="118" textAnchor="middle" fill="#9CA3AF" fontSize="8">{T.rad_backmain}</text>
                        <text x="178" y="64" textAnchor="start" fill={br.color} fontSize="9" fontWeight="bold">{br.antennaGain} dBi</text>
                        
                        {/* Beamwidth indicator */}
                        <path d={`M 130 ${60 - br.beamwidthV * 1.2} A 30 30 0 0 1 130 ${60 + br.beamwidthV * 1.2}`} 
                              fill="none" stroke="#6B7280" strokeWidth="1" strokeDasharray="2,2" />
                        <text x="135" y="45" fill="#9CA3AF" fontSize="7">{br.beamwidthV}°</text>
                      </svg>
                    </div>
                    
                    {/* Azimuth Pattern - Draufsicht */}
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-gray-400 mb-2">{T.rad_azimuth_horiz}</div>
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
                      <div className="text-gray-400">{T.rad_hbw}</div>
                      <div className="font-bold text-cyan-400">{br.beamwidthH}°</div>
                    </div>
                    <div className="bg-gray-700/50 rounded p-1.5 text-center">
                      <div className="text-gray-400">{T.rad_vbw}</div>
                      <div className="font-bold text-cyan-400">{br.beamwidthV}°</div>
                    </div>
                    <div className="bg-gray-700/50 rounded p-1.5 text-center">
                      <div className="text-gray-400">{T.rad_antgain}</div>
                      <div className="font-bold text-amber-400">{br.antennaGain} dBi</div>
                    </div>
                    <div className="bg-gray-700/50 rounded p-1.5 text-center">
                      <div className="text-gray-400">{T.rad_type}</div>
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
              <h3 className="bg-gray-700 px-3 py-1.5 font-semibold text-sm">{T.tbl_comparison}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-700">
                    {(() => {
                      const S = (col, label, cls='') => {
                        const active = bridgeSort.col === col;
                        return <th onClick={() => handleSort(setBridgeSort)(col)} className={`p-1 cursor-pointer select-none hover:text-white ${cls}`}>{label}{active ? (bridgeSort.dir === 'asc' ? ' ▲' : ' ▼') : ''}</th>;
                      };
                      return (<tr>
                        {S('name', T.tbl_model, 'text-left')}
                        {S('frequency', 'Freq')}
                        {S('range', 'Range')}
                        {S('bandwidth', 'Speed')}
                        {S('antennaGain', 'Gain')}
                        {S('interface', 'Interface')}
                        <th className="p-1">IP</th>
                        {S('poe', 'PoE')}
                        {S('msrp', T.tbl_price)}
                        <th className="p-1">🛒</th>
                      </tr>);
                    })()}
                  </thead>
                  <tbody>
                    {filteredBridges.map(([k, b]) => (
                      <tr key={k} className={`border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${selectedBridge === k ? 'bg-gray-700' : ''}`} onClick={() => setSelectedBridge(k)}>
                        <td className="p-1 font-semibold" style={{ color: b.color }}>{b.status === 'new' && '★ '}{b.name}</td>
                        <td className="p-1 text-center text-cyan-400">{b.frequency}</td>
                        <td className="p-1 text-center">{b.range ? `${b.range} ${b.rangeUnit}` : '-'}</td>
                        <td className="p-1 text-center">{b.bandwidth || '-'}</td>
                        <td className="p-1 text-center text-amber-400">{b.antennaGain || '-'}</td>
                        <td className="p-1 text-center">{b.interface || '-'}</td>
                        <td className="p-1 text-center text-sky-400">{b.weatherproof || '-'}</td>
                        <td className="p-1 text-center text-xs">{b.poe || '-'}</td>
                        <td className="p-1 text-center text-green-400">{formatPrice(b.msrp)}</td>
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
            <h2 className="text-xl font-bold mb-4">{T.cart_title}</h2>
            {cart.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400">
                <div className="text-4xl mb-3">🛒</div>
                <div className="text-lg font-medium mb-1">{T.cart_empty_title}</div>
                <div className="text-sm">{T.cart_empty_hint}</div>
              </div>
            ) : (
              <>
                {[
                  { key: 'Gateway', label: T.section_gateway },
                  { key: 'Switch', label: T.section_switch },
                  { key: 'Access Point', label: T.section_ap },
                  { key: 'PTP Link', label: T.section_ptplink },
                  { key: 'Camera', label: T.section_camera },
                  { key: 'NVR', label: T.section_nvr },
                  { key: 'NAS', label: T.section_nas },
                ].map(({ key, label }) => {
                  const items = cart.filter(i => i.section === key);
                  if (items.length === 0) return null;
                  return (
                    <div key={key} className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">{label}</h3>
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
                    {T.cart_removeall}
                  </button>
                  <div className="text-right">
                    <div className="text-xs text-gray-400 mb-0.5">{cart.reduce((s, i) => s + i.qty, 0)} {T.cart_total_suffix}</div>
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
        <div className="mt-6 pt-4 border-t border-gray-700 text-xs text-gray-500 space-y-2">
          <div className="text-center">
            ui-choicer • {Object.keys(apData).length} APs • {Object.keys(switchData).length} Switches • {Object.keys(gatewayData).length} Gateways • {Object.keys(cameraData).length} Cameras • {Object.keys(nvrData).length} NVRs • {Object.keys(nasData).length} NAS • {Object.keys(bridgeData).length} PTP Links • {T.footer_prices}
          </div>
          <div className="border-t border-gray-800 pt-2 text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-500">{T.footer_disclaimer_label}: </span>{T.footer_disclaimer}
          </div>
        </div>
      </div>
    </div>
  );
}
