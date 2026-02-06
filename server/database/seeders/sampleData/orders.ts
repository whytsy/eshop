export const ordersData = [
    {
        userEmail: 'user1@shop.com',
        deliveryAddress: 'г. Москва, ул. Тверская, д. 15, кв. 42',
        phone: '+7 (999) 123-45-67',
        status: 'DELIVERED' as const,
        items: [
        { deviceName: 'iPhone 15 Pro Max', quantity: 1 },
        { deviceName: 'AirPods Pro 2', quantity: 1 }
        ],
        createdAt: new Date('2024-01-15')
    },
    {
        userEmail: 'user1@shop.com',
        deliveryAddress: 'г. Москва, пр. Ленина, д. 87, офис 305',
        phone: '+7 (999) 123-45-67',
        status: 'SHIPPED' as const,
        items: [
        { deviceName: 'MacBook Air 13" M2', quantity: 1 }
        ],
        createdAt: new Date('2024-02-20')
    },

    {
        userEmail: 'user2@shop.com',
        deliveryAddress: 'г. Санкт-Петербург, Невский пр., д. 28',
        phone: '+7 (911) 234-56-78',
        status: 'DELIVERED' as const,
        items: [
        { deviceName: 'Samsung Galaxy S24 Ultra', quantity: 1 },
        { deviceName: 'Samsung Galaxy Buds2 Pro', quantity: 1 }
        ],
        createdAt: new Date('2024-01-22')
    },
    {
        userEmail: 'user2@shop.com',
        deliveryAddress: 'г. Санкт-Петербург, ул. Садовая, д. 54',
        phone: '+7 (911) 234-56-78',
        status: 'PENDING' as const,
        items: [
        { deviceName: 'Xiaomi Smart Band 8 Pro', quantity: 2 }
        ],
        createdAt: new Date('2024-03-01')
    },

    {
        userEmail: 'user3@shop.com',
        deliveryAddress: 'г. Екатеринбург, ул. Малышева, д. 31',
        phone: '+7 (912) 345-67-89',
        status: 'SHIPPED' as const,
        items: [
        { deviceName: 'Huawei Mate 60 Pro+', quantity: 1 },
        { deviceName: 'Huawei FreeBuds Pro 3', quantity: 1 }
        ],
        createdAt: new Date('2024-02-10')
    },

    {
        userEmail: 'user4@shop.com',
        deliveryAddress: 'г. Новосибирск, Красный пр., д. 22',
        phone: '+7 (913) 456-78-90',
        status: 'DELIVERED' as const,
        items: [
        { deviceName: 'Google Pixel 8 Pro', quantity: 1 },
        { deviceName: 'Google Pixel Watch 2', quantity: 1 },
        { deviceName: 'Google Pixel Buds Pro', quantity: 1 }
        ],
        createdAt: new Date('2024-01-30')
    },
    {
        userEmail: 'user4@shop.com',
        deliveryAddress: 'г. Новосибирск, ул. Кирова, д. 12',
        phone: '+7 (913) 456-78-90',
        status: 'DELIVERED' as const,
        items: [
        { deviceName: 'iPad Air 5', quantity: 1 }
        ],
        createdAt: new Date('2024-02-25')
    },

    {
        userEmail: 'user5@shop.com',
        deliveryAddress: 'г. Казань, ул. Баумана, д. 45',
        phone: '+7 (914) 567-89-01',
        status: 'PENDING' as const,
        items: [
        { deviceName: 'OnePlus 12', quantity: 1 },
        { deviceName: 'Apple Watch Series 9 45mm', quantity: 1 }
        ],
        createdAt: new Date('2024-03-05')
    },

    {
        userEmail: 'user1@shop.com',
        deliveryAddress: 'г. Москва, ул. Новый Арбат, д. 21, бизнес-центр',
        phone: '+7 (999) 123-45-67',
        status: 'DELIVERED' as const,
        items: [
        { deviceName: 'MacBook Pro 16" M3 Max', quantity: 3 },
        { deviceName: 'iPhone 14', quantity: 5 },
        { deviceName: 'AirPods Pro 2', quantity: 5 }
        ],
        createdAt: new Date('2024-01-10'),
        comment: 'Корпоративный заказ для офиса'
    },

    {
        userEmail: 'user2@shop.com',
        deliveryAddress: 'г. Санкт-Петербург, ул. Восстания, д. 6',
        phone: '+7 (911) 234-56-78',
        status: 'SHIPPED' as const,
        items: [
        { deviceName: 'Xiaomi 14 Pro', quantity: 2 },
        { deviceName: 'Xiaomi Pad 6 Pro', quantity: 1 }
        ],
        createdAt: new Date('2024-02-15')
    }
];