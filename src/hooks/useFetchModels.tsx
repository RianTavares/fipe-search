import { useState, useEffect } from 'react';
import { ModelType } from '@/types';

export const useFetchModels = (brandCode: string | undefined) => {
    const [models, setModels] = useState<ModelType[]>([]);
    const [disableModelInput, setDisableModelInput] = useState(true);

    useEffect(() => {
        if (!brandCode) return;

        const fetchModels = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${brandCode}/modelos`);
                if (!response.ok) throw new Error('Falha ao buscar modelos da API');
                const data = await response.json();
                setModels(data.modelos);
                setDisableModelInput(false);
            } catch (error) {
                console.error("Erro ao buscar modelos:", error);
            }
        };

        fetchModels();
    }, [brandCode]);

    return { models, disableModelInput, setDisableModelInput, setModels};
};

