import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useFetchModels, useFetchYears } from '@/hooks';
import { BrandContext, ResultsContext } from "@/context";
import { BrandType, ModelType, YearType } from '@/types';
import { autocompleteClassTest, disabledButton, FormContainer, SearchButton } from "./Form.style";

export default function Form() {
    const [selectedBrand, setSelectedBrand] = useState<BrandType | null>(null);
    const [selectedModel, setSelectedModel] = useState<ModelType | null>(null);
    const [selectedYear, setSelectedYear] = useState<YearType | null>(null);
    const [previousSelection, setPreviousSelection] = useState<{ brand: BrandType | null, model: ModelType 
        | null, year: YearType | null }>({ brand: null, model: null, year: null });
    const { brands } = useContext(BrandContext);
    const { models, disableModelInput, setDisableModelInput, setModels} = useFetchModels(selectedBrand?.codigo);
    const { years, showYearInput, setShowYearInput, setYears } = useFetchYears(selectedModel?.codigo, selectedBrand);
    const { setResults } = useContext(ResultsContext);
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [errorAlert, setErrorAlert] = useState<boolean>(false);

    const handleBrandChange = (event: ChangeEvent<{}>, newValue: BrandType | null) => {
        setSelectedBrand(newValue);
        setSelectedModel(null);
        setSelectedYear(null);
        setModels([]);
        setYears([]);
        setResults(null);
    };
    
    const handleModelChange = (event: ChangeEvent<{}>, newValue: ModelType | null) => {
        setSelectedModel(newValue);
        setYears([]);
        setSelectedYear(null);
        setResults(null);
    };

    const handleYearChange = (event: ChangeEvent<{}>, newValue: YearType | null) => {
        setSelectedYear(newValue);
        setResults(null);
    };

    useEffect(() => {
        setDisableModelInput(!selectedBrand);
    }, [selectedBrand]);
    
    useEffect(() => {
        setShowYearInput(!!selectedModel);
    }, [selectedModel]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorAlert(false);

        if (selectedBrand?.codigo === previousSelection.brand?.codigo && selectedModel?.codigo === 
            previousSelection.model?.codigo && selectedYear?.codigo === previousSelection.year?.codigo) {
            return;
        }

        if (selectedBrand && selectedModel && selectedYear) {
            try {
                setIsFetching(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${selectedBrand
                    .codigo}/modelos/${selectedModel.codigo}/anos/${selectedYear.codigo}`);

                if (!response.ok) {
                    throw new Error('Falha na busca do preço');
                }
                const data = await response.json();
                setResults(data);
                setPreviousSelection({ brand: selectedBrand, model: selectedModel, year: selectedYear });
            } catch (error) {
                setErrorAlert(true);
                console.error("Erro ao buscar o preço:", error);
            } finally {
                setIsFetching(false);
            }
        }
    };

    useEffect(() => {
        const isFormFullyCompleted = selectedBrand && selectedModel && selectedYear;
        setDisableSubmit(!isFormFullyCompleted);
    }, [selectedBrand, selectedModel, selectedYear]);

    return (
        <>
            <FormContainer onSubmit={handleSubmit}>
                <Autocomplete
                    disablePortal
                    id="combo-box-brand"
                    options={brands}
                    getOptionLabel={(option) => option.nome}
                    onChange={handleBrandChange}
                    sx={autocompleteClassTest}
                    renderInput={(params) => <TextField {...params} label="Marca" />}
                />
                <Autocomplete
                    disablePortal
                    disabled={disableModelInput}
                    id="combo-box-model"
                    options={models}
                    getOptionLabel={(option) => option.nome}
                    onChange={handleModelChange}
                    sx={autocompleteClassTest}
                    renderInput={(params) => <TextField {...params} label="Modelo" />}
                    value={selectedModel}
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-year"
                    options={years}
                    getOptionLabel={(option) => option.nome}
                    onChange={handleYearChange}
                    sx={{
                        ...autocompleteClassTest,
                        display: showYearInput ? 'block' : 'none',
                    }}
                    renderInput={(params) => <TextField {...params} label="Ano" />}
                    value={selectedYear}
                />
                <SearchButton
                    disabled={disableSubmit}
                    type="submit"
                    style={{
                        ...(disableSubmit || isFetching ? disabledButton : {})
                    }}
                >
                    {isFetching ? 'Buscando ...': 'Consultar preço'}
                </SearchButton>
            </FormContainer>
        
            {errorAlert && <Alert severity="error">Ocorreu um erro ao consultar preço.</Alert>}
        </>
    )
}