import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';

export default function ProfilePage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <p className="text-muted-foreground">
              This page is under construction. User profile information will be displayed here.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}