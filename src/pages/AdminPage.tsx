
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { mockApi, type SponsorRequest, type Category } from '@/services/mockApi';

const AdminPage = () => {
  const [requests, setRequests] = useState<SponsorRequest[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [requestsData, categoriesData] = await Promise.all([
          mockApi.getSponsorRequests(),
          mockApi.getCategories()
        ]);
        setRequests(requestsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to load admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleStatusUpdate = async (requestId: string, status: SponsorRequest['status']) => {
    try {
      const success = await mockApi.updateSponsorRequestStatus(requestId, status);
      if (success) {
        setRequests(requests.map(req => 
          req.id === requestId ? { ...req, status } : req
        ));
        toast({
          title: "Status Updated",
          description: `Request has been ${status}.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update request status.",
        variant: "destructive",
      });
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? `${category.name} (${category.city})` : categoryId;
  };

  const getStatusBadgeVariant = (status: SponsorRequest['status']) => {
    switch (status) {
      case 'approved':
        return 'default'; // Green
      case 'rejected':
        return 'destructive'; // Red
      default:
        return 'secondary'; // Gray
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cl-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading admin data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold text-cl-primary mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage sponsorship requests and track category sponsorships.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="cl-card p-6 text-center">
            <div className="text-2xl font-bold text-cl-primary">
              {requests.length}
            </div>
            <div className="text-sm text-gray-600">Total Requests</div>
          </Card>
          
          <Card className="cl-card p-6 text-center">
            <div className="text-2xl font-bold text-cl-accent">
              {requests.filter(req => req.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </Card>
          
          <Card className="cl-card p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {requests.filter(req => req.status === 'approved').length}
            </div>
            <div className="text-sm text-gray-600">Approved</div>
          </Card>
          
          <Card className="cl-card p-6 text-center">
            <div className="text-2xl font-bold text-red-600">
              {requests.filter(req => req.status === 'rejected').length}
            </div>
            <div className="text-sm text-gray-600">Rejected</div>
          </Card>
        </div>

        {/* Requests Table */}
        <Card className="cl-card">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-playfair font-semibold text-cl-primary">
              Sponsorship Requests
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            {requests.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No sponsorship requests yet.
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Partner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {request.partnerName}
                          </div>
                          {request.message && (
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {request.message}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getCategoryName(request.categoryId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.contactEmail}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getStatusBadgeVariant(request.status)}>
                          {request.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        {request.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleStatusUpdate(request.id, 'approved')}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleStatusUpdate(request.id, 'rejected')}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminPage;
