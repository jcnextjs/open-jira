import { Entry } from '../interfaces';

type SeedEntry = Omit<Entry, '_id'>;

interface SeedData {
    entries: SeedEntry[];
}

export const seedData: SeedData = {
    entries: [
        {
            description:
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic soluta repudiandae',
            createdAt: Date.now(),
            status: 'PENDING',
        },
        {
            description: 'Velit ad nostrud culpa laborum sunt et cillum officia nisi consectetur.',
            createdAt: Date.now() - 1000 * 60 * 34,
            status: 'PENDING',
        },
        {
            description: 'Occaecat ut magna labore veniam do nulla amet enim labore.',
            createdAt: Date.now() - 1000 * 60 * 60 * 18,
            status: 'IN-PROGRESS',
        },
        {
            description:
                'Cillum nulla mollit veniam esse quis ad cupidatat ullamco nulla exercitation cillum fugiat aliqua aliquip.',
            createdAt: Date.now() - 1000 * 60 * 60 * 28,
            status: 'DONE',
        },
        {
            description: 'Do consequat irure labore qui ea do velit.',
            createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
            status: 'DONE',
        },
    ],
};
