"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, X, Clock, Mail, Phone, User, MessageCircle, ChevronDown } from "lucide-react";
import { timeAgo } from "@/lib/utils";

export default function AdminPage() {
  const [claimRequests, setClaimRequests] = useState([]);
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all"); // all, pending, verified, rejected
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem("findit_admin_auth");
    if (auth) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const claims = JSON.parse(localStorage.getItem("findit_claim_requests") || "[]");
    const allItems = JSON.parse(localStorage.getItem("findit_items") || "[]");
    setClaimRequests(claims);
    setItems(allItems);
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password check (in production, use proper authentication)
    if (adminPassword === "findit123") {
      setIsAuthenticated(true);
      localStorage.setItem("findit_admin_auth", "true");
      setAdminPassword("");
    } else {
      alert("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("findit_admin_auth");
  };

  const handleVerifyClaim = (claimId) => {
    const updatedClaims = claimRequests.map((claim) =>
      claim.id === claimId ? { ...claim, status: "verified" } : claim
    );
    setClaimRequests(updatedClaims);
    localStorage.setItem("findit_claim_requests", JSON.stringify(updatedClaims));
    setSelectedClaim(null);
  };

  const handleRejectClaim = (claimId) => {
    const updatedClaims = claimRequests.map((claim) =>
      claim.id === claimId ? { ...claim, status: "rejected" } : claim
    );
    setClaimRequests(updatedClaims);
    localStorage.setItem("findit_claim_requests", JSON.stringify(updatedClaims));
    setSelectedClaim(null);
  };

  const getItemName = (itemId) => {
    return items.find((item) => item.id === itemId)?.itemName || "Unknown Item";
  };

  const filteredClaims = claimRequests.filter(
    (claim) => filter === "all" || claim.status === filter
  );

  if (!isAuthenticated) {
    return (
      <>
        <Navbar activePage="" />
        <main className="min-h-screen bg-[var(--color-background)] pt-[68px] flex items-center justify-center px-4">
          <div className="w-full max-w-sm bg-[var(--color-background-card)] border border-[var(--color-border)] rounded-2xl p-8">
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-foreground)] mb-2">
              Lost & Found Admin
            </h1>
            <p className="text-[var(--color-foreground-muted)] text-sm mb-6">
              Verify and manage item claims
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[var(--color-foreground)] mb-2 block">
                  Admin Password
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-foreground-dim)] focus:border-[var(--color-ash)] focus:outline-none"
                />
                <p className="text-xs text-[var(--color-foreground-dim)] mt-2">
                  Demo password: <code className="bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded">findit123</code>
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-[rgba(190,184,182,0.12)] border border-[var(--color-ash)] text-[var(--color-foreground)] font-medium transition-colors hover:bg-[rgba(190,184,182,0.18)]"
              >
                Login
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar activePage="" />
      <main className="min-h-screen bg-[var(--color-background)] pt-[68px]">
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold grad-text-warm mb-2">
                Claim Verification Dashboard
              </h1>
              <p className="text-[var(--color-foreground-muted)]">
                Review and verify item claims from students
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-[rgba(239,68,68,0.15)] text-[#EF4444] border border-[rgba(239,68,68,0.3)] hover:bg-[rgba(239,68,68,0.25)] font-medium transition-colors text-sm"
            >
              Logout
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-[var(--color-background-card)] border border-[var(--color-border)]">
              <p className="text-xs text-[var(--color-foreground-dim)] mb-1">Total Claims</p>
              <p className="text-2xl font-bold text-[var(--color-foreground)]">{claimRequests.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--color-background-card)] border border-[var(--color-border)]">
              <p className="text-xs text-[var(--color-foreground-dim)] mb-1">Pending</p>
              <p className="text-2xl font-bold text-[#F59E0B]">
                {claimRequests.filter((c) => c.status === "pending").length}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--color-background-card)] border border-[var(--color-border)]">
              <p className="text-xs text-[var(--color-foreground-dim)] mb-1">Verified</p>
              <p className="text-2xl font-bold text-[#22c55e]">
                {claimRequests.filter((c) => c.status === "verified").length}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--color-background-card)] border border-[var(--color-border)]">
              <p className="text-xs text-[var(--color-foreground-dim)] mb-1">Rejected</p>
              <p className="text-2xl font-bold text-[#EF4444]">
                {claimRequests.filter((c) => c.status === "rejected").length}
              </p>
            </div>
          </div>

          {/* Filter */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
            {["all", "pending", "verified", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                  filter === status
                    ? "bg-[rgba(190,184,182,0.15)] border-[var(--color-ash)] text-[var(--color-foreground)]"
                    : "border-[var(--color-border)] text-[var(--color-foreground-muted)] hover:border-[var(--color-border-hover)]"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Claims List */}
          <div className="space-y-4">
            {filteredClaims.length === 0 ? (
              <div className="text-center py-12 rounded-xl bg-[var(--color-background-card)] border border-[var(--color-border)]">
                <p className="text-[var(--color-foreground-muted)]">No claims to display</p>
              </div>
            ) : (
              filteredClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="p-5 rounded-xl bg-[var(--color-background-card)] border border-[var(--color-border)] cursor-pointer transition-all hover:border-[var(--color-border-hover)]"
                  onClick={() => setSelectedClaim(claim)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--color-foreground)] mb-1">
                        {getItemName(claim.itemId)}
                      </h3>
                      <p className="text-sm text-[var(--color-foreground-muted)] mb-3">
                        {claim.claimerName} • {claim.claimerEmail}
                      </p>
                      <div className="text-xs text-[var(--color-foreground-dim)]">
                        Submitted {timeAgo(claim.createdAt)}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                          claim.status === "verified"
                            ? "bg-[rgba(34,197,94,0.15)] text-[#22c55e] border border-[rgba(34,197,94,0.3)]"
                            : claim.status === "pending"
                            ? "bg-[rgba(245,158,11,0.15)] text-[#F59E0B] border border-[rgba(245,158,11,0.3)]"
                            : "bg-[rgba(239,68,68,0.15)] text-[#EF4444] border border-[rgba(239,68,68,0.3)]"
                        }`}
                      >
                        {claim.status === "verified" && <Check size={12} />}
                        {claim.status === "pending" && <Clock size={12} />}
                        {claim.status === "rejected" && <X size={12} />}
                        {claim.status.toUpperCase()}
                      </span>
                      <ChevronDown size={16} className="text-[var(--color-foreground-dim)]" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {selectedClaim && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center px-4 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm"
          onClick={() => setSelectedClaim(null)}
        >
          <div
            className="w-full max-w-lg bg-[#141415] border border-[var(--color-border)] rounded-2xl overflow-hidden animate-fade-up shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-foreground)]">
                    {getItemName(selectedClaim.itemId)}
                  </h2>
                  <span
                    className={`inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-0.5 rounded-full text-[0.72rem] font-semibold ${
                      selectedClaim.status === "verified"
                        ? "bg-[rgba(34,197,94,0.15)] text-[#22c55e] border border-[rgba(34,197,94,0.3)]"
                        : selectedClaim.status === "pending"
                        ? "bg-[rgba(245,158,11,0.15)] text-[#F59E0B] border border-[rgba(245,158,11,0.3)]"
                        : "bg-[rgba(239,68,68,0.15)] text-[#EF4444] border border-[rgba(239,68,68,0.3)]"
                    }`}
                  >
                    {selectedClaim.status === "verified" && <Check size={12} />}
                    {selectedClaim.status === "pending" && <Clock size={12} />}
                    {selectedClaim.status === "rejected" && <X size={12} />}
                    {selectedClaim.status.toUpperCase()}
                  </span>
                </div>
                <button onClick={() => setSelectedClaim(null)} className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                  <X size={18} className="text-[var(--color-foreground-dim)]" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <User size={14} className="text-[var(--color-foreground-dim)] mt-0.5" />
                    <div>
                      <p className="text-xs text-[var(--color-foreground-dim)]">Full Name</p>
                      <p className="text-[var(--color-foreground)]">{selectedClaim.claimerName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail size={14} className="text-[var(--color-foreground-dim)] mt-0.5" />
                    <div>
                      <p className="text-xs text-[var(--color-foreground-dim)]">Email Address</p>
                      <a href={`mailto:${selectedClaim.claimerEmail}`} className="text-[var(--color-ash)] hover:text-[var(--color-cloud)]">
                        {selectedClaim.claimerEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone size={14} className="text-[var(--color-foreground-dim)] mt-0.5" />
                    <div>
                      <p className="text-xs text-[var(--color-foreground-dim)]">Phone Number</p>
                      <a href={`tel:${selectedClaim.claimerPhone}`} className="text-[var(--color-foreground)]">
                        {selectedClaim.claimerPhone}
                      </a>
                    </div>
                  </div>

                  {selectedClaim.reason && (
                    <div className="flex items-start gap-3">
                      <MessageCircle size={14} className="text-[var(--color-foreground-dim)] mt-0.5" />
                      <div>
                        <p className="text-xs text-[var(--color-foreground-dim)]">Reason</p>
                        <p className="text-[var(--color-foreground)]">{selectedClaim.reason}</p>
                      </div>
                    </div>
                  )}

                  {selectedClaim.description && (
                    <div className="flex items-start gap-3">
                      <MessageCircle size={14} className="text-[var(--color-foreground-dim)] mt-0.5" />
                      <div>
                        <p className="text-xs text-[var(--color-foreground-dim)]">Additional Details</p>
                        <p className="text-[var(--color-foreground)] mt-1">{selectedClaim.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)]">
                {selectedClaim.status === "pending" ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVerifyClaim(selectedClaim.id)}
                      className="flex-1 py-2.5 px-4 rounded-lg bg-[rgba(34,197,94,0.15)] text-[#22c55e] border border-[rgba(34,197,94,0.3)] hover:bg-[rgba(34,197,94,0.25)] font-medium text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <Check size={16} />
                      Verify Claim
                    </button>
                    <button
                      onClick={() => handleRejectClaim(selectedClaim.id)}
                      className="flex-1 py-2.5 px-4 rounded-lg bg-[rgba(239,68,68,0.15)] text-[#EF4444] border border-[rgba(239,68,68,0.3)] hover:bg-[rgba(239,68,68,0.25)] font-medium text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <X size={16} />
                      Reject
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedClaim(null)}
                    className="w-full py-2.5 px-4 rounded-lg bg-[rgba(255,255,255,0.04)] text-[var(--color-foreground)] border border-[var(--color-border)] hover:bg-[rgba(255,255,255,0.06)] font-medium text-sm transition-colors"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
