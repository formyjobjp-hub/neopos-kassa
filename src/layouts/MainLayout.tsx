import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import Header from '../components/layout/Header';
import { PageContainer, FluidPanel } from '../components/common';

const { Content } = Layout;

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <Layout className="h-screen md:h-[100dvh] flex flex-col font-manrope overflow-hidden">
            {/* Header is currently fixed or relative, we can wrap it if needed */}
            <div className="shrink-0 bg-white border-b border-gray-100 sticky top-0 z-header">
                <Header />
            </div>

            <Content className="flex-1 overflow-hidden">
                <PageContainer className="bg-background">
                    {children}
                </PageContainer>
            </Content>
        </Layout>
    );
};
