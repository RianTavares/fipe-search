"use client"
import { Form, Results } from '@/components';
import { ContentCard, MainContent, Title, Subtitle } from './page.style';

export default function HomePage() {
  return (
    <MainContent>
      <ContentCard>
        <Title>Tabela Fipe</Title>
        <Subtitle>Consulte o valor de um veículo gratuitamente</Subtitle>
        <Form />
      </ContentCard>
      <Results />
    </MainContent>
  );
}
