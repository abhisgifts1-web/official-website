'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Download,
  X,
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
  }, []);

  const handleOpenDetail = (order: Order) => {
    setSelectedOrder(order);
    setUpdatingStatus(order.orderStatus);
    setCourierPartner(order.courierPartner || 'BlueDart Express');
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
              Orders & Fulfilment
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Review customer addresses, production stages, courier waybills, and payments.
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5 text-stone-600" />
            <span>Export Orders to CSV</span>
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by Order ID, Name, Mobile..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-700"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
            {['All', 'Confirmed', 'Framing & Production', 'Shipped', 'Delivered'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  statusFilter === st
                    ? 'bg-amber-800 text-white shadow-warm'
                    : 'bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 border-b border-stone-200 uppercase tracking-wider font-semibold">
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
              <tbody className="divide-y divide-stone-100">
                {filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                      {order.id}
                      <span className="block text-[10px] text-stone-400 font-sans font-normal">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-stone-900">{order.customer.fullName}</p>
                      <p className="text-[11px] text-stone-500">{order.customer.mobile} • {order.customer.city}</p>
                    </td>
                    <td className="py-3.5 px-4 text-stone-700 font-medium">
                      {order.items.length} {order.items.length > 1 ? 'items' : 'item'}
                    </td>
                    <td className="py-3.5 px-4 font-serif font-bold text-stone-900">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          order.paymentStatus === 'Paid'
                            ? 'bg-[#FCE7EA] text-[#651E2D]'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {order.paymentMethod} • {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-stone-100 text-stone-800 px-2.5 py-1 rounded-full text-[10px] font-semibold">
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenDetail(order)}
                        className="bg-stone-900 hover:bg-amber-800 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Details & Status Updater Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <span className="font-mono font-bold text-lg text-stone-900">{selectedOrder.id}</span>
                  <p className="text-xs text-stone-400">Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}</p>
                </div>
                <button type="button" onClick={() => setSelectedOrder(null)} className="p-1 text-stone-400 hover:text-stone-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Update Form */}
              <form onSubmit={handleUpdateStatus} className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-3 text-xs">
                <h4 className="font-bold text-amber-950 uppercase tracking-wider">Update Fulfilment Status</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-stone-700 font-semibold block mb-1">Status</label>
                    <select
                      value={updatingStatus}
                      onChange={(e) => setUpdatingStatus(e.target.value as OrderStatus)}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl outline-none font-bold text-stone-800"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Framing & Production">Framing & Production</option>
                      <option value="Quality Checked">Quality Checked</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-stone-700 font-semibold block mb-1">Courier Partner</label>
                    <input
                      type="text"
                      placeholder="e.g. BlueDart / DTDC"
                      value={courierPartner}
                      onChange={(e) => setCourierPartner(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-stone-700 font-semibold block mb-1">Tracking Number (AWB)</label>
                    <input
                      type="text"
                      placeholder="e.g. DTDC-9988112"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={savingStatus}
                    className="bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs px-5 py-2 rounded-xl transition-colors"
                  >
                    {savingStatus ? 'Saving...' : 'Update Order Status'}
                  </button>
                </div>
              </form>

              {/* Customer Address Details */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-900 block mb-1">Shipping Details</span>
                  <p className="font-semibold text-stone-800">{selectedOrder.customer.fullName}</p>
                  <p className="text-stone-600">{selectedOrder.customer.streetAddress}</p>
                  <p className="text-stone-600">
                    {selectedOrder.customer.city}, {selectedOrder.customer.state} - {selectedOrder.customer.pincode}
                  </p>
                  <p className="text-stone-700 font-mono mt-1">Phone: {selectedOrder.customer.mobile}</p>
                </div>

                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1">
                  <span className="font-bold text-stone-900 block mb-1">Payment Summary</span>
                  <p>Method: <strong>{selectedOrder.paymentMethod}</strong></p>
                  <p>Status: <strong>{selectedOrder.paymentStatus}</strong></p>
                  <p className="font-serif font-bold text-sm text-stone-900 pt-1">
                    Total: ₹{selectedOrder.totalAmount.toLocaleString('en-IN')}
                  </p>
                  {selectedOrder.notes && (
                    <p className="text-[11px] text-amber-900 italic pt-1">Notes: &ldquo;{selectedOrder.notes}&rdquo;</p>
                  )}
                </div>
              </div>

              {/* Ordered items */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-stone-900 block">Artworks ({selectedOrder.items.length})</span>
                <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden">
                  {selectedOrder.items.map((it) => (
                    <div key={it.id} className="p-3 flex items-center gap-3">
                      <img src={it.customization?.previewUrl || it.image} alt="" className="w-12 h-12 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-stone-900 truncate">{it.title}</p>
                        <p className="text-stone-500">{it.size} • Qty: {it.quantity}</p>
                        {it.customization?.customText && (
                          <p className="text-amber-900 italic font-serif">Inscription: &ldquo;{it.customization.customText}&rdquo;</p>
                        )}
                      </div>
                      <span className="font-bold text-stone-900">
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
