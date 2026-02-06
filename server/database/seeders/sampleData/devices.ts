export const devicesData = [
  // ==================== APPLE ====================
  {
    name: 'iPhone 15 Pro Max',
    price: 1499,
    brand: 'Apple',
    type: 'Smartphone',
    quantityInStock: 18,
    imagesFolder: 'iPhone-15-Pro-Max',
    info: [
      { title: 'Display', description: '6.7" Super Retina XDR, 120Hz ProMotion' },
      { title: 'Chip', description: 'A17 Pro (3nm)' },
      { title: 'Storage', description: '1TB' },
      { title: 'Main Camera', description: '48MP (f/1.78)' },
      { title: 'Telephoto', description: '12MP, 5x optical zoom' },
      { title: 'Battery', description: '4441 mAh, up to 29h video playback' },
      { title: 'OS', description: 'iOS 17' },
      { title: 'Connectivity', description: '5G, Wi-Fi 6E, Bluetooth 5.3' }
    ]
  },
  {
    name: 'iPhone 14',
    price: 799,
    brand: 'Apple',
    type: 'Smartphone',
    quantityInStock: 42,
    imagesFolder: 'iPhone-14',
    info: [
      { title: 'Display', description: '6.1" Super Retina XDR' },
      { title: 'Chip', description: 'A15 Bionic' },
      { title: 'Storage', description: '128GB' },
      { title: 'Dual Camera', description: '12MP Main + 12MP Ultra Wide' },
      { title: 'Battery', description: '3279 mAh, up to 20h video playback' },
      { title: 'OS', description: 'iOS 16' }
    ]
  },
  {
    name: 'MacBook Pro 16" M3 Max',
    price: 3499,
    brand: 'Apple',
    type: 'Laptop',
    quantityInStock: 8,
    imagesFolder: 'MacBook-Pro-16-M3',
    info: [
      { title: 'Display', description: '16.2" Liquid Retina XDR, 3456x2234' },
      { title: 'Chip', description: 'M3 Max (16-core CPU, 40-core GPU)' },
      { title: 'RAM', description: '64GB Unified Memory' },
      { title: 'Storage', description: '2TB SSD' },
      { title: 'Battery', description: '100Wh, up to 22h' },
      { title: 'Ports', description: '3x Thunderbolt 4, HDMI, SDXC, MagSafe 3' }
    ]
  },
  {
    name: 'MacBook Air 13" M2',
    price: 1199,
    brand: 'Apple',
    type: 'Laptop',
    quantityInStock: 25,
    imagesFolder: 'MacBook-Air-13-M2',
    info: [
      { title: 'Display', description: '13.6" Liquid Retina, 2560x1664' },
      { title: 'Chip', description: 'Apple M2 (8-core CPU, 10-core GPU)' },
      { title: 'RAM', description: '16GB Unified Memory' },
      { title: 'Storage', description: '512GB SSD' },
      { title: 'Weight', description: '1.24 kg' },
      { title: 'Battery', description: '52.6Wh, up to 18h' }
    ]
  },
  {
    name: 'iPad Air 5',
    price: 749,
    brand: 'Apple',
    type: 'Tablet',
    quantityInStock: 32,
    imagesFolder: 'iPad-Air-5',
    info: [
      { title: 'Display', description: '10.9" Liquid Retina, 2360x1640' },
      { title: 'Chip', description: 'Apple M1' },
      { title: 'Storage', description: '256GB' },
      { title: 'Camera', description: '12MP Wide, 12MP Ultra Wide front' },
      { title: 'Connectivity', description: 'Wi-Fi 6, 5G option' },
      { title: 'Apple Pencil', description: '2nd generation support' }
    ]
  },
  {
    name: 'Apple Watch Series 9 45mm',
    price: 429,
    brand: 'Apple',
    type: 'Smartwatch',
    quantityInStock: 55,
    imagesFolder: 'Apple-Watch-Series-9',
    info: [
      { title: 'Display', description: '45mm Always-On Retina LTPO OLED' },
      { title: 'Chip', description: 'S9 SiP with 64-bit dual-core processor' },
      { title: 'Storage', description: '64GB' },
      { title: 'Battery', description: '309 mAh, up to 18h, fast charging' },
      { title: 'Sensors', description: 'Blood Oxygen, ECG, Temperature sensing' },
      { title: 'Connectivity', description: 'GPS + Cellular, Ultra Wideband' }
    ]
  },
  {
    name: 'AirPods Pro 2',
    price: 249,
    brand: 'Apple',
    type: 'Headphones',
    quantityInStock: 67,
    imagesFolder: 'AirPods-Pro-2',
    info: [
      { title: 'Driver', description: 'Custom high-excursion driver' },
      { title: 'Noise Cancellation', description: 'Active Noise Cancellation, Transparency mode' },
      { title: 'Battery', description: 'Up to 6h listening (ANC on), 30h with case' },
      { title: 'Chip', description: 'H2 chip' },
      { title: 'Features', description: 'Personalized Spatial Audio, Adaptive Audio' },
      { title: 'Charging', description: 'MagSafe, Qi, Lightning' }
    ]
  },

  // ==================== SAMSUNG ====================
  {
    name: 'Samsung Galaxy S24 Ultra',
    price: 1299,
    brand: 'Samsung',
    type: 'Smartphone',
    quantityInStock: 22,
    imagesFolder: 'Galaxy-S24-Ultra',
    info: [
      { title: 'Display', description: '6.8" Dynamic AMOLED 2X, 120Hz, 1750 nits' },
      { title: 'Chip', description: 'Snapdragon 8 Gen 3 for Galaxy' },
      { title: 'Storage', description: '1TB UFS 4.0' },
      { title: 'Main Camera', description: '200MP with Adaptive Pixel' },
      { title: 'Telephoto', description: '50MP 5x optical zoom' },
      { title: 'Periscope', description: '10MP 10x optical zoom' },
      { title: 'Battery', description: '5000 mAh, 45W fast charging' },
      { title: 'S Pen', description: 'Built-in with 2.8ms latency' }
    ]
  },
  {
    name: 'Samsung Galaxy Z Fold5',
    price: 1799,
    brand: 'Samsung',
    type: 'Smartphone',
    quantityInStock: 12,
    imagesFolder: 'Galaxy-Z-Fold5',
    info: [
      { title: 'Cover Display', description: '6.2" Dynamic AMOLED 2X, 120Hz' },
      { title: 'Main Display', description: '7.6" Dynamic AMOLED 2X, 120Hz' },
      { title: 'Chip', description: 'Snapdragon 8 Gen 2 for Galaxy' },
      { title: 'Storage', description: '512GB' },
      { title: 'Cameras', description: '50MP Main + 12MP Ultra Wide + 10MP Telephoto' },
      { title: 'Inner Camera', description: '4MP Under Display Camera' },
      { title: 'Battery', description: '4400 mAh, 25W fast charging' }
    ]
  },
  {
    name: 'Samsung Galaxy Tab S9 Ultra',
    price: 1199,
    brand: 'Samsung',
    type: 'Tablet',
    quantityInStock: 15,
    imagesFolder: 'Galaxy-Tab-S9-Ultra',
    info: [
      { title: 'Display', description: '14.6" Dynamic AMOLED 2X, 120Hz, HDR10+' },
      { title: 'Chip', description: 'Snapdragon 8 Gen 2 for Galaxy' },
      { title: 'RAM', description: '12GB' },
      { title: 'Storage', description: '256GB, microSD up to 1TB' },
      { title: 'S Pen', description: 'Included, 2.8ms latency' },
      { title: 'Battery', description: '11200 mAh, 45W fast charging' },
      { title: 'Audio', description: 'Quad speakers by AKG, Dolby Atmos' }
    ]
  },
  {
    name: 'Samsung Galaxy Watch6 Classic 47mm',
    price: 399,
    brand: 'Samsung',
    type: 'Smartwatch',
    quantityInStock: 38,
    imagesFolder: 'Galaxy-Watch6-Classic',
    info: [
      { title: 'Display', description: '47" Sapphire Crystal, Super AMOLED, 480x480' },
      { title: 'Chip', description: 'Exynos W930 Dual-Core 1.4GHz' },
      { title: 'RAM/Storage', description: '2GB + 16GB' },
      { title: 'Battery', description: '425 mAh, up to 40h, 10W wireless charging' },
      { title: 'Sensors', description: 'BioActive Sensor (Optical HR, ECG, BIA)' },
      { title: 'Rotating Bezel', description: 'Physical rotating bezel' }
    ]
  },
  {
    name: 'Samsung Galaxy Buds2 Pro',
    price: 229,
    brand: 'Samsung',
    type: 'Headphones',
    quantityInStock: 52,
    imagesFolder: 'Galaxy-Buds2-Pro',
    info: [
      { title: 'Driver', description: '2-way speaker (woofer + tweeter)' },
      { title: 'Noise Cancellation', description: 'Intelligent Active Noise Cancellation' },
      { title: 'Audio Codec', description: '24-bit Hi-Fi with Samsung Seamless Codec' },
      { title: 'Battery', description: 'Up to 8h (ANC on), 29h with case' },
      { title: 'Charging', description: 'Qi wireless, USB-C, 5 min charge = 1h play' },
      { title: 'Connectivity', description: 'Bluetooth 5.3, Auto Switch' }
    ]
  },

  // ==================== XIAOMI ====================
  {
    name: 'Xiaomi 14 Pro',
    price: 999,
    brand: 'Xiaomi',
    type: 'Smartphone',
    quantityInStock: 28,
    imagesFolder: 'Xiaomi-14-Pro',
    info: [
      { title: 'Display', description: '6.73" C8 AMOLED, 120Hz LTPO, 3000 nits' },
      { title: 'Chip', description: 'Snapdragon 8 Gen 3' },
      { title: 'Storage', description: '512GB UFS 4.0' },
      { title: 'Leica Camera', description: '50MP 1/1.31" Light Hunter 900' },
      { title: 'Ultra Wide', description: '50MP 115°' },
      { title: 'Telephoto', description: '50MP floating telephoto' },
      { title: 'Battery', description: '4880 mAh, 120W wired, 50W wireless' }
    ]
  },
  {
    name: 'Xiaomi Redmi Note 13 Pro+',
    price: 449,
    brand: 'Xiaomi',
    type: 'Smartphone',
    quantityInStock: 75,
    imagesFolder: 'Redmi-Note-13-Pro-Plus',
    info: [
      { title: 'Display', description: '6.67" 1.5K AMOLED, 120Hz, 1800 nits' },
      { title: 'Chip', description: 'MediaTek Dimensity 7200 Ultra' },
      { title: 'Storage', description: '512GB' },
      { title: 'Main Camera', description: '200MP with OIS' },
      { title: 'Ultra Wide', description: '8MP 120°' },
      { title: 'Macro', description: '2MP' },
      { title: 'Battery', description: '5000 mAh, 120W HyperCharge' }
    ]
  },
  {
    name: 'Xiaomi Pad 6 Pro',
    price: 549,
    brand: 'Xiaomi',
    type: 'Tablet',
    quantityInStock: 23,
    imagesFolder: 'Xiaomi-Pad-6-Pro',
    info: [
      { title: 'Display', description: '11" 2.8K LCD, 144Hz, Dolby Vision' },
      { title: 'Chip', description: 'Snapdragon 8+ Gen 1' },
      { title: 'RAM', description: '12GB LPDDR5' },
      { title: 'Storage', description: '256GB UFS 3.1' },
      { title: 'Battery', description: '8600 mAh, 67W fast charging' },
      { title: 'Audio', description: 'Quad speakers, Dolby Atmos' },
      { title: 'Accessories', description: 'Xiaomi Smart Pen (2nd gen), Keyboard' }
    ]
  },
  {
    name: 'Xiaomi Smart Band 8 Pro',
    price: 79,
    brand: 'Xiaomi',
    type: 'Smartwatch',
    quantityInStock: 120,
    imagesFolder: 'Smart-Band-8-Pro',
    info: [
      { title: 'Display', description: '1.74" AMOLED, 336x480, 60Hz' },
      { title: 'Sensors', description: 'PPG heart rate, SpO2, Accelerometer, Gyroscope' },
      { title: 'Sports Modes', description: '150+ professional modes' },
      { title: 'Battery', description: 'Up to 14 days typical use' },
      { title: 'Water Resistance', description: '5 ATM' },
      { title: 'Connectivity', description: 'Bluetooth 5.1, GNSS, NFC' }
    ]
  },

  // ==================== HUAWEI ====================
  {
    name: 'Huawei Mate 60 Pro+',
    price: 1399,
    brand: 'Huawei',
    type: 'Smartphone',
    quantityInStock: 16,
    imagesFolder: 'Mate-60-Pro-Plus',
    info: [
      { title: 'Display', description: '6.82" LTPO OLED, 120Hz, 1440Hz PWM' },
      { title: 'Chip', description: 'Kirin 9000S (7nm)' },
      { title: 'Storage', description: '1TB NM Card expansion' },
      { title: 'Camera System', description: 'XMAGE Imaging' },
      { title: 'Main Camera', description: '50MP variable aperture f/1.4-f/4.0' },
      { title: 'Periscope', description: '48MP with macro capability' },
      { title: 'Ultra Wide', description: '40MP f/2.2' },
      { title: 'Satellite', description: 'Tiantong satellite calling' }
    ]
  },
  {
    name: 'Huawei MateBook X Pro 2023',
    price: 1899,
    brand: 'Huawei',
    type: 'Laptop',
    quantityInStock: 9,
    imagesFolder: 'MateBook-X-Pro',
    info: [
      { title: 'Display', description: '14.2" 3.1K touch, 90Hz, 100% P3' },
      { title: 'CPU', description: 'Intel Core i7-1360P' },
      { title: 'GPU', description: 'Intel Iris Xe Graphics' },
      { title: 'RAM', description: '32GB LPDDR5' },
      { title: 'Storage', description: '2TB NVMe PCIe 4.0 SSD' },
      { title: 'Battery', description: '60Wh, up to 14h' },
      { title: 'Weight', description: '1.26 kg' },
      { title: 'Features', description: 'Super Device, Multi-screen collaboration' }
    ]
  },
  {
    name: 'Huawei MatePad Pro 13.2',
    price: 899,
    brand: 'Huawei',
    type: 'Tablet',
    quantityInStock: 21,
    imagesFolder: 'MatePad-Pro-13',
    info: [
      { title: 'Display', description: '13.2" OLED, 120Hz, 1000 nits, 94% screen-to-body' },
      { title: 'Chip', description: 'Kirin 9000E' },
      { title: 'RAM', description: '12GB' },
      { title: 'Storage', description: '512GB' },
      { title: 'Stylus', description: 'Huawei M-Pencil (3rd gen), 10,000 pressure levels' },
      { title: 'Audio', description: 'Histen 8.0, 6 speakers' },
      { title: 'Connectivity', description: 'HarmonyOS 4, PC-level WPS Office' }
    ]
  },
  {
    name: 'Huawei FreeBuds Pro 3',
    price: 199,
    brand: 'Huawei',
    type: 'Headphones',
    quantityInStock: 45,
    imagesFolder: 'FreeBuds-Pro-3',
    info: [
      { title: 'Driver', description: '11mm quad-magnet dynamic driver' },
      { title: 'Noise Cancellation', description: 'Intelligent Dynamic ANC 3.0' },
      { title: 'Audio Codec', description: 'L2HC 3.0, up to 1.5Mbps' },
      { title: 'Battery', description: 'Up to 7h (ANC on), 33h with case' },
      { title: 'Charging', description: 'Wireless charging, USB-C, 5 min = 2h play' },
      { title: 'Features', description: 'Bone Voice Pickup, Dual-device connection' }
    ]
  },

  // ==================== GOOGLE ====================
  {
    name: 'Google Pixel 8 Pro',
    price: 999,
    brand: 'Google',
    type: 'Smartphone',
    quantityInStock: 31,
    imagesFolder: 'Pixel-8-Pro',
    info: [
      { title: 'Display', description: '6.7" Super Actua OLED, 120Hz LTPO, 2400 nits' },
      { title: 'Chip', description: 'Google Tensor G3 with Titan M2 security' },
      { title: 'Storage', description: '512GB' },
      { title: 'Main Camera', description: '50MP Octa-PD Quad Pixel, f/1.68' },
      { title: 'Ultra Wide', description: '48MP Quad Pixel, f/1.95, 125.5°' },
      { title: 'Telephoto', description: '48MP Quad Pixel, 5x optical zoom' },
      { title: 'Temperature Sensor', description: 'Body temperature measurement' },
      { title: 'AI Features', description: 'Magic Editor, Best Take, Audio Magic Eraser' }
    ]
  },
  {
    name: 'Google Pixel Tablet',
    price: 499,
    brand: 'Google',
    type: 'Tablet',
    quantityInStock: 27,
    imagesFolder: 'Pixel-Tablet',
    info: [
      { title: 'Display', description: '10.95" LCD, 2560x1600, 500 nits' },
      { title: 'Chip', description: 'Google Tensor G2' },
      { title: 'RAM', description: '8GB' },
      { title: 'Storage', description: '128GB' },
      { title: 'Speakers', description: 'Quad speakers, 3 microphones' },
      { title: 'Charging Speaker Dock', description: 'Included, turns tablet into smart display' },
      { title: 'Battery', description: '27Wh, up to 12h video streaming' }
    ]
  },
  {
    name: 'Google Pixel Watch 2',
    price: 349,
    brand: 'Google',
    type: 'Smartwatch',
    quantityInStock: 40,
    imagesFolder: 'Pixel-Watch-2',
    info: [
      { title: 'Display', description: '41mm Always-on AMOLED, 320ppi, 1000 nits' },
      { title: 'Chip', description: 'Qualcomm Snapdragon W5 + Google coprocessor' },
      { title: 'RAM/Storage', description: '2GB + 32GB' },
      { title: 'Sensors', description: 'Multi-path heart rate, cEDA, skin temperature' },
      { title: 'Health Features', description: 'Fitbit integration, ECG, Sleep tracking' },
      { title: 'Battery', description: '306 mAh, up to 24h, fast charging' }
    ]
  },
  {
    name: 'Google Pixel Buds Pro',
    price: 199,
    brand: 'Google',
    type: 'Headphones',
    quantityInStock: 58,
    imagesFolder: 'Pixel-Buds-Pro',
    info: [
      { title: 'Driver', description: '11mm dynamic driver with custom-designed horn' },
      { title: 'Noise Cancellation', description: 'Silent Seal adaptive ANC' },
      { title: 'Transparency Mode', description: 'Conversation Detection' },
      { title: 'Battery', description: 'Up to 11h (ANC off), 31h with case' },
      { title: 'Charging', description: 'Wireless charging, USB-C, 5 min = 1h play' },
      { title: 'Features', description: 'Multi-point connection, Google Assistant, Find My Device' }
    ]
  },

  // ==================== ONE PLUS ====================
  {
    name: 'OnePlus 12',
    price: 799,
    brand: 'OnePlus',
    type: 'Smartphone',
    quantityInStock: 34,
    imagesFolder: 'OnePlus-12',
    info: [
      { title: 'Display', description: '6.82" 2K ProXDR LTPO AMOLED, 120Hz, 4500 nits' },
      { title: 'Chip', description: 'Snapdragon 8 Gen 3' },
      { title: 'Storage', description: '512GB UFS 4.0' },
      { title: 'Main Camera', description: '50MP Sony LYT-808 with OIS' },
      { title: 'Ultra Wide', description: '48MP Sony IMX581' },
      { title: 'Periscope', description: '64MP OV64B with 3x optical zoom' },
      { title: 'Battery', description: '5400 mAh, 100W wired, 50W wireless' },
      { title: 'Cooling', description: 'VC Cooling System 2.0 (9140mm²)' }
    ]
  },

  // ==================== SONY ====================
  {
    name: 'Sony WH-1000XM5',
    price: 399,
    brand: 'Sony',
    type: 'Headphones',
    quantityInStock: 29,
    imagesFolder: 'Sony-WH-1000XM5',
    info: [
      { title: 'Driver', description: '30mm carbon fiber composite driver' },
      { title: 'Noise Cancellation', description: 'Integrated Processor V1, 8 mics' },
      { title: 'Battery', description: 'Up to 30h (ANC on), 3 min charge = 3h play' },
      { title: 'Weight', description: '250g' },
      { title: 'Features', description: 'Speak-to-Chat, Quick Attention, LDAC' },
      { title: 'Microphones', description: '4 beamforming mics for calls' }
    ]
  },

  // ==================== REALME ====================
  {
    name: 'Realme GT5 Pro',
    price: 649,
    brand: 'Realme',
    type: 'Smartphone',
    quantityInStock: 41,
    imagesFolder: 'Realme-GT5-Pro',
    info: [
      { title: 'Display', description: '6.78" 1.5K AMOLED, 144Hz LTPO, 4500 nits' },
      { title: 'Chip', description: 'Snapdragon 8 Gen 3' },
      { title: 'Storage', description: '1TB UFS 4.0' },
      { title: 'Main Camera', description: '50MP Sony LYT-T808 with OIS' },
      { title: 'Periscope', description: '50MP Sony IMX890 with 3x optical zoom' },
      { title: 'Ultra Wide', description: '8MP Sony IMX355' },
      { title: 'Battery', description: '5400 mAh, 100W wired, 50W wireless' }
    ]
  },

  // ==================== NOTHING ====================
  {
    name: 'Nothing Phone (2)',
    price: 699,
    brand: 'Nothing',
    type: 'Smartphone',
    quantityInStock: 36,
    imagesFolder: 'Nothing-Phone-2',
    info: [
      { title: 'Display', description: '6.7" LTPO OLED, 120Hz, 1600 nits peak' },
      { title: 'Chip', description: 'Snapdragon 8+ Gen 1' },
      { title: 'Storage', description: '512GB' },
      { title: 'Main Camera', description: '50MP Sony IMX890 with OIS' },
      { title: 'Ultra Wide', description: '50MP Samsung JN1 114°' },
      { title: 'Glyph Interface', description: 'LED lighting system with 33 zones' },
      { title: 'Battery', description: '4700 mAh, 45W wired, 15W wireless' }
    ]
  },

  // ==================== HONOR ====================
  {
    name: 'Honor Magic5 Pro',
    price: 899,
    brand: 'Honor',
    type: 'Smartphone',
    quantityInStock: 24,
    imagesFolder: 'Honor-Magic5-Pro',
    info: [
      { title: 'Display', description: '6.81" LTPO OLED, 120Hz, 1800 nits, 2160Hz PWM' },
      { title: 'Chip', description: 'Snapdragon 8 Gen 2' },
      { title: 'Storage', description: '512GB' },
      { title: 'Main Camera', description: '50MP f/1.6 with OIS' },
      { title: 'Ultra Wide', description: '50MP 122°' },
      { title: 'Periscope', description: '50MP 3.5x optical zoom' },
      { title: 'Battery', description: '5100 mAh silicon-carbon, 66W wired, 50W wireless' }
    ]
  },

  // ==================== OPPO ====================
  {
    name: 'Oppo Find N3',
    price: 1699,
    brand: 'Oppo',
    type: 'Smartphone',
    quantityInStock: 11,
    imagesFolder: 'Oppo-Find-N3',
    info: [
      { title: 'Cover Display', description: '6.3" AMOLED, 120Hz, 2800 nits' },
      { title: 'Main Display', description: '7.82" AMOLED, 120Hz, 2800 nits' },
      { title: 'Chip', description: 'Snapdragon 8 Gen 2' },
      { title: 'Storage', description: '512GB' },
      { title: 'Hasselblad Camera', description: '48MP wide + 48MP ultra-wide + 64MP periscope' },
      { title: 'Battery', description: '4805 mAh, 67W SuperVOOC' },
      { title: 'Audio', description: 'Triple speakers, Spatial Audio' }
    ]
  },

  // ==================== VIVO ====================
  {
    name: 'Vivo X100 Pro',
    price: 1099,
    brand: 'Vivo',
    type: 'Smartphone',
    quantityInStock: 19,
    imagesFolder: 'Vivo-X100-Pro',
    info: [
      { title: 'Display', description: '6.78" AMOLED, 120Hz LTPO, 3000 nits' },
      { title: 'Chip', description: 'MediaTek Dimensity 9300' },
      { title: 'Storage', description: '512GB UFS 4.0' },
      { title: 'Zeiss Camera', description: '50MP 1-inch Sony IMX989 with OIS' },
      { title: 'Periscope', description: '50MP 4.3x optical zoom' },
      { title: 'Ultra Wide', description: '50MP 119°' },
      { title: 'Battery', description: '5400 mAh, 100W wired, 50W wireless' }
    ]
  },

  // ==================== ASUS ====================
  {
    name: 'ASUS ROG Phone 8 Pro',
    price: 1499,
    brand: 'ASUS',
    type: 'Smartphone',
    quantityInStock: 7,
    imagesFolder: 'ROG-Phone-8-Pro',
    info: [
      { title: 'Display', description: '6.78" Samsung E6 AMOLED, 165Hz LTPO, 2500 nits' },
      { title: 'Chip', description: 'Snapdragon 8 Gen 3' },
      { title: 'RAM', description: '24GB LPDDR5X' },
      { title: 'Storage', description: '1TB UFS 4.0' },
      { title: 'Cooling', description: 'AeroActive Cooler X, GameCool 8' },
      { title: 'Battery', description: '5500 mAh, 65W HyperCharge' },
      { title: 'Gaming Features', description: 'AirTrigger 6, ultrasonic buttons' }
    ]
  }
];