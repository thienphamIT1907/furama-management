export interface RentType {
    rentTypeId: number;
    rentTypeName: string;
    cost: number;
}

export const rentTypeArr = [
    {
        rentTypeId: 1,
        rentTypeName: 'Tháng',
        cost: 3000000
    },
    {
        rentTypeId: 2,
        rentTypeName: 'Tuần',
        cost: 2000000
    },
    {
        rentTypeId: 3,
        rentTypeName: 'Ngày',
        cost: 1000000
    },
    {
        rentTypeId: 4,
        rentTypeName: 'Giờ',
        cost: 500000
    },
];
