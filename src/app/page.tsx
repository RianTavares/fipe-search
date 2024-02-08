
"use client"
import Form from "@/components/Form";
import Results from '@/components/Results/Results';
import { 
  ContentCard,
  MainContent,
  Title,
  Subtitle 
} from './page.style';
import { value } from "@/mocks";

export default function Home() {
  return (
    <MainContent>
      <ContentCard>
        <Title>Tabela Fipe</Title>
        <Subtitle>Consulte o valor de um veículo de forma gratuita</Subtitle>
        <Form />
      </ContentCard>
      <Results />
    </MainContent>
  );
}
