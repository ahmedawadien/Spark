import React, { useEffect, useMemo, useState } from "react";
import {
  Sparkles,
  LayoutDashboard,
  Inbox,
  Users,
  CheckCircle2,
  Search,
  RefreshCw,
  Eye,
  Trash2,
  X,
  ChevronDown,
  Mail,
  CalendarDays,
  BriefcaseBusiness,
  MessageSquareText,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const API_BASE = "https://sparkframe.lovestoblog.com";

export default function Dashboard() {

  const [inquiries, setInquiries] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");

  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [toast, setToast] = useState(null);

 

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setRefreshing(true);

      const url = `${API_BASE}/get_inquiries.php`;

      console.log("====================================");
      console.log("GET INQUIRIES");
      console.log("URL:", url);
      console.log("====================================");

      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
        },
      });

      console.log("HTTP STATUS:", response.status);

      const text = await response.text();

      console.log("RAW RESPONSE:");
      console.log(text);

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: ${response.statusText}`
        );
      }

      if (!text.trim()) {
        throw new Error("PHP returned an empty response.");
      }

      let json;

      try {
        json = JSON.parse(text);
      } catch (error) {
        console.error("JSON PARSE ERROR:", error);

        throw new Error(
          "PHP did not return valid JSON. Check get_inquiries.php."
        );
      }

      console.log("PARSED JSON:", json);

      if (json.success !== true) {
        throw new Error(
          json.message || "API returned success:false"
        );
      }

      if (!Array.isArray(json.data)) {
        throw new Error(
          "API response does not contain a valid data array."
        );
      }

      /*
      |--------------------------------------------------------------------------
      | IMPORTANT
      |--------------------------------------------------------------------------
      |
      | Your API returns:
      |
      | {
      |   success: true,
      |   count: 2,
      |   data: [...]
      | }
      |
      | Therefore:
      |
      | json.data
      |
      */

      const records = json.data.map((item) => ({
        id: item.id,
        name: item.name || "",
        email: item.email || "",
        service: item.service || "",
        project_brief: item.project_brief || "",
        created_at: item.created_at || "",
        status: item.status || "New",
      }));

      console.log("FINAL RECORDS:", records);
      console.log("RECORD COUNT:", records.length);

      setInquiries(records);

      showToast(
        `${records.length} ${
          records.length === 1 ? "inquiry" : "inquiries"
        } loaded successfully.`
      );
    } catch (error) {
      console.error("====================================");
      console.error("FETCH ERROR");
      console.error(error);
      console.error("====================================");

      setInquiries([]);

      showToast(
        error.message ||
          "Unable to connect to the PHP API.",
        "error"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ---------------------------------------------------------
  // INITIAL LOAD
  // ---------------------------------------------------------

  useEffect(() => {
    fetchInquiries();
  }, []);

  // ---------------------------------------------------------
  // UPDATE STATUS
  // ---------------------------------------------------------

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `${API_BASE}/update_inquiry.php`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            id: id,
            status: status,
          }),
        }
      );

      const text = await response.text();

      console.log("UPDATE RESPONSE:", text);

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "update_inquiry.php did not return valid JSON."
        );
      }

      if (!response.ok || data.success !== true) {
        throw new Error(
          data.message ||
            "Unable to update inquiry status."
        );
      }

      // Update table
      setInquiries((previous) =>
        previous.map((item) =>
          Number(item.id) === Number(id)
            ? {
                ...item,
                status: status,
              }
            : item
        )
      );

      // Update modal
      setSelectedInquiry((previous) => {
        if (
          previous &&
          Number(previous.id) === Number(id)
        ) {
          return {
            ...previous,
            status: status,
          };
        }

        return previous;
      });

      showToast("Inquiry status updated.");
    } catch (error) {
      console.error("STATUS ERROR:", error);

      showToast(
        error.message ||
          "Unable to update status.",
        "error"
      );
    }
  };

  // ---------------------------------------------------------
  // DELETE
  // ---------------------------------------------------------

  const deleteInquiry = async () => {
    if (!deleteId) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/delete_inquiry.php`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            id: deleteId,
          }),
        }
      );

      const text = await response.text();

      console.log("DELETE RESPONSE:", text);

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "delete_inquiry.php did not return valid JSON."
        );
      }

      if (!response.ok || data.success !== true) {
        throw new Error(
          data.message ||
            "Unable to delete inquiry."
        );
      }

      setInquiries((previous) =>
        previous.filter(
          (item) =>
            Number(item.id) !== Number(deleteId)
        )
      );

      setSelectedInquiry(null);
      setShowDeleteModal(false);
      setDeleteId(null);

      showToast("Inquiry deleted successfully.");
    } catch (error) {
      console.error("DELETE ERROR:", error);

      showToast(
        error.message ||
          "Unable to delete inquiry.",
        "error"
      );
    }
  };

  // ---------------------------------------------------------
  // SERVICES
  // ---------------------------------------------------------

  const services = useMemo(() => {
    const uniqueServices = [
      ...new Set(
        inquiries
          .map((item) => item.service)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueServices];
  }, [inquiries]);

  // ---------------------------------------------------------
  // FILTER
  // ---------------------------------------------------------

  const filteredInquiries = useMemo(() => {
    const query = search.trim().toLowerCase();

    return inquiries.filter((item) => {
      const matchesSearch =
        !query ||
        String(item.name)
          .toLowerCase()
          .includes(query) ||
        String(item.email)
          .toLowerCase()
          .includes(query) ||
        String(item.service)
          .toLowerCase()
          .includes(query) ||
        String(item.project_brief)
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesService =
        serviceFilter === "All" ||
        item.service === serviceFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesService
      );
    });
  }, [
    inquiries,
    search,
    statusFilter,
    serviceFilter,
  ]);

  // ---------------------------------------------------------
  // STATISTICS
  // ---------------------------------------------------------

  const stats = useMemo(() => {
    return {
      total: inquiries.length,

      newCount: inquiries.filter(
        (item) => item.status === "New"
      ).length,

      contacted: inquiries.filter(
        (item) => item.status === "Contacted"
      ).length,

      inProgress: inquiries.filter(
        (item) => item.status === "In Progress"
      ).length,

      completed: inquiries.filter(
        (item) => item.status === "Completed"
      ).length,
    };
  }, [inquiries]);

  // ---------------------------------------------------------
  // STATUS STYLE
  // ---------------------------------------------------------

  const getStatusStyle = (status) => {
    switch (status) {
      case "New":
        return "bg-orange-50 text-orange-700 border-orange-200";

      case "Contacted":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "In Progress":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  // ---------------------------------------------------------
  // DATE
  // ---------------------------------------------------------

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsed = new Date(
      String(date).replace(" ", "T")
    );

    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ---------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">

        <div className="max-w-[1600px] mx-auto px-6 py-4">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 p-[2px] shadow-lg">

                <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center">

                  <Sparkles className="w-5 h-5 text-orange-600" />

                </div>

              </div>

              <div>

                <div className="text-xl font-black text-slate-900">
                  Spark
                  <span className="text-orange-600">
                    Frame
                  </span>
                </div>

                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                  Admin Dashboard
                </div>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <button
                onClick={fetchInquiries}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-bold hover:border-orange-300 hover:text-orange-600 transition disabled:opacity-50"
              >

                <RefreshCw
                  className={`w-4 h-4 ${
                    refreshing
                      ? "animate-spin"
                      : ""
                  }`}
                />

                <span className="hidden sm:inline">
                  Refresh
                </span>

              </button>

              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-black">
                A
              </div>

            </div>

          </div>

        </div>

      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="max-w-[1600px] mx-auto px-6 py-8">

        {/* TITLE */}

        <div className="mb-8">

          <div className="flex items-center gap-2 text-orange-600 text-xs font-black uppercase tracking-wider mb-3">

            <LayoutDashboard className="w-4 h-4" />

            Dashboard Overview

          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Inquiry Management
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Manage your SparkFrame client inquiries directly from your database.
          </p>

        </div>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">

          <StatCard
            title="Total Inquiries"
            value={stats.total}
            icon={Inbox}
            description="All inquiries"
          />

          <StatCard
            title="New"
            value={stats.newCount}
            icon={AlertCircle}
            description="Need attention"
          />

          <StatCard
            title="Contacted"
            value={stats.contacted}
            icon={Users}
            description="Client contacted"
          />

          <StatCard
            title="In Progress"
            value={stats.inProgress}
            icon={TrendingUp}
            description="Active projects"
          />

          <StatCard
            title="Completed"
            value={stats.completed}
            icon={CheckCircle2}
            description="Finished inquiries"
          />

        </div>

        {/* =================================================
            TABLE CONTAINER
        ================================================= */}

        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

          {/* TOOLBAR */}

          <div className="p-5 border-b border-slate-200">

            <div className="flex flex-col xl:flex-row gap-4 justify-between">

              <div className="relative flex-1 max-w-xl">

                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search name, email, service..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                />

              </div>

              <div className="flex flex-wrap gap-3">

                {/* STATUS FILTER */}

                <div className="relative">

                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value)
                    }
                    className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm font-semibold outline-none cursor-pointer"
                  >

                    <option value="All">
                      All Status
                    </option>

                    <option value="New">
                      New
                    </option>

                    <option value="Contacted">
                      Contacted
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                  </select>

                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-slate-400" />

                </div>

                {/* SERVICE FILTER */}

                <div className="relative">

                  <select
                    value={serviceFilter}
                    onChange={(e) =>
                      setServiceFilter(e.target.value)
                    }
                    className="appearance-none max-w-[260px] bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm font-semibold outline-none cursor-pointer"
                  >

                    {services.map((service) => (
                      <option
                        key={service}
                        value={service}
                      >
                        {service === "All"
                          ? "All Services"
                          : service}
                      </option>
                    ))}

                  </select>

                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-slate-400" />

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1000px]">

              <thead>

                <tr className="bg-slate-50 border-b border-slate-200">

                  <TableHeader>
                    Client
                  </TableHeader>

                  <TableHeader>
                    Service
                  </TableHeader>

                  <TableHeader>
                    Project Brief
                  </TableHeader>

                  <TableHeader>
                    Date
                  </TableHeader>

                  <TableHeader>
                    Status
                  </TableHeader>

                  <th className="px-6 py-4 text-right text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100">

                {/* LOADING */}

                {loading && (

                  <tr>

                    <td
                      colSpan="6"
                      className="py-20 text-center"
                    >

                      <RefreshCw className="w-9 h-9 text-orange-500 animate-spin mx-auto mb-4" />

                      <p className="text-sm font-bold text-slate-600">
                        Loading inquiries...
                      </p>

                      <p className="text-xs text-slate-400 mt-2">
                        Connecting to PHP API
                      </p>

                    </td>

                  </tr>

                )}

                {/* EMPTY */}

                {!loading &&
                  filteredInquiries.length === 0 && (

                    <tr>

                      <td
                        colSpan="6"
                        className="py-20 text-center"
                      >

                        <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-4" />

                        <p className="font-bold text-slate-700">
                          No inquiries found
                        </p>

                        <p className="text-sm text-slate-400 mt-2">
                          {inquiries.length === 0
                            ? "The API returned no inquiries."
                            : "Try changing your search or filters."}
                        </p>

                      </td>

                    </tr>

                  )}

                {/* DATA */}

                {!loading &&
                  filteredInquiries.length > 0 &&
                  filteredInquiries.map((item) => (

                    <tr
                      key={item.id}
                      className="hover:bg-orange-50/30 transition"
                    >

                      {/* CLIENT */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 flex items-center justify-center text-orange-700 font-black">

                            {item.name
                              ? item.name
                                  .charAt(0)
                                  .toUpperCase()
                              : "?"}

                          </div>

                          <div>

                            <div className="font-bold text-slate-900">
                              {item.name || "-"}
                            </div>

                            <div className="text-xs text-slate-400 mt-1">
                              {item.email || "-"}
                            </div>

                          </div>

                        </div>

                      </td>

                      {/* SERVICE */}

                      <td className="px-6 py-5">

                        <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-700">

                          <BriefcaseBusiness className="w-4 h-4 text-orange-500" />

                          {item.service || "-"}

                        </span>

                      </td>

                      {/* BRIEF */}

                      <td className="px-6 py-5 max-w-[320px]">

                        <p
                          className="text-sm text-slate-600 truncate"
                          title={item.project_brief}
                        >
                          {item.project_brief || "-"}
                        </p>

                      </td>

                      {/* DATE */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">

                          <CalendarDays className="w-4 h-4" />

                          {formatDate(item.created_at)}

                        </div>

                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-5">

                        <select
                          value={item.status || "New"}
                          onChange={(e) =>
                            updateStatus(
                              item.id,
                              e.target.value
                            )
                          }
                          className={`px-3 py-2 rounded-full border text-xs font-black outline-none cursor-pointer ${getStatusStyle(
                            item.status
                          )}`}
                        >

                          <option value="New">
                            New
                          </option>

                          <option value="Contacted">
                            Contacted
                          </option>

                          <option value="In Progress">
                            In Progress
                          </option>

                          <option value="Completed">
                            Completed
                          </option>

                        </select>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-5">

                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() =>
                              setSelectedInquiry(item)
                            }
                            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-orange-100 hover:text-orange-600 flex items-center justify-center transition"
                            title="View"
                          >

                            <Eye className="w-4 h-4" />

                          </button>

                          <button
                            onClick={() => {
                              setDeleteId(item.id);
                              setShowDeleteModal(true);
                            }}
                            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition"
                            title="Delete"
                          >

                            <Trash2 className="w-4 h-4" />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

          {/* FOOTER */}

          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/70">

            <div className="flex justify-between items-center text-xs font-semibold text-slate-500">

              <span>
                Showing{" "}
                {filteredInquiries.length} of{" "}
                {inquiries.length} inquiries
              </span>

              <span>
                SparkFrame Database
              </span>

            </div>

          </div>

        </div>

      </main>

      {/* =================================================
          VIEW MODAL
      ================================================= */}

      {selectedInquiry && (

        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-md flex items-center justify-center p-5">

          <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden">

            <div className="px-7 py-6 border-b border-slate-200 flex justify-between items-start">

              <div>

                <div className="text-xs uppercase tracking-widest font-black text-orange-600 mb-2">
                  Inquiry #{selectedInquiry.id}
                </div>

                <h2 className="text-2xl font-black text-slate-900">
                  {selectedInquiry.name}
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedInquiry(null)
                }
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
              >

                <X className="w-5 h-5" />

              </button>

            </div>

            <div className="p-7 space-y-5">

              <div className="grid sm:grid-cols-2 gap-4">

                <InfoBox
                  icon={Mail}
                  title="Email"
                  value={selectedInquiry.email}
                />

                <InfoBox
                  icon={BriefcaseBusiness}
                  title="Service"
                  value={selectedInquiry.service}
                />

                <InfoBox
                  icon={CalendarDays}
                  title="Submitted"
                  value={formatDate(
                    selectedInquiry.created_at
                  )}
                />

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">

                  <div className="text-[10px] uppercase font-black text-slate-400 mb-2">
                    Status
                  </div>

                  <select
                    value={
                      selectedInquiry.status || "New"
                    }
                    onChange={(e) =>
                      updateStatus(
                        selectedInquiry.id,
                        e.target.value
                      )
                    }
                    className={`px-3 py-2 rounded-full border text-xs font-black outline-none ${getStatusStyle(
                      selectedInquiry.status
                    )}`}
                  >

                    <option value="New">
                      New
                    </option>

                    <option value="Contacted">
                      Contacted
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                  </select>

                </div>

              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">

                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-black text-slate-400 mb-3">

                  <MessageSquareText className="w-4 h-4" />

                  Project Brief

                </div>

                <p className="text-sm leading-7 text-slate-700 whitespace-pre-wrap">
                  {selectedInquiry.project_brief || "-"}
                </p>

              </div>

              <div className="flex justify-end gap-3">

                <button
                  onClick={() => {
                    setDeleteId(selectedInquiry.id);
                    setShowDeleteModal(true);
                  }}
                  className="px-5 py-3 rounded-xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition flex items-center gap-2"
                >

                  <Trash2 className="w-4 h-4" />

                  Delete

                </button>

                <button
                  onClick={() =>
                    setSelectedInquiry(null)
                  }
                  className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* =================================================
          DELETE MODAL
      ================================================= */}

      {showDeleteModal && (

        <div className="fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-md flex items-center justify-center p-5">

          <div className="bg-white rounded-3xl w-full max-w-md p-7 shadow-2xl">

            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-5">

              <Trash2 className="w-6 h-6" />

            </div>

            <h2 className="text-2xl font-black text-slate-900">
              Delete inquiry?
            </h2>

            <p className="text-sm text-slate-500 mt-2 leading-6">
              This inquiry will be permanently removed from the database. This action cannot be undone.
            </p>

            <div className="flex gap-3 mt-7">

              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
              >
                Cancel
              </button>

              <button
                onClick={deleteInquiry}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white font-black hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

      {/* =================================================
          TOAST
      ================================================= */}

      {toast && (

        <div className="fixed bottom-6 right-6 z-[100]">

          <div
            className={`px-5 py-4 rounded-2xl shadow-2xl border flex items-center gap-3 ${
              toast.type === "error"
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-white border-emerald-200 text-emerald-700"
            }`}
          >

            {toast.type === "error" ? (
              <AlertCircle className="w-5 h-5" />
            ) : (
              <CheckCircle2 className="w-5 h-5" />
            )}

            <span className="text-sm font-bold">
              {toast.message}
            </span>

          </div>

        </div>

      )}

    </div>
  );
}

// =====================================================
// TABLE HEADER
// =====================================================

function TableHeader({ children }) {
  return (
    <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-slate-400">
      {children}
    </th>
  );
}

// =====================================================
// STAT CARD
// =====================================================

function StatCard({
  title,
  value,
  icon: Icon,
  description,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">

      <div className="flex items-start justify-between">

        <div>

          <div className="text-xs font-black uppercase tracking-wider text-slate-400">
            {title}
          </div>

          <div className="text-3xl font-black text-slate-900 mt-2">
            {value}
          </div>

          <div className="text-xs text-slate-400 mt-2">
            {description}
          </div>

        </div>

        <div className="w-11 h-11 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">

          <Icon className="w-5 h-5" />

        </div>

      </div>

    </div>
  );
}

// =====================================================
// INFO BOX
// =====================================================

function InfoBox({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">

      <div className="flex items-center gap-2 text-[10px] uppercase font-black text-slate-400 mb-2">

        <Icon className="w-4 h-4" />

        {title}

      </div>

      <div className="text-sm font-bold text-slate-800 break-words">
        {value || "-"}
      </div>

    </div>
  );
}
