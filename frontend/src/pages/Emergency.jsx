
import { useEffect, useState } from "react";
import {
  Menu,
  ShieldAlert,
  Phone,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  User,
  Plus,
  Siren,
  Pencil,
  Trash2,
  X,
  Users,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

const initialContacts = [
  {
    id: 1,
    name: "Emergency Contact 1",
    phone: "+91 98765 43210",
    relationship: "Family",
  },
];

function Emergency() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [contacts, setContacts] = useState(() => {
    try {
      const savedContacts = localStorage.getItem("emergencyContacts");
      return savedContacts ? JSON.parse(savedContacts) : initialContacts;
    } catch {
      return initialContacts;
    }
  });
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: "Family",
  });
  const [showContactForm, setShowContactForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Save emergency contacts whenever the list changes.
  useEffect(() => {
    localStorage.setItem("emergencyContacts", JSON.stringify(contacts));
  }, [contacts]);

  // Activate the local demo SOS interface.
  const activateSOS = () => {
    setSosActive(true);
  };

  // Reset the local demo SOS interface.
  const resetSOS = () => {
    setSosActive(false);
  };

  // Reset the contact form and close it.
  const closeContactForm = () => {
    setNewContact({
      name: "",
      phone: "",
      relationship: "Family",
    });
    setEditingId(null);
    setShowContactForm(false);
  };

  // Open the form to add a new contact.
  const openAddForm = () => {
    setNewContact({
      name: "",
      phone: "",
      relationship: "Family",
    });
    setEditingId(null);
    setShowContactForm(true);
  };

  // Save a new contact or update an existing contact.
  const handleSaveContact = (event) => {
    event.preventDefault();

    const cleanedPhone = newContact.phone.replace(/[\s-]/g, "");

    if (!/^\+?[0-9]{10,15}$/.test(cleanedPhone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    const contactData = {
      ...newContact,
      phone: cleanedPhone,
    };

    if (editingId !== null) {
      setContacts((previous) =>
        previous.map((contact) =>
          contact.id === editingId
            ? { ...contact, ...contactData }
            : contact
        )
      );
    } else {
      setContacts((previous) => [
        ...previous,
        {
          ...contactData,
          id: Date.now(),
        },
      ]);
    }

    closeContactForm();
  };

  // Load the selected contact into the editing form.
  const handleEditContact = (contact) => {
    setNewContact({
      name: contact.name,
      phone: contact.phone,
      relationship: contact.relationship || "Other",
    });
    setEditingId(contact.id);
    setShowContactForm(true);
  };

  // Remove a contact after confirmation.
  const removeContact = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this emergency contact?"
    );

    if (confirmed) {
      setContacts((previous) =>
        previous.filter((contact) => contact.id !== id)
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="min-h-screen lg:ml-72">
        {/* Page header */}
        <header className="flex h-20 items-center justify-between border-b border-white/10 bg-slate-950 px-5 sm:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-xl font-bold">Emergency SOS</h1>
              <p className="text-xs text-slate-400">
                Emergency assistance and safety contacts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-2 text-xs text-teal-400">
            <span className="h-2 w-2 rounded-full bg-teal-400"></span>
            Safety Center
          </div>
        </header>

        <div className="space-y-8 p-5 sm:p-8">
          {/* Introduction */}
          <section>
            <p className="mb-2 text-sm font-semibold tracking-widest text-red-400">
              EMERGENCY ASSISTANCE
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Your Safety Comes First
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Access emergency assistance and manage your trusted contacts.
            </p>
          </section>

          {/* SOS activation panel */}
          <section className="overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-950/60 via-slate-900 to-slate-900 p-6 sm:p-10">
            <div className="mx-auto max-w-xl text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
                <Siren size={34} />
              </div>

              <h3 className="text-2xl font-bold">
                {sosActive ? "Demo SOS Activated" : "Need Emergency Help?"}
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
                {sosActive
                  ? "The demo emergency state is active. No real emergency alert has been sent."
                  : "Use the SOS control to preview the emergency activation interface. Real alert delivery will be connected later."}
              </p>

              <button
                onClick={sosActive ? resetSOS : activateSOS}
                className={`mx-auto mt-8 flex h-40 w-40 flex-col items-center justify-center rounded-full border-8 text-white shadow-2xl transition hover:scale-105 ${
                  sosActive
                    ? "border-teal-400/20 bg-teal-600 hover:bg-teal-500"
                    : "border-red-400/20 bg-red-600 hover:bg-red-500"
                }`}
              >
                {sosActive ? (
                  <CheckCircle2 size={38} />
                ) : (
                  <ShieldAlert size={42} />
                )}
                <span className="mt-2 text-2xl font-black">
                  {sosActive ? "RESET" : "SOS"}
                </span>
                <span className="mt-1 text-xs">
                  {sosActive ? "Demo Active" : "Activate"}
                </span>
              </button>

              <p className="mt-6 text-xs text-slate-500">
                {sosActive
                  ? "Press Reset to clear the demo state."
                  : "Demo only — does not contact emergency services."}
              </p>
            </div>
          </section>

          {/* SOS contact preview */}
          {sosActive && (
            <section className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5">
              <div className="mb-4 flex items-center gap-3">
                <Users className="text-red-400" size={23} />
                <h3 className="font-bold text-red-400">
                  Saved Emergency Contacts
                </h3>
              </div>

              {contacts.length === 0 ? (
                <p className="text-sm text-slate-400">
                  No emergency contacts have been added yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex flex-col justify-between gap-3 rounded-xl border border-white/10 bg-slate-900 p-4 sm:flex-row sm:items-center"
                    >
                      <div>
                        <p className="font-semibold">{contact.name}</p>
                        <p className="mt-1 text-sm text-slate-400">
                          {contact.relationship} · {contact.phone}
                        </p>
                      </div>
                      <a
                        href={`tel:${contact.phone}`}
                        className="flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600"
                      >
                        <Phone size={16} />
                        Call
                      </a>
                    </div>
                  ))}
                </div>
              )}

              <p className="mt-4 text-xs text-slate-500">
                Contact shortcuts are displayed locally. No automatic
                emergency notification is sent.
              </p>
            </section>
          )}

          {/* Emergency status cards */}
          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">SOS Status</p>
                <ShieldAlert
                  size={22}
                  className={sosActive ? "text-red-400" : "text-teal-400"}
                />
              </div>
              <h3 className="mt-4 text-xl font-bold">
                {sosActive ? "Demo Active" : "Not Activated"}
              </h3>
              <p className="mt-2 text-xs text-slate-500">
                {sosActive ? "Local demo state only" : "No demo alert active"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">Location Access</p>
                <MapPin size={22} className="text-orange-400" />
              </div>
              <h3 className="mt-4 text-xl font-bold">Not Connected</h3>
              <p className="mt-2 text-xs text-slate-500">
                GPS integration pending
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">Emergency Contacts</p>
                <Phone size={22} className="text-teal-400" />
              </div>
              <h3 className="mt-4 text-xl font-bold">{contacts.length}</h3>
              <p className="mt-2 text-xs text-slate-500">
                Saved in this browser
              </p>
            </div>
          </section>

          {/* Emergency contacts */}
          <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-bold">Emergency Contacts</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Manage people you trust during an emergency.
                </p>
              </div>

              <button
                onClick={openAddForm}
                className="flex items-center justify-center gap-2 rounded-xl bg-teal-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-teal-300"
              >
                <Plus size={18} />
                Add Contact
              </button>
            </div>

            {/* Add and edit contact form */}
            {showContactForm && (
              <form
                onSubmit={handleSaveContact}
                className="mb-6 rounded-xl border border-white/10 bg-slate-950 p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <h4 className="font-semibold">
                    {editingId !== null ? "Edit Contact" : "Add New Contact"}
                  </h4>
                  <button
                    type="button"
                    onClick={closeContactForm}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"
                    aria-label="Close contact form"
                  >
                    <X size={19} />
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm">Contact Name</label>
                    <input
                      type="text"
                      value={newContact.name}
                      onChange={(event) =>
                        setNewContact({
                          ...newContact,
                          name: event.target.value,
                        })
                      }
                      placeholder="Enter name"
                      required
                      maxLength={60}
                      className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-teal-400"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm">Phone Number</label>
                    <input
                      type="tel"
                      value={newContact.phone}
                      onChange={(event) =>
                        setNewContact({
                          ...newContact,
                          phone: event.target.value,
                        })
                      }
                      placeholder="+91 98765 43210"
                      pattern="[0-9+ -]{10,16}"
                      required
                      className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-teal-400"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm">
                      Relationship
                    </label>
                    <select
                      value={newContact.relationship}
                      onChange={(event) =>
                        setNewContact({
                          ...newContact,
                          relationship: event.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-teal-400"
                    >
                      <option value="Family">Family</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Friend">Friend</option>
                      <option value="Relative">Relative</option>
                      <option value="Partner">Partner</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-teal-400 py-3 font-bold text-slate-950 hover:bg-teal-300"
                  >
                    {editingId !== null ? "Update Contact" : "Save Contact"}
                  </button>
                  <button
                    type="button"
                    onClick={closeContactForm}
                    className="rounded-xl border border-white/10 px-6 py-3 font-semibold text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Contact list */}
            <div className="space-y-3">
              {contacts.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center">
                  <Users className="mx-auto mb-3 text-slate-500" size={35} />
                  <p className="font-semibold">No emergency contacts yet</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Add someone you trust to your emergency list.
                  </p>
                </div>
              ) : (
                contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex flex-col justify-between gap-4 rounded-xl border border-white/10 bg-slate-950 p-4 sm:flex-row sm:items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-400/10 text-teal-400">
                        <User size={21} />
                      </div>
                      <div>
                        <p className="font-semibold">{contact.name}</p>
                        <p className="mt-1 text-sm text-slate-400">
                          {contact.phone}
                        </p>
                        <span className="mt-2 inline-block rounded-full bg-teal-400/10 px-3 py-1 text-xs text-teal-400">
                          {contact.relationship || "Other"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditContact(contact)}
                        className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-teal-400 hover:bg-teal-400/10"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => removeContact(contact.id)}
                        className="flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Safety instructions */}
          <section className="rounded-2xl border border-orange-400/20 bg-orange-400/5 p-6">
            <div className="mb-5 flex items-center gap-3">
              <AlertTriangle size={23} className="text-orange-400" />
              <h3 className="font-bold">Emergency Safety Guidelines</h3>
            </div>

            <div className="space-y-4 text-sm text-slate-400">
              <p className="flex gap-3">
                <CheckCircle2 size={18} className="shrink-0 text-teal-400" />
                Move to a safe and public location if possible.
              </p>
              <p className="flex gap-3">
                <CheckCircle2 size={18} className="shrink-0 text-teal-400" />
                Contact local emergency services when immediate help is needed.
              </p>
              <p className="flex gap-3">
                <CheckCircle2 size={18} className="shrink-0 text-teal-400" />
                Keep your trusted contacts informed about your situation.
              </p>
            </div>
          </section>

          {/* Page disclaimer */}
          <footer className="border-t border-white/10 py-5 text-center text-xs leading-6 text-slate-500">
            This is a frontend demonstration. No automatic SOS alert, SMS,
            or GPS location is transmitted. Contact data is stored locally
            in this browser and is not yet protected by backend authentication.
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Emergency;
