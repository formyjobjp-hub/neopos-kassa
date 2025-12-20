import React, { ReactNode } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

interface AuthLayoutProps {
    children: ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <Layout className="min-h-screen bg-gray-50 flex items-center justify-center font-manrope">
            <Content className="w-full flex items-center justify-center">
                {children}
            </Content>
        </Layout>
    );
};
