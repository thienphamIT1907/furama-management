export interface FServiceBonus {
    fServiceBonusId: number;
    fServiceBonusName: string;
    cost: number;
    unit: number;
    status: string;
}

export const fServiceBonusArr = [
    {
        fServiceBonusId: 1,
        fServiceBonusName: 'Massage',
        cost: 12000000,
        unit: 1,
        status: 'active'
    },
    {
        fServiceBonusId: 2,
        fServiceBonusName: 'Karaoke',
        cost: 500000,
        unit: 1,
        status: 'active'
    },
    {
        fServiceBonusId: 3,
        fServiceBonusName: 'Thức ăn',
        cost: 300000,
        unit: 1,
        status: 'active'
    },
    {
        fServiceBonusId: 4,
        fServiceBonusName: 'Nước uống',
        cost: 200000,
        unit: 1,
        status: 'active'
    },
    {
        fServiceBonusId: 5,
        fServiceBonusName: 'Thuê xe tham quan Resort',
        cost: 100000,
        unit: 1,
        status: 'active'
    },
];
