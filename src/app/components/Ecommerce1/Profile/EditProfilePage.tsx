"use client"

import { UpdateUser, useUserStore } from "@/store/userStore"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"

interface UserProfile {
  full_name: string
  email: string
  phone_number: string
  birthday: {
    day: string
    month: string
    year: string
  }
  gender: string
}

export default function EditProfilePage() {
  const { user, loading, fetchUser, updateUser, setUser } = useUserStore()
  const [profile, setProfile] = useState<UserProfile>({
    full_name: "",
    email: "",
    phone_number: "",
    birthday: { day: "", month: "", year: "" },
    gender: "",
  })

  const [showChangeEmail, setShowChangeEmail] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [showAddPhone, setShowAddPhone] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const months = [
    "January","February","March","April","May","June","July","August","September","October","November","December"
  ]
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString())
  const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString())

  useEffect(() => {
    if (!user) {
      fetchUser()
    } else {
      setProfile({
        full_name: user.full_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        birthday: {
          day: user.birthday?.day || "",
          month: user.birthday?.month || "",
          year: user.birthday?.year || "",
        },
        gender: user.gender || "",
      })
    }
  }, [user, fetchUser])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!profile.full_name.trim()) newErrors.full_name = "Full name is required"
    if (showChangeEmail && newEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(newEmail)) newErrors.email = "Please enter a valid email"
    }
    if (profile.phone_number && !/^\+?[\d\s-()]+$/.test(profile.phone_number)) newErrors.phone_number = "Please enter a valid phone number"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

const handleSaveChanges = async () => {
  if (!validateForm()) return;
  setIsLoading(true);

  try {
    const updatedProfile: UpdateUser = {
      ...profile,
      email: showChangeEmail && newEmail ? newEmail : profile.email,
    };
    await updateUser(updatedProfile);
    setUser({
      ...user!, 
      ...updatedProfile,
    });

    toast.success("Profile updated successfully!");
    setShowChangeEmail(false);
    setNewEmail("");
    setShowAddPhone(false);
  } catch (err: unknown) {
  if (err instanceof Error) {
    toast.error(err.message || "Failed to update profile. Try again.");
  } else {
    toast.error("Failed to update profile. Try again.");
  }
} finally {
  setIsLoading(false);
}

};



  const handleChangeEmail = () => {
    if (showChangeEmail && newEmail) {
      if (validateForm()) {
        setProfile({ ...profile, email: newEmail })
        setShowChangeEmail(false)
        setNewEmail("")
        setErrors({ ...errors, email: "" })
      }
    } else setShowChangeEmail(true)
  }

  const handleAddPhone = () => {
    if (!profile.phone_number) setShowAddPhone(true)
  }

  const clearName = () => {
    setProfile({ ...profile, full_name: "" })
    setErrors({ ...errors, full_name: "" })
  }

  if (loading) return <p className="p-4">Loading user data...</p>

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 md:mb-8">Edit Profile</h1>

        <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
          <div className="space-y-6">

            {/* Full Name */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={profile.full_name}
                    onChange={(e) => { setProfile({ ...profile, full_name: e.target.value }); if (errors.full_name) setErrors({ ...errors, full_name: "" }) }}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8 ${errors.full_name ? "border-red-500" : "border-gray-300"}`}
                  />
                  {profile.full_name && (
                    <button onClick={clearName} className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs hover:bg-gray-500">×</button>
                  )}
                </div>
                {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email |{" "}
                  <button onClick={handleChangeEmail} className="text-blue-600 hover:text-blue-700 font-normal">Change</button>
                </label>
                {showChangeEmail ? (
                  <div className="space-y-2">
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => { setNewEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: "" }) }}
                      placeholder="Enter new email"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    <div className="flex space-x-2">
                      <button onClick={handleChangeEmail} disabled={!newEmail} className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:bg-gray-400">Save</button>
                      <button onClick={() => { setShowChangeEmail(false); setNewEmail(""); setErrors({ ...errors, email: "" }) }} className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700">{profile.email}</div>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone |{" "}
                  <button onClick={handleAddPhone} className="text-blue-600 hover:text-blue-700 font-normal">Add</button>
                </label>
                {showAddPhone || profile.phone_number ? (
                  <input
                    type="tel"
                    value={profile.phone_number}
                    onChange={(e) => { setProfile({ ...profile, phone_number: e.target.value }); if (errors.phone_number) setErrors({ ...errors, phone_number: "" }) }}
                    placeholder="Enter phone"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone_number ? "border-red-500" : "border-gray-300"}`}
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-400">Please enter your phone</div>
                )}
                {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
              </div>
            </div>

            {/* Birthday & Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Birthday</label>
                <div className="grid grid-cols-3 gap-2">
                  <select value={profile.birthday.day} onChange={(e) => setProfile({ ...profile, birthday: { ...profile.birthday, day: e.target.value } })} className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Day</option>
                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <select value={profile.birthday.month} onChange={(e) => setProfile({ ...profile, birthday: { ...profile.birthday, month: e.target.value } })} className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Month</option>
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select value={profile.birthday.year} onChange={(e) => setProfile({ ...profile, birthday: { ...profile.birthday, year: e.target.value } })} className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Year</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button onClick={handleSaveChanges} disabled={isLoading} className={`w-full md:w-auto px-8 py-3 rounded-md text-white font-medium ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`}>
                {isLoading ? "SAVING..." : "SAVE CHANGES"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
