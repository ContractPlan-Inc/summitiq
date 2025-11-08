import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Contract {
  id: string;
  name: string;
  vendor: string;
  value: string;
  status: "Active" | "Expiring Soon" | "Under Review" | "Pending";
  expiryDate: string;
  risk: "Low" | "Medium" | "High";
}

export default function Dashboard() {
  const [demoMode, setDemoMode] = useState(false);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedView, setSelectedView] = useState<"all" | "expiring" | "high-risk">("all");

  // Demo data
  const demoContracts: Contract[] = [
    {
      id: "CNT-001",
      name: "Cloud Infrastructure Services",
      vendor: "AWS Enterprise",
      value: "$125,000/yr",
      status: "Active",
      expiryDate: "2025-12-15",
      risk: "Low"
    },
    {
      id: "CNT-002",
      name: "Software Licensing Agreement",
      vendor: "Microsoft Corporation",
      value: "$89,500/yr",
      status: "Expiring Soon",
      expiryDate: "2025-11-30",
      risk: "Medium"
    },
    {
      id: "CNT-003",
      name: "Marketing Services Contract",
      vendor: "Digital Growth Agency",
      value: "$45,000/yr",
      status: "Active",
      expiryDate: "2026-03-20",
      risk: "Low"
    },
    {
      id: "CNT-004",
      name: "Data Center Lease",
      vendor: "Equinix Global",
      value: "$250,000/yr",
      status: "Under Review",
      expiryDate: "2025-11-20",
      risk: "High"
    },
    {
      id: "CNT-005",
      name: "Consulting Services Agreement",
      vendor: "Tech Advisors Inc",
      value: "$65,000/yr",
      status: "Pending",
      expiryDate: "2026-01-10",
      risk: "Low"
    },
    {
      id: "CNT-006",
      name: "SaaS Platform License",
      vendor: "Salesforce",
      value: "$98,000/yr",
      status: "Active",
      expiryDate: "2026-02-28",
      risk: "Low"
    }
  ];

  useEffect(() => {
    if (demoMode) {
      setContracts(demoContracts);
    } else {
      setContracts([]);
    }
  }, [demoMode]);

  const getFilteredContracts = () => {
    if (!demoMode) return [];

    switch (selectedView) {
      case "expiring":
        return contracts.filter(c => c.status === "Expiring Soon");
      case "high-risk":
        return contracts.filter(c => c.risk === "High" || c.risk === "Medium");
      default:
        return contracts;
    }
  };

  const filteredContracts = getFilteredContracts();

  const stats = {
    total: demoMode ? contracts.length : 0,
    active: demoMode ? contracts.filter(c => c.status === "Active").length : 0,
    expiring: demoMode ? contracts.filter(c => c.status === "Expiring Soon").length : 0,
    totalValue: demoMode ? "$672,500" : "$0"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Expiring Soon":
        return "bg-yellow-100 text-yellow-800";
      case "Under Review":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Demo Mode Banner */}
      {demoMode && (
        <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 text-center animate-fade-in">
          <p className="text-sm font-medium">
            🎯 Demo Mode Active - Viewing sample contract data
          </p>
        </div>
      )}

      {/* Navigation */}
      <nav className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto border-b border-gray-200 bg-white/50 backdrop-blur-sm">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            ContractPlan
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDemoMode(!demoMode)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              demoMode
                ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg"
                : "bg-white text-gray-700 border border-gray-200 hover:border-primary-300"
            }`}
          >
            {demoMode ? "Exit Demo" : "Enable Demo"}
          </button>
          <Link
            href="/"
            className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-all"
          >
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
            Contract Dashboard
          </h1>
          <p className="text-gray-600">
            {demoMode
              ? "Viewing sample contract data - explore all features"
              : "Enable demo mode to explore features with sample data"}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="text-sm text-gray-600 mb-2">Total Contracts</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              {stats.total}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="text-sm text-gray-600 mb-2">Active Contracts</div>
            <div className="text-3xl font-bold text-green-600">
              {stats.active}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="text-sm text-gray-600 mb-2">Expiring Soon</div>
            <div className="text-3xl font-bold text-yellow-600">
              {stats.expiring}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="text-sm text-gray-600 mb-2">Total Value</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              {stats.totalValue}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        {demoMode && (
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setSelectedView("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedView === "all"
                  ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              All Contracts
            </button>
            <button
              onClick={() => setSelectedView("expiring")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedView === "expiring"
                  ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Expiring Soon
            </button>
            <button
              onClick={() => setSelectedView("high-risk")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedView === "high-risk"
                  ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              High Risk
            </button>
          </div>
        )}

        {/* Contracts Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {!demoMode ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Enable Demo Mode
              </h3>
              <p className="text-gray-600 mb-6">
                Click the "Enable Demo" button above to explore the dashboard with sample contract data
              </p>
              <button
                onClick={() => setDemoMode(true)}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Enable Demo Mode
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Contract ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Vendor
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Value
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Expiry Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Risk Level
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredContracts.map((contract) => (
                    <tr key={contract.id} className="hover:bg-gray-50 transition-all">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {contract.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {contract.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {contract.vendor}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {contract.value}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                          {contract.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {contract.expiryDate}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(contract.risk)}`}>
                          {contract.risk}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {demoMode && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Create Contract</h3>
              <p className="text-gray-600 text-sm mb-4">
                Add a new contract to your portfolio
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700">
                Create New →
              </button>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Generate Report</h3>
              <p className="text-gray-600 text-sm mb-4">
                Export analytics and compliance reports
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700">
                View Reports →
              </button>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="text-3xl mb-3">⚙️</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Settings</h3>
              <p className="text-gray-600 text-sm mb-4">
                Configure alerts and notifications
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700">
                Manage Settings →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
