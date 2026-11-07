'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Download,
  X,
  MessageCircle,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Order, OrderStatus } from '@/types';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Status update states
  const [updatingStatus, setUpdatingStatus] = useState<OrderStatus>('Confirmed');
  const [courierPartner, setCourierPartner] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [savingStatus, setSavingStatus] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.orders);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchOrders();
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const searchParam = params.get('search');
      if (searchParam) setSearch(searchParam);
    }
  }, []);

  const handleOpenDetail = (order: Order) => {
    setSelectedOrder(order);
    setUpdatingStatus(order.orderStatus);
    setCourierPartner(order.courierPartner || 'Direct Workshop Dispatch');
    setTrackingNumber(order.trackingNumber || '');
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    setSavingStatus(true);

    try {
      const res = await fetch(`/api/orders/${selectedOrder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderStatus: updatingStatus,
          courierPartner,
          trackingNumber,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSelectedOrder(data.order);
        fetchOrders();
      }
    } catch {
      // ignore
    } finally {
      setSavingStatus(false);
    }
  };

  const handleExportCSV = () => {
    if (orders.length === 0) return;

    const headers = ['Order ID', 'Customer Name', 'Phone', 'City', 'Total Amount', 'Payment', 'Status', 'Date'];
    const rows = orders.map((o) => [
      o.id,
      `"${o.customer.fullName}"`,
      o.customer.mobile,
      `"${o.customer.city}"`,
      o.totalAmount,
      `${o.paymentMethod}-${o.paymentStatus}`,
      o.orderStatus,
      new Date(o.createdAt).toLocaleDateString('en-IN'),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `abhi_gifts_orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = orders.filter((o) => {
    const matchesSearch =
      !search ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.mobile.includes(search);
    const matchesStatus = statusFilter === 'All' || o.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] border border-[#2D2D2D] p-5 sm:p-6 rounded-3xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EAB308]/15 border border-[#EAB308]/40 text-[#FACC15] font-bold text-[10px] tracking-wider uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#EAB308]" />
                Fulfillment Operations
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Customer Orders &amp; Fulfillment
            </h1>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              Review customer delivery addresses, production stages, proof approvals, and update tracking details.
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="bg-[#1E1E1E] hover:bg-[#262626] text-white border border-[#333333] font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#EAB308]" />
            <span>Export Orders to CSV</span>
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-[#141414] p-4 rounded-2xl border border-[#2D2D2D] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by Order ID, Name, Mobile..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none focus:border-[#EAB308] text-white"
            />
            <Search className="w-3.5 h-3.5 text-[#A1A1AA] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
            {['All', 'Confirmed', 'Framing & Production', 'Shipped', 'Delivered'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#EAB308] text-black font-extrabold shadow-sm'
                    : 'bg-[#1A1A1A] border border-[#2D2D2D] text-[#D1D5DB] hover:bg-[#242424]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-[#141414] rounded-3xl border border-[#2D2D2D] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#D1D5DB]">
              <thead className="bg-[#1C1C1E] text-[#A1A1AA] border-b border-[#2D2D2D] uppercase tracking-wider font-semibold text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Order ID</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Items</th>
                  <th className="py-3.5 px-4">Total Amount</th>
                  <th className="py-3.5 px-4">Payment Method</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262626]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-[#A1A1AA] text-xs">
                      No customer orders match your search criteria.
                    </td>
                  </tr>
                ) : (
                  filtered.map((order) => {
                    const waText = encodeURIComponent(
                      `Hi ${order.customer.fullName}! This is Abhi's Gifts regarding your Order #${order.id}. Current status: ${order.orderStatus}.`
                    );
                    const cleanPhone = order.customer.mobile.replace(/[^0-9]/g, '');
                    const waLink = `https://wa.me/91${cleanPhone.slice(-10)}?text=${waText}`;

                    return (
                      <tr key={order.id} className="hover:bg-[#1A1A1A] transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-white">
                          #{order.id}
                          <span className="block text-[10px] text-[#A1A1AA] font-sans font-normal">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-white">{order.customer.fullName}</p>
                          <p className="text-[11px] text-[#A1A1AA] font-mono">
                            {order.customer.mobile} • {order.customer.city}
                          </p>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-white">
                          {order.items.length} {order.items.length > 1 ? 'items' : 'item'}
                          <span className="text-[11px] text-[#A1A1AA] block truncate max-w-[180px]">
                            {order.items[0]?.title}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-serif font-bold text-white text-sm">
                          ₹{order.totalAmount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              order.paymentStatus === 'Paid'
                                ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
                                : 'bg-[#EAB308]/15 border border-[#EAB308]/40 text-[#FACC15]'
                            }`}
                          >
                            {order.paymentMethod} • {order.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="bg-[#242424] border border-[#333333] text-stone-200 px-2.5 py-1 rounded-full text-[10px] font-semibold">
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-500/40 text-emerald-200 text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                              title="Chat with Customer on WhatsApp"
                            >
                              <MessageCircle className="w-3 h-3 text-emerald-300" />
                              <span className="hidden sm:inline">WhatsApp</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => handleOpenDetail(order)}
                              className="bg-[#EAB308] hover:bg-[#FACC15] text-black px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                            >
                              Manage
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Details & Status Updater Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-[#141414] border border-[#2D2D2D] text-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 space-y-6">
              <div className="flex items-center justify-between border-b border-[#2D2D2D] pb-4">
                <div>
                  <span className="font-mono font-bold text-lg text-white">Order #{selectedOrder.id}</span>
                  <p className="text-xs text-[#A1A1AA]">Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="p-1 text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Update Form */}
              <form onSubmit={handleUpdateStatus} className="bg-[#1A1A1A] p-4 rounded-2xl border border-[#2D2D2D] space-y-3 text-xs">
                <h4 className="font-bold text-[#FACC15] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#EAB308]" />
                  Update Fulfillment &amp; Transit Status
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[#D1D5DB] font-semibold block mb-1">Production Stage</label>
                    <select
                      value={updatingStatus}
                      onChange={(e) => setUpdatingStatus(e.target.value as OrderStatus)}
                      className="w-full px-3 py-2 bg-[#242424] border border-[#333333] rounded-xl outline-none font-bold text-white text-xs"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Framing & Production">Framing &amp; Production</option>
                      <option value="Quality Checked">Quality Checked</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[#D1D5DB] font-semibold block mb-1">Dispatch / Logistics</label>
                    <input
                      type="text"
                      placeholder="e.g. Workshop Logistics / BlueDart"
                      value={courierPartner}
                      onChange={(e) => setCourierPartner(e.target.value)}
                      className="w-full px-3 py-2 bg-[#242424] border border-[#333333] rounded-xl outline-none text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[#D1D5DB] font-semibold block mb-1">Tracking Number (AWB)</label>
                    <input
                      type="text"
                      placeholder="e.g. AGY-HYD-998811"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-[#242424] border border-[#333333] rounded-xl outline-none font-mono text-white text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={savingStatus}
                    className="bg-[#EAB308] hover:bg-[#FACC15] text-black font-extrabold text-xs px-5 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    {savingStatus ? 'Saving...' : 'Update Order Status'}
                  </button>
                </div>
              </form>

              {/* Customer Delivery Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2D2D2D] space-y-1">
                  <span className="font-bold text-white block mb-1">Delivery Destination</span>
                  <p className="font-semibold text-white">{selectedOrder.customer.fullName}</p>
                  <p className="text-[#D1D5DB]">{selectedOrder.customer.streetAddress}</p>
                  {selectedOrder.customer.apartment && (
                    <p className="text-[#A1A1AA]">{selectedOrder.customer.apartment}</p>
                  )}
                  <p className="text-[#D1D5DB]">
                    {selectedOrder.customer.city}, {selectedOrder.customer.state} - {selectedOrder.customer.pincode}
                  </p>
                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#2D2D2D]">
                    <span className="text-[#A1A1AA] font-mono text-[11px]">Phone: {selectedOrder.customer.mobile}</span>
                    <a
                      href={`https://wa.me/91${selectedOrder.customer.mobile.replace(/[^0-9]/g, '').slice(-10)}?text=${encodeURIComponent(
                        `Hi ${selectedOrder.customer.fullName}, update regarding your Abhi's Gifts order #${selectedOrder.id}: Status is ${selectedOrder.orderStatus}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold transition-colors ml-auto"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2D2D2D] space-y-1.5">
                  <span className="font-bold text-white block mb-1">Order &amp; Payment Summary</span>
                  <p className="text-[#D1D5DB]">Payment Method: <strong className="text-white">{selectedOrder.paymentMethod}</strong></p>
                  <p className="text-[#D1D5DB]">Payment Status: <strong className="text-emerald-400">{selectedOrder.paymentStatus}</strong></p>
                  <p className="text-[#D1D5DB]">Store Delivery: <strong className="text-white">₹0 (Zero Charges Active)</strong></p>
                  <p className="font-serif font-bold text-base text-[#FACC15] pt-1">
                    Total: ₹{selectedOrder.totalAmount.toLocaleString('en-IN')}
                  </p>
                  {selectedOrder.notes && (
                    <p className="text-[11px] text-[#EAB308] italic pt-1">Notes: &ldquo;{selectedOrder.notes}&rdquo;</p>
                  )}
                </div>
              </div>

              {/* Ordered items */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-white block">Artworks Ordered ({selectedOrder.items.length})</span>
                <div className="divide-y divide-[#262626] border border-[#2D2D2D] rounded-2xl overflow-hidden bg-[#1A1A1A]">
                  {selectedOrder.items.map((it) => (
                    <div key={it.id} className="p-3 flex items-center gap-3">
                      <img src={it.customization?.previewUrl || it.image} alt="" className="w-12 h-12 object-cover rounded-lg border border-[#333333]" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white truncate">{it.title}</p>
                        <p className="text-[#A1A1AA]">{it.size} • Qty: {it.quantity}</p>
                        {it.customization?.customText && (
                          <p className="text-[#FACC15] italic font-serif">Inscription: &ldquo;{it.customization.customText}&rdquo;</p>
                        )}
                      </div>
                      <span className="font-bold font-serif text-white">
                        ₹{(it.unitPrice * it.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
