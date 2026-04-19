import { DataSource } from 'typeorm';
import { Product } from './modules/products/product.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/freshfarm',
  entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
  synchronize: true,
});

async function seed() {
  console.log('🌱 開始種子資料植入...');

  await AppDataSource.initialize();
  console.log('✅ 資料庫連線成功');

  const productRepository = AppDataSource.getRepository(Product);

  const products = [
    {
      title: '有機小白菜',
      category: '蔬菜',
      description: '新鮮有機小白菜，來自台灣本地農場',
      content: '<p>我們的有機小白菜採用自然農法種植，不使用農藥和化肥。</p>',
      imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82ber643',
      imagesUrl: [
        'https://images.unsplash.com/photo-1518977676601-b53f82ber643',
        'https://images.unsplash.com/photo-1540420773487-7f8a28e8e08e',
      ],
      price: 45,
      origin_price: 60,
      is_enabled: 1,
      unit: '把',
      farm: '陽光農場',
      origin: '雲林',
      weight: '250g',
      num: 1,
      eating_tips: '清洗後可直接炒食或煮湯',
      origin_info: '雲林縣斗六市，有機認證農場',
      shelf_life: '5天',
      storage_method: '冷藏保存，避免陽光直射',
    },
    {
      title: '台灣芒果',
      category: '水果',
      description: '愛文芒果，甜度高、香氣濃郁',
      content: '<p>來自台南玉井的愛文芒果，每一顆都經過嚴格篩選。</p>',
      imageUrl: 'https://images.unsplash.com/photo-1553279768-8f2821e4193e',
      imagesUrl: [
        'https://images.unsplash.com/photo-1553279768-8f2821e4193e',
        'https://images.unsplash.com/photo-1583240562426-614fe3e2e4c4',
      ],
      price: 120,
      origin_price: 150,
      is_enabled: 1,
      unit: '盒',
      farm: '玉井果園',
      origin: '台南',
      weight: '3kg',
      num: 1,
      eating_tips: '冰鎮後食用風味更佳',
      origin_info: '台南市玉井區，產銷履歷認證',
      shelf_life: '7天',
      storage_method: '室溫催熟後冷藏',
    },
    {
      title: '鮮乳',
      category: '乳製品',
      description: '100%純鮮乳，無添加物',
      content: '<p>來自花蓮瑞穗牧場的鮮乳，每一滴都是純淨的。</p>',
      imageUrl: 'https://images.unsplash.com/photo-1563636619-e914a4a3e527',
      imagesUrl: [
        'https://images.unsplash.com/photo-1563636619-e914a4a3e527',
      ],
      price: 85,
      origin_price: 95,
      is_enabled: 1,
      unit: '瓶',
      farm: '瑞穗牧場',
      origin: '花蓮',
      weight: '1L',
      num: 1,
      eating_tips: '開封後請冷藏並於3天內飲用完畢',
      origin_info: '花蓮縣瑞穗鄉，CAS優良乳品認證',
      shelf_life: '14天',
      storage_method: '冷藏2-7°C',
    },
    {
      title: '黑豬肉梅花片',
      category: '肉品',
      description: '台灣黑豬肉梅花片，油花分布均勻',
      content: '<p>嚴選台灣黑豬肉，肉質鮮甜、口感Q彈。</p>',
      imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51c1a9e6860',
      imagesUrl: [
        'https://images.unsplash.com/photo-1607623814075-e51c1a9e6860',
      ],
      price: 250,
      origin_price: 300,
      is_enabled: 1,
      unit: '包',
      farm: '黑豬之家',
      origin: '屏東',
      weight: '300g',
      num: 1,
      eating_tips: '適合火鍋、涮涮鍋',
      origin_info: '屏東縣內埔鄉，產銷履歷認證',
      shelf_life: '3天（冷藏）/ 30天（冷凍）',
      storage_method: '冷藏0-4°C或冷凍-18°C以下',
    },
    {
      title: '虱目魚肚',
      category: '海鮮',
      description: '新鮮虱目魚肚，肉質細嫩',
      content: '<p>來自台南沿海的虱目魚，無刺魚肚處理，方便料理。</p>',
      imageUrl: 'https://images.unsplash.com/photo-1510130113-5052aa7f6a64',
      imagesUrl: [
        'https://images.unsplash.com/photo-1510130113-5052aa7f6a64',
      ],
      price: 180,
      origin_price: 220,
      is_enabled: 1,
      unit: '片',
      farm: '台南漁場',
      origin: '台南',
      weight: '200g',
      num: 1,
      eating_tips: '煎、烤、煮湯皆宜',
      origin_info: '台南市七股區，產銷履歷認證',
      shelf_life: '2天（冷藏）/ 30天（冷凍）',
      storage_method: '冷藏0-4°C或冷凍-18°C以下',
    },
    {
      title: '有機紅蘿蔔',
      category: '蔬菜',
      description: '有機紅蘿蔔，色澤鮮豔、口感脆甜',
      imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
      imagesUrl: [
        'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
      ],
      price: 55,
      origin_price: 70,
      is_enabled: 1,
      unit: '袋',
      farm: '田心農場',
      origin: '彰化',
      weight: '500g',
      num: 1,
      eating_tips: '可生食、炒食或煮湯',
      origin_info: '彰化縣田中鎮，有機認證',
      shelf_life: '10天',
      storage_method: '冷藏保存',
    },
    {
      title: '高山烏龍茶',
      category: '茶飲',
      description: '阿里山高山烏龍茶，香氣清雅',
      content: '<p>海拔1500公尺以上的茶園，手工採摘，炭焙精製。</p>',
      imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc',
      imagesUrl: [
        'https://images.unsplash.com/photo-1556679343-c7306c1976bc',
      ],
      price: 350,
      origin_price: 420,
      is_enabled: 1,
      unit: '罐',
      farm: '阿里山茶園',
      origin: '嘉義',
      weight: '150g',
      num: 1,
      eating_tips: '以90°C水溫沖泡，第一泡30秒',
      origin_info: '嘉義縣阿里山鄉，產銷履歷認證',
      shelf_life: '2年',
      storage_method: '密封保存於陰涼乾燥處',
    },
    {
      title: '手工豆腐',
      category: '豆製品',
      description: '手工製作板豆腐，豆香濃郁',
      imageUrl: 'https://images.unsplash.com/photo-1628689469838-5247b8e6150b',
      imagesUrl: [],
      price: 40,
      origin_price: 50,
      is_enabled: 1,
      unit: '盒',
      farm: '老師傅豆腐坊',
      origin: '桃園',
      weight: '400g',
      num: 1,
      eating_tips: '煎、煮、炒、滷皆宜',
      origin_info: '桃園市大溪區，使用非基改黃豆',
      shelf_life: '5天',
      storage_method: '冷藏保存，浸泡水中並每日換水',
    },
  ];

  for (const productData of products) {
    const existing = await productRepository.findOne({
      where: { title: productData.title },
    });
    if (!existing) {
      const product = productRepository.create(productData);
      await productRepository.save(product);
      console.log(`  ✅ 新增: ${productData.title}`);
    } else {
      console.log(`  ⏭️  已存在: ${productData.title}`);
    }
  }

  console.log(`\n🎉 種子資料植入完成！共 ${products.length} 筆商品`);
  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error('❌ 種子資料植入失敗:', error);
  process.exit(1);
});