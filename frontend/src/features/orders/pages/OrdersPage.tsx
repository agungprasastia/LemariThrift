import * as React from 'react';
import { Link } from 'react-router-dom';
import { Package, ExternalLink } from 'lucide-react';
import { Button, Badge, Skeleton } from '@/components/ui';
import { useOrders } from '@/features/orders/hooks/useOrders';
import { cn } from '@/lib/utils';
import { IOrder, IOrderItem } from '@/types';

export function OrdersPage() {
  const { data: ordersData, isLoading } = useOrders();
  const orders = ordersData?.data || [];

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <Badge variant="sale">Menunggu Pembayaran</Badge>;
      case 'processing':
        return <Badge variant="primary">Diproses</Badge>;
      case 'shipped':
        return <Badge variant="primary">Dikirim</Badge>;
      case 'completed':
        return <Badge variant="success">Selesai</Badge>;
      case 'cancelled':
        return <Badge variant="danger">Dibatalkan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-hairline pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-display font-bold uppercase tracking-machined">Daftar Pesanan</h1>
          <p className="text-body text-sm mt-2">Lacak status dan riwayat transaksi Anda.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col space-y-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-full h-48" />
          ))}
        </div>
      ) : orders.length > 0 ? (
        <div className="flex flex-col space-y-6">
          {orders.map((order: IOrder) => (
            <div key={order.id} className="border border-hairline bg-surface-card flex flex-col">
              
              {/* Order Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 md:p-6 border-b border-hairline bg-surface-elevated gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <div>
                    <span className="block text-xs uppercase tracking-machined text-muted mb-1">Order ID</span>
                    <span className="font-bold font-display">{order.orderNumber || order.id}</span>
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-hairline"></div>
                  <div>
                    <span className="block text-xs uppercase tracking-machined text-muted mb-1">Tanggal Transaksi</span>
                    <span className="font-bold text-sm">{formatDate(order.createdAt)}</span>
                  </div>
                </div>
                <div>
                  {getStatusBadge(order.status)}
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 md:p-6 flex flex-col gap-4">
                {order.items?.map((item: IOrderItem, idx: number) => {
                  const product = item.product;
                  return (
                    <div key={idx} className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-surface-elevated shrink-0 border border-hairline">
                        <img 
                          src={product.image || product.images?.[0] || product.imageUrls?.[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop'} 
                          alt={product.name} 
                          className="w-full h-full object-cover grayscale opacity-80"
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <Link to={`/product/${product.slug}`} className="font-bold text-sm uppercase tracking-machined hover:text-brand-blue-light transition-colors line-clamp-1">
                          {product.name || 'Produk'}
                        </Link>
                        <span className="text-xs text-muted">Qty: {item.quantity}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold font-display">Rp {item.price?.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 md:p-6 border-t border-hairline gap-4">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-machined text-muted mb-1">Total Belanja</span>
                  <span className="text-lg font-bold font-display text-brand-blue-light">
                    Rp {order.totalAmount?.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto" asChild>
                    {/* Assuming there will be a detail page or invoice download */}
                    <button className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Detail Transaksi
                    </button>
                  </Button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-hairline bg-surface-card/50">
          <div className="w-16 h-16 rounded-full bg-surface-elevated flex items-center justify-center mb-6">
            <Package className="w-8 h-8 text-muted" />
          </div>
          <h2 className="text-xl font-display font-bold uppercase tracking-machined mb-2">Belum Ada Pesanan</h2>
          <p className="text-body mb-8 max-w-sm font-light">
            Catatan transaksi Anda masih kosong. Silakan lakukan pemesanan terlebih dahulu.
          </p>
          <Button asChild>
            <Link to="/products">Mulai Belanja</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
