"use client"
import { createContext, ReactNode, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { Loader } from "@/components";
import { BrandType } from "@/types";

type BrandContextType = {
    brands: BrandType[];
    setBrands: (brands: BrandType[]) => void;
    isReady: boolean;
};

type BrandsProviderProps = {
    children: ReactNode;
};

export const BrandContext = createContext<BrandContextType>({
    brands: [],
    setBrands: () => {},
    isReady: false,
});

export const BrandsProvider = ({ children }: BrandsProviderProps) => {
    const [brands, setBrands] = useState<BrandType[]>([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                if (!apiUrl) throw new Error('A URL da API não está definida no .env');

                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Falha ao buscar dados da API');

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
            {isReady ? children : (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh'
                }}>
                    <Loader />
                </Box>
            )}
        </BrandContext.Provider>
    );
};
