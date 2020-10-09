import { markRaw } from 'vue';
import Catalog from '@/constants/Catalog.js';
import {
    NotebookIcon,
    DiaryIcon,
    PapersIcon,
    RulerIcon,
    ProtractorIcon,
    PencilCaseIcon,
    PencilIcon,
    ChalkIcon,
} from '@/components/icons';

const Catalogs = [
    {
        key: Catalog.Notebooks,
        text: 'Тетради',
        icon: markRaw(NotebookIcon),
    },
    {
        key: Catalog.Diaries,
        text: 'Дневники',
        icon: markRaw(DiaryIcon),
    },
    {
        key: Catalog.Papers,
        text: 'Бумага',
        icon: markRaw(PapersIcon),
    },
    {
        key: Catalog.PencilCases,
        text: 'Пеналы',
        icon: markRaw(PencilCaseIcon),
    },
    {
        key: Catalog.Pencils,
        text: 'Карандаши',
        icon: markRaw(PencilIcon),
    },
    {
        key: Catalog.Rulers,
        text: 'Линейки',
        icon: markRaw(RulerIcon),
    },
    {
        key: Catalog.Protractors,
        text: 'Транспортиры',
        icon: markRaw(ProtractorIcon),
    },
    {
        key: Catalog.Chalk,
        text: 'Мел',
        icon: markRaw(ChalkIcon),
    },
];

export default Catalogs;
