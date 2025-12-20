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
        <Layout className="min-h-screen font-manrope">
            {/* Header is currently fixed or relative, we can wrap it if needed */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <Header />
            </div>

            <Content className="h-[calc(100vh-64px)]">
                <PageContainer className="bg-background">
                    {children}
                </PageContainer>
            </Content>
        </Layout>
    );
};
