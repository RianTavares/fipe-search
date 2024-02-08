"use client"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { 
    ChangeEvent, 
    useContext, 
    useEffect, 
    useState 
} from "react";
import { useFetchModels } from '@/hooks/useFetchModels';
import { useFetchYears } from '@/hooks/useFetchYears';
import { BrandContext } from "@/context/BrandsContext";
import { ResultsContext } from '@/context/ResultsContext';
import { BrandType, ModelType, YearType } from '@/types';
import { 
    autocompleteClassTest, 
    disabledButton,
    FormContainer,
    SearchButton  
} from "./Form.style";

export default function Form() {
    const [selectedBrand, setSelectedBrand] = useState<BrandType | null>(null);
    const [selectedModel, setSelectedModel] = useState<ModelType | null>(null);
    const [selectedYear, setSelectedYear] = useState<YearType | null>(null);
    const { brands } = useContext(BrandContext);
    const { models, disableModelInput } = useFetchModels(selectedBrand?.codigo);
    const { years, showYearInput } = useFetchYears(selectedModel?.codigo, selectedBrand);
    const { setResults } = useContext(ResultsContext);
    const [disableSubmit, setDisableSubmit] = useState(true);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
      
        if (selectedBrand && selectedModel && selectedYear) {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${selectedBrand.codigo}/modelos/${selectedModel.codigo}/anos/${selectedYear.codigo}`);
            if (!response.ok) {
              throw new Error('Falha na busca do preço');
            }
            const data = await response.json();
            setResults(data);
          } catch (error) {
            console.error("Erro ao buscar o preço:", error);
          }
        }
    };

    useEffect(() => {
        const isFormComplete = selectedBrand && selectedModel && selectedYear;
        setDisableSubmit(!isFormComplete);
    }, [selectedBrand, selectedModel, selectedYear]);

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Autocomplete
                disablePortal
                id="combo-box-brand"
                options={brands}
                getOptionLabel={(option) => option.nome}
                onChange={(event: ChangeEvent<{}>, newValue: BrandType | null) => setSelectedBrand(newValue)}
                sx={autocompleteClassTest}
                renderInput={(params) => <TextField {...params} label="Marca" />}
            />
            <Autocomplete
                disablePortal
                disabled={disableModelInput}
                id="combo-box-model"
                options={models}
                getOptionLabel={(option) => option.nome}
                onChange={(event: ChangeEvent<{}>, newValue: ModelType | null) => setSelectedModel(newValue)}
                sx={autocompleteClassTest}
                renderInput={(params) => <TextField {...params} label="Modelo" />}
            />
            <Autocomplete
                disablePortal
                id="combo-box-year"
                options={years}
                getOptionLabel={(option) => option.nome}
                onChange={(event: ChangeEvent<{}>, newValue: YearType | null) => setSelectedYear(newValue)}
                sx={{
                    ...autocompleteClassTest,
                    display: showYearInput ? 'block' : 'none',
                }}
                renderInput={(params) => <TextField {...params} label="Ano" />}
            />
            <SearchButton 
                disabled={disableSubmit}
                type="submit"
                style={{
                    ...(disableSubmit ? disabledButton : {})
                }}
            >
                Consultar preço
            </SearchButton>
        </FormContainer>
    )
}