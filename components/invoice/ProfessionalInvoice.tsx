'use client';

import React from 'react';
import { Order } from '@/types';
import { numberToWordsINR } from '@/lib/utils/numberToWords';
import { ShieldCheck, CheckCircle2, Phone, Mail, Globe, MapPin, Printer } from 'lucide-react';

interface Props {
  order: Order;
  showPrintButton?: boolean;
}

export default function ProfessionalInvoice({ order, showPrintButton = false }: Props) {
  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formattedTime = new Date(order.createdAt).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const invoiceNo = `INV-${order.id.replace(/^AG-?/i, '')}`;
  const isTelangana = (order.customer.state || '').toLowerCase().includes('telangana');
  
  // Tax calculations (GST @ 18% inclusive)
  const totalAmount = order.totalAmount;
  const taxableAmount = Math.round(totalAmount / 1.18);
  const totalGst = totalAmount - taxableAmount;
  const halfGst = Math.round(totalGst / 2);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="w-full max-w-[850px] mx-auto bg-white text-stone-900 font-sans p-6 sm:p-10 border border-stone-200 sm:rounded-2xl shadow-sm print:border-none print:shadow-none print:p-0 print:max-w-none print:m-0">
      {/* On-screen Print Control Toolbar (Hidden in print) */}
      {showPrintButton && (
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-200 print:hidden">
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Tax Invoice / Retail Receipt • Ready for Print & PDF Export</span>
          </div>
          <button
            type="button"
            onClick={handlePrint}
            className="btn-luxury-primary btn-shimmer-sweep group px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-sm uppercase tracking-wider"
          >
            <Printer className="w-4 h-4 text-stone-950 group-hover:scale-110 transition-transform" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      )}

      {/* INVOICE DOCUMENT CONTAINER */}
      <div id="invoice-printable" className="space-y-6 text-stone-900 bg-white">
        {/* 1. Header & Brand Identification */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-stone-900 pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-stone-950 text-[#FEE815] font-black text-lg flex items-center justify-center border border-amber-400/40">
                A
              </div>
              <div>
                <h1 className="font-serif font-black text-2xl tracking-tight text-stone-950 uppercase leading-none">
                  Abhi&apos;s Gifts
                </h1>
                <p className="text-[10px] tracking-wider font-bold text-amber-800 uppercase mt-0.5">
                  Frame Your Memories • Sacred &amp; Acrylic Art
                </p>
              </div>
            </div>

            <div className="text-[11px] text-stone-600 space-y-0.5 mt-3 leading-relaxed">
              <p className="font-semibold text-stone-800">Abhi&apos;s Gifts Workshop &amp; Studio</p>
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-stone-500 shrink-0" />
                <span>16-11-740/5/A, Gaddiannaram, Dilsukhnagar, Hyderabad, Telangana - 500060</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-stone-500 shrink-0" />
                  +91 77802 69927
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-stone-500 shrink-0" />
                  support@abhisgifts.com
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-stone-500 shrink-0" />
                  www.abhisgifts.com
                </span>
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right w-full sm:w-auto">
            <span className="inline-block bg-stone-950 text-[#FEE815] font-mono text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-widest">
              Tax Invoice / Cash Memo
            </span>
            <p className="text-[10px] text-stone-500 mt-1 uppercase font-semibold">Original for Recipient</p>
            <div className="mt-2 text-xs space-y-0.5 font-mono">
              <p>
                <span className="text-stone-500 font-sans">Invoice No:</span>{' '}
                <strong className="text-stone-900 font-bold">{invoiceNo}</strong>
              </p>
              <p>
                <span className="text-stone-500 font-sans">Invoice Date:</span>{' '}
                <strong className="text-stone-900">{formattedDate}</strong>
              </p>
              <p>
                <span className="text-stone-500 font-sans">Order Ref:</span>{' '}
                <strong className="text-stone-900">{order.id}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* 2. Customer Billing & Order Metadata Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Customer / Consignee */}
          <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/50 space-y-1">
            <div className="flex items-center justify-between border-b border-stone-200 pb-1.5 mb-2">
              <span className="font-bold text-stone-900 uppercase tracking-wider text-[10.5px]">
                Billed &amp; Shipped To:
              </span>
              <span className="text-[10px] bg-stone-200/80 text-stone-700 px-1.5 py-0.5 rounded font-mono">
                Customer Consignee
              </span>
            </div>
            <p className="font-bold text-sm text-stone-950">{order.customer.fullName}</p>
            <p className="text-stone-700 leading-snug">{order.customer.streetAddress}</p>
            {order.customer.apartment && (
              <p className="text-stone-600">{order.customer.apartment}</p>
            )}
            {order.customer.landmark && (
              <p className="text-stone-600">Landmark: {order.customer.landmark}</p>
            )}
            <p className="font-semibold text-stone-900">
              {order.customer.city}, {order.customer.state} — {order.customer.pincode}
            </p>
            <div className="pt-2 text-[11px] text-stone-600 border-t border-stone-200 mt-2 space-y-0.5">
              <p>
                <strong className="text-stone-800">Phone / WhatsApp:</strong> {order.customer.mobile}
                {order.customer.secondaryMobile && (
                  <span className="text-stone-600"> • <strong className="text-stone-800">Alt:</strong> {order.customer.secondaryMobile}</span>
                )}
              </p>
              {order.customer.email && (
                <p>
                  <strong className="text-stone-800">Email:</strong> {order.customer.email}
                </p>
              )}
              <p>
                <strong className="text-stone-800">Place of Supply:</strong> {order.customer.state} (Code 36)
              </p>
            </div>
          </div>

          {/* Payment & Fulfilment Details */}
          <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/50 space-y-2">
            <div className="flex items-center justify-between border-b border-stone-200 pb-1.5 mb-2">
              <span className="font-bold text-stone-900 uppercase tracking-wider text-[10.5px]">
                Payment &amp; Logistics
              </span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {order.paymentStatus === 'Paid' ? 'PAID & VERIFIED' : order.paymentStatus.toUpperCase()}
              </span>
            </div>

            <div className="space-y-1.5 text-stone-700">
              <div className="flex justify-between">
                <span className="text-stone-500">Payment Gateway:</span>
                <span className="font-semibold text-stone-900">
                  {order.paymentMethod === 'Razorpay'
                    ? 'Razorpay 256-Bit SSL (UPI / Cards / NetBanking)'
                    : order.paymentMethod}
                </span>
              </div>

              {order.razorpayPaymentId && (
                <div className="flex justify-between">
                  <span className="text-stone-500">Transaction ID:</span>
                  <span className="font-mono text-stone-900 font-bold bg-white px-1.5 py-0.5 rounded border border-stone-200">
                    {order.razorpayPaymentId}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-stone-500">Order Timing:</span>
                <span className="font-mono text-stone-800">{formattedDate} at {formattedTime}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-stone-500">Shipping Mode:</span>
                <span className="font-semibold text-stone-900">Pan-India Express (Transit Insured)</span>
              </div>

              <div className="flex justify-between">
                <span className="text-stone-500">Packaging Type:</span>
                <span className="font-semibold text-stone-900">Protective 5-Layer Box + Bubble Cushion</span>
              </div>

              {order.trackingNumber && (
                <div className="flex justify-between border-t border-stone-200 pt-1.5">
                  <span className="text-stone-500">Tracking AWB:</span>
                  <span className="font-mono font-bold text-stone-900">
                    {order.trackingNumber} ({order.courierPartner || 'Logistics Partner'})
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Itemized Product Table */}
        <div className="border border-stone-300 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-900 text-white font-bold uppercase tracking-wider text-[10.5px]">
                <th className="py-2.5 px-3 w-10 text-center">#</th>
                <th className="py-2.5 px-3">Item Description &amp; Specifications</th>
                <th className="py-2.5 px-2.5 text-center">HSN</th>
                <th className="py-2.5 px-2.5 text-center">Qty</th>
                <th className="py-2.5 px-3 text-right">Unit Rate</th>
                <th className="py-2.5 px-3 text-right">Total (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-800">
              {order.items.map((item, index) => {
                const itemTotal = item.unitPrice * item.quantity;
                const hasModel = Boolean(item.selectedModel || item.customization?.selectedModel);
                const modelVal = item.selectedModel || item.customization?.selectedModel;
                return (
                  <tr key={item.id || index} className="hover:bg-stone-50/50">
                    <td className="py-3 px-3 text-center font-mono font-semibold text-stone-500">
                      {index + 1}
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-bold text-stone-950 text-xs sm:text-[13px]">{item.title}</p>
                      <div className="text-[11px] text-stone-600 mt-1 space-y-0.5">
                        <p>
                          <span className="font-semibold text-stone-800">Size:</span> {item.size}
                          {item.finish && (
                            <>
                              {' '}• <span className="font-semibold text-stone-800">Finish:</span> {item.finish}
                            </>
                          )}
                          {hasModel && (
                            <>
                              {' '}• <span className="font-semibold text-stone-800">Model:</span>{' '}
                              <span className="font-bold text-stone-900 bg-stone-100 px-1 py-0.2 rounded border border-stone-200">
                                {modelVal}
                              </span>
                            </>
                          )}
                        </p>
                        {item.customization?.orientation && (
                          <p>
                            <span className="font-semibold text-stone-800">Orientation:</span>{' '}
                            {item.customization.orientation.toUpperCase()}
                          </p>
                        )}
                        {item.customization?.customText && (
                          <p className="italic font-serif text-amber-900 bg-amber-50/80 p-1 rounded border border-amber-200/60 inline-block mt-0.5">
                            Inscription: &ldquo;{item.customization.customText}&rdquo;
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-2.5 text-center font-mono text-[11px] text-stone-600">
                      9701
                    </td>
                    <td className="py-3 px-2.5 text-center font-bold text-stone-900 font-mono">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-stone-800">
                      ₹{item.unitPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-stone-950">
                      ₹{itemTotal.toLocaleString('en-IN')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 4. Financial Summary & Amount in Words */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-1">
          {/* Amount in words & notes */}
          <div className="sm:col-span-7 space-y-3">
            <div className="border border-stone-200 rounded-xl p-3.5 bg-stone-50/60">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                Amount Chargeable (in words):
              </span>
              <p className="font-serif font-bold text-xs text-stone-900">
                {numberToWordsINR(order.totalAmount)}
              </p>
            </div>

            {/* Tax Breakdown */}
            <div className="border border-stone-200 rounded-xl p-3 text-[11px] text-stone-600 space-y-1 bg-stone-50/30">
              <span className="font-bold text-stone-800 block text-[10px] uppercase tracking-wider">
                Tax Analysis (GST 18% Inclusive in MRP):
              </span>
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-stone-200 font-mono text-[10.5px]">
                <div>
                  <span className="block text-stone-500 font-sans">Taxable Value:</span>
                  <strong>₹{taxableAmount.toLocaleString('en-IN')}</strong>
                </div>
                {isTelangana ? (
                  <>
                    <div>
                      <span className="block text-stone-500 font-sans">CGST (9%):</span>
                      <strong>₹{halfGst.toLocaleString('en-IN')}</strong>
                    </div>
                    <div>
                      <span className="block text-stone-500 font-sans">SGST (9%):</span>
                      <strong>₹{halfGst.toLocaleString('en-IN')}</strong>
                    </div>
                  </>
                ) : (
                  <div className="col-span-2">
                    <span className="block text-stone-500 font-sans">IGST (18% Inter-State):</span>
                    <strong>₹{totalGst.toLocaleString('en-IN')}</strong>
                  </div>
                )}
              </div>
            </div>

            {order.notes && (
              <div className="text-[11px] text-stone-600 bg-amber-50/50 border border-amber-200/80 p-2.5 rounded-xl">
                <strong className="text-amber-900">Customer Instructions:</strong> {order.notes}
              </div>
            )}
          </div>

          {/* Pricing Calculation Summary */}
          <div className="sm:col-span-5">
            <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/80 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Items Subtotal:</span>
                <span className="font-mono font-semibold text-stone-900">
                  ₹{order.subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount ({order.couponCode || 'Promo'}):</span>
                  <span className="font-mono font-bold">
                    -₹{order.discountAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span>Pan-India Transit Shipping:</span>
                <span className="font-semibold text-emerald-700 uppercase text-[11px]">
                  FREE (Active)
                </span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span>Multi-Layer Packaging:</span>
                <span className="font-semibold text-emerald-700 uppercase text-[11px]">
                  FREE
                </span>
              </div>

              <div className="border-t-2 border-stone-900 pt-2 flex justify-between items-center text-sm font-bold text-stone-950">
                <span className="uppercase tracking-wider font-serif">Total Amount:</span>
                <span className="font-mono text-base font-extrabold text-stone-950">
                  ₹{order.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="text-right text-[10px] text-stone-500 font-medium pt-1">
                (Inclusive of all applicable Indian taxes)
              </div>
            </div>
          </div>
        </div>

        {/* 5. Terms, Declarations & Authenticity Seal */}
        <div className="border-t-2 border-stone-900 pt-4 flex flex-col sm:flex-row justify-between items-end gap-6 text-[10.5px] text-stone-600">
          <div className="space-y-1 max-w-md">
            <span className="font-bold text-stone-800 uppercase tracking-wider block">
              Terms &amp; Conditions / Transit Assurance:
            </span>
            <ul className="list-disc pl-4 space-y-0.5 leading-snug">
              <li>Certified 100% Handcrafted Premium 5MM/3MM Cast Acrylic with Direct UV Print.</li>
              <li>Every shipment includes 100% Pan-India Transit Insurance against in-transit damage.</li>
              <li>For any damage claim or queries, WhatsApp us within 48 hours at +91 77802 69927.</li>
              <li>This is a digitally generated tax invoice and does not require physical signature.</li>
            </ul>
          </div>

          <div className="text-right shrink-0">
            <div className="border border-stone-300 rounded-xl p-3 bg-stone-50/50 text-center min-w-[190px]">
              <span className="text-[10px] text-stone-500 font-semibold block uppercase">For Abhi&apos;s Gifts</span>
              <div className="py-2">
                <span className="font-serif italic font-black text-sm text-stone-900 tracking-wide">
                  Abhis Gifts
                </span>
                <span className="block text-[9px] text-emerald-700 font-mono font-bold">
                  ✓ Digitally Verified
                </span>
              </div>
              <span className="text-[9.5px] font-bold text-stone-700 uppercase tracking-wider border-t border-stone-200 pt-1 block">
                Authorized Signatory
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
