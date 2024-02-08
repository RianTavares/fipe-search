import { useState, useEffect } from 'react';
import { ModelType, BrandType } from '@/types';

export const useFetchYears = (modelCode: string | undefined, selectedBrand: BrandType | null) => {
    const [years, setYears] = useState<ModelType[]>([]);
    const [showYearInput, setShowYearInput] = useState(false);

    useEffect(() => {
        if (!modelCode) return;

        const fetchYears = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${selectedBrand?.codigo}/modelos/${modelCode}/anos`);
                if (!response.ok) throw new Error('Falha ao buscar anos da API');
                const data = await response.json();
                setYears(data);
                setShowYearInput(true);
            } catch (error) {
                console.error("Erro ao buscar anos:", error);
            }
        };

        fetchYears();
    }, [modelCode]);

    return { years, showYearInput };
};

