'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  UserPlus,
  Trash2,
  Camera,
  CheckCircle2,
  Lock,
  Sparkles,
  Mail,
  User,
  AlertCircle,
  KeyRound,
  X,
  UploadCloud,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { AdminUser } from '@/types';
import { compressImageToDataUrl } from '@/lib/utils/imageCompress';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'manager';
  avatar?: string;
  createdAt?: string;
}

export default function AdminTeamPage() {
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoSuccessMsg, setPhotoSuccessMsg] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Form states for adding member
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'manager'>('admin');
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load current session admin and team members list
  const loadData = async () => {
    setLoading(true);
    try {
      const [meRes, teamRes] = await Promise.all([
        fetch('/api/admin/me'),
        fetch('/api/admin/team'),
      ]);

      if (meRes.ok) {
        const meData = await meRes.json();
        if (meData.success) setCurrentAdmin(meData.user);
      }

      if (teamRes.ok) {
        const teamData = await teamRes.json();
        if (teamData.success) setMembers(teamData.members || []);
      }
    } catch (err) {
      console.error('Failed to load team data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle uploading current member's personal profile photo
  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    setPhotoSuccessMsg('');

    try {
      // Compress to optimal 400x400 avatar JPEG
      const compressedDataUrl = await compressImageToDataUrl(file, 400, 400, 0.88);

      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar: compressedDataUrl }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCurrentAdmin((prev) => (prev ? { ...prev, avatar: compressedDataUrl } : null));
        setMembers((prev) =>
          prev.map((m) =>
            m.email.toLowerCase() === currentAdmin?.email.toLowerCase()
              ? { ...m, avatar: compressedDataUrl }
              : m
          )
        );
        setPhotoSuccessMsg('Your profile photo has been updated successfully!');
        setTimeout(() => setPhotoSuccessMsg(''), 4000);
      } else {
        alert(data.error || 'Failed to update profile photo.');
      }
    } catch (err: any) {
      alert(err.message || 'Error uploading profile photo.');
    } finally {
      setUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Add new staff member (without avatar — new member must upload their own photo)
  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError('');

    try {
      const res = await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName.trim(),
          email: newEmail.trim(),
          password: newPassword,
          role: newRole,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAddModalOpen(false);
        setNewName('');
        setNewEmail('');
        setNewPassword('');
        setNewRole('admin');
        loadData();
      } else {
        setAddError(data.error || 'Failed to add team member.');
      }
    } catch (err: any) {
      setAddError(err.message || 'Error adding team member.');
    } finally {
      setAddLoading(false);
    }
  };

  // Delete team member (superadmin only)
  const handleDeleteMember = async (memberId: string, memberName: string) => {
    if (!confirm(`Are you sure you want to remove ${memberName} from the staff team?`)) return;

    try {
      const res = await fetch(`/api/admin/team?id=${memberId}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setMembers((prev) => prev.filter((m) => m.id !== memberId));
      } else {
        alert(data.error || 'Failed to delete member.');
      }
    } catch (err: any) {
      alert(err.message || 'Error deleting member.');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto text-stone-900">
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 p-5 sm:p-6 rounded-3xl shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-2xs">
                <ShieldCheck className="w-3 h-3 text-amber-700" />
                Staff Access &amp; Permissions
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
              Team Members &amp; Profile Access
            </h1>
            <p className="text-xs text-stone-600 font-medium mt-0.5">
              Individual photo privacy is enforced: every staff member uploads their own profile photo. No single administrator can alter other members&apos; photos.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {currentAdmin?.role === 'superadmin' && (
              <button
                type="button"
                onClick={() => setAddModalOpen(true)}
                className="bg-[#EAB308] hover:bg-[#FACC15] text-black font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Team Member</span>
              </button>
            )}
          </div>
        </div>

        {/* Strict Privacy Enforcement Banner */}
        <div className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border border-emerald-300 p-4 sm:p-5 rounded-2xl flex items-start sm:items-center gap-3.5 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
              Individual Profile Photo Ownership Rule Active
            </h4>
            <p className="text-stone-600 font-medium leading-relaxed mt-0.5">
              To guarantee member autonomy, profile photo uploads are locked strictly to the authenticated user. Even Superadmins cannot change or override another staff member&apos;s photo.
            </p>
          </div>
        </div>

        {/* Section 1: Current User Personal Profile Card (Self-Service) */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                Personal Profile Self-Service
              </span>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900 mt-1">
                My Profile Photo &amp; Account
              </h2>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 capitalize">
              Role: {currentAdmin?.role || 'Admin'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar with Camera Trigger */}
            <div className="relative group/avatar shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#EAB308] bg-stone-900 flex items-center justify-center overflow-hidden shadow-md">
                {currentAdmin?.avatar ? (
                  <img
                    src={currentAdmin.avatar}
                    alt={currentAdmin.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-serif font-extrabold text-3xl sm:text-4xl text-[#FACC15]">
                    {currentAdmin?.name?.charAt(0).toUpperCase() || 'A'}
                  </span>
                )}
              </div>

              {/* Upload Overlay Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingPhoto}
                className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover/avatar:opacity-100 flex flex-col items-center justify-center text-white transition-opacity cursor-pointer text-[10px] font-bold gap-1"
                title="Upload Profile Photo"
              >
                <Camera className="w-5 h-5 text-[#FACC15]" />
                <span>{uploadingPhoto ? 'Uploading...' : 'Change Photo'}</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handlePhotoSelect}
              />
            </div>

            {/* Info & Action Controls */}
            <div className="space-y-3 text-center sm:text-left flex-1 min-w-0">
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900 truncate">
                  {currentAdmin?.name || 'Administrator'}
                </h3>
                <p className="text-xs text-stone-600 font-medium truncate flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>{currentAdmin?.email || 'admin@abhigifts.com'}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingPhoto}
                  className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-amber-400" />
                  <span>{uploadingPhoto ? 'Compressing & Saving...' : 'Upload My Profile Photo'}</span>
                </button>

                <span className="text-[11px] text-stone-500 font-medium">
                  PNG, JPEG, WebP • Auto-sized to 400x400
                </span>
              </div>

              {photoSuccessMsg && (
                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-xl font-bold animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{photoSuccessMsg}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Team Members Directory */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900">
                Staff &amp; Artisans Directory ({members.length})
              </h2>
              <p className="text-xs text-stone-600 font-medium mt-0.5">
                Every team member maintains their individual photo. Photos are not editable across accounts.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-stone-500 space-y-2">
              <div className="w-6 h-6 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p>Loading team directory...</p>
            </div>
          ) : members.length === 0 ? (
            <div className="py-12 text-center text-xs text-stone-500">
              No staff members registered.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((member) => {
                const isCurrentUser =
                  member.email.toLowerCase() === currentAdmin?.email.toLowerCase();

                return (
                  <div
                    key={member.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCurrentUser
                        ? 'border-[#EAB308] bg-amber-50/30 shadow-xs'
                        : 'border-stone-200 bg-stone-50 hover:bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full border border-stone-300 bg-stone-900 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                        {member.avatar ? (
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="font-serif font-bold text-base text-[#FACC15]">
                            {member.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>

                      {/* Member Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-stone-900 text-xs sm:text-sm truncate">
                            {member.name}
                          </p>
                          {isCurrentUser && (
                            <span className="text-[9px] font-bold bg-[#EAB308] text-black px-1.5 py-0.2 rounded-full">
                              You
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-600 truncate font-mono">
                          {member.email}
                        </p>
                        <div className="flex items-center gap-1.5 pt-1">
                          <span
                            className={`text-[9.5px] font-bold px-2 py-0.2 rounded-full capitalize ${
                              member.role === 'superadmin'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : member.role === 'admin'
                                ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            }`}
                          >
                            {member.role}
                          </span>
                          <span className="text-[9.5px] text-stone-500 font-medium">
                            {member.avatar ? '✓ Photo set by member' : 'Default Initial'}
                          </span>
                        </div>
                      </div>

                      {/* Superadmin Delete Button (cannot delete self) */}
                      {currentAdmin?.role === 'superadmin' && !isCurrentUser && (
                        <button
                          type="button"
                          onClick={() => handleDeleteMember(member.id, member.name)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                          title={`Remove ${member.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Add Team Member Modal */}
        {addModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-amber-700" />
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Add Team Member
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-900 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-[11px] text-stone-600 bg-amber-50 border border-amber-200 rounded-xl p-3 leading-relaxed">
                <strong className="text-amber-900 block font-bold mb-0.5">Privacy Notice:</strong>
                Profile photos cannot be set by an admin. The new member will log in with their credentials and upload their own profile photo from their personal session.
              </div>

              {addError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{addError}</span>
                </div>
              )}

              <form onSubmit={handleAddMember} className="space-y-3.5 text-xs text-stone-900">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-600 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="rahul@abhigifts.com"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-600 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Initial Password</label>
                  <div className="relative">
                    <KeyRound className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      placeholder="Minimum 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-600 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Staff Role</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-600 font-medium"
                  >
                    <option value="admin">Admin (Full Store &amp; Order Operations)</option>
                    <option value="manager">Store Manager (Catalog &amp; Packaging)</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setAddModalOpen(false)}
                    className="px-4 py-2 text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl font-semibold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={addLoading}
                    className="px-5 py-2 text-black bg-[#EAB308] hover:bg-[#FACC15] font-extrabold rounded-xl transition-all cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    {addLoading ? 'Adding Member...' : 'Create Staff Member'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
