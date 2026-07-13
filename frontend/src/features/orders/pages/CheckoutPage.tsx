import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreditCard, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { Container, Section, Breadcrumb } from '@/components/layout';
import { Button, Input, Skeleton } from '@/components/ui';
import { useCart } from '@/features/cart/hooks/useCart';
import { useCheckout } from '@/features/orders/hooks/useOrders';
import { cn } from '@/lib/utils';

const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
  phone: z.string().min(9, 'Nomor telepon tidak valid'),
  address: z.string().min(10, 'Alamat terlalu pendek (minimal 10 karakter)'),
  city: z.string().min(3, 'Kota harus diisi'),
  postalCode: z.string().min(5, 'Kode pos tidak valid'),
  paymentMethod: z.string().min(1, 'Silakan pilih metode pembayaran'),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutPage() {
  const navigate = useNavigate();
  const { data: cartData, isLoading: cartLoading } = useCart();
  const { mutate: doCheckout, isPending: checkoutPending } = useCheckout();

  const cartItems = cartData?.data || [];
  
  // Calculate Totals
  const subtotal = cartItems.reduce((acc: number, item: any) => {
    const price = item.product?.price || 0;
    return acc + (price * item.quantity);
  }, 0);
  const shipping = cartItems.length > 0 ? 25000 : 0;
  const total = subtotal + shipping;

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: '',
    }
  });

  const selectedPaymentMethod = watch('paymentMethod');

  const onSubmit = (data: CheckoutFormValues) => {
    doCheckout(
      { ...data, items: cartItems, totalAmount: total },
      {
        onSuccess: () => {
          // Navigate to Orders/Success page after successful checkout
          navigate('/profile/orders');
        }
      }
    );
  };

  // Redirect if cart is empty and not loading
  React.useEffect(() => {
    if (!cartLoading && cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems.length, cartLoading, navigate]);

  if (cartLoading) {
    return (
      <Container className="py-24">
        <Skeleton className="w-full h-[60vh]" />
      </Container>
    );
  }

  return (
    <div className="flex flex-col w-full bg-canvas min-h-screen">
      <Section className="py-8 border-b border-hairline">
        <Container>
          <Breadcrumb 
            items={[
              { label: 'Cart', href: '/cart' },
              { label: 'Checkout' }
            ]} 
          />
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            
            {/* Left: Checkout Form */}
            <div className="flex-1 w-full">
              <h1 className="text-3xl font-display font-bold uppercase tracking-machined mb-8">Informasi Pengiriman</h1>
              
              <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Shipping Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    label="Nama Lengkap" 
                    placeholder="Contoh: Budi Santoso"
                    error={errors.fullName?.message}
                    {...register('fullName')} 
                  />
                  <Input 
                    label="Nomor Telepon" 
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    error={errors.phone?.message}
                    {...register('phone')} 
                  />
                  <div className="md:col-span-2">
                    <div className="w-full flex flex-col gap-1.5">
                      <label className="text-sm font-bold tracking-machined uppercase text-ink">Alamat Lengkap</label>
                      <textarea
                        {...register('address')}
                        className={cn(
                          'flex w-full rounded-none border border-hairline bg-surface-card px-4 py-3 text-sm text-ink transition-colors placeholder:text-muted focus-visible:outline-none focus-visible:border-ink resize-none min-h-[100px]',
                          errors.address && 'border-brand-red focus-visible:border-brand-red'
                        )}
                        placeholder="Nama jalan, gedung, no. rumah, dll."
                      />
                      {errors.address && <span className="text-xs text-brand-red">{errors.address.message}</span>}
                    </div>
                  </div>
                  <Input 
                    label="Kota/Kabupaten" 
                    placeholder="Contoh: Jakarta Selatan"
                    error={errors.city?.message}
                    {...register('city')} 
                  />
                  <Input 
                    label="Kode Pos" 
                    placeholder="Contoh: 12345"
                    error={errors.postalCode?.message}
                    {...register('postalCode')} 
                  />
                </div>

                <div className="pt-8 border-t border-hairline">
                  <h2 className="text-3xl font-display font-bold uppercase tracking-machined mb-8">Metode Pembayaran</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Bank Transfer */}
                    <button
                      type="button"
                      onClick={() => setValue('paymentMethod', 'bank_transfer', { shouldValidate: true })}
                      className={cn(
                        "flex flex-col items-center justify-center p-6 border transition-all",
                        selectedPaymentMethod === 'bank_transfer' 
                          ? "border-ink bg-surface-elevated" 
                          : "border-hairline bg-surface-card hover:border-muted"
                      )}
                    >
                      <CreditCard className="w-8 h-8 mb-4 text-ink" />
                      <span className="text-sm font-bold uppercase tracking-machined">Bank Transfer</span>
                    </button>

                    {/* Virtual Account */}
                    <button
                      type="button"
                      onClick={() => setValue('paymentMethod', 'virtual_account', { shouldValidate: true })}
                      className={cn(
                        "flex flex-col items-center justify-center p-6 border transition-all",
                        selectedPaymentMethod === 'virtual_account' 
                          ? "border-ink bg-surface-elevated" 
                          : "border-hairline bg-surface-card hover:border-muted"
                      )}
                    >
                      <ShieldCheck className="w-8 h-8 mb-4 text-ink" />
                      <span className="text-sm font-bold uppercase tracking-machined">Virtual Account</span>
                    </button>

                    {/* E-Wallet */}
                    <button
                      type="button"
                      onClick={() => setValue('paymentMethod', 'ewallet', { shouldValidate: true })}
                      className={cn(
                        "flex flex-col items-center justify-center p-6 border transition-all",
                        selectedPaymentMethod === 'ewallet' 
                          ? "border-ink bg-surface-elevated" 
                          : "border-hairline bg-surface-card hover:border-muted"
                      )}
                    >
                      <Truck className="w-8 h-8 mb-4 text-ink" />
                      <span className="text-sm font-bold uppercase tracking-machined">E-Wallet</span>
                    </button>
                  </div>
                  {errors.paymentMethod && <span className="text-xs text-brand-red mt-2 block">{errors.paymentMethod.message}</span>}
                </div>
              </form>
            </div>

            {/* Right: Order Summary */}
            <div className="w-full lg:w-96 shrink-0 bg-surface-card border border-hairline p-6 sticky top-24">
              <h2 className="text-xl font-display font-bold uppercase tracking-machined mb-6 border-b border-hairline pb-4">
                Ringkasan Pesanan
              </h2>
              
              {/* Items */}
              <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-hairline max-h-64 overflow-y-auto">
                {cartItems.map((item: any) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 aspect-[3/4] bg-surface-elevated shrink-0">
                      <img src={item.product?.image || item.product?.images?.[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-sm font-bold uppercase line-clamp-1">{item.product?.name}</span>
                      <span className="text-xs text-muted mb-auto">Qty: {item.quantity}</span>
                      <span className="text-sm font-display font-bold">Rp {item.product?.price?.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="flex flex-col space-y-4 text-sm mb-6 border-b border-hairline pb-6">
                <div className="flex justify-between">
                  <span className="text-body">Subtotal</span>
                  <span className="font-bold">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body">Pengiriman</span>
                  <span className="font-bold">Rp {shipping.toLocaleString('id-ID')}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mb-8">
                <span className="font-bold uppercase tracking-machined">Total Bayar</span>
                <span className="text-2xl font-display font-bold text-brand-blue-light">
                  Rp {total.toLocaleString('id-ID')}
                </span>
              </div>
              
              {/* Trigger form submission from outside the form tag */}
              <Button 
                type="submit"
                form="checkout-form"
                className="w-full" 
                size="lg" 
                loading={checkoutPending}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Bayar Sekarang
              </Button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted">
                <ShieldCheck className="w-4 h-4" />
                <span>Transaksi Aman & Terenkripsi</span>
              </div>
            </div>

          </div>
        </Container>
      </Section>
    </div>
  );
}
