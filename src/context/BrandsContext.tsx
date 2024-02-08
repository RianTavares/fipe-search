"use client"

import { 
    createContext, 
    useEffect, 
    useState 
} from "react";

type BrandType = {
    codigo: string;
    nome: string;
};

type BrandContextType = {
    brands: BrandType[];
    setBrands: (brands: BrandType[]) => void;
    isReady: boolean;
};

type WithChildrenProps = {
    children: React.ReactNode
};

export const BrandContext = createContext<BrandContextType>({
    brands: [],
    setBrands: () => {},
    isReady: false,
});

export const BrandsProvider = ({children}: WithChildrenProps) => {
    const [brands, setBrands] = useState<BrandType[]>([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const fetchBrands = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            if (typeof apiUrl === 'undefined') {
                console.error('A URL da API não está definida no .env');
                setIsReady(false);
                return;
            }

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Falha ao buscar dados da API');
                }
                const fetchedBrands: BrandType[] = await response.json();
                setBrands(fetchedBrands);
                setIsReady(true);

            } catch (error) {
                console.error("Erro ao buscar marcas:", error);
                setIsReady(false);
            }
        };

        fetchBrands();
    }, []);

    return (
        <BrandContext.Provider value={{ brands, setBrands, isReady }}>
            {isReady ? children : <div>Carregando...</div>}
        </BrandContext.Provider>
    );
}
